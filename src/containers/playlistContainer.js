'use strict'

// import area
import React                 from 'react'
import { Container }         from 'flux/utils'

// flux stuff
import WebsocketEvents       from './../data/utils/websocket/websocketEvents'
import Utils                 from './../data/utils/utils'

import AppStore              from './../data/stores/appStore'
import AppActions            from './../data/actions/appActions'
import PlaylistStore         from './../data/stores/playlistStore'
import PlaylistActions       from './../data/actions/playlistActions'
import PlaylistActionTypes   from './../data/actions/playlistActionTypes'

import Playlist              from './../views/playlist/playlist'

// variables area

class PlaylistContainer extends React.Component {
    constructor() {
        super()

        this.className = this.constructor.name
        this.state     = {}
        this.style     = {
            root: {
                display : 'flex',
                width   : '20%'
            },
        }

        this.defaultFiles = []
    }

    /*
    *
    */
    componentDidMount() {
        let path      = ['registration']
        let event     = WebsocketEvents.SEND_TRACK
        let storePath = ['playlist']

        PlaylistActions.subscribeTo(path, event, storePath)
    }

    /*
    *   loads all necessary stores
    *   NOTE: this is a required function for a container
    */
    static getStores() {
        let stores = [
            AppStore,
            PlaylistStore
        ]

        return stores
    }

    /*
    *   load your state here
    *   NOTE: this is a required function for a container
    */
    static calculateState(prevState) {
        let state = {
            appStore      : AppStore.getState(),
            playlistStore : PlaylistStore.getState()
        }

        return state
    }

    render() {
        let appStore      = this.state.appStore
        let playlistStore = this.state.playlistStore

        return (
            <div id='playlistContent' className='' style={this.style.root}>
                <Playlist {...this.state} />
            </div>
        )
    }

    /***************************************************************************
    *
    *                   help functions
    *
    ***************************************************************************/

}

export default Container.create(PlaylistContainer)
