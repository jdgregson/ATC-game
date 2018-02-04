/**
 * This file is part of ATC Game
 * License: GPLv3
 * Authors: Jonathan Gregson <jdgregson@gmail.com>
 */

class GarbageCollector {
  constructor(cleanupJobs, cleanupInterval = 1000) {
    this._cleanupJobs = cleanupJobs;
    this._cleanupInterval = cleanupInterval;
    this._paused = false;

    this._timer = self.setInterval(() => {
      if(!this._paused) {
        this.collectGarbage(this._cleanupJobs);
      }
    }, this._cleanupInterval);
  }

  collectGarbage(cleanupJobs) {
    let allJobsFinished = true;
    for(let i=0; i<this._cleanupJobs.length; i++) {
      let cleanupJob = this._cleanupJobs[i];
      if(cleanupJob.length >= 1) {
        allJobsFinished = false;
        document.body.removeChild(cleanupJob[0]);
        this._cleanupJobs[i] = cleanupJob.splice(1, cleanupJob.length-1);
      } else {
        this._cleanupJobs.splice(i, 1);
      }
    }
  }

  pause() {
    this._paused = true;
  }

  resume() {
    this._paused = false;
  }

  getCleanupInterval() {
    return this._cleanupInterval;
  }

  setCleanupInterval(cleanupInterval) {
    this._cleanupInterval = cleanupInterval;
  }

  getCleanupJobs() {
    return this._cleanupJobs;
  }

  setCleanupJobs(cleanupJobs) {
    this._cleanupJobs = cleanupJobs;
  }
};
