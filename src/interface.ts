export interface hotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    room: roomItem[]
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
  user: string;
  message: string;
  star: number;
  __v: number;
  id: string;
}