const timeFormater = {
  zeroPad(num) {
      num = num.toString()
      while (num.length < 2) num = "0" + num
      return num
  },

  format(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${timeFormater.zeroPad(minutes)}:${timeFormater.zeroPad(seconds)}`
  }
}

export default timeFormater
