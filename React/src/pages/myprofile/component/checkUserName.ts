import { useState } from 'react';
import { validateUserName } from '../../../utils/validation';

function checkUserName() {
  const [userName, setUserName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  //유저 이름 검사
  if (!validateUserName(userName)) {
    setIsNameValid(true);
    alert('올바르지 않은 이름 형식입니다.');
    return;
  }
}

export default checkUserName;
