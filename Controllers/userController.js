const userModal = require("../Modal/userModal");

module.exports.craeteUser = async (req, res) => {
    const { username, password, phoneno, email, gender } = req.body;
    try {
        if (!username) {
            return res.json({ status: false, message: "Name is required" });
        }
        const newUser = new userModal({ username, password, phoneno, email, gender });
        await newUser.save();
        res.json({ status: true, message: "User created successfully", user: newUser });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.updateUser = async (req, res) => {
    const { userId, username, password, phoneno, email, gender } = req.body;
    try {

        const user = await userModal.findById(userId);
        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }
        const updatedData = {};
        if (username) updatedData.username = username
        if (password) updatedData.password = password
        if (phoneno) updatedData.phoneno = phoneno
        if (email) updatedData.email = email
        if (gender) updatedData.gender = gender


        const updatedUser = await userModal.findByIdAndUpdate(userId, updatedData, { new: true });
        return res.json({ status: true, message: "User updated successfully", user: updatedUser });

    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModal.find();
        return res.json({ status: true, users });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModal.findById(userId);
        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }
        await userModal.findByIdAndDelete(userId);
        return res.json({ status: true, message: "User deleted successfully" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModal.findById(userId);
        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }
        return res.json({ status: true, user });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });

    }
}

module.exports.login = async (req, res) => {
    const { phoneno, password } = req.body;
    try {
        if (!phoneno || !password) {
            return res.json({ status: false, message: "phoneno and password are required" });
        }
        const user = await userModal.find
            ({ phoneno, password });
        if (user.length === 0) {
            return res.json({ status: false, message: "Invalid phoneno or password" });
        }
        return res.json({ status: true, message: "Login successful", user: user[0] });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.uniqueMobileNumber = async (req, res) => {
    const { phoneno } = req.body;
    try {
        if (!phoneno) {
            return res.json({ status: false, message: "phoneno is required" });
        }
        const user = await userModal.find({ phoneno });
        if (user.length > 0) {
            return res.json({ status: false, message: "phoneno already exists" });
        }
        return res.json({ status: true, message: "phoneno is unique" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.updateUserBloodType = async (req, res) => {
    const { userId, bloodType } = req.body;
    try {
        const user = await userModal.findById(userId);
        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }
        user.bloodType = bloodType;
        await user.save();
        return res.json({ status: true, message: "Blood type updated successfully", user });

    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}





