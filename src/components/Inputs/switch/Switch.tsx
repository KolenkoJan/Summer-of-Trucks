import "./Switch.scss"
import "../../typography/Text.scss"
import { observer } from "mobx-react-lite"

interface ISwitchProps {
    label?: string
    isChecked?: boolean
    onChange?: (isChecked: boolean) => void
    disabled?: boolean
    className?: string
}

export const Switch: React.FC<ISwitchProps> = observer(({ label, isChecked, onChange, disabled, className }) => {
    return (
        <label className={`switch ${className}`}>
            <input type="checkbox" disabled={disabled} checked={isChecked} onChange={(e) => onChange && onChange(e.target.checked)} />
            <span className="slider round">
                <div className="circle"></div>
            </span>
            <span className="label-text base-text body-m">{label}</span>
        </label>
    )
})
