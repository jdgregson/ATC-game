/**
 * This file is part of ATC Game
 * License: GPLv3
 * Authors: Jonathan Gregson <jdgregson@gmail.com>
 */

let initialBogies = 10;
let maxBogies = 15;
let updateSpeed = 500;
let spawnSpeed = 3000;
let randomizeSpeed = 1000;
let bogies = [];
let cleanupJobs = [];
let timers = [];

window.addEventListener('load', () => {
  // spawn some initial flights
  for(let i of Array(initialBogies)) {
    bogies.push(Core.spawnBogie());
  }

  // set a timer to randomly change flight headings
  window.randomizer = self.setInterval(() => {
    if(Core.randInt(1, 50) === 25) {
      randBogie = Core.randInt(0, maxBogies);
      randTurn = Core.randInt(1, 2) === 1? Core.randInt(1,5):-Core.randInt(1,5);
      if(bogies[randBogie]) {
        let turn = () => {
          try {
            let bogie = bogies[randBogie];
            bogie.setHeading(bogie.getHeading()+randTurn);
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

  // set a timer to clean up orphaned flight tracks
  timers.push(new GarbageCollector(cleanupJobs, updateSpeed));

  // set a timer to spawn some more bogies
  window.bogieSpawner = self.setInterval(() => {
    if(bogies.length < maxBogies) {
      bogies.push(Core.spawnBogie(true));
    }
  }, spawnSpeed);

  // set a timer to update all flight positions and remove them if they fly
  // off the screen
  window.mainTimer = self.setInterval(() => {
    for(let i=0; i<bogies.length; i++) {
      let bogie = bogies[i];
      if(bogie) {
        bogie.update();
        if(bogie.isOutOfBounds()) {
          document.body.removeChild(bogie.getBogieIndicator());
          cleanupJobs.push(bogies[i].getTracks());
          bogies.splice(i, 1);
        }
      }
    }
  }, updateSpeed);

});
