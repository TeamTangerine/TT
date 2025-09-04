import Posting from './Posting';

function HomeCardGrid() {
  return (
    <ul className="pt-6 flex flex-col items-center gap-6 px-4 bg-white">
      <Posting />
      <Posting />
      <Posting />
      <Posting />
    </ul>
  );
}
export default HomeCardGrid;
