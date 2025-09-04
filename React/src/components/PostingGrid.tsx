import Posting from './Posting';

function HomeCardGrid() {
  return (
    <ul className="mt-6 flex flex-col items-center gap-6 px-4">
      <Posting />
      <Posting />
      <Posting />
      <Posting />
    </ul>
  );
}
export default HomeCardGrid;
