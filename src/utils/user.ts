const tokenStorageUser = {
    tokenKey: 'smart_token',
};

const user = Object.freeze({
    getToken(): string | undefined {
        return sessionStorage.getItem(tokenStorageUser.tokenKey) || window['basetoken'] || undefined;
    },
    setToken(value: string): void {
        sessionStorage.setItem(tokenStorageUser.tokenKey, value);
    },
    removeToken(): void {
        sessionStorage.removeItem(tokenStorageUser.tokenKey);
    },
});

export default user;
