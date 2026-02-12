"use client";

import { useState, useEffect } from "react";

/**
 * Returns [mounted, matches].
 * - `mounted` is false during SSR / first render → avoids hydration mismatch.
 * - Once mounted, `matches` tracks the media query in real time.
 */
export function useMediaQuery(query: string): boolean {
    const [state, setState] = useState({ mounted: false, matches: false });

    useEffect(() => {
        const media = window.matchMedia(query);
        setState({ mounted: true, matches: media.matches });

        const listener = (e: MediaQueryListEvent) =>
            setState((s) => ({ ...s, matches: e.matches }));
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    // Before mount, always return false (server-safe default)
    if (!state.mounted) return false;
    return state.matches;
}

/**
 * Helper: true once the component is mounted on the client.
 * Use to gate any rendering that differs between server and client.
 */
export function useMounted(): boolean {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}
