import basicProfileImg from '../assets/basic-profile-img.png';
import iconMoreVertical from '../assets/icon/s-icon-more-vertical.png';
import postImgExample from '../assets/post-img-example.png';
import iconHeart from '../assets/icon/icon-heart.png';
import iconMessage from '../assets/icon/icon-message-circle.svg';

// 리스트형 / 앨범형 선택을 위한 props 타입
type PostingProps = {
  showAlbum?: boolean;
};

function Posting({ showAlbum = true }: PostingProps) {
  const profileImg = basicProfileImg;
  const postImg = postImgExample;
  return (
    <>
      {showAlbum ? (
        <li className="flex gap-3 max-w-[328px]">
          <img src={profileImg} alt="프로필" className="w-[42px] h-[42px]" />
          <article className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-[2px]">
                <h2 className="text-sm">애월읍 위니브 감귤농장</h2>
                <p className="text-[12px] text-[#767676]">@weniv_Mandarin</p>
              </div>
              <button className="mt-1 w-[18px] h-[18px] flex items-center justify-center">
                <img src={iconMoreVertical} alt="더보기" />
              </button>
            </div>
            <p>
              웃을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와
              악동하다. 대고 못할 넣는 풍부하게 뛰는 뛰노는 인생의 힘있다.
            </p>
            <img src={postImg} alt="게시글이미지" />
            <div className="flex gap-4">
              <div className="flex gap-[6px] items-center">
                <button className="w-5 h-5">
                  <img src={iconHeart} alt="좋아요" />
                </button>
                <span className="text-[12px] text-[#767676]">58</span>
              </div>
              <div className="flex gap-[6px] items-center">
                <button className="w-5 h-5">
                  <img src={iconMessage} alt="댓글" />
                </button>
                <span className="text-[12px] text-[#767676]">12</span>
              </div>
            </div>
            <time dateTime="2020-10-21" className="text-[10px] text-[#767676]">
              2020년 10월 21일
            </time>
          </article>
        </li>
      ) : (
        <li className="w-full aspect-square">
          <img src={postImg} alt="게시글 이미지" className="w-full h-full object-cover" />
        </li>
      )}
    </>
  );
}
export default Posting;
