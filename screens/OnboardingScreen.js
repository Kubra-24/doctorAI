import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useLanguage } from '../context/LanguageContext'; 

export default function OnboardingScreen({ navigation }) {
  const { t } = useLanguage();

  return (
    <Onboarding
      onSkip={() => navigation.replace('SignUp')}
      onDone={() => navigation.replace('SignUp')}
      skipLabel={t.skip}
      nextLabel={t.next}
      doneLabel={t.done}
      pages={[
        {
          backgroundColor: '#a7d0e1ff',
          title: t.meetDoctorAI,
        },
        {
          backgroundColor: '#d8d086ff',
          title: t.introScreen,
        },
        {
          backgroundColor: '#9f8ccdff',
          title: t.stepsDiagnosis,
          subtitle: t.walkthroughScreen,
        },
        {
          backgroundColor: '#9cc088ff',
          title: t.howToUse,
        },
      ]}
    />
  );
}
