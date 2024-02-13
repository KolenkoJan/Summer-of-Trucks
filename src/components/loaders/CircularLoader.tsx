import "./CircularLoader.scss"

interface ICircularLoader {
    className?: string
    circleClassName?: string
}

export const CircularLoader: React.FC<ICircularLoader> = ({ className, circleClassName }) => {
    return (
        <div className={`flex ${className}`}>
            <span className="circular">
                <svg viewBox="22 22 44 44">
                    <circle color="white" stroke="white" className={`circle ${circleClassName}`} cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"></circle>
                </svg>
            </span>
        </div>
    )
}
