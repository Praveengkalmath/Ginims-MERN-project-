const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000

//require database models
const TASK = require('./models/task')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

//middlewears
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())  //cross origin  resourse sharing


const dbURL = "mongodb://localhost:27017/Ginims"
mongoose.connect(dbURL).then(() => {
    console.log("connected to database")
})
app.post('/tasks', async (req, res) => {

    let postData = new TASK({
      taskName: req.body.taskName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      priority: req.body.priority,
    })
    try {
        await postData.save()
        res.send({ message: 'Post added successfully' })
    } catch (error) {
        res.send({ message: 'Failed to add post' })
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const task= await TASK.find()
        res.json(task)
    } catch (error) {
        console.log(err);
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await TASK.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send({ message: 'Task deleted successfully' })
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/tasks/:id',async(req,res) => {
    let {id} = req.params
    try{
        const singleData = await Task.findById(id);
        res.send(singleData);
    }catch(err){
        res.send(err)
    }
})



app.put("/tasks/:id",async(req,res) => {
    const {id} = req.params
    await TASK.updateOne({_id:id},{
        $set:{
            task:req.body.task,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            prirority:req.body.prirority
        }
    })
})




app.listen(PORT, () => {
    console.log(`listening to server ${PORT}`)
})