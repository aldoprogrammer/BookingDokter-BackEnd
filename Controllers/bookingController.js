import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'
import Stripe from 'stripe'

export const getCheckoutSession = async (req, res) => {
    
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.userId);

        if (!doctor || isNaN(doctor.ticketPrice)) {
            throw new Error('Invalid doctor or ticket price');
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        unit_amount: doctor.ticketPrice * 100, 
                        product_data: {
                            name:doctor.name,
                            description:doctor.bio,
                            images:[doctor.photo]
                        }
                    },
                    quantity: 1
                }
            ]
        });

        const booking = new Booking({
            doctor:doctor._id,
            user:user._id,
            ticketPrice:doctor.ticketPrice,
            session:session.id
        });

        await booking.save();
        res.status(200).json({
            success: true,
            message: 'Paid successfully',
            session
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message,
            
        });
    }
}
