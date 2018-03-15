import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {bindActionCreators} from 'redux';

import {reset as resetHydrationState} from 'packages/helpers/redux/fetch-connect/modules/reducer';

function fetchConnect(actions = [], mapStateToProps = () => ({}), mapDispatchToProps = () => ({})) {
  return (ComponentToDebug) => {
    function mapDispatch(dispatch) {
      const userActions = mapDispatchToProps(dispatch);

      return {
        ...userActions,
        dispatch,
        actionCreators: {
          ...userActions.actionCreators,
          ...bindActionCreators({resetHydrationState}, dispatch)
        }
      };
    }

    function mapState(state) {
      return {
        ...mapStateToProps(state),
        fetchConnect: state.fetchConnect
      };
    }

    class Decorated extends Component {
      static fetchData = actions;
      static propTypes = {
        actionCreators: PropTypes.object.isRequired,
        fetchConnect: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
      };

      componentDidMount() {
        if (!this.props.fetchConnect.hydrated) {
          this.dispatchClient();
        } else {
          this.props.actionCreators.resetHydrationState();
        }
      }

      dispatchClient() {
        const fetchActions = this.constructor.fetchData;

        fetchActions.forEach(fetchAction => {
          const computedFetchAction = fetchAction(this.props);

          if (!computedFetchAction) return fetchAction;

          return this.props.dispatch(computedFetchAction);
        });
      }

      render() {
        return <ComponentToDebug {...this.props} />;
      }
    }

    hoistNonReactStatic(Decorated, ComponentToDebug);

    return connect(mapState, mapDispatch)(Decorated);
  };
}

export default fetchConnect;
