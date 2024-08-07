import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NewThread() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // サーバーに送信するデータ
    const data = {
      title: title,
    };

    try {
      const response = await fetch("https://railway.bulletinboard.techtrain.dev/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // スレッドが正常に作成された場合
        console.log("スレッドが作成されました");
        navigate("/");  // スレッド作成後にトップページにリダイレクト
      } else {
        console.error("スレッドの作成に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">新しいスレッドを作成</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-1 border-gray-200 border rounded-md shadow-sm focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            作成
          </button>
        </form>
      </div>
      <Link to="/" className="text-blue-500 hover:text-blue-900">Topに戻る</Link>
    </>
  );
}

export default NewThread;
