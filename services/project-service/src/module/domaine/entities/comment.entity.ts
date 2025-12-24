
export enum CommentType {
  COMMENT = 'COMMENT',
  QUESTION = 'QUESTION',
  SUGGESTION = 'SUGGESTION',
}

export class CommentEntity {
  private id: string;
  type: CommentType;
  private content: string;
  private author: string;
  private parentComment?: CommentEntity;
  private isVisible: boolean = true;
  private projectId?: string;
  chapterId?: string;
  createAt: Date = new Date();
  updateAt: Date = new Date();
  private metric: {
    likeCount: number;
    replyCount: number;
    isSolution: boolean;
  } = {
    likeCount: 0,
    replyCount: 0,
    isSolution: false,
  };

  constructor(params: {
    id: string;
    updateAt?: Date;
    type: CommentType;
    content: string;
    author: number;
    isVisible?: boolean;
    projectId?: string;
    parentComment?: CommentEntity;
    chapterId?: string;
    metric?: { likeCount: number; replyCount: number; isSolution: boolean };
    createAt?: Date;
  }) {
    Object.assign(this, params);
  }

  // Getter / Setter
  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }
  setVisibility(value: boolean) {
    this.isVisible = value;
  }
  getVisibility() {
    return this.isVisible;
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string) {
    this.content = content;
  }

  getAuthor(): string {
    return this.author;
  }

  setAuthor(author: string) {
    this.author = author;
  }

  getParentComment(): CommentEntity | undefined {
    return this.parentComment;
  }

  setParentComment(parentComment?: CommentEntity) {
    this.parentComment = parentComment;
  }

  getProjectId(): string | undefined {
    return this.projectId;
  }

  getMetric() {
    return this.metric;
  }

  setLikeCount(value: number) {
    this.metric.likeCount += value;
  }

  setMetric(metric: {
    likeCount: number;
    replyCount: number;
    isSolution: boolean;
  }) {
    this.metric = metric;
  }
}
