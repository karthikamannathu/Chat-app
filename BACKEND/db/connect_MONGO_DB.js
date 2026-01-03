import mongoose from 'mongoose'
import React from 'react'

export const connect_MONGO_DB = async () => {
 try {
    await mongoose.connect(process.env.MONGO_DB_URL)
      console.log("connect to MongoDB")

} catch (error) {
    console.log(error)
 }
}
