import FoodCard from "../../../../Components/SectionTitle/FoodCard/FoodCard";
const OrderTab = ({items}) => {
    return (
     
           <div className='mt-20 grid md:grid-cols-3 gap-10'>
                        {

                            items.map(item => <FoodCard
                                key={item.id}
                                item={item}
                            ></FoodCard>

                            )
                        }
                    </div>  
       
    );
};

export default OrderTab;