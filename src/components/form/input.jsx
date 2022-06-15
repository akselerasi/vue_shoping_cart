import React from 'react';
import { useTranslation } from 'react-i18next';

const BDFormInput = ({htmlInput, htmlInputErr, id, name, type, label, value, onChange, onBlur, errors, touched}) => {
    const {t} = useTranslation();
    const groupStyle = 'group my-[4.5rem] relative';
    const inputStyle = 'text-primary dark:text-white text-[1.8rem] block w-full border-0 rounded-none border-b border-primary-dim dark:border-white bg-transparent';
    const labelStyle = 'text-[2rem] text-black dark:text-white capitalize font-ssp font-regular absolute pointer-events-none top-[1rem] ease-in-out duration-300';
    const barStyle = 'bar relative block w-full';
    return <>
        { !htmlInput && <div className={groupStyle}>
            <input className={inputStyle} id={id} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} />
            <span className={barStyle}></span>
            <label className={labelStyle} htmlFor={id}>{t(label)}</label>
            { errors[name] && touched[name] && <div className='error text-red-600 text-3xl mt-4'>
                    * {t(errors[name])}
                </div>
            }
        </div> }
        { htmlInput && <div className={groupStyle}>
            <input className={inputStyle} id={id} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} />
            <span className={barStyle}></span>
            <label className={labelStyle} htmlFor={id}>{label}</label>
            <div className='error text-red-600 text-3xl mt-4'>
                {htmlInputErr}
            </div>
        </div> }
    </>
};

BDFormInput.displayName = 'form input';

export default BDFormInput;