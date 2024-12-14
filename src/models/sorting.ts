// запустить файл yarn ts-node .\src\models\sorting.ts

let users = [
  {id: 'dsdf2-adfs-233', name: 'dimych', age: 34},
  {id: 'csd3-ddfs-11', name: 'ivan', age: 33},
  {id: 'dsdc1-dwfs-31', name: 'ignat', age: 20},
  {id: '6sac3-1d1s-21', name: 'artem', age: 20},
  {id: '6sac3-1d1s-31', name: 'artem', age: 22},
  {id: '6sac3-1d1s-41', name: 'artem', age: 24},
  {id: '6sac3-1d1s-51', name: 'artem', age: 30},
  {id: '6sac3-1d1s-61', name: 'artem', age: 30},
  {id: '6sac3-1d1s-71', name: 'artem', age: 30},
  {id: '6sac3-1d1s-81', name: 'artem', age: 30},
  {id: '6sac3-1d1s-91', name: 'artem', age: 30},
  {id: '6sac3-1d1s-01', name: 'artem', age: 30},
]

users.push({id: 'qsdf2-sdfs-23', name: 'kolya', age: 22})

type SortedBy<T> = {
  fieldName: keyof T
  direction: 'asc' | 'desc'
}

const getSortedItems = <T>(items: T[], ...sortBy: SortedBy<T>[]) => {
  return [...items].sort((u1, u2) => {

    for (let sortConfig of sortBy) {
      if (u1[sortConfig.fieldName] < u2[sortConfig.fieldName]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (u1[sortConfig.fieldName] > u2[sortConfig.fieldName]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
    }

    return 0
  })
}

console.log(getSortedItems(users,
  {fieldName: 'name', direction: 'asc'},
  {fieldName: 'age', direction: 'desc'},
  {fieldName: 'id', direction: 'asc'}
))