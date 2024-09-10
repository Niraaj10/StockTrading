import { app } from './app.js'

const PORT = 3000

app.get('/', function (req, res) {
  res.send('App srunnign on 3000')
})

app.listen(PORT, () => {
  console.log("App is listening on ", PORT)
})