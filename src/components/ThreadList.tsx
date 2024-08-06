import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

type Thread = {
  id: string;
  title: string;
};

const ThreadList = () => {
  const [data, setData] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const res = await fetch(
          "https://railway.bulletinboard.techtrain.dev/threads?offset=0"
        );
        const result = await res.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-scree">
        <h2 className="text-2xl font-bold p-4">新着スレッド</h2>
        <div className="bg-white  shadow-lg max-w-3xl w-full">
          <ul className="">
            {data.map((thread: Thread) => (
              <li
                key={thread.id}
                className="bg-white shadow-sm  p-4 border-b border-gray-300"
              >
                <Link to={`/thread/${thread.id}`} state={{title: thread.title}}>
                  <h2 className="text-lg font-medium text-gray-900">
                    {thread.title}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ThreadList;
