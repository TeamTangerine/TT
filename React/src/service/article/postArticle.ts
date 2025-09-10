type TokenType = {
  token: string;
};

type ArticleType = {
  articleContent?: string;
  articleImage?: string;
};

/**
 *
 * @param {string} token - 사용자 인증 토큰
 * @param {string} articleContent - 게시물의 내용
 * @param {string} articleImage - 게시물 이미지("imageurl1, imageurl2" 형식)
 *
 * - 응답값 예시)
 * // SUCCESS
 * {
 *     "post": [
 *     {
 *             "id": String,
 *             "content": String,
 *             "image": String,
 *             "createdAt": String,
 *             "updatedAt": String,
 *             "hearted": false,
 *             "heartCount": 0,
 *             "commentCount": 0,
 *             "author": {
 *                 "_id": "작성자 id",
 *                 "username": "2",
 *                 "accountname": "2",
 *                 "intro": "",
 *                 "image": "https://api.mandarin.weniv.co.kr/Ellipse.png",
 *                 "isfollow": true,
 *                 "following": [],
 *                 "follower": [
 *                     "follower id"
 *                 ],
 *                 "followerCount": 1,
 *                 "followingCount": 0
 *             }
 *         }
 *     ]
 * }
 *
 * // FAIL
 * // 내용 또는 이미지를 입력하지 않을 때
 * 내용 또는 이미지를 입력해주세요.
 */

async function postArticle({ token, articleContent, articleImage }: TokenType & ArticleType) {
  const url = 'https://dev.wenivops.co.kr/services/mandarin';

  try {
    const res = await fetch(url + '/post', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },

      body: JSON.stringify({
        post: {
          content: articleContent,
          image: articleImage,
        },
      }),
    });

    if (!res.ok) {
      throw new Error('통신 에러 발생!');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default postArticle;
