'use strict'

// import area
import State from './loadObjectState'

// variables area

class LoadObject {
    constructor(id = 'unknown', key = undefined, request = undefined, state = State.NEW, message = undefined, value = undefined) {
        this.className    = this.constructor.name
        this.id           = id
        this.key          = key
        this.request      = request
        this.state        = state
        this.stateMessage = message
        this.value        = value
    }

    getState() {
        return this.state
    }

    getValue() {
        return this.value
    }

    hasSuccess() {
        let isSuccess = this.state === State.SUCCESS

        return isSuccess
    }

    hasError() {
        let isError = this.state === State.ERROR

        return isError
    }

    updateValue(value) {
        let updatedObject = new LoadObject(
            this.id,
            this.key,
            this.request,
            this.state,
            this.stateMessage,
            value
        )

        return updatedObject
    }

    setPending(message) {
        let updatedObject = new LoadObject(
            this.id,
            this.key,
            this.request,
            State.PENDING,
            message,
            this.value
        )

        return updatedObject
    }

    setSuccess(message) {
        let updatedObject = new LoadObject(
            this.id,
            this.key,
            this.request,
            State.SUCCESS,
            message,
            this.value
        )

        return updatedObject
    }

    setError(message) {
        let updatedObject = new LoadObject(
            this.id,
            this.key,
            this.request,
            State.ERROR,
            message,
            this.value
        )

        return updatedObject
    }
}

export default LoadObject
