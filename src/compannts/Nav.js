import { Link } from "react-router-dom";
import { Data } from "../App";
import { useContext } from "react";
const Nav = () => {
  const { search, setSearch } = useContext(Data)
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Posts"
          value={search}
        />
      </form>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/newposte'>New Poste</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
