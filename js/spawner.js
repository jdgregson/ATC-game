/**
 * This file is part of ATC Game
 * License: GPLv3
 * Authors: Jonathan Gregson <jdgregson@gmail.com>
 */

class Spawner {
  constructor(aircraftArray, spawnInterval, maxAircraft) {
    this._aircraftArray = aircraftArray;
    this._spawnInterval = spawnInterval;
    this._maxAircraft = maxAircraft;
    this._paused = false;

    this._timer = self.setInterval(() => {
      if(!this._paused && this._aircraftArray.length < this._maxAircraft) {
        this._aircraftArray.push(Spawner.spawnAircraft());
      }
    }, this._spawnInterval);
  }

  static spawnAircraft(onScreen = false) {
    let x = Core.randInt(1, window.innerWidth);
    let y = Core.randInt(1, window.innerHeight);
    let callsign = Core.randFlightNumber();
    let type;
    let airspeed;
    let altitude;
    let rand;

    // determine which direction the aircraft should enter the control area from
    if(!onScreen) {
      rand = Core.randInt(1, 4);
      if(rand === 1) { // spawn on the north side of the screen
        x = Core.randInt(1, window.innerWidth);
        y = -50;
      } else if(rand === 2) { // spawn on the south side of the screen
        x = Core.randInt(1, window.innerWidth);
        y = window.innerHeight + 50;
      } else if(rand === 3) { // spawn on the east side of the screen
        x = window.innerWidth + 50;
        y = Core.randInt(1, window.innerHeight);
      } else { // spawn on the west side of the screen
        x = -50;
        y = Core.randInt(1, window.innerHeight);
      }
    }

    // determine what type of aircraft it is and set the altitude and airspeed
    // based on its type
    rand = Core.randInt(1, 10);
    if(rand < 4) {
      type = 'civil';
      altitude = Core.randInt(1, 750);
      airspeed = Core.randInt(100, 300);
    } else if(rand < 6) {
      type = 'freighter';
      altitude = Core.randInt(300, 450);
      airspeed = Core.randInt(300, 550);
    }  else if(rand < 10) {
      type = 'commercial';
      altitude = Core.randInt(300, 480);
      airspeed = Core.randInt(400, 570);
    } else {
      type = 'military';
      altitude = Core.randInt(100, 550);
      airspeed = Core.randInt(1, 1300);
      callsign = '';
    }

    // spawn the aircraft
    let aircraft = new Aircraft(
      x,                    // X coordinate
      y,                    // Y coordinate
      altitude,             // altitude
      airspeed,             // airspeed
      Core.randInt(0, 360), // heading
      callsign,             // callsign
      type                  // type
    );
    document.body.appendChild(aircraft.getAircraftIndicator());
    //this._aircraftArray.push(aircraft);
    return aircraft;
  }

  pause() {
    this._paused = true;
  }

  resume() {
    this._paused = false;
  }

  getSpawnInterval() {
    return this._spawnInterval;
  }

  setSpawnInterval(spawnInterval) {
    this._spawnInterval = spawnInterval;
  }

  getAircraftArray() {
    return this._aircraftArray;
  }

  setAircraftArray(aircraftArray) {
    this._aircraftArray = aircraftArray;
  }
};
