import React from 'react';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import TextInput from '../../../components/TextInput';
import postLogin from '../../../service/user/postLogin';
import { userAPI } from '../../../service/fetch/api';
import { validateEmail, validateId, validatePassword, validateUserName } from '../../../Utils/validation';
import { useNavigate } from 'react-router-dom';
import basicProfileImg from '../../../assets/basic-profile-img.png';
import ImgBtn from '../../../assets/upload-file.png';

/**
 * @param formName - form에 들어갈 텍스트를 기입해주세요.
 * @param btnText - form에서 제출할 버튼에 들어갈 텍스트를 기입해주세요.
 * @param isLogin - login기능의 경우 true / 회원가입 기능의 경우 false를 넣어주세요.
 */
type LoginSignUpFormProps = {
  formName: string;
  btnText: string;
  isLogin: boolean;
};

// API 응답 타입 정의
type LoginSuccessResponse = {
  user: {
    _id: string;
    username: string;
    email: string;
    accountname: string;
    image: string;
    token: string;
  };
};

type LoginErrorResponse = {
  message: string;
  status: number;
};

// 로그인 요청 데이터 타입
type LoginData = {
  email: string;
  password: string;
};

// todo:
// 1. 검사랑 제출 로직 분리하기
// 2. MembershipProfile 페이지를 컴포넌트로 사용하기 => 페이지 내용 모두 가져옴, 페이지 삭제 해야함
// 3. login페이지, membership페이지, profile페이지를 조건부 렌더링하기
// useState, useEffect, async await 각 실행순서 알아보기
// 버튼 디자인: 계정id 존재 시, 사용자 이름 2-10자 이내 시 버튼 활성화

