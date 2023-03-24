import React, { useState } from 'react';
import '../assets/styles/history-orders.css';
import { api } from '~/services/axios';
import { useEffect } from 'react';

const HistoryOrders = ({ CartItem, addToCart, decreaseQty, setCartItem }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrder = () => {
    api
      .get(`/order/customer/${localStorage.getItem('uid')}`)
      .then((response) => {
        let filteredOrders = response.data.data.filter((order) => order.status === false);
        setOrders(filteredOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  console.log('order ne', orders);
  return (
    <>
      <div class="container-order">
        <h2>
          Danh sách đơn hàng <small></small>
        </h2>
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-1">Order Id</div>
            <div class="col col-2">Date</div>
            <div class="col col-3">Amount</div>
            <div class="col col-4">Status</div>
          </li>
          {orders.map((order, index) => (
            <li class="table-row">
              <div class="col col-1" data-label="Job Id">
                {index + 1}
              </div>
              <div class="col col-2" data-label="Customer Name">
                {order.datetime.substring(0, 10)}
              </div>
              <div class="col col-3" data-label="Amount">
                ${order.totalmoney}
              </div>
              <div class="col col-4" data-label="Payment Status">
                {order.tracking}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HistoryOrders;
