import electronLogo from './assets/electron.svg'
import JoystickDisplay from './components/JoystickDisplay'

function App(): JSX.Element {
  console.log('App mounted')

  const readHIDData = (): void => window.electron.ipcRenderer.send('start-hid')

  const stopHIDReading = (): void => window.electron.ipcRenderer.send('stop-hid')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <JoystickDisplay></JoystickDisplay>
      <div className="actions">
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={readHIDData}>
            Read HID Data
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={stopHIDReading}>
            Stop HID reading
          </a>
        </div>
      </div>
    </>
  )
}

export default App
