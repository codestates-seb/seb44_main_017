import axios from "axios";
import NotifyItem from "@/components/Item_notify/NotifyItem";
import { useEffect, useState } from "react";

type ItemType = {
  title: string;
  content: string;
  createAt: string;
  view: number;
  admin: { adminId: number; name: string };
  boardId: number;
  modifyAt: string;
};

const NoticePage = () => {
  const [notifyList, setNotifyList] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(
        `http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/notify/board?page=1&size=10&sort=newest`
      );
      console.log(response.data.data);
      setNotifyList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {notifyList.map((e: ItemType) => (
        <NotifyItem
          key={e.boardId}
          title={e.title}
          contents={e.content}
          isNew={true}
          regDt={e.createAt}
          viewCount={e.view}
        />
      ))}
    </div>
  );
};

export default NoticePage;
