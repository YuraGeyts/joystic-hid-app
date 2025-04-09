import HID from 'node-hid'
import JoystickOutput from '../models/JoystickOutput'

let device: HID.HID | null = null

const startHIDReading = (callback: (joystickOutput: JoystickOutput) => void): void => {
  device = new HID.HID(4617, 20308) // Hardcoded vendorId and productId for the Radiomaster joysticks

  let latestBuffer: Buffer | null = null
  device.on('data', (data: Buffer) => {
    if (latestBuffer?.equals(data)) return
    latestBuffer = data

    let joystickOutput = new JoystickOutput(data)
    callback(joystickOutput)
  })

  device.on('error', (error: Error) => {
    console.error('Error:', error)
  })

  device.on('close', () => {
    console.log('Device closed')
    latestBuffer = null
    device = null
  })
}

const stopHIDReading = (): void => {
  if (device) {
    device.removeAllListeners('data')
    device.close()
    device = null
  }
}

export { startHIDReading, stopHIDReading }
