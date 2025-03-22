import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Header from './components/Header'
import { useDispatch } from 'react-redux'
import { setError, setJobs, setLoading } from './redux/slices/jobSlices'
import api from "./utils/api"

const App = () => {
const dispatch =  useDispatch();
  // apıden verileri al reducara ilet
  useEffect(() => {
    //reducardaki yüklenme durumunu ayarla
dispatch(setLoading());
    // apı a istek at ve istek başarılı olursa verileri reducara ilet
    api.get("./jobs")
    // istek başarılı olursa reducara jobsı gonder
    .then((res) => dispatch(setJobs(res.data)))
    // istek başarısız olursa hata gonder
    .catch((err) => dispatch(setError(err)));
  }, []);
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/create' element={<Create/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;



