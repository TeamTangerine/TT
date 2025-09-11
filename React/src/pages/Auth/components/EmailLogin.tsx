import React from 'react';

type EmailLoginProps = {
  name: string;
  logoImg: string;
  borderColor: string;
  altText: string;
};

function EmailLogin({ name, logoImg, borderColor, altText }: EmailLoginProps) {
  return (
    <>
      <button
        className={`relative w-[322px] h-[44px] rounded-[44px] border-[1px] ${borderColor} text-[14px] text-[#767676] text-center flex items-center justify-center cursor-pointer`}
      >
        <img src={logoImg} alt={altText} className="absolute left-[14px] w-[24px] h-[24px]" />
        <span>{name} 계정으로 로그인</span>
      </button>
    </>
  );
}

export default EmailLogin;
