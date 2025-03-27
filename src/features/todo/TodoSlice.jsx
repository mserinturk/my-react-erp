import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/API'

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/todos')
      return response.data
    } catch (error){
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  todos: [],
  loading: false,
  error: null
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {  } = todoSlice.actions

export default todoSlice.reducer