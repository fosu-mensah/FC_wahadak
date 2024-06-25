import { combineReducers } from "redux";
import Ecommerce from "./product/reducer";
import Wishlist from "./wishlist/reducer";
import Cart from "./cart/reducer";
import Filters from "./filter/reducer";
import Customizer from "./customizer/reducer";
const reducers = combineReducers({
  data: Ecommerce,
  Wishlistdata: Wishlist,
  Cartdata: Cart,
  filters: Filters,
  Customizer,
});

export default reducers;
