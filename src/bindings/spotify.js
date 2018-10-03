'use strict'

// import area

// variables area
const PLAYER_SDK_URL = 'https://sdk.scdn.co/spotify-player.js'

class Spotify {
    constructor() {
        this.className    = this.constructor.name
        this.initResolve  = undefined
        this.initReject   = undefined

        this.init         = this.init.bind(this)
        this.addScriptTag = this.addScriptTag.bind(this)
        this.onReady      = this.onReady.bind(this)
    }

    init() {
        let promise = new Promise((resolve, reject) => {
            this.initResolve = resolve
            this.initReject  = reject
            window.onSpotifyWebPlaybackSDKReady = this.onReady

            this.addScriptTag()
        })

        return promise
    }

    onReady() {
        console.log(`[${this.className}] onReady called`)

        this.initResolve()
    }

    /**************************************************************************
    *
    *                               help functions
    *
    **************************************************************************/

    addScriptTag() {
        let sdkScript = document.createElement('script')

        sdkScript.setAttribute('type', 'text/javascript')
        sdkScript.setAttribute('src', PLAYER_SDK_URL)
        document.getElementsByTagName('body')[0].appendChild(sdkScript)
    }
}

export default new Spotify()
