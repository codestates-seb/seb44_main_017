import { useState, useEffect, useRef } from "react";
import * as S from "./style";
import Logo from "../../assets/logo_subtitle.svg";
import arrowLeftIcon from "../../assets/arrowLeftIcon.svg";
import arrowRightIcon from "../../assets/arrowRightIcon.svg";
import ProductItem from "../../components/Item_product/ProductItem";
import SelectBox from "../../components/SelectBox/SelectBox";
import axios from "axios";

interface Data {
  image_link: string;
  isSell: boolean;
  isLike: boolean;
  name: string;
  price: string;
}

export const ProductListPage = () => {
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<Data[]>([]);
  const [isLike, setIsLike] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleBtn = () => {
    setBtnActive(!btnActive);
  };

  const sortOptions = [
    "최신순",
    "오래된순",
    "좋아요순",
    "조회수순",
    "가격낮은순",
    "가격높은순",
  ];

  const getProducts = async () => {
    // 함수 별도 파일 만들기
    const cookie: string[] = document.cookie.split(";");
    const refresh: string | undefined = cookie
      .find((c) => c.includes("refresh="))
      ?.replace(" refresh=", "");
    try {
      const response = await axios.get(
        `http://ec2-43-200-107-103.ap-northeast-2.compute.amazonaws.com:8080/products?page=1&size=20&sort=newest&issell=false`,
        {
          // 서버 수정 후 사용 안함
          headers: {
            refresh: `${refresh}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const a = 600;
  const handlePrev = () => {
    if (ref.current) {
      ref.current.style.transform = `translateX(${a}px)`;
      console.log(`프리: ${ref.current}`);
    }
  };
  const handleNext = () => {
    if (ref.current) {
      ref.current.style.transform = `translateX(-${a}px)`;
      console.log(ref.current);
    }
    console.log(ref.current);
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
            {data.map((data) => (
              <S.Product ref={ref}>
                <ProductItem
                  url={`https://s3.ap-northeast-2.amazonaws.com/mainproject.bucket/${data.image_link}`}
                  isSell={false}
                  like={isLike}
                  title={data.name}
                  price={data.price}
                ></ProductItem>
              </S.Product>
            ))}
          </S.ProductsCarousel>
          <S.ArrowRightIcon src={arrowRightIcon} onClick={handleNext} />
        </S.ProductsBox>
      </S.SubTitleContainer>
      <S.CategoryBar>
        <S.CategoryButton $btnActive={btnActive} onClick={handleBtn}>
          전체
        </S.CategoryButton>
        <S.CategoryButton $btnActive={btnActive} onClick={handleBtn}>
          상의
        </S.CategoryButton>
        <S.CategoryButton $btnActive={btnActive} onClick={handleBtn}>
          하의
        </S.CategoryButton>
        <S.CategoryButton $btnActive={btnActive} onClick={handleBtn}>
          아우터
        </S.CategoryButton>
        <S.CategoryButton $btnActive={btnActive} onClick={handleBtn}>
          기타
        </S.CategoryButton>
      </S.CategoryBar>
      <S.SelectBar>
        <SelectBox options={sortOptions} setOption={setValue} />
      </S.SelectBar>
      <S.ProductsContainer>
        {data.map((data) => (
          <ProductItem
            url={`https://s3.ap-northeast-2.amazonaws.com/mainproject.bucket/${data.image_link}`}
            isSell={false}
            like={isLike}
            title={data.name}
            price={data.price}
          ></ProductItem>
        ))}
      </S.ProductsContainer>
    </main>
  );
};
