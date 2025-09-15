import deleteButton from '../../../assets/icon/icon-delete.svg';
type ImagePreviewProps = {
  url: string[] | string;
  gridType: string;
};

function ImagePreview({ url, gridType }: ImagePreviewProps) {
  if (gridType === 'single') {
    return (
      <div className="relative ">
        <img src={url[0]} alt="업로드 이미지" className="w-[304px] h-[228px] rounded-[10px] object-cover" />
        <button className="absolute top-[6px] right-[6px]">
          <img src={deleteButton} alt="삭제하기" />
        </button>
      </div>
    );
  }
  return (
    <div>
      <img src={url} alt="업로드 이미지" />
    </div>
  );
}
export default ImagePreview;
