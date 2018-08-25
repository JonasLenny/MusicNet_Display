'use strict'

// import area
import React                 from 'react'
import { Container }         from 'flux/utils'

import MuiThemeProvider      from '@material-ui/core/styles/MuiThemeProvider'

// flux stuff
import AppStore              from './../data/stores/appStore'
import AppActions            from './../data/actions/appActions'


import Utils                 from './../data/utils/utils'
import WebsocketEvents       from './../data/utils/websocket/websocketEvents'

// views/containers

// variables area

class PlayerContainer extends React.Component {
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

        // AppActions.registerAtServer(Utils.getUID(), 'registration', ['socket'], registration)
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
        return (
            <div className='flexContainer' style={this.style.root}>

                {/* player object */}
                <div id='playerContent'>

                </div>

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
