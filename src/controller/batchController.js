const student = require("../model/studentSchema")

//-----------------------------------get all batch-------------------------

const getAllBatch = async (req,res)=>{
      const  batchData = await student.distinct("batch_Number")
      return res.status(200).json({

        status: "success",

        message: "List of batch Details",

        data: batchData
    })
}

//----------------------------Show details of a batch----------------------

const detailOfaBatch = async (req,res)=>{
  const batch = req.params.id
  const batchData = await student.find({batch_Number:batch})
  return res.status(200).json({

    status: "success",

    message: "List of student Details",

    data: batchData
})
}

//---------------------------------DeActivate/Active batch --------------------------

const inActivateBatch = async (req,res)=>{
 
  const batch =  req.params.id;
  const isBatchStatus = req.body;
  // console.log(isBatchStatus);
  

  // console.log(batch);
 
  const batchStatus = await student.updateMany({batch_Number:batch},isBatchStatus,{new:true})

  return res.status(200).json({ 

    status: "success",

    message: "Batch Status",

    data:batchStatus
})

}

//--------------------------------get active batch details----------------------

const getActiveBatch = async (req,res)=>{
  
  const batchStatus = await student.find({ isBatchStatus:true}).select("batch_Number").distinct("batch_Number");
// console.log(batchStatus);
  return res.status(200).json({

    status: "success",

    message: "List of active batch details",

    data:batchStatus
})
  
}

//-------------------------------get deActive batch details---------------------

const getDeactiveBatch = async (req,res)=>{
 
  const batchStatus = await student.find({ isBatchStatus:false}).select("batch_Number").distinct("batch_Number");
  // console.log(batchStatus);
  if(batchStatus.length>0){
    return res.status(200).json({

      status: "success",
  
      message: "List of inactive batch details",
  
      data:batchStatus
  })
    
  }else{
    return res.json({

      status: "failure",
  
      message: "No deactivated batch",
  
      data:[]
  })
  }
 
  
}

//----------------------------------














module.exports = {getAllBatch,detailOfaBatch,inActivateBatch,getActiveBatch,getDeactiveBatch}