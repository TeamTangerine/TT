type TextInputProps = {
  id: string;
  content: string;
  placeholder: string;
};

function TextInput({ id, content, placeholder }: TextInputProps) {
  return (
    <>
      <label htmlFor={id}>{content}</label>
      <input id={id} type="text" placeholder={placeholder} />
    </>
  );
}

export default TextInput;
