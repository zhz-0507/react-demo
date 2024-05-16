import { useState, useEffect, useRef} from "react"

export function useWindowScroll () {
  const [y, setY] = useState(0);
  const scrollHandler = useRef(() => {
    const h = document.documentElement.scrollTop;
    setY(h);
  });

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(scrollHandler.current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // 只在挂载时执行一次，因为scrollHandler不会变

  return [y];
}