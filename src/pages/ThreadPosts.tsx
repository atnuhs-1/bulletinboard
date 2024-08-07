import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type Post = {
  id: string;
  post: string;
};

type ThreadData = {
  thread_id: string;
  posts: Post[];
};

export default function ThreadPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { thread_id } = useParams<{ thread_id: string }>();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState("");

  const title = location.state?.title || "No Title";

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=0`
      );
      const threadData: ThreadData = await res.json();
      console.log(threadData);
      setPosts(threadData.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [thread_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      post: post,
    };

    try {
      const res = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send Post");
      }

      const result = await res.json();
      console.log("Post successfully sent:", result);

      fetchPosts();
      setPost("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* 投稿一覧 */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold mb-6">{title}</h2>
        <ul className="space-y-4">
          {posts.map((post: Post) => (
            <li
              key={post.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              {post.post}
            </li>
          ))}
        </ul>
      </div>

      {/* 投稿フォーム */}
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">新しい投稿</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            id="post"
            placeholder="ここに投稿内容を入力してください..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            投稿
          </button>
        </form>
      </div>
    </div>
  );
}
