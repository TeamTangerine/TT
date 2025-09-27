import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginSignUpForm from './components/LoginSignUpForm';

export default function LoginWithEmail() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <LoginSignUpForm formName="로그인" btnText="로그인" isLogin={true} />
      <button
        className="text-[12px] text-[#767676]"
        onClick={() => {
          navigate('/join-membership');
        }}
      >
        이메일로 회원가입
      </button>
    </div>
  );
}
