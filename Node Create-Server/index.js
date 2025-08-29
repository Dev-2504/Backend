const http = require("http")
const fs = require("fs")
const port = 1008

const portHandler = (req,res) => {
    const filepath = "./index.html"
    fs.readFile(filepath, (err,result) => {
        if(!err)
        {
            res.end(result)
        }
    })
}

const server = http.createServer(portHandler)

server.listen(port, (err) => {
    if(err)
    {
        console.log(err)
    }
    else {
        console.log(`Your server is started on port : ${port}`)
    }
})