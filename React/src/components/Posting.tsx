import basicProfileImg from '../assets/basic-profile-img.png';
import iconMoreVertical from '../assets/icon/s-icon-more-vertical.png';
import postImgExample from '../assets/post-img-example.png';
import iconHeart from '../assets/icon/icon-heart.png';
import iconMessage from '../assets/icon/icon-message-circle.svg';

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
  hasPhoto?: boolean;
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
  hasPhoto = true,
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

  return (
    <>
      {showAlbum ? (
        // 리스트형 랜더링
        <li className="flex gap-3 max-w-[328px]">
          <img src={!!userProfileImage ? userProfileImage : profileImg} alt="프로필" className="w-[42px] h-[42px]" />
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
            <p className="break-all whitespace-pre-wrap">{userContent}</p>
            <img src={postImg} alt="게시글이미지" />
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
              {updatedAt}
            </time>
          </article>
        </li>
      ) : (
        // 앨범형 랜더링
        <li className={`w-full aspect-square ${hasPhoto ? '' : 'sr-only'}`}>
          <img src={postImg} alt="게시글 이미지" className="w-full h-full object-cover" />
        </li>
      )}
    </>
  );
}
export default Posting;
