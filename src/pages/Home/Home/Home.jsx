import { Helmet } from "react-helmet-async";
import Testimonials from "../../../Testimonials/Testimonials";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Category from "./Category/Category";
import PopularMenu from "./PopularMenu/PopularMenu";

const Home = () => {
    return (
        <div  className="min-h-screen flex flex-col bg-gray-50" >
            <Helmet>
                <title>Just Cafe | Home</title>
            </Helmet>
           <Banner></Banner>
           <Category></Category>
           <PopularMenu></PopularMenu>
           <Featured></Featured>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;