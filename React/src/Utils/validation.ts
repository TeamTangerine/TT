//form UserValidation 함수입니다

/**
 * 이메일 검증 함수
 * @param email - ***@***.*** 이메일 기본 형식
 * @returns {boolean}
 */
function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isOk = emailRegex.test(email);
  return isOk;
}

/**
 * 사용자 이름 검증 함수
 * @param userName - 2자 ~ 10자 이내의 영문 대소문자, 한글 및 숫자 (단어사이 공백 허용, 연속된 공백이나 단어 시작 끝은 공백 불허)
 * @returns {boolean}
 */

function validateUserName(userName: string) {
  const idRegex = /^[a-zA-Z0-9가-힣]+( [a-zA-Z0-9가-힣]+)*$/;
  let isOk = idRegex.test(userName) && userName.length >= 2 && userName.length <= 10;
  return isOk;
}
/**
 * 계정 ID 검증 함수
 * @param id - 1자 이상의 영어 대소문자, 숫자, 점(.), 밑줄(_)
 * @returns {boolean}
 */
function validateId(id: string) {
  const isRegex = /^[a-zA-Z0-9._]{1,}$/;
  let isOk = isRegex.test(id);
  return isOk;
}
/**
 * 비밀번호 검증 함수
 * @param {string} password - 6자 이상이어야합니다.
 * @returns {boolean}
 */

function validatePassword(password: string) {
  const passwordRegex = /^.{6,}$/;
  let isOk = passwordRegex.test(password);
  return isOk;
}

//=============상세 게시글 url용 validate 함수 ==============

/**
 * 상세 게시글(post)페이지 url 함수
 * @param url - 현재 페이지 url 작성 (window.location.href)
 * @returns {boolean}
 **/

function validateUrl(url: string) {
  const urlRegex = /^.+\/post\/:.+$/;
  let isOk = urlRegex.test(url);
  return isOk;
}

//=============상품 등록용 validate 함수 ==============
/**
 * 상품명 검증 함수
 * @param productName - 2자 ~ 15자 이내의 영문 대소문자, 한글 및 숫자 (단어사이 공백 허용, 연속된 공백이나 단어 시작 끝은 공백 불허)
 * @returns {boolean}
 */
function validateProductName(productName: string) {
  const productNameRegex = /^[a-zA-Z0-9가-힣]+( [a-zA-Z0-9가-힣]+)*$/;
  let isOk = productNameRegex.test(productName) && productName.length >= 2 && productName.length <= 15;
  return isOk;
}
/**
 * 가격이 숫자인지 검증 함수
 * @param productPrice - 숫자 형태의 '문자열'만 가능(혹시 몰라서 특수기호(,) 추가)
 * @returns {boolean}
 */
function validateProductPrice(productPrice: string) {
  const productPriceRegex = /^[0-9]$/;
  let isOk = productPriceRegex.test(productPrice);
  return isOk;
}
/**
 * 제품 URL을 검증 함수
 * @param param0 -URL형태 https://***.***.***
 *  @returns {boolean}
 */
function validateProductURL(productURL: string) {
  const productPriceRegex = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
  let isOk = productPriceRegex.test(productURL);
  return isOk;
}

export {
  validateEmail,
  validateUserName,
  validatePassword,
  validateUrl,
  validateId,
  validateProductName,
  validateProductPrice,
  validateProductURL,
};
