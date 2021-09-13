const pomodoroTimer = document.querySelector('#pomodoro-timer')
const startButton = document.querySelector('#pomodoro-start')
const pauseButton = document.querySelector('#pomodoro-pause')
const stopButton = document.querySelector('#pomodoro-stop')

// START
startButton.addEventListener('click', () => {
  toggleClock()
})

// PAUSE
pauseButton.addEventListener('click', () => {
  toggleClock()
})

// STOP
stopButton.addEventListener('click', () => {
  toggleClock(true)
})

let isClockRunning = false
let type = 'Work'

// in seconds = 25 mins
let workSessionDuration = 1500
let currentTimeLeftInSession = 1500

// in seconds = 5 mins;
let breakSessionDuration = 300

const toggleClock = (reset) => {
  if (reset) {
    stopClock()
    // STOP THE TIMER
    
  } else {
    if (isClockRunning === true) {
     clockTimer = setInterval(() => {
      // decrease time left / increase time spent
      stepDown()
      displayCurrentTimeLeftInSession()
      }, 1000)
      
      // PAUSE THE TIMER
      clearInterval(clockTimer)
      isClockRunning = false
    } else {
      // START THE TIMER
      isClockRunning = true
    }
  }
}

const displayCurrentTimeLeftInSession = () => {
  const secondsLeft = currentTimeLeftInSession
  let result = ''
  const seconds = secondsLeft % 60
  const minutes = parseInt(secondsLeft / 60) % 60
  let hours = parseInt(secondsLeft / 3600)
  // add leading zeroes if it's less than 10
  function addLeadingZeroes(time) {
    return time < 10 ? `0${time}` : time
  }
  if (hours > 0) result += `${hours}:`
  result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
  pomodoroTimer.innerText = result.toString()
}

pomodoroTimer.innerText = result

const stopClock = () => {
  // 1) reset the timer we set
  clearInterval(clockTimer)
  // 2) update our variable to know that the timer is stopped
  isClockRunning = false
  // reset the time left in the session to its original state
  currentTimeLeftInSession = workSessionDuration
  // update the timer displayed
  displayCurrentTimeLeftInSession()
}

const stepDown = () => {
  if (currentTimeLeftInSession > 0) {
    // decrease time left / increase time spent
    currentTimeLeftInSession--
  } else if (currentTimeLeftInSession === 0) {
    // Timer is over -> if work switch to break, viceversa
    if (type === 'Work') {
      currentTimeLeftInSession = breakSessionDuration
      displaySessionLog('Work')
      type = 'Break'
    } else {
      currentTimeLeftInSession = workSessionDuration
      type = 'Work'
      displaySessionLog('Break')
    }
  }
  displayCurrentTimeLeftInSession()
}
