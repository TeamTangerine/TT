import React from 'react';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import TextInput from '../../../components/TextInput';
import postLogin from '../../../service/user/postLogin';

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

export default function LoginSignUpForm({ formName, btnText, isLogin }: LoginSignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  // 로그인 유효성 패치 함수
  async function loginValidation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');
    setError(false);

    try {
      const result = await postLogin({
        userEmail: email,
        userPassword: password,
      });

      console.log('로그인 성공', result);

      // 성공처리
      if (result.user && result.user.token) {
        localStorage.setItem('token', result.user.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        alert(`${result.user.username}님, 환영합니다!`);

        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      console.error('로그인 실패:', error);
      setError(true);

      if (error.status === 422) {
        setErrorMessage(error.message || '이메일 또는 비밀번호가 일치하지 않습니다.');
      } else if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  }

  //

  // isLoginEventHandler: 로그인 패치함수 또는 회원가입 패치함수를 조정하는 함수
  async function isLoginEventHandler(e: React.FormEvent<HTMLFormElement>) {
    // 로그인 유효성 검사 함수
    // isLogin && 로그인 패치함수(loginValidation)
    if (isLogin) {
      loginValidation(e);
    }

    // 회원가입 패치함수 적용하는 부분
    // !isLogin && 회원가입 패치함수(signupValidation)
    if (!isLogin) {
    }
  }

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-[24px] font-medium mt-[30px]">{formName}</h1>
      <div className="w-screen mt-[40px]">
        {/* onSubmit 내 isLogin -> true일 경우 loginValidation 함수, false일 경우 signupValidation 함수 작동 */}
        <form className="flex flex-col gap-[30px]" onSubmit={isLoginEventHandler}>
          <div className="flex flex-col items-center gap-[16px]">
            <TextInput
              inputId="email"
              labelText="이메일"
              inputType="email"
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
              errorMessage={'*' + errorMessage}
              onChange={(value) => {
                if (typeof value === 'string') {
                  setPassword(value);
                }
              }}
              showErrorMessage={error}
            />
          </div>

          <div className={`flex justify-center ${error ? 'mt-[30px]' : ''}`}>
            <Button
              btnTextContent={btnText}
              btnSize="large"
              btnColor={email && password && !loading ? 'normal' : 'disable'}
              btnType="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
