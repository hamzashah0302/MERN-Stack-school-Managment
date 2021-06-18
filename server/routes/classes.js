const express = require('express')
const router = express.Router();
const app = express();
app.use(express.json())

// render Model
const Classes = require('../models/class')

router.get('/', (req, res)=>{
   Classes.find({}, function(err,doc){
      if(err){
         return status(404).json({status : 'failed', error: err})
      }
      else{
         res.status(200).json(doc)
      }
   })
})

router.post('/add_class', function(req , res){
   const body ={req}
   var id =0
   Classes.find({}).lean().exec(function(err,doc){
      if(doc){
         doc.forEach(element => {
            
         });
      }
   })
   const data = new Classes()
})


module.exports = router;