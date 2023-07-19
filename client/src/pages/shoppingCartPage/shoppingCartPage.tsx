import MypageHeader from "@/components/Mypage_header/MypageHeader";
import { BASE_URL } from "@/constants/constants";
import { UserInfoTypes } from "@/types/shared";
import { getId, getName, getToken } from "@/utils/token";
import axios from "axios";
import { useEffect, useState } from "react";

const ShoppingCartPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfoTypes>();
  const memberId = getId();
  const username = getName();
  console.log(document.cookie);

  useEffect(() => {
    const [authorization, refresh] = getToken();
    console.log(authorization);

    axios
      .get(BASE_URL + `/members/${memberId}`, {
        headers: {
          Authorization: authorization,
          Refresh: refresh,
        },
      })
      .then(res => setUserInfo(res.data.data));
  }, []);

  console.log(userInfo);
  return (
    <>
      <MypageHeader
        title={"장바구니"}
        username={username}
        point={userInfo?.money}
      />
      <section></section>
    </>
  );
};

export default ShoppingCartPage;
