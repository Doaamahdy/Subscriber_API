const express = require("express");
const router = express.Router()
const Subscriber = require('../models/subscriber');

module.exports = router

router.get('/',async(req,res)=>{
   try{
       const subscribers = await Subscriber.find();
       res.json(subscribers);
   }catch(er){
     res.status(500).json({message:err.message});
   }
});

router.get('/:id',getSubscriber,async(req,res)=>{
   res.send(res.subscriber);
});

router.post('/',async(req,res)=>{
  
    const subscriber = new Subscriber({
        name:req.body.name,
        subscriberToChannel:req.body.subscriberToChannel,
    })
    try{
      const newSubscriber = await subscriber.save();
      res.status(201).send(newSubscriber);
  }catch(er){
       res.status(400).send({message:er.message});
  }
});

router.patch('/:id',getSubscriber,async(req,res)=>{
  if(req.body.name != null){
    res.subscriber.name = req.body.name;
  }
  if(req.body.subscriberToChannel != null){
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
  }

  try{
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  }catch(err){
    res.status(400).json({message:err.message});
  }

});

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        console.log(res.subscriber);
      await res.subscriber.deleteOne();
      res.json({ message: "Deleted Subscriber Successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

async function getSubscriber(req,res,next){
 let subscriber;
    try{
   subscriber = await Subscriber.findById(req.params.id);
    if(subscriber == null){
        return res.status(404).json({message:"cannot find subscriber"});
    } 

}catch(er){
   return res.status(500).json({message:er.message});
 }
 res.subscriber = subscriber;
 console.log("hello world");
 next();
}