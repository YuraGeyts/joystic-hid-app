import React from 'react'
import { JoystickOutputInterface } from '../../../models/JoystickOutput'
import styles from '../../../shared/styles'

const PWMTable: React.FC<JoystickOutputInterface> = (props) => {
    // Progress calculation function
    const calculateProgress = (pwmValue: number) => {
        return ((pwmValue - 1000) / (2000 - 1000)) * 100
    }
    
    const renderPWMTable = () => {
        const excludedChannels = ['yaw', 'throttle', 'roll', 'pitch']
        const filteredData = Object.entries(props).filter(([channel]) => !excludedChannels.includes(channel))
    
        return (
        <div style={styles.centerContainer}>
            <table>
            <thead>
                <tr>
                <th>Type</th>
                <th>PWM</th>
                <th>Progress</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map(([channel, pwmValue]) => (
                <tr key={channel}>
                    <td>{channel}</td>
                    <td>{pwmValue}</td>
                    <td>
                    <div style={{ width: '100%', backgroundColor: '#ddd', height: '12px' }}>
                        <div
                        style={{
                            width: `${calculateProgress(pwmValue)}%`,
                            backgroundColor: 'green',
                            height: '100%',
                        }}
                        />
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )
    }
    
    return renderPWMTable()
}

export default PWMTable