const donationModal = require("../Modal/bloodDonation");
const bloodNeedModel = require("../Modal/BloodNeed");


module.exports.createDonation = async (req, res) => {
    const { userId, bloodType, location, contactNumber, documentFile, lastDonationDate } = req.body;
    try {
        if (!userId || !location) {
            return res.json({ status: false, message: "userId and location are required" });
        }

        const existingDonation = await donationModal.findOne({ userId });

        if (existingDonation) {
            return res.json({ status: false, message: "You have already registered a donation. Please update it if needed." });
        }
        const newDonation = new donationModal({ userId, bloodType, location, contactNumber, documentFile, lastDonationDate });
        await newDonation.save();
        res.json({ status: true, message: "Donation record created successfully", donation: newDonation });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getAllDonations = async (req, res) => {
    try {
        const donations = await donationModal.find({
            $or: [
                { lastDonationDate: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 3)) } },
                { lastDonationDate: null }
            ]
        }).populate('userId', 'username email phoneno bloodType');

        return res.json({ status: true, donations });
    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
};

module.exports.deleteDonation = async (req, res) => {
    const { donationId } = req.params;
    try {
        const donation = await donationModal.findById(donationId);
        if (!donation) {
            return res.json({ status: false, message: "Donation record not found" });
        }

        await donationModal.findByIdAndDelete(donationId);
        return res.json({ status: true, message: "Donation record deleted successfully" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.updateDonation = async (req, res) => {
    const { donationId, bloodType, location, contactNumber, documentFile, lastDonationDate } = req.body;
    try {
        const donation = await donationModal.findById(donationId);
        if (!donation) {
            return res.json({ status: false, message: "Donation record not found" });
        }
        const updatedData = {};
        if (location) updatedData.location = location
        if (contactNumber) updatedData.contactNumber = contactNumber
        if (documentFile) updatedData.documentFile = documentFile
        if (bloodType) updatedData.bloodType = bloodType
        if (lastDonationDate) updatedData.lastDonationDate = lastDonationDate

        const updatedDonation = await donationModal.findByIdAndUpdate(donationId, updatedData, { new: true });
        return res.json({ status: true, message: "Donation record updated successfully", donation: updatedDonation });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getByType = async (req, res) => {
    const { bloodType,location } = req.body;
    try {

        const donations = await donationModal.aggregate([
            {
                $match: {
                    $or: [
                        { lastDonationDate: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 3)) } },
                        { lastDonationDate: null }
                    ],
                    bloodType: bloodType,
                    location:location
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $project: {
                    location: 1,
                    contactNumber: 1,
                    documentFile: 1,
                    lastDOnationDate: 1,
                    userDetails: { username: 1, email: 1, phoneno: 1, bloodType: 1 }
                }
            }
        ])
        return res.json({ status: true, donations });

    } catch (err) {
        return res.json({ message: "Server error", error: err.message });
    }
}

module.exports.donationByUserId = async (req, res) => {
    const { userId, bloodNeedId, donationId } = req.body;
    try {
        console.log(userId, bloodNeedId, donationId);

        const donation = await donationModal.findOne({ _id: donationId });
        console.log(donation);

        if (!donation) {
            return res.json({ status: false, message: "Donation record not found for this user" });
        }

        let donationData = {
            bloodNeedId,
            donationDate: new Date(Date.now() + 19800000)
        }
        donation.donatedHistory.push(donationData);

        await donation.save();

        // Also update the BloodNeed model to add this donation reference
        const bloodNeed = await bloodNeedModel.findByIdAndUpdate(
            bloodNeedId,
            { $push: { donationBy: userId } },
            { new: true } // returns the updated document
        );
        console.log(bloodNeedId);
        let data = await bloodNeedModel.findById(bloodNeedId)
            .populate('donationBy', 'username email phoneno bloodType');

        console.log(data);

        return res.json({ status: true, message: "Donation history updated successfully", donation });

    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getByuserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const donation = await donationModal.find({ userId }).populate('userId', 'username email phoneno bloodType');
        if (!donation) {
            return res.json({ status: false, message: "Donation record not found for this user" });
        }
        return res.json({ status: true, donation });
    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }

}


