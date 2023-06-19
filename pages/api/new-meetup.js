import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    const data = req.body;
    console.log(req.body);
    const client = await MongoClient.connect('mongodb+srv://ganesh3075:fHJuKkEwvcpzTvxy@cluster0.ml68afu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetUpsCollection = db.collection('meetups');
    const result = await meetUpsCollection.insertOne(data)

    console.log(result);
    await client.close();

    res.status(201).json({ meesage: "meetup inserted" })
}

export default handler;