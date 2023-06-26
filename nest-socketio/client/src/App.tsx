import { Route, Routes } from 'react-router-dom';
import Chatroom from './pages/chatroom/chatroom';
import WaitingRoom from './pages/waiting-room/waiting-room';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:4000/chat');

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WaitingRoom />} />
      <Route path="/room/:roomName" element={<Chatroom />} />
    </Routes>
  );
};


export default App;