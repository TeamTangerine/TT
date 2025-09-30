import { useState } from 'react';
import { validateUserName } from '../../../utils/validation';

export function useUserNameValidation(initialValue = '') {
  const [userName, setUserName] = useState(initialValue);
  const [isNameValid, setIsNameValid] = useState(true);

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    setIsNameValid(validateUserName(value));
  };

  return { userName, setUserName, isNameValid, handleInputName };
}
