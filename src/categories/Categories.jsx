import { Button, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import './categories.css';
import CategoriesFilter from "./CategoriesFilter";
import ProductCard from "../products/ProductCard";
import { useContext, useState } from "react";
import { productData } from "../products/dataProduct";
import MainContext from "../context/MainContext";


function Categories() {

    const [filteredItems, setFilteredItems] = useState(productData);
    const {handleClick, warning, detailPage, showCongratulations} = useContext(MainContext);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Check Product
        </Tooltip>
      );

    return (
        <>
        <div className='categories-container'>
            <Button className="border-0 home-link" variant="link" as={Link} to="/home" style={{ color: 'black'}}>Home</Button>
            <div className="filter-container text-center">
                <CategoriesFilter productData={productData} onFilter={setFilteredItems} />
            </div>
            <div className='product-container content'>
                <ProductCard items={filteredItems} handleClick={handleClick} warning={warning} detailPage={detailPage} renderTooltip={renderTooltip} showCongratulations={showCongratulations} />
            </div>
        </div>
        </>
    )
};

export default Categories;