type TextInputProps = {
  id: string;
  content: string;
  placeholder?: string;
  ex?: string;
};

function TextInput({ id, content, placeholder, ex }: TextInputProps) {
  return (
    <div className="flex flex-col px-[34px]">
      <label htmlFor={id} className="text-[12px] text-[#767676] ">
        {content}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="border-[#DBDBDB] border-b-[1px] focus:outline-none  focus:border-[#F26E22] text-[#000000] text-[14px]"
      />
      <span className="text-[12px] text-[#EB5757] mt-[6px] ">{ex}</span>
    </div>
  );
}

export default TextInput;
