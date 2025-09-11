import { UserProfile } from '../../components/UserProfile';
function FollowersList() {
  return (
    <ul>
      <li>
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
      </li>
    </ul>
  );
}
export default FollowersList;
