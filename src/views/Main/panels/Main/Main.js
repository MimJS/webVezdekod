import { List, Panel, Button, NativeSelect } from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { CustomMail } from "../../../../components";
import { apiRequest } from "../../../../lib/modules/apiRequest";
import { useLazyLoading } from "../../../../lib/modules/useLazyLoading";
import "./Main.scss";

export const MainPanel = ({ id }) => {
  const [mails, setMails] = useState([]);
  const [selectIds, setSelectIds] = useState([]);
  const [theme, setTheme] = useState(
    window.localStorage.getItem("scheme") || "light"
  );
  const [page, setPage] = useState(1);

  const addId = (id) => {
    if (selectIds.includes(id)) {
      let newIds = [...selectIds];
      newIds.splice(selectIds.indexOf(id), selectIds.indexOf(id));
      setSelectIds(newIds);
    } else {
      setSelectIds([...selectIds, id]);
    }
    return;
  };

  const addBlocks = async (event) => {
    const { status, data } = await apiRequest("getMailsByPage", { page });
    if (status) {
      let newData = mails.slice(10, 19).push(data);
      setPage(page + 1);
      return setMails(newData);
    } else {
      return;
    }
  };

  useEffect(() => {
    const getMails = async () => {
      const { status, data } = await apiRequest("getMails", { page });
      if (status) {
        return setMails(data);
      } else {
        return;
      }
    };
    getMails();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("scheme", theme);
    document.body.setAttribute("scheme", theme);
  }, [theme]);

  const [onScroll, containerRef] = useLazyLoading({
    onIntersection: addBlocks,
    delay: 1200,
  });

  return (
    <Panel id={id} onScroll={e => console.log('1')}>
      {selectIds.length < 0 ? (
        <>
          <Button size="m" mode="primary" stretched={false}>
            Пометить выделенные прочитанными
          </Button>
          {JSON.stringify(selectIds)}
        </>
      ) : null}
      {mails.length > 0 ? (
        <>
          <List ref={containerRef} onScroll={onScroll}>
            <NativeSelect
              onChange={(e) => setTheme(e.target[e.target.selectedIndex].value)}
              style={{ marginBottom: 10 }}
              value={theme}
            >
              <option value={"light"}>Светлая тема</option>
              <option value={"dark"}>Тёмная тема</option>
              <option value={"dogs"}>Собачки</option>
              <option value={"cats"}>Кошки</option>
            </NativeSelect>
            {mails.map((v, i) => {
              return <CustomMail addId={addId} key={i} id={i} {...v} />;
            })}
          </List>
        </>
      ) : null}
    </Panel>
  );
};
