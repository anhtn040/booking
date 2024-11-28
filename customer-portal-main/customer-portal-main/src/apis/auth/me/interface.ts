export interface IUserResponse {
  email: string;
  fullname: string;
  gender: string;
  avatar: string;
}
export interface IUpdateInfoMe {
  gender: string;
  fullname: string;
  avatar: string;
}
export interface IHasPermission {
  avatar: string;
  hasPermission: boolean;
}
export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IBookingDetail {
  roomTypeId: number,
  quantity: number
}
export interface IBookingForm {
  residenceId: number,
  name: string,
  identifyId: string,
  email: string,
  phone: string,
  note: string,
  checkin: string,
  checkout: string,
  bookingDetail: IBookingDetail[]
}
export interface IRoomBooking {
  bookingId: number,
  roomTypeId: number,
  name: string,
  price:number,
  quantity: number
}
export interface IHotelBooking {
  bookingId: number,
  avatar: string,
  residenceId: number,
  residenceName: string,
  residencePhone: string,
  address:string,
  customerName: string,
  customerPhone: string,
  checkin: string,
  checkout: string,
  total: number,
  paid: boolean,
  status: string,
  note: string,
  createdAt: string,
  updatedAt: string,
  rating: number,
  comment: string,
  rooms: IRoomBooking[]
}

export interface IBookingResponse {
  data: IHotelBooking[],
  totalPage: number,
  totalElement: number,
  pageSize: number,
  currentPage: number
}

export interface IReviewRequest {
  bookingId: number,
  rating: number,
  comment: string
}