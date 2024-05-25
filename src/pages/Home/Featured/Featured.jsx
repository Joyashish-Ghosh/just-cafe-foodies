import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';
const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20 ">
            <SectionTitle 
                subHeading="Check it Out" heading="Featured Item"
            ></SectionTitle>
            <div className="bg-red-400 bg-opacity-20 md:flex justify-center items-center pb-20 bt-12 py-20 px-36 ">
                <div className="mb-8" >
                <img src={featuredImg} alt="" />
            </div>
            <div className="md:ml-8 text-white ">
                <p>
                    Aug 20,2024
                </p>
                <p  className="uppercase">Where can i get some?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore culpa voluptatibus accusantium maiores aliquid vel provident doloremque, in facilis, tempore minima voluptas perspiciatis eos similique quisquam dolor veritatis perferendis sapiente at. Aut quaerat dolores tempore ab in! Ex, consectetur. Voluptate quam enim amet suscipit inventore aut blanditiis! Aut, quidem?</p>
          <button className="btn btn-outline bg-red-500 border-0 border-b-4 mt-4">Order Now</button>

            </div>
            </div>
        </div>


    );
};

export default Featured;