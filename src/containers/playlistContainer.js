'use strict'

// import area
import React                 from 'react'
import { Container }         from 'flux/utils'

// flux stuff
import AppStore              from './../data/stores/appStore'
import AppActions            from './../data/actions/appActions'
import PlaylistStore         from './../data/stores/playlistStore'
import PlaylistActions       from './../data/actions/playlistActions'
import PlaylistActionTypes   from './../data/actions/playlistActionTypes'

import Utils                 from './../data/utils/utils'
import WebsocketEvents       from './../data/utils/websocket/websocketEvents'

// variables area

class PlaylistContainer extends React.Component {
    constructor() {
        super()

        this.className  = this.constructor.name
        this.state      = {}
        this.style      = {
            root: {
            },
            appContentWrapper: {
                flex: 1
            },
            appContent: {
                flex: 1
            }
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

        SearchActions.subscribeTo(path, event, storePath)
    }

    /*
    *   loads all necessary stores
    *   NOTE: this is a required function for a container
    */
    static getStores() {
        let stores = [
            AppStore
        ]

        return stores
    }

    /*
    *   load your state here
    *   NOTE: this is a required function for a container
    */
    static calculateState(prevState) {
        let state = {
            appStore : AppStore.getState(),
            setTheme : AppActions.changeTheme
        }

        return state
    }

    render() {
        let appStore = this.state.appStore
        let theme    = appStore.get('theme')

        let appContentStyle = Object.assign({}, this.style.appContent)

        if(theme) {
            let palette  = theme.object.palette

            appContentStyle.backgroundColor = palette.primary.main
        }

        return (
            <div id='playlistContent' className='rootContainer' style={this.style.root}>

            </div>
        )
    }

    /*************************************************
    *
    *                   help functions
    *
    *************************************************/

}

export default Container.create(PlaylistContainer)
