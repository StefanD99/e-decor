import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./footer.css";

function Footer() {
    return (
        <footer className="footer custom-footer">
        <div className="bg-black text-white py-3 text-center d-flex flex-column justify-content-between footer-container">
            <div className="icons-container">
                        <h5 className="mb-4">Follow Us</h5>
                        <a href="https://instagram.com" className="text-secondary link-social link-instagram"><FaInstagram size={25} color="darkviolet" /></a>
                        <a href="https://linkedin.com" className="text-secondary link-social link-linkedin"><FaLinkedin size={25} color="darkblue" /></a>
                        <a href="https://facebook.com" className="text-secondary link-social link-facebook"><FaFacebookF size={25} color="blue" /></a>
            </div>
            <div className="links-container">
                <a href="#">Terms of Service</a>
                <a href="#">About us</a>
                <a href="#">Contact us</a>
                <a href="#">Privacy Policy</a>
            </div>
            <hr />
                <p className="p-text">© 2024 E-Decor. All rights reserved.</p>
        </div>
        </footer>
    )
};

export default Footer;
