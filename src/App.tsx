import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ThreadList from "./pages/ThreadList";
import NewThread from "./pages/NewThread";
import ThreadPosts from "./pages/ThreadPosts";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ThreadList />} />
          <Route path="/threads/new" element={<NewThread />} />
          <Route path="/thread/:thread_id" element={<ThreadPosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
