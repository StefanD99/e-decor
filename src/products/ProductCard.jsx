import { Link } from 'react-router-dom';
import './productCard.css';
import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';


function ProductCard({items, handleClick, warning, detailPage, renderTooltip, showCongratulations}) {

  return (
    <>
    {
      warning && <div className='warning'>Item is already added to your cart</div>
    } 

    {
      showCongratulations && <div className='congratulation-div'>Item was added to the cart</div>
    }
    
    {
        items.length > 0 ? (
          items.map((product) => (
            <React.Fragment key={product.id}>
            <div className="card">
              <Link to={'/product'}>
                <OverlayTrigger
                  placement="left"
                  delay={{ show: 100, hide: 150 }}
                  overlay={renderTooltip}>
              <img onClick={() => detailPage(product)} src={product.image} alt="product_image" className='product-image' />
                </OverlayTrigger>
              </Link>
              <h2>{product.name}</h2>
              <p className="price">{product.price + '$'}</p>
              <button onClick={() => handleClick(product)}>Add to Cart</button>
            </div>
            </React.Fragment>
          ))  
        ) : (
          <p>No items found in this category</p>
        )
      }
    </>
  )
};

export default ProductCard;
