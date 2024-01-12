import express from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";
const app = express()
const port = 3100
app.use(express.json())
app.use(cors())
const blogSchema = new Schema({
    icon: String,
    name: String,
    image: String
});
const blogModel = mongoose.model("BackModel", blogSchema)
app.get('/services', async (req, res) => {

    try {
        const data = await blogModel.find()
        res.send(data)

    } catch (error) {
        res.send(error.message)
    }

})

app.get('/services/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await blogModel.findById(id)
        res.send(data)

    } catch (error) {
        res.send(error.message)
    }
})
app.post('/services', async (req, res) => {
    try {
        const { name, title, icon } = req.body
        const data = await blogModel({ name, title, icon })
        data.save()
        res.send(data)

    } catch (error) {
        res.send(error.message)
    }
})
app.delete('/services/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await blogModel.findByIdAndDelete({ id })
        res.send(data)

    } catch (error) {
        res.send(error.message)
    }
})
mongoose.connect("mongodb+srv://mi829361s:1mz01mz0@salayev.kgfgf1t.mongodb.net/").then(() => console.log("cnnt"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})