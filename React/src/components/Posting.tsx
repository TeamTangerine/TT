import { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import Heart from './profile/Heart';
import basicProfileImg from '../assets/basic-profile-img.png';
import iconMoreVertical from '../assets/icon/s-icon-more-vertical.png';
import iconMessage from '../assets/icon/icon-message-circle.svg';
import iconImgLayers from '../assets/icon/iccon-img-layers.png';
import { imageAPI, postAPI } from '../service/fetch/api';

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
 * @param updatedAt - 게시물 작성 일자
 */
type PostingProps = {
  showList?: boolean;
  userProfileImage: string;
  userName: string;
  userId: string;
  userContent: string;
  contentImage: string;
  postId: string;
  heartCount: number;
  hearted: boolean;
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
  postId,
  heartCount,
  hearted,
  commentCount,
  updatedAt,
}: PostingProps) {
  // 더보기 버튼 상태관리
  const [seeMore, setSeeMore] = useState('');
  const [seeContent, setSeeContent] = useState('line-clamp-3');
  const [showModal, setShowModal] = useState(false);

  // 기본 프로필 이미지
  const profileImg = basicProfileImg;

  // 이미지 랜더링을 위한 기본 url
  const imgUrl = 'https://dev.wenivops.co.kr/services/mandarin/';

  // 이미지 랜더링
  // 이미지 배열 전환 함수
  function makeArray() {
    if (contentImage === undefined) {
      return;
    }
    return contentImage.split(',');
  }

  // 이미지 배열을 변수에 할당
  const contentImageArray = makeArray();

  // '더보기' 적용을 위한 함수들
  // \n 개수를 세는 함수
  const checkLineBreaks = (text: string) => {
    const lineBreakCount = (text.match(/\n/g) || []).length;

    // 줄바꿈 4번 이상
    return lineBreakCount > 3;
  };

  // 게시물이 세줄 이상인 경우 더보기 버튼 보여주고, 게시물이 세줄 미만인 경우 숨김.
  // 게시물(userContent)의 길이가 87자 이상인 경우 또는 \n가 3개 이상인 경우를 이 함수를 통해 판별
  function needLineClamp() {
    if (userContent.length > 87 || checkLineBreaks(userContent)) {
      setSeeMore('');
    } else {
      setSeeMore('hidden');
    }
  }

  // 더보기 버튼을 눌렀을 경우, line-clamp를 css상태를 지움.
  function seeMoreContent() {
    seeContent === '' ? setSeeContent('line-clamp-3') : setSeeContent('');
  }

  // 포맷함수
  // 날짜 형식 변환 함수
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  useEffect(() => {
    needLineClamp();
  }, []);

  return (
    <>
      {showList ? (
        // 리스트형 랜더링
        <li className="flex gap-3 justify-center w-[358px]">
          <img
            src={userProfileImage === '/Elipse.png' ? profileImg : userProfileImage}
            alt="프로필"
            className="w-[42px] h-[42px] rounded-full"
          />
          <article className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[2px]">
                <h2 className="text-sm">{userName}</h2>
                <p className="text-[12px] text-[#767676]">{userId}</p>
              </div>
              <button className="mt-1 w-[18px] h-[18px] flex items-center justify-center">
                <img src={iconMoreVertical} onClick={() => setShowModal(true)} alt="더보기" />
              </button>
            </div>
            <p className={`break-all whitespace-pre-wrap w-[304px] ${seeContent}`}>{userContent}</p>
            <span
              className={`${seeMore} hover:text-[#ff6b35] text-[12px] font-medium cursor-pointer`}
              onClick={seeMoreContent}
            >
              {seeContent === 'line-clamp-3' ? '더보기' : '숨기기'}
            </span>
            <div className="flex flex-col gap-1">
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
            </div>
            <div className="flex gap-4">
              <div className="flex gap-[6px] items-center">
                <Heart postId={postId} heartCount={heartCount} hearted={hearted} />
              </div>
              <div className="flex gap-[6px] items-center">
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
            <li className={`relative w-full max-w-[200px] aspect-square ${contentImage ? '' : 'hidden'}`}>
              <img
                src={contentImageArray && imageAPI.getImage(contentImageArray[0])}
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
      {showModal && <Modal showModal={showModal} closeModal={() => setShowModal(false)} />}
    </>
  );
}
export default Posting;
