type LoginType = {
  userEmail: string;
  userPassword: string;
};

/**
 *
 * @param {string} userEmail : user의 이메일을 적어주세요.
 * @param {string} userPassword : user의 패스워드를 넣어주세요.
 *
 * - 응답값 예시)
 * // SUCCESS
 * - {
 * -     "user": {
 * -         "_id": String,
 * -         "username": String,
 * -         "email": String,
 * -         "accountname": String,
 * -         "image": String,
 * -         "token": String
 * -     }
 * - }
 *-
 * - // FAIL
 * - // email, password를 입력하지 않을 때
 * - 이메일 또는 비밀번호를 입력해주세요.
 * - // email를 입력하지 않을 때
 * - 이메일을 입력해주세요.
 * - // password를 입력하지 않을 때
 * - 비밀번호를 입력해주세요.
 * - // email, password를 일치하지 않을 때
 * - {
 * -     "message": "이메일 또는 비밀번호가 일치하지 않습니다.",
 * -     "status": 422
 * - }
 */
export default async function login({ userEmail, userPassword }: LoginType) {
  const url = 'https://dev.wenivops.co.kr/services/mandarin';

  try {
    const res = await fetch(url + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: userEmail,
          password: userPassword,
        },
      }),
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
