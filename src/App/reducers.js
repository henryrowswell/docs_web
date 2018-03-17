import { combineReducers } from 'redux'
import {
    SET_PROJECTS,
    LOAD_DOCUMENT,
    SET_ACTIVE_DOC,
    UPDATE_DOC,
} from './actions'

function projects(state = {}, action) {
    switch (action.type) {
    case SET_PROJECTS:
        return action.value
    default:
        return state
    }
}

function docData(state = {}, action) {
    switch (action.type) {
    case LOAD_DOCUMENT: // call it add document?
    case UPDATE_DOC:
        const stateCopy = {...state}
        // find that file
        const doc = action.value
        // update with the document data
        stateCopy[doc.path] = doc.data
        return stateCopy
    default:
        return state
    }
}

function activeDoc(state = false, action) {
    switch (action.type) {
    case SET_ACTIVE_DOC:
        return action.value
    default:
        return state
    }
}

export default combineReducers({
    projects,
    docData,
    activeDoc,
})