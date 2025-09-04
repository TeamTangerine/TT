import React from 'react';

type LoginSignUpFormProps = {
  formName: string;
  btnText: string;
};

export default function LoginSignUpForm({ formName, btnText }: LoginSignUpFormProps) {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-[24px] font-medium mt-[30px]">{formName}</h1>
        <div className="w-screen mt-[40px]">
          <form action="" className="flex flex-col gap-[30px]">
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
                  type="password"
                  className="border-[#DBDBDB] border-b-2 focus:outline-none focus:border-b-1 focus:border-[#F26E22] text-[#000000]"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="block bg-[#FFC7A7] rounded-[44px] mx-[34px] h-[44px] py-[14px] text-[14px] font-medium"
            >
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
