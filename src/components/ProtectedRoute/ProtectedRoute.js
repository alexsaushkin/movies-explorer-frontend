import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({element: Component, ...props}) => {
  // return props.signedIn ? (<Component {...props} />) : (<Navigate to='/' replace/>);
  return props.signedIn ? (<Component {...props} />) : (<Component {...props} />) ;
};

export default ProtectedRoute;
