import Reducer from '@nicolascava/reducer';

export const HYDRATED = '@nicolascava/serverHydration/HYDRATED';
export const RESET = '@nicolascava/serverHydration/RESET';
export const initialState = {
  hydrated: false,
};

const cases = {
  [HYDRATED]: () => ({
    hydrated: true,
  }),
  [RESET]: () => ({
    hydrated: false,
  }),
};

const reducer = new Reducer(initialState, cases);

export const reset = reducer.createAction(RESET);

export default reducer.bindReducer();
