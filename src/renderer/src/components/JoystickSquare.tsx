import React from 'react'

interface JoystickSquareProps {
    x: number
    y: number
}

const JoystickSquare: React.FC<JoystickSquareProps> = ({ x, y }) => {
    const calculatePosition = (value: number) => {
        return Math.min(Math.max(((value - 1000) / (2000 - 1000)) * 100, 0), 100)
    }

    const xPosition = calculatePosition(x)
    const yPosition = calculatePosition(y)

    return (
        <div style={styles.container}>
            <div
                style={{
                    ...styles.circle,
                    left: `${xPosition}%`,
                    top: `${100 - yPosition}%`,
                }}
            />
        </div>
    )
}

const styles = {
    container: {
        position: 'relative' as 'relative',
        width: '200px',
        height: '200px',
        border: '2px solid black',
    },
    circle: {
        position: 'absolute' as 'absolute',
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)'
    }
}

export default JoystickSquare