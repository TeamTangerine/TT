type emailValidation = {
  userEmail: string;
};

/**
 *
 * @param {string} userEmail : user의 이메일을 입력하세요.
 */
export default async function postEmailValid(userEmail: emailValidation) {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
}
