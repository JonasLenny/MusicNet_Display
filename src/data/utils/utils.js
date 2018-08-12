'use strict'

// import area
import uuidv1     from 'uuid/v1'
import LoadObject from './loadObject/loadObject'

class Utils {
    getUID() {
        return uuidv1()
    }

    createEmptyLoadObject() {
        let loadObject = new LoadObject()

        return loadObject
    }

    getObjectEntry(source, path) {
        let entry         = source
        let isEndOfArray  = path.length == 0
        let isEmptySource = source == undefined

        let nextProperty  = path.shift()
        let subSource     = source[nextProperty]

        if(!isEndOfArray && !isEmptySource)
            return this.getObjectEntry(subSource, path)
        else
            return entry
    }
}

export default new Utils()
