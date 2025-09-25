import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Posting from '../../components/Posting';
import Comment from './components/Comment';
import profileImg from '../../assets/Ellipse 6.png';
import { useParams, useLocation } from 'react-router-dom';
import { CommentAPI, PostAPI } from '../../types/IFetchType';
import { commentAPI, postAPI, userAPI } from '../../service/fetch/api';
import throttle from '../../Utils/throttle';

function Post() {
  // 유저 프로필 이미지 상태 관리
  const [userImg, setUserImg] = useState('');
  // 메세지 입력값 관리
  const [message, setMessage] = useState('');
  // URL에서 파라미터 값 가져오기
  const { postId } = useParams<string>();
  // navigate에서 온 state 데이터 받기
  const location = useLocation();
  const statePost = location.state?.post as PostAPI.IPost;
  // 게시글 데이터
  const [post, setPost] = useState<PostAPI.IPost>(statePost);
  // 댓글 목록 데이터
  const [comments, setComments] = useState<CommentAPI.IComment[]>([]);
  const [loading, setLoading] = useState(!statePost); // state가 있으면 false, 없으면 true
  const [commentLoading, setCommentLoading] = useState(false);

  // 게시글 불러오는 api가 담긴 함수 실행
  // 유저 프로필 이미지 렌더링
  // 댓글 목록 렌더링
  useEffect(() => {
    getDetailArticle();
    getUserInfo();
    getCommentList();
  }, []);

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
    if (!statePost && postId) {
      setLoading(true);
      try {
        const res = await postAPI.getPost(postId);
        // post가 빈값이거나 넘겨받은 게시물 데이터와 현재(로컬) 게시물 데이터의 수정 시각이 다르면 서버에서 최신 데이터를 부름
        if (!post || res.post.updatedAt !== post.updatedAt) {
          setPost(res.post);
        }
      } catch (error: any) {
        console.error(`상세 게시글 불러오기 실패: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  }

  // 댓글 게시 버튼 클릭 시 스로틀링 함수 발동
  const handleThrottle = throttle(postComment, 3000);

  // 해당 게시글에 대한 댓글 작성하는 api 함수
  async function postComment() {
    if (post?.id) {
      try {
        const res = await commentAPI.createComment(post.id, message);
        alert('댓글 작성 완료!');
        setMessage('');
        setComments((prev) => [res.comment, ...prev]);
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
                postId={post.id}
                heartCount={post.heartCount}
                hearted={post.hearted}
                commentCount={post.commentCount}
                updatedAt={post.updatedAt}
              />
            </span>
            {commentLoading && <p>댓글 로딩중</p>}
            {!commentLoading && comments.length > 0 && (
              <ul className="flex flex-col items-center  gap-4 pt-5 px-4 border-t border-t-[#DBDBDB]">
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
                handleThrottle();
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
