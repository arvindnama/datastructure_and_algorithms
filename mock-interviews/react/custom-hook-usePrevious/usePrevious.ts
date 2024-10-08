import { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: T): T {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
