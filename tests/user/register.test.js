describe('Registration', () => {
    it('should register a new user with valid data', () => {
        const userData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        };

        const result = register(userData);

        expect(result.status).toBe(201);
    });

    it('should fail registration with missing required fields', () => {
        const userData = {
            // Missing required fields: name, email, password
        };

        const result = register(userData);

        expect(result.status).toBe(400);
    });

    it('should fail registration with invalid email format', () => {
        const userData = {
            name: 'John Doe',
            email: 'invalidemail',
            password: 'password123',
        };

        const result = register(userData);

        expect(result.status).toBe(400);
    });

    it('should fail registration with too short password', () => {
        const userData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'pass',
        };

        const result = register(userData);

        expect(result.status).toBe(400);
    });

    it('should fail registration with too long name', () => {
        const userData = {
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            email: 'johndoe@example.com',
            password: 'password123',
        };

        const result = register(userData);

        expect(result.status).toBe(400);
    });
});
