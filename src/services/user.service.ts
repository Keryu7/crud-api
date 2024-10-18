import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [];

export const getAllUsers = (): User[] => users;

export const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
};

export const addUser = (username: string, age: number, hobbies: string[]): User => {
    const newUser: User = {
        id: uuidv4(),
        username,
        age,
        hobbies,
    };
    users.push(newUser);
    return newUser;
};