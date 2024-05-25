import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import slide1 from '../../../../assets/home/slide1.jpg';
import slide2 from '../../../../assets/home/slide2.jpg';
import slide3 from '../../../../assets/home/slide3.jpg';
import slide4 from '../../../../assets/home/slide4.jpg';
import slide5 from '../../../../assets/home/slide5.jpg';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';
const Category = () => {
    return (
        <section>
            <SectionTitle
                subHeading={"From 10am to 10 pm"}
                heading={"Order Online" }>
            </SectionTitle>
            <Swiper
            slidesPerView={'4'}
            spaceBetween={1}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper mb-28"
        >
            <SwiperSlide>
                <img src={slide1} alt="" />
                <h3 className='text-4xl text-center -mt-10 text-black'>SALADS</h3>
            </SwiperSlide>

            <SwiperSlide>
                <img src={slide2} alt="" />
                <h3 className='text-4xl text-center -mt-10 text-white'>PIZZA </h3>

            </SwiperSlide>
            <SwiperSlide>
                <img src={slide3} alt="" />
                <h3 className='text-4xl text-center -mt-10 text-black'>SOUPS</h3>

            </SwiperSlide>
            <SwiperSlide>
                <img src={slide4} alt="" />
                <h3 className='text-4xl text-center -mt-10 text-black'>DESSERTS</h3>

            </SwiperSlide>
            <SwiperSlide>
                <img src={slide5} alt="" />
                <h3 className='text-4xl text-center -mt-10 text-black'>SALADS</h3>

            </SwiperSlide>

        </Swiper>
        </section>
    );
};

export default Category;