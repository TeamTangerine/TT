type IdValidation = {
  accountName: string;
};
/**
 * 계정이 사용가능한지 유효성 검사하는 API
 * @param {string} accountName - 검사할 계정을 기입해주세요.
 * - // SUCCESS
 * - // 사용 가능한 계정ID인 경우
 * - {
 * -     "message": "사용 가능한 계정ID 입니다."
 * - }
 * - // 가입한 계정ID가 있는 경우
 * - {
 * -     "message": "이미 가입된 계정ID 입니다."
 * - }
 * -
 * - // FAIL
 * - {
 * -     "message": "잘못된 접근입니다."
 * - }
 */
async function postIdValid(accountName: IdValidation) {
  const url = 'https://dev.wenivops.co.kr/services/mandarin';

  try {
    const res = await fetch(url + '/user/accountnamevalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          accountname: accountName,
        },
      }),
    });

    if (!res.ok) {
      throw new Error('통신 에러 발생!');
    }

    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default postIdValid;
