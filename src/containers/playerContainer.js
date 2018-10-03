'use strict'

// import area
import React                 from 'react'
import { Container }         from 'flux/utils'

import Typography            from '@material-ui/core/Typography'

import Utils                 from './../data/utils/utils'
import WebsocketEvents       from './../data/utils/websocket/websocketEvents'

import AppStore              from './../data/stores/appStore'
import AppActions            from './../data/actions/appActions'
import PlaylistStore         from './../data/stores/playlistStore'
import PlaylistActions       from './../data/actions/playlistActions'
import PlaylistActionTypes   from './../data/actions/playlistActionTypes'

import Player                from './../views/player/player'

// views/containers

// variables area

class PlayerContainer extends React.Component {
    constructor() {
        super()

        this.className  = this.constructor.name
        this.state      = {}
        this.style      = {
            root: {
                width       : '60%',
                paddingTop  : '4%'
            },
            appContentWrapper: {
                flex: 1
            },
            appContent: {
                flex: 1
            }
        }

        this.defaultFiles = [
            // { id: Utils.getUID(), key: 'placeholder', path: 'assets/images/', data: 'placeholder.png' },
            // { id: Utils.getUID(), key: 'themes', path: 'assets/themes', data: '' }
        ]
    }

    /*
    *
    */
    componentDidMount() {
        for(let entry of this.defaultFiles)
            AppActions.fetchData(entry.id, entry.key, entry.path, entry.data)
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
            playlistStore : PlaylistStore.getState(),
        }

        return state
    }

    render() {
        return (
            <div className='flexContainer' style={this.style.root}>

                {/* player object */}
                <Player {...this.state} />

                {/* current state */}

            </div>
        )
    }

    /*************************************************
    *
    *                   help functions
    *
    *************************************************/

}

export default Container.create(PlayerContainer)
