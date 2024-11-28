import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";

// const megaMenuDemo: MegamenuItem[] = [
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "Nơi ở",
//     items: __servicemenu.hotel.map((i) => ({
//       id: ncNanoId(),
//       href: i.href,
//       name: i.name,
//     })),
//   },
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "Tour trọn gói",
//     items: __servicemenu.Tour.map((i) => ({
//       id: ncNanoId(),
//       href: i.href,
//       name: i.name,
//     })),
//   },
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "Dịch vụ tổng hợp",
//     items: __servicemenu.Service.map((i) => ({
//       id: ncNanoId(),
//       href: i.href,
//       name: i.name,
//     })),
//   },
//   {
//     id: ncNanoId(),
//     image:
//       "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     title: "Lịch tàu",
//     items: __servicemenu.Ship.map((i) => ({
//       id: ncNanoId(),
//       href: i.href,
//       name: i.name,
//     })),
//   }
// ];

export const servicePageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/residences",
    name: "Khách sạn",
  },
  {
    id: ncNanoId(),
    href: "/experiences",
    name: "Tôi muốn trải nghiệm",
  },
];

export const discoveryPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/discovery",
    name: "Địa điểm checkin",
  },
  {
    id: ncNanoId(),
    href: "/experiences",
    name: "Trải nghiệm",
  },
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Blog chia sẻ",
  },
];

export const aboutUsPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/about",
    name: "Thông tin",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Liên hệ",
  },
  {
    id: ncNanoId(),
    href: "/reviews",
    name: "Đánh giá",
  }
];

export const NAVIGATION_DEMO: NavItemType[] = [
  // {
  //   id: ncNanoId(),
  //   href: "/",
  //   name: "Trang chủ",
  //   isNew: true,
  // },
  {
    id: ncNanoId(),
    href: "/residences",
    name: "Dịch vụ",
    type: "dropdown",
    children: servicePageChildMenus,
  },
  {
    id: ncNanoId(),
    href: "/discovery",
    name: "Khám phá",
    type: "dropdown",
    children: discoveryPageChildMenus,
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "Về chúng tôi",
    type: "dropdown",
    children: aboutUsPageChildMenus,
  }
];
