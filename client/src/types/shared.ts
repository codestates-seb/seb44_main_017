export interface QnACommentTypes {
  commentId: number | string;
  content: string;
  createAt: string;
  modifyAt: string;
  writer: AdminTypes;
}

export interface ProductCommentTypes {
  productCommentId: number;
  content: string;
  createAt: string;
  modifyAt: string;
  wrtier: WriterTypes;
}

export interface WriterTypes {
  memberId: number | string;
  name: string;
}

export interface AdminTypes {
  adminId: number | string;
  name: string;
}

export interface QnaTypes {
  questionId: number | string;
  title: string;
  content: string;
  createAt: string;
  modifyAt: string;
  view: number | string;
  writer?: WriterTypes;
  qcomments?: QnACommentTypes[];
}

export interface ProductTypes {
  name: string;
  price: number | string | null;
  product_id: number | string;
  member_id: number | string;
  category: string;
  title: null;
  content: string;
  image_link: string;
  modify_at: string;
  create_at: string;
  productlike: boolean | null;
  view: number | string;
  condition_value: null;
}

export interface ProductDetailTypes {
  productId: number;
  name: string;
  title: string | null;
  content: string;
  price: number | null;
  category: string;
  memberId: number;
  view: number;
  productLike: boolean | null;
  imageLink: string | null;
  issell: boolean;
  createAt: string;
  modifyAt: string;
  conditionValue: number | null;
  pointValue: number | null;
  comments: [];
}

export interface CartItemTypes {
  name: string;
  price: number;
  productId: number;
  memberId: number;
  category: string;
  title: null;
  content: string;
  imageLink: string;
  modifyAt: string;
  createAt: string;
  productlike: boolean | null;
  view: number;
  conditionValue: null;
}

export interface UserInfoTypes {
  email: string;
  isBan: boolean;
  memberId: number | string;
  money: number;
  name: string | undefined;
  phone: string;
  profile: string;
}

export interface LoginUserInfo extends UserInfoTypes {
  role: string;
}

export interface PostCodeTypes {
  postnum: string;
  address: string;
  reciver: string | undefined;
  reciverphone: string | undefined;
  pointspend: number;
  productlist: string;
}
