const UserProfile = require('../model/UserProfileModel');
const User = require('../model/Usermodel');
const { Op } = require('sequelize');

// Create or Update User Profile
exports.createOrUpdateProfile = async (req, res) => {
    try {
        const { 
            user_id, 
            full_name, 
            mobile_number, 
            email, 
            company_name, 
            credit_limit, 
            address, 
            pincode, 
            landmark, 
            city, 
            state 
        } = req.body;

        const userExists = await User.findByPk(user_id);
        if (!userExists) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const existingProfile = await UserProfile.findOne({
            where: {
                [Op.or]: [{ mobile_number }, { email }],
                user_id: { [Op.ne]: user_id }
            }
        });

        if (existingProfile) {
            return res.status(400).json({ 
                success: false, 
                message: 'Mobile number or email already in use by another profile' 
            });
        }

        const [profile, created] = await UserProfile.findOrCreate({
            where: { user_id },
            defaults: { user_id, full_name, mobile_number, email, company_name, credit_limit, address, pincode, landmark, city, state }
        });

        if (!created) {
            await profile.update({ full_name, mobile_number, email, company_name, credit_limit, address, pincode, landmark, city, state });
        }

        const updatedProfile = await UserProfile.findOne({ 
            where: { user_id },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.status(created ? 201 : 200).json({
            success: true,
            message: created ? 'Profile created successfully' : 'Profile updated successfully',
            profile: updatedProfile
        });

        if (full_name && userExists.username !== full_name) {
            await userExists.update({ username : full_name });
        }
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the profile', error: error.message });
    }
};

// // Get User Profile by User ID
exports.getAllProfiles = async (req, res) => {
    try {
        const profile = await UserProfile.findAll();
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profiles not found' });
        }

        res.status(200).json({ success: true, profile });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the profile', error: error.message });
    }
};

// // Partial Update Profile
// exports.partialUpdateProfile = async (req, res) => {
//     try {
//         const { user_id } = req.params;
//         const updateData = req.body;

//         const userExists = await User.findByPk(user_id);
//         if (!userExists) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         if (updateData.mobile_number || updateData.email) {
//             const existingProfile = await UserProfile.findOne({
//                 where: {
//                     [Op.or]: [
//                         { mobile_number: updateData.mobile_number },
//                         { email: updateData.email }
//                     ],
//                     user_id: { [Op.ne]: user_id }
//                 }
//             });

//             if (existingProfile) {
//                 return res.status(400).json({ success: false, message: 'Mobile number or email already in use by another profile' });
//             }
//         }

//         const profile = await UserProfile.findOne({ where: { user_id } });

//         if (!profile) {
//             return res.status(404).json({ success: false, message: 'Profile not found' });
//         }

//         await profile.update(updateData);

//         const updatedProfile = await UserProfile.findOne({ 
//             where: { user_id },
//             attributes: { exclude: ['createdAt', 'updatedAt'] }
//         });

//         res.status(200).json({ success: true, message: 'Profile updated successfully', profile: updatedProfile });
//     } catch (error) {
//         console.error('Partial update error:', error);
//         res.status(500).json({ success: false, message: 'An error occurred while updating the profile', error: error.message });
//     }
// };

// // Delete User Profile
// exports.deleteProfile = async (req, res) => {
//     try {
//         const { user_id } = req.params;

//         const userExists = await User.findByPk(user_id);
//         if (!userExists) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const deletedCount = await UserProfile.destroy({ where: { user_id } });

//         if (deletedCount === 0) {
//             return res.status(404).json({ success: false, message: 'Profile not found' });
//         }

//         res.status(200).json({ success: true, message: 'Profile deleted successfully' });
//     } catch (error) {
//         console.error('Delete profile error:', error);
//         res.status(500).json({ success: false, message: 'An error occurred while deleting the profile', error: error.message });
//     }
// };

