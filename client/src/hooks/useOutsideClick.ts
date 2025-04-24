import { RefObject, useEffect } from "react";

function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) {
  // detects click outside element used for popup and sidebar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback, ref]);
}

export default useOutsideClick;
