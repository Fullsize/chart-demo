import axios from 'axios';
let userInfo: any = localStorage.getItem('smart-viewer-userinfo') || sessionStorage.getItem('smart-viewer-userinfo');
let token: any = localStorage.getItem('smart-viewer-token') || sessionStorage.getItem('smart-viewer-token');

const instance = axios.create({
    baseURL: '',
    timeout: 1000 * 30,
    headers: {
        Authorization: token,
        'x-auth-token': token,
        'content-type': 'application/json',
    },
});
instance.interceptors.response.use(
    (response) => {
        const code = response?.data?.['code']?.toString();
        if (code === '11002' || code === '11003' || code === '11004') {
            if (window.isSsoLogin) {
                location.href = window.ssoLogin;
            }
            removeToken();
        }
        if (response.headers['x-auth-token']) {
            setToken(response.headers['x-auth-token']);
        }

        return response;
    },
    (error) => {
        // 异常情况 console，方便排查问题
        console.log('error', error);
        return Promise.reject(error);
    },
);

function setToken(t: any) {
    token = 'sys.' + t;
    if (t?.startsWith?.('sys.')) {
        token = t;
    } else {
        token = 'sys.' + t;
    }

    instance.defaults.headers['Authorization'] = token;
    instance.defaults.headers['x-auth-token'] = token;
    localStorage.setItem('smart-viewer-token', token);
    sessionStorage.setItem('smart-viewer-token', token);
}
function getToken() {
    return token;
}

function setLoginUser(user: any) {
    userInfo = user;
    localStorage.setItem('smart-viewer-userinfo', userInfo);
    sessionStorage.setItem('smart-viewer-userinfo', userInfo);
}
function getLoginUser() {
    let user: any = {};
    try {
        user = JSON.parse(userInfo);
    } catch (error) {}
    return user;
}

function removeToken() {
    token = null;
    userInfo = null;
    localStorage.removeItem('smart-viewer-token');
    sessionStorage.removeItem('smart-viewer-token');
    localStorage.removeItem('smart-viewer-userinfo');
    sessionStorage.removeItem('smart-viewer-userinfo');
}
export { token, getToken, setToken, getLoginUser, setLoginUser, removeToken };
export default instance;
