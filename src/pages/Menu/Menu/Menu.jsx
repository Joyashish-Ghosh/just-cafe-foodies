import { Helmet } from 'react-helmet-async';
import Cover from '../../Home/Home/Shared/Cover/Cover';
import menuImg from '../../../assets/menu/cafe.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';


const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    const salad= menu.filter(item => item.category === 'salad');
  

    return (
        <div>
            <Helmet>
                <title>Just Cafe | Menu</title>
            </Helmet>
            <Cover img={menuImg} title="our menu" ></Cover>
            {/* main cover */}
            <SectionTitle
                subHeading="Don't Miss" heading="Today's Offer"
            ></SectionTitle>
            {/* offered menu item */}

            <MenuCategory items={offered} ></MenuCategory>
            {/* dessert menu item */}
            <MenuCategory items={desserts} title="dessert"img={dessertImg}></MenuCategory>
            <MenuCategory items={pizza } title="pizza"img={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} title="salad"img={saladImg}></MenuCategory>
            <MenuCategory items={soup} title="soup"img={soupImg}></MenuCategory>

        </div>
    );
};

export default Menu;