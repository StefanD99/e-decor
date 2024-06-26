import { Button } from "react-bootstrap";
import "./notFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className='card-container'>
        <h1 className='text-danger'>This page does not exist!</h1>
        <Button className="not-found-btn" as={Link} to={'/home'}>Back to Home</Button>
    </div>
  )
};

export default NotFound;
