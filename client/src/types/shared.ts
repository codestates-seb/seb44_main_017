export interface CommentTypes {
  commentId: number | string;
  content: string;
  createAt: string;
  modifyAt: string;
  writer: WriterTypes;
}

export interface WriterTypes {
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
  writer: WriterTypes;
  qcomments: CommentTypes[];
}
