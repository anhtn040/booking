import { EResidence, EService } from "./enum";

export function residenceToValue(residence: EResidence): string {
  switch (residence) {
    case EResidence.HOTEL:
      return "Khách sạn";
    case EResidence.HOMESTAY:
      return "Homestay";
    case EResidence.VILLA:
      return "Villa";
    case EResidence.HOME:
      return "Nhà nguyên căn";
    default:
      return "Khách sạn";
  }
}

export function residenceToValueList() {
  return Object.values(EResidence).map(type => residenceToValue(type));
}

export function serviceToValue(service: EService): string {
  switch (service) {
    case EService.HDV:
      return "Hướng dẫn viên";
    case EService.HONTRANH:
      return "Tour Hòn Tranh";
    case EService.BAICAN:
      return "Tour Bãi cạn";
    default:
      return "Hướng dẫn viên";
  }
}