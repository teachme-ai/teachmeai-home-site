"use client"

import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    // Don't unobserve here - let cleanup handle it
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        )

        observer.observe(element)

        // Proper cleanup: disconnect the observer entirely
        return () => {
            observer.disconnect()
        }
    }, [])

    return { ref, isVisible }
}
