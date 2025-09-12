import React from 'react';
import { useNavigate } from 'react-router-dom';
import SNSLogin from './components/SNSLogin';

import SymbolLogoW from '../../assets/symbol-logo-W.png';
import kakaoLogo from '../../assets/kakao-logo.png';
import googleLogo from '../../assets/google.png';
import facebookLogo from '../../assets/facebook.png';

function Login() {
  const navigate = useNavigate();

  const borderColors = {
    kakao: 'border-[#F2C94C]',
    google: 'border-[#767676]',
    facebook: 'border-[#2D9CDB]',
  };

  return (
    <div className="h-screen bg-[#EA7F42]">
      <div className="flex justify-center items-center h-[calc(100%-312px)] ">
        <img src={SymbolLogoW} alt="감귤마켓로고" />
      </div>
      <div className="fixed bottom-[-3rem] w-screen h-[362px] rounded-[20px] bg-[#fff] flex flex-col items-center pt-[50px] gap-[10px]">
        <SNSLogin logoImg={kakaoLogo} name="카카오톡" borderColor={borderColors.kakao} altText="카카오톡 로고" />
        <SNSLogin logoImg={googleLogo} name="구글" borderColor={borderColors.google} altText="구글 로고" />
        <SNSLogin logoImg={facebookLogo} name="페이스북" borderColor={borderColors.facebook} altText="페이스북 로고" />
        <div>
          <p className="flex gap-[12px] text-[12px] text-[#767676]">
            <button
              onClick={() => {
                navigate('/login-with-email');
              }}
            >
              이메일로 로그인
            </button>
            <span>|</span>
            <button
              onClick={() => {
                navigate('/join-membership');
              }}
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
