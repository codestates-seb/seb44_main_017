export interface CommentTypes {
  commentId: number | string;
  content: string;
  createAt: string;
  modifyAt: string;
  admin: WriterTypes;
}

export interface WriterTypes {
  adminId: number | string;
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
  qcomments: CommentTypes[];
}
