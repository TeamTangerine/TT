interface IChildrenProps {
  content: string;
  click?: () => void;
}

function ToastChildren({ content, click }: IChildrenProps) {
  return (
    <li className=" px-[26px] h-[46px] cursor-pointer hover:bg-gray-100" onClick={click}>
      <p className="text-[14px] text-left my-[14px] h-[18px]">{content}</p>
    </li>
  );
}
export default ToastChildren;
