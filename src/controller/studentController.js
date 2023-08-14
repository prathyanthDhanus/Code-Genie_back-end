const student = require('../model/studentSchema');







//----------------student prfile details-------------------------

const profileDetails = async (req,res)=>{
    console.log(req.body)
    try{
        console.log("hai");
        const profileData = req.body;
        const newProfile = new student(profileData);
        await newProfile.save()
        res.status(200).json({ message: 'Profile saved successfully' });

    }catch(error){
        res.status(500).json({error: 'An error occurred while saving the profile'})
        console.log('hello');
    }
}












module.exports = {profileDetails}