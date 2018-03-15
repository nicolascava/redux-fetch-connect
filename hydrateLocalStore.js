import {HYDRATED} from 'packages/helpers/redux/fetch-connect/modules/reducer';

function hydrateLocalStore(store, client, routeActions = []) {
  return new Promise(async resolve => {
    await Promise.all(routeActions.map(async fetchActions => {
      await Promise.all(fetchActions.map(async action => {
        const computedAction = action(store.getState());

        if (!computedAction || !computedAction.promise) return resolve();

        const actionResult = await computedAction
          .promise(client)
          .then(data => data)
          .catch(errors => errors);

        if (actionResult.errors) {
          store.dispatch({
            type: computedAction.types[2],
            errors: actionResult.errors,
            isServerError: true
          });

          return action;
        }

        store.dispatch({
          type: computedAction.types[1],
          result: actionResult
        });

        return action;
      }));

      store.dispatch({
        type: HYDRATED
      });
    }));

    return resolve();
  });
}

export default hydrateLocalStore;
