type SignupType = {
  userName: string;
  userEmail: string;
  userPassword: string;
  userAccount: string;
  userIntro?: string;
  userImage?: string;
};

/**
 * 회원가입 시 유효성 검사를 하는 API
 * @param {string} userName - (필수)user의 이름을 적어주세요.
 * @param {string} userEmail - (필수)user의 email을 넣어주세요.
 * @param {string} userPassword - (필수)user의 패스워드를 넣어주세요.
 * @param {string} userAccount - (필수)user의 accountname을 넣어주세요.
 * @param {string} userIntro - user의 intro를 넣어주세요.
 * @param {string} userImage - user의 사진을 넣어주세요. 이미지를 넣지 않을 경우, 기본 이미지가 적용됩니다.
 *
 * 응답예시
 * // SUCCESS
 * - {
 * -     "message": "회원가입 성공",
 * -     "user": {
 * - 		    "_id": String,
 * - 		    "username": String,
 * - 		    "email": String,
 * - 		    "accountname": String,
 * - 				"intro": String,
 * - 		    "image": String,
 * -     }
 * - }
 * -
 * - // FAIL
 * - // email, password, accountname, username 중 하나라도 작성하지 않을 경우
 * - 필수 입력사항을 입력해주세요.
 * - // password를 6자 이상 입력하지 않을 경우
 * - 비밀번호는 6자 이상이어야 합니다.
 * - // eamil 형식이 잘못될 경우
 * - 잘못된 이메일 형식입니다.
 * - // 가입된 email일 경우
 * - 이미 가입된 이메일 주소입니다.
 * - // accountname에 지정된 문자 이외의 문자가 들어갈 경우
 * - 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.
 * - // 가입된 accountname일 경우
 * - 이미 사용중인 계정 ID입니다.
 */

async function postMembership({
  userName,
  userEmail,
  userPassword,
  userAccount,
  userIntro,
  userImage = 'https://dev.wenivops.co.kr/services/mandarin/Ellipse.png',
}: SignupType) {
  const url = 'https://dev.wenivops.co.kr/services/mandarin';

  try {
    const res = await fetch(url + '/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: userName,
          email: userEmail,
          password: userPassword,
          accountname: userAccount,
          intro: userIntro,
          image: userImage,
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

export default postMembership;
