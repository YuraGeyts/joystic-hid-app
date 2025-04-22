import electronLogo from './assets/electron.svg'
import JoystickDisplay from './components/JoystickDisplay'

function App(): JSX.Element {
  console.log('App mounted')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <JoystickDisplay></JoystickDisplay>
    </>
  )
}

export default App
