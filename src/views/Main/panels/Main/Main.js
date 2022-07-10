import { List, Panel, Button, NativeSelect, Pagination } from "@vkontakte/vkui";
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
  const [totalPages, setTotalPages] = useState(1);

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
    console.log(event);
    const { status, data } = await apiRequest("getMailsByPage", {
      page: event,
    });
    console.log(data)
    if (status) {
      console.log(mails);
      let newData = mails.reverse().slice(0, 9);
      newData.reverse().push(...data);
      console.log(newData);
      setPage(event);
      return setMails(newData);
    } else {
      return;
    }
  };

  useEffect(() => {
    const getMails = async () => {
      const { status, data } = await apiRequest("getMails", { page });
      if (status) {
        setTotalPages(data.pages);
        return setMails(data.mails);
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
    <Panel id={id} onScroll={(e) => console.log("1")}>
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
              if (!v) {
                return;
              }
              return <CustomMail addId={addId} key={i} id={i} {...v} />;
            })}
            <Pagination
              currentPage={page}
              siblingCount={0}
              boundaryCount={1}
              onChange={addBlocks}
              totalPages={totalPages}
            />
          </List>
        </>
      ) : null}
    </Panel>
  );
};
