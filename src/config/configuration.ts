
export const appConfig=()=>({
  server:{
    port:process.env.PORT
  },
  db:{
   url:process.env.MONGODB_URI
  },
  jwt:{
    jwt_secret:process.env.JWT_SECRET,
    jwt_expire_in:process.env.JWT_EXPIRE_IN
  }
})