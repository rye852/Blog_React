import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
const LayOut = () => {
  return (
    <>
      {/* <DataProvider> */}
        <Header />
        <Nav  />
        <Outlet />
        <Footer />
      {/* </DataProvider> */}
    </>
  );
};

export default LayOut;
