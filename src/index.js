import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.send("1")
})

app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.PORT || 3000)
})

export default app