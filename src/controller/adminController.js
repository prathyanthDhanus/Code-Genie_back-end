

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


module.exports =  {adminLogin} ;
