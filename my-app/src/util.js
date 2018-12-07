export function getRedirectionPath({ type, avatar }) {
    // redirect user accodrdingly

    // user.type => boss/genius
    // user.avatar => bossInfo / geniusInfo

    let url = type === 'boss' ? '/boss' : 'genius'
    if (!avatar) {
        url += 'info'
    }
    return url
}
