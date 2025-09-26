const express = require('express');
const { Router } = express;
const { createBloodNeed, updateBloodNeed, getAllBloodNeeds, deleteBloodNeed, getById,markAsReceived } = require('../Controllers/BloodNeed');
const router = Router();

router.post('/create-blood-need', createBloodNeed);
router.post('/update-blood-need', updateBloodNeed);
router.get('/get-all-blood-needs', getAllBloodNeeds);
router.get('/delete-blood-need/:bloodNeedId', deleteBloodNeed);
router.get('/get-by-blood-needId/:bloodNeedId', getById);
router.post('/mark-Received', markAsReceived);

module.exports = router;


