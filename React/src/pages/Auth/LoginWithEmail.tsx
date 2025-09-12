import React from 'react';
import LoginSignUpForm from './components/LoginSignUpForm';

export default function LoginWithEmail() {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <LoginSignUpForm formName="로그인" btnText="로그인" isLogin={true} />
      <button className="text-[12px] text-[#767676]">이메일로 회원가입</button>
    </div>
  );
}
