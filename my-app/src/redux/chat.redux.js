import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:9093')

// chat list
const MSG_LIST = 'MSG_LIST'

// Receive message
const MSG_RECV = 'MSG_RECV'

// READ MESSAGE
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(
                    el => !el.read && el.to === action.payload.userid
                ).length,
                users: action.payload.users
            }
        case MSG_RECV:
            const n = action.payload.to === action.payload.userid ? 1 : 0
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload.data],
                unread: state.unread + n
            }
        case MSG_READ:
            const { from, num } = action.payload
            return {
                ...state,
                chatmsg: state.chatmsg.map(e => {
                    e.read = from === e.from ? true : e.read
                    return e
                }),
                unread: state.unread - num
            }
        default:
            return state
    }
}

function msgList(msgs, users, userid) {
    return {
        type: MSG_LIST,
        payload: { msgs, users, userid }
    }
}

function msgRecv(data, userid) {
    return {
        type: MSG_RECV,
        payload: { data, userid }
    }
}
function msgRead({ from, userid, num }) {
    return {
        type: MSG_READ,
        payload: {
            from,
            userid,
            num
        }
    }
}
export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userid = getState().user._id
                dispatch(msgList(res.data.msgs, res.data.users, userid))
            }
        })
    }
}

export function recvMsg(data) {
    return (dispatch, getState) => {
        socket.on('recvmsg', function(data) {
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}
export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', {
            from,
            to,
            msg
        })
    }
}
export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', { from }).then(res => {
            const userid = getState().user._id
            if (res.status === 200 && res.data.code === 0) {
                dispatch(
                    msgRead({
                        userid,
                        from,
                        num: res.data.num
                    })
                )
            }
        })
    }
}
