import React, { useEffect, createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '~/pages/SignIn';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { AuthContextProvider } from '~/context/AuthContext';
import { getToken } from 'firebase/messaging';
import { messaging } from '~/firebase';
import { privateRoutes, publicRoutes } from './routes';
import Main from '~/components/Layout/DashboardLayout/Main/Main.js';
import HomePageCustomer from './pages/HomePageCustomer';
import { api } from './services/axios';

export const TokenContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BDYnLI-lWyP8cZUlOscmyqO4VGNVWVCMkio1T8ZZOoVW227bA-UoTYX4N_QpXzJOOjayK79OvJg_p00PnqyolZM',
      });
      setToken(token);
      console.log('Token Gen', token);
    } else if (permission === 'denied') {
      console.log('you denied for the notification');
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  // useEffect(() => {
  //   const storedTokens = JSON.parse(localStorage.getItem('tokens'));
  //   const accessToken = storedTokens?.accessToken || null;
  //   api.interceptors.request.use((config) => {
  //     config.headers.Authorization = `Bearer ${accessToken}`;
  //     return config;
  //   });
  // });

  return (
    <>
      <TokenContext.Provider value={token}>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              // let DashboardLayout = Main;

              return <Route key={index} path={route.path} element={<Page />} />;
            })}
            {/* <Route path="/sign-in" element={<SignIn />} /> */}
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              let DashboardLayout = Main;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Page />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
              );
            })}
            <Route path="/customer/*" element={<HomePageCustomer />} />
          </Routes>
        </AuthContextProvider>
      </TokenContext.Provider>
    </>
  );
}

export default App;
