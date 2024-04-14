export interface hotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    rooms: roomItem[]
    reviews: reviewItem[],
    __v: number,
    id: string
  }
  
export interface hotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: hotelItem[]
}

export interface singleHotelJson {
  success: boolean,
  data: hotelItem
}
  
export interface BookingItem{
    _id: string,
    bookingbegin: string,
    bookingend: string,
    user: {
      name: string
    },
    room: {
      roomNumber: string
    },
    hotel: {
      _id: string,
      name: string
    }
  }

export interface BookingDetail{
  data: BookingItem
}

export interface roomItem {
  _id: string;
  roomNumber: string;
  price: number;
  maxOccupant: number;
  bookings: [];
  picture: string;
}

export interface reviewItem {
  _id: string;
  hotel: string;
  user: userItem;
  message: string;
  star: number;
  createdAt: string;
  __v: number;
  id: string;
}

export interface userItem {
  _id: string,
  name: string,
  email: string,
  role: string,
  __v: number,
  id: string
}