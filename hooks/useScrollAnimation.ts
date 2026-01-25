"use client"

import { useRef } from 'react'

export function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null)

    // TEMPORARY FIX: Disable all scroll animations to prevent Chrome crashes
    // Elements will be visible immediately without fade-in effect
    const isVisible = true

    return { ref, isVisible }
}
