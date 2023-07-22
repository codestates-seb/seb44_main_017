import MypageHeader from "@/components/Mypage_header/MypageHeader";
import SelectBox from "@/components/SelectBox/SelectBox";
import * as S from "./style";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import { getToken } from "@/utils/token";
import { CartItemTypes, LoginUserInfo } from "@/types/shared";
import ProductItem from "@/components/Item_product/ProductItem";
import { useRecoilValue } from "recoil";
import { userInfoSelector } from "@/recoil/selector";
import CustomPagination from "@/components/Pagination/CustomPagination";

const MyproductsPage = () => {
  const [sortValue, setSortValue] = useState("productsf");
  const sortOptions = ["판매완료", "판매중", "등록대기", "등록거절"];
  const [productData, setProductData] = useState<CartItemTypes[]>([]);
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const PAGE_LIMIT = 24;

  const [authorization, refresh] = getToken();

  const getMyProducts = async () => {
    try {
      const { data, status } = await axios.get(
        BASE_URL +
          `/members/${sortValue}?page=${page}&size=${PAGE_LIMIT}&sort=newest`,
        {
          headers: {
            Authorization: authorization,
            Refresh: refresh,
          },
        }
      );

      if (data && status === 200) {
        console.log(data);
        setProductData(data.data);
        setTotalPage(Math.ceil(data.pageInfo.totalElements / PAGE_LIMIT));
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
      <MypageHeader
        title={"마이페이지"}
        username={userInfo?.name}
        point={userInfo?.money}
      />
      <S.Section>
        <S.PageTitle>
          <h2>내가 등록한 상품</h2>
          <SelectBox
            usage={"상태"}
            options={sortOptions}
            setOption={setSortValue}
          />
        </S.PageTitle>

        {Array.isArray(productData) && productData.length < 1 ? (
          <S.NoneItemsBox>
            <div className="none_items">등록한 상품이 없습니다.</div>
          </S.NoneItemsBox>
        ) : (
          <S.ContentBox>
            {productData.map(item => (
              <div className="product_wrapper" key={item.productId}>
                <ProductItem
                  url={IMG_URL + "/" + item.imageLink}
                  isSell={false}
                  like={false}
                  title={item.name}
                  price={item.price}
                  productId={item.productId}
                />
              </div>
            ))}
          </S.ContentBox>
        )}
        <S.PaginationBox>
          <CustomPagination
            pageCount={totalPage}
            page={page}
            setPage={setPage}
          />
        </S.PaginationBox>
      </S.Section>
    </>
  );
};

export default MyproductsPage;
