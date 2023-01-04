import React from 'react'
import { useRef } from 'react'


const useRefComponent = () => {
    const count = useRef(0);

    return (
        <>
            <button onClick={() => (count.current += 1)}>Clicks: {count.current}</button>
        </>
    )
}

export default useRefComponent