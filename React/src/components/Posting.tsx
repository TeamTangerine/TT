import basicProfileImg from '../assets/basic-profile-img.png';
import iconMoreVertical from '../assets/icon/s-icon-more-vertical.png';
import iconHeart from '../assets/icon/icon-heart.png';
import iconMessage from '../assets/icon/icon-message-circle.svg';
import iconImgLayers from '../assets/icon/iccon-img-layers.png';
import { imageAPI } from '../service/fetch/api';
import { useNavigate } from 'react-router-dom';

// 리스트형 / 앨범형 선택을 위한 props 타입
/**
 * @param showList
 * - 리스트형 랜더링: true
 * - 앨범형 랜더링: false
 * @param userProfileImage - 유저의 프로필 이미지
 * @param userName - 유저의 이름
 * @param userId - 유저의 아이디
 * @param userContent - 게시물 내용
 * @param contentImage - 게시물 이미지
 * @param heartCount - 하트 개수
 * @param commentCount - 댓글 개수
 * @param createdAt - 게시물 작성 일자
 */
type PostingProps = {
  showList?: boolean;
  userProfileImage: string;
  userName: string;
  userId: string;
  userContent: string;
  contentImage: string;
  heartCount: number;
  commentCount: number;
  updatedAt: string;
};

function Posting({
  showList = true,
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
  // 아마자 랜더링을 위한 기본 url
  const imgUrl = 'https://dev.wenivops.co.kr/services/mandarin/';

  // 라우팅
  const navigate = useNavigate();

  // 이미지 배열 전환 함수
  function makeArray() {
    if (contentImage === undefined) {
      return;
    }

    return contentImage.split(',');
  }

  // 이미지 배열을 변수에 할당
  const contentImageArray = makeArray();

  // 날짜 형식 변환 함수
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <>
      {showList ? (
        // 리스트형 랜더링
        <li className="flex gap-3 justify-center w-[358px]">
          <img
            src={userProfileImage === '/Elipse.png' ? profileImg : imageAPI.getImage(userProfileImage)}
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
                  <img
                    className="w-[304px] h-[228px] rounded-[10px] border-[0.5px] border-[#DBDBDB] object-cover bg-[#C4C4C4] ]"
                    src={imgUrl + image}
                    key={index}
                    alt="게시글이미지"
                  />
                ))
              : null}
            <div className="flex gap-4">
              <div className="flex gap-[6px] items-center">
                <button className="w-5 h-5">
                  <img src={iconHeart} alt="좋아요" />
                </button>
                <span className="text-[12px] text-[#767676]">{heartCount}</span>
              </div>
              <div className="flex gap-[6px] items-center" onClick={() => navigate('/post')}>
                <button className="w-5 h-5">
                  <img src={iconMessage} alt="댓글" />
                </button>
                <span className="text-[12px] text-[#767676]">{commentCount}</span>
              </div>
            </div>
            <time dateTime={formatDate(updatedAt)} className="text-[10px] text-[#767676]">
              {formatDate(updatedAt)}
            </time>
          </article>
        </li>
      ) : (
        <>
          {/* 앨범형 랜더링 */}
          {contentImage && (
            <li className={`relative w-full aspect-square ${contentImage ? '' : 'hidden'}`}>
              <img
                src={contentImageArray && imgUrl + contentImageArray[0]}
                alt="게시글 이미지"
                className="w-full h-full object-cover"
              />
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
