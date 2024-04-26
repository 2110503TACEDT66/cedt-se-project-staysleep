FROM mongo:latest

WORKDIR /tmp

COPY bookings.json .
COPY hotels.json .
COPY replies.json .
COPY reviews.json .
COPY rooms.json .
COPY tags.json .
COPY users.json .

CMD mongoimport --host db --db HotelReservation --collection bookings --type json --file bookings.json --jsonArray && \
    mongoimport --host db --db HotelReservation --collection hotels --type json --file hotels.json --jsonArray && \
    mongoimport --host db --db HotelReservation --collection replies --type json --file replies.json --jsonArray && \
    mongoimport --host db --db HotelReservation --collection reviews --type json --file reviews.json --jsonArray && \
    mongoimport --host db --db HotelReservation --collection rooms --type json --file rooms.json --jsonArray && \
    mongoimport --host db --db HotelReservation --collection tags --type json --file tags.json --jsonArray && \
    mongoimport --host db --db HotelReservation --collection users --type json --file users.json --jsonArray