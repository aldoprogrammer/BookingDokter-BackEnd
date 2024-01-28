import User from "../models/UserSchema.js"
import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"


export const updateUser = async (req, res) => {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body},
            { new: true }
        )

        res
            .status(200)
            .json({
                 success: true,
                 message: 'User updated successfully',
                 data: updatedUser
            })
    } catch (err) {
        res.status(500).json({status: false, message: 'failed to update user'})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        const deleteUser = await User.findByIdAndDelete(
            id,
            
        )

        res
            .status(200)
            .json({
                 success: true,
                 message: 'User deleted successfully',
            })
    } catch (err) {
        res
            .status(500)
            .json({
                status: false, 
                message: 'failed to deleted user'
            })
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(
            id,
        ).select("-password")

        res
            .status(200)
            .json({
                 success: true,
                 message: 'User Found',
                 data: user
            })
    } catch (err) {
        res.status(404).json({status: false, message: 'no user found'})
    }
}

export const getAllUser = async (req, res) => {

    try {
        const users = await User.find({}).select("-password")

        res
            .status(200)
            .json({
                 success: true,
                 message: 'Users FOund',
                 data: users
            })
    } catch (err) {
        res
            .status(404)
            .json({
                status: false, 
                message: 'no found'
            })
    }
}

export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user found',
            });
        }

        const { password, ...rest } = user.toObject(); // Use toObject() to convert the Mongoose document to a plain JavaScript object.

        res.status(200).json({
            success: true,
            message: 'Profile info is getting',
            data: { ...rest },
        });
    } catch (err) {
        console.error('Error in getUserProfile:', err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};



export const getMyAppointments = async (req, res) => {
    try {
        const bookings = await Booking.find({user:req.userId});

        const doctorIds = bookings.map(el=>el.doctor.id);

        const doctors = await Doctor.find({_id: {$in: doctorIds}}).select('-password');

        res
       .status(200)
       .json({
                status: true,
                message: 'Appointments is getting',
                data: doctors
            })

    } catch (err) {
         res.status(500).json({
            status: false, 
            message: 'something went wrong'
        })
    }
}