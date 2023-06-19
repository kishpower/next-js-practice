import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList.js'

const HomePage = (props) => {
    return (
        <MeetupList meetups={props.meetups}></MeetupList>
    )
}

// export function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://ganesh3075:fHJuKkEwvcpzTvxy@cluster0.ml68afu.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetUpsCollection = db.collection('meetups');
    const meetUps = await meetUpsCollection.find().toArray();

    return {
        props: {
            meetups: meetUps.map(meetup => {
                return {
                    id: meetup._id.toString(),
                    title: meetup.title,
                    description: meetup.description,
                    address: meetup.address,
                    image: meetup.image
                }
            })
        },
        revalidate: 5
    }
}

export default HomePage