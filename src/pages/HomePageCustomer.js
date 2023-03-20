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
import MenuCreator from './MenuCreator';
import MenuCollection from './MenuCollection';
import CreatorProfile from './CreatorProfile';

function HomePageCustomer() {
  const { productItems } = Data;
  const { shopItems } = Sdata;
  const { user } = UserAuth();

  const [CartItem, setCartItem] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const updateOrderDetail = (product) => {
    const orderDetail = orderDetails.find((item) => item.idproduct === product.idproduct);

    if (orderDetail) {
      api
        .put('/orderdetail/update/', {
          quantity: product.qty,
          idorderdetail: orderDetail.idorderdetail,
        })
        .then((response) => {
          console.log('OrderDetail updated successfully');
          console.log('Updated OrderDetail:', response);
          const updatedOrderDetail = {
            idorderdetail: orderDetail.idorderdetail,
            idproduct: orderDetail.idproduct,
            quantity: product.qty,
          };
          setOrderDetails(
            orderDetails.map((item) =>
              item.idorderdetail === updatedOrderDetail.idorderdetail ? updatedOrderDetail : item,
            ),
          );
        })
        .catch((error) => {
          console.error(`Error updating order detail`);
          console.error(error);
        });
    } else {
      api
        .post('orderdetail/add', {
          idproduct: product.idproduct,
          idorder: localStorage.getItem('idorder'),
          quantity: product.qty,
        })
        .then((response) => {
          console.log('OrderDetail created successfully');
          console.log('New OrderDetail:', response.data);
          const newOrderDetail = {
            idorderdetail: response.data.data.idorderdetail,
            idproduct: response.data.data.idproduct,
            quantity: response.data.data.quantity,
          };
          setOrderDetails([...orderDetails, newOrderDetail]);
        })
        .catch((error) => {
          console.error(`Error sending order detail`);
          console.error(error);
        });
    }
  };

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
    }

    updateOrderDetail({ ...product, qty: productExit ? productExit.qty + 1 : 1 });
  };

  const decreaseQty = (product) => {
    const orderDetail = orderDetails.find((item) => item.idproduct === product.idproduct);
    const productExit = CartItem.find((item) => item.idproduct === product.idproduct);

    if (orderDetail.quantity === 1) {
      setCartItem(CartItem.filter((item) => item.idproduct !== product.idproduct));
      api
        .delete(`orderdetail/delete/${orderDetail.idorderdetail}`)
        .then((response) => {
          console.log('OrderDetail deleted successfully');
          console.log('Deleted OrderDetail:', response.data);
          setOrderDetails(orderDetails.filter((item) => item.idproduct !== product.idproduct));
        })
        .catch((error) => {
          console.error(`Error deleting order detail`);
          console.error(error);
        });
    } else {
      const newQty = orderDetail.quantity - 1;
      setCartItem(
        CartItem.map((item) => (item.idproduct === product.idproduct ? { ...productExit, qty: newQty } : item)),
      );

      api
        .put('/orderdetail/update/', {
          quantity: newQty,
          idorderdetail: orderDetail.idorderdetail,
        })
        .then((response) => {
          console.log('OrderDetail updated successfully');
          console.log('Updated OrderDetail:', response);
          const updatedOrderDetail = {
            idorderdetail: orderDetail.idorderdetail,
            idproduct: orderDetail.idproduct,
            quantity: newQty,
          };
          setOrderDetails(
            orderDetails.map((item) =>
              item.idorderdetail === updatedOrderDetail.idorderdetail ? updatedOrderDetail : item,
            ),
          );
        })
        .catch((error) => {
          console.error(`Error updating order detail`);
          console.error(error);
        });
    }
  };

  const fetchCart = (idorder) => {
    api
      .get(`/orderdetail/${idorder}`)
      .then((response) => {
        console.log('cart ne', response.data.data);
        const cartItemsFromApi = response.data.data;
        const updatedCartItems = [];
        for (const cartItem of cartItemsFromApi) {
          api
            .get(`/product/${cartItem.idproduct}`)
            .then((response) => {
              const product = response.data.data;
              updatedCartItems.push({
                idcollection: product.idcollection,
                idproduct: product.idproduct,
                idproductcategory: product.idproductcategory,
                image: product.image,
                name: product.name,
                price: product.price,
                qty: cartItem.quantity,
                quantity: product.quantity,
                status: product.status,
                idcreator: cartItem.idcreator,
                creatorname: cartItem.creatorname,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setCartItem(updatedCartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function createNewCart() {
    const dataCreateCart = {
      idcustomer: localStorage.getItem('uid'),
      idagency: 'H1iFm7FawHY0pv9C4IGIBOUgdi33',
    };
    api
      .post('/order/add', dataCreateCart)
      .then((response) => {
        console.log('After add cart', response);
        localStorage.setItem('idorder', response.data.data.idorder);
        fetchOrderDetails();
      })
      .catch((error) => {
        console.log('Loi tao cart roi: ', error);
      });
  }

  useEffect(() => {
    const idcustomer = localStorage.getItem('uid');
    api
      .get(`/order/customer/${idcustomer}`)
      .then((response) => {
        console.log('After check cart:', response);
        if (response.data.data.length > 0) {
          const ordersWithStatusTrue = response.data.data.filter((order) => order.status === true);
          if (ordersWithStatusTrue.length > 0) {
            localStorage.setItem('idorder', ordersWithStatusTrue[0].idorder);
            fetchCart(localStorage.getItem('idorder'));
            fetchOrderDetails();
          } else {
            createNewCart();
          }
          return;
        } else {
          createNewCart();
        }
      })
      .catch((error) => {
        console.log('Loi tao cart roi: ', error);
      });
  }, []);

  // useEffect(() => {
  //   const updatedOrderDetail = [];
  //   api
  //     .get(`/orderdetail/${localStorage.getItem('idorder')}`)
  //     .then((response) => {
  //       const cartItemsFromApi = response.data.data;
  //       for (const cartItem of cartItemsFromApi) {
  //         updatedOrderDetail.push({
  //           idorderdetail: cartItem.idorderdetail,
  //           idproduct: cartItem.idproduct,
  //           quantity: cartItem.quantity,
  //         });
  //       }
  //       setOrderDetails(updatedOrderDetail);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const fetchOrderDetails = () => {
    const updatedOrderDetail = [];
    api
      .get(`/orderdetail/${localStorage.getItem('idorder')}`)
      .then((response) => {
        const cartItemsFromApi = response.data.data;
        for (const cartItem of cartItemsFromApi) {
          updatedOrderDetail.push({
            idorderdetail: cartItem.idorderdetail,
            idproduct: cartItem.idproduct,
            quantity: cartItem.quantity,
          });
        }
        setOrderDetails(updatedOrderDetail);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log('orderDetail:', orderDetails);
  console.log('CartItem:', CartItem);

  return (
    <>
      <Header CartItem={CartItem} />
      {/* <Routes>
        <Route path="/" element={<Pages productItems={productItems} addToCart={addToCart} productList={productList} />}>
          <Route path="/cart" element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
        </Route>
      </Routes> */}
      <Routes>
        <Route path="/:idcollection" element={<Pages productItems={productItems} addToCart={addToCart} />} />
        <Route path="/menu-creator" element={<MenuCreator productItems={productItems} addToCart={addToCart} />} />
        <Route
          path="/creator-prof/:idcreator"
          element={<CreatorProfile productItems={productItems} addToCart={addToCart} />}
        />
        <Route
          path="/menu-collection/:idtheme"
          element={<MenuCollection productItems={productItems} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} setCartItem={setCartItem} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default HomePageCustomer;
