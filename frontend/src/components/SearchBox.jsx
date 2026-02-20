import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = ({ isOpen, setIsOpen, className = "" }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }

    // close search after submit (only if function exists)
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`${className}`}>
      <form className={"flex gap-2 text-sm"} onSubmit={submitHandler}>
        <input
          type="text"
          name="q"
          value={keyword}
          placeholder={`Search Products...`}
          onChange={(e) => setKeyword(e.target.value)}
          // className="focus:outline-0 bg-white p-2 lg:w-sm rounded-sm"
          className="focus:outline-0 bg-white p-2 w-full rounded-sm"
        />
        <button
          type="submit"
          className="border p-1 rounded-sm text-white bg-gray-600 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
