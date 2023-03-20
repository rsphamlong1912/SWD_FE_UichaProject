import Home from './customer/components/MainPage/Home';
import '../assets/styles/creator-profile.css';
import { useEffect, useState } from 'react';
import { api } from '~/services/axios';
import { useParams } from 'react-router-dom';
import { async } from '@firebase/util';

const CreatorProfile = ({ productItems, addToCart, CartItem, shopItems, productList }) => {
  const { idcreator } = useParams();
  const [themes, setThemes] = useState([]);
  const [creator, setCreator] = useState();

  const fetchThemes = async () => {
    try {
      const responseThemes = await api.get(`/theme/?idcreator=${idcreator}`);
      setThemes(responseThemes.data.data);
      //   const responseCreator = await api.get(`/creator/${idcreator}`);
      //   setCreator(responseCreator.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCreator = async () => {
    try {
      const responseCreator = await api.get(`/creator/${idcreator}`);
      setCreator(responseCreator.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchThemes();
    fetchCreator();
  }, []);
  console.log('crator', creator);
  return (
    <section class="section about-section gray-bg" id="about">
      <div class="container">
        <div class="row align-items-center flex-row-reverse">
          <div class="col-6">
            <div class="about-avatar">{creator && creator.picture && <img src={creator.picture} alt="" />}</div>
          </div>
          <div class="col-6">
            <div class="about-text go-to">
              <h3 class="dark-color">About {creator && creator.name}</h3>
              <h6 class="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>
              <p>
                I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish,
                modern websites, web services and online stores. My passion is to design digital user experiences
                through the bold interface and meaningful interactions.
              </p>
            </div>
          </div>
        </div>
        <div class="counter">
          <div class="row">
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="500" data-speed="500">
                  500
                </h6>
                <p class="m-0px font-w-600">Happy Clients</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="150" data-speed="150">
                  150
                </h6>
                <p class="m-0px font-w-600">Project Completed</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="850" data-speed="850">
                  850
                </h6>
                <p class="m-0px font-w-600">Photo Capture</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="190" data-speed="190">
                  190
                </h6>
                <p class="m-0px font-w-600">Telephonic Talk</p>
              </div>
            </div>
          </div>
        </div>
        <div className="coords">
          {/* Hiển thị các theme của creator */}
          <h2 class="dark-color">Một vài chủ đề của {creator && creator.name}</h2>
          {themes.map((theme) => (
            <li key={theme.idtheme}>
              <a href={`/customer/menu-collection/${theme.idtheme}`}>{theme.name}</a>
            </li>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorProfile;
