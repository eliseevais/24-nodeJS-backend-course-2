// SQL

// table
type UserSQL = {
  id: number // Main key, auto inc db task
  firstName: string
  lastName: string
  passportNumber: string
}

// table
type Wallet = {
  id: string // main key, uuid app level
  title: string
  ownerId: number // foreign key, many to one
}

// table
type Profile = {
  hobby: string
  education: string
  userId: number // foreign key
}

// table
type WalletsSharings = {
  id: string // Primary key
  walletId: string
  userId: number
  addedDate: Date
  status: "Paused" | "Active" | "Deleted"
}

// table
type WalletsSharingsLimits = {
  walletsSharing: string // foreign key
  limitPerDay: number
  limitPerWeek: number
  limitPerMonths: number
}