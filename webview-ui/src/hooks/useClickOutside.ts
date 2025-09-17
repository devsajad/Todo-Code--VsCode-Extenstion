import { useEffect, useRef } from "react";
interface HandleCloseModalEvent extends MouseEvent {
  target: EventTarget | null;
}

function useClickOutside(action: () => void, capturePhase: boolean = false) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleCloseModal(e: HandleCloseModalEvent): void {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      action();
    }

    document.addEventListener("click", handleCloseModal, capturePhase);

    return () => {
      document.removeEventListener("click", handleCloseModal, capturePhase);
    };
  }, [action, capturePhase]);

  return ref;
}

export default useClickOutside;
