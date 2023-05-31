describe('Login', () => {
    it('should fail for empty username', () => {
        const username = '';
        const password = 'password';

        const result = login(username, password);
        expect(result.status).toBe(401);
    });

    it('should fail for empty password', () => {
        const username = 'username';
        const password = '';

        const result = login(username, password);
        expect(result.status).toBe(401);
    });

    it('should fail for incorrect username or password', () => {
        const username = 'admin';
        const password = 'incorrect_password';

        const result = login(username, password);

        expect(result.status).toBe(401);
        expect(result.error).toBe('Invalid credentials');
        expect(result.data).toBeNull();
    });

    it('should return a status 200 on success login', () => {
        const result = login('admin', 'password');
        expect(result.status).toBe(200);
    });

    it('should have the following properties on success login', () => {
        const expectedResponse = {
            data: {
                user_id: expect.any(Number),
                name: expect.name,
                email: expect.email,
                access_token: expect.any(String),
                refresh_token: expect.any(String),
            },
        };

        const result = login('admin', 'password');

        expect(result.status).toBe(200);
        expect(result.data).toEqual(expectedResponse.data);
    });
});
