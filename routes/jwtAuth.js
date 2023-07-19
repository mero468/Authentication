const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtOperations');

//Signup Request
router.post('/signup', async (req, res) =>{
    try{
        // 1. destructure the request body
        const {username,email,password} = req.body;
        // 2. check if the user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        // 3. if the user exists, return an error
        if(user.rows.length>0){
            res.status(400).json({message: 'User already exists'});
            return;
        }
        // 4. Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. create the user
        await pool.query("INSERT INTO users ( user_name, user_email, user_password) VALUES ($1,$2,$3)",[username,email,hashedPassword]);
        // 6. return the user -> Generate Token
        const newUserCheck = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        if (newUserCheck) {
            // const token = jwtGenerator(newUserCheck.rows[0].user_id);
            res.status(201).json(newUserCheck.rows[0]);
        } else {
            res.status(400).json({message: 'User Creation failed'});
        }
    }
    catch(err){
        console.log(err);
            res.status(500).json(err);
    }
});

//Login Request
router.post('/login', async(req, res) => {
    try{
        // Destructuring username & password from body
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        if(user.rows.length>0){
            // 1. Decrypt the password
            bcrypt.compare(password, user.rows[0].user_password, function(err, result) {
                if(result){
                    //creating a access token
                    const accessToken = jwtGenerator.jwtAccessGenerator({email: email,
                        username: user.rows[0].user_name,});
                    // Creating refresh token not that expiry of refresh token is greater than the access token
                    const refreshToken = jwtGenerator.jwtRefreshGenerator({
                        email: email,
                        username: user.rows[0].user_name,
                    })
      
                    res.status(201).json({accessToken: accessToken, refreshToken: refreshToken});
                    return;   
                }
                else{
                    res.status(400).json({message: 'Invalid credentials'});
                    return;
                }
            });
        }
        else{
            res.status(400).json({message: 'User not Found'});
            return;
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
