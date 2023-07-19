const router = require('express').Router();
const pool = require('../db');
const authorize = require('../middleware/authorize');


/* GET users listing. */
router.get('/',authorize, async (req, res) => {
  try {
    console.log(req.cookies);
    const users = await pool.query('SELECT * FROM users');
    res.json({users : users.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

// router.post('/', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const newUser = await pool.query(
//       'INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *'
//       , [req.body.name, req.body.email, hashedPassword]);
//     res.json(jwtTokens(newUser.rows[0]));
//   } catch (error) {
//     res.status(500).json({error: error.message});
//   }
// });

// router.delete('/', async (req,res)=>{
//   try {
//     const users = await pool.query('DELETE FROM users');
//     res.status(204).json(users.rows);
//   } catch (error) {
//     res.status(500).json({error: error.message});
//   }
// })
