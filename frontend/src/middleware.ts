export {default} from 'next-auth/middleware'

export const config = {
    matcher: ["/bookings", "/hotel/[hid]/page"],
};