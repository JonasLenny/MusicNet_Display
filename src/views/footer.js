'use strict'

// import area
import React         from 'react'

import { withTheme } from '@material-ui/core/styles'
import Typography    from '@material-ui/core/Typography'

// variables area

class Bottom extends React.Component {
    constructor(props) {
        super(props)

        let theme      = props.theme
        this.className = this.constructor.name
        this.url       = 'https://github.com/JonasLenny'

        this.state     = {
            version: props.version
        }

        // light:
        // dark: {paper: "#424242", default: "#303030"}

        this.style = {
            root: {
                backgroundColor : theme.palette.primary.dark
            },
            text: {
                marginTop: '1%',
                marginBottom: '1%'
            },
            nameLink: {
                color: theme.palette.text.primary
            }
        }
    }

    render() {
        let version   = this.props.appStore.get('version')
        let theme     = this.props.appStore.get('theme')

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
            <footer style={rootStyle}>
                <Typography type='caption' align='center' style={typographyStyle}>
                    version {version} by <a href={this.url} style={nameLinkStyle}>Lenny</a>
                </Typography>
            </footer>
        )
    }
}

export default withTheme()(Bottom)
