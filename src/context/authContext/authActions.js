import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../fbConfig";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";

export const registerUser = async (formData) => {
    const {firstName, lastName, userName, email, password, country, city, address, postalCode} = formData;

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', result.user.uid), {
            uid: result.user.uid,
            firstName,
            lastName,
            userName,
            email,
            country,
            city,
            address,
            postalCode,
            createdAt: Timestamp.fromDate(new Date())
        });
        return result.user;
    } catch (error) {
        console.log(error);
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const sendForgotPasswordEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (formData) => {
    const {email, password} = formData;
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        console.log(error);
    }
};