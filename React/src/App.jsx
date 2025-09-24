import Splash from './pages/Splash/Splash';
/* tailwind 호환성을 위해 App.css import했음 */
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Login from './pages/Auth/Login';
import LoginWithEmail from './pages/Auth/LoginWithEmail';
import JoinMembership from './pages/Auth/JoinMembership';
import SearchPage from './pages/search/SearchPage';
import YourProfile from './pages/yourprofile/YourProfile';
import MyProfile from './pages/myprofile/MyProfile';
import FollowersList from './pages/followers/FollowersList';
import ProfileModification from './pages/myprofile/ProfileModification';
import AddProduct from './pages/myprofile/AddProduct';
import Post from './pages/post/Post';
import Upload from './pages/upload/Upload';
import ChatList from './pages/chat/ChatList';
import ChatRoom from './pages/chat/ChatRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-with-email" element={<LoginWithEmail />} />
        <Route path="/join-membership" element={<JoinMembership />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/your-profile/:accountname" element={<YourProfile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/followers-list/:accountName" element={<FollowersList />} />
        <Route path="/profile-modification" element={<ProfileModification />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/upload/:postId" element={<Upload />} />
        <Route path="/chat-list" element={<ChatList />} />
        <Route path="/chat-room" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
