import Upload from '../../pages/upload/Upload';
import { fetchAPI, options } from './fetcher';
import { USER_URL, IMAGE_URL, PROFILE_URL, ARTICLE_URL } from './https';

export const imageAPI = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(IMAGE_URL.uploadFile, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('통신 에러가 발생했습니다');
    }
    return data;
  },
  uploadFiles: async (file: FileList) => {
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append('image', file[i]);
    }

    const response = await fetch(IMAGE_URL.uploadFiles, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (response.status === 400) {
      if (data.message === 'Too many files') {
        throw new Error('이미지 갯수가 3개를 초과했습니다.');
      }
      throw new Error(data.message || '잘못된 요청입니다.');
    }
    if (!response.ok) {
      throw new Error('통신 에러가 발생했습니다.');
    }
    return data;
  },
  getImage: async (fileName: string) => {
    const response = await fetch(IMAGE_URL.getFile(fileName), {
      method: 'GET',
    });

    if (response.status === 404) {
      throw new Error('이미지를 찾을 수 없습니다.');
    }

    if (!response.ok) {
      throw new Error('통신 에러가 발생했습니다.');
    }

    return IMAGE_URL.getFile(fileName);
  },
};
