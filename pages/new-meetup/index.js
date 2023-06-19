import React from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm.js'
import Layout from '../../components/layout/Layout.js'
const NewMeetUpPage = () => {
    const addMeetUpHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response);
        const data = await response.json();
        console.log(data);

    }
    return (

        <NewMeetupForm onAddMeetup={addMeetUpHandler}></NewMeetupForm>

    )
}

export default NewMeetUpPage   