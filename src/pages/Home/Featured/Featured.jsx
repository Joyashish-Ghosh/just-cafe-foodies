import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';
import { Link } from "react-router-dom";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20 ">
            <SectionTitle 
                subHeading="" heading="Featured Item"
            ></SectionTitle>
            <div className=" md:flex justify-center items-center   py-0 px-4 ">
                <div className="mb-8" >
                <img src={featuredImg} alt="" />
            </div>
            <div className="md:ml-8 text-white ">
                
                
          <p>Just Cafe Foodies is a welcoming and casual dining experience that blends quality food with a cozy café atmosphere. Our focus is on serving freshly prepared dishes, including a variety of café-style meals, beverages, and desserts. The project emphasizes sourcing high-quality ingredients, maintaining excellent customer service, and implementing a seamless ordering system for both dine-in and takeaway customers.</p>
          <button className="btn btn-outline bg-red-500 border-0 border-b-4 mt-4"><Link to="/order/salad">Order Now</Link></button>
      

            </div>
            </div>
        </div>


    );
};

export default Featured;