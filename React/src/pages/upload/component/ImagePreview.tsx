import deleteButton from '../../../assets/icon/icon-delete.svg';
type ImagePreviewProps = {
  url: string[] | string;
  gridType: string;
  onRemove?: (i: number) => void;
};

function ImagePreview({ url, gridType, onRemove }: ImagePreviewProps) {
  if (gridType === 'single') {
    return (
      <div className="relative ">
        <img src={url[0]} alt="업로드 이미지" className="w-[304px] h-[228px] rounded-[10px] object-cover" />
        <button type="button" className="absolute top-[6px] right-[6px]" onClick={() => onRemove && onRemove(0)}>
          <img src={deleteButton} alt="삭제하기" />
        </button>
      </div>
    );
  }
  return (
    <ul className="flex flex-row gap-2 scroll-smooth snap-start overflow-x-auto">
      {Array.isArray(url) && //타입가드
        url.map((v, i) => (
          <li key={i} className="relative">
            <img src={v} alt={`업로드한 이미지${i}`} className="min-w-[168px] h-[126px] rounded-[10px] object-cover" />
            <button type="button" className="absolute top-[6px] right-[6px]" onClick={() => onRemove && onRemove(i)}>
              <img src={deleteButton} alt="삭제하기" />
            </button>
          </li>
        ))}
    </ul>
  );
}
export default ImagePreview;
