import '../assets/styles/menu-collection.css';
import { useEffect, useState } from 'react';
import { api } from '~/services/axios';
import { Link, useParams } from 'react-router-dom';

const MenuCollection = ({ productItems, addToCart, CartItem, shopItems, productList }) => {
  //   const idtheme = match.params.idtheme;
  const { idtheme } = useParams();
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    api
      .get(`/collection/?idtheme=${idtheme}`)
      .then((response) => {
        console.log('collection return:', response);
        setCollectionData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idtheme]);
  console.log(collectionData);
  console.log('id theme', idtheme);
  return (
    <div id="rs-team" className="rs-team">
      <div className="container">
        {collectionData.map((collection) => (
          <Link to={`/customer/${collection.idcollection}`} className="collection-item">
            <div className="team-item">
              <div className="team-img">
                <img src={collection.image} alt="team Image" />
                <div className="normal-text">
                  <h4 className="team-name">{collection.name}</h4>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuCollection;
