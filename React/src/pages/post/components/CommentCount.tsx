import { useEffect, useState } from 'react';

/**
 * 해당 게시물에 댓글을 달면 자동으로 댓글 수만 렌더링 되어 댓글 갯수가 늘어나도록 해주는 함수입니다.
 * @param commentCount - 해당 게시물의 댓글 수
 */

type CommentCountProps = {
  commentCount: number;
};

function CommentCount({ commentCount }: CommentCountProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(commentCount);
  }, [commentCount]);

  return <span className="text-[12px] text-[#767676]">{count}</span>;
}

export default CommentCount;
