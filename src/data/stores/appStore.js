'use strict'

// import area
import createMuiTheme  from '@material-ui/core/styles/createMuiTheme'

import Immutable       from 'immutable'

import AbstractStore   from './AbstractStore'
import AppActionTypes  from './../actions/appActionTypes'
import AppDataManager  from './../dataManagers/appDataManager'
import AppDispatcher   from './../appDispatcher'

import DefaultTheme    from './../assets/themes/theme_black-grey'
import { version }     from './../../../package.json'

import Utils           from './../utils/utils'
import LoadObjectState from './../utils/loadObject/loadObjectState'
import LoadObject      from './../utils/loadObject/loadObject'

// variables area

class AppStore extends AbstractStore {
    constructor() {
       super(AppDispatcher)

       this.className                 = this.constructor.name
       this.appDataManager            = new AppDataManager()

       this.establishSocketConnection = this.establishSocketConnection.bind(this)
       this.registerAtServer          = this.registerAtServer.bind(this)
    }

    getInitialState() {
        const defaultThemeName    = DefaultTheme.name
        const defaultThemePalette = DefaultTheme.palette
        const defaultThemeType    = 'dark'

        let themePalette  = defaultThemePalette
        themePalette.type = defaultThemeType

        let defaultTheme  = createMuiTheme({
            palette: themePalette
        })

        let initialState = Immutable.Map({
            version   : version,
            socket    : undefined,
            files     : Immutable.Map(),
            buffer    : Immutable.Map(),
            theme     : {
                name   : defaultThemeName,
                type   : defaultThemeType,
                object : defaultTheme,
            },
            getEntry  : this.getEntry.bind(this),
        })

       return initialState
    }

    reduce(state, action) {
        switch (action.type) {
            case AppActionTypes.CHANGE_THEME: {
                console.log(`[${this.className}] ${action.type}`)

                // return state.setIn(['themeName'], action.theme)
                return state
            }

            case AppActionTypes.FETCH_DATA: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                let loadObject = this.appDataManager.fetchData(action.id, action.key, action.path, action.data)

                return state.setIn(['files', action.id], loadObject)
            }

            case AppActionTypes.FETCH_DATA_RESPONSE: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                let fetchId           = action.id
                let fetchKey          = action.response.key
                let updatedLoadObject = action.response

                // console.log(`[${this.className}] data fetched: ${fetchKey}`)

                state = state.setIn(['files', fetchId], updatedLoadObject)

                let clearedBuffer = this.clearBuffer(state, fetchKey)

                // set the empty buffer to trigger a render cycle
                return state.setIn(['buffer', fetchKey], clearedBuffer)
            }

            case AppActionTypes.ESTABLISH_CONNECTION: {
                // console.log(`[${this.className}] ${action.type}`)
                let isFilePending  = this.isPending(action.path)
                let func           = this.establishSocketConnection

                if(isFilePending) {
                    let bufferName   = action.path[0]
                    let bufferedList = this.addToBuffer(action, func)

                    return state.setIn(['buffer', bufferName], bufferedList)
                }
                else {
                    let loadObject = func(state, action)

                    return state.setIn(['socket'], loadObject)
                }
            }

            case AppActionTypes.ESTABLISH_CONNECTION_RESPONSE: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                let fetchKey      = action.response.key
                let clearedBuffer = undefined

                // clear socket command buffer

                state         = state.setIn(['socket'], action.response)
                clearedBuffer = this.clearBuffer(state, fetchKey)

                return state.setIn(['buffer', fetchKey], clearedBuffer)
            }

            case AppActionTypes.SEND_REQUEST: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                return state
            }

            case AppActionTypes.SEND_REQUEST_RESPONSE: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                return state
            }

            case AppActionTypes.REGISTER_AT_SERVER: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                let isFilePending  = this.isPending(action.path)
                let func           = this.registerAtServer
                let loadObject     = new LoadObject(action.id, action.key, undefined, undefined, undefined, action.data)
                let updatedState   = state.setIn(['files', action.id], loadObject)

                if(isFilePending) {
                    let bufferName   = action.path[0]
                    let bufferedList = this.addToBuffer(action, func)

                    return updatedState.setIn(['buffer', bufferName], bufferedList)
                }
                else {
                    this.registerAtServer(updatedState, action)

                    return updatedState
                }
            }

            case AppActionTypes.REGISTER_AT_SERVER_RESPONSE: {
                console.log(`[${this.className}] ${action.type}`)
                console.log(action)

                let response      = action.loadObject
                let fetchKey      = response.key
                let clearedBuffer = undefined

                state         = state.setIn([response.id], response)
                clearedBuffer = this.clearBuffer(state, fetchKey)

                return state.setIn(['buffer', fetchKey], clearedBuffer)
            }

            default: {
               // console.log(`[${this.className}] unknown type`)
               return state
           }
       }
    }

    /*************************************************
    *
    *                   help functions
    *
    *************************************************/

    establishSocketConnection(state, action) {
        console.log(`[${this.className}] establishSocketConnection`)
        console.log(action)

        let config     = this.getFileEntry(state, [action.path[0]])
        let path       = Array.from(action.path)
        let newId      = Utils.getUID()

        path.shift()

        let loadObject = this.appDataManager.establishWebSocketConnection(newId, config, path)

        return loadObject
    }

    registerAtServer(state, action) {
        console.log(`[${this.className}] registerAtServer`)
        console.log(action)
        let registrationObject = this.getFile(state, action.key)

        this.appDataManager.registerAtServer(registrationObject, action.data)
    }
}

export default new AppStore()
