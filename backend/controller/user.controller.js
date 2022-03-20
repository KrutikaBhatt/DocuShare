const user = async(req,res) => {
    try{
        return res.status(200).send("Hello")
    }catch(error){
        console.log(error);
        return res.status(500).send("Some error occurred. Please refresh and try again")
    }
}


var userController = {
    user : user
};

module.exports = userController;