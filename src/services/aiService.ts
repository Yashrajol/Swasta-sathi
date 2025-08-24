import { HealthResponse } from '../types';
import { apiService } from './apiService';

export class AIService {
  private static instance: AIService;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async getHealthAdvice(symptoms: string, language: string = 'en'): Promise<HealthResponse> {
    try {
      // Try backend API first
      const response = await apiService.getHealthAdvice(symptoms, language);
      return response;
    } catch (error) {
      console.error('Backend API error:', error);
      
      // Fallback to local database
      return this.getOfflineResponse(symptoms);
    }
  }

  private getOfflineResponse(symptoms: string): HealthResponse {
    const lowerSymptoms = symptoms.toLowerCase();
    
    // Simple keyword matching for offline fallback
    const healthDatabase: { [key: string]: HealthResponse } = {
      fever: {
        advice: "Rest well and stay hydrated. Monitor your temperature regularly.",
        severity: 'medium',
        shouldSeeDoctor: true,
        recommendations: [
          "Take rest",
          "Stay hydrated",
          "Monitor temperature",
          "Take paracetamol if needed"
        ]
      },
      headache: {
        advice: "Rest in a quiet, dark room. Avoid bright lights and loud noises.",
        severity: 'low',
        shouldSeeDoctor: false,
        recommendations: [
          "Rest in quiet environment",
          "Stay hydrated",
          "Avoid bright lights",
          "Consider pain relievers"
        ]
      },
      cough: {
        advice: "Stay hydrated and rest. Consider honey for soothing.",
        severity: 'low',
        shouldSeeDoctor: false,
        recommendations: [
          "Stay hydrated",
          "Rest well",
          "Use honey for soothing",
          "Avoid smoking"
        ]
      },
      fatigue: {
        advice: "Get adequate rest and maintain a healthy diet.",
        severity: 'low',
        shouldSeeDoctor: false,
        recommendations: [
          "Get adequate sleep",
          "Eat nutritious food",
          "Stay hydrated",
          "Exercise moderately"
        ]
      }
    };

    for (const [key, value] of Object.entries(healthDatabase)) {
      if (lowerSymptoms.includes(key) || lowerSymptoms.includes(key.replace('_', ' '))) {
        return value;
      }
    }

    // Default response if no match found
    return {
      advice: "I recommend consulting with a healthcare professional for proper diagnosis and treatment.",
      severity: 'medium',
      shouldSeeDoctor: true,
      recommendations: [
        "Consult a qualified doctor",
        "Monitor your symptoms",
        "Rest and stay hydrated",
        "Seek immediate help if symptoms worsen"
      ]
    };
  }

  // Track symptom trends for analytics
  async trackSymptom(symptom: string, language: string = 'en') {
    try {
      await apiService.trackSymptom(symptom, language);
    } catch (error) {
      console.error('Failed to track symptom:', error);
      // Fallback to localStorage
      const trends = JSON.parse(localStorage.getItem('symptom-trends') || '{}');
      trends[symptom] = (trends[symptom] || 0) + 1;
      localStorage.setItem('symptom-trends', JSON.stringify(trends));
    }
  }

  async getSymptomTrends(): Promise<{ [key: string]: number }> {
    try {
      const response = await apiService.getSymptomTrends() as { data: { [key: string]: number } };
      return response.data || {};
    } catch (error) {
      console.error('Failed to get symptom trends:', error);
      // Fallback to localStorage
      return JSON.parse(localStorage.getItem('symptom-trends') || '{}');
    }
  }
}

export const aiService = AIService.getInstance();