import { SimpleCell, Text, Checkbox } from "@vkontakte/vkui";
import { Dropdown } from "@vkontakte/vkui/dist/unstable";
import { useState } from "react";
import { apiRequest } from "../../lib/modules/apiRequest";
import { Icon16Attach } from "@vkontakte/icons";
import { Icon16RoubleOutline } from "@vkontakte/icons";
import { Icon16Bookmark } from "@vkontakte/icons";
import { Icon20ExclamationMarkOutline } from "@vkontakte/icons";
import { Icon20CheckShieldOutline } from "@vkontakte/icons";

export const CustomMail = ({
  text,
  title,
  dateTime,
  read,
  author: { name },
  id,
  addId,
  file,
  finance,
  flag,
  important,
  confidence,
  newThread,
}) => {
  const [shown, setShown] = useState(false);
  const [isRead, setRead] = useState(read);
  const changeRead = async () => {
    const { status } = await apiRequest("changeRead", {
      id,
    });
    if (status) {
      setRead(!isRead);
      return;
    }
  };
  return (
    <SimpleCell
      after={<Text className="Mail__after">{dateTime}</Text>}
      className={`Mail${!isRead ? " Mail--unread" : ""}`}
      before={
        <div className="Mail__before">
          <div className="Mail__before--menu">
            <span
              onClick={changeRead}
              className={`checkValue${!isRead ? " checkValue--unread" : ""}`}
            />
            <Checkbox onChange={() => addId(id)} deviceHasHover={false} />
          </div>
          <Text className="Mail__before--name">{name}</Text>
        </div>
      }
      indicator={
        <div className="Mail__indicator">
          {file ? (
            <Dropdown
              shown={shown}
              onShownChange={setShown}
              content={
                <>
                  <img src={file.preview} />
                  <Text weight={3} style={{ textAlign:'center', padding:5 }}>{file.filePath}</Text>
                </>
              }
            >
              <Icon16Attach />
            </Dropdown>
          ) : null}
          {important ? (
            <Icon20ExclamationMarkOutline
              width={16}
              height={16}
              fill="#FF7D6B"
            />
          ) : null}
          {finance ? <Icon16RoubleOutline fill="#87C887" /> : null}
          {confidence ? (
            <Icon20CheckShieldOutline width={16} height={16} fill="#87C887" />
          ) : null}
          {flag ? <Icon16Bookmark fill="#FF7D6B" /> : null}
          {newThread ? (
            <span
              style={{
                background: "var(--background_content)",
                fontSize: 13,
                padding: "2px 5px",
                borderRadius: 50,
                color: 'var(--text_third)'
              }}
            >
              New
            </span>
          ) : null}
        </div>
      }
    >
      <div className="Mail__in">
        <Text weight={3}>{title}</Text>
        <Text weight={3}>{text}</Text>
      </div>
    </SimpleCell>
  );
};
