import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { Data } from '../App';

const Header = () => {
  const { title } = useContext(Data);
  const { width } = useWindowSize;
  console.log(width);
  return (
    <header className="Header">
      <h1>{title}</h1>
      {width < 779 ? <p>1</p> : width < 992 ? <p>2</p> : <p>{width}</p>}
    </header>
  );
};

export default Header;
