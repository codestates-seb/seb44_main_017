import axios from "axios";
import * as S from "./style";
import { BASE_URL } from "@/constants/constants";
import { IMG_URL } from "@/constants/constants";
import Logo from "../../assets/logo_subtitle.svg";
import { useState, useEffect, useRef } from "react";
import arrowLeftIcon from "../../assets/arrowLeftIcon.svg";
import SelectBox from "../../components/SelectBox/SelectBox";
import arrowRightIcon from "../../assets/arrowRightIcon.svg";
import ProductItem from "../../components/Item_product/ProductItem";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import { getToken } from "@/utils/token";

interface Data {
  product_id: string;
  image_link: string;
  isSell: boolean;
  isLike: boolean;
  name: string;
  price: string;
  category: string;
}
interface Category {
  name: string;
  value: string;
}
export const ProductListPage = () => {
  const [btnSelect, setBtnSelect] = useState<boolean>(false);
  const [btnCategory, setBtnCategory] = useState<string>("");
  const [data, setData] = useState<Data[]>([]);
  // const [isLike, setIsLike] = useState(false);
  const isLike = false;
  const ref = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState<number>(0);
  const [value, setValue] = useState<string>("newest");
  // const [isSell, setIssell] = useState<boolean>(false);
  const isSell = false;

  const handleBtnCategory = (category: string) => {
    setBtnCategory(category);
    setBtnSelect(!btnSelect);
  };

  const sortOptions = [
    "최신순",
    "오래된순",
    "좋아요순",
    "조회수순",
    "가격낮은순",
    "가격높은순",
  ];

  const categories: Category[] = [
    { name: "전체", value: "all" },
    { name: "상의", value: "top" },
    { name: "하의", value: "bottom" },
    { name: "아우터", value: "outer" },
    { name: "기타", value: "etc" },
  ];
  // const sortOptions = [
  //   { name: "최신순", value: "new" },
  //   { name: "오래된순", value: "old" },
  // ];

  // const category = [
  //   { name: "상의", value: "sang" },
  //   { name: "하의", value: "hi" },
  // ];
  const getProducts = async () => {
    const [authorization, refresh] = getToken();

    try {
      const response = await axios.get(
        `${BASE_URL}/products?page=1&size=20&sort=${value}&issell=false`,
        {
          // 서버 수정 후 사용 안함
          headers: {
            Authorization: `${authorization}`,
            Refresh: `${refresh}`,
          },
        }
      );

      const filteredData = response.data.data;

      // if (btnCategory !== "전체") {
      //   filteredData = response.data.data.filter(
      //     (product: any) => product.category === btnCategory
      //   );
      // }

      setData(filteredData);
      // setData(response.data.data);
      // console.log(filteredData);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handlePrev = () => {
    if (ref.current) {
      if (ref.current.style.transform === "translateX(0px)") {
        return;
      } else {
        setTranslate(translate + 416);
      }
    }
  };
  const handleNext = () => {
    if (ref.current) {
      if (ref.current.style.transform === `translateX(-1248px)`) {
        return;
      } else {
        setTranslate(translate - 416);
      }
    }
  };

  return (
    <main>
      <S.SubTitleContainer>
        <S.SubTitleBox>
          <S.SubTitle style={{ color: "#2b475c" }}>RECLOSET</S.SubTitle>
          <S.SubTitleLogo src={Logo}></S.SubTitleLogo>
          <S.SubTitle>추천 상품</S.SubTitle>
        </S.SubTitleBox>
        <S.ProductsBox>
          <S.ArrowLeftIcon src={arrowLeftIcon} onClick={handlePrev} />
          <S.ProductsCarousel>
            {data.map(data => (
              <S.Url
                href={`/productinfo?productId=${data.product_id}`}
                style={{ textDecoration: "none" }}
              >
                <S.Product
                  ref={ref}
                  style={{ transform: `translateX(${translate}px)` }}
                >
                  <ProductItem
                    url={`${IMG_URL}/${data.image_link}`}
                    isSell={false}
                    like={isLike}
                    title={data.name}
                    price={data.price}
                    product_id={data.product_id}
                  ></ProductItem>
                </S.Product>
              </S.Url>
            ))}
          </S.ProductsCarousel>
          <S.ArrowRightIcon src={arrowRightIcon} onClick={handleNext} />
        </S.ProductsBox>
      </S.SubTitleContainer>
      <S.CategoryBar>
        {categories.map(category => (
          <CategoryButton
            onClick={handleBtnCategory}
            btnSelect={btnCategory === category.name}
            category={category.name}
          />
        ))}
      </S.CategoryBar>
      <S.SelectBar>
        <SelectBox usage={"정렬"} options={sortOptions} setOption={setValue} />
      </S.SelectBar>
      <S.ProductsContainer>
        {data.map(data => (
          <S.Url
            href={`/productinfo?productId=${data.product_id}`}
            style={{ textDecoration: "none" }}
          >
            <S.Product>
              <ProductItem
                url={`https://s3.ap-northeast-2.amazonaws.com/mainproject.bucket/${data.image_link}`}
                isSell={isSell}
                like={isLike}
                title={data.name}
                price={data.price}
                product_id={data.product_id}
              ></ProductItem>
            </S.Product>
          </S.Url>
        ))}
      </S.ProductsContainer>
    </main>
  );
};
