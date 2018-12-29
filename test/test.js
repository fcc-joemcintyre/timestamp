/* eslint-disable no-unused-expressions */
const { expect } = require ('chai');
const fetch = require ('node-fetch');
const processCommand = require ('../lib/cmd').processCommand;
const server = require ('../lib/server');

before (async function () {
  await server.start (3000);
});

after (async function () {
  await server.stop ();
});

describe ('test server', function () {
  describe ('/', function () {
    it ('should return 200 with home page', async function () {
      const res = await fetch ('http://localhost:3000/');
      expect (res.status).to.equal (200);
      const body = await res.text ();
      expect (body.startsWith ('<h1>Timestamp Service</h1>')).to.be.true;
    });
  });

  describe ('invalid URL content', function () {
    it ('should return 200 with home page', async function () {
      const res = await fetch ('http://localhost:3000/dummy');
      expect (res.status).to.equal (200);
      const body = await res.text ();
      expect (body.startsWith ('<h1>Timestamp Service</h1>')).to.be.true;
    });
  });

  describe ('valid date (natural, offset 360 minutes (America))', function () {
    it ('should return JSON object with natural, unix formats', async function () {
      // mock timezone offset
      const store = Date.prototype.getTimezoneOffset;
      Date.prototype.getTimezoneOffset = function () { // eslint-disable-line
        return 360;
      };

      const res = await fetch ('http://localhost:3000/api/date?date=January 10, 2010');
      expect (res.status).to.equal (200);
      const body = await res.json ();
      expect (body.natural).to.equal ('January 10, 2010');
      expect (body.unix).to.equal (1263081600000);

      // restore timezone offset
      Date.prototype.getTimezoneOffset = store; // eslint-disable-line
    });
  });

  describe ('valid date (natural, offset -60 minutes (Europe))', function () {
    it ('should return JSON object with natural, unix formats', async function () {
      // mock timezone offset
      const store = Date.prototype.getTimezoneOffset;
      Date.prototype.getTimezoneOffset = function () { // eslint-disable-line
        return -60;
      };

      const res = await fetch ('http://localhost:3000/api/date?date=January 10, 2010');
      expect (res.status).to.equal (200);
      const body = await res.json ();
      expect (body.natural).to.equal ('January 10, 2010');
      expect (body.unix).to.equal (1263081600000);

      // restore timezone offset
      Date.prototype.getTimezoneOffset = store; // eslint-disable-line
    });
  });

  describe ('valid date (unix, offset 360 minutes (America))', function () {
    it ('should return JSON object with natural, unix formats', async function () {
      // mock timezone offset
      const store = Date.prototype.getTimezoneOffset;
      Date.prototype.getTimezoneOffset = function () { // eslint-disable-line
        return 360;
      };
      const res = await fetch ('http://localhost:3000/api/date?date=1263103200000');
      expect (res.status).to.equal (200);
      const body = await res.json ();
      expect (body.natural).to.equal ('January 10, 2010');
      expect (body.unix).to.equal (1263103200000);

      // restore timezone offset
      Date.prototype.getTimezoneOffset = store; // eslint-disable-line
    });
  });

  describe ('valid date (unix, offset -60 minutes (Europe))', function () {
    it ('should return JSON object with natural, unix formats', async function () {
      // mock timezone offset
      const store = Date.prototype.getTimezoneOffset;
      Date.prototype.getTimezoneOffset = function () { // eslint-disable-line
        return -60;
      };
      const res = await fetch ('http://localhost:3000/api/date?date=1263081600000');
      expect (res.status).to.equal (200);
      const body = await res.json ();
      expect (body.natural).to.equal ('January 10, 2010');
      expect (body.unix).to.equal (1263081600000);

      // restore timezone offset
      Date.prototype.getTimezoneOffset = store; // eslint-disable-line
    });
  });
});

describe ('cmd', function () {
  describe ('empty command', function () {
    it ('should not fail', function () {
      const cmd = processCommand ([]);
      expect (cmd).to.deep.equal ({ code: 0, exit: false, port: 0 });
    });
  });

  describe ('invalid standalone option', function () {
    it ('should fail with code 1', function () {
      const cmd = processCommand (['-j']);
      expect (cmd).to.deep.equal ({ code: 1, exit: true, port: 0 });
    });
  });

  describe ('invalid settings option', function () {
    it ('should fail with code 1', function () {
      const cmd = processCommand (['-j=foo.js']);
      expect (cmd).to.deep.equal ({ code: 1, exit: true, port: 0 });
    });
  });

  describe ('proper port command', function () {
    it ('should succeed', function () {
      const cmd = processCommand (['-p=2000']);
      expect (cmd).to.deep.equal ({ code: 0, exit: false, port: 2000 });
    });
  });

  describe ('port out of range (negative)', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=-1']);
      expect (cmd).to.deep.equal ({ code: 1, exit: true, port: -1 });
    });
  });

  describe ('port out of range (positive)', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=200000']);
      expect (cmd).to.deep.equal ({ code: 1, exit: true, port: 200000 });
    });
  });

  describe ('port not an integer', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=2000.5']);
      expect (cmd).to.deep.equal ({ code: 1, exit: true, port: 2000.5 });
    });
  });

  describe ('port not a number', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=ABC']);
      expect (cmd.code).to.equal (1);
      expect (cmd.exit).to.be.true;
      expect (Number.isNaN (cmd.port)).to.be.true;
    });
  });

  describe ('unary help command', function () {
    it ('should succeed', function () {
      let cmd = processCommand (['-h']);
      expect (cmd).to.deep.equal ({ code: 0, exit: true, port: 0 });
      cmd = processCommand (['--help']);
      expect (cmd).to.deep.equal ({ code: 0, exit: true, port: 0 });
    });
  });

  describe ('help in command', function () {
    it ('should succeed', function () {
      let cmd = processCommand (['-p=2000', '-h']);
      expect (cmd).to.deep.equal ({ code: 0, exit: true, port: 2000 });
      cmd = processCommand (['-p=2000', '--help']);
      expect (cmd).to.deep.equal ({ code: 0, exit: true, port: 2000 });
    });
  });
});
