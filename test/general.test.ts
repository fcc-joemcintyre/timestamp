import { expect } from 'earljs';
import { processCommand } from '../src/cmd.js';

describe ('cmd', function () {
  describe ('empty command', function () {
    it ('should not fail', function () {
      const cmd = processCommand ([]);
      expect (cmd).toEqual ({ code: 0, exit: false, port: 3000 });
    });
  });

  describe ('invalid standalone option', function () {
    it ('should fail with code 1', function () {
      const cmd = processCommand (['-j']);
      expect (cmd).toEqual ({ code: 1, exit: true, port: 3000 });
    });
  });

  describe ('invalid settings option', function () {
    it ('should fail with code 1', function () {
      const cmd = processCommand (['-j=foo.js']);
      expect (cmd).toEqual ({ code: 1, exit: true, port: 3000 });
    });
  });

  describe ('proper port command', function () {
    it ('should succeed', function () {
      const cmd = processCommand (['-p=2000']);
      expect (cmd).toEqual ({ code: 0, exit: false, port: 2000 });
    });
  });

  describe ('port out of range (negative)', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=-1']);
      expect (cmd).toEqual ({ code: 1, exit: true, port: -1 });
    });
  });

  describe ('port out of range (positive)', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=200000']);
      expect (cmd).toEqual ({ code: 1, exit: true, port: 200000 });
    });
  });

  describe ('port not an integer', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=2000.5']);
      expect (cmd).toEqual ({ code: 1, exit: true, port: 2000.5 });
    });
  });

  describe ('port not a number', function () {
    it ('should fail', function () {
      const cmd = processCommand (['-p=ABC']);
      expect (cmd.code).toEqual (1);
      expect (cmd.exit).toEqual (true);
      expect (Number.isNaN (cmd.port)).toEqual (true);
    });
  });

  describe ('unary help command', function () {
    it ('should succeed', function () {
      let cmd = processCommand (['-h']);
      expect (cmd).toEqual ({ code: 0, exit: true, port: 3000 });
      cmd = processCommand (['--help']);
      expect (cmd).toEqual ({ code: 0, exit: true, port: 3000 });
    });
  });

  describe ('help in command', function () {
    it ('should succeed', function () {
      let cmd = processCommand (['-p=2000', '-h']);
      expect (cmd).toEqual ({ code: 0, exit: true, port: 2000 });
      cmd = processCommand (['-p=2000', '--help']);
      expect (cmd).toEqual ({ code: 0, exit: true, port: 2000 });
    });
  });
});
