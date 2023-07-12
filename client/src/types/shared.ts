export interface CommentTypes {
  commentId: number | string;
  content: string;
  createAt: string;
  modifyAt: string;
  writer: WriterTypes;
}

export interface WriterTypes {
  memberId: number | string;
  name: string;
}

export interface QnaTypes {
  questionId: number;
  title: string;
  content: string;
  createAt: string;
  modifyAt: string;
  view: number;
  writer: WriterTypes;
  comments: CommentTypes[];
}
