import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bestSellingProducts } from "../products/bestSellingProducts";
import { Link } from "react-router-dom";

function CustomCarousel({press, detailPage}) {

    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
      },
        largeDesktop: {
          breakpoint: { max: 1440, min: 1024 },
          items: 4,
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };

    return (
        <div className="carousel-div">
            <hr className="hr-2" />
        <h1 className="text-center pt-5 pb-5 text-black" style={{fontFamily: 'Verdana', fontWeight: 'bold'}}>{press ? 'Check our best Products' : 'Best Selling Products'}</h1>
        <Carousel responsive={responsive} showDots={true}>
                {
                    bestSellingProducts.map((item) => (
                        <div className="item-card" key={item.id}>
                            <img src={item.image} alt="product_image" className='item-product-image' />
                            <h2>{item.name}</h2>
                            <p className="item-price">{item.price}$</p>
                            <p className="item-des">{item.des}</p>
                            <Link to={'/product'}>
                            <button onClick={() => detailPage(item)}>Check Product</button>
                            </Link>
                        </div>
                ))
                
                }
                </Carousel>
            </div>
    )
}

export default CustomCarousel;
