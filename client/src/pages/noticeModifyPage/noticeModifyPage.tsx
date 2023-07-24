import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Modify from "@/components/Modify/Modify";
import { BASE_URL } from "@/constants/constants";

type NoticeType = {
  boardId: "";
  title: "";
  content: "";
  createAt: "";
  modifyAt: "";
  view: "";
  writer: {
    adminId: "";
    name: "";
  };
};

const NoticeModifyPage = () => {
  const { boardId } = useParams();
  const [data, setData] = useState<NoticeType>({
    boardId: "",
    title: "",
    content: "",
    createAt: "",
    modifyAt: "",
    view: "",
    writer: {
      adminId: "",
      name: "",
    },
  });

  const getDetailData = async () => {
    try {
      const res = await axios.get(BASE_URL + `/notify/${boardId}`);
      setData(res.data);
      console.log(data);
    } catch (e) {
      console.error("Failed fetching data", e);
    }
  };
  useEffect(() => {
    getDetailData();
  }, []);
  console.log(data);
  return <Modify originalTitle={data.title} originalContents={data.content} />;
};

export default NoticeModifyPage;
