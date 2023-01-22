import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HabitList } from './HabitsList';
import { useState } from 'react';

interface HabitProps {
    date: Date;
    defaultCompleted?: number;
    amount?: number;
}

export function HabitDay({ defaultCompleted=0, amount=0, date}: HabitProps) {

    const [ completed, setCompleted ] = useState(defaultCompleted);

    const progressPercentege = amount > 0 ? Math.round( (completed / amount) * 100) : 0;

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    
  function handleCompletedChaged(completed: number) {
    setCompleted(completed)
  }


    return (
        <Popover.Root>
             <Popover.Trigger className={clsx("w-10 h-10  rounded-lg", {
                'bg-zinc-900 border-2 border-zinc-800': progressPercentege === 0,
                'bg-violet-900 border-violet-400': progressPercentege > 0 && progressPercentege < 20,
                'bg-violet-800 border-violet-400': progressPercentege >= 20 && progressPercentege < 40,
                'bg-violet-700 border-violet-400': progressPercentege >= 40 && progressPercentege < 60,
                'bg-violet-600 border-violet-400': progressPercentege >= 60 && progressPercentege < 80, 
                'bg-violet-500 border-violet-400': progressPercentege >= 80,
             })}></Popover.Trigger>

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
                    <span className='font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={progressPercentege}/>              

                    < HabitList date={date} onCompletedChange={handleCompletedChaged} /> 


                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />

                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
       
    )
}