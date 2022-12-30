### Hooklara Giriş

- Hooklar ilə class yazmadan state və ya React-ın digər xüsusiyyələrindən istifadə edə bilərik.

### useState

- İstifadəçi ekranda nəyinsə dəyişdiyini görürsə, bu zaman state lazımdır.
useState hookunun tək arqumenti ilkin state-dir.State rəqəm və ya mətn kimi tiplərdə ola bilər.State dəyəri obyekt ola bilməz.
useState indiki dəyər və dəyəri yeniləyən funksiya qaytarır.

```js
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
```

### useEffect

- API istifadəsində subscribes və DOM-un əl ilə dəyişdirilməsi kimi əməliyyatlar side effects adlanır. Çünki belə yan təsirləri olan əməliyyatlar render zamanı tamamlanmaya bilər və ya digər komponentlərə təsir göstərməli ola bilər.
useEffect() funksiyasından istifadə etdiyiniz zaman, hər hansı DOM ilə əlaqəli əməliyyat tamamlandıqda React onu çağıracaq. Varsayılan olaraq, React ilk render də daxil olmaqla hər renderdən sonra effekt funksiyasını işə salır.
Biz, bu hooku çağıraraq React-a komponenti render etdikdən sonra əlavə əməliyyat etməsini bildiririk. 
useEffect Hookuna göndərilən funksiyanın hər render zamanı fərqli olduğunu görəcəyik. Bu qəsdən belədir. Faktiki olaraq yeni funksiyanın yaranmasına görə count dəyəri köhnəlmir. Hər dəfə render zamanı köhnə effekt silinir və yeni effekt planlaşdırılır.


```js
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
```