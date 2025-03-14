const http = require('http')

const server= http.createServer((req, res)=>{
      res.end("server: here ı am!!")

})

const port = 50001;

server.listen (port, ()=>{
    console.log(`server is working ${port}, hooraaay!`)
})
