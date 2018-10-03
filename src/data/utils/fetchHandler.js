'use strict'

/******************************************************************************/
// import area
import Utils from './utils'

/******************************************************************************/
// variables area

class FetchHandler {
    constructor() {
        this.className = this.constructor.name
    }

    promiseGET(path, file) {
        let promise = new Promise((resolve, reject) => {
            console.log(`[${this.className}] promiseGET`)

            let endpoint   = `${path}/${file}`
            let type       = Utils.getFileType(file)

            fetch(endpoint)
            .then(response => {
                let parsedResponse = {}
                parsedResponse.statusText = response.statusText
                parsedResponse.status     = response.status

                switch (type) {
                    case 'json':
                        return response.json()
                        .then(obj => {
                            console.log('-----------> get json')
                            parsedResponse.body = obj

                            return parsedResponse
                        })
                        break
                    case 'png':
                    case 'jpg':
                        return response.blob()
                        .then(obj => {
                            console.log('-----------> get blob')
                            parsedResponse.body = obj

                            return parsedResponse
                        })
                        break
                    default:
                        console.warn(`[${this.className}] promiseGET > ${type} is an unhandled type`)
                }


            })
            .then(parsedResponse => {
                console.log(`[${this.className}] --------------> promiseGET `)
                console.log(parsedResponse)

                resolve(parsedResponse)
            })
            .catch(error => {
                // let parsedError = {}
                //
                // parsedError.body = error.body
                reject(error)
            })
        })

        return promise
    }
}

export default new FetchHandler()
