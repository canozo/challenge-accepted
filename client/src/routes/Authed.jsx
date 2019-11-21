import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../context/Auth';
import Loading from '../components/Loading';

function AuthedRoute({
  component: Component, path, ...rest
}) {
  return (
    <AuthConsumer>
      {context => (
        <Route
          {...rest}
          path={path}
          render={(props) => {
            // ver si aun esta cargando
            if (context.loading) {
              return <Loading />;
            }

            // si no esta autenticado
            if (!context.logged) {
              return (
                <Redirect to="/login" />
              );
            }

            // tiene permisos
            return (
              <Component context={context} {...props} />
            );
          }}
        />
      )}
    </AuthConsumer>
  );
}

AuthedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default AuthedRoute;
