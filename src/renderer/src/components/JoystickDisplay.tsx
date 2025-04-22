import React, { useState, useEffect } from 'react'
import { JoystickOutputInterface } from '../../../models/JoystickOutput'
import JoystickSquare from './JoystickSquare'

const JoystickDisplay: React.FC = () => {
  // State to store joystick data
  const [joystickData, setJoystickData] = useState<JoystickOutputInterface | null>(null)

  useEffect(() => {
    // Listen for joystick data from the main process via IPC
    const { ipcRenderer } = window.electron

    ipcRenderer.on('hid-data', (_, data: JoystickOutputInterface) => {
      setJoystickData(data)
    })

    ipcRenderer.on('hid-stop', () => {
      setJoystickData(null)
    })

    // Clean up the event listener when the component unmounts
    return (): void => {
      ipcRenderer.removeAllListeners('hid-data')
    }
  }, [])

  // Progress calculation function
  const calculateProgress = (pwmValue: number) => {
    return ((pwmValue - 1000) / (2000 - 1000)) * 100;
  };

  const renderPWMTable = () => {
    if (!joystickData) return null;
  
    const excludedChannels = ['yaw', 'throttle', 'roll', 'pitch']
    const filteredData = Object.entries(joystickData).filter(([channel]) => !excludedChannels.includes(channel))
  
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

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Joystick Position</h1>
      {joystickData && (
        <div style={styles.row}>
          <div style={styles.squareContainer}>
            <h2>Yaw and Throttle</h2>
            <JoystickSquare x={joystickData.yaw} y={joystickData.throttle} />
          </div>
          <div style={styles.squareContainer}>
            <h2>Roll and Pitch</h2>
            <JoystickSquare x={joystickData.roll} y={joystickData.pitch} />
          </div>
        </div>
      )}
      {joystickData && renderPWMTable()}
    </div>
  );
};

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  squareContainer: {
    width: '45%',
    textAlign: 'center' as 'center',
    alignItems: 'center'
  },
  centerContainer: {
    display : 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default JoystickDisplay