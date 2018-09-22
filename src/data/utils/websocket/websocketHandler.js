'use strict'

// import area
import io              from 'socket.io-client'
import SocketListener  from './socketListener'
import WebsocketEvents from './websocketEvents'


// variable area

// list with all values which are observed
let subscriptions = new Map()

// list with all objects which wants to get notified
let listeners     = new Map()

/**
*   This class is the connection to the python backend.
*   You can retrieve all values you want to read over
*   this class.
**/
class WebSocketHandler {
    constructor() {
        this.className           = this.constructor.name
        this.socket              = undefined

        this.initSocket          = this.initSocket.bind(this)
        this.addListener         = this.addListener.bind(this)

        this.onRegisterResponse  = this.onRegisterResponse.bind(this)
        this.onConnect           = this.onConnect.bind(this)
        this.onConnectError      = this.onConnectError.bind(this)
        this.onConnectTimeout    = this.onConnectTimeout.bind(this)
        this.onError             = this.onError.bind(this)
        this.registerMe          = this.registerMe.bind(this)
        this.send                = this.send.bind(this)
        this.onSubscriptionEvent = this.onSubscriptionEvent.bind(this)
    }

    initSocket(url) {
        let promise = new Promise((resolve, reject) => {
            let socket = io(url)
            this.socket = socket

            this.socket.once(WebsocketEvents.CONNECT, () => { resolve(this.socket) })
            this.socket.once(WebsocketEvents.CONNECT, this.onConnect)
            this.socket.once(WebsocketEvents.CONNECT_ERROR, this.onConnectError)
            this.socket.once(WebsocketEvents.CONNECT_TIMEOUT, this.onConnectTimeout)
            this.socket.once(WebsocketEvents.ERROR, this.onError)

            // TODO: fix this!
            resolve()
        })

        return promise
    }

    subscribeTo(name, callback) {
        console.log(`[${this.className}] add listener for ${name}`)

        // subscribes to the event name
        this.addSubscription(name)

        // adds the given listener
        this.addListener(name, callback)
    }

    // TODO: add function - unsubscribeFrom(name, callback)

    registerMe(registration) {
        let promise = new Promise((resolve, reject) => {
            // console.log(`[${this.className}] registering you in the system`)

            // this.socket.once(WebsocketEvents.REGISTER_RESPONSE, this.onRegisterResponse)
            this.socket.once(WebsocketEvents.REGISTER_RESPONSE, (response) => {
                console.log(`[${this.className}] REGISTER_RESPONSE`)
                console.log(response)

                resolve(response)
            })

            this.send(WebsocketEvents.REGISTER, registration)

        })

        return promise
    }

    send(name, value) {
        // console.log(`[${this.className}] send ${name} with ${value} `)

        let message = {
            id: this.socket.id,
            message: value
        }

        this.socket.emit(name, message)
    }

    onConnect() {
        // console.log(`[${this.className}] connection established`)

        this.send('test', 'hi this is a test')
        // this.registerMe()
    }

    onConnectError() {
        console.error(`[${this.className}] connect_error`)

        this.socket.close()
    }

    onConnectTimeout() {
        console.error(`[${this.className}] connect_timeout`)
        this.socket.close()
    }

    onError() {
        console.error(`[${this.className}] error`)
        this.socket.close()
    }

    onRegisterResponse(message) {
        console.log(`[${this.className}] response received `)
        console.log(message)
    }

    onSubscriptionEvent(source, event) {
        // console.log(`[${this.className}] event ${source} received`)
        // console.log(event)

        let callbacks = listeners.get(source)

        for(let func of callbacks)
            func(source, event)
    }

    /**************************************************************************
    *
    *                               help functions
    *
    **************************************************************************/

    addSubscription(name) {
        console.log(`[${this.className}] addSubscription`)

        let hasSubscription = subscriptions.get(name)
        let subscriber      = undefined

        if(!hasSubscription) {
            subscriber = new SocketListener(this.socket, name, this.onSubscriptionEvent)
            subscriptions.set(name, subscriber)
        }
    }

    addListener(name, func) {
        console.log(`[${this.className}] addListener`)
        
        let callbacks = listeners.get(name)

        if(!callbacks)
            callbacks = [func]
        else {
            let newCallbacks = Array.from(callbacks)
            newCallbacks.push(func)

            callbacks = newCallbacks
        }

        listeners.set(name, callbacks)
    }

}

export default new WebSocketHandler()
