import { useCallback, useSyncExternalStore } from "react"

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  window.addEventListener("storage", callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener("storage", callback)
  }
}

export function writeLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
  listeners.forEach((listener) => listener())
}

/**
 * Reads a localStorage string without causing a hydration mismatch.
 * Returns `serverValue` during SSR and the first client render, then the stored value
 * (or `fallback()` when nothing is stored) once hydrated.
 */
export function useLocalStorage(
  key: string,
  serverValue: string | null = null,
  fallback: () => string | null = () => null
): [string | null, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? fallback(),
    () => serverValue
  )
  const setValue = useCallback((next: string) => writeLocalStorage(key, next), [key])
  return [value, setValue]
}
