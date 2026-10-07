
export const appConfig=()=>({
  server:{
    port:process.env.PORT
  },
  db:{
   url:process.env.MONGODB_URI
  }
})