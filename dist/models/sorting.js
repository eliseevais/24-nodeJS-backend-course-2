"use strict";
let users = [
    { id: 'dsdf2-adfs-233', name: 'dimych', age: 34 },
    { id: 'csd3-ddfs-11', name: 'ivan', age: 33 },
    { id: 'dsdc1-dwfs-31', name: 'ignat', age: 20 },
    { id: '6sac3-1d1s-21', name: 'artem', age: 20 },
];
users.push({ id: 'qsdf2-sdfs-23', name: 'kolya', age: 22 });
const getUsers = () => {
    return users;
};
console.log(getUsers());
