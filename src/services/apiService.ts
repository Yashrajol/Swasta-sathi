import { HealthResponse, Appointment, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await this.handleResponse<{
      success: boolean;
      message: string;
      data: {
        user: User;
        accessToken: string;
        refreshToken: string;
      };
    }>(response);

    if (data.success && data.data.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }

    return data;
  }

  async register(email: string, password: string, role: string = 'patient') {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, role })
    });

    const data = await this.handleResponse<{
      success: boolean;
      message: string;
      data: {
        user: User;
        accessToken: string;
        refreshToken: string;
      };
    }>(response);

    if (data.success && data.data.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }

    return data;
  }

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    const data = await this.handleResponse<{
      success: boolean;
      message: string;
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }>(response);

    if (data.success && data.data.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
    }

    return data;
  }

  // AI Health Assistant
  async getHealthAdvice(symptoms: string, language: string = 'en'): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/ai/health-advice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ symptoms, language })
    });

    const data = await this.handleResponse<{
      success: boolean;
      message: string;
      data: HealthResponse;
    }>(response);

    return data.data;
  }

  async trackSymptom(symptom: string, language: string = 'en') {
    const response = await fetch(`${API_BASE_URL}/ai/track-symptom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ symptom, language })
    });

    return this.handleResponse(response);
  }

  async getSymptomTrends() {
    const response = await fetch(`${API_BASE_URL}/ai/symptom-trends`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  // Appointments
  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'timestamp'>) {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(appointmentData)
    });

    return this.handleResponse(response);
  }

  async getAppointments() {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  async updateAppointment(id: string, updates: Partial<Appointment>) {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates)
    });

    return this.handleResponse(response);
  }

  async deleteAppointment(id: string) {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    return this.handleResponse(response);
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}

export const apiService = new ApiService(); 