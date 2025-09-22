import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Posting from '../../components/Posting';
import Comment from './components/Comment';
import profileImg from '../../assets/Ellipse 6.png';
import { useParams, useLocation } from 'react-router-dom';
import { CommentAPI, PostAPI } from '../../types/IFetchType';
import { commentAPI, postAPI, userAPI } from '../../service/fetch/api';

function Post() {
  // 유저 프로필 이미지 상태 관리
  const [userImg, setUserImg] = useState('');
  // 메세지 입력값 관리
  const [message, setMessage] = useState('');
  // URL에서 파라미터 값 가져오기
  const { postIdParams } = useParams<string>();
  // navigate에서 온 state 데이터 받기
  const location = useLocation();
  const statePost = location.state?.post as PostAPI.IPost | null;
  // 게시글 데이터
  const [post, setPost] = useState<PostAPI.IPost | null>(statePost || null);
  // 댓글 목록 데이터
  const [comments, setComments] = useState<CommentAPI.IComment[]>([]);
  const [loading, setLoading] = useState(!statePost); // state가 있으면 false, 없으면 true
  const [commentLoading, setCommentLoading] = useState(false);

  // navigate에서 state값을 받아왔을 때 or URL에서 id를 가져왔을 때 => 게시글 불러오는 api가 담긴 함수 실행
  useEffect(() => {
    getDetailArticle();
  }, [statePost, postIdParams]);

  // 유저 프로필 이미지 렌더링
  useEffect(() => {
    getUserInfo();
  }, []);

  // 댓글 목록 렌더링
  useEffect(() => {
    getCommentList();
  }, [post?.id]);

  // 유저가 클릭한 게시글을 어떻게 알 것인가..? url, state💛
  // 정보 불러와서 posting 컴포넌트로 넘겨주기🧡
  // 현재 로그인 중인 유저의 프로필 이미지 적용하기🧡
  // 게시글 상세 정보 불러오기🧡
  // 댓글 작성 commentAPI.createComment 사용하기💜
  // 댓글 목록 리스트 commentAPI.getComments 가져오기🤎
  // 댓글 컴포넌트에 props 넘겨주기🤎
  // 댓글 컴포넌트 props 받아와서 적용하기💙
  // 스크롤 가능하게 변경, 댓글 입력 시 재렌더링😍
  // 더보기 모달 창 뜨게하기😋
  // 댓글 날짜 현재시간에서 댓글 등록된 시간 차로 변경하기

  // 현재 로그인 중인 유저의 프로필 이미지 가져오는 api
  async function getUserInfo() {
    try {
      const res = await userAPI.getMyInfo();
      const image = res.user.image;
      setUserImg(image);
    } catch (error) {
      console.error('현재 로그인 중인 유저의 프로필 이미지 불러오기 실패', error);
    }
  }

  // 게시글 불러오는 api 함수
  async function getDetailArticle() {
    // state값이 없을 경우 api 작동
    if (!statePost && postIdParams) {
      setLoading(true);
      try {
        const res = await postAPI.getPost(postIdParams);
        // post가 빈값이거나 넘겨받은 게시물 데이터와 현재(로컬) 게시물 데이터의 수정 시각이 다르면 서버에서 최신 데이터를 부름
        if (!post || res.post.updatedAt !== post.updatedAt) {
          await setPost(res.post);
        }
        getCommentList();
      } catch (error: any) {
        console.error(`상세 게시글 불러오기 실패: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  }

  // 해당 게시글에 대한 댓글 작성하는 api 함수
  async function postComment() {
    if (post?.id) {
      try {
        const res = await commentAPI.createComment(post.id, message);
        alert('댓글 작성 완료!');
        setComments((prev) => [...prev, res.comment]);
        setMessage('');
        getCommentList();
      } catch (error: any) {
        console.error(`댓글 작성 실패: ${error.message}`);
      }
    }
  }

  // 해당 게시글의 댓글 목록을 불러오는 api 함수
  async function getCommentList() {
    if (post?.id) {
      setCommentLoading(true);
      try {
        const res = await commentAPI.getComments(post.id);
        setComments(res.comments);
      } catch (error: any) {
        console.error(`댓글 목록 불러오기 실패: ${error.message}`);
      } finally {
        setCommentLoading(false);
      }
    }
  }

  return (
    <>
      {loading && <p>로딩중...</p>}
      {!loading && post && (
        <>
          <Header navStyle="top-basic" />
          <main className="overflow-y-auto pb-[80px]">
            <span className="flex justify-center py-5">
              <Posting
                // 포스팅 컴포넌트에 대한 key
                key={post.id}
                userProfileImage={post.author.image}
                userName={post.author.username}
                userId={post.author.accountname}
                userContent={post.content}
                contentImage={post.image}
                heartCount={post.heartCount}
                commentCount={post.commentCount}
                updatedAt={post.updatedAt}
              />
            </span>
            {commentLoading && <p>댓글 로딩중</p>}
            {!commentLoading && comments.length > 0 && (
              <ul className="flex flex-col gap-4 pt-5 px-4 border-t border-t-[#DBDBDB]">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    userProfileImage={comment.author.image}
                    userName={comment.author.username}
                    content={comment.content}
                    createdAt={comment.createdAt}
                  />
                ))}
              </ul>
            )}
          </main>
          <div className="fixed bottom-0 flex items-center justify-center w-full h-[60px] border-t border-t-[#DBDBDB] bg-white">
            <img className="w-9 h-9 rounded-full" src={userImg ? userImg : profileImg} alt="내 프로필 이미지" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postComment();
              }}
            >
              <input
                className="w-[278px] ml-[18px] text-[14px] focus:outline-none  placeholder-[#C4C4C4]"
                type="text"
                placeholder="댓글 입력하기..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className={`text-[14px] ${message ? 'text-[#F26E22]' : 'text-[#C4C4C4] font-medium'}`}>
                게시
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Post;
