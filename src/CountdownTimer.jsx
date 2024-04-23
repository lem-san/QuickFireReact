import './CountdownTimer.css'
import clock from './assets/countdownClock.png'
import React, {useEffect, useState, useContext} from 'react'
import { playCountdownTheme } from './Sounds'

const CountdownTimer = ( {duration} ) => {  
    const [timerDuration, setTimeDuration] = useState(duration)

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(1, '0')
        const secs = (seconds % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeDuration((prevTimerDuration) => {
                if (prevTimerDuration === 0) {
                    clearInterval(timer)
                    return 0
                } else if (prevTimerDuration === 32){
                    playCountdownTheme()
                    return prevTimerDuration - 1
                } else {
                    return prevTimerDuration - 1
                }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [duration])

    return (
        <>
            <div id="countdown">
                <img src={clock}/>
                <h1>{formatTime(timerDuration)}</h1>
            </div>  
        </>
    )
}

export default CountdownTimer