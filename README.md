# Hooklara Giriş

- Hooklar ilə class yazmadan state və ya React-ın digər xüsusiyyələrindən istifadə edə bilərik.Hooklar React-in funksional komponentləri daxilində çağırılmalıdır.
Onlar if ifadələri və ya iç-içə funksiyalar daxilində istifadə edilməməlidir.

Reaksiya Komponentlərinə hansı imkanlar lazım ola bilər:
- State Tutmaq (useState)
- Side Effektini əks etdirmək (useEffect)
- Hover (useHover)
- LifeCycle (useDidMount, useDidUpdate)
- Redux Store (useSelector, useDispatch, useStore)
- React Router (useHistory, useLocation, useParams, useRouteMatch)
- Məlumatların çıxarılması (useFetch)
- Theme (useTheme)
- Gözləmək (useWait)
- Ekran Ölçüləri ( useWindowDimension)
- useReducer, useRef, vb bir çox ümumi qabiliyyətlər haqqında düşünə bilərik.

## useState

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

## useEffect

- API istifadəsində subscribes və DOM-un əl ilə dəyişdirilməsi kimi əməliyyatlar side effects adlanır. Çünki belə side effects olan əməliyyatlar render zamanı tamamlanmaya bilər və ya digər komponentlərə təsir göstərməli ola bilər.
useEffect() funksiyasından istifadə etdiyiniz zaman,React ilk render də daxil olmaqla hər renderdən sonra effekt funksiyasını işə salır.
useEffect Hookuna göndərilən funksiyanın hər render zamanı fərqli olduğunu görəcəyik. Bu qəsdən belədir. Faktiki olaraq yeni funksiyanın yaranmasına görə count dəyəri köhnəlmir. Hər dəfə render zamanı köhnə effekt silinir və yeni effekt planlaşdırılır.
- İş prinsipi ona verəcəyimiz iki parametrə əsaslanır. Bunlardan birincisi onun yerinə yetirməsini istədiyimiz əməliyyatları əhatə edən funksiya, ikincisi isə sözügedən funksiyanın hansı vəziyyətlərdə işləyəcəyini və hansı hallarda işləməyəcəyini təyin edə biləcəyimiz array dəyəridir.

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

### useCallback
- useEffect zamanı əsas komponent hər dəfə render edildikdə, onun içindəki funksiyaların bir nümunəsi yenidən yaradılır. useCallback lazımsız renderin qarşısını alır və funksiyanı yadda saxlayır. 
Onun işləmə prinsipi, həmin obyektlər dəyişdiyi zaman müəyyən edilir və yenidən yaradılır.

- Yeni funksiya yaratdıqda, garbage collector köhnəni atır, lakin useCallback ilə funksiya yadda saxlanılırsa, işləmir və yaddaş yığılır.Expensive funksiyalar üçün istifadə olunmalıdır.

### useMemo
- useMemo hooksu useCallback funksiyası kimi yadda saxlama əməliyyatını yerinə yetirir, lakin o, sadəcə funksiyanı yadda saxlamır, verilən dəyərə əsasən nəticəni hesablayır və onu yadda saxlayır.Məsələn, faktorialı hesablayan bir üsulumuz var. Girişimiz 5 olarsa, 120 çıxaracaq və onu yaddaşda saxlayacaq. Yenidən 5 faktorialını hesabladığınız zaman o, yenidən hesablanmır və birbaşa 120 qaytarır.

- useMemo hooksu, expensive funksiyalarımızın lazımsız şəkildə göstərilməsinin qarşısını alır, bu, sırf performansı optimallaşdırmaq üçün istifadə edilən bir hookdur. O, sadə funksiyalarda istifadə edilməməlidir.Yalnız performans üzərində qurulmalıdır.


## useContext

- Normalda state-lər üst componentdən alt componentlərə props ilə ötürülür.App componentindən 5-ci Child componentinə state ötürdükdə, bir-bir alt componentlərə props ilə ötürüləcək və kod qarışıqlığı yaranacaq.
Context ilə state-i kənarda saxlıyıb, istənilən yerə state ötürmək asanlaşır.Böyük proyetklərdə bunun əvəz edicisi Redux istifadə olunur.

```js (App.js)
import React, { createContext, useState } from 'react'
import UseContextComponent from './components/useContextComponent'

const theme = {
    dark: {
        background: "Grey",
        color: "#fff"
    },
    light: {
        background: "White",
        color: "#000"
    }
}

export const ThemeContext = createContext(theme.light);

const App = () => {

    const [color, setColor] = useState(theme.light)

    const toggle = () => {
        (color === theme.light) ? setColor(theme.dark) : setColor(theme.light)
    }

    return (
        <div style={color}>
            <button onClick={toggle}>Change Theme</button>
            <ThemeContext.Provider value={color}>
                <UseContextComponent />
            </ThemeContext.Provider>
        </div>
    )
}

export default App
```

```js (Component.js)
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
```


## useReducer

- useReducer Redux mexanizminə bənzər dispatch məntiqi ilə bu və daha mürəkkəb State keçidlərini idarə etməyə imkan verir.
useState kimi state idarəsi üçün istifadə olunur.Əgər bir component daxilində bir-biri ilə əlaqəli state hissələri varsa, state hissələrindəki dəyişiklik useReducer istifadə olunaraq, tək bir action-ın dispatch edilməsiynən dəyişdirilə bilər.
İki ədəd parametr alır: reducer funksiyası və başlanğıc state dəyəri.

```js
import { useReducer } from 'react';


const initialCount = 0;

function init(initialCount) {
    return { count: initialCount };
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
        case 'reset': return init(action.payload);
        default: throw new Error();
    }
}
const useReducerComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialCount, init)
    return (
        <>
            Count : {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>reset</button>
        </>
    )
}

export default useReducerComponent
```

## useRef

- useRef, bir component daxilində component yenidən render olmadan   "dəyişəni" saxlamağa imkan verən strukturdur.

- Əgər aşağıdakı nümunəni useState ilə yerinə yetirsəydik, düyməni bir dəfə kliklədikdən sonra komponent yenidən göstəriləcək və ekranda “Clicks: 1” görünəcək. Dəyişənləri useRef ilə saxladığımız üçün ilk dəyər "Clicks: 0" görünəcək, lakin "count" dəyəri yaddaşda 1 olacaq.

- Dəyişən dəyişdirildikdə, useState componenti yenidən göstərmək üçün render edər, useRef componenti yenidən render etməs.

```js
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
```