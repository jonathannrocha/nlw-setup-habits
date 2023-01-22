import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../libs/axios";

interface HabitListProps {
    date: Date;
    onCompletedChange: (completed: number) => void
}

interface HabitsInfoProps {
    possibleHabist: Array<{
        id: string;
        title: string;
        created_at: string; 
    }> ,
    completedHabits: string[]
}
export function HabitList({date, onCompletedChange} : HabitListProps) {

    const [habitsInfo, setHabistInfo ] = useState<HabitsInfoProps>()
   
    useEffect( () => {
         api.get('day', {
            params: {
                date: date.toISOString()
            }
        })
            .then(res => {
                setHabistInfo(res.data)
                // console.log(res.data)
            })
    },[])
    

    const isDateThePast = dayjs(date)
                            .endOf('day')
                            .isBefore(new Date())


    async function handleToggleHabit( habitId:string ) {

        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        await api.patch(`/habits/${habitId}/toggle`)

        

        let completedHabits: string[] = []

        if( isHabitAlreadyCompleted ) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabistInfo({
            possibleHabist: habitsInfo!.possibleHabist,
            completedHabits,
        })
        
        onCompletedChange( completedHabits.length)
        // console.log(habitsInfo)
    }

    
    return (
        <div className="mt-6 flex flex-col gap-3 ">
           
            { habitsInfo?.possibleHabist.map( habit => {
                // console.log(habistInfo?.possibleHabist)
                return (
                    <Checkbox.Root
                        key={habit.id}
                        onCheckedChange={()=> handleToggleHabit(habit.id)}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        disabled={isDateThePast}
                        className='flex items-center gap-3 group'
                    >
                        <div 
                            className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 "
                        >
                            <Checkbox.Indicator>
                                <Check size={20} text-white />
                            </Checkbox.Indicator>
                        </div>

                        <span 
                            className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
                        >
                            { habit.title}
                        </span>
                    </Checkbox.Root>
                )
            })}
            
                        
        </div>
    )
}