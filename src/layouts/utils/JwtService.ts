import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
    sub: string;
    role: string;
    id: number;
    email: string;
    status: boolean;
    iat: number;
}

export function isTokenExpired(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);

    if (!decodedToken.exp) {
        // Token does not have an expiration time (exp)
        return false;
    }

    const currentTime = Date.now() / 1000; // Current time in seconds

    return currentTime < decodedToken.exp;
}

export function isToken() {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}

// export function getAvatarByToken() {
//     const token = localStorage.getItem('token');
//     if (token) {
//         const decodedToken = jwtDecode<JwtPayload>(token);
//         return decodedToken.avatar;
//     }
// }

// export function getNameByToken() {
//     const token = localStorage.getItem('token');
//     if (token) {
//         const decodedToken = jwtDecode<JwtPayload>(token);
//         return decodedToken.name;
//     }
// }

export function getUsernameByToken() {
    const token = localStorage.getItem('token');
    if (token) {
        return (jwtDecode<JwtPayload>(token)).sub;
    }
}

export function getIdUserByToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.id;
    }
}

export function getRoleByToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.role;
    }
}

export function logout(navigate: any) {
    navigate("/login");
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
}
