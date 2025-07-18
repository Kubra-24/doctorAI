import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    signUp: "Sign Up",
    fullName: "Full name",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    alreadyAccount: "Already have an account",
    or: "-or-",
    userAgreement: "User License Agreement",
    close: "Close",
    agree: "I Agree",
    selectLanguage: "Select Language",
    cancel: "Cancel",
    meetDoctorAI: "Meet DOCTOR AI",
    introScreen: "Intro Screen",
    stepsDiagnosis: "10 Steps Diagnosis",
    walkthroughScreen: "Walkthrough Screen",
    howToUse: "How To Use",
    skip: "Skip",
    next: "Next",
    done: "Done",
  },
  tr: {
    signUp: "Kayıt Ol",
    fullName: "Ad Soyad",
    email: "E-posta",
    password: "Şifre",
    signIn: "Giriş Yap",
    alreadyAccount: "Zaten hesabınız var mı",
    or: "-veya-",
    userAgreement: "Kullanıcı Lisans Sözleşmesi",
    close: "Kapat",
    agree: "Kabul Ediyorum",
    selectLanguage: "Dil Seçiniz",
    cancel: "İptal",
    meetDoctorAI: "DOCTOR AI ile Tanışın",
    introScreen: "Tanıtım Ekranı",
    stepsDiagnosis: "10 Adımlı Teşhis",
    walkthroughScreen: "Tanıtım Sayfası",
    howToUse: "Nasıl Kullanılır",
    skip: "Atla",
    next: "İleri",
    done: "Bitir",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
