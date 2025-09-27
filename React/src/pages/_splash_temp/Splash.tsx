import React from 'react';
import logoImage from '../../assets/logo-image.png';
import logoText from '../../assets/logo-text.png';

function Splash() {
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
