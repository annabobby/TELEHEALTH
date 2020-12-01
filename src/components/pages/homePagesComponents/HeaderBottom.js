import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { useEffect } from 'react';
import { UserContext } from '../../useAuth';

const Calender = () => {
  const {handleSelectDate} = useContext(UserContext)
  const [date, setDate] = useState()

  // first time set date
  useEffect(() => {
    setDate(new Date())
  }, [])

  useEffect(() => {
    let formatDate = `${date ? format(date, 'MMM dd, yyyy', { locale: enGB }) : ''}`
    handleSelectDate(formatDate)
  }, [date])

  return (
    <>
      <div className="bg-white sidebar-content shadow p-2 text-center">
        <h2 className="text-capitalize fwb">Appointment</h2>
        <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
      </div>
    </>
  )
}


const HeaderBottom = ({ history }) => {

  const [appointment, setAppointment] = useState(false)
  
  useEffect(() => {
    if (history.location.pathname === '/create-appointment') {
      setAppointment(true)
    }
  }, [history])

  return (
    <section className="header-content">
      <div className="row">
        <div className="col-xl-5">
          {appointment ? <Calender  /> : (
            <div className="sidebar-content">
              <h2 className="text-capitalize fwb">TELEHEALTH </h2>
              <p className="py-2">Today's patient demands access and telehealth improves by enabling access to
treatment more quickly while eliminating the hassles of traveling to the physician's
office.
Telehealth provides online consultation, where the patient is diagnosed without the
doctor's physical presence.</p>
              <button type="button"
                onClick={() => history.push('/create-appointment')}
                className="btn mybtn">GET APPOINTMENT</button>
            </div>
          )}

        </div>
        <div className="col-xl-7">
          <div className="sidebar-image mr-2">
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(HeaderBottom);