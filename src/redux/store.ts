import { configureStore } from '@reduxjs/toolkit';
import chainSlice from './chain/chainSlice';

export default configureStore({
  reducer: {
    chain: chainSlice,
  },
});
