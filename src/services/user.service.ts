import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [];

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

export const updateUser = (userId: string, username: string, age: number, hobbies: string[]): User | undefined => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) return undefined;

    const updatedUser = { ...users[userIndex], username, age, hobbies };
    users[userIndex] = updatedUser;
    return updatedUser;
};

export const deleteUser = (userId: string): boolean => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
};