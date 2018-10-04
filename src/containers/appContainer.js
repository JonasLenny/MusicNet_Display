'use strict'

// import area
import React             from 'react'
import { Container }     from 'flux/utils'

import MuiThemeProvider  from '@material-ui/core/styles/MuiThemeProvider'

// flux stuff
import AppStore          from './../data/stores/appStore'
import AppActions        from './../data/actions/appActions'
import Utils             from './../data/utils/utils'
import WebsocketEvents   from './../data/utils/websocket/websocketEvents'

// views/containers
import Header            from './../views/header'
import Footer            from './../views/footer'
import PlayerContainer   from './playerContainer'
import PlaylistContainer from './playlistContainer'

// TODO: find another way to include the bindings
import Spotify           from './../bindings/spotify'

// css files
import 'typeface-roboto'

// variables area

class AppContainer extends React.Component {
    constructor() {
        super()

        this.className  = this.constructor.name
        this.state      = {}
        this.style      = {
            root: {},
            appContentWrapper: {
                flex: 1
            },
            appContent: {
                flex           : 1,
                flexDirection  : 'row',
                justifyContent : 'space-around',
                paddingTop     : '5%',
                // paddingLeft    : '5%',
                paddingRight   : '5%'
            }
        }

        this.defaultFiles = [
            { id: Utils.getUID(), key: 'config', path: '', data: 'config.json' },
            // { id: Utils.getUID(), key: 'themes', path: 'assets/themes', data: '' }
        ]

        this.initBindings = this.initBindings.bind(this)
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

        AppActions.waitFor(['registration'], this.initBindings)
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
                            <PlayerContainer {...this.state} />

                            {/* playlist container */}
                            <PlaylistContainer {...this.state} />

                            {/* IDEA: add the player state here */}

                            {/* participate container; IDEA: the container with QR Code etc. */}


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

    initBindings(registration) {
        console.log(`[${this.className}] wait for response received`)
        console.log(registration)
        let bindings = registration.bindings

        for(let entry of bindings) {
            // import(`./../bindings/${entry.name}`)
            // .then(module => {
            //     console.log(module)
            // })
        }
    }

}

export default Container.create(AppContainer)
