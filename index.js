const express = require('express')
const app = express()

const path = require('path')
const dbPath = path.join(__dirname, "data.db")

const cors = require('cors')
const { open } = require('sqlite')
const sqlite3 = require('sqlite3')

app.use(cors())
app.use(express.json())
let db = null;
const initializeDBServer = async () => {

    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
    } catch (e) {
        console.log(e)
        process.exit(1)
    }

}
app.listen(3000)

const locations = [{ id: 1, place: 'Ameerpet' }, { id: 2, place: 'Gachibowli' }, { id: 3, place: 'Madhapur' }]

initializeDBServer()
app.get('/locations', async (req, res) => {
    console.log(locations)
    res.json(locations)
})
app.get('/suggestions', async (req, res) => {
    const { searchInput } = req.query
    console.log(searchInput)
    const searchQuery = `select * from appliance_types where type_name like '%${searchInput}%';`
    const dbresult = await db.all(searchQuery)
    res.json(dbresult)
})

app.post('/addTech', async (req, res) => {
    const { name, photo, specialization, rating, description } = req.body

    const addTechnicianQuery = `insert into technicians (name,photo,specialization,rating,description)values('${name}','${photo}','${specialization}',${rating},'${description}');`
    await db.run(addTechnicianQuery)
    res.json('Added')
})


app.get('/getTech',async(req,res)=>{
    const query = `select * from technicians;`
    const result = await db.all(query)
    // console.log(result)
    res.json(result)
})



