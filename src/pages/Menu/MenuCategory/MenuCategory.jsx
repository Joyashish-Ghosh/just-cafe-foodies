import { Link } from "react-router-dom";
import Cover from "../../Home/Home/Shared/Cover/Cover";
import MenuItem from "../../Home/Home/Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-12">
            {title && <Cover img={img} title={title} ></Cover>}

            <div className="grid md:grid-cols-2 gap-12 mt-16">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}></MenuItem>


                    )
                }
            </div>
            <Link to= {`/order/${title}`}>
            <button className="btn btn-outline bg-red-500 border-0 border-b-4 mt-4">Order Now</button>

            </Link>
        </div>
    );
};

export default MenuCategory;