import axios from "axios";
import * as S from "./style";
import useInput from "@/hooks/useInput";
import { BASE_URL, IMG_URL } from "@/constants/constants";
import SearchBar from "@/components/Search_bar/SearchBar";
import React, { useState, useEffect, useRef } from "react";
import SelectBox from "../../components/SelectBox/SelectBox";
import ProductItem from "../../components/Item_product/ProductItem";
import CustomPagination from "@/components/Pagination/CustomPagination";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import ProductItemRecommend from "@/components/Item_product_recommend/Product_Recommend_Item";

interface Data {
  productId: string;
  imageLink: string;
  isSell: boolean;
  isLike: boolean;
  name: string;
  price: string;
  category: string;
}

interface SearchData {
  product_id: number | string;
  name: string;
  title: string;
  content: string;
  price: number;
  category: string;
  image_link: string;
  issell: false;
  condition_value: number | string;
  productlike: number;
  view: number;
}

interface RecommendData {
  productId: string;
  imageLink: string;
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
  const [btnCategory, setBtnCategory] = useState<string>("전체");
  const [data, setData] = useState<Data[]>([]);
  const [searchData, setSearchData] = useState<SearchData[]>([]);
  const [recommendData, setRecommendData] = useState<RecommendData[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState<number>(0);
  const [value, setValue] = useState<string>("newest");
  const [page, setPage] = useState<any>(1);
  const [pageTotal, setPageTotal] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [searchValue, changeHandler, searchReset] = useInput("");
  const [isSearch, setIsSearch] = useState(false);

  const getRecommendProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products?page=1&size=20&sort="newest"&issell=false`
      );
      const data = response.data.data;
      setRecommendData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products?page=${page}&size=${size}&sort=${value}&issell=false`
      );
      const data = response.data.data;
      let filteredData = [];

      if (btnCategory === "전체") {
        filteredData = data;
      } else {
        filteredData = data.filter(
          (product: any) => product.category === btnCategory
        );
      }

      const modifiedData = filteredData.map((item: any) => ({
        ...item,
        isSell: true,
      }));

      const pageInfo = response.data.pageInfo.totalElements;
      setPageTotal(Math.ceil(pageInfo / size));

      setData(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = async (e: React.FormEvent) => {
    setIsSearch(true);
    e.preventDefault();
    try {
      const response = await axios.get(
        `${BASE_URL}/search?keyword=${searchValue}&page=1&size=20`
      );
      setSearchData(response.data.data);
    } catch (error) {
      console.log(error);
    }
    searchReset && searchReset();
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

  const handleBtnCategory = (btnCategory: string) => {
    setBtnCategory(btnCategory);
    setBtnSelect(!btnSelect);
  };

  const productCount = () => {
    const width = window.innerWidth;
    let size = 0;
    if (width > 1023) {
      size = 20;
    } else if (width < 1023 && width > 767) {
      size = 18;
    } else if (width < 766) {
      size = 9;
    }
    setSize(size);
  };

  useEffect(() => {
    productCount();
    getProducts();
    getRecommendProducts();

    const handleResize = () => {
      productCount();
      getProducts();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [value, btnCategory, page, size, isSearch]);

  const handlePrev = () => {
    if (ref.current) {
      if (ref.current.style.transform === "translateX(0px)") {
        return;
      } else {
        setTranslate(translate + 440);
      }
    }
  };

  const handleNext = () => {
    const productCnt = data.length;
    if (ref.current) {
      if (
        ref.current.style.transform ===
        `translateX(-${(productCnt - 4) * 220}px)`
      ) {
        return;
      } else {
        setTranslate(translate - 440);
      }
    }
  };

  return (
    <S.Container>
      <S.SubTitleContainer>
        <S.SubTitleBox>
          <S.SubTitle>추천 상품</S.SubTitle>
        </S.SubTitleBox>
        <S.ProductsBox>
          <S.ArrowLeftIcon onClick={handlePrev} />
          <S.ProductsCarousel>
            {recommendData.map(recommendData => (
              <S.Product
                ref={ref}
                style={{ transform: `translateX(${translate}px)` }}
              >
                <ProductItemRecommend
                  url={`${IMG_URL}/${recommendData.imageLink}`}
                  isSell={false}
                  like={recommendData.isLike}
                  title={recommendData.name}
                  price={recommendData.price}
                  productId={recommendData.productId}
                />
              </S.Product>
            ))}
          </S.ProductsCarousel>
          <S.ArrowRightIcon onClick={handleNext} />
        </S.ProductsBox>
      </S.SubTitleContainer>
      <S.SearchBox>
        <SearchBar
          searchValue={searchValue}
          changeHandler={changeHandler}
          searchHandler={searchHandler}
          setIsSearch={setIsSearch}
        />
      </S.SearchBox>
      <S.CategoryBar>
        {categories.map(category => (
          <CategoryButton
            onClick={handleBtnCategory}
            btnSelect={btnCategory === category.name}
            category={category.name}
          />
        ))}
        {size > 9 && (
          <SelectBox
            usage={"정렬"}
            options={sortOptions}
            setOption={setValue}
          />
        )}
      </S.CategoryBar>
      {size === 9 && (
        <S.SelectBar>
          <SelectBox
            usage={"정렬"}
            options={sortOptions}
            setOption={setValue}
          />
        </S.SelectBar>
      )}
      <S.ProductsContainer>
        {isSearch
          ? searchData.map(data => (
              <S.Product>
                <ProductItem
                  url={`${IMG_URL}/${data.image_link}`}
                  isSell={false}
                  like={false}
                  title={data.name}
                  price={data.price}
                  productId={data.product_id}
                ></ProductItem>
              </S.Product>
            ))
          : data.map(data => (
              <S.Product>
                <ProductItem
                  url={`${IMG_URL}/${data.imageLink}`}
                  isSell={false}
                  like={data.isLike}
                  title={data.name}
                  price={data.price}
                  productId={data.productId}
                ></ProductItem>
              </S.Product>
            ))}
      </S.ProductsContainer>
      <S.CustomPaginationBox>
        <CustomPagination pageCount={pageTotal} page={page} setPage={setPage} />
      </S.CustomPaginationBox>
    </S.Container>
  );
};
