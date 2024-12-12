import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../features/alertSlice';

const Alert = () => {
    const dispatch = useDispatch();
    const { isOpen, content, styling } = useSelector((state) => state.alert);

    useEffect(() => {

        if (isOpen) {
            const timer = setTimeout(() => {
                dispatch(hideAlert());
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, dispatch]);

    return (
        <div
            className={`fixed top-0 left-0 w-full p-2 text-center transition-transform duration-300 ease-in-out z-50 ${styling}`}
            role="alert"
        >
            <span className='font-sans'>{content}</span>
            <button
                className="ml-4 text-white text-xs font-bold underline"
                onClick={() => dispatch(hideAlert())}
            >
                Close
            </button>
        </div>
    );
};

export default Alert;
