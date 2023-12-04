import React from 'react';
import './CheckBox.scss';
import "../../typography/Text.scss"

interface ICheckboxProps {
    isChecked?: boolean;
    label?: string;
    onChange?: boolean;
}

export const CheckBox: React.FC<ICheckboxProps> = ({ isChecked, label, onChange }) => {

    return (
        <label className="container base-text body-m">
            {label}
            <input type="checkbox" checked={isChecked} />
            <div className="checkmark">
                <div className='circle'></div>
            </div>
        </label>
    );
};

