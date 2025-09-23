const express = require('express');
const router = express();

router.use("/user", require("./Router/userRouter"));


module.exports = router;
