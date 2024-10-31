// import dotenv from 'dotenv'
// dotenv.config()

export interface ProjectEnv {
  PROJECT_ID: string
  PINATA_API_KEY: string
  PINATA_API_SECRET: string
  AETERNUM_ADDRESS: string
}

// const envRaw = {
//   PROJECT_ID: process.env.PROJECT_ID,
//   PINATA_API_KEY: process.env.PINATA_API_KEY,
//   PINATA_API_SECRET: process.env.PINATA_API_SECRET,
// }

export const envRaw: ProjectEnv = {
  PROJECT_ID: '0f7057fa4e2ac8b217070e49461acb07',
  PINATA_API_KEY: '5684020ab8bc2e5768f7',
  PINATA_API_SECRET:
    '8759c79e6c3cd0ae17598fe87da65ab56433407c7b850e70f6245d4354f31235',
  AETERNUM_ADDRESS: '0x6a1C093746db50ad4C79E5E9b685757FB6BcC140',
}

for (let i = 0; i < Object.keys(envRaw).length; i++) {
  const key = Object.keys(envRaw)[i]
  const value = Object.values(envRaw)[i]

  if (!value) throw new Error(`Missing ${key} in .evn file`)
}

export const env: ProjectEnv = {
  PROJECT_ID: envRaw.PROJECT_ID,
  PINATA_API_KEY: envRaw.PINATA_API_KEY,
  PINATA_API_SECRET: envRaw.PINATA_API_SECRET,
  AETERNUM_ADDRESS: envRaw.AETERNUM_ADDRESS,
}
