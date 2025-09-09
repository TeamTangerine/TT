/**
 *
 * @param {string} token - 토큰을 입력해주세요.
 * 응답예시
 * // SUCCESS
 * -
 * -	{
 * -	    "user": {
 * -	        "_id": String,
 * -	        "username": String,
 * -	        "accountname": String,
 * -	        "image": String,
 * -	        "isfollow": false,
 * -	        "following": [],
 * -	        "follower": [],
 * -	        "followerCount": 0,
 * -	        "followingCount": 0
 * -	    }
 * -	}
 */
export default async function getProfile(token: string) {
  const url = 'https://dev.wenivops.co.kr/services/mandarin';

  try {
    const res = await fetch(url + '/user/myinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('통신 에러 발생');
    }

    const resJson = await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
