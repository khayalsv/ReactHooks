import React, { useState } from 'react'

const useStateComponent = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <p>Count : {count}</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
        </>
    )
}

export default useStateComponent