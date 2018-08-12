'use strict'

// import area
import React         from 'react'
import ReactDOM      from 'react-dom'

import AppContainer from './containers/appContainer'
import './rootStyle.css'

// variables area
// const ConfigJSON = './config.json'

class Root {
    constructor() {
        this.className = this.constructor.name
        this.rootId    = 'reactRoot'
    }

    init() {
        let rootElement = document.getElementById(this.rootId)
        let app         = (
            <AppContainer />
        )

        ReactDOM.render(app, rootElement)
    }
}

// wait until the dom is ready
document.addEventListener("DOMContentLoaded", new Root().init())
