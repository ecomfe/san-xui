/**
 * https://wicg.github.io/ResizeObserver/
 *
 * @file ResizeObserver.js
 * @author devrelm
 */

const resizeObservers = [];

function ResizeObserver(callback) { // eslint-disable-line
    resizeObservers.push(this);
    this.__callback = callback;
    this.__observationTargets = [];
    this.__activeTargets = [];
}

ResizeObserver.prototype.observe = function (target) {
    let resizeObservationIndex = findTargetIndex(this.__observationTargets, target);
    if (resizeObservationIndex >= 0) {
        return;
    }

    let resizeObservation = new ResizeObservation(target);
    this.__observationTargets.push(resizeObservation);
};

ResizeObserver.prototype.unobserve = function (target) {
    let resizeObservationIndex = findTargetIndex(this.__observationTargets, target);
    if (resizeObservationIndex === -1) {
        return;
    }

    this.__observationTargets.splice(resizeObservationIndex, 1);
};

ResizeObserver.prototype.disconnect = function () {
    this.__observationTargets = [];
    this.__activeTargets = [];
};

ResizeObserver.prototype.__populateActiveTargets = function () {
    this.__activeTargets = [];
    for (let key in this.__observationTargets) {
        let resizeObservation = this.__observationTargets[key];
        if (resizeObservation.isActive()) {
            this.__activeTargets.push(resizeObservation);
        }

    }
};

function ResizeObserverEntry(target) { // eslint-disable-line
    this.__target = target;
    this.__clientWidth = getWidth(target);
    this.__clientHeight = getHeight(target);
}

ResizeObserverEntry.prototype.target = function () {
    return this.__target;
};

ResizeObserverEntry.prototype.clientWidth = function () {
    return this.__clientWidth;
};

ResizeObserverEntry.prototype.clientHeight = function () {
    return this.__clientHeight;
};

function ResizeObservation(target) { // eslint-disable-line
    this.__target = target;
    this.__lastBroadcastWidth = getWidth(target);
    this.__lastBroadcastHeight = getHeight(target);
}

ResizeObservation.prototype.target = function () {
    return this.__target;
};

ResizeObservation.prototype.lastBroadcastWidth = function () {
    return this.__lastBroadcastWidth;
};

ResizeObservation.prototype.lastBroadcastHeight = function () {
    return this.__lastBroadcastHeight;
};

ResizeObservation.prototype.isActive = function () {
    if (getWidth(this.__target) !== this.lastBroadcastWidth()
        || getHeight(this.__target) !== this.lastBroadcastHeight()) {
        return true;
    }

    return false;
};

function findTargetIndex(collection, target) {
    for (let index = 0; index < collection.length; index += 1) {
        if (collection[index].target() === target) {
            return index;
        }

    }
}

function getWidth(target) {
    return target.getBoundingClientRect().width;
}

function getHeight(target) {
    return target.getBoundingClientRect().height;
}

function gatherActiveObservers() {
    for (let index = 0; index < resizeObservers.length; index += 1) {
        resizeObservers[index].__populateActiveTargets();
    }
}

function broadcastActiveObservations() {
    for (let roIndex = 0; roIndex < resizeObservers.length; roIndex++) {
        let resizeObserver = resizeObservers[roIndex];
        if (resizeObserver.__activeTargets.length === 0) {
            continue;
        }

        let entries = [];

        for (let atIndex = 0; atIndex < resizeObserver.__activeTargets.length; atIndex += 1) {
            let resizeObservation = resizeObserver.__activeTargets[atIndex];
            let entry = new ResizeObserverEntry(resizeObservation.target());
            entries.push(entry);
            resizeObservation.__lastBroadcastWidth = getWidth(resizeObservation.target());
            resizeObservation.__lastBroadcastHeight = getHeight(resizeObservation.target());
        }

        resizeObserver.__callback(entries);
        resizeObserver.__activeTargets = [];
    }
}

function frameHandler() {
    gatherActiveObservers();
    broadcastActiveObservations();

    setFrameWait(frameHandler);
}

function setFrameWait(callback) {
    if (typeof window.requestAnimationFrame === 'undefined') {
        window.setTimeout(callback, 1000 / 60);
    }
    else {
        window.requestAnimationFrame(callback);
    }
}

setFrameWait(frameHandler);

export default ResizeObserver;
