/* READ ME

category -> la catégorie à mettre à jour
    utilisation dans l'app : dispatch(addPlanning({ category: 'accomodations', data: yourAccomodationData }));
updatedData -> les nouvelles informations pour l'élément à mettre à jour.

*/

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    accomodations: [],
    carLocations: [],
    flights: [],
    others: [],
  },
};

export const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    initPlanning: (state, action) => {
      state.value = action.payload;
    },
    addPlanning: (state, action) => {
      const { category, data } = action.payload;
      if (category in state.value) {
        state.value[category].push(data);
      }
    },
    // Si indentifiant existant pour chaque category on cherche par l'id
    updatePlanning: (state, action) => {
      const { category, updatedData } = action.payload;
      if (category in state.value) {
        state.value[category] = state.value[category].map((item) => {
          if (item.id === updatedData.id) {
            return { ...item, ...updatedData };
          }
          return item;
        });
      }
    },
    // Si pas d'identifiant, on le cherche par son index dans le tableau
    updatePlanning2: (state, action) => {
      const { category, updatedData, indexToUpdate } = action.payload;
      if (category in state.value) {
        state.value[category] = state.value[category].map((item, index) => {
          if (index === indexToUpdate) {
            return updatedData;
          }
          return item;
        });
      }
    },
    // En fonction de l'index
    deletePlanning: (state, action) => {
      const { category, indexToDelete } = action.payload;
      if (category in state.value) {
        state.value[category] = state.value[category].filter(
          (item, index) => index !== indexToDelete
        );
      }
    },
  },
});

export const {
  initPlanning,
  addPlanning,
  updatePlanning,
  updatePlanning2,
  deletePlanning,
} = planningSlice.actions;
export default planningSlice.reducer;
