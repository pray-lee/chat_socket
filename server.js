const http = require('http')

const io = require('socket.io')

//http服务
const httpServer = http.createServer()
 httpServer.listen(8080)

//ws服务
const wsServer = io.listen(httpServer)
wsServer.on('connection', socket => {
  socket.on('send', data => {
    console.log(data)
  })
})