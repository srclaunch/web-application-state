import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { Modal } from '@srclaunch/types';

const modalAdapter = createEntityAdapter<Modal>({
  selectId: modal => modal.id.toString(),
});

const slice = createSlice({
  initialState: modalAdapter.getInitialState(),
  name: 'modals',
  reducers: {
    closeModal: (state, action) => {
      modalAdapter.removeOne(state, action.payload);
    },
    showModal: (state, action) => {
      const modal = action.payload;
      const id = nanoid(6);

      modalAdapter.addOne(state, { ...modal, id });
    },
  },
});

export default slice.reducer;
export const { closeModal, showModal } = slice.actions;
