import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal, ScrollView,  // React Native’in hazır bileşenleri içe aktarılıyor. 
  StyleSheet, SafeAreaView, Image, TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  //Ionicons adında bir ikon kütüphanesinden ikonları kullanmanı sağlar
import { useLanguage } from '../context/LanguageContext';  //Çoklu dil desteği sağlamak için LanguageContext dosyasından dil bilgilerini alır.

const googleIcon = require('../assets/ıcon5.png');    //görsel (ikon) dosyalarını içeri aktarmak için kullanılır. 
const icloudIcon = require('../assets/ıcon2.webp');

const PasswordInput = ({ placeholder, value, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputBox}>   
      <TextInput
        placeholder={placeholder}            
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        autoCapitalize="none"   //Otomatik büyük harf açılmasın
        style={[styles.input, styles.inputWithPaddingRight]}   // PasswordInput bileşeninin gövdesini ve nasıl çalıştığını gösteriyor
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.eyeIconWrapper}
        accessible={true}   // Bu bileşenin erişilebilir (accessible) olduğunu belirtir.  ekran okuyucu gibi yardımcı teknolojiler bu alanı kullanıcıya bildirir
        accessibilityLabel={showPassword ? "Hide password" : "Show password"} //ekran okuyucuya (screen reader) kullanıcıya söylenecek metni belirtir.
                                                                              //görsel yerine, buradaki metin okunur.
>
<Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          color="#555"
        />
      </TouchableOpacity>
    </View>
  );
};

