'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { childrenProps } from '@/utils/interfaces';
import theme from '@/utils/theme';
import { Provider } from 'react-redux';
import store from '@/lib/redux/store';
import { Footer, Header } from '@/design-system/Molecules';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ClientSideProviders: React.FC<childrenProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Header />
          {children}
          <Footer />
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default ClientSideProviders;
