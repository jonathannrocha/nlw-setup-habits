import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../libs/axios"
import { generateDatefromYearBeginning } from "../utils/generate-date-from-year-beginning"
import { HabitDay } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S' ]


const summaryDates = generateDatefromYearBeginning()
const minimumSummaryDatesSize = 18 * 7
const amountOfDatesToFill = minimumSummaryDatesSize - summaryDates.length;

type SummaryType = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[];

export function SummaryTable () {

    const [summary, setSummary] = useState<SummaryType>([])

    useEffect(()=> {
        api
            .get('summary')
            .then(res => {  
                setSummary(res.data);
            })
            .catch(()=> {
                
            })
    },[])
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                    return (
                        <div 
                            className="text-zinc-400 text-xl h-10 w-10 font-bold flex item-center justify-center"
                            key={`${weekDay}-${i}}`}
                        >
                            { weekDay }
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
               
                { summary.length > 0 && summaryDates.map( date => {
                    const dayInsummary = summary.find(day => dayjs(date).isSame(day.date, 'day'))

                    return (
                        <HabitDay 
                            key={date.toString()} 
                            date= {date}
                            amount={dayInsummary?.amount} 
                            defaultCompleted={dayInsummary?.completed} 
                        /> 
                    )
                })}

               { amountOfDatesToFill > 0 && Array.from({length: amountOfDatesToFill}).map((_, i)=> {
                return (
                    <div 
                        key={i} 
                        className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40"
                    ></div>
                )
               })}
                
                
            </div>
            
        </div>
    )
}