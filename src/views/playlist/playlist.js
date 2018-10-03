'use strict'

// import area
import React         from 'react'

import { withTheme } from '@material-ui/core/styles'
import Typography    from '@material-ui/core/Typography'

import Divider       from '@material-ui/core/Divider'
import List          from '@material-ui/core/List'

// TODO: move the coming dependencies into the entry file
import ListItem      from '@material-ui/core/ListItem'
import ListItemText  from '@material-ui/core/ListItemText'

// import Entry         from './entry'
// variables area

class Playlist extends React.Component {
    constructor(props) {
        super(props)

        let theme      = props.theme
        this.className = this.constructor.name
        this.state     = {}

        this.style = {
            root: {
                width       : '100%',
            },
            listContainer: {
                height      : '65%',
                marginTop   : '10%',
                borderLeft  : '1px solid white',
                borderRight : '1px solid white',
                // borderColor : 'white',
            },
            text: {
                marginTop    : '1%',
                marginBottom : '1%'
            }
        }

        this.parseList    = this.parseList.bind(this)
        this.parseArtists = this.parseArtists.bind(this)
    }

    componentDidMount() {

    }

    render() {
        const playlistStore = this.props.playlistStore
        let playlist        = playlistStore.get('playlist').toJS()
        let parsedPlaylist  = this.parseList(playlist)

        console.log('playlist')
        console.log(playlist)

        return (

            <div style={this.style.root}>
                <Typography variant='title' style={this.style.text}>
                    Next songs...
                </Typography>

                <div style={this.style.listContainer} >
                    <List>
                        { parsedPlaylist }
                    </List>
                </div>
            </div>
        )
    }

    /**************************************************************************
    *
    *                               help functions
    *
    **************************************************************************/

    parseList(source) {
        let parsedList = []
        let list       = source.entries()

        for(let [index, entry] of list) {
            let track     = entry.message
            let artists   = this.parseArtists(track.artists)
            let trackName = track.trackName

            let item      = (
                <ListItem key={index} >
                    <ListItemText
                        primary   = { trackName }
                        secondary = { artists }
                    />
                </ListItem>
            )

            parsedList.push(item)
        }

        return parsedList
    }

    parseArtists(source) {
        let parsedList      = ''
        let numberOfEntries = source.length

        for(let i = 0; i < numberOfEntries; ++i) {
            parsedList += source[i].name

            if(numberOfEntries != 1 && i < numberOfEntries-1)
                parsedList += ', '
        }

        return parsedList
    }
}

export default withTheme()(Playlist)
