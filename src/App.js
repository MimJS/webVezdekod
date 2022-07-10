import { AppRoot } from "@vkontakte/vkui";
import { MainView } from "./views";
import "@vkontakte/vkui/dist/vkui.css";
import "./lib/styles/index.scss";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    const scheme = window.localStorage.getItem("scheme");
    console.log(scheme)
    if (scheme) {
      document.body.setAttribute("scheme", scheme);
    }
  }, []);
  return (
    <AppRoot>
      <MainView id={"MainView"} />
    </AppRoot>
  );
};
