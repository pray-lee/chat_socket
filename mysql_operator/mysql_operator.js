const http = require('http')
const url = require('url')
const mysql = require('mysql')
const ejs = require('ejs')
//创建数据库连接
let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pray1733',
  database: 'char_test'
})


//render
const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname
  if(pathname !== '/favicon.ico'){
    if(pathname === '/index'){
      renderData(res)
    }
  }
}).listen(8080)

async function renderData (res) {
  let renderData = await getRenderData()
  render(res, renderData)
}

function getRenderData(res) {
  return new Promise( (resolve, reject) => {
    db.query('SELECT * FROM user_table', (err, data) => {
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}
function render(res, renderData) {
  //拿到renderdata再执行
  ejs.renderFile(`${__dirname}/index.ejs`, {renderData: renderData}, (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
    res.end(data)
  })
}