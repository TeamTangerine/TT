import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Login from './pages/Auth/Login';
import LoginWithEmail from './pages/Auth/LoginWithEmail';
import JoinMembership from './pages/Auth/JoinMembership';
import SearchPage from './pages/search/SearchPage';
import YourProfile from './pages/yourprofile/YourProfile';
import MyProfile from './pages/myprofile/MyProfile';
import FollowList from './pages/followers/FollowList';
import ProfileModification from './pages/myprofile/ProfileModification';
import AddProduct from './pages/myprofile/AddProduct';
import Post from './pages/post/Post';
import Upload from './pages/upload/Upload';
import ChatList from './pages/chat/ChatList';
import ChatRoom from './pages/chat/ChatRoom';
import Splash from './pages/splash/Splash';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-with-email" element={<LoginWithEmail />} />
        <Route path="/join-membership" element={<JoinMembership />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/your-profile/:postId" element={<YourProfile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/follow-list/:accountName" element={<FollowList />} />
        <Route path="/profile-modification" element={<ProfileModification />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/chat-list" element={<ChatList />} />
        <Route path="/chat-room" element={<ChatRoom />} />
        <Route path="/splash" element={<Splash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
