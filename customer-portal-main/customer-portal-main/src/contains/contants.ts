const constants = {
  // HOST: "http://localhost:8000"
  HOST: "http://14.225.255.225:8000",
  ADMIN: "http://14.225.255.225:9999/manager/dashboard",
  PREFIX: "/customer",
}

const avatarColors = [
  "#ffdd00",
  "#fbb034",
  "#ff4c4c",
  "#c1d82f",
  "#f48924",
  "#7ac143",
  "#30c39e",
  "#06BCAE",
  "#0695BC",
  "#037ef3",
  "#146eb4",
  "#8e43e7",
  "#ea1d5d",
  "#fc636b",
  "#ff6319",
  "#e01f3d",
  "#a0ac48",
  "#00d1b2",
  "#472f92",
  "#388ed1",
  "#a6192e",
  "#4a8594",
  "#7B9FAB",
  "#1393BD",
  "#5E13BD",
  "#E208A7",
];

const message = {
  "EMPTY_NAME": "Họ tên không được bỏ trống",
  "UPDATE_ERROR": "Cập nhật thất bại",
  "UPDATE_SUCCESS": "Cập nhật thành công"
}

const messageMap = new Map([
    ["SYSTEM_ERROR", "Lỗi hệ thống"],
    ["EMPTY.NAME", "Họ tên không được bỏ trống"],
])

export { avatarColors, constants, message, messageMap };
