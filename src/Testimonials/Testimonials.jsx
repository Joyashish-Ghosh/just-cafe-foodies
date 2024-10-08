import SectionTitle from "../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
         fetch ('http://localhost:5000/reviews')
        // ata course e silo,chatgpt dheke nicher ta bosoisi.... ('reviews.jsonhttp://localhost:5000/reviews')
          
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section className="my-20">
            <SectionTitle
                subHeading="What Our Client Say"
                heading="Testimonials"
            >

            </SectionTitle>
            {/* Reviews: {reviews.length} */}
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review =>
                        <SwiperSlide key={review._id}>
                            <div className="flex flex-col items-center mx-24 m-16" >
                                <Rating 
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />

                                <p className="my-8">
                                    {review.details}

                                </p>
                                <h3 className="text-2xl text-orange  -400">{review.name}</h3>
                            </div>

                        </SwiperSlide>

                    )
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;