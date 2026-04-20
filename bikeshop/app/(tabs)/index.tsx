import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const next: { email?: string; password?: string } = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) next.email = 'Informe seu e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail))
      next.email = 'E-mail inválido.';

    if (!password) next.password = 'Informe sua senha.';
    else if (password.length < 6) next.password = 'Mínimo de 6 caracteres.';

    return next;
  }, [email, password]);

  const canSubmit = Object.keys(errors).length === 0;

  const onSubmit = () => {
    setTouched(true);
    if (!canSubmit) return;
    alert(`Bem-vindo(a) à BikeShop!\n\nUsuário: ${email.trim()}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>BS</Text>
            </View>
            <View style={styles.brandText}>
              <Text style={styles.title}>BikeShop</Text>
              <Text style={styles.subtitle}>Entrar para continuar</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouched(true)}
              placeholder="voce@exemplo.com"
              placeholderTextColor="rgba(255,255,255,0.5)"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              inputMode="email"
              returnKeyType="next"
              style={[styles.input, touched && errors.email ? styles.inputError : null]}
            />
            {touched && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

            <Text style={[styles.label, { marginTop: 14 }]}>Senha</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              onBlur={() => setTouched(true)}
              placeholder="••••••••"
              placeholderTextColor="rgba(255,255,255,0.5)"
              secureTextEntry
              returnKeyType="done"
              style={[styles.input, touched && errors.password ? styles.inputError : null]}
            />
            {touched && errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <Pressable
              accessibilityRole="button"
              onPress={onSubmit}
              style={({ pressed }) => [
                styles.button,
                !canSubmit ? styles.buttonDisabled : null,
                pressed && canSubmit ? styles.buttonPressed : null,
              ]}>
              <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>

            <View style={styles.linksRow}>
              <Pressable onPress={() => alert('Recuperação de senha (demo).')}>
                <Text style={styles.link}>Esqueci minha senha</Text>
              </Pressable>
              <Text style={styles.dot}>•</Text>
              <Pressable onPress={() => alert('Cadastro (demo).')}>
                <Text style={styles.link}>Criar conta</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.footer}>
            Ao entrar, você concorda com os Termos e a Política de Privacidade.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B1220' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
    gap: 18,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6 },
  logo: {
    height: 52,
    width: 52,
    borderRadius: 16,
    backgroundColor: '#18A0FB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#18A0FB',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logoText: { color: 'white', fontSize: 18, fontWeight: '800', letterSpacing: 0.8 },
  brandText: { flex: 1 },
  title: { color: 'white', fontSize: 28, fontWeight: '800', letterSpacing: 0.2 },
  subtitle: { color: 'rgba(255,255,255,0.7)', marginTop: 2, fontSize: 14 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },
  label: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 8 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: 'white',
    fontSize: 15,
  },
  inputError: { borderColor: '#FF4D4F' },
  error: { color: '#FFB3B5', marginTop: 8, fontSize: 12 },
  button: {
    marginTop: 18,
    backgroundColor: '#18A0FB',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonPressed: { transform: [{ scale: 0.99 }] },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 14,
  },
  link: { color: 'rgba(255,255,255,0.8)', fontSize: 13, textDecorationLine: 'underline' },
  dot: { color: 'rgba(255,255,255,0.35)' },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal: 10,
  },
});
