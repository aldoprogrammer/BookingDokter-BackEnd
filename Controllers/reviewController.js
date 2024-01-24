import Review from '../models/ReviewSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const getAllReviews = async () => {
    try {
        const reviews = await Review.find({})

        res.status(200).json({status: true, message: 'Successfull', data: reviews})
    } catch (err) {
        res.status(404).json({status: false, message: 'Not found'})
    }
}


export const createReview = async (req, res) => {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.userId;

    const newReview = new Review(req.body);

    try {
        const savedReview = await newReview.save();

        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: {
                reviews: savedReview._id
            }
        })

        res.status(200).json({success: true, message: 'Successfull', data: savedReview})
    } catch (err) {
        res.status(500).json({success:false, message: err.message})
    }
}