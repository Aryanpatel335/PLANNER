import React, {useEffect} from "react";
import { AppointmentForm } from "../../components/appointmentForm/AppointmentForm";
import { AppointmentTilesList } from "../../components/tileList/AppointmentTileList";
import { useSelector } from "react-redux";
import { appointmentsStateSelector, currentAppointmentIdSelector } from "../../store/appointmentsSlice";
import NavBar from "../../components/NavBar/NavBar";
import { getContacts } from "../../store/contactsSlice";
import { getAppointments } from "../../store/appointmentsSlice";
import { setCurrentUserId } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import './AppointmentsPage.css';
export const AppointmentsPage = () => {
  const appointments = useSelector(appointmentsStateSelector);
  const currentAppointmentId = useSelector(currentAppointmentIdSelector);
  const usernameProfile = JSON.parse(localStorage.getItem('profile'));
  const checkCurrentId = useSelector((state) => state.auth.currentUserId);
  let currentUserID;
  const dispatch = useDispatch();
  if(usernameProfile === null){
    currentUserID = ''
  }else{
    currentUserID = usernameProfile.userId
  }
  useEffect(()=>{ 
    
    dispatch(getContacts(currentUserID));
    dispatch(getAppointments(currentUserID));
    dispatch(setCurrentUserId(currentUserID));
  },[dispatch,currentUserID]);
 
  const renderAppointmentHeader = () =>{
    if(currentAppointmentId){
      return(<h2>Currently Editing Appointment</h2>);
    }
    else{
      return(<h2>Add Appointment</h2>);
    }
  }
  const renderMiscActivity = ()=>{
    if(!checkCurrentId){
      return(<h1>PLEASE LOGIN WITH VALID CREDENTIALS</h1>);
    }
  }

  return (
    <div className="mainbody">
      {renderMiscActivity()}
      {currentUserID && 
      <>
        <NavBar/>
        <section>
          {renderAppointmentHeader()}
          <AppointmentForm/>
        </section>
        <hr />
        <section>
          <h2>Appointments</h2>
          <AppointmentTilesList tiles={appointments}/>
        </section>
      </>
      }
    </div>
  );
};
