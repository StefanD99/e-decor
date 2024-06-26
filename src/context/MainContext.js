import { createContext, useState } from "react";

const MainContext = createContext();

export const MainProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [warning, setWarning] = useState(false);
    const [isBought, setIsBought] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [detail, setDetail] = useState([]);
    const [press, setPress] = useState(false);
    const [active, setActive] = useState(false);

    const handleClick = (item) => {
        let isPresent = false;
        cart.forEach((product) => {
          if (item.id === product.id) {
            isPresent = true;
          }
        })
        if (isPresent) {
          setWarning(true);
          setTimeout(() => {
            setWarning(false);
          }, 2000);
            return;
        } else {
          setShowCongratulations(true);
          setTimeout(() => {
            setShowCongratulations(false);
          }, 2000)
        }
        setCart([...cart, item]);
      }

      const handleChange = (item, d) => {
        let ind = -1;
        cart.forEach((data, index) => {
          if (data.id === item.id) {
            ind = index;
          }
        });
        const tempArr = cart;
        tempArr[ind].amount += d;
        if (tempArr[ind].amount === 0) {
          tempArr[ind].amount = 1;
        }
        setCart([...tempArr]);
      }

      const detailPage = (product) => {
        setActive(true)
        setDetail([{...product}])
        setPress(true)
    };

    return <MainContext.Provider value={{
                                        cart, 
                                        setCart, 
                                        handleChange, 
                                        setIsBought, 
                                        detailPage, 
                                        handleClick, 
                                        warning,
                                        showCongratulations,
                                        press,
                                        detail,
                                        isBought}}>
        {children}
    </MainContext.Provider>
};

export default MainContext;