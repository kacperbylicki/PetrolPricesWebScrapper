import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;

export const petrol_url = process.env.PETROL_URL;

export const redis_port = process.env.REDIS_PORT;

export const cors_origin = process.env.CORS_ORIGIN;