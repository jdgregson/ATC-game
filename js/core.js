/**
 * This file is part of ATC Game
 *   - Source Code: https://github.com/jdgregson/ATC-game
 *   - Live Game: http://jdgregson.com/atc-game/
 * License: GPLv3
 * Authors: Jonathan Gregson <jdgregson@gmail.com>
 */


class Core {
  constructor() {
  }

  static randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randStr(numChars) {
    let str = '';
    for(let i of Array(numChars)) {
      str += String.fromCharCode(Core.randInt(65, 90));
    }
    return str;
  }

  static randFlightNumber() {
    return `${Core.randStr(Core.randInt(2, 3))}${Core.randInt(100, 999)}`;
  }
};
