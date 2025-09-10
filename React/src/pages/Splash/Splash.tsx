import React from 'react';
import { useState } from 'react';

import Login from '../Auth/Login';
import fullLogo from '../../assets/full-logo.png';

function Splash() {
  const [showSplash, setShowSplash] = useState('opacity-100');

  if (showSplash === 'opacity-100') {
    const timer = setTimeout(() => {
      setShowSplash('hidden');
      clearTimeout(timer);
    }, 2000);
  }

  // Login 되지 않은 상태의 경우 - <Login /> 으로 이동
  // Login 된 상태의 경우 - <Home /> 으로 이동
  if (showSplash === 'hidden') {
    return <Login />;
  }

  return (
    <div>
      <div
        className={`absolute z-30 flex justify-center content-center items-center w-screen h-screen bg-white ${showSplash}`}
      >
        <img src={fullLogo} className="width" alt="감귤마켓로고" />
      </div>
    </div>
  );
}

export default Splash;
