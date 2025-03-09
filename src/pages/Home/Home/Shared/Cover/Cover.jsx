import { Parallax } from 'react-parallax';

const Cover = ({ img, title }) => {
    return (
        <Parallax
            // blur={{ min: -400, max: 200}}
            bgImage={img}
            bgImageAlt="Menu item"
            strength={0}
        >
            <div className="hero h-[500px]" >
                <div className="hero-overlay bg-opacity-4"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className=" mt-36 text-3xl  font-bold uppercase text-gray-200">{title}</h1>
                        <p className="mt-6">Just Cafe Foodies is dedicated to offering a warm and inviting dining experience, combining high-quality food with a relaxed café ambiance. We specialize in freshly prepared café-style meals, beverages, and desserts, ensuring every dish is made with premium ingredients. </p>
                       
                    </div>
                </div>
            </div>    </Parallax>

    );
};

export default Cover;