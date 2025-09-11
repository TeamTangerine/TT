import React from 'react';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import TextInput from '../../../components/TextInput';
import postLogin from '../../../service/user/postLogin';

type LoginSignUpFormProps = {
  formName: string;
  btnText: string;
};

export default function LoginSignUpForm({ formName, btnText }: LoginSignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-[24px] font-medium mt-[30px]">{formName}</h1>
      <div className="w-screen mt-[40px]">
        <form className="flex flex-col gap-[30px]">
          <div className="flex flex-col items-center gap-[16px]">
            <TextInput
              inputId="email"
              labelText="이메일"
              inputType="email"
              onChange={(value) => {
                if (typeof value === 'string') {
                  setEmail(value);
                }
              }}
            />
            <TextInput
              inputId="password"
              labelText="비밀번호"
              inputType="password"
              onChange={(value) => {
                if (typeof value === 'string') {
                  setPassword(value);
                }
              }}
            />
          </div>

          <div className="flex justify-center">
            <Button
              btnTextContent="로그인"
              btnSize="large"
              btnColor={email && password ? 'normal' : 'disable'}
              btnType="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
