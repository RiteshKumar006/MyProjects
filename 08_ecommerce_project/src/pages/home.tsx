import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
  const addToCartHandler = () =>{

  }
  return (
    <div className="home">
      <section></section>

      {/* <main> */}

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      {/* </main> */}

      <main>
        <ProductCard
          productId="wererr"
          name="macbook"
          price={2354}
          stock={345}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/71WkDp--uqL._SX679_.jpg"
        />
      </main>
    </div>
  );
};

export default Home;
