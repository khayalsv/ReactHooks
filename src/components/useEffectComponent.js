import React, { useEffect, useState } from 'react'

const useEffectComponent = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `${count} dəfə clickləndi`
    })

    return (
        <>
            <p>Count : {count}</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
        </>
    )
}

export default useEffectComponent