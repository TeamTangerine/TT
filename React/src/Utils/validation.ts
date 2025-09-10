//form validation 함수입니다

type Validation = {
  id: string;
  password: string;
};

/**
 * 아이디 검증 함수
 * @param id - 10자 이내의 영문 대소문자 및 숫자
 * @returns {boolean}
 */

function validateId({ id }: Validation) {
  const idRegex = /^[a-zA-Z0-9]{2,10}$/;
  let isOk = idRegex.test(id);
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
export { validateId, validatePassword };
