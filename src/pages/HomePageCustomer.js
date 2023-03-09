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

function HomePageCustomer() {
  /*
  step1 :  const { productItems } = Data 
  lai pass garne using props
  
  Step 2 : item lai cart ma halne using useState
  ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
 
  Step 3 :  chai flashCard ma xa button ma

  Step 4 :  addToCart lai chai pass garne using props in pages and cart components
  */

  //Step 1 :
  const { productItems } = Data;
  const { shopItems } = Sdata;
  const { user } = UserAuth();

  const pushOrderDetailsToServer = (orderDetails) => {
    orderDetails.forEach((orderDetail) => {
      api
        .post('orderdetail/add', orderDetail)
        .then((response) => {
          console.log(`Order detail ${orderDetail.id} sent successfully`);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(`Error sending order detail ${orderDetail.id}`);
          console.error(error);
        });
    });
  };

  const pickOrderDetails = (cart, orderId) => {
    let orderDetailsArray = [];
    cart.forEach((item) => {
      orderDetailsArray.push({
        idproduct: item.idproduct,
        idorder: localStorage.getItem('idorder'),
        quantity: item.qty,
      });
    });
    return orderDetailsArray;
  };

  //Step 2 :
  const [CartItem, setCartItem] = useState([]);
  const [productList, setProductList] = useState([]);

  //Step 4 :
  const addToCart = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.idproduct === product.idproduct);
    // if productExit chai alredy exit in cart then will run fun() => setCartItem
    // ani inside => setCartItem will run => map() ani yo map() chai each cart ma
    // gayara check garxa if item.id ra product.id chai match bhayo bhane
    // productExit product chai display garxa
    // ani increase  exits product QTY by 1
    // if item and product doesnt match then will add new items
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.idproduct === product.idproduct ? { ...productExit, qty: productExit.qty + 1 } : item,
        ),
      );
    } else {
      // but if the product doesnt exit in the cart that mean if card is empty
      // then new product is added in cart  and its qty is initalize to 1
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  // Stpe: 6
  const decreaseQty = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.idproduct === product.idproduct);

    // if product is exit and its qty is 1 then we will run a fun  setCartItem
    // inside  setCartItem we will run filter to check if item.id is match to product.id
    // if the item.id is doesnt match to product.id then that items are display in cart
    // else
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.idproduct !== product.idproduct));
    } else {
      // if product is exit and qty  of that produt is not equal to 1
      // then will run function call setCartItem
      // inside setCartItem we will run map method
      // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
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

  useEffect(() => {
    // sendCartToServer(CartItem);
    console.log('Cart item ne: ', CartItem);
    if (CartItem.length > 0) {
      const orderListDetails = pickOrderDetails(CartItem, '123');
      pushOrderDetailsToServer(orderListDetails);
    }
  }, [CartItem]);

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
        <Route path="/cart" element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default HomePageCustomer;
