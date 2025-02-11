import { getElement, createElement, insertBefore, addClass } from "../utils/domUtils.js";
import logger from "../utils/logger.js";

export default function validateForm() {
    const nickRef = getElement('#nick');
    try {
        if(nickRef.value.length < 5) {
            throw {
                message : 'Your nickname must be at least 5 characters long',
                nodeRef : nickRef
            };
        }
        return true;
    } catch(error) {
        logger(error.message);
        error.nodeRef.focus();
        const formRef = getElement('#form');
        const btnRef = getElement('#submitBtn');
        const errorRef = createElement('p');
        errorRef.textContent = error.message;
        errorRef.id = 'errorMsg';
        addClass(errorRef, 'error-msg');
        insertBefore(formRef, errorRef, btnRef);
        return false;
    }
}