export interface JoystickOutputInterface {
  roll: number
  pitch: number
  throttle: number
  yaw: number
  disarm: number
  abort: number
  detonation: number
  modeChange: number
}

class JoystickOuput {
  roll: number
  pitch: number
  throttle: number
  yaw: number
  disarm: number
  abort: number
  detonation: number
  modeChange: number

  /** byte offset mapping **/
  private defaultByteOffsetMap = {
    roll: 3, // Channel 1
    pitch: 5, // Channel 2
    throttle: 7, // Channel 3
    yaw: 9, // Channel 4
    disarm: 11, // Channel 5
    abort: 13, // Channel 6
    detonation: 15, // Channel 7
    modeChange: 17 // Channel 8
  }

  /** Constructor to initialize the joystick output data from a Buffer **/
  constructor(data?: Buffer) {
    if (data) {
      this.roll = data.readUint16LE(this.defaultByteOffsetMap.roll) // Roll
      this.pitch = data.readUint16LE(this.defaultByteOffsetMap.pitch) // Pitch
      this.throttle = data.readUint16LE(this.defaultByteOffsetMap.throttle) // Throttle
      this.yaw = data.readUint16LE(this.defaultByteOffsetMap.yaw) // Yaw
      this.disarm = data.readUint16LE(this.defaultByteOffsetMap.disarm) // SA
      this.abort = data.readUint16LE(this.defaultByteOffsetMap.abort) // SB
      this.detonation = data.readUint16LE(this.defaultByteOffsetMap.detonation) // SC
      this.modeChange = data.readUint16LE(this.defaultByteOffsetMap.modeChange) // SD
    } else {
      // Якщо дані не передано, ініціалізуємо всі значення як 0
      this.roll = 0
      this.pitch = 0
      this.throttle = 0
      this.yaw = 0
      this.disarm = 0
      this.abort = 0
      this.detonation = 0
      this.modeChange = 0
    }
  }

  /** Method to update the joystick output data from a Buffer **/
  updateValues(data: Buffer): void {
    this.roll = data.readUint16LE(this.defaultByteOffsetMap.roll) // Roll
    this.pitch = data.readUint16LE(this.defaultByteOffsetMap.pitch) // Pitch
    this.throttle = data.readUint16LE(this.defaultByteOffsetMap.throttle) // Throttle
    this.yaw = data.readUint16LE(this.defaultByteOffsetMap.yaw) // Yaw
    this.disarm = data.readUint16LE(this.defaultByteOffsetMap.disarm) // SA
    this.abort = data.readUint16LE(this.defaultByteOffsetMap.abort) // SB
    this.detonation = data.readUint16LE(this.defaultByteOffsetMap.detonation) // SC
    this.modeChange = data.readUint16LE(this.defaultByteOffsetMap.modeChange) // SD
  }

  private rawToPWM(value: number): number {
    // Convert the raw value to a PWM value (1000-2000)
    return Math.floor((value / 2047) * (2000 - 1000) + 1000)
  }

  /** Method to get RAW data
   * @returns {JoystickOutputInterface} JoystickOutputInterface object with raw values
   *  **/
  getRawData(): JoystickOutputInterface {
    return {
      roll: this.roll,
      pitch: this.pitch,
      throttle: this.throttle,
      yaw: this.yaw,
      disarm: this.disarm,
      abort: this.abort,
      detonation: this.detonation,
      modeChange: this.modeChange
    }
  }

  /** Method to get PWM data
   * @returns {JoystickOutputInterface} JoystickOutputInterface object with PWM values
   *  **/
  getPWMData(): JoystickOutputInterface {
    return {
      roll: this.rawToPWM(this.roll),
      pitch: this.rawToPWM(this.pitch),
      throttle: this.rawToPWM(this.throttle),
      yaw: this.rawToPWM(this.yaw),
      disarm: this.rawToPWM(this.disarm),
      abort: this.rawToPWM(this.abort),
      detonation: this.rawToPWM(this.detonation),
      modeChange: this.rawToPWM(this.modeChange)
    }
  }

  toString(): string {
    return `Roll: ${this.roll},
    Pitch: ${this.pitch},
    Throttle: ${this.throttle},
    Yaw: ${this.yaw},
    Disarm: ${this.disarm},
    Abort: ${this.abort},
    Detonation: ${this.detonation},
    Mode Change: ${this.modeChange}`
  }
}

export default JoystickOuput
