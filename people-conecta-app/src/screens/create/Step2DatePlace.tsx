import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, radius } from '@/tokens';
import { CreatePlanStackParams } from './CreatePlanNavigator';
import Chip from '@/components/atoms/Chip';
import Button from '@/components/atoms/Button';

const ZONAS = ['Playa Grande', 'Güemes', 'Varese', 'Centro', 'Chapadmalal', 'Miramar', 'Santa Clara'];
const HORARIOS = ['09:00', '11:00', '15:00', '17:00', '18:30', '19:30', '20:30'];

function getDateOptions() {
  return Array.from({ length: 10 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    const iso = date.toISOString();
    const label = date.toLocaleDateString('es-AR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).replace('.', '');

    return {
      value: iso,
      label: label.charAt(0).toUpperCase() + label.slice(1),
    };
  });
}

type Nav = NativeStackNavigationProp<CreatePlanStackParams>;
type Route = RouteProp<CreatePlanStackParams, 'Step2'>;

export default function Step2DatePlace() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();

  const [zona, setZona] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [cupoMax, setCupoMax] = useState(10);
  const [esGratuito, setEsGratuito] = useState(true);
  const dateOptions = React.useMemo(getDateOptions, []);

  const canContinue = zona && fecha && hora;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.inner, { paddingBottom: insets.bottom + 120 }]}>

        <Text style={styles.label}>Zona *</Text>
        <View style={styles.chips}>
          {ZONAS.map(z => (
            <Chip key={z} label={z} selected={zona === z} onPress={() => setZona(z)} />
          ))}
        </View>

        <Text style={styles.label}>Fecha *</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.optionRow}
        >
          {dateOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[styles.dateOption, fecha === option.value && styles.dateOptionActive]}
              onPress={() => setFecha(option.value)}
            >
              <Text style={[styles.dateOptionText, fecha === option.value && styles.dateOptionTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Hora *</Text>
        <View style={styles.timeGrid}>
          {HORARIOS.map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.timeOption, hora === option && styles.dateOptionActive]}
              onPress={() => setHora(option)}
            >
              <Text style={[styles.dateOptionText, hora === option && styles.dateOptionTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Cupo máximo: {cupoMax} personas</Text>
        <View style={styles.cupoRow}>
          <TouchableOpacity
            style={styles.cupoBtn}
            onPress={() => setCupoMax(v => Math.max(3, v - 1))}
          >
            <Text style={styles.cupoBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.cupoValue}>{cupoMax}</Text>
          <TouchableOpacity
            style={styles.cupoBtn}
            onPress={() => setCupoMax(v => Math.min(20, v + 1))}
          >
            <Text style={styles.cupoBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Costo</Text>
        <View style={styles.chips}>
          <Chip label="Gratis" selected={esGratuito} onPress={() => setEsGratuito(true)} />
          <Chip label="Tiene costo" selected={!esGratuito} onPress={() => setEsGratuito(false)} />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing[4] }]}>
        <Button
          label="Siguiente →"
          onPress={() =>
            navigation.navigate('Step3', {
              ...route.params,
              zona,
              fecha,
              hora,
              cupoMax,
              esGratuito,
            })
          }
          disabled={!canContinue}
          fullWidth size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { padding: spacing[4] },
  label: { ...typography.labelLarge, color: colors.textPrimary, marginBottom: spacing[2], marginTop: spacing[4] },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing[2] },
  optionRow: {
    gap: spacing[2],
    paddingRight: spacing[4],
    marginBottom: spacing[2],
  },
  dateOption: {
    minWidth: 104,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.neutral[200],
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    alignItems: 'center',
  },
  dateOptionActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  dateOptionText: { ...typography.labelMedium, color: colors.textPrimary },
  dateOptionTextActive: { color: colors.white },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  timeOption: {
    minWidth: 72,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    alignItems: 'center',
  },
  cupoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[6], marginBottom: spacing[4] },
  cupoBtn: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1.5, borderColor: colors.primary[500],
    alignItems: 'center', justifyContent: 'center',
  },
  cupoBtnText: { ...typography.titleMedium, color: colors.primary[500] },
  cupoValue: { ...typography.headlineSmall, color: colors.textPrimary, minWidth: 40, textAlign: 'center' },
  footer: {
    padding: spacing[4], backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.neutral[100],
  },
});
