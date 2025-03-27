import React, { createContext, useContext, useState } from 'react';

type Language = 'de' | 'en';

interface TranslationKeys {
  hero: {
    title: {
      main: string;
      sub: string;
    };
    question: string;
    subtitle: string;
    cta: string;
  };
  features: {
    title: string;
    calendar: {
      title: string;
      description: string;
    };
    integration: {
      title: string;
      description: string;
    };
    wellbeing: {
      title: string;
      description: string;
    };
  };
  benefits: {
    title: string;
    efficiency: {
      title: string;
      description: string;
    };
    productivity: {
      title: string;
      description: string;
    };
    satisfaction: {
      title: string;
      description: string;
    };
  };
  form: {
    title: string;
    name: string;
    email: string;
    company: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  language: {
    de: string;
    en: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const translations: Record<Language, TranslationKeys> = {
  de: {
    hero: {
      title: {
        main: 'Team‑Ressourcenplanung',
        sub: 'leicht gemacht'
      },
      question: 'Haben Sie Schwierigkeiten mit der Planung Ihres Teams und möchten die Arbeitsbelastung optimieren?',
      subtitle: 'Verwalten Sie mühelos Teampläne, verhindern Sie Überlastung und steigern Sie die Produktivität mit unserer integrierten Plattform.',
      cta: 'Interesse registrieren'
    },
    features: {
      title: 'Hauptfunktionen',
      calendar: {
        title: 'Intelligente Kalenderübersicht',
        description: 'Visualisieren Sie Teamverfügbarkeit und Ressourcenallokation auf einen Blick.'
      },
      integration: {
        title: 'Tool-Integration',
        description: 'Nahtlose Verbindung mit Ihren CRM- und Kalendertools für ein einheitliches Erlebnis.'
      },
      wellbeing: {
        title: 'Team-Wohlbefinden',
        description: 'Verhindern Sie Burnout durch intelligente Arbeitsverteilung und Benachrichtigungen.'
      }
    },
    benefits: {
      title: 'Vorteile',
      efficiency: {
        title: 'Gesteigerte Effizienz',
        description: 'Reduzieren Sie Zeitaufwand für Planung und Koordination um bis zu 40%.'
      },
      productivity: {
        title: 'Höhere Produktivität',
        description: 'Optimierte Ressourcenallokation führt zu 25% mehr Teamproduktivität.'
      },
      satisfaction: {
        title: 'Bessere Zufriedenheit',
        description: 'Verbesserte Work-Life-Balance durch intelligente Arbeitsverteilung.'
      }
    },
    form: {
      title: 'Jetzt anfangen',
      name: 'Name',
      email: 'E-Mail',
      company: 'Unternehmen',
      message: 'Nachricht (Optional)',
      submit: 'Absenden',
      submitting: 'Wird gesendet...',
      success: 'Vielen Dank für Ihr Interesse! Wir melden uns bald bei Ihnen.',
      error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.'
    },
    language: {
      de: 'Deutsch',
      en: 'English'
    }
  },
  en: {
    hero: {
      title: {
        main: 'Team Resource Planning',
        sub: 'Made Easy'
      },
      question: 'Struggling with team planning and want to optimize workload?',
      subtitle: 'Effortlessly manage team schedules, prevent overwork, and boost productivity with our integrated platform.',
      cta: 'Register Your Interest'
    },
    features: {
      title: 'Key Features',
      calendar: {
        title: 'Smart Calendar Overview',
        description: 'Visualize team availability and resource allocation in one glance.'
      },
      integration: {
        title: 'Tool Integration',
        description: 'Seamlessly connect with your CRM and calendar tools for a unified experience.'
      },
      wellbeing: {
        title: 'Team Wellbeing',
        description: 'Prevent burnout with intelligent workload distribution and alerts.'
      }
    },
    benefits: {
      title: 'Benefits',
      efficiency: {
        title: 'Increased Efficiency',
        description: 'Reduce planning and coordination time by up to 40%.'
      },
      productivity: {
        title: 'Higher Productivity',
        description: 'Optimized resource allocation leads to 25% more team productivity.'
      },
      satisfaction: {
        title: 'Better Satisfaction',
        description: 'Improved work-life balance through intelligent workload distribution.'
      }
    },
    form: {
      title: 'Get Started Today',
      name: 'Name',
      email: 'Email',
      company: 'Company',
      message: 'Message (Optional)',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: 'Thank you for your interest! We\'ll be in touch soon.',
      error: 'Something went wrong. Please try again.'
    },
    language: {
      de: 'Deutsch',
      en: 'English'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string | string[] => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value[k];
      if (!value) return key;
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 