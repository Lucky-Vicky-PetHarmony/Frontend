import axios from "axios";
import useAuthStore from "../store/useAuthStore";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // 쿠키와 인증 정보를 포함한 요청 허용
});

/** 요청이 서버로 전송되기 전에 실행
    : localStorage에 저장된 Access Token이 있으면, 이를 Authorization 헤더에 포함
*/
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/** 서버로부터 응답을 받은 후 실행
    : 응답 헤더에 새로운 Access Token이 있는지 확인하고,
      그 Access Token을 추출하여 상태 관리 라이브러리(Zustand의 useAuthStore)를 통해 업데이트하고,
      localStorage에도 저장
*/
axiosInstance.interceptors.response.use(
    (response) => {
        const newToken = response.headers['Authorization'] || response.headers['authorization'];
  
        if (newToken) {
            const accessToken = newToken.replace('Bearer ', '');
            useAuthStore.getState().updateToken(accessToken);
            localStorage.setItem('token', accessToken);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config
        // Access Token이 만료되었다고 간주하고, 새로 토큰을 발급
        if ((error.response && (error.response.status === 401 || error.response.status === 403)) && !originalRequest._retry) {
            originalRequest._retry = true; // 중복된 요청 방지
            try {
                const refreshResponse = await axiosInstance.post(
                    '/api/auth/refresh-token',
                    {}
                );
                
                const newToken = refreshResponse.headers['Authorization'] || refreshResponse.headers['authorization'];
         
                if (newToken) {
                    const accessToken = newToken.replace('Bearer ', '');
                    useAuthStore.getState().updateToken(accessToken);
                    localStorage.setItem('token', accessToken);
    
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) { // Refresh Token 요청에 실패하면, 사용자 로그아웃
                useAuthStore.getState().logout();
                window.location.href = '/';
                throw refreshError;
            }
        }
    
        return Promise.reject(error);
    }
);

export default axiosInstance;