import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home">
      <section></section>

      {/* <main> */}
        
      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>
      {/* </main> */}
    </div>
  )
}

export default Home