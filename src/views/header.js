'use strict'

// import area
import React         from 'react'
import { withTheme } from '@material-ui/core/styles'

import AppBar        from '@material-ui/core/AppBar'
import Toolbar       from '@material-ui/core/Toolbar'
import Typography    from '@material-ui/core/Typography'

// variables area

class Header extends React.Component {
    constructor(props) {
        super(props)

        let theme      = props.theme
        this.className = this.constructor.name
        this.state     = {
            title: props.title
        }

        this.style = {
            root: {
                backgroundColor : theme.palette.primary.dark
            }
        }
    }

    render() {
        let theme           = this.props.appStore.get('theme')

        let rootStyle       = Object.assign({}, this.style.root)
        let typographyStyle = Object.assign({}, this.style.text)
        let nameLinkStyle   = Object.assign({}, this.style.nameLink)

        if(theme) {
            let palette      = theme.object.palette
            let type         = theme.type
            let newColor     = palette.primary[type]
            let contrastText = palette.getContrastText(newColor)

            rootStyle.backgroundColor = palette.primary[type]
            typographyStyle.color     = contrastText
            nameLinkStyle.color       = contrastText
        }

        return (
            <header className='header' style={rootStyle}>
                <AppBar position='static' color='inherit' elevation={0}>
                    <Toolbar style={rootStyle}>
                        <Typography variant='headline' style={typographyStyle}>
                            MusicNet
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
        )
    }
}

export default withTheme()(Header)
