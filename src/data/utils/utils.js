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

        let nextProperty  = undefined
        let subSource     = undefined

        if(isEndOfArray || isEmptySource)
            return entry
        else {
            nextProperty  = path.shift()
            subSource     = source[nextProperty]

            return this.getObjectEntry(subSource, path)
        }
    }

    getFileType(file) {
        let type = ''

        type = file.substring(file.lastIndexOf(".") + 1)

        return type
    }
}

export default new Utils()
