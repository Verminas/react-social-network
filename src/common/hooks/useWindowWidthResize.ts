import { useEffect, useState } from "react";
import { debounce } from "common/utils/debounce";

export const useWindowWidthResize = (func?: () => void) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    console.log(window.innerWidth);
  };

  const debouncedHandleResize = debounce(handleResize, 1000);

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleResize);

    if (func) func();

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [windowWidth]);

  return { windowWidth };
};
