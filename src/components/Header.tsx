// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-green-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white text-2xl font-bold">掲示板</h1>
        </Link>

        <Link
          to="/threads/new"
          className="text-white bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-700"
        >
          スレッドをたてる
        </Link>
      </div>
    </header>
  );
};

export default Header;
