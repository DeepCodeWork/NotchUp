exports.handler = (req, res, next) => {
    const { parentEmail, parentName, studentName, courseDate} = req.body;
    
    if(parentEmail.length === 0  || parentName.length === 0  || studentName.length === 0  || courseDate.length === 0 ){
        return res.status(400).json({message: 'Invalid Request'})
    }

    next();
}