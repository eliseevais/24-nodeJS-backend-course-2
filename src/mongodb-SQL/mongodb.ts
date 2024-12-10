// MONGODB,  denormalization (data duplication)
// collection
// type User = {
//   id: number // auto inc db task
//   firstName: string
//   lastName: string
//   passportNumber: string
//   profile: {
//     hobby: string
//     education: string
//   } // one to one
//   sharedWalletsIds: { title, id, currency }[] // many to many
// }
//
// // wallets
// type WalletMongo = {
//   id: string // main key, uuid app level
//   title: string
//   currency: "USD" | "BTC" | "BYN"
//   ownerId: number
//   sharedWithUsersIds: { fullName, userId }[]
// }