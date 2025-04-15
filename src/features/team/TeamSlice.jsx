import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from '../../services/API'

export const getTeam = createAsyncThunk(
  'team/getTeam',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('team')
      return response.data
    }
    catch (error){
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const createTeam = createAsyncThunk(
  'team/createTeam',
  async (teamData, thunkAPI) => {
    try {
      const response = await api.post('team', teamData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteTeam = createAsyncThunk(
  'team/deleteTeam',
  async (teamId, thunkAPI) => {
    try {
      await api.delete(`team/${teamId}`)
      return teamId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const updateTeam = createAsyncThunk(
  'team/updateTeam',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await api.put(`team/${id}`, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  teams: [],
  loading: false,
  error: null
}

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.loading = false
        state.teams = action.payload
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.loading = true
        state.error = action.payload
      })
      .addCase(createTeam.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false
        state.teams.push(action.payload)
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false
        state.teams = state.teams.filter(team => team.id !== action.payload)
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateTeam.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false
        state.teams = state.teams.map(team =>
          team.id === action.payload.id ? action.payload : team
        )
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default teamSlice.reducer