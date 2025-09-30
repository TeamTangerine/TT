import { useState, useEffect } from 'react';
import { userAPI } from '../../../service/fetch/api';
import useDebounce from '../../../utils/debouncer';

export function useUserAccountNameValidation(initialValue = '') {
  const [accountName, setAccountName] = useState(initialValue);
  const [isAccountNameValid, setIsAccountNameValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 디바운스 적용
  const debouncedAccountName = useDebounce(accountName, 500);

  useEffect(() => {
    if (!debouncedAccountName) return;
    // 계정명 변경될 때마다 API로 중복 검사
    const validate = async () => {
      try {
        const res = await userAPI.validateAccountName(debouncedAccountName);
        if (res.message === '이미 가입된 계정ID 입니다.') {
          setIsAccountNameValid(false);
          setErrorMessage('이미 가입된 계정ID 입니다.');
        } else {
          setIsAccountNameValid(true);
          setErrorMessage('');
        }
      } catch {
        setIsAccountNameValid(false);
        setErrorMessage('계정ID 검사 중 오류가 발생했습니다.');
      }
    };
    validate();
  }, [debouncedAccountName]);

  const handleAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value);
  };

  return { accountName, isAccountNameValid, errorMessage, handleAccountName };
}
