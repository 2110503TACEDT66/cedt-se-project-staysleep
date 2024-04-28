export default function canReply(userProfile: any, hotelID: string) {
    const role = userProfile.role;
    if (role === 'admin') return true;
    if (role === 'staff' && userProfile.hotel === hotelID) return true;
    return false;
}
