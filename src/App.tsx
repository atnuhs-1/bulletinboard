import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type Post = {
  id: string;
  title: string;
};

const App = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://railway.bulletinboard.techtrain.dev/threads"
        );
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h2 className="text-2xl font-bold border-b p-4">新着スレッド</h2>
        <div className="bg-white  shadow-lg max-w-3xl w-full">
          <div className="">
            {data.map((post: Post) => (
              <div
                key={post.id}
                className="bg-white shadow-sm  p-4 border-b border-gray-300"
              >
                <h2 className="text-lg font-medium text-gray-900">
                  {post.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
