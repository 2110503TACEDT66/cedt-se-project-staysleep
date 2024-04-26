# Change this to your own mongodb uri
MONGO_URI="mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"

# export all collection
mongoexport --db HotelReservation --collection bookings --uri $MONGO_URI --out bookings.json --jsonArray
mongoexport --db HotelReservation --collection hotels --uri $MONGO_URI --out hotels.json --jsonArray
mongoexport --db HotelReservation --collection replies --uri $MONGO_URI --out replies.json --jsonArray
mongoexport --db HotelReservation --collection reviews --uri $MONGO_URI --out reviews.json --jsonArray
mongoexport --db HotelReservation --collection rooms --uri $MONGO_URI --out rooms.json --jsonArray
mongoexport --db HotelReservation --collection tags --uri $MONGO_URI --out tags.json --jsonArray
mongoexport --db HotelReservation --collection users --uri $MONGO_URI --out users.json --jsonArray