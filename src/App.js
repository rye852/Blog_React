import LayOut from './compannts/LayOut';
import Home from './pages/Home';
import About from './pages/About';
import Missing from './pages/Missing';
import NewPoste from './pages/NewPoste';
import PostePage from './pages/PostePage';
import EditPost from './pages/EditPost';
import api from './api/Posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useState, useEffect, createContext } from 'react';

export const Data = createContext();

function App() {
  const [postes, setPostes] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResault, setSearchResault] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchErr, isLoading, refrech } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(() => {
    setPostes(data);
  }, [data]);

  useEffect(() => {
    const filtredResult = postes.filter(
      (poste) =>
        poste.body.toLowerCase().includes(search.toLowerCase()) ||
        poste.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResault(filtredResult.reverse());
  }, [search, postes]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const newPostes = postes.filter((poste) => poste.id !== id);
      setPostes(newPostes);
      navigate('/');
    } catch (err) {
      console.log(`Errore: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = {
      id: id,
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    try {
      await api.put(`/posts/${id}`, updatePost);
      setPostes(postes.map((post) => (post.id === id ? updatePost : post)));
      refrech();
      navigate('/');
      setEditBody('');
      setEditTitle('');
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = postes.length ? postes[postes.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
      id: id,
      title: postTitle,
      datetime: datetime,
      body: postBody,
    };
    try {
      await api.post('/posts', newPost);
      const allPostes = [...postes, newPost];
      setPostes(allPostes);
      navigate('/');
      setPostBody('');
      setPostTitle('');
    } catch (err) {
      console.log(`Errore: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Data.Provider
        value={{
          search,
          setSearch,
          width,
          searchResault,
          fetchErr,
          isLoading,
          postTitle,
          setPostTitle,
          postBody,
          setPostBody,
          handleSubmit,
          handleDelete,
          postes,
          handleEdit,
          editBody,
          editTitle,
          setEditTitle,
          setEditBody,
        }}>
        <Routes>
          <Route element={<LayOut title="React Blog" />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/newposte" element={<NewPoste />} />
            <Route path="/:id" element={<PostePage />} />
            <Route path="editpost/:id" element={<EditPost />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </Data.Provider>
    </div>
  );
}

export default App;
