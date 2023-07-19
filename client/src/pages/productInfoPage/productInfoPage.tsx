import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/constants/constants";
import { IMG_URL } from "@/constants/constants";
import { getToken } from "@/utils/token";
import ProductInfo from "./ProductInfo";

// import ProductItem from "@/components/Item_product/ProductItem";
// import Comment from "@/components/Comment/Comment";

export type ProductType = {
  productId: number;
  name: string;
  title: null;
  content: string;
  price: number;
  category: string;
  memberId: number;
  productLike: boolean | null;
  imageLink: string;
  issell: boolean;
  createdAt: string;
  modifiedAt: string;
  conditionValue: number | null;
  pointValue: number | null;
  view: number;
  comments: [];
};

export const ProductInfoPage = () => {
  const { productsID } = useParams();
  const [data, setData] = useState<ProductType | null>(null);
  const [authorization, refresh] = getToken();

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${productsID}`);
      console.log(response.data);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/kakaoPay/${productsID}`,
        {
          postnum: "06276",
          address: "OO로 22번길",
          reciver: "구매자",
          reciverphone: "010-1234-1234",
          pointspend: 0,
        },
        {
          headers: {
            Authorization: `${authorization}`,
            Refresh: `${refresh}`,
          },
        }
      );
      console.log(res.data);
      window.open(res.data);
      return res;
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
          key={data.productId}
          name={data.name}
          content={data.content}
          price={data.price}
          category={data.category}
          imageLink={IMG_URL + "/" + data.imageLink}
          handlePayment={handlePayment}
        />
      )}
    </div>
  );
};
