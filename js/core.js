/**
 * This file is part of ATC Game
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

  static spawnBogie(spawnOnEdge = false) {
    let x = Core.randInt(0, window.innerWidth);
    let y = Core.randInt(0, window.innerHeight);
    if(spawnOnEdge) {
      if(Core.randInt(1, 2) === 1) {
        y = 0;
      } else {
        x = 0;
      }
    }
    let bogie = new Bogie(
      x,                      // X coordinate
      y,                      // Y coordinate
      Core.randInt(1, 450),   // altitude
      Core.randInt(100, 600), // airspeed
      Core.randInt(0, 360),   // heading
      Core.randFlightNumber() // callsign
    );
    bogie.setHeading(Core.randInt(0, 360));
    bogie.setAirspeed(Core.randInt(150, 600));
    document.body.appendChild(bogie.getBogieIndicator());
    return bogie;
  }
};
