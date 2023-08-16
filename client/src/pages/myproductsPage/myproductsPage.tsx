import MypageHeader from "@/components/Mypage_header/MypageHeader";
import SelectBox from "@/components/SelectBox/SelectBox";
import * as S from "./style";
import { useEffect, useState } from "react";
import { IMG_URL } from "@/constants/constants";
import { CartItemTypes, LoginUserInfo } from "@/types/shared";
import ProductItem from "@/components/Item_product/ProductItem";
import { useRecoilValue } from "recoil";
import { userInfoSelector } from "@/recoil/selector";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { getCollectedProducts, getPurchasedProducts } from "./../../api/mypage";

const MyproductsPage = () => {
  const PAGE_LIMIT = 24;
  const statusOptions = ["판매완료", "판매중", "등록대기", "등록거절"];
  const sortOptions = [
    "최신순",
    "오래된순",
    "좋아요순",
    "조회수순",
    "가격낮은순",
    "가격높은순",
  ];
  const userInfo = useRecoilValue<LoginUserInfo | null>(userInfoSelector);
  const [statusValue, setStatusValue] = useState("productsf");
  const [sortValue, setSortValue] = useState("newest");
  const [productData, setProductData] = useState<CartItemTypes[]>([]);
  const [purchaseData, setPurchaseData] = useState<CartItemTypes[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isPurchase, setIsPurchase] = useState(false);

  const getPurchaseProducts = async () => {
    try {
      const { data, status } = await getPurchasedProducts({
        page,
        size: PAGE_LIMIT,
        sortValue,
      });

      if (data && status === 200) {
        setPurchaseData(data.data);
        setTotalPage(Math.ceil(data.pageInfo.totalElements / PAGE_LIMIT));
      }
    } catch (e) {
      console.error("Failed get purcharse products", e);
    }
  };

  const getMyProducts = async () => {
    try {
      const { data, status } = await getCollectedProducts({
        page,
        size: PAGE_LIMIT,
        sortValue: statusValue,
      });

      if (data && status === 200) {
        setProductData(data.data);
        setTotalPage(Math.ceil(data.pageInfo.totalElements / PAGE_LIMIT));
      }
    } catch (error) {
      console.error("Failed get data", error);
    }
  };

  useEffect(() => {
    getMyProducts();
    getPurchaseProducts();
  }, [statusValue, sortValue]);

  return (
    <>
      <MypageHeader
        title={"마이페이지"}
        username={userInfo?.name}
        point={userInfo?.money}
      />
      <S.Section>
        <S.Container>
          <S.PageTitle isPurchase={isPurchase}>
            <div className="sub_title">
              <h2
                className="title_register"
                onClick={() => setIsPurchase(false)}
              >
                등록한 상품
              </h2>
              <h2
                className="title_purchase"
                onClick={() => setIsPurchase(true)}
              >
                구매한 상품
              </h2>
            </div>

            <SelectBox
              usage={isPurchase ? "정렬" : "상태"}
              options={isPurchase ? sortOptions : statusOptions}
              setOption={isPurchase ? setSortValue : setStatusValue}
            />
          </S.PageTitle>

          {isPurchase ? (
            Array.isArray(purchaseData) && purchaseData.length < 1 ? (
              <S.NoneItemsBox>
                <div className="none_items">구매한 상품이 없습니다.</div>
              </S.NoneItemsBox>
            ) : (
              <S.ContentBox>
                {purchaseData.map(item => (
                  <div className="product_wrapper" key={item.productId}>
                    <ProductItem
                      url={IMG_URL + "/" + item.imageLink}
                      isSell={true}
                      like={false}
                      title={item.name}
                      price={item.price}
                      productId={item.productId}
                    />
                  </div>
                ))}
              </S.ContentBox>
            )
          ) : Array.isArray(productData) && productData.length < 1 ? (
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
        </S.Container>
      </S.Section>
    </>
  );
};

export default MyproductsPage;
