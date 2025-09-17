import basicProfileImg from '../assets/basic-profile-img.png';
import iconMoreVertical from '../assets/icon/s-icon-more-vertical.png';
import postImgExample from '../assets/post-img-example.png';
import iconHeart from '../assets/icon/icon-heart.png';
import iconMessage from '../assets/icon/icon-message-circle.svg';
import iconImgLayers from '../assets/icon/iccon-img-layers.png';

// 리스트형 / 앨범형 선택을 위한 props 타입
/**
 * @param showAlbum
 * - 리스트형 랜더링: true
 * - 앨범형 랜더링: false
 * @param hasPhoto
 * - 사진이 있는 경우: true
 * - 사진이 없는 경우: false
 * @param userProfileImage -
 * @param userName
 * @param userId
 * @param userContent
 * @param contentImage
 * @param heartCount
 * @param commentCount
 * @param createdAt -
 */
type PostingProps = {
  showAlbum?: boolean;
  userProfileImage?: string;
  userName?: string;
  userId?: string;
  userContent?: string;
  contentImage?: string;
  heartCount?: number;
  commentCount?: number;
  updatedAt?: string;
};

function Posting({
  showAlbum = true,
  userProfileImage,
  userName,
  userId,
  userContent,
  contentImage,
  heartCount,
  commentCount,
  updatedAt,
}: PostingProps) {
  const profileImg = basicProfileImg;
  const postImg = postImgExample;
  const imgUrl = 'https://dev.wenivops.co.kr/services/mandarin/';

  // 이미지 배열 전환 함수
  function makeArray() {
    if (contentImage === undefined) {
      console.log(contentImage);
      return;
    }

    return contentImage.split(',');
  }

  // 이미지 배열을 변수에 할당
  const contentImageArray = makeArray();

  function output() {
    console.log(contentImageArray);
    if (contentImageArray === undefined) {
      return 'undefined 입니다.';
    }

    return contentImageArray;
  }

  // 날짜 변환 함수
  function formatDate(dateString: string | undefined) {
    if (!dateString) {
      return '날짜 없음';
    }

    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <>
      {showAlbum ? (
        // 리스트형 랜더링
        <li className="flex gap-3 max-w-[328px] min-w-[328px]">
          <img
            src={userProfileImage !== 'Elipse.png' ? imgUrl + userProfileImage : profileImg}
            alt="프로필"
            className="w-[42px] h-[42px]"
          />
          <article className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[2px]">
                <h2 className="text-sm">{userName}</h2>
                <p className="text-[12px] text-[#767676]">{userId}</p>
              </div>
              <button className="mt-1 w-[18px] h-[18px] flex items-center justify-center">
                <img src={iconMoreVertical} alt="더보기" />
              </button>
            </div>
            <p className="break-all whitespace-pre-wrap w-[304px]">{userContent}</p>
            {contentImageArray && contentImageArray.length > 0
              ? contentImageArray.map((image: string, index: number) => (
                  <img src={imgUrl + image} key={index} alt="게시글이미지" />
                ))
              : null}
            {/* <img src={postImg} alt="게시글이미지" /> */}
            <div className="flex gap-4">
              <div className="flex gap-[6px] items-center">
                <button className="w-5 h-5">
                  <img src={iconHeart} alt="좋아요" />
                </button>
                <span className="text-[12px] text-[#767676]">{heartCount}</span>
              </div>
              <div className="flex gap-[6px] items-center">
                <button className="w-5 h-5">
                  <img src={iconMessage} alt="댓글" />
                </button>
                <span className="text-[12px] text-[#767676]">{commentCount}</span>
              </div>
            </div>
            <time dateTime="2020-10-21" className="text-[10px] text-[#767676]">
              {formatDate(updatedAt)}
            </time>
          </article>
        </li>
      ) : (
        <>
          {/* 앨범형 랜더링 */}
          {contentImage && (
            <li className={`relative w-full aspect-square ${contentImage ? '' : 'hidden'}`}>
              <img src={imgUrl + contentImageArray[0]} alt="게시글 이미지" className="w-full h-full object-cover" />
              {contentImage?.includes(',') && (
                <img className="absolute top-[6px] right-[6px]" src={iconImgLayers} alt="여러 이미지" />
              )}
            </li>
          )}
        </>
      )}
    </>
  );
}
export default Posting;
