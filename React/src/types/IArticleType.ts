export interface IArticleType {
  id: String;
  content?: String;
  image?: String;
  createdAt?: String;
  updatedAt?: String;
  hearted?: boolean;
  heartCount?: number;
  commentCount?: number;
  author: {
    _id?: string;
    username?: string;
    accountname?: string;
    intro?: string;
    image?: string;
    isfollow?: boolean;
    following?: string[];
    follower?: string[];
    followerCount?: number;
    followingCount?: number;
  };
}
