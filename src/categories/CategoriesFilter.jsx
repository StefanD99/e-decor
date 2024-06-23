import { Button, Container, Row } from "react-bootstrap";
import { useState } from "react";
import '../products/productCard.css';



function CategoriesFilter({ productData, onFilter }) {

    const [selectedCategory, setSelectedCategory] = useState('All');

    const filterItems = (catItem) => {
        setSelectedCategory(catItem);
        if (catItem === 'All') {
            onFilter(productData);
        } else {
            const filteredItems = productData.filter(item => item.category === catItem);
            onFilter(filteredItems);
        }
    }

    return (
        <>
            <Container className="d-flex text-center mt-5 filter-container">
                <Row className="w-100 justify-content-center mt-5 btns-container">
                    <Button className="bg-white rounded-0 btn-categories btn-all" onClick={() => filterItems('All')}>All</Button>
                    <Button className="bg-white rounded-0 btn-categories" onClick={() => filterItems('Furniture')}>Furniture</Button>
                    <Button className="bg-white rounded-0 btn-categories" onClick={() => filterItems('Electronics')}>Electronics</Button>
                    <Button className="bg-white rounded-0 btn-categories" onClick={() => filterItems('Lamps')}>Lamps</Button>
                    <Button className="bg-white rounded-0 btn-categories" onClick={() => filterItems('Kitchen')}>Kitchen</Button>
                    <Button className="bg-white rounded-0 btn-categories" onClick={() => filterItems('Chairs')}>Chairs</Button>
                    <Button className="bg-white rounded-0 btn-categories" onClick={() => filterItems('Tables')}>Tables</Button>
                </Row>
            </Container>
        </>
    )
};

export default CategoriesFilter;
