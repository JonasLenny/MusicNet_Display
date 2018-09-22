'use strict'

/******************************************************************************/
// import area

import Utils            from './../utils/utils'
import XhrHandler       from './../utils/xhrHandler'
import WebSocketHandler from './../utils/websocket/websocketHandler'
import LoadObject       from './../utils/loadObject/loadObject'
import LoadObjectState  from './../utils/loadObject/loadObjectState'

import PlaylistActions  from './../actions/playlistActions'


/******************************************************************************/
// variables area

class PlaylistDataManager {
    constructor() {
        this.className              = this.constructor.name
        this.config                 = undefined
        this.subscriptions          = new Map()

        this.getURL                 = this.getURL.bind(this)
        this.subscribeTo            = this.subscribeTo.bind(this)
        this.onSubscriptionResponse = this.onSubscriptionResponse.bind(this)
    }

    subscribeTo(name, target) {
        console.log(`[${this.className}] subscribeTo ${name}`)

        this.subscriptions.set(name, target)
        WebSocketHandler.subscribeTo(name, this.onSubscriptionResponse)
    }

    onSubscriptionResponse(name, value) {
        console.log(`[${this.className}] event: ${name}`)
        console.log(value)

        let target = this.subscriptions.get(name)[0]

        PlaylistActions.subscribeResponse(target, value)
    }


    /*************************************************
    *
    *                   help functions
    *
    *************************************************/

    getURL(config, path) {
        let url      = ''
        let server   = config.project.server
        let endpoint = Utils.getObjectEntry(config, path)

        url += server.domain

        if(server.port)
            url += `:${server.port}`

        url += endpoint

        return url
    }
}

export default PlaylistDataManager
