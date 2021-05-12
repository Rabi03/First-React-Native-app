import React from 'react'

export const navigatorRef = React.createRef()

const navigate = (name, params) =>
    navigatorRef.current?.navigate(name, params)
  
export default {
    navigate
}