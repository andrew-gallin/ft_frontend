import React from 'react'

export default React.createContext({
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => {console.log('logged in!~!!!!@!~~!')},
    logout: () => {}
})