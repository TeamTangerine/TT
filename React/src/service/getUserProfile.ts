/**
 * @param {string} token 유저의 토큰값을 넣습니다.
 * @returns {Promise<object>} 유저 프로필 정보를 반환합니다.
 * @example
 * // 반환 예시
 * {
 *   "user": {
 *     "_id": string,
 *     "username": string,
 *     "accountname": string,
 *     "image": string,
 *     "isfollow": boolean,
 *     "following": string[],
 *     "follower": string[],
 *     "followerCount": number,
 *     "followingCount": number
 *   }
 * }
 */
async function getUserProfile(token: string) {
  const url = 'https://dev.wenivops.co.kr/services/mandarin';

  try {
    const response = await fetch(url + '/user/myinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('통신 에러 발생!');
    }
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    console.log(error);
    throw error;
    // 이 부분에 에러를 throw해줘야 이 함수를 import한 상위 코드에서 에러를 감지할 수 있어요!
  }
}
export default getUserProfile;
