import { NavigateFunction } from 'react-router-dom';
import { postAPI, productAPI } from '../../../service/fetch/api';

export interface ModalConfig {
  message: string;
  rightLabel: string;
  action: () => void | Promise<void>;
}
/**
 * 설정 객체를 생성하는 팩토리 함수입니다.
 * 모달의 설정을 기능상 분리해 놓았습니다.
 * 모달의 윗부분 메세지, 오른쪽 버튼, 버튼 클릭 액션이 정의되어 있습니다.
 * @param navigate 라우팅을 위한 함수
 * @param handleClose 닫기 위한 함수
 * @param postId 게시물 아이디
 * @param productId 상품 아이디
 * @returns 모달별 타입 설정 객체 (메세지, 라벨, 액션)
 */
export const createModalConfigs = (
  navigate: NavigateFunction,
  handleClose: () => void,
  postId?: string,
  productId?: string
): Record<string, ModalConfig> => ({
  logout: {
    message: '로그아웃 하시겠어요?',
    rightLabel: '로그아웃',
    action: () => {
      localStorage.removeItem('TOKEN_KEY');
      alert('로그아웃 완료');
      navigate('/login');
    },
  },
  deleteMyPost: {
    message: '게시글을 삭제할까요?',
    rightLabel: '삭제',
    action: async () => {
      if (!postId) {
        alert('게시물을 찾을 수 없습니다.');
        return;
      }
      try {
        await postAPI.deletePost(postId);
        alert('게시물이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('통신 실패', error);
        alert('통신 오류가 발생했습니다.');
      }
    },
  },
  deleteMyProduct: {
    message: '상품을 삭제할까요?',
    rightLabel: '삭제',
    action: async () => {
      if (!productId) {
        alert('상품 정보를 찾을 수 없습니다.');
        return;
      }
      try {
        await productAPI.deleteProduct(productId);
        alert('상품을 성공적으로 삭제했습니다.');
        window.location.reload();
      } catch (error) {
        console.error('통신 실패', error);
        alert('통신 오류가 발생했습니다.');
      }
    },
  },
});
