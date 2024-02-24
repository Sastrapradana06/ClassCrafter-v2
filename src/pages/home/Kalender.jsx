import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Kalender() {
  const [date, setDate] = useState(new Date());


  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="w-full h-max  flex justify-center pb-5 lg:pb-3 items-center flex-col gap-3 bg-[#404556]">
      <div className=" w-full">
        <h1 className='text-[1.4rem] m-4 text-center uppercase tracking-wider text-[#dda15e] font-semibold '>Kalender</h1>
      </div>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
    </div>
  )
}