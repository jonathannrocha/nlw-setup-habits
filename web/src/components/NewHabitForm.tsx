import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../libs/axios";


const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado-feira'
]
export function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

   async function createNewHabit(event:FormEvent) {
        event.preventDefault()

        if( !title || weekDays.length === 0 ) {
            return 
        }
        
        await api.post('habits', {
            title,
            weekDays
        })
        setTitle('')
        setWeekDays([])

        alert('hábirto ok')
    }

    function handleToggleWeekDay(weekDay:number) {
        let newWeekDays:number[] = []

       weekDays.includes(weekDay) ?
            newWeekDays = weekDays.filter(day => day !== weekDay )  
            : newWeekDays = [...weekDays, weekDay]
               
        setWeekDays(newWeekDays.sort())
    }

    return (
        <form
            onSubmit={createNewHabit}
            className="w-full flex flex-col mt-6"
        >
            <label 
                htmlFor="title"
                className="font-semibold leading-tight"
            >
                Qual seu comprometimento?
            </label>

            <input 
                type="text" 
                id="title " 
                placeholder="ex..:Execercícios, dormir, bem, etc.." 
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400" 
                autoFocus
                value={title}
                onChange={(event)=> setTitle(event.target.value)}
            />

            <label 
                htmlFor=""
                className="font-semibold leading-tight mt-4"
            >
                Qual a recorrência?
            </label>   
                <div className="mt-3 flex flex-col gap-3 ">

                    { availableWeekDays.map( (weekDay, index) => {
                        return(                        
                            <Checkbox.Root
                                key={weekDay}
                                className='flex items-center gap-3 group'
                                checked={weekDays.includes(index)}
                                onCheckedChange={() =>  handleToggleWeekDay(index) }
                            >
                                <div 
                                    className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 "
                                >
                                    <Checkbox.Indicator>
                                        <Check size={20} text-white />
                                    </Checkbox.Indicator>
                                </div>

                                <span 
                                    className=" text-white leading-tight"
                                >
                                    {weekDay}
                                </span>
                            </Checkbox.Root>
                        )
                    })}
                </div>
            <button 
                type="submit"
                className="mt-6 rounded-lg p-4 leading-tight gap-3 font-semibold bg-green-600 flex items-center justify-center hover:bg-green-800"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>


        </form>
        
    )
}