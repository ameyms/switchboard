/* @flow */
import EventEmitter from 'event-emitter';

export default class SwitchBoard extends EventEmitter {

    constructor() {

    }


    addPlace(place, url, dependencies, opts) {
        console.log('Not yet implemented', place, url, dependencies, opts);
    }

    onPlaceChange(place, params) {
        console.log('Not yet implemented', place, params);
    }

    onError(callback: (() => void)) {
        console.log('Not yet implemented', callback);
    }
};
