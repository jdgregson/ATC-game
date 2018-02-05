/**
 * This file is part of ATC Game
 *   - Source Code: https://github.com/jdgregson/ATC-game
 *   - Live Game: http://jdgregson.com/atc-game/
 * License: GPLv3
 * Authors: Jonathan Gregson <jdgregson@gmail.com>
 */


let initialAircraft = 3;
let maxAircraft = 7;
let updateSpeed = 1500;
let spawnSpeed = 3000;
let randomizeSpeed = 1500;
let aircraft = [];
let cleanupJobs = [];
let timers = [];

window.addEventListener('load', () => {
  // spawn some initial flights
  for(let i of Array(initialAircraft)) {
    aircraft.push(Spawner.spawnAircraft(true));
  }

  // set a timer to randomly change flight headings
  window.randomizer = self.setInterval(() => {
    if(Core.randInt(1, 50) === 25) {
      randAircraft = Core.randInt(0, maxAircraft);
      randTurn = Core.randInt(1, 2) === 1? Core.randInt(1,5):-Core.randInt(1,5);
      if(aircraft[randAircraft]) {
        let turn = () => {
          try {
            let currentAircraft = aircraft[randAircraft];
            currentAircraft.setHeading(currentAircraft.getHeading()+randTurn);
          } catch(e) {}
        };
        turn();
        if(Core.randInt(1, 10) === 1) {
          self.setInterval(turn, 100*Core.randInt(10, 30));
        } else {
          for(let i=0; i<7; i++) {
            self.setTimeout(turn, 1000*i);
          }
        }
      }
    }
  }, randomizeSpeed);

  // set a timer to with a garbage collector clean up orphaned flight tracks
  timers.push(new GarbageCollector(cleanupJobs, updateSpeed));

  // set a timer with a spawner to create random aircraft
  timers.push(new Spawner(aircraft, spawnSpeed, maxAircraft));

  // set a timer to update all flight positions and remove them if they fly
  // off the screen
  window.mainTimer = self.setInterval(() => {
    for(let i=0; i<aircraft.length; i++) {
      let currentAircraft = aircraft[i];
      if(currentAircraft) {
        currentAircraft.update();
        if(currentAircraft.isOutOfBounds()) {
          document.body.removeChild(currentAircraft.getAircraftIndicator());
          cleanupJobs.push(currentAircraft.getTracks());
          aircraft.splice(i, 1);
        }
      }
    }
  }, updateSpeed);

});
