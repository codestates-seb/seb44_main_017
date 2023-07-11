import axios from "axios";
import NotifyItem from "@/components/Item_notify/NotifyItem";
import { useEffect, useState } from "react";

const NoticePage = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response =
        await axios.get(`http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/notify/board?page ={num}
        &szie={num}&sort={sort-option}`);
      console.log(response);
      setData(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* <NotifyItem
        title={data.title}
        contents={data.content}
        isNew={true}
        regDt={data.createAt}
        viewCount={data.view}
      /> */}
      <NotifyItem
        title=""
        contents="내용222dlaksdkasdkaksdakdaksdkasdsak"
        isNew={false}
        regDt="2023-07-09"
        viewCount={1320}
      />
      <NotifyItem
        title="제목2"
        contents="내용222dlaksdkasdkaksdakdaksdkasdsak"
        isNew={false}
        regDt="2023-07-09"
        viewCount={1320}
      />
      <NotifyItem
        title="제목2"
        contents="내용222dlaksdkasdkaksdakdaksdkasdsak"
        isNew={false}
        regDt="2023-07-09"
        viewCount={1320}
      />
      <NotifyItem
        title="제목2"
        contents="내용222dlaksdkasdkaksdakdaksdkasdsak"
        isNew={false}
        regDt="2023-07-09"
        viewCount={1320}
      />
    </div>
  );
};

export default NoticePage;
