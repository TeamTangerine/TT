//form validation 함수입니다

type Validation = {
  userName: string;
  password: string;
  email: string;
};

/**
 * 이메일 검증 함수
 * @param email - ***@***.*** 이메일 기본 형식
 * @returns {boolean}
 */
function validateEmail({ email }: Validation) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isOk = emailRegex.test(email);
  return isOk;
}

/**
 * 사용자 이름 검증 함수
 * @param userName - 2자 ~ 10자 이내의 영문 대소문자, 한글 및 숫자 (단어사이 공백 허용, 연속된 공백이나 단어 시작 끝은 공백 불허)
 * @returns {boolean}
 */

function validateUserName({ userName }: Validation) {
  const idRegex = /^[a-zA-Z0-9가-힣]+( [a-zA-Z0-9가-힣]+)*$/;
  let isOk = idRegex.test(userName) && userName.length >= 2 && userName.length <= 10;
  return isOk;
}

/**
 * 비밀번호 검증 함수
 * @param {string} password - 6자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자를 모두 포함
 * @returns {boolean}
 */

function validatePassword({ password }: Validation) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  let isOk = passwordRegex.test(password);
  return isOk;
}
export { validateEmail, validateUserName, validatePassword };
