const bloodNeedModel = require("../Modal/BloodNeed");




module.exports.createBloodNeed = async (req, res) => {
    const { userId, bloodType, location, contactNumber, reasonForRequest } = req.body;
    try {
        if (!userId || !bloodType || !location) {
            return res.json({ status: false, message: "userId, bloodType and location are required" });
        }
        const newBloodNeed = new bloodNeedModel({
            userId, bloodType, location, contactNumber, reasonForRequest, requestDate: new Date()
        });
        await newBloodNeed.save();
        return res.json({ status: true, message: "Blood need request created successfully", bloodNeed: newBloodNeed });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }

}

module.exports.getAllBloodNeeds = async (req, res) => {
    try {
        const bloodNeeds = await bloodNeedModel.find({ isReceived: false })
            .populate('userId', 'username email phoneno bloodType');
        return res.json({ status: true, bloodNeeds });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.deleteBloodNeed = async (req, res) => {
    const { bloodNeedId } = req.params;
    try {
        const bloodNeed = await bloodNeedModel.findById(bloodNeedId);
        if (!bloodNeed) {
            return res.json({ status: false, message: "Blood need request not found" });
        }
        await bloodNeedModel.findByIdAndDelete(bloodNeedId);
        return res.json({ status: true, message: "Blood need request deleted successfully" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.updateBloodNeed = async (req, res) => {
    const { bloodNeedId, bloodType, location, contactNumber, reason } = req.body;
    try {
        const bloodNeed = await bloodNeedModel.findById(bloodNeedId);
        if (!bloodNeed) {
            return res.json({ status: false, message: "Blood need request not found" });
        }
        const updatedData = {};
        if (bloodType) updatedData.bloodType = bloodType
        if (location) updatedData.location = location

        if (contactNumber) updatedData.contactNumber = contactNumber
        if (reason) updatedData.reasonForRequest = reason
        const updatedBloodNeed = await bloodNeedModel.findByIdAndUpdate(bloodNeedId, updatedData, { new: true });
        return res.json({ status: true, message: "Blood need request updated successfully", bloodNeed: updatedBloodNeed });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getById = async (req, res) => {
    const { bloodNeedId } = req.params;
    try {
        const bloodNeed = await bloodNeedModel.findById(bloodNeedId).populate('userId', 'username email phoneno bloodType');
        if (!bloodNeed) {
            return res.json({ status: false, message: "Blood need request not found" });
        }
        return res.json({ status: true, bloodNeed });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}


module.exports.markAsReceived = async (req, res) => {
    const { bloodNeedId } = req.body;
    try {
        const bloodNeed = await bloodNeedModel.findById(bloodNeedId);
        if (!bloodNeed) {
            return res.json({ status: false, message: "Blood need request not found" });
        }
        bloodNeed.isReceived = true;
        await bloodNeed.save();
        return res.json({ status: true, message: "Blood need request marked as received", bloodNeed });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}




