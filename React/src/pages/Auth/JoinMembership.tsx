import React from 'react';
import LoginSignUpForm from './components/LoginSignUpForm';

export default function JoinMembership() {
  return (
    <div>
      <LoginSignUpForm formName="이메일로 회원가입" btnText="다음" isLogin={false} />
    </div>
  );
}
