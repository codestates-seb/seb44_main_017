import React from "react";
import {
  NewBadge,
  NotifyContents,
  NotifyTitle,
  Notifyitemcard,
  PostIt,
  RegInfoWrapper,
  ViewImg,
} from "./NotifyItem.styles";
import View from "../../../public/images/view.svg";
import Post from "../../../public/images/Post.svg";
import Header from "../Header/Header";

const NotifyItem = () => {
  return (
    <Notifyitemcard>
      <NotifyTitle>(이벤트) 의류 등록 시 지급되는 포인트 UP!</NotifyTitle>
      <div>
        <PostIt src={Post} alt="" />
      </div>
      <NotifyContents>
        해당 이벤트는 2주간 진행되며....이러쿵저러쿵 어쩌구 저쩌구 블라블라블라
      </NotifyContents>
      <NewBadge>NEW</NewBadge>
      <RegInfoWrapper>
        <small>2023-07-05</small>
        <div>
          <ViewImg src={View} alt="조회수" />
          <small>1887</small>
        </div>
      </RegInfoWrapper>
    </Notifyitemcard>
  );
};

export default NotifyItem;
