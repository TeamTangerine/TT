import { fetchAPI, options } from './fetcher';
import {
  USER_URL,
  IMAGE_URL,
  PROFILE_URL,
  ARTICLE_URL,
  SEARCH_USER_URL,
  TOKEN_URL,
  COMMENT_URL,
  PRODUCT_URL,
  HEART_URL,
} from './https';
import { ImageAPI, UserAPI, PostAPI, ProfileAPI, CommentAPI, ProductAPI } from '../../types/IFetchType';

/**
 * 이미지 API 모음
 */
export const imageAPI = {
  /**
   * 단수 이미지를 업로드하는 함수
   * @param file - File 타입 (단수) 이미지
   * @returns Promise<ImageAPI.IUploadResponse> 업로드된 이미지 정보
   * @throws {Error} 요청 실패 시 에러
   */
  uploadFile: async (file: File): Promise<ImageAPI.IUploadResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(IMAGE_URL.uploadFile, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('통신 에러가 발생했습니다');
    }

    return data;
  },

  /**
   * 복수의 이미지를 업로드하는 함수
   * @param file - FileList 타입 (복수) 이미지
   * @returns Promise<ImageAPI.IUploadResponse[]> 업로드된 이미지 목록
   * @throws {Error} 요청 실패 시 에러
   */
  uploadFiles: async (file: FileList): Promise<ImageAPI.IUploadResponse[]> => {
    const formData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append('image', file[i]);
    }

    const response = await fetch(IMAGE_URL.uploadFiles, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.status === 400) {
      if (data.message === 'Too many files') {
        throw new Error('이미지 갯수가 3개를 초과했습니다.');
      }
      throw new Error(data.message || '잘못된 요청입니다.');
    }

    if (!response.ok) {
      throw new Error('통신 에러가 발생했습니다.');
    }

    return data;
  },

  /**
   * 이미지 파일을 받아오는 함수
   * @param fileName - 불러오고자 하는 파일의 이름
   * @returns string 파일 url
   */
  getImage: (fileName: string): string => {
    return IMAGE_URL.getFile(fileName);
  },
};

/**
 * 사용자 API 모음
 */
