const express = require('express');
const { Router } = express;
const { getByType, updateDonation, deleteDonation, getAllDonations, createDonation, donationByUserId ,getByuserId} = require("../Controllers/Donation")
const router = Router();
router.post('/create-blood-donation', createDonation);
router.post('/update-blood-donation', updateDonation);
router.get('/get-all-blood-donations', getAllDonations);
router.get('/delete-blood-donation/:donationId', deleteDonation);
router.get('/get-by-type/:bloodType', getByType);
router.post('/donation-by-UserId', donationByUserId);
router.get('/getByuserId/:userId', getByuserId);

module.exports = router;
