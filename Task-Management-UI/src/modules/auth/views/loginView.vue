<template>
    <div class="min-h-screen flex items-center bg-gray-100 justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="rounded-md shadow-md bg-white p-8 space-y-6">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                <form v-show="showEmailForm" @submit.prevent="handleEmailLogin" class="space-y-4">
                    <div>
                        <input v-model="email" type="email" required
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email" />
                    </div>
                    <div>
                        <input v-model="password" type="password" required
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password" />
                    </div>
                    <button type="submit" :disabled="isLoading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                        {{ isLoading ? 'Log in' : 'Login with Email' }}
                    </button>
                </form>

                <button @click="handleGoogleLogin" :disabled="isLoading"
                    class="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Login with Google
                </button>

                <div class="relative flex items-center">
                    <div class="flex-grow border-t border-gray-300"></div>
                    <span class="flex-shrink mx-4 text-gray-500">or</span>
                    <div class="flex-grow border-t border-gray-300"></div>
                </div>

                <button @click="toggleEmailForm" type="button"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {{ showEmailForm ? 'Use Google Instead' : 'Use Email Instead' }}
                </button>

                <div v-if="error" class="text-red-600 text-center text-sm">{{ error }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

const router = useRouter();

interface LoginResponse {
    status: 'success' | 'error'
    success: boolean
    message?: string
    token?: string
}

interface JWTData {
    data: {
        hash: string
        hash_login: string
    }
    iat: number
    exp: number
}

const email = ref('')
const password = ref('')
const showEmailForm = ref(false)
const isLoading = ref(false)
const error = ref('')

const BACKEND_URL = 'http://localhost:3000';

const decodeJWT = (token: string): JWTData | null => {
    try {
        const payload = token.split('.')[1]
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
        return decoded as JWTData
    } catch (err) {
        console.error('Invalid token', err);
        return null
    }
}

const handleResponse = async (axiosResponse: AxiosResponse<LoginResponse>): Promise<void> => {
    const data = axiosResponse.data
    console.log({data})
    error.value = ''
    if (axiosResponse.status >= 400) {
        error.value = data.message || 'Login failed'
        return
    }

    if (data.success && data.status === 'success' && data.token) {
        const payload = decodeJWT(data.token)
        if (payload?.exp && payload.exp * 1000 < Date.now()) {
            error.value = 'Token expired'
            isLoading.value = false
            return
        }
        localStorage.setItem('token', data.token)
        if (payload?.exp) {
            localStorage.setItem('token_expiry', String(payload.exp * 1000))
        }
        if (payload?.data) {
            localStorage.setItem('userData', JSON.stringify(payload.data))
            console.log('User Data:', payload.data)
        }
        router.push('/')
    } else {
        error.value = 'Unexpected response'
    }
    isLoading.value = false
}

const handleEmailLogin = async (): Promise<void> => {
    if (!email.value || !password.value) {
        error.value = 'Please enter email and password'
        return
    }
    isLoading.value = true
    try {
        const response: AxiosResponse<LoginResponse> = await axios.post(`${BACKEND_URL}/auth/get_login`, {
            email: email.value,
            password: password.value
        })
        console.log({response})
        await handleResponse(response)
    } catch (err: any) {
        error.value = err.response?.data?.message || 'Network error'
        isLoading.value = false
    }
}

const handleGoogleLogin = async (): Promise<void> => {
    isLoading.value = true
    const mockData: LoginResponse = {
        status: 'success',
        success: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Imhhc2giOiIyM2o0ZzNnNDUyZzU0IiwiaGFzaF9sb2dpbiI6IjEyMyJ9LCJpYXQiOjE3NjAzMzE1ODQsImV4cCI6MTc2MDMzNTE4NH0.eKfs2Ie6PobO3w9VkwA2DegirEVVfYREn_1AnFgUehM'
    }

    console.log('Mock Data is:', {mockData})
    const mockResponse: AxiosResponse<LoginResponse> = {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
            headers: {},
        } as InternalAxiosRequestConfig,
        request: {},
    }
    console.log({mockResponse})

    await handleResponse(mockResponse)
    router.push('/')
}

const toggleEmailForm = (): void => {
    showEmailForm.value = !showEmailForm.value
}
</script>

<style scoped>
:global(body),
:global(html),
:global(#app) {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
}
</style>