import React from "react"
import "./style.css"
import { api } from "../../../../../src/services/axios"

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  // Stpe: 7   calucate total of items
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)

  // hàm xử lý sự kiện khi người dùng nhấn nút thanh toán
  const handleCheckout = () => {

    const orderData = {
      total: totalPrice,
      idorder: localStorage.getItem('idorder')
    };

    console.log(orderData);

    api
      .post('/checkout', orderData)
      .then((response) => {
        console.log('After payment', response);
        alert('Đặt hàng thành công!');
      })
      .catch((error) => {
        console.log('Loi payment: ', error);
      });

  }

  const handleCheckoutPaypal = () => {
    const genCart = CartItem.map(item => {
      return {
        name: item.name,
        sku: item.idproduct,
        price: item.price,
        currency: 'USD',
        quantity: item.qty
      }
    })
    console.log('test genCart', genCart)

    const orderData = {
      items_cart: genCart,
      total: totalPrice,
      idorder: localStorage.getItem('idorder')
    };

    api.post('/pay', orderData)
      .then(response => {
        console.log("Ket qua tra ve paypal:", response);
      })
      .catch((error) => {
        console.log('Loi payment: ', error);
      })
  }
  // prodcut qty total
  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

          <div className='cart-details'>
            {CartItem.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}

            {/* yasma hami le cart item lai display garaaxa */}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty

              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                    <img src={item.image} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart'>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => addToCart(item)}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>

                  <div className='cart-item-price'></div>
                </div>
              )
            })}
          </div>

          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>
            <button onClick={handleCheckout}>Thanh toán Cash</button>
            <button onClick={handleCheckoutPaypal}>Thanh toán Paypal</button>
          </div>

        </div>
      </section>
    </>
  )
}

export default Cart
