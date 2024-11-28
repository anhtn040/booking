export interface IResidenceBanner {
  residenceId: number;
  name: string;
  address: string;
  type: string;
  roomQuantity: number;
  priceMin: number;
  rating: number;
  reviews: number;
  avatar: string;
}
export interface IResidenceResponse {
  data: IResidenceBanner[],
  totalPage: number;
  totalElement: number;
  pageSize: number;
  currentPage: number;
}
export interface IResidenceInfo {
  residenceId: number,
  name: string,
  address: string,
  description: string,
  lat: number,
  lon: number,
  checkin: string,
  checkout: string,
  rating: number,
  reviews: number,
  type: string,
  facilities: [
    {
      amenitiesId: number,
      amenitiesCode: string,
      amenitiesName: string,
      icon: string
    }
  ]
}
export interface IRoomBanner {
  roomTypeId: number,
  name: string,
  beds: number,
  area: number,
  quantity: number,
  price: number,
  images: string[]
}
export interface IRoomSelected {
  roomTypeId: number,
  name: string,
  maxQuantity: number,
  currentQuantity: number,
  price: number
}
export interface ICartStorage {
  expiry: number,
  checkin: string,
  checkout: string,
  residenceId: number,
  roomList: IRoomSelected[]
}

export interface IComment {
  reviewId: number,
  bookingId: number,
  residenceId: number,
  name: string,
  avatar: string,
  comment: string,
  rating: number,
  createdAt: string
}
export interface ICommentResponse {
  data: IComment[],
  totalPage: number,
  totalElement: number,
  pageSize: number,
  currentPage: number
}