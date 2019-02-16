const  mongoose =require('mongoose')
mongoose.connect('mongodb://localhost:27017/order');
const conn = mongoose.connection
const  Schema=mongoose.Schema
conn.on('connected', function () {
    console.log('数据库连接成功!')
})

const OrderSchema = new Schema({
    userid:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    orderid: String,
    paytype: Number,
    date: { type: Date, default: Date.now },
});
const UserSchema=new Schema({
    name: String,
})

const order=mongoose.model('Order',OrderSchema)
const user=mongoose.model('User',UserSchema)
module.exports={
    getModel(name){
        return mongoose.model(name)
    }
}