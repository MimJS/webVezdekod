import { useRef, useCallback } from "react";
import throttle from "lodash/throttle";

export function useLazyLoading({
  onIntersection,
  delay = 1000,
  marginFromBottom = 10,
}) {
  const containerRef = useRef(null);

  // Функция обработчик scroll эвента, с ограничением количества вызовов
  // посредством lodash/throttle
  const onScroll = useCallback(
    throttle(() => {
      const containerScrollTop = containerRef.current.scrollTop;
      const containerHeight = containerRef.current.clientHeight;
      const scrollHeight = containerRef.current.scrollHeight;
      if (
        scrollHeight -
          containerScrollTop -
          containerHeight -
          marginFromBottom <=
        0
      ) {
        onIntersection();
      }
    }, delay),
    [onIntersection, containerRef, marginFromBottom, delay]
  );

  return [onScroll, containerRef];
}
