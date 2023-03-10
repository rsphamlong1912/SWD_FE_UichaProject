import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../assets/styles/homepage-customer.css';
import Header from './customer/common/header/Header';
import Pages from './customer/pages/Pages';
import Data from './customer/components/Data';
import Footer from './customer/common/footer/Footer';
import Sdata from './customer/components/shops/Sdata';
import { api } from '~/services/axios';
import Cart from './customer/common/Cart/Cart';
import { UserAuth } from '../context/AuthContext';
import ProtectedRoute from '~/routes/ProtectedRoute';

function HomePageCustomer() {
  const { productItems } = Data;
  const { shopItems } = Sdata;
  const { user } = UserAuth();

  const [CartItem, setCartItem] = useState([]);
  const [productList, setProductList] = useState([]);

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.idproduct === product.idproduct);

    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.idproduct === product.idproduct ? { ...productExit, qty: productExit.qty + 1 } : item,
        ),
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
      api
        .post('orderdetail/add', {
          idproduct: product.idproduct,
          idorder: localStorage.getItem('idorder'),
          quantity: 1,
        })
        .then((response) => {
          console.log(`Order detail sent successfully`);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(`Error sending order detail`);
          console.error(error);
        });
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.idproduct === product.idproduct);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.idproduct !== product.idproduct));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.idproduct === product.idproduct ? { ...productExit, qty: productExit.qty - 1 } : item,
        ),
      );
    }
  };

  useEffect(() => {
    api
      .get('/product?idcollection=1', {
        idcollection: 1,
      })
      .then((response) => {
        console.log('API return product list:', response.data.data);
        setProductList(response.data.data);
      })
      .catch((error) => {
        alert('Lấy dữ liệu thất bại');
      });
  }, []);

  useEffect(() => {
    const idcustomer = localStorage.getItem('uid');
    api
      .get(`/order/customer/${idcustomer}`)
      .then((response) => {
        console.log('After check:', response);
        if (response.data.data.length > 0) {
          localStorage.setItem('idorder', response.data.data[0].idorder);
          return;
        } else {
          const dataCreateCart = {
            idcustomer: localStorage.getItem('uid'),
            idagency: 1,
          };
          api
            .post('/order/add', dataCreateCart)
            .then((response) => {
              console.log('After add cart', response);
              localStorage.setItem('idorder', response.data.data.idorder);
            })
            .catch((error) => {
              console.log('Loi tao cart roi: ', error);
            });
        }
      })
      .catch((error) => {
        console.log('Loi tao cart roi: ', error);
      });
  }, []);

  return (
    <>
      <Header CartItem={CartItem} />
      {/* <Routes>
        <Route path="/" element={<Pages productItems={productItems} addToCart={addToCart} productList={productList} />}>
          <Route path="/cart" element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
        </Route>
      </Routes> */}
      <Routes>
        <Route
          path="/"
          element={<Pages productItems={productItems} addToCart={addToCart} productList={productList} />}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default HomePageCustomer;
