import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/homepage/Homepage";
import ChatPage from "./pages/chat/ChatPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/chat" element={<ChatPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
