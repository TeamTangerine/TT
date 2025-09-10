type EmailValidation = {
  userEmail: string;
};

/**
 * 이메일이 사용가능한지 유효성 검사하는 API
 * @param {string} userEmail - user의 이메일을 입력하세요.
 *
 * - // SUCCESS
 * - // 사용 가능한 이메일인 경우
 * - {
 * -     "message": "사용 가능한 이메일 입니다."
 * - }
 * -
 * - // 가입한 이메일이 있는 경우
 * - {
 * -     "message": "이미 가입된 이메일 주소 입니다."
 * - }
 * -
 * - // FAIL
 * - {
 * -     "message": "잘못된 접근입니다."
 * - }
 */
async function postEmailValid({ userEmail }: EmailValidation) {
  const url = 'https://dev.wenivops.co.kr/services/mandarin';

  try {
    const res = await fetch(url + '/user/emailvalid', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: userEmail,
        },
      }),
    });

    if (!res.ok) {
      throw new Error('통신 에러 발생');
    }

    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default postEmailValid;
