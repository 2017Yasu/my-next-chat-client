import { useEffect, useRef } from "react";

type CleanupFunc = () => void;

export function useEffectOnce(
  callback: () => Promise<CleanupFunc | undefined>
) {
  const cleanup = useRef<CleanupFunc | undefined>();
  const called = useRef(false);

  useEffect(() => {
    const fn = async () => {
      if (called.current) {
        return;
      }
      called.current = true;
      cleanup.current = await callback();
    };
    fn();
    return () => {
      if (cleanup.current) {
        cleanup.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
