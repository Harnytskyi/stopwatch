import { useEffect, useState } from 'react'
import { Observable, Subject } from 'rxjs';
import { buffer, map, filter, debounceTime } from 'rxjs/operators'

export const useLogic = () => {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState('stop');

    const handleStart = () => {
        setStatus('start');
    }
    const handleReset = () => {
        if (status === 'start')
            setStatus('reset');
        setTime(0);
    }
    const handleStop = () => {
        setStatus('stop');
        setTime(0);
    }
    const handleWait = () => {
        waitClick$.next();
    }

    const waitClick$ = new Subject()

    waitClick$.pipe(
        buffer(waitClick$.pipe(debounceTime(300))),
        map(item => item.length),
        filter(item => item === 2),
    ).subscribe(() => {
        setStatus('wait');
    })

    useEffect(() => {
        if (status === 'start') {
            const timer$ = new Observable((observer) => {
                const intervalId = setInterval(() => {
                    observer.next();
                }, 1000);

                return () => {
                    clearInterval(intervalId);
                };
            });
            const observer = {
                next: () => {
                    setTime((time) => time + 1)
                },
                error: () => {
                    console.log('error')
                },
                complete: () => {
                    console.log('observer complete')
                }
            };
            const subscription = timer$.subscribe(observer);
            return (() => {
                subscription.unsubscribe();
            })
        }
        if (status === 'reset') {
            setStatus('start');
        }
    }, [status])

    return {
        time,
        status,
        handleStart,
        handleReset,
        handleStop,
        handleWait,
    }
}
