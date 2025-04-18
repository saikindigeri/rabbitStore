const express=require('express')

const cors=require('cors')
const dotenv=require('dotenv')
const connectDb =require('./config/db');
const userRoutes=require('./routes/userRoutes');
const productRoutes=require('./routes/productRoutes');
const cartRoutes=require('./routes/cartRoutes');
const checkoutRoutes=require('./routes/checkoutRoutes')
const orderRoutes=require('./routes/orderRoutes')
const uploadRoutes=require('./routes/uploadRoutes')
const subscriberRoutes=require('./routes/subscriberRoutes')
const adminRoutes=require('./routes/adminRoutes')
const productAdminRoutes=require('./routes/productAdminRoutes')
const adminOrderRoutes=require('./routes/adminOrderRoutes')

const app=express();

app.use(express.json())
app.use(cors())
dotenv.config();


 
const PORT=process.env.PORT||9000;

connectDb();

app.get("/",(req,res)=>{
    res.send("welcome to rabbit api")
})
 
//API Routes 
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes)
app.use('/api/orders',orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use('/api',subscriberRoutes);
app.use('/api/admin/users',adminRoutes)
app.use('/api/admin/products',productAdminRoutes)
app.use('/api/admin/orders',adminOrderRoutes)

app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`)
}) 