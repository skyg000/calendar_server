const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* const tData = {
    select : function(){
        return JSON.parse (fs.readFileSync('./data.json'))
    },
    insert : function(nObj){
        const jsonD = tData.select()
        const newData = [...jsonD, {id:jsonD.length+1, ...nObj}]
        fs.writeFileSync('./data.json',JSON.stringify(newData))
        return newData;
    },
    update : function(){},
    delete : function(){}
} */

app.get('/abc', function (req, res) { 
    const jsonD = fs.readFileSync('./data.json')
    res.send(JSON.parse(jsonD))
})

app.get('/abc/:id', function (req, res) { 
    const jsonD = fs.readFileSync('./data.json')
    const data = JSON.parse(jsonD)
    const {id} = req.params
    const aaa = data.filter(n=>n.id == id)
    res.send(aaa)
})

app.post('/insert', function (req, res) { 
    let jsonD = JSON.parse(fs.readFileSync('./data.json'))
    fs.writeFileSync('./data.json',JSON.stringify([...jsonD,{...req.body}]))
    let newjson = JSON.parse(fs.readFileSync('./data.json'))
    res.send(newjson);
})

app.post('/del', function (req, res) { 
    fs.writeFileSync('./data.json',JSON.stringify(req.body))
    let newjson = JSON.parse(fs.readFileSync('./data.json'))
    res.send(newjson);
})


app.post('/modi', function (req, res) {
    const {todo, id} = req.body;
    console.log(id);
    let allData = JSON.parse(fs.readFileSync('./data.json'));
    let thisData = allData.filter(n=>n.id === Number(id) )
    thisData[0].todo = todo;
    fs.writeFileSync('./data.json',JSON.stringify(allData))
    res.send(allData);
})

/* chat.json */
app.get('/abcd', function (req, res) { 
    const jsonD = fs.readFileSync('./chat.json')
    res.send(JSON.parse(jsonD))
})

app.get('/abcd/:id', function (req, res) { 
    const jsonD = fs.readFileSync('./chat.json')
    const data = JSON.parse(jsonD)
    const {id} = req.params
    const aaa = data.filter(n=>n.id == id)
    res.send(aaa)
})

app.post('/insert1', function (req, res) { 
    fs.writeFileSync('./chat.json',JSON.stringify(req.body))
    res.send('완료');
})

app.listen(3030)