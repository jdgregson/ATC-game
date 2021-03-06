/**
 * This file is part of ATC Game
 *   - Source Code: https://github.com/jdgregson/ATC-game
 *   - Live Game: http://jdgregson.com/atc-game/
 * License: GPLv3
 * Authors: Jonathan Gregson <jdgregson@gmail.com>
 */


class Aircraft {
  constructor(x, y, altitude = 0, airspeed = 0, heading = 0, callsign = 'ZZ000',
      type = 'commercial') {
    this._xPos = x;
    this._yPos = y;
    this._altitude = altitude;
    this._airspeed = airspeed/100;
    this._callsign = callsign;
    this._type = type;
    this._squawk = Aircraft.randomInt(1000, 9999);
    this._xStep = 0;
    this._yStep = 1;
    this._maxTracks = 100;
    this._trackOffset = 4;
    this._tracks = [];
    this._aircraftId;
    this._aircraftIndicator;
    this._boundNorth = -100;
    this._boundSouth = window.innerHeight;
    this._boundEast = window.innerWidth;
    this._boundWest = -100;

    this.setHeading(heading);
    this.setAircraftIndicator(x, y);
    this._aircraftId = this.getAircraftId();
    this._aircraftIndicator.appendChild(this._aircraftId);
  }

  update() {
    this.addTrack();
    this._xPos += this._xStep*this._airspeed;
    this._yPos += this._yStep*this._airspeed;
    this._aircraftIndicator.removeChild(this._aircraftId);
    this._aircraftId = this.getAircraftId();
    this._aircraftIndicator.appendChild(this._aircraftId);
    this._aircraftIndicator.style.left = `${this._xPos}px`;
    this._aircraftIndicator.style.top = `${this._yPos}px`;
  }

  addTrack() {
    while(this._tracks.length >= this._maxTracks) {
      document.body.removeChild(this._tracks[0]);
      this._tracks = this._tracks.splice(1, this._tracks.length-1);
    }
    let style = `left:${this._xPos+this._trackOffset}px;
        top:${this._yPos+this._trackOffset}px`;
    let track = document.createElement('div');
    track.setAttribute('class', `track ${this._type}`);
    track.setAttribute('style', style);
    this._tracks.push(track);
    document.body.appendChild(track);
  }

  getHeading() {
    return this._heading;
  }

  setHeading(heading) {
    while(heading > 360) {heading -= 360;}
    while(heading < 0) {heading += 360;}
    let cot = (x) => 1/Math.tan(x);
    let tan = (x) => Math.tan(x);
    let getXYStepFromHeading = (heading) => {
      let xy = [];
      let a = heading;
      if(45 <= a && a <= 135) {
        xy = [1, cot(Math.PI*a/180)];
      } else if(135 <= a && a <= 225) {
        xy = [-tan(Math.PI*a/180), -1];
      } else if(225 <= a && a <= 315) {
        xy = [-1, -cot(Math.PI*a/180)];
      } else {
        xy = [tan(Math.PI*a/180), 1];
      }
      xy[1] = -1*xy[1];
      return xy;
    }
    this._heading = heading;
    [this._xStep, this._yStep] = getXYStepFromHeading(this._heading);
  }

  isOutOfBounds() {
    if(this._xPos >= this._boundEast || this._yPos >= this._boundSouth ||
        this._xPos <= this._boundWest || this._yPos <= this._boundNorth) {
      return true;
    }
  }

  static randomInt(max, min) {
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

  getTracks() {
    return this._tracks;
  }

  getSquawk() {
    return this._squawk;
  }

  setSquawk(squawk) {
    this._squawk = squawk;
  }

  getCallsign() {
    return this._callsign;
  }

  setCallsign(callsign) {
    this._callsign = callsign;
  }

  getAircraftId() {
    let idPos = this.getHeading()>=0&&this.getHeading()<=180?'right':'left';
    this._aircraftIdObj = document.createElement('div');
    this._aircraftIdObj.setAttribute('class',
        `aircraft-id ${this._type} ${idPos}`);
    let fl = this.getAltitude();
    if(fl < 10) {
      fl = `00${fl}`;
    } else if(fl < 100) {
      fl = `0${fl}`;
    }
    this._aircraftIdObj.innerHTML = `
        <div>${this.getCallsign()}</div>
        <div>HD ${this.getHeading()}&#186;</div>
        <div>${this.getAirspeed()} kt<div>
        <div>FL ${fl}<div>`;
    return this._aircraftIdObj;
  }

  getAircraftIdText() {
    return this._aircraftId.innerText;
  }

  setAircraftId(id) {
    this._aircraftId.innerHTML = id;
  }

  getAircraftIndicator() {
    return this._aircraftIndicator;
  }

  setAircraftIndicator(x, y) {
    this._aircraftIndicator = document.createElement('div');
    this._aircraftIndicator.setAttribute('class', `aircraft ${this._type}`);
    this._aircraftIndicator.style.left = `${x}px`;
    this._aircraftIndicator.style.top = `${y}px`;
    let character = '?';
    if(this._type === 'commercial') {
      character = '&#9633;';
    } else if(this._type === 'civil') {
      character = '&#8420;';
    } else if(this._type === 'freighter') {
      character = '&#11197;';
    } else if(this._type === 'military') {
      character = '&#11096;';
    }

    this._aircraftIndicator.innerHTML =
        `<div class="aircraft-symbol ${this._type}">${character}</div>`;
  }

  getAirspeed() {
    return (this._airspeed*100).toFixed(1);
  }

  setAirspeed(airspeed) {
    this._airspeed = airspeed/100;
  }

  getAltitude() {
    return this._altitude;
  }

  setAltitude(altitude) {
    this._altitude = altitude/100;
  }

  getBounds() {
    return {
      n: this._boundNorth,
      s: this._boundSouth,
      e: this._boundEast,
      w: this._boundWest
    };
  }

  setBounds(n, s, e, w) {
    this._boundNorth = n;
    this._boundSouth = s;
    this._boundEast = e;
    this._boundWest = w;
  }
};
