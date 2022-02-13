import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useThrottledCallback } from "use-debounce";

const SMALL_BREAKPOINT = 414;
const MID_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;

export const WindowWidthPropType = PropTypes.oneOf(["sm", "md", "lg", "xl"]);

const getWindowWidth = (px) => {
  if (px < SMALL_BREAKPOINT) {
    return "sm";
  } else if (px < MID_BREAKPOINT) {
    return "md";
  } else if (px < LG_BREAKPOINT) {
    return "lg";
  }
  return "xl";
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(null);

  // Get initial width
  useEffect(() => setWindowWidth(getWindowWidth(window.innerWidth)), []);

  // Update width on window resize
  const handleResize = useThrottledCallback(() => {
    setWindowWidth(getWindowWidth(window.innerWidth));
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return windowWidth;
};

export default useWindowWidth;
