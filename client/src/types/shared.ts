export interface CommentTypes {
  commentId: number;
  content: string;
  createAt: string;
  modifyAt: string;
  writer: WriterTypes;
}

export interface WriterTypes {
  memberId: number;
  name: string;
}
