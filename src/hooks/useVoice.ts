import { useState, useEffect, useRef } from 'react';

interface UseVoiceProps {
  language: string;
  onResult: (text: string) => void;
  onError: (error: string) => void;
}

export const useVoice = ({ language, onResult, onError }: UseVoiceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getLanguageCode(language);

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
        
        if (finalTranscript) {
          onResult(finalTranscript);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        onError(event.error);
      };
    }
  }, [language, onResult, onError]);

  const getLanguageCode = (lang: string) => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'mr':
        return 'mr-IN';
      default:
        return 'en-US';
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.lang = getLanguageCode(language);
      recognitionRef.current.start();
      setTranscript('');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(language);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to find a voice for the selected language
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => 
        voice.lang.startsWith(getLanguageCode(language).split('-')[0])
      );
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      speechSynthesis.speak(utterance);
    }
  };

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    speak
  };
};