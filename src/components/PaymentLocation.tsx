import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";
import Geolocation, { GeoError, GeoPosition } from "react-native-geolocation-service";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

type PaymentLocationProps = {
  onLocationVerified: (isInTurkey: boolean) => void;
  showUI?: boolean;
};

const PaymentLocation: React.FC<PaymentLocationProps> = ({
  onLocationVerified,
  showUI = true,
}) => {
  const [location, setLocation] = useState<{ 
    latitude: number; 
    longitude: number 
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  // Konum izni kontrolü ve isteği
  const handleLocationPermission = async () => {
    setIsLoading(true);
    try {
      const permission = Platform.OS === 'android' 
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION 
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const permissionStatus = await check(permission);

      if (permissionStatus === RESULTS.GRANTED) {
        getLocation();
      } else {
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert("İzin reddedildi", "Lütfen ayarlardan izin verin.");
        }
      }
    } catch (error) {
      Alert.alert("Hata", "Konum izni alınamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  // Konum bilgisini alma
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: GeoPosition) => {
        setLocation(position.coords);
        checkLocation(position.coords);
      },
      (error: GeoError) => handleLocationError(error),
      { 
        enableHighAccuracy: true, 
        timeout: 15000,
        maximumAge: 10000 
      }
    );
  };

  // Konum doğrulama
  const checkLocation = (coords: { latitude: number; longitude: number }) => {
    try {
      const isInTurkey = (
        coords.latitude >= 36.0 &&
        coords.latitude <= 42.0 &&
        coords.longitude >= 26.0 &&
        coords.longitude <= 45.0
      );
      onLocationVerified(isInTurkey);
    } catch (error) {
      Alert.alert("Hata", "Konum doğrulanamadı.");
    }
  };

  // Hata yönetimi
  const handleLocationError = (error: GeoError) => {
    if (error.code === 1) {
      Alert.alert(
        "İzin Gerekli",
        "Konum erişimi için izin vermelisiniz.",
        [
          { 
            text: "Ayarlar", 
            onPress: () => Linking.openSettings() 
          },
          { 
            text: "İptal", 
            style: "cancel" 
          }
        ]
      );
    } else {
      Alert.alert(
        "Konum Hatası",
        `Hata Kodu: ${error.code}\n${error.message}`
      );
    }
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  if (!showUI) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Konum Doğrulama</Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : location ? (
        <View>
          <Text style={styles.text}>
            📍 Enlem: {location.latitude.toFixed(4)}
          </Text>
          <Text style={styles.text}>
            📍 Boylam: {location.longitude.toFixed(4)}
          </Text>
        </View>
      ) : (
        <Text style={styles.text}>Konum bilgisi yükleniyor...</Text>
      )}

      <Button
        title="Konumu Yenile"
        onPress={handleLocationPermission}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2D3436',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
    color: '#636E72',
    textAlign: 'center',
  },
});

export default PaymentLocation