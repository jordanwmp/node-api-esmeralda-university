import app from './src/app.js';//colocar a extensão e usar . no começo do path

const PORT = 3000


app.listen(PORT, ()=>{
    console.log(`server running on address http://localhost:${PORT}`);
})