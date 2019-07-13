import { createSlice } from 'redux-starter-kit'
import { wipeData, updateData } from 'store/data/commonActions'

// INITIAL STATE
const initialState = {}

// SLICE
const { reducer } = createSlice({
  slice: 'merchants',
  initialState,
  reducers: {},
  extraReducers: {
    [wipeData]: () => initialState,
    [updateData]: (state, { payload }) => {
      if (payload.merchant) {
        payload.merchant.forEach(item => (state[item.id] = item))
      }
    },
  },
})

// REDUCER
export default reducer

// ACTIONS
// ...

// SELECTORS
export const getMerchants = state => state.data.merchant