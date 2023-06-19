import { MongoClient, ObjectId } from 'mongodb'
import React from 'react'
import MeetUpDetail from '../../components/meetups/MeetUpDetail'

const MeetUpDetails = (props) => {
    return (
        <>
            <MeetUpDetail
                image={props.meetUpData.image}
                title={props.meetUpData.title}
                address={props.meetUpData.address}
                description={props.meetUpData.description}
            />
        </>

    )
}

export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://ganesh3075:fHJuKkEwvcpzTvxy@cluster0.ml68afu.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetUpsCollection = db.collection('meetups');
    const meetups = await meetUpsCollection.find({}, { _id: 1 }).toArray();
    client.close()

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({ params: { meetUpId: meetup._id.toString() } }))
        // [
        //     {
        //         params: {
        //             meetUpId: '1'
        //         }
        //     },
        //     {

        //         params: {
        //             meetUpId: '2'
        //         }
        //     }
        // ]
    }
}

export const getStaticProps = async (context) => {
    const meetUpId = context.params.meetUpId;

    // console.log(meetUpId);

    const client = await MongoClient.connect('mongodb+srv://ganesh3075:fHJuKkEwvcpzTvxy@cluster0.ml68afu.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetUpsCollection = db.collection('meetups');
    const selectedMeetUp = await meetUpsCollection.findOne({ _id: new ObjectId(meetUpId) });
    client.close()
    return {
        props: {
            meetUpData: {
                id: selectedMeetUp._id.toString(),
                image: selectedMeetUp.image,
                title: selectedMeetUp.title,
                address: selectedMeetUp.address,
                description: selectedMeetUp.description
            }
        }
    }
}
export default MeetUpDetails