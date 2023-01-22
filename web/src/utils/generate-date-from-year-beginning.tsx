import dayjs from "dayjs";

export function generateDatefromYearBeginning() {
    const firstDayOfTheYear = dayjs().startOf('year');
    const today = new Date();

    const dates = [];
    let compareDate = firstDayOfTheYear;

    while(compareDate.isBefore(today)) {
        dates.push(compareDate.toDate());
        compareDate = compareDate.add(1, 'day');
    }
    console.log(`[generateDate: ${dates[0]} até ${dates[dates.length - 1]}]`)
    return dates;
}