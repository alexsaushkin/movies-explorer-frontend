import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({element: Component, ...props}) => {
  return props.signedIn ? (<Component {...props} />) : (<Navigate to='/' replace/>);
};

export default ProtectedRoute;
