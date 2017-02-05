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
            this.history = [this.currentState];
            this.cancelled=[];
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
        if(states.hasOwnProperty(state)) {
            this.currentState = state;
            this.history.push(this.currentState);
            this.cancelled = [];
        }
        else throw new Error("State doesn't exist");
    }
    
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var states = this.config.states,
            prop = this.currentState,
            state = states[prop];
        if (event in state.transitions) {
            this.currentState = state.transitions[event];
            this.history.push(this.currentState);
            this.cancelled = [];
        }
        else throw new Error("State doesn't exist");
        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config.initial;
        this.history.push(this.currentState);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var states = this.config.states,
            state = {},
            result = [];
        if (!event) {
            return Object.getOwnPropertyNames(states);
        }
        else {
            for (var i in states) {
                state = states[i];
                if (event in state.transitions) {
                    result.push(i);
                }
            }
            return result;
        }
        
    }
        
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        var length = this.history.length;
        if (length <=1) {
            return false;
        }
        else {
            var el = this.history.pop();
            this.cancelled.push(el);
            this.currentState = this.history[this.history.length-1];
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        var length = this.cancelled.length;
        if (length <1) {
            return false;
        }
        else {
            var el = this.cancelled.pop();
            this.history.push(el);
            this.currentState = this.history[this.history.length-1];     
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [this.currentState];
        this.cancelled=[];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
