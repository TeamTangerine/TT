import React from 'react';

type LoginSignUpFormProps = {
  formName: string;
  btnText: string;
};

export default function LoginSignUpForm({ formName, btnText }: LoginSignUpFormProps) {
  let isTrue = false;

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-[24px] font-medium mt-[30px]">{formName}</h1>
      <div className="w-screen mt-[40px]">
        <form className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[34px]">
              <label htmlFor="email" className="text-[12px] text-[#767676]">
                이메일
              </label>
              <input
                id="email"
                type="email"
                className="border-[#DBDBDB] border-b-2 focus:outline-none focus:border-b-1 focus:border-[#F26E22] text-[#000000]"
              />
            </div>
            <div className="flex flex-col px-[34px]">
              <label htmlFor="password" className="text-[12px] text-[#767676]">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                className="border-[#DBDBDB] border-b-2 focus:outline-none focus:border-b-1 focus:border-[#F26E22] text-[#000000]"
              />
              <span className="text-[12px] text-[#EB5757] mt-[6px]">*이메일 또는 비밀번호가 일치하지 않습니다.</span>
            </div>
          </div>
          {/* 
          {isTrue ? 'bg-[#F26E22]' : 'bg-[#FFC7A7]'}
          버튼 클래스 안 해당 조건문 넣은 이유:
          버튼이 활성화 되었을때 디자인을 변경하기 위해 미리 디자인.
          */}
          <button
            type="button"
            className={`block bg-[#FFC7A7] rounded-[44px] mx-[34px] h-[44px] py-[14px] text-[14px] font-medium text-white ${isTrue ? 'bg-[#F26E22]' : 'bg-[#FFC7A7]'}`}
          >
            {btnText}
          </button>
        </form>
      </div>
    </section>
  );
}
