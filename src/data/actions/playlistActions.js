'use strict'

import PlaylistActionTypes from './playlistActionTypes'
import AppDispatcher       from './../appDispatcher'

const Actions = {
    subscribeTo(path, event, storePath) {
        AppDispatcher.dispatch({
            type: PlaylistActionTypes.SUBSCRIBE_TO,
            path,
            event,
            storePath
        })
    },

    subscribeResponse(name, value) {
        AppDispatcher.dispatch({
            type: PlaylistActionTypes.SUBSCRIBE_RESPONSE,
            name,
            value
        })
    },
}

export default Actions
