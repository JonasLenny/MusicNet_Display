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
import Header                from './../views/header'
import Footer                from './../views/footer'
import PlaylistContainer     from './playlistContainer'

// css files
import 'typeface-roboto'

// variables area

class AppContainer extends React.Component {
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

        this.defaultFiles = [
            { id: Utils.getUID(), key: 'config', path: '', data: 'config.json' },
            // { id: Utils.getUID(), key: 'themes', path: 'assets/themes', data: '' }
        ]
    }

    /*
    *
    */
    componentDidMount() {
        let registration = {
            type: WebsocketEvents.ROLE_DISPLAY
        }

        for(let entry of this.defaultFiles)
            AppActions.fetchData(entry.id, entry.key, entry.path, entry.data)

        // establish the websocket connection (if possible)
        AppActions.establishConnection(['config', 'project', 'server', 'api'])

        // register this application at the server
        AppActions.registerAtServer(Utils.getUID(), 'registration', ['socket'], registration)
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
        let appStore        = this.state.appStore
        let theme           = appStore.get('theme')
        let appContentStyle = Object.assign({}, this.style.appContent)

        if(theme) {
            let palette  = theme.object.palette

            appContentStyle.backgroundColor = palette.primary.main
        }

        return (
            <MuiThemeProvider theme={theme.object} >
                <div className='app rootFlex' style={this.style.root}>
                    <Header {...this.state} />

                        {/* app content */}
                        <div id='appContent' className='rootContainer' style={appContentStyle}>

                            {/* player container */}
                            

                            {/* playlist container */}
                            <PlaylistContainer {...this.state} />

                            {/* participate container IDEA: the container with QR Code etc. */}

                        </div>
                    <Footer {...this.state} />
                </div>
            </MuiThemeProvider>

        )
    }

    /*************************************************
    *
    *                   help functions
    *
    *************************************************/

}

export default Container.create(AppContainer)
