import {matchPath} from 'react-router';

function extractActionsFromRoutes(routes, currentUrl) {
  const actions = [];

  routes.forEach(route => {
    if (actions.length > 0) return false;

    if (matchPath(currentUrl, route)) {
      if (route.component.fetchData) actions.push(route.component.fetchData);
    }

    return true;
  });

  return actions;
}

export default extractActionsFromRoutes;
