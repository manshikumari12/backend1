const express=require("express")
const app=express()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/notes.routes")
const {auth}=require("./middleware/auth.middlware")
const cors =require("cors")

app.use(express.json())

app.get("/",(req,res)=>{
res.send("Home page")
})


app.use(cors())


app.use("/",userRouter)


app.use("/notes",noteRouter)



app.listen(4500,async()=>{
    try{
      await connection
      console.log("conneted to the DB")  
    }catch(error){
        console.log("cnnot connected ")
      console.log(error)
     }
    console.log("server is running port 4500")
})