//form validation 함수입니다

type Validation = {
  userName: string;
  password: string;
  email: string;
};

/**
 * 이메일 양식 검사
 * @param email - ***@***.*** 이메일 기본 형식
 * @returns {boolean}
 */
function validateEmail({ email }: Validation) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isOk = emailRegex.test(email);
  return isOk;
}

/**
 * 유저이름
 * @param userName - 10자 이내의 영문 대소문자 및 숫자
 * @returns {boolean}
 */

function validateUserName({ userName }: Validation) {
  const idRegex = /^[a-zA-Z0-9]{2,10}$/;
  let isOk = idRegex.test(userName);
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
