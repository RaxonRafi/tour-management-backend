import { model, Schema } from "mongoose";
import { BOOKING_STATUS, IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
    user: {
        type: Schema.ObjectId,
        ref:"User",
        required: true,
    },
    tour: {
        type: Schema.ObjectId,
        ref:"Tour",
        required: true,
    },
    payment: {
        type: Schema.ObjectId,
        ref:"Payment",
    },
    status: {
        type: String,
        enum: Object.values(BOOKING_STATUS),
        default: BOOKING_STATUS.PENDING,
    },
    guestCount: {
        type: Number,
        required: true
    }

},{
    timestamps: true
})

export const Booking = model<IBooking>("Booking",bookingSchema)