import dotenv from 'dotenv'
dotenv.config()

const { DBNAME, DBUSER, DBPASSWD, DBHOST, DBPORT } = process.env

// Kast fejl hvis nødvendige variabler mangler
if (!DBNAME || !DBUSER || !DBPASSWD || !DBHOST || !DBPORT) {
  throw new Error('Missing required database environment variables');
}

export const config = {
    db: {
        name: DBNAME,
        user: DBUSER,
        password: DBPASSWD,
        host: DBHOST,
        port: parseInt(DBPORT)
    }
}