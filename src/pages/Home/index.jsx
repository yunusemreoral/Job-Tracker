import React from 'react'
import { useSelector } from 'react-redux'
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Card from '../Create/Card';
import Filter from './Filter';
import "./home.scss";

const Home = () => {
  // storea abone ol ve jobs verisini consolo yazdır
  const {isLoading,error,jobs} = useSelector((store) => store.jobReducer);



  return (
    <div className='home-page'>
      {/* filter */}
     <Filter/>
      {/* jobs data */}

      {/* yukleniyorsa loader eğerki hata varsa error bileşeni render et iş verileri geldiyse onu render et*/}
    {isLoading ? (
      <Loader/>
    ) : error ? (
      <Error info={error}/>
    ) : (
      <div className='cards-wrapper'>
        {jobs.length === 0 ? (
          <p className='warn'>Aratılan Kriterlere Uygun Başvuru Bulunamadı</p>
        ) : (
           jobs.map((job) => 
       <Card key={job.id} job={job} />
        ))}
      </div>
    )}
    </div>
  );
};

export default Home
