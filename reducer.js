import Reducer from 'packages/helpers/redux/reducer';

export const HYDRATED = '@@mapleinside/serverHydration/HYDRATED';
export const RESET = '@@mapleinside/serverHydration/RESET';
export const initialState = {
  hydrated: false
};

const cases = {
  [HYDRATED]: () => ({
    hydrated: true
  }),
  [RESET]: () => ({
    hydrated: false
  })
};

const reducer = new Reducer(initialState, cases);

export const reset = reducer.createAction(RESET);

export default reducer.bindReducer();
