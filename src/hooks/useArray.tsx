import { useState } from "react";

const useArray = <T extends []>(defaultValue: T[]) => {
    const [array, setArray] = useState(defaultValue)

    const push = (element: any) => {
        setArray((prev: any) => [...prev, element])
    }

    const filter = (callback: any) => {
        setArray((prev: any) => prev.filter(callback))
    }

    const update = (index: any, newElement: any) => {
        setArray((prev: any) => [
            ...prev.slice(0, index),
            newElement,
            ...prev.slice(index + 1, prev.length - 1)
        ])
    }

    const remove = (index: any) => {
        setArray((prev: any) => [...prev.slice(0, index), ...prev.slice(index + 1, prev.length - 1)])
    }

    const clear = () => {
        setArray([])
    }

    return { array, set: setArray, push, filter, update, remove, clear }
}

export default useArray;