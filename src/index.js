import RD from "react-dom/client";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import { App } from "./App";

RD.createRoot(document.getElementById("root")).render(
  <ConfigProvider platform="android">
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
);
