import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

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

  const title = location.state?.title || "No Title";

  useEffect(() => {
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

    fetchPosts();
  }, [thread_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-4 ">
        <div className="col-span-2 flex flex-col ">
          <h2 className="text-3xl p-4 pb-9">{title}</h2>
          <ul className="space-y-2">
            {posts.map((post: Post) => (
              <li key={post.id} className="p-4 border-slate-200 border rounded-sm shadow-md">
                {post.post}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-20 h-10"></div>
      </div>
    </>
  );
}
