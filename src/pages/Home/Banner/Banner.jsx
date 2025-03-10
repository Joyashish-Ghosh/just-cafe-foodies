import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 


// import img1 from '../../../assets/home/01.jpg';
import cafe from '../../../assets/shop/cafe1.jpg';
import img2 from '../../../assets/dashboard/image.5.jpg';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.png';
import img6 from '../../../assets/home/06.png';
import Dashboard from './../../../Layout/Dashboard';

const Banner = () => {
    return (

      <Carousel>
            <div>
                <img src={cafe} />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img3} />
            </div>
            <div>
                <img src={img4} />
            </div>
            <div>
                <img src={img5} />
            </div>
            <div>
                <img src={img6} />
            </div>
            
        </Carousel>
        
    );
};

export default Banner;