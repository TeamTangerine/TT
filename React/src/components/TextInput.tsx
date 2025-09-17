// TextInput 사용 또는 기능 구현 시 참고 사항
// - 필수 props: inputId, labelText
// - 선택적 props: inputType(기본: text), placeholderText, errorMessage, showErrorMessage(기본: false)
// - props로 받을 필요 없음(기능 구현 시에만 필요): inputValue, onChange
// - errorMessage 존재 시 'showErrorMessage = true' 무조건 넘겨주기
type InputType = 'text' | 'number' | 'password' | 'email' | 'url';

type TextInputProps = {
  inputId: string;
  labelText: string;
  inputType?: InputType;
  placeholderText?: string;
  errorMessage?: string;
  inputValue?: string | number;
  inputMaxLength?: number;
  inputBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showErrorMessage?: boolean;
};

/**
 *
 * @param inputId - input의 id 속성 값
 * @param labelText - label의 textContent
 * @param inputType - input의 type 속성 값
 * @param placeholderText - input의 placeholder
 * @param errorMessage - input값 예외처리 후 안내 문구
 * @param inputValue - input의 value 속성 값
 * @param inputMaxLength - input의 maxLength 속성 값
 * @param inputBlur - input의 onBlur 속성 값
 * @param onChange - 값이 바뀔 때 호출되는 콜백
 * @param showErrorMessage - 안내 문구(errorMessage)를 보여줄지 여부
 */
function TextInput({
  inputId,
  labelText,
  inputType = 'text',
  placeholderText,
  errorMessage,
  inputValue,
  inputMaxLength,
  inputBlur = () => {},
  onChange,
  showErrorMessage = false,
}: TextInputProps) {
  return (
    <div className="flex flex-col w-[322px]">
      <div className="flex flex-col w-full justity-between h-12">
        <label htmlFor={inputId} className="text-[12px] text-[#767676] font-medium ">
          {labelText}
        </label>
        <input
          id={inputId}
          type={inputType}
          value={inputValue}
          maxLength={inputMaxLength}
          onBlur={inputBlur}
          onChange={onChange}
          placeholder={placeholderText}
          className="border-[#DBDBDB] border-b-[1px] pb-2 focus:outline-none  focus:border-[#F26E22] text-[14px] placeholder-[#DBDBDB]"
        />
      </div>
      {showErrorMessage && errorMessage && <span className="text-[12px] text-[#EB5757] mt-[6px]">{errorMessage}</span>}
    </div>
  );
}

export default TextInput;
