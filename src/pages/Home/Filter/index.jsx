import { useEffect, useState } from "react";
import "../../Create/create.scss";
import Input from "../../Create/Input";
import Select from "../../Create/Select/index";
import { statusOptions,typeOptions,sortOptions } from "../../../constants/constant";
import { useDispatch } from "react-redux";
import { setJobs } from "../../../redux/slices/jobSlices";
import api from "../../../utils/api";


const Filter = () => {
  const dispatch = useDispatch();
  const [text,setText] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [status,setStatus] = useState();
  const [type,setType] = useState();
  const [sort,setSort] = useState();

  // text debounce uygula
  useEffect(() => {

    // text undefined ise fonk durdur
if (text === undefined) return;

    // her tuş vurulunda bir sayaç başlat
const id = setTimeout(() => setDebouncedText(text), 300);

// eger süre bitmeden useeffect tekrar çalışırsa önceki sayacı durdur
return () => clearTimeout(id);
  }, [text]);

  //stateler her değiştinde apıye istek at ve filtrele
  useEffect(() => {
    const params = {
      q: debouncedText,
      status,
      type,
      
     

_sort: sort === "a-z" || sort === "z-a" ? "company" : "date",
_order: sort === "a-z" || sort === "En Eski" ? "asc" : "desc",
    };
    console.log(params);
    // apiye parametlerle birlikte istek at
    api.get("/jobs", { params })
    // gelen cevabı reducer'a haber ver
    .then((res) => dispatch(setJobs(res.data)));
  }, [debouncedText,status,type,sort]);

  // filtreleri sıfırla
const handleReset = () => {
  setText();
  setDebouncedText();
  setStatus();
  setType();
  setSort();
};

  return (
    <div className='filter-sec'>
      <h2>Filtreleme Formu</h2>

      <form>
        <Input label="Ara" handleChange={(e) => setText(e.target.value)}/>

        <Select label="Durum" options={statusOptions} handleChange={(e) => setStatus(e.target.value)}/>
      
      
        <Select label="Tür" options={typeOptions} handleChange={(e) => setType(e.target.value)}/>

        <Select label="Sırala" options={sortOptions} handleChange={(e) => setSort(e.target.value)}/>
       
       
       
        <button onClick={handleReset} className="button" type="reset">Filtreleri Sıfırla</button>
       
        </form>
    </div>
  );
};

export default Filter
