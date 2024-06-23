import { Button, Carousel, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import HomeImage1 from '../assets/Home_1.png';
import HomeImage2 from '../assets/Home_2.png';
import HomeImage3 from '../assets/Home_3.png';
import HomeImage4 from '../assets/Home_4.png';
import HomeImage5 from '../assets/Home_5.png';
import HomeImage6 from '../assets/Home_6.png';
import HomeImage7 from '../assets/Home_7.png';
import CustomCarousel from "../shared/Carousel";
import { useMediaQuery } from "react-responsive";

function Home({detailPage}) {

    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
            <div className="all-wrapper">
            <div className="home-wrapper">
                <div className="left-side-wrapper">
                    <h1 className='mt-3'>Welcome to E-Decor</h1>
                    <p className='mt-4'>Introducing E-Decor, your one-stop online destination for all your home interior needs. Browse our extensive collection of stylish and functional furniture, including chairs, tables, sofas, beds, and more. Elevate your kitchen game with our wide range of appliances, cookware, and dining essentials. Add a touch of warmth and ambiance with our exquisite selection of lamps, lighting fixtures, and home decor accessories. With E-Decor, you can shop from the comfort of your own home, enjoy competitive pricing, and take advantage of fast and reliable shipping. Whether you're looking to refresh your entire space or simply upgrade a single piece, E-Decor has got you covered.</p>
                    <Button className='button-cta' role='button' as={Link} to='/categories'>Browse Categories</Button>
                    <div className='vertical-line'></div>
                </div>
                <div className="right-side-wrapper">
                    <Image src={HomeImage1} alt={'Home_Image_1'} roundedCircle className='image' />
                    <div className="images-wrapper">
                        <Image src={HomeImage2} alt="img" roundedCircle className='img img-1' />
                        <Image src={HomeImage3} alt="img" roundedCircle className='img img-2' />
                        <Image src={HomeImage4} alt="img" roundedCircle className='img img-3' />
                    </div>
                </div>
            </div>

            <div className="home-wrapper-2 ">
                <div className="titles text-center">
                    <h1>Browe the range</h1>
                    <h3>Check our most browed categories</h3>
                </div>
                {
                    !isMobile 
                    ?
                    <>
                <div className="images-wrapper-2">
                    <Image src={HomeImage6} className="img-4" alt="img" />
                    <Image src={HomeImage5} className="img-4" alt="img" />
                    <Image src={HomeImage7} className="img-4" alt="img" />
                </div>
                <div className="imgs-text">
                    <h3 onClick={() => navigate('/categories')}>-Best Furniture-</h3>
                    <h3 onClick={() => navigate('/categories')}>-New Smart Tv's-</h3>
                    <h3 onClick={() => navigate('/categories')}>-Table Designs-</h3>
                </div>
                </>
                :
                <div className="images-wrapper-2">
                    <Carousel fade>
                        <Carousel.Item>
                        <img
                            className="img-4"
                            src={HomeImage6}
                            alt="First slide"
                        />
                        <h3 onClick={() => navigate('/categories')}>-Best Furniture-</h3>
                        </Carousel.Item>
                        <Carousel.Item>
                        <img
                            className="img-4"
                            src={HomeImage5}
                            alt="Second slide"
                        />
                        <h3 onClick={() => navigate('/categories')}>-New Smart Tv's-</h3>
                        </Carousel.Item>
                        <Carousel.Item>
                        <img
                            className="img-4"
                            src={HomeImage7}
                            alt="Third slide"
                        />
                        <h3 onClick={() => navigate('/categories')}>-Table Designs-</h3>
                        </Carousel.Item>
                    </Carousel>
                    </div>
                }
            </div>
            <hr className="hr-2" />
                <CustomCarousel detailPage={detailPage} />
            </div>
    )
};

export default Home;
