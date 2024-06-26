import React, { useContext } from "react";
import "./productPage.css";
import CustomCarousel from "../shared/Carousel";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MainContext from "../context/MainContext";


function ProductPage() {

    const {handleClick, warning, press, detail, detailPage, showCongratulations} = useContext(MainContext);

    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Zoom Product
      </Tooltip>
    );

    return (
        <>
        {
            warning && <div className='warning'>Item is already added to your cart</div>
        }
        {
            showCongratulations && <div className='congratulation-div'>Item was added to the cart</div>
        }
        {
            press ?
            <div className="product-detail-div">
            <div className='detail-container'>
              
              <div className="detail-content">
                
              {
              detail.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                  <div className='detail-info'>
                    <div className="img-box text-center">
                    <Zoom>
                      <OverlayTrigger
                        placement="left"
                        delay={{ show: 100, hide: 150 }}
                        overlay={renderTooltip}>
                            <img src={item.image} alt="img" className='main-image' />
                      </OverlayTrigger>
                      </Zoom>
                      <div className="smaller-images-container">
                        <img src={item.image} alt="img" className="smaller-image" />
                        <img src={item.image} alt="img" className="smaller-image" />
                        <img src={item.image} alt="img" className="smaller-image" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2>{item.name}</h2>
                      <p className='item_price'>{item.price + '$'}</p>
                      <p className='des'>{item.des}</p>
                      <button onClick={() => handleClick(item)}>Add to Cart</button>
                    </div>
                  </div>
                  </React.Fragment>
                )
              })
            }
              </div>
            </div>
            </div> : 
            <div className="no-products-div">
            <h1 className="no-products">NO PRODUCTS TO BE FOUND!</h1>
            </div>
          }
          

          <CustomCarousel press={press} detailPage={detailPage} />
        </>
    )
};

export default ProductPage;
