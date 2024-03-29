const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
app.use(express.static(__dirname));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const getLh3 = require('./axios');
const { get } = require('request');
const fs = require('fs')

const cors = require('cors');
const { constants } = require('buffer');
// Thiết lập CORS
const useCors = {
    origin: '*'

}
// Các tùy chọn CORS cụ thể
// app.options(useCors,cors());
app.use(cors(useCors));




app.get('/a',(req, res) =>{
    res.render('aaa')
})

app.get('/b',(req, res) =>{
    res.render('bbb')
})
app.get('/c',(req, res) =>{
    res.render('ccc')
})
app.get('/d',(req, res) =>{
    res.render('ddd')
})
app.post('/e', async (req, res) => {
    let uri = req.body.uri
    
    res.json({uri: ruri})
})
app.get('/f', async (req, res) =>{
    const _link = req.query.url
    //console.log(_link)
    let rurl = await getLh3.getLinklh3(_link)
    res.redirect(rurl)
})
app.get('/g',  async (req, res) => { // Queue parrams: 127.0.0.1:3000/g?idunique=...&idfilm=... 

    //  setTimeout(async() => {
        let idunique = req.query.idunique
        let idfilm = req.query.idfilm
    // console.log(idunique)
    // console.log(idfilm)
        let _html = await getLh3.xuly_file_m3u8(idunique, idfilm)
        let _linkm3u8 = await getLh3.xuly_file_m3u82(_html, idfilm)
        let _data_m3u8 = await getLh3.doc_xuly_m3u8_new(_linkm3u8)
    
    //console.log(_data_m3u8)
        res.set('Content-Disposition', 'attachment; filename="file.m3u8"');
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    // res.sendFile(__dirname + '\\png\\auto.m3u8') // return text ?
        res.send(_data_m3u8)
    //   }, 8000);

    // let idunique = req.query.idunique
    // let idfilm = req.query.idfilm
    // // console.log(idunique)
    // // console.log(idfilm)
    // let _html = await getLh3.xuly_file_m3u8(idunique, idfilm)
    // let _linkm3u8 = await getLh3.xuly_file_m3u82(_html, idfilm)
    // let _data_m3u8 = await getLh3.doc_xuly_m3u8_new(_linkm3u8)
    
    // //console.log(_data_m3u8)
    // res.set('Content-Disposition', 'attachment; filename="file.m3u8"');
    // res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    // // res.sendFile(__dirname + '\\png\\auto.m3u8') // return text ?
    // res.send(_data_m3u8)
})

app.get("/seprate-thread", (req, res) => {
    res.send("Process function getSum on seprate thread.");
})

app.get('/h', async (req, res)=>{
    // Dữ liệu M3U8 playlist
  const m3u8Data = "#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:5\n#EXTINF:5,\nsegment_1.ts\n#EXTINF:5,\nsegment_2.ts";
// Thiết lập Content-Disposition header để yêu cầu trình duyệt tải tệp với đuôi .m3u8
  res.set('Content-Disposition', 'attachment; filename="file.m3u8"');
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
  res.send(m3u8Data);
})
function noifile() {
    // Đọc nội dung của tệp PNG header
    const pngread = fs.readFileSync("D:/Temp/tsfile/filegoc1px.png")
    //const a = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
    const pngHeader = Buffer.from(pngread);
    const bien = 'D:/Temp/tsfile/output0.ts'
    //console.log(pngHeader)
    // Đọc nội dung của tệp TS
    const tsFilePath = 'D:/Temp/tsfile/output0.ts' // Thay thế bằng đường dẫn đến tệp TS của bạn
    const tsData = fs.readFileSync(tsFilePath);

    // Chèn mã PNG header vào tiêu đề của tệp TS
    const newData = Buffer.concat([pngHeader, tsData]);

    // Ghi dữ liệu mới vào tệp TS
    const outputFilePath = 'segment_000.png'; // Tên tệp đầu ra
    fs.writeFileSync(outputFilePath, newData);
}

app.get('/testpng', async (req, res)=>{
    noifile()
    res.end()
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
