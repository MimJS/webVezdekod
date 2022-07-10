import { View } from "@vkontakte/vkui";
import { useState } from "react";
import { MainPanel } from "./panels";

export const MainView = ({ id }) => {
  const [activePanel] = useState("MainPanel");
  return (
    <View id={id} activePanel={activePanel}>
      <MainPanel id={"MainPanel"} />
    </View>
  );
};
