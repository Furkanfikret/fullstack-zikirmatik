import express from 'express';
import cors from 'cors';
import pool,{testDB} from '../backend/db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

testDB();

app.use(cors());
app.use(express.json());


app.get("/",(req,res) => {
    res.send("<h1>Welcome To Backend Home Page</h1>")
})

app.post('/save',async(req,res)=>{
    try {
        const {name,value} = req.body;
        await pool.query('insert into zikirler (name,value) values ($1,$2)',[name,value]);
        res.send({message:'Kayıt başarılı bir şekilde eklendi!'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:'Kayıt Eklenirken bir hata oldu !'})
    }
    
})
app.get('/records',async(req,res)=>{
    try {
        const result = await pool.query('select * from zikirler order by created_at desc');
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:'Kayıtlar Listelenirken Bir hata oluştu !'});
    }
    
})
app.delete('/delete/:id',async(req,res) => {
    try {
        const {id} = req.params;
        await pool.query('delete from zikirler where id=$1',[id]);
        res.status(200).json({message:'Kayıt başarılı şekilde silindi !'});
    } catch (error) {
        console.log('Kayıt silinirken hata oluştu :',error);
        res.status(500).json({message:'Kayıt silinirken hata oluştu!'});
    }
})
app.get('/healthz', (req, res) => {
  res.sendStatus(200);
});

app.listen(port,()=>{
    console.log(`The Server Is Running On ${port} port !`)
})