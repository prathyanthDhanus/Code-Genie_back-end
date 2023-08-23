const student = require("../model/studentSchema")


//--------------------------admin login---------------------------------

const adminLogin = async (req, res) => {

    const username = process.env.ADMIN_USERNAME      //requiring username and password from .env
    const password = process.env.ADMIN_PASSWORD

    const USERNAME = req.body.username
    const PASSWORD = req.body.password

    if (username == USERNAME && password == PASSWORD) {
        
        // const token = jwt.sign({ username }, "adminscrtkey", { expiresIn: "24h" })
        return res.status(200).json({

            status: "success",
            message: "Admin logged in successfully",
            // token
        });
    }

    res.json({
        status: "failure",
        message: "Wrong username or password",
        error_message: "username or password mismatch"
    })

}

//------------------------admin_student-registration--------------------------

const studentRegister = async (req,res)=>{
    try{
// const student = [];
const { userName, batch_Number, passWord,eMail } = req.body;
console.log(req.body)

if (!userName || !batch_Number || !passWord || !eMail) {
    return res.status(400).json({ message: 'All fields are required.' });
}

// Check if username is already taken
// if (eMail == eMail || passWord == passWord) {
//     return res.status(400).json({ message: 'Username, batch number, or password already exist.' });
// }
const identifyStudent = await student.findOne({
    $or: [
      { eMail: eMail },
      { passWord: passWord }
    ]
  });
  if(identifyStudent){
    return res.json({

        status: "failure",
  
        message: "user already exist"
      })
  }
// Create a new user object and add to the users array
const newStudent = new student({ userName:userName,eMail:eMail, batch_Number:batch_Number, passWord:passWord });
await newStudent.save()

// You might want to hash the password before storing it in a real-world scenario

return res.status(201).json({ message: 'User registered successfully.' });

}catch(error){
        res.status(500).json({error: 'An error occurred while saving the profile'})
    }
    
}

module.exports =  {adminLogin,studentRegister} ;
