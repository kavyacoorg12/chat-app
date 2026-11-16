export const appConfig = () => ({
  server: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.MONGODB_URI,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire_in: process.env.JWT_EXPIRE_IN,
  },
  cookie: {
    cookie_max_age: Number(process.env.COOKIE_MAX_AGE),
  },
  frontend: {
    frontend_url: process.env.FRONTEND_URL,
  },
  cloudinary: {
    cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET
  },
});
