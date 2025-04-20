import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/CustomerSlice"
import orderReducer from "../features/order/OrderSlice"

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    order: orderReducer
  },
})
