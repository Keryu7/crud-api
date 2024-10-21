import { addUser, getAllUsers, getUserById, updateUser, deleteUser } from './user.service';
import { User } from '../models/user.model';

describe('User Service', () => {
    beforeEach(() => {
        const originalUsers = getAllUsers();
        originalUsers.length = 0;
    });

    test('should add a new user', () => {
        const user: User = addUser('U. Karatkevich', 43, ['Book writer']);

        expect(user).toHaveProperty('id');
        expect(user.username).toBe('U. Karatkevich');
        expect(user.age).toBe(43);
        expect(user.hobbies).toEqual(['Book writer']);
    });

    test('should get all users', () => {
        addUser('S. Aleksievich', 52, ['Nobel laureate']);
        const users = getAllUsers();

        expect(users).toHaveLength(1);
        expect(users[0].username).toBe('S. Aleksievich');
    });

    test('should get a user by ID', () => {
        const user: User = addUser('U. Karatkevich', 43, ['Book writer']);
        const fetchedUser = getUserById(user.id);

        expect(fetchedUser).toEqual(user);
    });

    test('should return undefined for non-existing user ID', () => {
        const fetchedUser = getUserById('non-existing-id');

        expect(fetchedUser).toBeUndefined();
    });

    test('should update a user', () => {
        const user: User = addUser('U. Karatkevich', 43, ['Book writer']);
        const updatedUser = updateUser(user.id, 'J. Kolas', 12, ['Belarusian writer']);

        expect(updatedUser).toBeDefined();
        expect(updatedUser?.username).toBe('J. Kolas');
        expect(updatedUser?.age).toBe(12);
        expect(updatedUser?.hobbies).toEqual(['Belarusian writer']);
    });

    test('should return undefined for update non-existing user', () => {
        const updatedUser = updateUser('non-existing-id', 'J. Kolas', 12, ['Belarusian writer']);

        expect(updatedUser).toBeUndefined();
    });

    test('should delete a user', () => {
        const user: User = addUser('U. Karatkevich', 43, ['Book writer']);
        const deleted = deleteUser(user.id);

        expect(deleted).toBe(true);
        expect(getUserById(user.id)).toBeUndefined();
    });

    test('should return false for delete non-existing user', () => {
        const deleted = deleteUser('non-existing-id');

        expect(deleted).toBe(false);
    });
});