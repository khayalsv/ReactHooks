import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../App'

const useContextComponent = () => {

    const theme = useContext(ThemeContext)

    return (
        <div style={theme}>
            <h1>Hello world</h1>
        </div>
    )
}

export default useContextComponent