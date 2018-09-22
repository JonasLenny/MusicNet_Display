'use strict'

/******************************************************************************/
// import area

import Utils            from './../utils/utils'
import XhrHandler       from './../utils/xhrHandler'
import WebSocketHandler from './../utils/websocket/websocketHandler'
import LoadObject       from './../utils/loadObject/loadObject'
import LoadObjectState  from './../utils/loadObject/loadObjectState'

import AppActions       from './../actions/appActions'


/******************************************************************************/
// variables area

class AppDataManager {
    constructor() {
        this.className        = this.constructor.name
        this.config           = undefined
        
        this.getURL           = this.getURL.bind(this)
        this.registerAtServer = this.registerAtServer.bind(this)
    }

    /*
    *   fetch data from the given path
    */
    fetchData(id, key, path, file) {
        // console.log(`[${this.className}] fetching files for ${id} at ${path}`)

        let loadObject = new LoadObject(id, key, file)
        loadObject     = loadObject.setPending(undefined)

        XhrHandler.promiseGET(path, file)
        .then(response => {
            loadObject = loadObject.updateValue(response.body)
            loadObject = loadObject.setSuccess(response.rawRequest.statusText)

            AppActions.fetchDataResponse(id, loadObject)
        })
        .catch(error => {
            console.log(`[${this.className}] fetchData error`)
            console.log(error)

            let errorBody   = error
            let errorStatus = error

            if(error.body)
                errorBody = error.body

            if(error.rawRequest && error.rawRequest.statusText)
                errorStatus = error.rawRequest.statusText

            loadObject = loadObject.updateValue(errorBody)
            loadObject = loadObject.setError(errorStatus)

            AppActions.fetchDataResponse(id, loadObject)
        })


        return loadObject
    }

    /*
    *   send data to the given path
    */
    sendData(id, path, files) {
        console.log(`[${this.className}] sending files from ${id} to ${path}`)
    }

    /*
    *   Establish a websocket connection to the given endpoint
    */
    establishWebSocketConnection(id, config, path) {
        let url        = this.getURL(config, path)
        let loadObject = new LoadObject(id, 'socket', url)
        loadObject     = loadObject.setPending(undefined)

        WebSocketHandler.initSocket(url)
        .then(response => {
            loadObject = loadObject.updateValue(response)
            loadObject = loadObject.setSuccess('connected')

            return AppActions.establishConnectionResponse(loadObject)
        })
        .catch(error => {
            console.error('error occured')
            console.log(error)

            loadObject = loadObject.updateValue(undefined)
            loadObject = loadObject.setError(error.type)

            return AppActions.establishConnectionResponse(loadObject)
        })

        return loadObject
    }

    registerAtServer(loadObject, registration) {
        console.log(`[${this.className}] registerAtServer`)

        WebSocketHandler.registerMe(registration)
        .then(response => {
            loadObject = loadObject.updateValue(response)
            loadObject = loadObject.setSuccess('registered')

            return AppActions.registerAtServerResponse(loadObject)
        })
        .catch(error => {
            loadObject = loadObject.updateValue(error)
            loadObject = loadObject.setError(error.type)

            return AppActions.registerAtServerResponse(loadObject)
        })
    }

    /*************************************************
    *
    *                   help functions
    *
    *************************************************/

    getURL(config, path) {
        let url      = ''
        let server   = config.project.server
        let endpoint = Utils.getObjectEntry(config, path)

        url += server.domain

        if(server.port)
            url += `:${server.port}`

        url += endpoint

        return url
    }
}

export default AppDataManager
