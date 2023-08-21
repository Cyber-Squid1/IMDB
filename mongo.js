const mongoose=require('mongoose')

MONGO_URL='mongodb+srv://om:admin@cluster0.cojrzv0.mongodb.net/?retryWrites=true&w=majority' || process.env.MONGO_URL

mongoose.connection.once('open',()=>{
    console.log('Mongo DB connection is ready')
})

mongoose.connection.on('error',(err)=>{
    console.error(err)
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports={
    mongoConnect,
    mongoDisconnect
}