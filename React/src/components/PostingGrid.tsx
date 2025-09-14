import Posting from './Posting';
import postAlbumOff from '../assets/icon/icon-post-album-off.png';
import postAlbumOn from '../assets/icon/icon-post-album-on.png';
import postListOff from '../assets/icon/icon-post-list-off.png';
import postListOn from '../assets/icon/icon-post-list-on.png';
import { useState } from 'react';

function HomeCardGrid() {
  const [showAlbum, setShowAlbum] = useState(true);
  const listBtnOn = postListOn;
  const listBtnOff = postListOff;
  const albumBtnOn = postAlbumOn;
  const albumBtnOff = postAlbumOff;

  // 토글 상태 관리 함수
  function toggleAlbum(value: boolean) {
    if (value === true) {
      setShowAlbum(false);
    }

    if (value === false) {
      setShowAlbum(true);
    }
  }

  return (
    <section className="flex flex-col">
      <div className="flex justify-center bg-white border-b border-b-[#DBDBDB]">
        <div className="min-w-[390px] flex justify-end gap-4 px-4 py-[9px]">
          <button className="w-[26px] h-[26px]">
            <img
              src={showAlbum ? listBtnOn : listBtnOff}
              alt="리스트로 보기"
              onClick={() => {
                toggleAlbum(false);
              }}
            />
          </button>
          <button className="w-[26px] h-[26px]">
            <img
              src={!showAlbum ? albumBtnOn : albumBtnOff}
              alt="앨범으로 보기"
              onClick={() => {
                toggleAlbum(true);
              }}
            />
          </button>
        </div>
      </div>
      <ul
        className={`${showAlbum ? 'flex flex-col items-center gap-6' : 'grid grid-cols-3 justify-items-center gap-x-[6px] gap-y-[6px] min-h-[144px]'} pt-6  px-4 bg-white`}
      >
        <Posting showAlbum={showAlbum} />
        <Posting showAlbum={showAlbum} />
        <Posting showAlbum={showAlbum} />
        <Posting showAlbum={showAlbum} />
      </ul>
    </section>
  );
}
export default HomeCardGrid;
