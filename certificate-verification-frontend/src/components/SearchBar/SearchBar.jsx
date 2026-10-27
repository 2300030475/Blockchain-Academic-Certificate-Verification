import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="search-box">

      <div className="search-input">

        <FiSearch className="icon" />

        <input
          type="text"
          placeholder="Search by Certificate ID / Student Name"
        />

      </div>

      <div className="search-select">

        <FaUniversity className="icon" />

        <select>

          <option>Select University</option>
          <option>KL University</option>
          <option>JNTU</option>
          <option>Andhra University</option>
          <option>Osmania University</option>

        </select>

      </div>

      <button className="search-btn">

        <FiSearch />

        Search

      </button>

    </div>
  );
}

export default SearchBar;