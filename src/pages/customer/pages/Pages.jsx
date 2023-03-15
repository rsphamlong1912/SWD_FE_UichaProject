import { useState, useEffect } from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/flashDeals/FlashDeals"
import TopCate from "../components/top/TopCate"
import NewArrivals from "../components/newarrivals/NewArrivals"
import Discount from "../components/discount/Discount"
import Shop from "../components/shops/Shop"
import Annocument from "../components/annocument/Annocument"
import { api } from "~/services/axios"
import { useParams } from "react-router-dom"

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  const { idcollection } = useParams();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    api
      .get(`/product?idcollection=${idcollection}`)
      .then((response) => {
        console.log('API return product list:', response.data.data);
        setProductList(response.data.data);
      })
      .catch((error) => {
        alert('Lấy dữ liệu thất bại');
      });
  }, [idcollection]);
  return (
    <>
      <Home CartItem={CartItem} />
      {/* <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <NewArrivals />
      <Discount /> */}
      <Shop productList={productList} addToCart={addToCart} />
      <Annocument />
    </>
  )
}

export default Pages
