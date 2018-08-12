'use strict'

// import area
import { ReduceStore } from 'flux/utils'

import AppDispatcher   from './../appDispatcher'
import Utils           from './../utils/utils'
import LoadObjectState from './../utils/loadObject/loadObjectState'

// variables area

class AbstractStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    isPending(path) {
        let isPending  = false
        let fileObject = undefined

        fileObject = this.getFileObject(path)

        if(fileObject.state === LoadObjectState.PENDING)
            isPending = true

        if(fileObject.state === LoadObjectState.NEW)
            isPending = true

        return isPending
    }

    // action, func
    addToBuffer(action, func) {
        console.log(`[${this.className}] addToBuffer ${action.path[0]}`)

        let updatedList = []
        let buffer      = this._state.get('buffer')
        let target      = action.path[0]
        let params      = [action]

        let targetList  = buffer.get(target)
        let newEntry    = { func, params }

        // if the buffer has already an entry for this target
        // just add this function, too.
        if(targetList) {
            let isEnlisted = targetList.find(entry => entry == newEntry)

            // check if this entry already exists
            if(!isEnlisted) {
                updatedList = targetList.slice(0)
                updatedList.push(newEntry)
            }
        }
        else {
            updatedList = [newEntry]
        }

        return updatedList
    }

    clearBuffer(state, target) {
        console.log(`[${this.className}] clear buffer for ${target}`)

        let buffer = state.get('buffer')
        let list   = buffer.get(target)

        if(list)
            for(let entry of list) {
                let func   = entry.func
                let params = [state, ...entry.params]

                func(...params)
            }

        return []
    }

    getFile(state, name) {
        // console.log(`[${this.className}] getFile ${name}`)

        let source = state.get('files')
        let entry  = source.find(entry => entry['key'] == name)

        if(!entry)
            entry = Utils.createEmptyLoadObject()

        return entry
    }

    getFileObject(path) {
        let files      = this._state.get('files')
        let fileKey    = path[0]
        let loadObject = files.find(entry => entry.key === fileKey)

        if(!loadObject)
            loadObject = Utils.createEmptyLoadObject()

        return loadObject
    }

    /**
    *   External function for container etc.
    *   Has no state.
    **/
    getEntry(path) {
        let entry = this.getFileEntry(this._state, path)

        return entry
    }

    /**
    *   Internal function for other functions
    **/
    getFileEntry(state, path) {
        let entry         = undefined
        let file          = this.getFile(state, path[0]).value

        path.shift()

        entry = Utils.getObjectEntry(file, path)

        return entry
    }
}

export default AbstractStore
