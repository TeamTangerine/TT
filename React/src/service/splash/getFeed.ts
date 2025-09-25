// splash 효과를 위한 토큰 관리 및 API
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../fetch/api';
import { ARTICLE_URL } from '../fetch/https';

const navigate = useNavigate();

// 토큰 관리
const TOKEN_KEY = 'accessToken';
const getToken = (): string | null => localStorage.getItem('TOKEN_KEY');

// 토큰 유효성 관리
async function checkRedirect(): Promise<string> {
  const token = getToken();
  if (!token) {
    navigate('/login');
    throw new Error('토큰 없음');
  }
  const result = await userAPI.checkToken();
  if (!result.isValid) {
    navigate('/login');
    throw new Error('토큰 만료');
  }
  return token;
}

// 팔로잉 게시글 목록(피드) 불러오는 api 함수
export async function getFeed(limit?: number, skip?: number) {
  const url = ARTICLE_URL.followFeedArticle;
  const token = localStorage.getItem('TOKEN_KEY');

  try {
    const feedData = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    if (!feedData) {
      throw new Error('피드를 조회하지 못했습니다.');
    }
    const feedDataJson = await feedData.json();
    return feedDataJson;
  } catch (error) {
    console.error('피드를 조회하지 못했습니다.', error);
  }
}
