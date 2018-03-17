
export const SET_PROJECTS = 'SET_PROJECTS'
export const setProjects = projects => ({
    type: SET_PROJECTS,
    value: projects,
})

export const LOAD_DOCUMENT = 'LOAD_DOCUMENT'
export const loadDocument = document => ({
    type: LOAD_DOCUMENT,
    value: document,
})

export const SET_ACTIVE_DOC = 'SET_ACTIVE_DOC'
export const setActiveDoc = path => ({
    type: SET_ACTIVE_DOC,
    value: path,
})

export const UPDATE_DOC = 'UPDATE_DOC'
export const updateDoc = document => ({
    type: UPDATE_DOC,
    value: document,
})