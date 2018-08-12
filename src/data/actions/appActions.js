'use strict'

import AppActionTypes from './appActionTypes'
import AppDispatcher  from './../appDispatcher'

const Actions = {
    changeTheme(newTheme) {
        AppDispatcher.dispatch({
            type: AppActionTypes.CHANGE_THEME,
            newTheme
        })
    },

    fetchData(id, key, path, data) {
        console.log('AppActions fetch data')

        AppDispatcher.dispatch({
            type: AppActionTypes.FETCH_DATA,
            id,
            key,
            path,
            data
        })
    },

    fetchDataResponse(id, response) {
        AppDispatcher.dispatch({
            type: AppActionTypes.FETCH_DATA_RESPONSE,
            id,
            response
        })
    },

    establishConnection(path) {
        AppDispatcher.dispatch({
            type: AppActionTypes.ESTABLISH_CONNECTION,
            path
        })
    },

    establishConnectionResponse(response) {
        AppDispatcher.dispatch({
            type: AppActionTypes.ESTABLISH_CONNECTION_RESPONSE,
            response
        })
    },

    // NOTE: not finished
    sendRequest() {
        AppDispatcher.dispatch({
            type: AppActionTypes.SEND_REQUEST,

        })
    },

    // NOTE: not finished
    sendRequestResponse(name, value) {
        AppDispatcher.dispatch({
            type: AppActionTypes.SEND_REQUEST_RESPONSE,

        })
    },

    registerAtServer(id, key, path, data) {
        AppDispatcher.dispatch({
            type: AppActionTypes.REGISTER_AT_SERVER,
            id,
            key,
            path,
            data
        })
    },

    registerAtServerResponse(loadObject) {
        AppDispatcher.dispatch({
            type: AppActionTypes.REGISTER_AT_SERVER_RESPONSE,
            loadObject
        })
    }
}

export default Actions
