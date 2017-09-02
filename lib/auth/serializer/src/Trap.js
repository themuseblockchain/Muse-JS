"use strict";

var Trap = {};
var trapBuffer = 28;
var trapHit = false;
var resetTrap = true;
var trapActivated = false;

Trap.checkTrap = function (b) {
    if (trapActivated && !trapHit && b.offset >= trapBuffer) {
        if (!resetTrap) {
            trapHit = true;
        }

        debugger;
    }
};

module.exports = Trap;