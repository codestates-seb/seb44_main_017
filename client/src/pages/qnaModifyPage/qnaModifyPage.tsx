import axios from "axios";
import { getToken } from "@/utils/token";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Modify from "@/components/Modify/Modify";
import { BASE_URL } from "@/constants/constants";

type QnaType = {
  title: string;
  content: "";
  createAt: "";
  modifyAt: "";
  view: "";
  writer: {
    memberId: "";
    name: "";
  };
};

const QnaModifyPage = () => {
  const { questionId } = useParams();
  const [authorization, refresh] = getToken();
  const [data, setData] = useState<QnaType>({
    title: "",
    content: "",
    createAt: "",
    modifyAt: "",
    view: "",
    writer: {
      memberId: "",
      name: "",
    },
  });

  const getDetailData = async () => {
    try {
      const res = await axios.get(BASE_URL + `/questions/${questionId}`, {
        headers: {
          Authorization: `${authorization}`,
          Refresh: `${refresh}`,
        },
      });
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

export default QnaModifyPage;
