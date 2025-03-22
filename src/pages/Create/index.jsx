import "../Create/create.scss";
import Input from './Input'
import Select from "./Select";
import "../../constants/constant";
import { statusOptions, typeOptions } from "../../constants/constant";
import api from "../../utils/api.js";
import { useDispatch } from "react-redux";
import { createJob } from "../../redux/slices/jobSlices.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Create = () => {

  // navigasyon kurulumu
  const navigation = useNavigate();

  //dispatch kurulumu
   const dispatch = useDispatch();

  // form fönderildiğinde çalışacak fonk
  const handleSubmit = (e) => {
    //sayfa yenilemeyi engelle
    e.preventDefault();

    // ınputlara form data ile eriş
    const formData = new FormData(e.target);

    // formdata içerisindeki değerleri nesneye çevir
    const jobData = Object.fromEntries(formData.entries());

    // güncel tarih verisine eriş ve bunu jobdata içerisini ata
    jobData.date = Date.now();

  // apıye ıstek at eger basarılı ise reducera haber et
  api
  .post("/jobs", jobData)
  .then((res) => {
    // reducera haber ver
    dispatch(createJob(res.data));

    // kullanıcıya bildirim gonder
    toast.success("Başvuru oluşturuldu");


  // home sayfasına yonlendir
  navigation("/");

  }) .catch((err)=>{
    toast.error(`Başvuru sırasında bir sorun oluştu: ${err.message}`);
  });

 

  };

  return (
    <div className='add-page'>
    <section className='container'>
{/* title */}
<h2>Yeni İş Ekle</h2>

{/* form */}
<form onSubmit={handleSubmit}>
    <Input label="Pozisyon" name="position"/>
    <Input label="Şirket" name="company"/>
    <Input label="Lokasyon" name="location"/>
    <Select label="Durum" name="status" options={statusOptions}/>
    <Select label="Tür" name="type" options={typeOptions}/>

    <div className="btn-wrapper">
    <button className="button">Oluştur</button>
    </div>
</form>
    </section>
    </div>
  );
};

export default Create;
