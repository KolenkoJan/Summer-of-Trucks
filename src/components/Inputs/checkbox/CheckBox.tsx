import React from 'react';
import './CheckBox.scss';
import "../../typography/Text.scss"

interface ICheckboxProps {
    isChecked?: boolean;
    label?: string;
    onChange?: (newState: boolean) => void;
}

export const CheckBox: React.FC<ICheckboxProps> = ({ isChecked, label, onChange }) => {

    return (
        <label className="container base-text body-m">
            {label}
            <input type="checkbox" checked={isChecked} onChange={(e) => onChange && onChange(e.target.checked)}/>
            <div className="checkmark">
                <div className='circle'></div>
            </div>
        </label>
    );
};