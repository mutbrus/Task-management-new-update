const{ Router } = require('express');

const auth = require('../controllers/auth')
const m = require('../middlewares/middleware')
const router = Router();

router.post('/get_login', m.db, auth.get_login);
module.exports = router;