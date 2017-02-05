"use strict";
class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config) throw new Error("Config not passed");
        else {
            this.config = config;
            this.currentState = this.config.initial;
        }
    }
    
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        if (this.config) return this.currentState;
    }
    
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        var states = this.config.states;
        if(states.hasOwnProperty(state)) this.currentState = state;
        else throw new Error("State doesn't exist");
    }
    
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var states = this.config.states;
        var prop = this.currentState;
        var state = states[prop];
        if (event in state.transitions) this.currentState = state.transitions[event];
        else throw new Error("State doesn't exist");
        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.config.initial =  this.defaultState;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

var config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};
var stud2 = new FSM(config);
console.log(stud2.getState());
/*stud2.changeState('hungry');
console.log(stud2.getState());*/
stud2.trigger('study');
/*stud2.trigger('eat');*/
console.log(stud2.getState());
/*stud2.trigger('kill');*/
module.exports = FSM;

/** @Created by Uladzimir Halushka **/
