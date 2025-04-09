import React, { useState, useEffect } from 'react'
import { JoystickOutputInterface } from '../../../models/JoystickOutput'


const JoystickDisplay: React.FC = () => {
  // State to store joystick data
  const [joystickData, setJoystickData] = useState<JoystickOutputInterface | null>(null)

  useEffect(() => {
    // Listen for joystick data from the main process via IPC
    const { ipcRenderer } = window.electron

    ipcRenderer.on('hid-data', (_, data: JoystickOutputInterface) => {
      setJoystickData(data)
    })

    // Clean up the event listener when the component unmounts
    return (): void => {
      ipcRenderer.removeAllListeners('hid-data')
    }
  }, [])

  // Function to render the PWM table
  const renderPWMTable = () => {
    if (!joystickData) return null

    return (
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>PWM</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(joystickData).map(([channel, pwmValue]) => (
            <tr key={channel}>
              <td>{channel}</td>
              <td>{pwmValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>Joystick PWM Output</h1>
      {renderPWMTable()}
    </div>
  )
}

export default JoystickDisplay