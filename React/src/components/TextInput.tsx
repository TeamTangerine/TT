// TextInput 사용 또는 기능 구현 시 참고 사항
// - 필수 props: id, content
// - 선택적 props: type(기본: text), placeholder, ex, isEx(기본: false)
// - props로 받을 필요 없음(기능 구현 시에만 필요): value, onChange
// - ex 존재 시 'isEX = true' 무조건 넘겨주기
type InputType = 'text' | 'number' | 'password' | 'email' | 'url';

type TextInputProps = {
  id: string;
  content: string;
  type?: InputType;
  placeholder?: string;
  ex?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  isEx?: boolean;
};

/**
 *
 * @param {string} id - input의 id 속성 값
 * @param {string} content - label의 textContent
 * @param {string} type - input의 type 속성 값
 * @param {string} placeholder - input의 placeholder
 * @param {string} ex - input값 예외처리 후 안내 문구
 * @param {string | number} value - input value 속성 값
 * @param {(value: string | number) => void} onChange - 값이 바뀔 때 호출되는 콜백
 * @param {boolean} isEx - 안내 문구(ex)를 보여줄지 여부
 */
function TextInput({ id, content, type = 'text', placeholder, ex, value, onChange, isEx = false }: TextInputProps) {
  return (
    <div className="flex flex-col px-[34px]">
      <label htmlFor={id} className="text-[12px] text-[#767676] ">
        {content}
      </label>
      <input
        id={id}
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange?.(type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        className="border-[#DBDBDB] border-b-[1px] focus:outline-none  focus:border-[#F26E22] text-[#000000] text-[14px]"
      />

      {isEx && ex && <span className="text-[12px] text-[#EB5757] mt-[6px]">{ex}</span>}
    </div>
  );
}

export default TextInput;
