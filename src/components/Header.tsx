import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-black text-xl font-bold p-1 rounded-md hover:bg-slate-100">掲示板</h1>
        </Link>

        <Link
          to="/threads/new"
          className="text-slate py-2 px-4 rounded-md hover:bg-slate-200 shadow-md" 
        >
          スレッドをたてる
        </Link>
      </div>
    </header>
  );
};

export default Header;
