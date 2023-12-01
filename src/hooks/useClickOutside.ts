import React, { MutableRefObject, useEffect } from "react";

// Improved version of https://usehooks.com/useOnClickOutside/
const useClickOutside = (ref: MutableRefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted: HTMLElement | boolean = false;

    const listener = (event: any) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) return;

      handler();
    };

    const validateEventStart = (event: any) => {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
