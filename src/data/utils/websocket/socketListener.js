'use strict'

/**
*   This class is a wrapper for events. It forwards
*   the origin event and extend it with the source name.
**/
class SocketListener {
    constructor(source, valueName, callback) {
        this.className = this.constructor.name

        console.log(`[${valueName}] add listener`)
        // console.log(simSettings)

        this.valueName = valueName
        this.callback  = callback
        this.onEvent   = this.onEvent.bind(this)

        source.on(valueName, this.onEvent)
    }

    // if new data has been received
    // call the given callback function
    onEvent(event) {
        console.log(`[${this.valueName}] event received`)
        this.callback(this.valueName, event)
    }
}

export default SocketListener