export default function LoginSignUpForm({ formName, btnText, isLogin }: LoginSignUpFormProps) {
  // input값 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userImg, setUserImg] = useState(basicProfileImg);
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [intro, setIntro] = useState('');

  // api 함수 동작중인지 판별
  const [loading, setLoading] = useState(false);

  // 에러 메세지
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [pwErrorMessage, setPwErrorMessage] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');

  // 에러인지 판별
  const [emailError, setEmailError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [idError, setIdError] = useState(false);

  // 이메일과 비밀번호 입력 완료 후 다음 버튼 클릭이 됐는지 확인
  const [isNext, setIsNext] = useState(false);

  // 라우팅
  const navigate = useNavigate();

  // 로그인 유효성 패치 함수
  // async function loginValidation(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   setLoading(true);
  //   setErrorMessage('');
  //   setError(false);

  //   try {
  //     const result = await postLogin({
  //       userEmail: email,
  //       userPassword: password,
  //     });

  //     console.log('로그인 성공', result);

  //     // 성공처리
  //     if (result.user && result.user.token) {
  //       localStorage.setItem('token', result.user.token);
  //       localStorage.setItem('user', JSON.stringify(result.user));
  //       alert(`${result.user.username}님, 환영합니다!`);

  //       setEmail('');
  //       setPassword('');
  //     }
  //   } catch (error: any) {
  //     console.error('로그인 실패:', error);
  //     setError(true);

  //     if (error.status === 422) {
  //       setErrorMessage(error.message || '이메일 또는 비밀번호가 일치하지 않습니다.');
  //     } else if (error.message) {
  //       setErrorMessage(error.message);
  //     } else {
  //       setErrorMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // 회원가입 유효성 패치 함수
  async function signupValidation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setEmailErrorMessage('');
    setPwErrorMessage('');
    setIdErrorMessage('');

    setEmailError(false);
    setPwError(false);
    setIdError(false);

    try {
      const res = await userAPI.validateEmail(email);

      if (res.message === '이미 가입된 이메일 주소 입니다.') {
        setEmailError(true);
        setEmailErrorMessage(res.message);
        return;
      }

      if (!validatePassword(password)) {
        setPwError(true);
        setPwErrorMessage('비밀번호는 6자 이상이어야 합니다.');
        return;
      }

      setIsNext(true);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // 이메일 입력창 포커스 잃었을 때 이메일 유효성 검사
  const handleEmailBlur = async () => {
    if (isLogin) {
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage('잘못된 이메일 형식입니다.');
      return;
    }

    const res = await userAPI.validateEmail(email);

    if (res.message === '이미 가입된 이메일 주소 입니다.') {
      setEmailError(true);
      setEmailErrorMessage(res.message);
      return;
    }

    setEmailErrorMessage('');
    setEmailError(false);
  };

  // 비밀번호 입력창 포커스 잃었을 때 비밀번호 유효성 검사
  const handlePwBlur = () => {
    if (!validatePassword(password)) {
      setPwError(true);
      setPwErrorMessage('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setPwErrorMessage('');
    setPwError(false);
  };

  // 프로필 이미지 변경 함수
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') setUserImg(result);
    };
    reader.onerror = () => {
      console.error('파일 읽기 실패');
    };

    reader.readAsDataURL(file);
  };

  // 계정 ID 입력창 포커스 잃었을 때 계정 ID 유효성 검사
  const handleIdBlur = async () => {
    if (!validateId(id)) {
      setIdError(true);
      setIdErrorMessage('영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.');
      return;
    }

    const res = await userAPI.validateAccountName(id);

    if (res.message === '이미 사용중인 계정 ID입니다.') {
      setIdError(true);
      setIdErrorMessage(res.message);
      return;
    }

    setIdErrorMessage('');
    setIdError(false);
  };

  // 이메일 onChange 관리
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 비밀번호 onChange 관리
  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 사용자 이름 onChange 관리
  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  // 계정 ID onChange 관리
  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  // 소개 onChange 관리
  const handleIntro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntro(e.target.value);
  };

  // 최종 회원 가입 함수
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    try {
      await userAPI.signUp(userName, email, password, id, intro, userImg);
      alert('회원 가입 성공!');
      navigate('/login-with-email');
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // isLoginEventHandler: 로그인 패치함수 또는 회원가입 패치함수를 조정하는 함수
  async function isLoginEventHandler(e: React.FormEvent<HTMLFormElement>) {
    // 로그인 유효성 검사 함수
    // isLogin && 로그인 패치함수(loginValidation)
    if (isLogin) {
      // loginValidation(e);
    }

    // 회원가입 패치함수 적용하는 부분
    // !isLogin && 회원가입 패치함수(signupValidation)
    if (!isLogin) {
      signupValidation(e);
    }
  }

  return (
    <section className="flex flex-col items-center">
      {!isNext && (
        <>
          <h1 className="text-[24px] font-medium mt-[30px]">{formName}</h1>
          <div className="w-screen mt-[40px]">
            {/* onSubmit 내 isLogin -> true일 경우 loginValidation 함수, false일 경우 signupValidation 함수 작동 */}
            <form className="flex flex-col gap-[30px]" onSubmit={isLoginEventHandler}>
              <div className="flex flex-col items-center gap-[16px]">
                <TextInput
                  inputId="email"
                  labelText="이메일"
                  inputType="email"
                  errorMessage={'*' + emailErrorMessage}
                  showErrorMessage={emailError}
                  inputBlur={handleEmailBlur}
                  onChange={handleEmail}
                />
                <TextInput
                  inputId="password"
                  labelText="비밀번호"
                  inputType="password"
                  errorMessage={'*' + pwErrorMessage}
                  showErrorMessage={pwError}
                  inputBlur={handlePwBlur}
                  onChange={handlePw}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  btnTextContent={btnText}
                  btnSize="large"
                  btnColor={email && password.length >= 6 && !loading ? 'normal' : 'disable'}
                  btnType="submit"
                />
              </div>
            </form>
          </div>
        </>
      )}
      {isNext && (
        <>
          <header className="flex flex-col items-center gap-3 mt-[30px]">
            <h1 className="text-[24px] font-medium h-[30px]">프로필 설정</h1>
            <p className="text-[14px] text-[#767676] h-[14px]">나중에 언제든지 변경할 수 있습니다.</p>
          </header>
          <main>
            <div className="my-[30px] flex flex-col items-center relative">
              <img className="w-[110px] h-[110px] rounded-full " src={userImg} alt="내 프로필 이미지" />
              <label
                className=" w-9 h-9 rounded-full absolute bottom-0 translate-x-[37px]  cursor-pointer"
                htmlFor="userImgSelectBtn"
              >
                <img src={ImgBtn} alt="프로필 이미지 파일 선택" />
                <input className="hidden" id="userImgSelectBtn" type="file" onChange={handleFileUpload} />
              </label>
            </div>
            <form className="flex flex-col items-center gap-[16px] px-[34px]" onSubmit={handleSignUp}>
              <TextInput
                inputId="userName"
                labelText="사용자 이름"
                placeholderText="2~10자 이내여야 합니다."
                inputMaxLength={10}
                onChange={handleUserName}
              />
              <TextInput
                inputId="accountId"
                labelText="계정 ID"
                inputBlur={handleIdBlur}
                placeholderText="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                errorMessage={'*' + idErrorMessage}
                showErrorMessage={idError}
                onChange={handleId}
              />
              <TextInput
                inputId="userName"
                labelText="소개"
                placeholderText="자신과 판매할 상품에 대해 소개해 주세요!"
                onChange={handleIntro}
              />
              <div className="mt-[14px]">
                <Button
                  btnTextContent="감귤마켓 시작하기"
                  btnSize="large"
                  btnColor={userName.length >= 2 && id && !loading ? 'normal' : 'disable'}
                  btnType="submit"
                />
              </div>
            </form>
          </main>
        </>
      )}
    </section>
  );
}
