import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants/constants";
import ProductInfo from "./ProductInfo";
// import ProductInfo from "./ProductInfo";
// import { CommentTypes } from "@/types/shared";
// import ProductItem from "@/components/Item_product/ProductItem";
// import Comment from "@/components/Comment/Comment";

type ProductType = {
  productId: string;
  name: string;
  title: string;
  content: string;
  price: number;
  category: string;
  memberId: number;
  productLike: boolean;
  imageLink: string;
  issell: boolean;
  createdAt: string;
  modifiedAt: string;
  conditionValue: "condition integer value";
  pointValue: "point integer value";
  // comments: [
  //   {
  //     content: "댓글 내용",
  //     created-at: "YYYY-MM-DD hh-mm-ss";
  //     modified-at: "YYYY-MM-DD hh-mm-ss";
  //   }
  // ];
};

export const ProductInfoPage = () => {
  const [data, setData] = useState<ProductType | null>(null);

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products/1`);
      console.log(response.data);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {data && (
        <ProductInfo
          name={data.name}
          content={data.content}
          price={data.price}
          category={data.category}
          imageLink={data.imageLink}
        />
      )}
    </div>
  );
};
