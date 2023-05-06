import Feed from '../compannts/Feed';
import { useContext } from 'react';
import { Data } from '../App';
const Home = () => {
  const{ searchResault, isLoading, fetchErr } = useContext(Data)
  return (
    <main className="Home">
      {isLoading && <p className='statuMsg'>Loading ...</p>}
      {!isLoading && !fetchErr && (
        <>
          {searchResault.length ? (
            <Feed />
          ) : (
            <p style={{ marginTop: '1rem' }}>No Posts to display</p>
          )}
        </>
      )}
      {fetchErr && !isLoading && (
        <p style={{color: 'red', marginTop: '1rem', fontSize: '1.25rem'}} className='eroorNet'>Network Errore</p>
      )}
    </main>
  );
};

export default Home;
