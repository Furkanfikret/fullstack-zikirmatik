import { useState } from 'react'
import { FaCreativeCommonsZero } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { PiSlideshowBold } from "react-icons/pi";
import axios from 'axios';


import '../src/css/myStill.css'
import './App.css'

function App() {
  const [count,setCount] = useState(0);
  const [records,setRecords] = useState([]);
  const [showTable,setShowTable] = useState(false);
  const [nameofzikir,setNameOfZikir] = useState('');
  const increase = () => {setCount(prev=>prev+1)}
  const decrease = () => {setCount(prev=>(prev>0 ? prev-1:0))}
  const reset = () => { 
    const cevap = window.confirm("Gerçekten sayacı sıfırlamak istiyor musun?");
    if(cevap){ setCount(0);setNameOfZikir(''); }
  }

  const saveZikir = async () => {
    const name = prompt("Lütfen bir zikir ismi giriniz : ");
    if(!name) return;
    try {
      await axios.post('http://localhost:3000/save',{name:name,value:count});
      alert('Kayıt Başarılı !');
    } catch (error) {
      console.log(error);
      alert('kayıt eklerken hata oluştu !');
    }
  }
  const showZikirs =async () => {
    try {
      const response = await axios.get('http://localhost:3000/records');
      setRecords(response.data);
      setShowTable(true);
    } catch (error) {
      console.log(error);
      alert('Kayıtlar alınamadı !');
    }
  }
  const closeTable = () => setShowTable(false);
  const handleDelete = async(id) =>{
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      setRecords(records.filter( item => item.id != id));
    } catch (error) {
      console.log('Silme Hatası',error);
    }
  }
  const handleGoOn = (number,name) => {
    setCount(number);
    setShowTable(false);
    setNameOfZikir(name);
  }
  return (
    <div className='main-frame'>
      <h2>Welcome To Zikirmatik v1.0</h2>
      { nameofzikir.length > 0 && <h2>{nameofzikir}</h2>}
      <div className='screen-frame'>
        <h1>{count}</h1>
      </div>
      <div className='button-frame'>
          <button className='increase-button' onClick={increase}><FaAngleDoubleUp/></button>
          <button className='decrease-button'onClick={decrease} style={{marginRight:'5px'}} ><FaChevronDown/></button>
          <button className='reset-button'onClick={reset} ><FaCreativeCommonsZero/></button>
      </div>
      <div className='records-button-frame'>
          <button className='save-button' onClick={saveZikir}><FaRegSave style={{margin:'5px'}}/>Zikri Kaydet</button>
          <button className='show-button' onClick={showZikirs}><PiSlideshowBold style={{margin:'5px'}} />Tüm Zikirleri Göster</button>
      </div>
      
      {showTable && (
          <div className="styled-table">
            <button onClick={closeTable} style={{margin:'10px',background:'gold'}}>KAPAT</button>
            <table style={{marginBottom:'10px'}}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Kayıt Adı</th>
                  <th>Değer</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {records.map(record => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.value}</td>
                    <td>{new Date(record.created_at).toLocaleString()}</td>
                    <td><button onClick={()=>handleDelete(record.id)} style={{background:'red'}}>Sil</button></td>
                    <td><button onClick={()=>handleGoOn(record.value,record.name)} style={{background:'gray'}}>Devam</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{fontWeight:'bold',fontSize:'large'}}>Powered by Furkan Fikret</p>
    </div>
    

  )
}

export default App
