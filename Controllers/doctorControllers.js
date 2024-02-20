import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js"


export const updateDoctor = async (req, res) => {
    const id = req.params.id

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: req.body},
            { new: true }
        )
        // console.log(updatedDoctor);


        res
            .status(200)
            .json({
                 success: true,
                 message: 'Doctor updated successfully',
                 data: updatedDoctor
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({status: false, message: 'failed to update Doctor'})
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id

    try {
        const deleteDoctor = await Doctor.findByIdAndDelete(
            id,
            
        )

        res
            .status(200)
            .json({
                 success: true,
                 message: 'Doctor deleted successfully',
            })
    } catch (err) {
        res
            .status(500)
            .json({
                status: false, 
                message: 'failed to deleted Doctor'
            })
    }
}

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id)
        .populate("reviews")
        .select("-password");

        res.status(200).json({
            success: true,
            message: 'Doctor Found',
            data: doctor,
        });
    } catch (err) {
        
        res.status(404).json({ status: false, message: 'No Doctor found' });
    }
};


export const getAllDoctor = async (req, res) => {

    try {
        const { query } = req.query;
        let doctors;

        if(query) {
            doctors = await Doctor.find({ 
                isApproved: 'approved',
                $or: [
                {name: { $regex: query, $options: 'i' } },
                {specialization: { $regex: query, $options: "i"}},
            ],
            }).select("-password")
        } else {
        doctors = await Doctor.find({ isApproved: "approved"}).select(
            "-password"
            )
        }

        res
            .status(200)
            .json({
                 success: true,
                 message: 'Doctors FOund',
                 data: doctors
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

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId;

    try {
        const doctor = await Doctor.findById(doctorId)

        if(!doctor) {
            return res.status(404).json({
                status: false, 
                message: 'no doctor found'
            })
        }

        const { password, ...rest} = doctor.toObject();
        const appointments = await Booking.find({doctor: doctorId })

        res
         .status(200)
         .json({
                status: true,
                message: 'Profile info is getting',
                data: {...rest, appointments}
            })
    } catch (err) {
        res.status(500).json({
            status: false, 
            message: 'something went wrong'
        })
    }
}