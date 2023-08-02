import { useEffect,useState } from 'react';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap';
// import products from '../products';
import Product from '../components/Product';

const Home = () => {
  const [products,setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const {data} = await axios.get('api/products');
      setProducts(data);
    }
    fetchProducts();
  },[] )

  return (
    <div>
      <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} key={product._id}/>
          </Col>
        ))}
      </Row>
      </>
    </div>
  )
}
export default Home