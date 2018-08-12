'use strict'

/******************************************************************************/
// import area
import xhr from 'xhr'

/******************************************************************************/
// variables area

class XhrHandler {
    constructor() {

    }

    promiseGET(path, file) {
        let promise = new Promise((resolve, reject) => {
            let endpoint   = `${path}/${file}`
            let xhrOptions = {
                json: true
            }

            xhr.get(endpoint, xhrOptions, (error, response, body) => {
                if(response.statusCode >= 400)
                    reject(response)
                else
                    resolve(response)
            })
        })

        return promise
    }
}

export default new XhrHandler()
