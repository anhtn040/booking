export const formatMoney = (value: number): string => {
  let data = value.toString().replace(/,/g, '');
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};