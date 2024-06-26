import { createContext, useReducer } from "react";
import { Toast } from "react-bootstrap";
import alertReducer from "./AlertReducer";
import { useMediaQuery } from "react-responsive";

const initState = {
    message: '',
    variant: '',
    isAlert: false
}

const AlertContext = createContext(initState);

export const AlertProvider = ({children}) => {
    const [state, dispatch] = useReducer(alertReducer, initState);

    const isLaptop = useMediaQuery({ query: '(max-width: 1440px)' });

    const showAlert = (message, variant='success') => {
        dispatch({
            type: 'SHOW_ALERT',
            payload: {
                message,
                variant
            }
        });
    }

    return (
        <AlertContext.Provider value={{...state, showAlert}}>
            {children}
            
            <Toast 
                onClose={() => dispatch({type: 'HIDE_ALERT'})} 
                show={state.isAlert} 
                delay={3000} 
                autohide
                bg={state.variant}
                style={{
                    position: 'fixed',
                    top: 120,
                    right: '0',
                    textAlign: 'center',
                    fontFamily: 'Verdana',
                    fontWeight: 'bold'
                }}>
                    <Toast.Body>{state.message}</Toast.Body>
            </Toast>
        </AlertContext.Provider>
    )
}

export default AlertContext;