export const userAPI = {
  /**
   * 회원가입을 진행합니다.
   * @param username - 사용자 이름
   * @param email - 이메일
   * @param password - 비밀번호
   * @param accountname - 계정명
   * @param intro - 자기소개 (선택적)
   * @param image - 프로필 이미지 URL (선택적)
   * @returns Promise<UserAPI.ISignUpResponse> 회원가입 결과
   * @throws {Error} 요청 실패 시 에러
   */
  signUp: async (
    username: string,
    email: string,
    password: string,
    accountname: string,
    intro: string = '',
    image: string = ''
  ): Promise<UserAPI.ISignUpResponse> => {
    const userData: UserAPI.ISignUpRequest = {
      user: {
        username,
        email,
        password,
        accountname,
        intro,
        image,
      },
    };

    return await fetchAPI(
      USER_URL.signUp,
      options({
        method: 'POST',
        data: userData,
      })
    );
  },

  /**
   * 로그인을 진행합니다.
   * @param email - 이메일 주소
   * @param password - 비밀번호
   * @returns Promise<UserAPI.ILoginResponse> 로그인 결과 (토큰 포함)
   * @throws {Error} 요청 실패 시 에러
   */
  login: async (email: string, password: string): Promise<UserAPI.ILoginResponse> => {
    const loginData: UserAPI.ILoginRequest = {
      user: { email, password },
    };

    return await fetchAPI(
      USER_URL.login,
      options({
        method: 'POST',
        data: loginData,
      })
    );
  },

  /**
   * 이메일의 유효성을 검사합니다.
   * @param email - 검증할 이메일 주소
   * @returns Promise<UserAPI.IValidationResponse> 검증 결과
   * @throws {Error} 요청 실패 시 에러
   */
  validateEmail: async (email: string): Promise<UserAPI.IValidationResponse> => {
    const emailData: UserAPI.IEmailValidRequest = {
      user: { email },
    };

    return await fetchAPI(
      USER_URL.emailValid,
      options({
        method: 'POST',
        data: emailData,
      })
    );
  },

  /**
   * 계정명의 유효성을 검사합니다.
   * @param accountname - 검증할 계정명
   * @returns Promise<UserAPI.IValidationResponse> 검증 결과
   * @throws {Error} 요청 실패 시 에러
   */
  validateAccountName: async (accountname: string): Promise<UserAPI.IValidationResponse> => {
    const accountData: UserAPI.IAccountNameValidRequest = {
      user: { accountname },
    };

    return await fetchAPI(
      USER_URL.accountNameValid,
      options({
        method: 'POST',
        data: accountData,
      })
    );
  },

  /**
   * 현재 로그인한 사용자의 정보를 조회합니다.
   * @param token - 인증 토큰
   * @returns Promise<UserAPI.IMyInfoResponse> 사용자 정보
   * @throws {Error} 요청 실패 시 에러
   */
  getMyInfo: async (token: string): Promise<UserAPI.IMyInfoResponse> => {
    return await fetchAPI(
      USER_URL.getInfo,
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 사용자를 검색합니다.
   * @param keyword - 검색 키워드
   * @param token - 인증 토큰
   * @returns Promise<UserAPI.ISearchUserResponse> 검색 결과
   * @throws {Error} 요청 실패 시 에러
   */
  searchUser: async (keyword: string, token: string): Promise<UserAPI.ISearchUserResponse> => {
    return await fetchAPI(
      SEARCH_USER_URL.searchUser(keyword),
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 토큰의 유효성을 검사합니다.
   * @param token - 검사할 토큰
   * @returns Promise<UserAPI.ITokenValidResponse> 토큰 검증 결과
   * @throws {Error} 요청 실패 시 에러
   */
  checkToken: async (token: string): Promise<UserAPI.ITokenValidResponse> => {
    return await fetchAPI(
      TOKEN_URL.checkToken,
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 프로필을 수정합니다.
   * @param username - 사용자 이름
   * @param accountname - 계정명
   * @param intro - 자기소개
   * @param image - 프로필 이미지 URL
   * @param token - 인증 토큰
   * @returns Promise<UserAPI.IUpdateProfileResponse> 수정된 프로필 정보
   * @throws {Error} 요청 실패 시 에러
   */
  updateProfile: async (
    username: string,
    accountname: string,
    intro: string,
    image: string,
    token: string
  ): Promise<UserAPI.IUpdateProfileResponse> => {
    const userData: UserAPI.IUpdateProfileRequest = {
      user: {
        username,
        accountname,
        intro,
        image,
      },
    };

    return await fetchAPI(
      PROFILE_URL.putUser,
      options({
        method: 'PUT',
        data: userData,
        token: token,
      })
    );
  },
};

/**
 * 프로필 API 모음
 */
export const profileAPI = {
  /**
   * 특정 사용자의 프로필 정보를 조회합니다.
   * @param accountname - 조회할 사용자의 계정명
   * @param token - 인증 토큰
   * @returns Promise<ProfileAPI.IProfileResponse> 프로필 정보
   * @throws {Error} 요청 실패 시 에러
   */
  getProfile: async (accountname: string, token: string): Promise<ProfileAPI.IProfileResponse> => {
    return await fetchAPI(
      PROFILE_URL.accountProfile(accountname),
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 특정 사용자를 팔로우합니다.
   * @param accountname - 팔로우할 사용자의 계정명
   * @param token - 인증 토큰
   * @returns Promise<ProfileAPI.IFollowResponse> 팔로우 결과
   * @throws {Error} 요청 실패 시 에러
   */
  follow: async (accountname: string, token: string): Promise<ProfileAPI.IFollowResponse> => {
    return await fetchAPI(
      PROFILE_URL.accountFollow(accountname),
      options({
        method: 'POST',
        token: token,
      })
    );
  },

  /**
   * 특정 사용자를 언팔로우합니다.
   * @param accountname - 언팔로우할 사용자의 계정명
   * @param token - 인증 토큰
   * @returns Promise<ProfileAPI.IFollowResponse> 언팔로우 결과
   * @throws {Error} 요청 실패 시 에러
   */
  unfollow: async (accountname: string, token: string): Promise<ProfileAPI.IFollowResponse> => {
    return await fetchAPI(
      PROFILE_URL.unFollow(accountname),
      options({
        method: 'DELETE',
        token: token,
      })
    );
  },

  /**
   * 특정 사용자의 팔로잉 목록을 조회합니다.
   * @param accountname - 조회할 사용자의 계정명
   * @param token - 인증 토큰
   * @returns Promise<ProfileAPI.IFollowingListResponse> 팔로잉 목록
   * @throws {Error} 요청 실패 시 에러
   */
  getFollowingList: async (accountname: string, token: string): Promise<ProfileAPI.IFollowingListResponse> => {
    return await fetchAPI(
      PROFILE_URL.followerList(accountname),
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 특정 사용자의 팔로워 목록을 조회합니다.
   * @param accountname - 조회할 사용자의 계정명
   * @param token - 인증 토큰
   * @returns Promise<ProfileAPI.IFollowerListResponse> 팔로워 목록
   * @throws {Error} 요청 실패 시 에러
   */
  getFollowerList: async (accountname: string, token: string): Promise<ProfileAPI.IFollowerListResponse> => {
    return await fetchAPI(
      PROFILE_URL.userFollowerList(accountname),
      options({
        method: 'GET',
        token: token,
      })
    );
  },
};

/**
 * 게시글 API 모음
 */
export const postAPI = {
  /**
   * 새 게시글을 작성합니다.
   * @param content - 게시글 내용
   * @param token - 인증 토큰
   * @param image - 첨부할 이미지 URL (선택적)
   * @returns Promise<PostAPI.ICreatePostResponse> 생성된 게시글 정보
   * @throws {Error} 요청 실패 시 에러
   */
  createPost: async (content: string, token: string, image?: string): Promise<PostAPI.ICreatePostResponse> => {
    const requestData: PostAPI.ICreatePostRequest = {
      post: {
        content: content,
        ...(image && { image: image }),
      },
    };

    return await fetchAPI(
      ARTICLE_URL.postArticle,
      options({
        method: 'POST',
        data: requestData,
        token: token,
      })
    );
  },

  /**
   * 게시글을 수정합니다.
   * @param postId - 수정할 게시글 ID
   * @param content - 수정할 내용
   * @param image - 수정할 이미지 URL
   * @param token - 인증 토큰
   * @returns Promise<PostAPI.IUpdatePostResponse> 수정된 게시글 정보
   * @throws {Error} 요청 실패 시 에러
   */
  updatePost: async (
    postId: string,
    content: string,
    image: string,
    token: string
  ): Promise<PostAPI.IUpdatePostResponse> => {
    const requestData: PostAPI.IUpdatePostRequest = {
      post: {
        content: content,
        image: image,
      },
    };

    return await fetchAPI(
      ARTICLE_URL.putArticle(postId),
      options({
        method: 'PUT',
        data: requestData,
        token: token,
      })
    );
  },

  /**
   * 게시글을 삭제합니다.
   * @param postId - 삭제할 게시글 ID
   * @param token - 인증 토큰
   * @returns Promise<void> 삭제 결과 (204 응답)
   * @throws {Error} 요청 실패 시 에러
   */
  deletePost: async (postId: string, token: string): Promise<void> => {
    return await fetchAPI(
      ARTICLE_URL.deleteArticle(postId),
      options({
        method: 'DELETE',
        token: token,
      })
    );
  },

  /**
   * 특정 게시글을 조회합니다.
   * @param postId - 조회할 게시글 ID
   * @param token - 인증 토큰
   * @returns Promise<PostAPI.IPostDetailResponse> 게시글 정보
   * @throws {Error} 요청 실패 시 에러
   */
  getPost: async (postId: string, token: string): Promise<PostAPI.IPostDetailResponse> => {
    return await fetchAPI(
      ARTICLE_URL.articleDetail(postId),
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 피드를 조회합니다.
   * @param token - 인증 토큰
   * @param limit - 조회할 개수 (선택적)
   * @param skip - 건너뛸 개수 (선택적)
   * @returns Promise<PostAPI.IPostListResponse> 피드 목록
   * @throws {Error} 요청 실패 시 에러
   */
  getFeed: async (token: string, limit?: number, skip?: number): Promise<PostAPI.IPostListResponse> => {
    let url = ARTICLE_URL.followFeedArticle;

    // 쿼리 파라미터 추가
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (skip) params.append('skip', skip.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return await fetchAPI(
      url,
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 특정 사용자의 게시글 목록을 조회합니다.
   * @param accountname - 조회할 사용자의 계정명
   * @param token - 인증 토큰
   * @param limit - 조회할 개수 (선택적)
   * @param skip - 건너뛸 개수 (선택적)
   * @returns Promise<PostAPI.IUserPostListResponse> 사용자 게시글 목록
   * @throws {Error} 요청 실패 시 에러
   */
  getUserPosts: async (
    accountname: string,
    token: string,
    limit?: number,
    skip?: number
  ): Promise<PostAPI.IUserPostListResponse> => {
    let url = ARTICLE_URL.userArticle(accountname);

    // 쿼리 파라미터 추가
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (skip) params.append('skip', skip.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return await fetchAPI(
      url,
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 게시글에 좋아요를 추가합니다.
   * @param postId - 좋아요를 추가할 게시글 ID
   * @param token - 인증 토큰
   * @returns Promise<PostAPI.IHeartResponse> 좋아요 결과
   * @throws {Error} 요청 실패 시 에러
   */
  likePost: async (postId: string, token: string): Promise<PostAPI.IHeartResponse> => {
    return await fetchAPI(
      HEART_URL.postHeart(postId),
      options({
        method: 'POST',
        token: token,
      })
    );
  },

  /**
   * 게시글의 좋아요를 취소합니다.
   * @param postId - 좋아요를 취소할 게시글 ID
   * @param token - 인증 토큰
   * @returns Promise<PostAPI.IHeartResponse> 좋아요 취소 결과
   * @throws {Error} 요청 실패 시 에러
   */
  unlikePost: async (postId: string, token: string): Promise<PostAPI.IHeartResponse> => {
    return await fetchAPI(
      HEART_URL.deleteHeart(postId),
      options({
        method: 'DELETE',
        token: token,
      })
    );
  },

  /**
   * 게시글을 신고합니다.
   * @param postId - 신고할 게시글 ID
   * @param token - 인증 토큰
   * @returns Promise<PostAPI.IReportPostResponse> 신고 결과
   * @throws {Error} 요청 실패 시 에러
   */
  reportPost: async (postId: string, token: string): Promise<PostAPI.IReportPostResponse> => {
    return await fetchAPI(
      ARTICLE_URL.reportArticle(postId),
      options({
        method: 'POST',
        token: token,
      })
    );
  },
};

/**
 * 댓글 API 모음
 */
export const commentAPI = {
  /**
   * 게시글에 댓글을 작성합니다.
   * @param postId - 댓글을 작성할 게시글 ID
   * @param content - 댓글 내용
   * @param token - 인증 토큰
   * @returns Promise<CommentAPI.ICreateCommentResponse> 생성된 댓글 정보
   * @throws {Error} 요청 실패 시 에러
   */
  createComment: async (postId: string, content: string, token: string): Promise<CommentAPI.ICreateCommentResponse> => {
    const requestData: CommentAPI.ICreateCommentRequest = {
      comment: { content: content },
    };

    return await fetchAPI(
      COMMENT_URL.postComment(postId),
      options({
        method: 'POST',
        data: requestData,
        token: token,
      })
    );
  },

  /**
   * 특정 게시글의 댓글 목록을 조회합니다.
   * @param postId - 댓글을 조회할 게시글 ID
   * @param token - 인증 토큰
   * @param limit - 조회할 개수 (선택적)
   * @param skip - 건너뛸 개수 (선택적)
   * @returns Promise<CommentAPI.ICommentListResponse> 댓글 목록
   * @throws {Error} 요청 실패 시 에러
   */
  getComments: async (
    postId: string,
    token: string,
    limit?: number,
    skip?: number
  ): Promise<CommentAPI.ICommentListResponse> => {
    let url = COMMENT_URL.listComment(postId);

    // 쿼리 파라미터 추가
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (skip) params.append('skip', skip.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return await fetchAPI(
      url,
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 댓글을 삭제합니다.
   * @param postId - 댓글이 속한 게시글 ID
   * @param commentId - 삭제할 댓글 ID
   * @param token - 인증 토큰
   * @returns Promise<void> 삭제 결과 (204 응답)
   * @throws {Error} 요청 실패 시 에러
   */
  deleteComment: async (postId: string, commentId: string, token: string): Promise<void> => {
    return await fetchAPI(
      COMMENT_URL.deleteComment(postId, commentId),
      options({
        method: 'DELETE',
        token: token,
      })
    );
  },

  /**
   * 댓글을 신고합니다.
   * @param postId - 댓글이 속한 게시글 ID
   * @param commentId - 신고할 댓글 ID
   * @param token - 인증 토큰
   * @returns Promise<CommentAPI.IReportCommentResponse> 신고 결과
   * @throws {Error} 요청 실패 시 에러
   */
  reportComment: async (
    postId: string,
    commentId: string,
    token: string
  ): Promise<CommentAPI.IReportCommentResponse> => {
    return await fetchAPI(
      COMMENT_URL.reportComment(postId, commentId),
      options({
        method: 'POST',
        token: token,
      })
    );
  },
};

/**
 * 상품 API 모음
 */
export const productAPI = {
  /**
   * 새 상품을 등록합니다.
   * @param itemName - 상품명
   * @param price - 가격
   * @param link - 상품 링크
   * @param itemImage - 상품 이미지 URL
   * @param token - 인증 토큰
   * @returns Promise<ProductAPI.ICreateProductResponse> 생성된 상품 정보
   * @throws {Error} 요청 실패 시 에러
   */
  createProduct: async (
    itemName: string,
    price: number,
    link: string,
    itemImage: string,
    token: string
  ): Promise<ProductAPI.ICreateProductResponse> => {
    const requestData: ProductAPI.ICreateProductRequest = {
      product: {
        itemName: itemName,
        price: price,
        link: link,
        itemImage: itemImage,
      },
    };

    return await fetchAPI(
      PRODUCT_URL.postProduct,
      options({
        method: 'POST',
        data: requestData,
        token: token,
      })
    );
  },

  /**
   * 상품을 수정합니다.
   * @param productId - 수정할 상품 ID
   * @param itemName - 수정할 상품명
   * @param price - 수정할 가격
   * @param link - 수정할 상품 링크
   * @param itemImage - 수정할 상품 이미지 URL
   * @param token - 인증 토큰
   * @returns Promise<ProductAPI.IUpdateProductResponse> 수정된 상품 정보
   * @throws {Error} 요청 실패 시 에러
   */
  updateProduct: async (
    productId: string,
    itemName: string,
    price: number,
    link: string,
    itemImage: string,
    token: string
  ): Promise<ProductAPI.IUpdateProductResponse> => {
    const requestData: ProductAPI.IUpdateProductRequest = {
      product: {
        itemName: itemName,
        price: price,
        link: link,
        itemImage: itemImage,
      },
    };

    return await fetchAPI(
      PRODUCT_URL.putProduct(productId),
      options({
        method: 'PUT',
        data: requestData,
        token: token,
      })
    );
  },

  /**
   * 상품을 삭제합니다.
   * @param productId - 삭제할 상품 ID
   * @param token - 인증 토큰
   * @returns Promise<void> 삭제 결과 (204 응답)
   * @throws {Error} 요청 실패 시 에러
   */
  deleteProduct: async (productId: string, token: string): Promise<void> => {
    return await fetchAPI(
      PRODUCT_URL.deleteProduct(productId),
      options({
        method: 'DELETE',
        token: token,
      })
    );
  },

  /**
   * 특정 상품을 조회합니다.
   * @param productId - 조회할 상품 ID
   * @param token - 인증 토큰
   * @returns Promise<ProductAPI.IProductDetailResponse> 상품 정보
   * @throws {Error} 요청 실패 시 에러
   */
  getProduct: async (productId: string, token: string): Promise<ProductAPI.IProductDetailResponse> => {
    return await fetchAPI(
      PRODUCT_URL.productDetail(productId),
      options({
        method: 'GET',
        token: token,
      })
    );
  },

  /**
   * 특정 사용자의 상품 목록을 조회합니다.
   * @param accountName - 조회할 사용자의 계정명
   * @param token - 인증 토큰
   * @returns Promise<ProductAPI.IProductListResponse> 사용자 상품 목록
   * @throws {Error} 요청 실패 시 에러
   */
  getUserProducts: async (accountName: string, token: string): Promise<ProductAPI.IProductListResponse> => {
    return await fetchAPI(
      PRODUCT_URL.listProduct(accountName),
      options({
        method: 'GET',
        token: token,
      })
    );
  },
};
