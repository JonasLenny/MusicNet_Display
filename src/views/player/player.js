'use strict'

// import area
import React         from 'react'

import { withTheme } from '@material-ui/core/styles'
import Typography    from '@material-ui/core/Typography'


class Player extends React.Component {
    constructor(props) {
        super(props)

        let theme          = props.theme
        this.className     = this.constructor.name
        this.state         = {}
        this.imageURL      = undefined
        this.style         = {
            root: {
                display        : 'flex',
                width          : '80%',
                height         : '70%',
                borderTop      : '1px solid white',
                borderBottom   : '1px solid white',
                alignItems     : 'center',
                justifyContent : 'center'
            },
            text: {
                marginTop    : '1%',
                marginBottom : '1%'
            }
        }
    }

    componentDidMount() {}

    render() {
        const playlistStore = this.props.playlistStore
        const appStore      = this.props.appStore
        const getAppEntry   = appStore.get('getEntry')

        return (
            <div style={this.style.root}>
                <Typography variant='display1' style={this.style.text}>
                    Add a track
                </Typography>
            </div>
        )
    }

    /**************************************************************************
    *
    *                               help functions
    *
    **************************************************************************/


}

export default withTheme()(Player)
