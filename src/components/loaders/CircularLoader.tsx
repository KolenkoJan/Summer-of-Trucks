import "./CircularLoader.scss"

interface ICircularLoader {
    className?: string
}

export const CircularLoader: React.FC<ICircularLoader> = ({ className }) => {
    return (
        <div className="flex">
            <span className={`circular ${className}`}>
                <svg viewBox="22 22 44 44">
                    <circle className="circle" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"></circle>
                </svg>
            </span>
        </div>
    )
}
