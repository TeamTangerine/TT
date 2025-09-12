// 기본 URL을 여기에 선언했습니다.
const BASE_URL = 'https://dev.wenivops.co.kr/services/mandarin';

//이미지 URL
/**
 * @property uploadFile - 한 개의 이미지 업로드
 * @property uploadFiles - 여러개 이미지 업로드 (최대3개)
 * @property getFile - 이미지 가져오기 (확장자를 포함한 이미지 이름 넣어줘야합니다.)
 */
export const IMAGE_URL = {
  uploadFile: `${BASE_URL}/image/uploadfile`,
  uploadFiles: `${BASE_URL}/image/uploadfiles`,
  /**
   * file이름을 동적으로 받아오기 위해 제작한 함수
   * @param filename - file을 확장자까지 적어서 넣어주세요
   * @returns 이미지
   */
  getFile: (filename: string) => `${BASE_URL}/${filename}`,
};

//유저 정보 URL
/**
 * @property singUp - 회원가입
 * @property login - 로그인
 * @property getInfo - 프로필 정보 불러오기
 * @property emailValid - 이메일 검증 (사용가능한 이메일인지)
 * @property accountNameValid - 사용자 계정 이름 검증 (사용 가능한 계정 ID인지)
 */
export const USER_URL = {
  signUp: `${BASE_URL}/user`,
  login: `${BASE_URL}/user/login`,
  getInfo: `${BASE_URL}/user/myinfo`,
  emailValid: `${BASE_URL}/user/emailvalid`,
  accountNameValid: `${BASE_URL}/user/accountnamevalid`,
};

//프로필 URL
/**
 * @property putUser - 프로필 수정
 * @property accountProfile - 개인 프로필 조회
 * @property accountFollow - 사용자 팔로우
 * @property unFollow - 사용자 언팔로우
 * @property followerList - 팔로잉 목록 조회
 * @property userFollowerList - 팔로워 목록 조회
 */
export const PROFILE_URL = {
  putUser: `${BASE_URL}/user`,
  /**
   * @param accountname - 계정명(문자열)
   * @returns
   */
  accountProfile: (accountname: string) => `${BASE_URL}/profile/:${accountname}`,
  /**
   *
   * @param accountname - 계정명(문자열)
   * @returns
   */
  accountFollow: (accountname: string) => `${BASE_URL}/profile/:${accountname}/follow`,
  unFollow: (accountname: string) => `${BASE_URL}/profile/:${accountname}/unfollow`,
  followerList: (accountname: string) => `${BASE_URL}/profile/:${accountname}/following`,
  userFollowerList: (accountname: string) => `${BASE_URL}/profile/:${accountname}/follower`,
};

//유저 검색 URL
export const SEARCH_USER_URL = {
  searchUser: (keyword: string) => `${BASE_URL}/user/searchuser/?keyword=${keyword}`,
};

//게시글 URL
export const ARTICLE_URL = {
  postArticle: `${BASE_URL}/post`,
  followFeedArticle: `${BASE_URL}/post/feed`,
  userArticle: (accountname: string) => `${BASE_URL}/post/${accountname}/userpost`,
  articleDetail: (postId: string) => `${BASE_URL}/post/${postId}`,
  putArticle: (postId: string) => `${BASE_URL}/post/${postId}`,
  deleteArticle: (postId: string) => `${BASE_URL}/post/${postId}`,
  reportArticle: (postId: string) => `${BASE_URL}/post/${postId}/report`,
  getAllArticle: `${BASE_URL}/post`,
};

//좋아요 URL
export const HEART_URL = {
  postHeart: (postId: string) => `${BASE_URL}/post/${postId}/heart`,
  deleteHeart: (postId: string) => `${BASE_URL}/post/${postId}/unheart`,
};

//댓글 URL
export const COMMENT_URL = {
  postComment: (postId: string) => `${BASE_URL}/post/${postId}/commnets`,
  listComment: (postId: string) => `${BASE_URL}/post/${postId}/comments`,
  deleteComment: (postID: string, commentId: string) => `${BASE_URL}/post/${postID}/comments/${commentId}`,
  reportComment: (postId: string, commentId: string) => `${BASE_URL}/post/${postId}/comments/${commentId}/report`,
};

//상품 URL
export const PRODUCT_URL = {
  postProduct: `${BASE_URL}/product`,
  listProduct: (accountName: string) => `${BASE_URL}/product/${accountName}`,
  productDetail: (productId: string) => `${BASE_URL}/product/detail/${productId}`,
  putProduct: (productId: string) => `${BASE_URL}/product/${productId}`,
  deleteProduct: (productId: string) => `${BASE_URL}/product/${productId}`,
};

//토큰 검증
export const TOKEN_URL = {
  checkToken: `${BASE_URL}/user/checktoken`,
};
