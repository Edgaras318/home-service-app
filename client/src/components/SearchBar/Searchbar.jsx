import styles from "./SearchBar.module.scss";
import { CiSearch } from "react-icons/ci";
import {useState} from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        aria-label="Search"
        className={styles.input}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={styles.button} aria-label="Search">
        <CiSearch fontSize={24} />
      </button>
    </div>
  );
};

export default SearchBar;
