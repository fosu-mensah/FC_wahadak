import { FILTER_BRAND, FILTER_COLOR, FILTER_PRICE } from "../actionType";
// Filters
export const filterBrand = (brand) => ({
  type: FILTER_BRAND,
  brand,
});
export const filterColor = (color) => ({
  type: FILTER_COLOR,
  color,
});
export const filterPrice = (value) => ({
  type: FILTER_PRICE,
  value: { min: value[0], max: value[1] }
});
