
const {test,registerUser} =require('../controllers/authControllers')
const express=require('express');
const router=express.Router();
const cors=require('cors');


router.use(
	cors({
		credentials:true,
		origin:'http://localhost:5173'
	}

	)
)
router.get ('/',test);
router.post('/register',registerUser)

module.exports=router;