import { IOptionsType } from '../../types/IOptionsType';

/**
 *
 * @param method - 'GET' | 'POST' | 'PUT' | 'DELETE'
 * @param headers - string(옵셔널)
 * @param data - Record<string, unknown> (옵셔널)
 * @param token - string | null (옵셔널)
 * @returns Res 객체 - Request
 */
export const options = <T = Record<string, unknown>>({
  method,
  headers,
  data,
  token,
}: IOptionsType<T>): RequestInit => ({
  method: method,
  headers: {
    'Content-Type': headers || 'application/json',
    //토큰이 존재하면(&&) 인증 키밸류를 가진 객체를 만든 다음, 스프레드로 합치고 있어요. 필요없는 헤더값을 넘기지 않기 위해서 이렇게 작성되었습니다.
    ...(token && { Authorization: `Bearer ${token}` }),
  },
  //이곳도 데이터가 없을 경우가 존재하기때문에 위에처럼 처리해줬습니다.
  ...(data && { body: JSON.stringify(data) }),
});

/**
 * fetch 함수를 재사용 가능하게 구성했습니다.
 * @param url - 필요한 URL을 넣습니다.
 * @param option - 명세에 따른 request option을 담아주세요.
 * @returns
 * 통신 값에 따라
 * 204 일때는 삭제했다는 내용을 출력하고(컨텐츠가 안내려와요)
 * 아닌 경우에는 데이터를 받습니다.
 * 오류 메세지를 출력하고 싶으실때는 .message를 사용하세요
 */
export async function fetchAPI(url: string, option: RequestInit): Promise<any> {
  try {
    const response = await fetch(url, option);

    if (response.status === 204) {
      return null;
    }
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || '통신 에러가 발생하였습니다');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
