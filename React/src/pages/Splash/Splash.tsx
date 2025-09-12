import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Login from '../Auth/Login';
import fullLogo from '../../assets/full-logo.png';
import logoImage from '../../assets/logo-image.png';
import logoText from '../../assets/logo-text.png';

function Splash() {
  const [showSplash, setShowSplash] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash('hidden');
    }, 1850);

    return () => {
      clearTimeout(timer);
    };
  }, [showSplash]);

  // Login 되지 않은 상태의 경우 - <Login /> 으로 이동
  // Login 된 상태의 경우 - <Home /> 으로 이동
  if (showSplash === 'hidden') {
    // navigate('/login');
    return navigate('/home');
  }

  return (
    <div>
      <div
        className={`absolute z-30 flex flex-col justify-center content-center items-center gap-[17.57px] w-screen h-screen bg-white ${showSplash}`}
      >
        <img src={logoImage} className="animate-bounce" alt="감귤마켓로고" />
        <img src={logoText} alt="감귤마켓" />
      </div>
    </div>
  );
}

export default Splash;
