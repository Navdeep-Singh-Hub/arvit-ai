import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Returns false during SSR and the first client render, then true after
 * hydration — the useSyncExternalStore-based replacement for the classic
 * `useEffect(() => setMounted(true), [])` pattern, without a setState-in-effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
