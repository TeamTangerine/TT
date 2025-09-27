import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Posting from '../../components/Posting';
import Comment from './components/Comment';
import profileImg from '../../assets/Ellipse 6.png';
import { useParams, useLocation } from 'react-router-dom';
import { CommentAPI, PostAPI } from '../../types/IFetchType';
import { commentAPI, imageAPI, postAPI, userAPI } from '../../service/fetch/api';
import throttle from '../../utils/throttle';
import infiniteScroll from '../../utils/infiniteScroll';

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

  const [firstRender, setFirstRender] = useState(false);

  // 게시글 불러오는 api가 담긴 함수 실행
  // 유저 프로필 이미지 렌더링
  // 댓글 목록 렌더링
  useEffect(() => {
    getDetailArticle();
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!post?.id) return;
    // 댓글이 아직 없을 때만 첫 로딩
    if (comments.length === 0) {
      getCommentList();
      setFirstRender(true);
    }
  }, [post?.id]);

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

        // 댓글 수 1 증가
        setPost((prev) => (prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev));
      } catch (error: any) {
        console.error(`댓글 작성 실패: ${error.message}`);
      }
    }
  }

  // const [scrollSkip, setScrollSkip] = useState(0);

  // 스크롤해서 바닥에 닿으면 추가적인 댓글 목록 10개씩 불러오기
  // infiniteScroll(500);

  // 해당 게시글의 댓글 목록을 불러오는 api 함수
  async function getCommentList() {
    //todo
    // 1. 첫 로딩시 댓글 불러오기
    // 1-1 포스트에 댓글이 있는지 확인(포스트 응답값에 comments가 배열로 오고있음)
    // 2. 댓글의 크기가 0보다 크면 댓글 로딩
    // 2-1 만약 스크롤 이벤트가 트루고(바닥에 닿음), 댓글수 -10 이 0 보다 크면 댓글 스킵 로딩
    // 3. 종료

    //총 댓글 갯수
    const totalComments = post.commentCount;

    //총 댓글이 0보다 크면(댓글이 존재하면)
    if (totalComments > 0) {
      //댓글의 갯수가 총 댓글수보다 적다면
      if (comments.length < totalComments) {
        //통신 시도..
        try {
          //로딩
          setCommentLoading(true);
          const res = await commentAPI.getComments(post.id, 10, comments.length);
          //기존 댓글에 새 댓글 추가
          setComments((prev) => [...prev, ...res.comments]);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          //로딩완료
          setCommentLoading(false);
        }
      }
    }
  }

  // 무한스크롤 이펙트
  useEffect(() => {
    //아직 포스트 객체 없으면 리턴
    if (!post?.id) return;

    //쓰로틀
    const handleScroll = throttle(() => {
      // 바닥에 도달하고, 더 불러올 댓글이 있고, 로딩 중이 아닐 때만 실행
      if (infiniteScroll() && comments.length < post.commentCount && !commentLoading && firstRender) {
        getCommentList();
      }
    }, 300); // 조금 더 빠르게 반응하도록 300ms로 조정

    // 기존 이벤트 리스너 제거 (혹시 남아있을 수 있는 것들)
    window.removeEventListener('scroll', handleScroll);

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [post?.id, comments.length]);

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
            {/* 댓글 목록은 로딩 상태와 관계없이 항상 표시 */}
            {comments.length > 0 && (
              <ul className="flex flex-col items-center  gap-4 pt-5 px-4 border-t border-t-[#DBDBDB] pb-[60px]">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    commentId={comment.id}
                    postId={post.id}
                    userProfileImage={comment.author.image}
                    userName={comment.author.username}
                    content={comment.content}
                    createdAt={comment.createdAt}
                  />
                ))}
              </ul>
            )}
            {/* 로딩 표시는 댓글 목록 아래에 별도로 표시 */}
            {commentLoading && (
              <div className="flex justify-center py-4">
                <p>댓글 로딩중...</p>
              </div>
            )}
          </main>
          <div className="fixed bottom-0 flex items-center justify-center w-full h-[60px] border-t border-t-[#DBDBDB] bg-white">
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={userImg ? imageAPI.getImage(userImg) : profileImg}
              alt="내 프로필 이미지"
            />
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
