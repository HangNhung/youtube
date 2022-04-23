const express = require('express')
const app = express()
// add library 
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const useRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const conversationRoute = require('./routes/conversation')
const messageRoute = require('./routes/message')
const multer = require("multer")
const path = require("path")

dotenv.config()

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
 .then(() => console.log("MongoDb connected"))
 .catch(err => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully!!")
  } catch (error) {
    console.error(error);
  }
})

app.use("/api/users", useRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/message", messageRoute)

app.listen(8800, () => {
  console.log("Backend server is running!!");
})