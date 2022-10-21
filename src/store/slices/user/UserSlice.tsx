import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, Users } from '../../../models/user'

export interface CounterState {
  value: number
}

const initialState: Users = {
  users: [],
  isLoading: false,
  userSelected: null
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    startLoadingUsers: (state) => {
      state.isLoading = true;
    },
    setUsers: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
      state.userSelected = null;
    },
    setUserSelected: (state, action) => {
      state.isLoading = false;
      state.userSelected = action.payload.user;
    },
    startUpdateUser: (state, action) => {
      state.isLoading = false;
      const index = state.users.findIndex(x => x.id === action.payload.user.id);
      state.users[index] = action.payload.user;
    },
    startCreateUser: (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload.user);
    },
    startDeleteUser: (state, action) => {
      state.isLoading = false;
      const index = state.users.findIndex(x => x.id === action.payload.id);
      state.users.splice(index, 1);
    }
  },
})

// Action creators are generated for each case reducer function
export const { startLoadingUsers, setUsers, setUserSelected, startDeleteUser, startUpdateUser, startCreateUser } = UserSlice.actions

export default UserSlice.reducer