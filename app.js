const express = require('express');
const router = express();

router.use("/user", require("./Router/userRouter"));
router.use("/donation", require("./Router/BloodDonation"));
router.use("/bloodNeed", require("./Router/BloodNeed"));


module.exports = router;
