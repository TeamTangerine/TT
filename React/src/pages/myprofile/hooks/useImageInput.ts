import { useState } from 'react';

function useImageInput() {
  const [image, setImage] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState('');

  //이미지 파일 관리 함수(인풋)
  // 파일 리더라는 자바스크립트 인터페이스를 사용(이미지를 로컬에서 보여주기 위해 사용)
  // 이미지를 base64로 인코딩해서 문자열로 만들어줌
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        setImage(files);
        const readFileAsDataURL = (file: File) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        const urls = await Promise.all(files.map(readFileAsDataURL));
        setPreviewUrl(urls[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { image, previewUrl, handleFileChange };
}

export default useImageInput;
