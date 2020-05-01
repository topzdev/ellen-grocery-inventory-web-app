import dotenv from 'dotenv'

dotenv.config();

interface IConfig {
    port: any,
    database: any,
    cloudinary: any,
    jwtSecret: any
}

const config: IConfig = {
    port: process.env.PORT,
    database: {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT + '')
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        folder_name: process.env.CLOUDINARY_FOLDER_NAME
    },
    jwtSecret: process.env.JWT_SECRET
}

export default config;
