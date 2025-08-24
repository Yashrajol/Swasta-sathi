import { Request, Response } from 'express';
import OpenAI from 'openai';
import { HealthResponse } from '../types/index.ts';
import { logger } from '../utils/logger.ts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const getHealthAdvice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symptoms, language = 'en' } = req.body;

    if (!symptoms || symptoms.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Symptoms are required'
      });
      return;
    }

    const languageInstruction = getLanguageInstruction(language);
    
    const prompt = `You are a rural health assistant. A user says: "${symptoms}". 
    ${languageInstruction}
    
    Please provide a helpful response with:
    1. Simple care advice
    2. Severity level (low, medium, high)
    3. Whether they should see a doctor
    4. 3-4 practical recommendations
    
    Respond in JSON format:
    {
      "advice": "string",
      "severity": "low|medium|high",
      "shouldSeeDoctor": boolean,
      "recommendations": ["string1", "string2", "string3"]
    }`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful rural health assistant. Always provide practical, safe health advice and recommend seeing a doctor when appropriate.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const healthResponse: HealthResponse = JSON.parse(content);
    
    // Add symptoms and language to response
    const fullResponse = {
      ...healthResponse,
      symptoms,
      language,
      createdAt: new Date()
    };

    res.json({
      success: true,
      message: 'Health advice generated successfully',
      data: fullResponse
    });

    // Log the interaction for analytics
    logger.info(`Health advice requested: ${symptoms} (${language})`);

  } catch (error) {
    logger.error('AI health advice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate health advice'
    });
  }
};

export const trackSymptom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symptom, language = 'en' } = req.body;

    if (!symptom) {
      res.status(400).json({
        success: false,
        message: 'Symptom is required'
      });
      return;
    }

    // In a real application, you would save this to a database
    // For now, we'll just log it
    logger.info(`Symptom tracked: ${symptom} (${language})`);

    res.json({
      success: true,
      message: 'Symptom tracked successfully'
    });

  } catch (error) {
    logger.error('Symptom tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track symptom'
    });
  }
};

export const getSymptomTrends = async (req: Request, res: Response): Promise<void> => {
  try {
    // In a real application, you would query the database for trends
    // For now, we'll return mock data
    const trends = {
      'fever': 45,
      'headache': 32,
      'cough': 28,
      'fatigue': 25,
      'nausea': 18
    };

    res.json({
      success: true,
      message: 'Symptom trends retrieved successfully',
      data: trends
    });

  } catch (error) {
    logger.error('Symptom trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve symptom trends'
    });
  }
};

const getLanguageInstruction = (language: string): string => {
  switch (language) {
    case 'hi':
      return 'Please respond in Hindi (हिंदी).';
    case 'mr':
      return 'Please respond in Marathi (मराठी).';
    default:
      return 'Please respond in English.';
  }
}; 