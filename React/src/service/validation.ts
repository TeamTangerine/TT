//form validation 함수입니다

type validation = {
  id: string;
  password: string;
};

/**
 * 아이디 검증 함수
 * @param id - 20자 이내의 영문 대소문자 및 숫자
 * @returns {boolean}
 */

function validateId({ id }: validation) {
  const idRegex = /^[a-zA-Z0-9]{1,20}$/;
  let isOk = idRegex.test(id);
  return isOk;
}

/**
 * 비밀번호 검증 함수
 * @param {string} password - 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자를 모두 포함
 * @returns {boolean}
 */

function validatePassword({ password }: validation) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let isOk = passwordRegex.test(password);
  return isOk;
}
export { validateId, validatePassword };
