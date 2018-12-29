const assert = require ('assert');
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
      assert (res.status === 200);
      const body = await res.text ();
      assert (body.startsWith ('<h1>Timestamp Service</h1>'));
    });
  });

  describe ('invalid URL content', function () {
    it ('should return 200 with home page', async function () {
      const res = await fetch ('http://localhost:3000/dummy');
      assert (res.status === 200);
      const body = await res.text ();
      assert (body.startsWith ('<h1>Timestamp Service</h1>'));
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
      assert (res.status === 200);
      const body = await res.json ();
      assert (body.natural === 'January 10, 2010');
      assert (body.unix === 1263103200000);

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
      assert (res.status === 200);
      const body = await res.json ();
      assert (body.natural === 'January 10, 2010');
      assert (body.unix === 1263103200000);

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
      assert (res.status === 200);
      const body = await res.json ();
      assert (body.natural === 'January 10, 2010');
      assert (body.unix === 1263103200000);

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
      assert (res.status === 200);
      const body = await res.json ();
      assert (body.natural === 'January 10, 2010');
      assert (body.unix === 1263081600000);

      // restore timezone offset
      Date.prototype.getTimezoneOffset = store; // eslint-disable-line
    });
  });
});

describe ('cmd', function () {
  describe ('empty command', function () {
    it ('should not fail', function () {
      const cmd = processCommand ([]);
      assert.deepStrictEqual (cmd, { code: 0, exit: false, port: 0 });
    });
  });

  describe ('invalid standalone option', function () {
    it ('should fail with code 1', function () {
      const cmd = processCommand (['-j']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: 0 });
    });
  });

  describe ('invalid settings option', function () {
    it ('should fail with code 1', function () {
      const cmd = processCommand (['-j=foo.js']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: 0 });
    });
  });

  describe ('proper port command', function () {
    it ('should succeed', function () {
      const cmd = processCommand (['-p=2000']);
      assert.deepStrictEqual (cmd, { code: 0, exit: false, port: 2000 });
    });
  });

  describe ('port out of range (negative)', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=-1']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: -1 });
    });
  });

  describe ('port out of range (positive)', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=200000']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: 200000 });
    });
  });

  describe ('port not an integer', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=2000.5']);
      assert.deepStrictEqual (cmd, { code: 1, exit: true, port: 2000.5 });
    });
  });

  describe ('port not a number', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=ABC']);
      assert.deepStrictEqual (cmd.code, 1);
      assert.deepStrictEqual (cmd.exit, true);
      assert (Number.isNaN (cmd.port));
    });
  });

  describe ('unary help command', function () {
    it ('should succeed', function () {
      let cmd = processCommand (['-h']);
      assert.deepStrictEqual (cmd, { code: 0, exit: true, port: 0 });
      cmd = processCommand (['--help']);
      assert.deepStrictEqual (cmd, { code: 0, exit: true, port: 0 });
    });
  });

  describe ('help in command', function () {
    it ('should succeed', function () {
      let cmd = processCommand (['-p=2000', '-h']);
      assert.deepStrictEqual (cmd, { code: 0, exit: true, port: 2000 });
      cmd = processCommand (['-p=2000', '--help']);
      assert.deepStrictEqual (cmd, { code: 0, exit: true, port: 2000 });
    });
  });
});
