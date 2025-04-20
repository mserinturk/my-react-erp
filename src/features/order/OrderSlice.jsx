import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from '../../services/API'

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('order')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, thunkAPI) => {
    try {
      const response = await api.post('order', orderData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`order/${id}`, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId, thunkAPI) => {
    try {
      await api.delete(`order/${orderId}`)
      return orderId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  orders: [],
  loading: false,
  error: null,
  success: null
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = null
    }
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getOrders.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // CREATE
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
        state.success = 'create'
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // UPDATE
      .addCase(updateOrder.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
        state.success = 'update'
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // DELETE
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = state.orders.filter(order => order.id !== action.payload)
        state.success = 'delete'
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { resetSuccess } = orderSlice.actions
export default orderSlice.reducer