const student = require('../model/studentSchema');







//----------------student prfile details-------------------------

const createProfile = async (req, res) => {

        const profileData = req.body;
        const { eMail } = profileData;
        const identifyStudent = await student.findOne({ eMail: eMail });
     
        if (eMail === identifyStudent.eMail) {
            identifyStudent.profile.push(profileData);
            await identifyStudent.save();
            res.status(200).json({ message: 'Profile saved successfully' });
        } else {
            res.status(400).json({ message: 'Bad request' });
        }

}

//--------------------student login---------------------------

const studentLogin = async (req, res) => {
   
        const { eMail, passWord } = req.body;
        // console.log(req.body)
        const identifyStudent = await student.findOne({ eMail: eMail });

        console.log(identifyStudent)
        if (!identifyStudent) {
            return res.json({
                status: "failure",
                message: "Wrong user"
            });
        } else if (passWord !== identifyStudent.passWord) {
            return res.json({
                status: "failure",
                message: "Wrong password"
            });
        } else {
            return res.status(200).json({
                status: "success",
                message: "User logged in successfully"
            });
        }

}

//----------------------  ------------------------











module.exports = { createProfile, studentLogin }