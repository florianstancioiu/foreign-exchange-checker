import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const useLightMode = () => {
  const [lightMode, setLightMode] = useLocalStorage<boolean>(
    "lightMode:v1",
    false,
  );

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (lightMode === true) {
      htmlElement.setAttribute("data-theme", "light");
    } else {
      htmlElement.removeAttribute("data-theme");
    }
  }, [lightMode]);

  const toggleLightMode = () => setLightMode((val) => !val);

  return {
    lightMode,
    setLightMode,
    toggleLightMode,
  };
};

export default useLightMode;
