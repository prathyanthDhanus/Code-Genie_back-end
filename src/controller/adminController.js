const student = require("../model/studentSchema")


//--------------------------admin login---------------------------------

const adminLogin = async (req, res) => {

    const username = process.env.ADMIN_USERNAME      //requiring username and password from .env
    const password = process.env.ADMIN_PASSWORD
    //  console.log(username);
    const USERNAME = req.body.userName
    
    const passWord = req.body.passWord

    if (username === USERNAME && password === passWord) {

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

const studentRegister = async (req, res) => {
   
        const { userName, batch_Number, passWord, eMail } = req.body;
        // console.log(req.body)

        if (!userName || !batch_Number || !passWord || !eMail) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        
        const identifyStudent = await student.findOne({ eMail: eMail })
        // console.log(identifyStudent)
        if (identifyStudent) {
            return res.json({

                status: "failure",

                message: "user already exist"
            })
        }
        // Create a new user object and add to the users array
        const newStudent = new student({ userName: userName, eMail: eMail, batch_Number: batch_Number, passWord: passWord });
        await newStudent.save()

        // You might want to hash the password before storing it in a real-world scenario

        return res.status(201).json({ message: 'User registered successfully.' });

}

//--------------------------get all students-------------------------------------

const getAllStudents = async (req, res) => {
    const identifyStudent = await student.find()
    return res.status(200).json({

        status: "success",

        message: "List of students",

        data: identifyStudent
    })

}

//----------------------get student by id--------------------------------------

const getStudentsbyId = async (req,res)=>{
    const studentId = req.params.id;
    const identifyStudent = await student.findById(studentId);
    if(studentId){
        return res.json({
 
             status: "success",
 
             message: "Student details",
 
             data: identifyStudent
         })
     }
     res.json({status:"failure",message:"user id is incorrect"})

}



module.exports = { adminLogin, studentRegister, getAllStudents,getStudentsbyId };
