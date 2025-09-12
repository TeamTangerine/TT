/**
 * 이미지 관련 API 타입들
 */
export namespace ImageAPI {
  export interface IUploadResponse {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }

  export interface IUploadErrorResponse {
    message: string;
    error?: string;
    statusCode?: number;
  }
}

/**
 * 사용자 관련 API 타입들
 */
export namespace UserAPI {
  // 공통 사용자 프로필
  export interface IUserProfile {
    _id: string;
    username: string;
    accountname: string;
    email?: string;
    intro: string;
    image: string;
    isfollow: boolean;
    following: string[];
    follower: string[];
    followerCount: number;
    followingCount: number;
  }

  // 회원가입
  export interface ISignUpRequest {
    user: {
      username: string;
      email: string;
      password: string;
      accountname: string;
      intro?: string;
      image?: string;
    };
  }

  export interface ISignUpResponse {
    message: string;
    user: {
      _id: string;
      username: string;
      email: string;
      accountname: string;
      intro: string;
      image: string;
    };
  }

  // 로그인
  export interface ILoginRequest {
    user: {
      email: string;
      password: string;
    };
  }

  export interface ILoginResponse {
    user: {
      _id: string;
      username: string;
      email: string;
      accountname: string;
      image: string;
      token: string;
    };
  }

  // 내 정보 조회
  export interface IMyInfoResponse {
    user: IUserProfile;
  }

  // 이메일/계정명 검증
  export interface IEmailValidRequest {
    user: {
      email: string;
    };
  }

  export interface IAccountNameValidRequest {
    user: {
      accountname: string;
    };
  }

  export interface IValidationResponse {
    message: string;
  }

  // 프로필 수정
  export interface IUpdateProfileRequest {
    user: {
      username: string;
      accountname: string;
      intro: string;
      image: string;
    };
  }

  export interface IUpdateProfileResponse {
    user: IUserProfile;
  }

  // 사용자 검색
  export interface ISearchUserResponse
    extends Array<{
      _id: string;
      username: string;
      accountname: string;
      following: string[];
      follower: string[];
      followerCount: number;
      followingCount: number;
    }> {}

  // 토큰 검증
  export interface ITokenValidResponse {
    isValid: boolean;
  }
}

/**
 * 프로필 관련 API 타입들
 */
export namespace ProfileAPI {
  export interface IProfileResponse {
    profile: UserAPI.IUserProfile;
  }

  export interface IFollowResponse {
    profile: UserAPI.IUserProfile;
  }

  export interface IFollowingListResponse extends Array<UserAPI.IUserProfile> {}
  export interface IFollowerListResponse extends Array<UserAPI.IUserProfile> {}
}

/**
 * 게시글 관련 API 타입들
 */
export namespace PostAPI {
  export interface IAuthor {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    isfollow: boolean;
    following: string[];
    follower: string[];
    followerCount: number;
    followingCount: number;
  }

  export interface IPost {
    id: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    hearted: boolean;
    heartCount: number;
    commentCount: number;
    author: IAuthor;
  }

  // 게시글 작성
  export interface ICreatePostRequest {
    post: {
      content: string;
      image?: string;
    };
  }

  export interface ICreatePostResponse {
    post: IPost[];
  }

  // 게시글 목록 조회
  export interface IPostListResponse {
    posts: IPost[];
  }

  export interface IUserPostListResponse {
    post: IPost[];
  }

  // 게시글 상세 조회
  export interface IPostDetailResponse {
    post: IPost[];
  }

  // 게시글 수정
  export interface IUpdatePostRequest {
    post: {
      content: string;
      image: string;
    };
  }

  export interface IUpdatePostResponse {
    post: IPost[];
  }

  // 게시글 신고
  export interface IReportPostResponse {
    report: {
      post: string;
    };
  }

  // 좋아요
  export interface IHeartResponse {
    post: IPost;
  }
}

/**
 * 댓글 관련 API 타입들
 */
export namespace CommentAPI {
  export interface IComment {
    id: string;
    content: string;
    createdAt: string;
    author: PostAPI.IAuthor;
  }

  // 댓글 작성
  export interface ICreateCommentRequest {
    comment: {
      content: string;
    };
  }

  export interface ICreateCommentResponse {
    comment: IComment;
  }

  // 댓글 목록
  export interface ICommentListResponse {
    comment: IComment[];
  }

  // 댓글 신고
  export interface IReportCommentResponse {
    report: {
      comment: string;
    };
  }
}

/**
 * 상품 관련 API 타입들
 */
export namespace ProductAPI {
  export interface IProduct {
    id: string;
    itemName: string;
    price: number;
    link: string;
    itemImage: string;
    author: PostAPI.IAuthor;
  }

  // 상품 등록
  export interface ICreateProductRequest {
    product: {
      itemName: string;
      price: number;
      link: string;
      itemImage: string;
    };
  }

  export interface ICreateProductResponse {
    product: IProduct;
  }

  // 상품 목록
  export interface IProductListResponse {
    data: number;
    product: IProduct[];
  }

  // 상품 상세
  export interface IProductDetailResponse {
    product: IProduct;
  }

  // 상품 수정
  export interface IUpdateProductRequest {
    product: {
      itemName: string;
      price: number;
      link: string;
      itemImage: string;
    };
  }

  export interface IUpdateProductResponse {
    product: IProduct;
  }
}

/**
 * 공통 에러 응답 타입들
 */
export namespace ErrorAPI {
  export interface IValidationError {
    message: string;
  }

  export interface IUnauthorizedError {
    message: string;
    status: number;
  }

  export interface INotFoundError {
    message: string;
  }

  export interface IBadRequestError {
    message: string;
  }

  export interface IForbiddenError {
    message: string;
  }
}

/**
 * 공통 요청 옵션 타입들
 */
export namespace CommonAPI {
  export interface IPaginationParams {
    limit?: number;
    skip?: number;
  }

  export interface ISearchParams {
    keyword: string;
  }

  export interface IAuthHeaders {
    Authorization: string;
    'Content-type': 'application/json';
  }
}
