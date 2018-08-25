'use strict'

// import area
import Immutable           from 'immutable'

import AbstractStore       from './AbstractStore'
import AppActionTypes      from './../actions/appActionTypes'
import PlaylistActionTypes from './../actions/playlistActionTypes'
import PlaylistDataManager from './../dataManagers/playlistDataManager'
import AppDispatcher       from './../appDispatcher'

import Utils               from './../utils/utils'
import LoadObjectState     from './../utils/loadObject/loadObjectState'
import LoadObject          from './../utils/loadObject/loadObject'

// variables area

class PlaylistStore extends AbstractStore {
    constructor() {
       super(AppDispatcher)

       this.className                 = this.constructor.name
       this.playlistDataManager       = new PlaylistDataManager()

       this.establishSocketConnection = this.establishSocketConnection.bind(this)
       this.registerAtServer          = this.registerAtServer.bind(this)
    }

    getInitialState() {
        let initialState = Immutable.Map({
            socket        : undefined,
            subscriptions : Immutable.Map(),
            buffer        : Immutable.Map(),
            files         : Immutable.Map(),
            playlist      : Immutable.Map(),
        })

       return initialState
    }

    reduce(state, action) {
        switch (action.type) {
            case AppActionTypes.REGISTER_AT_SERVER: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                let loadObject = new LoadObject(action.id, action.key, undefined, undefined, undefined, action.data)


                return state.setIn([action.key], loadObject)
            }

            case AppActionTypes.REGISTER_AT_SERVER_RESPONSE: {
                // console.log(`[${this.className}] ${action.type}`)
                // console.log(action)

                let response         = action.loadObject
                let fetchKey         = response.key
                let clearedBuffer    = undefined
                let selectedBindings = this.setDefaultSelection(response.value.bindings)

                state = state.setIn(['selectedBindings'], selectedBindings)
                state = state.setIn(['bindings'], response.value.bindings)
                state = state.setIn([response.id], response)

                clearedBuffer = this.clearBuffer(state, fetchKey)

                return state.setIn(['buffer', fetchKey], clearedBuffer)
            }

            case PlaylistActionTypes.SUBSCRIBE_TO: {
                // console.log(`[${this.className}] ${action.type}`)
                // console.log(action)

                let isFilePending  = this.isPending(action.path)
                let func           = this.subscribeTo
                let updatedState   = state.setIn(['subscriptions', action.event], undefined)

                if(isFilePending) {
                    let bufferName   = action.path[0]
                    let bufferedList = this.addToBuffer(action, func)

                    return updatedState.setIn(['buffer', bufferName], bufferedList)
                }
                else {
                    func(state, action)

                    return updatedState
                }
            }

            case PlaylistActionTypes.SUBSCRIBE_RESPONSE: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                return state.setIn(action.name, action.value)
            }
       }
    }

    /*************************************************
    *
    *                   help functions
    *
    *************************************************/

    subscribeTo(state, action) {
        // console.log(`[${this.className}] subscribeTo ${action.event}`)
        // console.log(action)

        this.playlistDataManager.subscribeTo(action.event, action.storePath)
    }
}

export default new PlaylistStore()
