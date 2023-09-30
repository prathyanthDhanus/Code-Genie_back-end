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
    
const { domainName, topicCategory, ...topicData } = req.body;
console.log(req.body);

    // First, create a Domain if it doesn't exist
    let domain = await Domain.findOne({ name: domainName });
    console.log(domain)

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

//-----------------------------view Domains--------------------------------------

const viewDomain = async (req,res)=>{
    // console.log("lll");
    // const Domain = await topic.distinct("domain") 
    const Domain = await topic.find()
    // console.log(Domain)
   
    return res.status(200).json({

        status: "success",

        message: "List of domain Details",

        data: Domain
    })
}

module.exports = {createTopic,viewDomain}