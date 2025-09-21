import { Link, useNavigate } from 'react-router-dom';
import iconSearch from '../assets/icon/icon-search.png';
import arrowLeft from '../assets/icon/icon-arrow-left.png';
import more from '../assets/icon/icon-more-vertical.png';
import Modal from './modal/Toast';
import Button from './button/Button';
import React, { useState } from 'react';

interface IHeaderProps {
  navStyle: 'top-main' | 'top-search' | 'top-basic' | 'top-chat' | 'top-upload' | 'top-save';
  button?: boolean;
  searchOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formTarget?: string;
  inputValue?: string;
}

/**
 * Header컴포넌트
 * @param navStyle -string 헤더 네비게이션 스타일을 입력하세요. top-main | top-search | top-basic | top-chat | top-upload | top-save
 * @param button -bloolean (옵셔널) top-upload 스타일 사용시 '저장'버튼의 disabled를 컨트롤 하는 prop입니다.
 * @param searchValue - (옵셔널) top-search 스타일 사용시 input의 value로 사용되는 문자열
 * @param searchOnChange - (옵셔널) top-search 스타일 사용시 input의 onChange 핸들러
 * @returns
// top-upload 스타일 사용 예시
 * <Header navStyle="top-upload" button={true} />
 *
 * // top-search 스타일 사용 예시. 상위 컴포넌트에서 상태관리를 통해 가져와야 합니다(밑에 예시 setSearchValue)
 * <Header
 *   navStyle="top-search"
 *   searchValue={searchValue}
 *   searchOnChange={e => setSearchValue(e.target.value)}
 * />
 */

function Header({ navStyle, button = false, searchOnChange, inputValue, formTarget }: IHeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const navContent = () => {
    switch (navStyle) {
      case 'top-main': {
        return (
          <>
            <h1 className="text-lg">감귤마켓 피드</h1>
            <Link to="/search-page">
              <img src={iconSearch} alt="검색" />
            </Link>
          </>
        );
      }
      case 'top-search': {
        return (
          <>
            <button type="button" onClick={() => navigate(-1)}>
              <img src={arrowLeft} alt="뒤로가기" />
            </button>
            <input
              type="text"
              name="search"
              id="search"
              value={inputValue}
              onChange={searchOnChange}
              placeholder="계정 검색"
              className="placeholder:text-[#c4c4c4] bg-[#F2F2F2] w-[316px] h-[32px] rounded-[16px] pl-[16px] py-[7px] text-sm"
            />
          </>
        );
      }
      case 'top-basic': {
        return (
          <>
            <button type="button" onClick={() => navigate(-1)}>
              <img src={arrowLeft} alt="뒤로가기" />
            </button>
            <button type="button" onClick={() => setShowModal(true)}>
              <img src={more} alt="더보기" />
            </button>
          </>
        );
      }
      case 'top-chat': {
        // 채팅 기능은 추후 구현 예정이라 하드코딩 돼있습니다.
        return (
          <>
            <div className="flex gap-[10px]">
              <button type="button" onClick={() => navigate(-1)}>
                <img src={arrowLeft} alt="뒤로가기" />
              </button>
              <p className="text-sm font-medium">애월읍 위니브 감귤농장</p>
            </div>
            <button type="button" onClick={() => setShowModal(true)}>
              <img src={more} alt="더보기" />
            </button>
          </>
        );
      }
      case 'top-upload': {
        return (
          <>
            <button type="button" onClick={() => navigate(-1)}>
              <img src={arrowLeft} alt="뒤로가기" />
            </button>
            <Button
              btnTextContent="업로드"
              btnColor={button ? 'normal' : 'disable'}
              btnSize="mediumSmall"
              btnType="submit"
              btnForm={formTarget}
            />
          </>
        );
      }
      case 'top-save': {
        return (
          <>
            <button type="button" onClick={() => navigate(-1)}>
              <img src={arrowLeft} alt="뒤로가기" />
            </button>
            <Button
              btnTextContent="저장"
              btnColor={button ? 'normal' : 'disable'}
              btnSize="mediumSmall"
              btnType="submit"
              btnForm={formTarget}
            />
          </>
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <header>
      <nav className="flex justify-center w-full h-[48px] border-b border-b-[#DBDBDB] px-[16px]">
        <div className="flex justify-between items-center w-full max-w-[390px]">{navContent()}</div>
      </nav>
      {(navStyle === 'top-basic' || navStyle === 'top-chat') && showModal && (
        <Modal toastStyle="header" closeModal={() => setShowModal(false)} showModal={showModal} />
      )}
    </header>
  );
}

export default Header;
