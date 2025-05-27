import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Speech from 'expo-speech';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState('english');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const translations = {
    english: {
      welcome: "Welcome to Barcode Scanner",
      scanButton: "SCAN PRODUCT",
      invalidBarcode: "Invalid Barcode",
      unknownOrigin: "Unknown Origin",
      madeBy: "Made by Muhammad Attiq",
      boycott: "BOYCOTT THIS PRODUCT",
      safeToUse: "SAFE TO USE",
      permissionText: "We need your permission to show the camera",
      grantPermission: "Grant Permission",
      scanAgain: "Scan Again",
      switchLanguage: "اردو"
    },
    urdu: {
      welcome: "بارکوڈ سکینر میں خوش آمدید",
      scanButton: "مصنوعات سکین کریں",
      invalidBarcode: "غلط بارکوڈ",
      unknownOrigin: "اصل ملک معلوم نہیں",
      madeBy: "محمد عتیق کی طرف سے بنایا گیا",
      boycott: "اس مصنوعات کا بائیکاٹ کریں",
      safeToUse: "استعمال کے لیے محفوظ",
      permissionText: "کیمرہ دکھانے کے لیے ہمیں آپ کی اجازت درکار ہے",
      grantPermission: "اجازت دیں",
      scanAgain: "دوبارہ سکین کریں",
      switchLanguage: "English"
    }
  };

  const t = translations[language];

  const checkCountry = (data) => {
    if (typeof data !== 'string' || data.length < 3) {
      showAlert(t.invalidBarcode, t.invalidBarcode, 'red');
      return;
    }

    const prefix = data.substring(0, 3);
    const countryCodes = {
      // Boycott countries (RED)
      '890': { 
        name: language === 'english' ? "🇮🇳 Indian Product" : "🇮🇳 ہندوستانی مصنوعات", 
        message: language === 'english' ? "This product is from India." : "یہ مصنوعات ہندوستان سے ہے۔",
        color: 'red',
        action: t.boycott
      },
      '729': { 
        name: language === 'english' ? "🇮🇱 Israeli Product" : "🇮🇱 اسرائیلی مصنوعات", 
        message: language === 'english' ? "This product is from Israel." : "یہ مصنوعات اسرائیل سے ہے۔",
        color: 'red',
        action: t.boycott
      },
      
      // Safe countries (GREEN)
      '690': { 
        name: language === 'english' ? "🇨🇳 Chinese Product" : "🇨🇳 چینی مصنوعات", 
        message: language === 'english' ? "This product is from China." : "یہ مصنوعات چین سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '400': { 
        name: language === 'english' ? "🇩🇪 German Product" : "🇩🇪 جرمن مصنوعات", 
        message: language === 'english' ? "This product is from Germany." : "یہ مصنوعات جرمنی سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '500': { 
        name: language === 'english' ? "🇬🇧 UK Product" : "🇬🇧 برطانوی مصنوعات", 
        message: language === 'english' ? "This product is from United Kingdom." : "یہ مصنوعات برطانیہ سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '750': { 
        name: language === 'english' ? "🇲🇽 Mexican Product" : "🇲🇽 میکسیکن مصنوعات", 
        message: language === 'english' ? "This product is from Mexico." : "یہ مصنوعات میکسیکو سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '789': { 
        name: language === 'english' ? "🇧🇷 Brazilian Product" : "🇧🇷 برازیلی مصنوعات", 
        message: language === 'english' ? "This product is from Brazil." : "یہ مصنوعات برازیل سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '880': { 
        name: language === 'english' ? "🇰🇷 South Korean Product" : "🇰🇷 جنوبی کوریائی مصنوعات", 
        message: language === 'english' ? "This product is from South Korea." : "یہ مصنوعات جنوبی کوریا سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '885': { 
        name: language === 'english' ? "🇹🇭 Thai Product" : "🇹🇭 تھائی مصنوعات", 
        message: language === 'english' ? "This product is from Thailand." : "یہ مصنوعات تھائی لینڈ سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '888': { 
        name: language === 'english' ? "🇸🇬 Singaporean Product" : "🇸🇬 سنگاپوری مصنوعات", 
        message: language === 'english' ? "This product is from Singapore." : "یہ مصنوعات سنگاپور سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '893': { 
        name: language === 'english' ? "🇻🇳 Vietnamese Product" : "🇻🇳 ویتنامی مصنوعات", 
        message: language === 'english' ? "This product is from Vietnam." : "یہ مصنوعات ویتنام سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '896': { 
        name: language === 'english' ? "🇵🇰 Pakistani Product" : "🇵🇰 پاکستانی مصنوعات", 
        message: language === 'english' ? "This product is from Pakistan." : "یہ مصنوعات پاکستان سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '899': { 
        name: language === 'english' ? "🇮🇩 Indonesian Product" : "🇮🇩 انڈونیشیائی مصنوعات", 
        message: language === 'english' ? "This product is from Indonesia." : "یہ مصنوعات انڈونیشیا سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
      '955': { 
        name: language === 'english' ? "🇲🇾 Malaysian Product" : "🇲🇾 ملائیشیائی مصنوعات", 
        message: language === 'english' ? "This product is from Malaysia." : "یہ مصنوعات ملائیشیا سے ہے۔",
        color: 'green',
        action: t.safeToUse
      },
    };

    const country = countryCodes[prefix];
    if (country) {
      showAlert(country.name, `${country.message}\n\n${country.action}`, country.color);
    } else {
      showAlert(t.unknownOrigin, t.unknownOrigin, 'orange');
    }
  };

  const showAlert = (title, message, color) => {
    setResult({ title, message, color });
    setShowScanner(false);
    if (language === 'english') {
      Speech.speak(`${title}. ${message}`);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    checkCountry(data);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'urdu' : 'english');
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>{t.permissionText}</Text>
        <Button onPress={requestPermission} title={t.grantPermission} color="#2ecc71" />
      </View>
    );
  }

  if (showScanner) {
    return (
      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'qr'],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        <View style={styles.scannerOverlay}>
          <Text style={styles.scannerText}>{language === 'english' ? "Align barcode within frame" : "بارکوڈ کو فریم کے اندر رکھیں"}</Text>
        </View>
        {scanned && (
          <View style={styles.buttonContainer}>
            <Button
              title={t.scanAgain}
              onPress={() => {
                setScanned(false);
                setResult(null);
              }}
              color="white"
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('./assets/background.jpg')} 
      style={styles.homeContainer}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
        <Text style={styles.languageButtonText}>{t.switchLanguage}</Text>
      </TouchableOpacity>

      <View style={styles.homeContent}>
        <Text style={styles.welcomeText}>{t.welcome}</Text>
        
        {result && (
          <View style={[styles.resultContainer, { backgroundColor: result.color }]}>
            <Text style={styles.resultTitle}>{result.title}</Text>
            <Text style={styles.resultMessage}>{result.message}</Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.scanButton} 
          onPress={() => {
            setShowScanner(true);
            setScanned(false);
            setResult(null);
          }}
        >
          <Text style={styles.scanButtonText}>{t.scanButton}</Text>
        </TouchableOpacity>

        <Text style={styles.madeByText}>{t.madeBy}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 20,
    elevation: 5,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  madeByText: {
    marginTop: 20,
    color: '#7f8c8d',
    fontSize: 14,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 5,
    padding: 10,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  scannerText: {
    color: 'white',
    fontSize: 16,
  },
  resultContainer: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultMessage: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  languageButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 20,
  },
  languageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});