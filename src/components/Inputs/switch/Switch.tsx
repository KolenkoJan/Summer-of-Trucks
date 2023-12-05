import "./Switch.scss"
import "../../typography/Text.scss"

interface ISwitchProps {
    label?: string
    isChecked?: boolean
    onChange?: (isChecked: boolean) => void
}

export const Switch: React.FC<ISwitchProps> = ({ label, isChecked, onChange }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={(e) => onChange && onChange(e.target.checked)} />
            <span className="slider round">
                <div className="circle"></div>
            </span>
            <span className="label-text">{label}</span>
        </label>
    )
}
