import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, AlertCircle, Brain } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useVoice } from '../hooks/useVoice';
import { aiService } from '../services/aiService';
import VoiceVisualizer from '../components/VoiceVisualizer';
import type { HealthResponse } from '../types';

const VoiceAssistant: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [healthResponse, setHealthResponse] = useState<HealthResponse | null>(null);

  const { isListening, isSupported, startListening, stopListening, speak } = useVoice({
    language: 'en', // You can make this dynamic based on selected language
    onResult: (text: string) => {
      setTranscript(text);
      setError('');
    },
    onError: (error: string) => {
      setError(`${t('voice.error')}: ${error}`);
    }
  });

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setTranscript('');
      setError('');
    }
  };

  const handleGetAdvice = async () => {
    if (!transcript.trim()) {
      setError(t('voice.noSpeech'));
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const response = await aiService.getHealthAdvice(transcript);
      setHealthResponse(response);
      
      // Track symptom for analytics
      aiService.trackSymptom(transcript);
      
      // Speak the response
      speak(response.advice);
      
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBookAppointment = () => {
    navigate('/appointment', { 
      state: { 
        symptoms: transcript, 
        healthResponse 
      } 
    });
  };

  const handleAskAnother = () => {
    setTranscript('');
    setHealthResponse(null);
    setError('');
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Voice Not Supported
          </h2>
          <p className="text-gray-600 mb-4">
            Your browser doesn't support voice recognition. Please use a modern browser like Chrome, Firefox, or Safari.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('voice.title')}
          </h1>
          <p className="text-gray-600">
            {t('voice.placeholder')}
          </p>
        </div>

        {!healthResponse ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Voice Input Section */}
            <div className="text-center mb-8">
              <VoiceVisualizer isActive={isListening} />
              
              <div className="mt-6">
                <button
                  onClick={handleMicClick}
                  disabled={isProcessing}
                  className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full text-white font-semibold text-lg transition-all duration-200 ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isListening ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                {isListening ? t('voice.speakNow') : t('voice.startListening')}
              </p>
            </div>

            {/* Transcript Display */}
            {transcript && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What you said:
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800">{transcript}</p>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Get Advice Button */}
            {transcript && !isProcessing && (
              <div className="text-center">
                <button
                  onClick={handleGetAdvice}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                >
                  <Brain className="h-5 w-5" />
                  <span>{t('voice.getAdvice')}</span>
                </button>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{t('voice.processing')}</p>
              </div>
            )}
          </div>
        ) : (
          /* Health Response Section */
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('results.title')}
              </h2>
              <div className="flex items-center justify-center space-x-2">
                <Volume2 className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Response is being read aloud</span>
              </div>
            </div>

            {/* Severity Badge */}
            <div className="flex justify-center mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                healthResponse.severity === 'high'
                  ? 'bg-red-100 text-red-800'
                  : healthResponse.severity === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {t(`results.severity.${healthResponse.severity}`)}
              </span>
            </div>

            {/* Health Advice */}
            <div className="mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-800 text-lg leading-relaxed">
                  {healthResponse.advice}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            {healthResponse.recommendations && healthResponse.recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('results.recommendations')}
                </h3>
                <ul className="space-y-2">
                  {healthResponse.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {healthResponse.shouldSeeDoctor && (
                <button
                  onClick={handleBookAppointment}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  {t('results.bookAppointment')}
                </button>
              )}
              
              <button
                onClick={handleAskAnother}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                {t('results.askAnother')}
              </button>
            </div>

            {/* Emergency Notice */}
            {healthResponse.severity === 'high' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700 text-sm">
                    {t('results.emergency')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;