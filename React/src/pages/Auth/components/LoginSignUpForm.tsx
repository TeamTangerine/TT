import React from 'react';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import TextInput from '../../../components/TextInput';
import postLogin from '../../../service/user/postLogin';
import { userAPI } from '../../../service/fetch/api';
import { validateEmail, validatePassword, validateUserName } from '../../../Utils/validation';
import { useNavigate } from 'react-router-dom';
import MembershipProfile from '../MembershipProfile';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [pwErrorMessage, setPwErrorMessage] = useState('');
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [idError, setIdError] = useState(false);
  const [next, setNext] = useState(false);

  const navigate = useNavigate();
  const [token, setToken] = useState('');

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
    setEmailError(false);
    setPwError(false);

    try {
      const res = await userAPI.validateEmail(email);
      console.log(res);

      if (res.message === '이미 가입된 이메일 주소 입니다.') {
        setEmailError(true);
        setEmailErrorMessage(res.message);
      } else {
        setEmailError(false);
        setEmailErrorMessage('');
      }

      if (!validatePassword(password)) {
        setPwError(true);
        setPwErrorMessage('비밀번호는 6자 이상이어야 합니다.');
      } else {
        setPwError(false);
        setPwErrorMessage('');
      }

      setNext(true);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // 이메일 입력창 포커스 잃었을 때 이메일 유효성 검사
  const handeEmaillBlur = async () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage('잘못된 이메일 형식입니다.');
      return;
    }

    const res = await userAPI.validateEmail(email);
    console.log(res);

    if (res.message === '이미 가입된 이메일 주소 입니다.') {
      setEmailError(true);
      setEmailErrorMessage(res.message);
      return;
    }

    setEmailErrorMessage('');
    setEmailError(false);
  };

  // 비밀번호 입력창 포커스 잃었을 때 비밀번호 유효성 검사
  const handelPwBlur = () => {
    if (!validatePassword(password)) {
      setPwError(true);
      setPwErrorMessage('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setPwErrorMessage('');
    setPwError(false);
  };

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
      {!next && (
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
                  inputBlur={handeEmaillBlur}
                  onChange={(value) => {
                    if (typeof value === 'string') {
                      setEmail(value);
                    }
                  }}
                />
                <TextInput
                  inputId="password"
                  labelText="비밀번호"
                  inputType="password"
                  errorMessage={'*' + pwErrorMessage}
                  showErrorMessage={pwError}
                  inputBlur={handelPwBlur}
                  onChange={(value) => {
                    if (typeof value === 'string') {
                      setPassword(value);
                    }
                  }}
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
    </section>
  );
}
