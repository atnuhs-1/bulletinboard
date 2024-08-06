import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreadList from "./components/ThreadList"; // スレッド一覧のコンポーネント
import NewThread from "./components/NewThread"; // スレッド新規作成用のコンポーネント
import Header from "./components/Header";
import ThreadPosts from "./components/ThreadPosts";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ThreadList />} />
          <Route path="/threads/new" element={<NewThread />} />
          <Route path="/thread/:thread_id" element={<ThreadPosts />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
