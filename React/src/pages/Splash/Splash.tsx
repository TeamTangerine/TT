import React from 'react';
import fullLogo from '../../assets/full-logo.png';

export default function Splash() {
  return (
    <div className="flex justify-center content-center items-center h-screen">
      <img src={fullLogo} className="width" alt="감귤마켓로고" />
    </div>
  );
}
