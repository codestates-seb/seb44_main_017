import MypageHeader from "@/components/Mypage_header/MypageHeader";
import SelectBox from "@/components/SelectBox/SelectBox";
import * as S from "./style";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import { getToken } from "@/utils/token";
import { ProductTypes } from "@/types/shared";
import ProductItem from "@/components/Item_product/ProductItem";

const MyproductsPage = () => {
  const [sortValue, setSortValue] = useState("productsf");
  const sortOptions = ["판매완료", "판매중", "등록대기", "등록거절"];
  const [productData, setProductData] = useState<ProductTypes[]>([]);

  const [authorization, refresh] = getToken();

  const getMyProducts = async () => {
    try {
      const { data, status } = await axios.get(
        BASE_URL + `/members/${sortValue}?page=1&size=10&sort=newest`,
        {
          headers: {
            Authorization: authorization,
            Refresh: refresh,
          },
        }
      );

      if (data && status === 200) {
        setProductData(data.data);
      }
    } catch (error) {
      console.error("Failed get data", error);
    }
  };

  useEffect(() => {
    getMyProducts();
  }, [sortValue]);

  return (
    <>
      <MypageHeader title={"마이페이지"} username={"user100"} point={1000} />
      <S.Section>
        <S.PageTitle>
          <h2>내가 등록한 상품</h2>
          <SelectBox
            usage={"상태"}
            options={sortOptions}
            setOption={setSortValue}
          />
        </S.PageTitle>

        <S.ContentBox>
          {productData.map(item => (
            <div className="product_wrapper" key={item.product_id}>
              <ProductItem
                url={IMG_URL + "/" + item.image_link}
                isSell={false}
                like={false}
                title={item.name}
                price={"null"}
                product_id={item.product_id}
              />
            </div>
          ))}
        </S.ContentBox>
      </S.Section>
    </>
  );
};

export default MyproductsPage;
