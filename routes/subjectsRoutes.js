const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')
const multer=require('multer')
const fs=require('fs')
const path=require('path')
const upload=require('../middleware/fileUploader')
app=express()
app.use(express.urlencoded({extended:false}))

router.get('/subjects',auth,(req,res)=>{   // auth is a middleware which verfies if user is authenticated or not
    console.log("subjects")
    res.render('subjects',{userInfo:req.user})
   })


   router.post('/addSubject',auth,async (req,res)=>{
    console.log("addSubject")
    try{
       
       req.user.subjects= await req.user.subjects.concat({
            subject:{
                name:req.body.subject_name,
                description:req.body.subject_description,
                chapters:[]
            }
        })
        await req.user.save()
        res.redirect('/subjects')
    }catch(error){
        res.status(401).send(error)
    }     
})

/////////////////////--------------testing-----------------/////////////


// Step 7 - the GET request handler that provides the HTML UI
 
// router.get('/testing/:id',auth, (req, res) => {

//     // console.log(req.user)
//     // res.send("Testing")
//     let indices=req.params.id.split(',')
//         let subjI=parseInt(indices[0])
//         let chapI=parseInt(indices[1])
//         console.log(req.user.subjects[subjI].subject.chapters[chapI].files)
//         let files=req.user.subjects[subjI].subject.chapters[chapI].files
//         // res.send("Testing")
//     res.render('testing',{files:files})
// });


/////////////////----------------------------------------//////////////





///////////////////////////

router.get('/deleteSubject/:id',auth,async (req,res)=>{
    try{
        let subI=parseInt(req.params.id)
        await req.user.subjects.splice(subI,1)
        await req.user.save()
        res.render('subjects',{userInfo:req.user})
    }catch(e){
        res.status(401).send(e)
    }
})
module.exports=router
