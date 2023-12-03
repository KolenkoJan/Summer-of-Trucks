import React from 'react';
import './CheckBox.scss';

interface ICheckboxProps {
    isChecked?: boolean;
    label?: string;
}

export const CheckBox: React.FC<ICheckboxProps> = ({ isChecked, label }) => {

    return (
        <label className="container">
            {label}
            <input type="checkbox" checked={isChecked} />
            <span className="checkmark">
                <div className='circle'></div>
            </span>
        </label>
    );
};

