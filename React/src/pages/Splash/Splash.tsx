import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../service/fetch/api';
import logoImage from '../../assets/logo-image.png';
import logoText from '../../assets/logo-text.png';

function Splash() {
  const navigate = useNavigate();

  // 토큰 유효성 검사 함수
  async function checkToken() {
    try {
      const result = await userAPI.checkToken();
      console.log(result.isValid);
      if (!result.isValid) {
        navigate('/login');
      } else {
        navigate('/my-profile');
      }
    } catch (error) {
      console.log('토큰 검사 중 에러 발생', error);
      navigate('/login');
    }
  }

  // Login 되지 않은 상태의 경우 - <Login /> 으로 이동
  // Login 된 상태의 경우 - <Home /> 으로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      checkToken();
    }, 1850);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <div
        className={`absolute z-30 flex flex-col justify-center content-center items-center gap-[17.57px] w-screen h-screen bg-white`}
      >
        <img src={logoImage} className="animate-bounce" alt="감귤마켓로고" />
        <img src={logoText} alt="감귤마켓" />
      </div>
    </div>
  );
}

export default Splash;
