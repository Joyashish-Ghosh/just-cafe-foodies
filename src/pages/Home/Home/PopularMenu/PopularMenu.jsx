import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../../../hooks/useMenu";


const PopularMenu = () => {
   const[menu] =useMenu();
   const popular =menu.filter(item=>item.category ==='popular');
    return (
        <section className="mb-12">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items" >

            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-12">
                {
                popular.map(item =><MenuItem
                    key={item._id}
                    item={item}></MenuItem>
                    

                )
                }
            </div>
            <button className="btn btn-outline mx-96 mt-12">View Full Item</button>

        </section>
    );
};

export default PopularMenu;