'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    isAuth: false,
    user_id: 0,
    username: '',
    userPhoto:
      'https://sun9-7.userapi.com/impg/43q_bnKSgllm6yD3PxP8SSZp_NUtl1aDkcVW0Q/d7rMTeYSqBE.jpg?size=2560x2560&quality=95&sign=79fa15a7bf08c143b8aafe68984aa4a5&type=album'
  }
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      return {
        value: {
          ...state.value,
          user_id: action.payload.user_id,
          username: action.payload.username
        }
      }
    }
  }
})

export const { logIn } = auth.actions
export default auth.reducer
