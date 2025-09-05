import Posting from './Posting';
import postAlbumOff from '../assets/icon/icon-post-album-off.png';
import postAlbumOn from '../assets/icon/icon-post-album-on.png';
import postListOff from '../assets/icon/icon-post-list-off.png';
import postListOn from '../assets/icon/icon-post-list-on.png';
import { useState } from 'react';

function HomeCardGrid() {
  const listBtn = postListOn;
  const albumBtn = postAlbumOff;

  return (
    <section className="flex flex-col">
      <div className="flex justify-center bg-white border-b border-b-[#DBDBDB]">
        <div className="min-w-[384px] flex justify-end gap-4 px-4 py-[9px]">
          <button className="w-[26px] h-[26px]">
            <img src={listBtn} alt="리스트로 보기" />
          </button>
          <button className="w-[26px] h-[26px]">
            <img src={albumBtn} alt="앨범으로 보기" />
          </button>
        </div>
      </div>
      <ul className="pt-6 flex flex-col items-center gap-6 px-4 bg-white">
        <Posting />
        <Posting />
        <Posting />
        <Posting />
      </ul>
    </section>
  );
}
export default HomeCardGrid;
