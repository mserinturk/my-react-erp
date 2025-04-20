import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from '../../services/API'

export const getCustomers = createAsyncThunk(
  'customer/getCustomers',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('customer')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (customerData, thunkAPI) => {
    try {
      const response = await api.post('customer', customerData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`customer/${id}`, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (customerId, thunkAPI) => {
    try {
      await api.delete(`customer/${customerId}`)
      return customerId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  customers: [],
  loading: false,
  error: null,
  success: null
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = null
    }
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getCustomers.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false
        state.customers = action.payload
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // CREATE
      .addCase(createCustomer.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.customers.push(action.payload)
        state.success = 'create'
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // UPDATE
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.customers = state.customers.map(customer =>
          customer.id === action.payload.id ? action.payload : customer
        )
        state.success = 'update'
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // DELETE
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = null
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.customers = state.customers.filter(customer => customer.id !== action.payload)
        state.success = 'delete'
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { resetSuccess } = customerSlice.actions
export default customerSlice.reducer