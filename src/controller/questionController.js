const question = require("../model/questionSchema")
const Domain = require("../model/domainSchema")

//---------------------------------create questions-------------------------------

const createQuestions = async (req, res) => {
  const { questions, domainName } = req.body;

  // console.log(req.body);
  // console.log(questions);

  const findQuestions = await question.findOne({ questions: questions });
  const domain = await Domain.findOne({ name: domainName })
  // console.log(findQuestions);
  // console.log(domain);


  if (!findQuestions) {

    const newQuestion = new question({
      domain: domain._id,
      week: req.body.week,
      category: req.body.category,
      questions: questions,
      optionA: req.body.optionA,
      optionB: req.body.optionB,
      optionC: req.body.optionC,
      correctAnswer: req.body.correctAnswer
    });
    // console.log(newQuestion);
    await newQuestion.save();
    return res.status(201).json({ message: 'Question created successfully' });
  }
  // If the question already exists, return a 400 status
  return res.status(400).json({ message: 'Question already exists' });

};


//-------------------------------get all questions---------------------------

const getQuestionsbyCategory = async (req, res) => {
  const domainId = req.params.id
  // console.log(domainId);
  const findCategory = await question.find({ domain: domainId }).populate('domain')
  // console.log(findCategory);

  if (!findCategory || findCategory.length === 0){
    return res.status(203).json({

      status: "Failure",

      message: "No question available"

    })
  
  }else{
    return res.status(200).json({

      status: "Success",
  
      message: "List of questions",
  
      data: findCategory
  
    })
  }
  
}

//--------------------------update quesyions------------------------------

const updateQuestions = async (req,res)=>{
  const questionId = req.params.id
  const questionData = req.body
  console.log(questionId);
 const findQuestion = await question.findByIdAndUpdate(questionId,questionData,{new:true})
return  res.json({

  status: "success",

  message: "Question updated successfully",

  data: findQuestion
})
 

}




//---------------------------delete questions---------------------------

const deleteQuestions = async (req, res) => {
  const questionId = req.params.id
  console.log(questionId);
console.log("jkjk");
  const findQuestions = await question.findByIdAndDelete(questionId)
  console.log(findQuestions);
  return res.status(200).json({

    status: "Success",

    message: "Question deleted successfully",

    data: findQuestions

  })


}


module.exports = { createQuestions, getQuestionsbyCategory, updateQuestions, deleteQuestions }
