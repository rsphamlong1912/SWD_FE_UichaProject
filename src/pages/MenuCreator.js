import Home from './customer/components/MainPage/Home';
import '../assets/styles/menu-creator.css';
import { useEffect, useState } from 'react';
import { api } from '~/services/axios';

const MenuCreator = ({ productItems, addToCart, CartItem, shopItems, productList }) => {
  const [themes, setThemes] = useState([]);
  const [creators, setCreators] = useState([]);

  const fetchThemes = async () => {
    const newThemes = [];

    for (const creator of creators) {
      // Gọi API để lấy theme tương ứng với creator đó
      try {
        const response = await api.get(`/theme/?idcreator=${creator.idcreator}`);
        const themes = response.data.data;
        newThemes.push(...themes);
      } catch (error) {
        console.log(error);
      }
    }
    setThemes(newThemes);
  };

  useEffect(() => {
    const fetchCreators = () => {
      api
        .get(`/creator/?idagency=H1iFm7FawHY0pv9C4IGIBOUgdi33`)
        .then((response) => {
          setCreators(response.data.data);
        })
        .catch((error) => {
          console.log('Lỗi fetch creators', error);
        });
    };
    fetchCreators();
  }, []);

  // fetchThemes được gọi lại khi biến creators thay đổi
  useEffect(() => {
    fetchThemes();
  }, [creators]);
  return (
    <>
      {/* <Home CartItem={CartItem} /> */}
      <div className="container">
        <h1>Chọn chủ đề sản phẩm bạn muốn đến từ những nhà sáng tạo của chúng tôi:</h1>
        <div className="center">
          {creators.map((creator) => (
            <div className="card green" key={creator.idcreator}>
              <div className="additional">
                <div className="user-card">
                  <div className="level center">Level 1</div>

                  <img src={creator.picture} />
                </div>
                <div className="more-info">
                  <h1>{creator.name}</h1>
                  <div className="coords">
                    {/* Hiển thị các theme của creator */}
                    {themes
                      .filter((theme) => theme.idcreator == creator.idcreator)
                      .map((theme) => (
                        <li key={theme.idtheme}>
                          <a href={`/customer/menu-collection/${theme.idtheme}`}>{theme.name}</a>
                        </li>
                      ))}
                  </div>
                  {/* <div className="coords">
                    <span>Position/Role</span>
                    <span>City, Country</span>
                  </div> */}
                  <div className="stats">
                    <div>
                      <div className="title">Awards</div>
                      <i className="fa fa-trophy"></i>
                      <div className="value">2</div>
                    </div>
                    <div>
                      <div className="title">Matches</div>
                      <i className="fa fa-gamepad"></i>
                      <div className="value">27</div>
                    </div>
                    <div>
                      <div className="title">Pals</div>
                      <i className="fa fa-group"></i>
                      <div className="value">123</div>
                    </div>
                    <div>
                      <div className="title">Coffee</div>
                      <i className="fa fa-coffee"></i>
                      <div className="value infinity">∞</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="general">
                <h1>{creator.name}</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus.
                  Nam vestibulum sodales odio ut pulvinar.
                </p>
                <span className="more">Mouse over the card to choose themes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuCreator;
