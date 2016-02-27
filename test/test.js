/**
 * Copyright (c) Joe McIntyre, 2016
 * license: MIT (https://github.com/fcc-joemcintyre/timestamp/LICENSE.txt)
 */
"use strict";
const assert = require ("assert");
const request = require ("request");
const processCommand = require ("../lib/cmd").processCommand;
const server = require ("../lib/server");

before (function () {
  server.start (3000);
});

describe ("test server", function () {
  describe ("/", function () {
    it ("should return 200 with instructions", function (done) {
      request.get ("http://localhost:3000/", function (err, res, body) {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          if (body.startsWith ("<h1>Timestamp Service</h1>")) {
            return done ();
          }
        }
        return done (new Error ("Invalid response"));
      });
    });
  });

  describe ("invalid URL content", function () {
    it ("should return 200 with instructions", function (done) {
      request.get ("http://localhost:3000/dummy", function (err, res, body) {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          if (body.startsWith ("<h1>Timestamp Service</h1>")) {
            return done ();
          }
        }
        return done (new Error ("Invalid response"));
      });
    });
  });

  describe ("valid date (natural)", function () {
    it ("should return JSON object with natural, unix formats", function (done) {
      request.get ("http://localhost:3000/api/date?date=January 10, 2010", function (err, res, body) {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          body = JSON.parse (body);
          if ((body.natural === "January 10, 2010") && (body.unix === 1263081600000)) {
            return done ();
          } else {
            return done (new Error (`Invalid response values ${body.natural}, ${body.unix}`));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ("valid date (unix)", function () {
    it ("should return JSON object with natural, unix formats", function (done) {
      request.get ("http://localhost:3000/api/date?date=1263103200000", function (err, res, body) {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          body = JSON.parse (body);
          if ((body.natural === "January 10, 2010") && (body.unix === 1263081600000)) {
            return done ();
          } else {
            return done (new Error (`Invalid response values ${body.natural}, ${body.unix}`));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });
});

describe ("cmd", function () {
  describe ("empty command", function () {
    it ("should not fail", function () {
      let cmd = processCommand ([]);
      assert.deepStrictEqual (cmd, {code:0, exit:false, port:0});
    });
  });

  describe ("invalid standalone option", function () {
    it ("should fail with code 1", function () {
      let cmd = processCommand (["-j"]);
      assert.deepStrictEqual (cmd, {code:1, exit:true, port:0});
    });
  });

  describe ("invalid settings option", function () {
    it ("should fail with code 1", function () {
      let cmd = processCommand (["-j=foo.js"]);
      assert.deepStrictEqual (cmd, {code:1, exit:true, port:0});
    });
  });

  describe ("proper port command", function () {
    it ("should succeed", function () {
      let cmd = processCommand (["-p=2000"]);
      assert.deepStrictEqual (cmd, {code:0, exit:false, port:2000});
    });
  });

  describe ("port out of range (negative)", function () {
    it ("should fail", function () {
      let cmd = processCommand (["-p=-1"]);
      assert.deepStrictEqual (cmd, {code:1, exit:true, port:-1});
    });
  });

  describe ("port out of range (positive)", function () {
    it ("should fail", function () {
      let cmd = processCommand (["-p=200000"]);
      assert.deepStrictEqual (cmd, {code:1, exit:true, port:200000});
    });
  });

  describe ("port not an integer", function () {
    it ("should fail", function () {
      let cmd = processCommand (["-p=2000.5"]);
      assert.deepStrictEqual (cmd, {code:1, exit:true, port:2000.5});
    });
  });

  describe ("port not a number", function () {
    it ("should fail", function () {
      let cmd = processCommand (["-p=ABC"]);
      assert.deepStrictEqual (cmd.code, 1);
      assert.deepStrictEqual (cmd.exit, true);
      assert (isNaN (cmd.port));
    });
  });

  describe ("unary help command", function () {
    it ("should succeed", function () {
      let cmd = processCommand (["-h"]);
      assert.deepStrictEqual (cmd, {code:0, exit:true, port:0});
      cmd = processCommand (["--help"]);
      assert.deepStrictEqual (cmd, {code:0, exit:true, port:0});
    });
  });

  describe ("help in command", function () {
    it ("should succeed", function () {
      let cmd = processCommand (["-p=2000", "-h"]);
      assert.deepStrictEqual (cmd, {code:0, exit:true, port:2000});
      cmd = processCommand (["-p=2000", "--help"]);
      assert.deepStrictEqual (cmd, {code:0, exit:true, port:2000});
    });
  });
});
