const Topic = require("../model/topicSchema")
const Domain = require("../model/domainSchema")

//-------------------------------create topic-----------------------------------

// const createTopic = async (req,res)=>{
  
//     const topicData = req.body;
// console.log(topicData);

//     const newTopic = new topic(topicData)
//     await newTopic.save()

//     return res.status(201).json({ message: 'Topic saved successfully.' });
// }

const createTopic = async (req,res)=>{
    // console.log("jj");
    const { domainName, topicCategory, ...topicData } = req.body;
// console.log(req.body);
    // First, create a Domain if it doesn't exist
    let domain = await Domain.findOne({ name: domainName });
// console.log(domain);
    if (!domain) {
      domain = new Domain({ name: domainName });
      await domain.save();
    }

    // Create a new Topic with the reference to the Domain
    const topic = new Topic({
      domain: domain._id, // Reference to the Domain schema
      category: topicCategory,
      ...topicData,
    });

    await topic.save();
    
    res.status(201).json({ message: 'Topic created successfully' });
}

//-----------------------------get Domains--------------------------------------

// const viewDomain = async (req,res)=>{
//     console.log("lll");
//     const domain = await Domain.distinct("name") 
//     // const domain = await Domain.find()
//     console.log(domain)
   
//     return res.status(200).json({

//         status: "success",

//         message: "List of domain Details",

//         data: domain
//     })
// }

const viewDomain = async (req,res)=>{
const uniqueDomainsWithIds = await Domain.aggregate([
    {
        $group: {
            _id: '$name',
            category: { $addToSet: '$category' },
            ids: { $addToSet: '$_id' },
      },
    },
  ]);

  // Extract the unique domain names and their corresponding document IDs
  const domain = uniqueDomainsWithIds.map((group) => ({
    
    name: group._id,
    category: group.category,
    ids: group.ids,
  }));
  // console.log(domain);
  return res.status(200).json({

            status: "success",
    
            message: "List of domain Details",
    
            data: domain
        })
}

//-------------------------------get category--------------------------------

const viewCategory = async (req,res)=>{
    const domainId = req.params.id;
// console.log(domainId);
    // Find all topics that belong to the specified domain
    const topics = await Topic.find({ domain: domainId })
      // .populate('domain') // Populate the 'domain' field to get the domain details
      // .exec();
// console.log(topics);
    if (!topics) {
      return res.status(404).json({ message: 'No topics found for the specified domain' });
    }

    res.status(200).json({ 
        status: "success",
    
        message: "List of topic Details",

        data: topics
     });
}

//------------------------------get topic--------------------------------

const getTopicName = async (req,res)=>{
    const topicid = req.params.id;
    console.log(topicid);
    const topicName = await Topic.findById(topicid).populate('domain')
    console.log(topicName)
    res.status(200).json({ 
      status: "success",
  
      message: "List of topic Details",

      data: topicName
   });

}

//----------------------------update topic------------------------------

// const updateTopic =  async (req,res)=>{

//   const topicid = req.params.id;
//   const data = req.body;
//   const topicName = await Topic.findByIdAndUpdate(topicid,data,{new:true})
//   res.json({

//     status: "success",

//     message: "Topic updated successfully",

//     data: topicName
// })
// }

const updateTopic =  async (req,res)=>{
  const { domainName, topicCategory, ...topicData } = req.body;
  const topicId = req.params.id;
  const topic = await Topic.findById(topicId);

  // Check if the domain name needs to be updated
  if (topic.domain.name !== domainName) {
    let domain = await Domain.findOne({ name: domainName });

    if (!domain) {
      domain = new Domain({ name: domainName });
      await domain.save();
    }

    topic.domain = domain._id;
  }

  // Update the topic properties based on req.body
  topic.category = topicCategory;
  // Update other topic properties based on topicData

  // Save the updated topic
  const updatedTopic = await topic.save();

  res.status(200).json({
    status: "success",
    message: "Topic updated successfully",
    data: updatedTopic,
  });
}

//------------------------------delete a topic--------------------------

const deleteTopic = async (req,res)=>{
  const topicid = req.params.id;
  const identifyTopic = await Topic.findByIdAndDelete(topicid);
   return res.json({

    status: "success",

    message: "Topic Deleted successfully",

    data: identifyTopic
})
}



module.exports = {createTopic,viewDomain,viewCategory,getTopicName,updateTopic,deleteTopic} 