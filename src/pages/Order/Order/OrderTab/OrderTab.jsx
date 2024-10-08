import FoodCard from '../../../../Components/SectionTitle/FoodCard/FoodCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';



const OrderTab = ({ items }) => {

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (

        <div >

            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='mt-20 grid md:grid-cols-3 gap-10'>
                        {

                            items.map(item => <FoodCard
                                key={item.id}
                                item={item}
                            ></FoodCard>

                            )
                        }
                    </div>

                </SwiperSlide>

            </Swiper>
        </div>

    );
};

export default OrderTab;