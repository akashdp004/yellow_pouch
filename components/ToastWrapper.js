import React from 'react';
import Toast from 'react-native-toast-message';

const ToastWrapper = React.forwardRef((props, ref) => {
  return <Toast {...props} ref={ref} />;
});

export default ToastWrapper;