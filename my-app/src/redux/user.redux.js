import axios from 'axios'
import { getRedirectionPath } from '../util'
import { userInfo } from 'os';

const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    msg: '',
    isAuth: '',
    user: '',
    // pwd: '',
    type: ''
}

export function user(state = initState, action) {
    switch (action.type) {
        case ERROR_MSG:
            return {
                ...state,
                isAuth: false,
                msg: action.msg
            }
        case LOAD_DATA: 
            return {
                ...state,
                ...action.payload
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
                ...action.payload,
                redirectTo: getRedirectionPath(action.payload)
            }
        default:
            return state
    }
}
function authSuccess(data) {
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}
function errMsg(msg) {
    return {
        msg,
        type: ERROR_MSG
    }
}

// action generator
export function loadData(userInfo) {
    console.log(loadData)
    return {
        type: LOAD_DATA,
        payload: userInfo 
    }
}
export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errMsg('Please enter both Username and Password')
    } else {
        return dispatch => {
            axios
                .post('/user/login', {
                    user,
                    pwd
                })
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        dispatch(authSuccess(res.data.data))
                    } else {
                        dispatch(errMsg(res.data.msg))
                    }
                })
        }
    }
}
export function register({ user, pwd, type, repeatpwd }) {
    if (!user || !pwd || !type) {
        return errMsg('Please enter both Username and Password')
    }
    if (pwd !== repeatpwd) {
        return errMsg('Password has to be matched')
    }
    return dispatch => {
        axios
            .post('/user/register', {
                user,
                pwd,
                type
            })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd, type }))
                } else {
                    dispatch(errMsg(res.data.msg))
                }
            })
    }
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errMsg(res.data.msg))
                }
            })
    }
}
