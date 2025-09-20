import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IChildrenProps {
  content: string;
  click: () => void;
}

function ModalChildren({ content, click }: IChildrenProps) {
  return (
    <li className=" ml-[26px] h-[46px] " onClick={click}>
      <p className="text-[14px] text-left my-[14px] h-[18px]">{content}</p>
    </li>
  );
}