export default function SignUpScreen({ navigation }) {
  const { setLanguage, t } = useLanguage();  //Seçili dile göre metinleri getirir. 

  const [modalVisible, setModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const [fullName, setFullName] = useState('');     //Kullanıcının girdiği bilgileri tutar.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const isFormValid =                //Kayıt butonunun aktif olup olmayacağını kontrol eder.
    fullName.trim() !== '' &&       //Eğer tüm alanlar doluysa ve sözleşme onaylıysa, kayıt yapılabilir.
    email.trim() !== '' &&
    password.trim() !== '' &&
    isAgreementChecked;

  return (
    <SafeAreaView style={styles.container}>    
      <TouchableOpacity
        style={styles.backTextButton}
        onPress={() => navigation.navigate('Onboarding')}
        accessibilityRole="button"  //Ekran okuyucuya, bu bileşenin bir buton olduğunu belirtir.
        accessibilityLabel="Back to Onboarding" //Ekran okuyucu kullanıcıya butonun amacını söyler:
      >
        <Ionicons name="arrow-back" size={18} color="#1A78E5" style={styles.backIcon} />
        <Text style={styles.backText}>Back to Onboarding</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.languageButtonContainer}>                     
          <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>   
            <Text style={styles.languageButtonText}>🌐</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>{t.signUp}</Text>

          <View style={styles.inputBox}>
            <TextInput
              placeholder={t.fullName}
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              placeholder={t.email}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"  //Mobil klavyeyi e-posta yazmaya uygun şekilde açar 
              autoCapitalize="none"        //Harfleri otomatik büyük yapmaz. 
              style={styles.input}
            />
          </View>

          <PasswordInput
            placeholder={t.password}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.signUpButton, !isFormValid && styles.signUpButtonDisabled]}
            disabled={!isFormValid}        //kullanıcının "Kayıt Ol" (Sign Up) butonuna basabilmesini kontrol eder. 
          >
            <Text style={styles.signUpButtonText}>{t.signUp}</Text>
          </TouchableOpacity>

          <View style={styles.alreadyAccountContainer}>
            <Text style={styles.alreadyAccountText}>{t.alreadyAccount}? </Text>  
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>  
              <Text style={styles.signInText}>{t.signIn}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.flexOne} />

        <View style={styles.lowerSection}>
          <Text style={styles.orText}>{t.or}</Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => console.log('iCloud clicked')}>
              <Image source={icloudIcon} style={styles.iconImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Google clicked')}>
              <Image source={googleIcon} style={styles.iconImage} />
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setIsAgreementChecked(prev => !prev)}//Checkbox’a tıklandığında onay durumu değişir
              style={[styles.checkbox, isAgreementChecked && styles.checkboxChecked]}
            >
              {isAgreementChecked && <Ionicons name="checkmark" size={14} color="#fff" />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>  
              <Text style={styles.linkText}>{t.userAgreement}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}  //Modal açık mı kapalı mı onu kontrol eder.
        animationType="slide"   //Modal açılırken kayarak gelsin. 
        onRequestClose={() => setModalVisible(false)}  //Android’de geri tuşuna basıldığında modal’ı kapatır.
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t.userAgreement}</Text>
          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalText}>
              Agreement details go here...
            </Text>
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.closeButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>{t.close}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.agreeButton]}
              onPress={() => {
                setIsAgreementChecked(true);  //Checkbox otomatik olarak işaretlenir:   
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>{t.agree}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={languageModalVisible}  //Modal'ın açık mı kapalı mı olduğunu kontrol eder.
        transparent  //	Arka planı yarı saydam yapar.
        animationType="fade" //Modal yavaşça görünür şekilde açılır.
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.langModalOverlay}> 
          <View style={styles.langModal}>
            <Text style={styles.langModalTitle}>{t.selectLanguage}</Text>

            <TouchableOpacity onPress={() => {
              setLanguage('en');
              setLanguageModalVisible(false);
            }}>
              <Text style={styles.langItem}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setLanguage('tr');
              setLanguageModalVisible(false);
            }}>
              <Text style={styles.langItem}>Türkçe</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLanguageModalVisible(false)}>
              <Text style={styles.langCancel}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  innerContainer: { flexGrow: 1, padding: 20 },
  languageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    paddingRight: 5,
  },
  languageButtonText: { fontSize: 20 },
  form: { width: '100%', maxWidth: 480, alignSelf: 'center', marginTop: 150 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  inputBox: {
    backgroundColor: '#E8EDF2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 6,
    position: 'relative',
  },
  input: { fontSize: 16, paddingLeft: 0 },
  inputWithPaddingRight: { paddingRight: 40 },
  eyeIconWrapper: {
    position: 'absolute',
    right: 12,
    top: '65%',
    transform: [{ translateY: -12 }]
  },
  signUpButton: {
    backgroundColor: '#2681e9ff',
    borderRadius: 24,
    paddingVertical: 14,
    marginTop: 10,
  },
  signUpButtonDisabled: {
    backgroundColor: '#8AB4F8'
  },
  signUpButtonText: {
    color: '#F7FAFC',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
  lowerSection: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center'
  },
  orText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 12,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  iconImage: { width: 32, height: 32, resizeMode: 'contain' },
  linkText: {
    color: '#1A78E5',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  backTextButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#1A78E5',
    fontSize: 14,
    fontWeight: '600',
  },
  backIcon: {
    marginRight: 6,
  },
  alreadyAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    alignItems: 'center',
  },
  alreadyAccountText: {
    color: '#444',
    marginRight: 5,
  },
  signInText: {
    color: '#1A78E5',
    fontWeight: '600',
  },
  flexOne: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',  // kutucuğu yazıdan biraz daha aşağıda hizalar
    marginTop: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#1A78E5',
    borderRadius: 4,
    marginRight: 8,
    marginTop: 21,  // kutucuğu biraz daha aşağı kaydırır
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#1A78E5',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalScroll: {
    flex: 1,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    marginHorizontal: 8,
  },
  closeButton: {
    backgroundColor: '#B0BEC5',
  },
  agreeButton: {
    backgroundColor: '#1A78E5',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
  langModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  langModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },
  langModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  langItem: {
    fontSize: 16,
    marginVertical: 10,
  },
  langCancel: {
    marginTop: 20,
    color: '#1A78E5',
  },
});
