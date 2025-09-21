import React, { useEffect, useState } from 'react';
import iconHeart from '../../assets/icon/icon-heart.png';
import iconHeartActive from '../../assets/icon/icon-heart-active.png';
import { postAPI } from '../../service/fetch/api';

type HeartProps = {
  postId: string;
  heartCount: number;
  hearted: boolean;
};

function Heart({ postId, heartCount, hearted }: HeartProps) {
  const [like, setLike] = useState(hearted);
  const [count, setCount] = useState(heartCount);

  async function handleLike() {
    try {
      const response = await postAPI.likePost(postId);
      setLike(response.post.hearted);
      setCount(response.post.heartCount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, [like, count]);

  return (
    <>
      <button className="w-5 h-5">
        <img src={like ? iconHeartActive : iconHeart} alt="좋아요" onClick={handleLike} />
      </button>
      <span className="text-[12px] text-[#767676]">{count}</span>
    </>
  );
}

export default Heart;
