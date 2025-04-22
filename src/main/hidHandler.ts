import HID from 'node-hid'
import JoystickOutput from '../models/JoystickOutput'

let device: HID.HID | null = null

// TODO: Refactor this to use a more generic way to get the vendorId and productId
const startHIDReading = (
  callback: (joystickOutput: JoystickOutput, error: Error | null) => void
): void => {
  device = new HID.HID(4617, 20308) // Hardcoded vendorId and productId for the Radiomaster joysticks

  let latestBuffer: Buffer | null = null
  device.on('data', (data: Buffer) => {
    if (latestBuffer?.equals(data)) return
    latestBuffer = data

    let joystickOutput = new JoystickOutput(data)
    callback(joystickOutput, null)
  })

  device.on('error', (error: Error) => {
    console.error('Error:', error)
    latestBuffer = null
    device = null
    callback(new JoystickOutput(), error)
  })

  device.on('close', () => {
    console.log('Device closed')
    latestBuffer = null
    device = null
  })

  device.on('disconnect', () => {
    console.log('Device disconnected')
    latestBuffer = null
    device = null
  })
}

const startHIDListening = (
  callback: (joystickOutput: JoystickOutput, error: Error | null) => void
): void => {
  if (device) {
    startHIDReading(callback)
    return
  }

  setInterval(() => {
    if (device) {
      return
    }

    console.log('Checking for joystick connection...')
    const devices = HID.devices()
    const joystick = devices.find(
      (device: any) => device.vendorId == 4617 && device.productId == 20308
    )
    if (joystick) {
      console.log('Joystick connected')
      startHIDReading(callback)
      return
    }
  }, 1000)
}

export { startHIDListening }
