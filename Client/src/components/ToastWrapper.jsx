import { Toaster } from 'react-hot-toast';

const ToastWrapper = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        },
        error: {
          duration: 4000,
        },
      }}
    />
  );
};

export default ToastWrapper;