const express =require("express")
const noteRouter =express.Router()
const {NoteModel}=require("../model/note.model")


noteRouter.get("/",async(req,res)=>{
    let data=req.query
try{
    const notes = await NoteModel.find({data})
    res.status(200).send(notes)
}catch(err){
    res.status(400).send({"msg":err.msg})
}
})


noteRouter.post("/add",async(req,res)=>{
    try{
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new Note has been added"})
    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
    

    
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const payload =req.body
    const noteID =req.params.noteID
    try{
        await NoteModel.findByIdAndUpdate({_id:noteID},payload)
        res.status(200).send({"msg":"Note has been update"})
    }catch(err){
        res.status(400).send({"mag":err.msg})
    }
    
})

noteRouter.get("/delete/:noteID",async(req,res)=>{
    const payload=req.body
    const noteID =req.params.noteID
    try{
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.status(200).send({"msg":"Note has been deleted"})
    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
    
})

module.exports={noteRouter}