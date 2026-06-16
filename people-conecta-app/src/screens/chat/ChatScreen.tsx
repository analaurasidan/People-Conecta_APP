import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { CalendarBlank } from 'phosphor-react-native/lib/commonjs/icons/CalendarBlank';
import { Clock } from 'phosphor-react-native/lib/commonjs/icons/Clock';
import { MapPin } from 'phosphor-react-native/lib/commonjs/icons/MapPin';
import { colors, typography, spacing, radius } from '@/tokens';
import { getChatMessages, sendMessage, subscribeToChatMessages } from '@/services/chat';
import { getPlanById } from '@/services/plans';
import { useAuthStore } from '@/store/authStore';
import { ChatMessage } from '@/services/database.types';
import { RootStackParams } from '@/navigation/types';
import Avatar from '@/components/atoms/Avatar';

type Route = RouteProp<RootStackParams, 'Chat'>;

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const { profile } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList>(null);

  const { data: plan } = useQuery({
    queryKey: ['plan', route.params.planId],
    queryFn: () => getPlanById(route.params.planId),
  });

  useEffect(() => {
    navigation.setOptions({ title: route.params.planName });

    getChatMessages(route.params.planId).then(setMessages);

    const unsubscribe = subscribeToChatMessages(route.params.planId, (newMsg) => {
      setMessages(prev => [...prev, newMsg]);
      listRef.current?.scrollToEnd({ animated: true });
    });

    return () => { unsubscribe(); };
  }, [route.params.planId]);

  async function handleSend() {
    if (!text.trim() || !profile) return;
    setSending(true);
    try {
      const message = await sendMessage(route.params.planId, profile.id, text.trim());
      if (Platform.OS === 'web' || route.params.planId.startsWith('demo_') || profile.id.startsWith('demo_')) {
        setMessages(prev => [...prev, message]);
        if (Platform.OS === 'web') {
          requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
        } else {
          setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
        }
      }
      setText('');
    } finally {
      setSending(false);
    }
  }

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMine = item.user_id === profile?.id;
    return (
      <View style={[styles.messageBubbleRow, isMine && styles.messageBubbleRowMine]}>
        {!isMine && item.user && (
          <Avatar uri={item.user.foto_url} name={item.user.nombre} size="xs" />
        )}
        <View style={[styles.bubble, isMine && styles.bubbleMine]}>
          {!isMine && item.user && (
            <Text style={styles.senderName}>{item.user.nombre}</Text>
          )}
          <Text style={[styles.messageText, isMine && styles.messageTextMine]}>
            {item.contenido}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(item.created_at).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={[styles.header, { paddingTop: insets.top + spacing[2] }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle} numberOfLines={1}>{route.params.planName}</Text>
          <Text style={styles.headerSubtitle}>Grupo del plan · participantes confirmados</Text>
        </View>
      </View>

      {plan && (
        <View style={styles.planCard}>
          <View style={styles.planCardTop}>
            <Text style={styles.planTitle} numberOfLines={2}>{plan.nombre}</Text>
            <Text style={styles.planStatus}>Confirmado</Text>
          </View>
          <View style={styles.planMeta}>
            <View style={styles.planMetaItem}>
              <MapPin color={colors.textSecondary} size={14} weight="regular" />
              <Text style={styles.planMetaText}>{plan.zona}</Text>
            </View>
            <View style={styles.planMetaItem}>
              <CalendarBlank color={colors.textSecondary} size={14} weight="regular" />
              <Text style={styles.planMetaText}>
                {new Date(plan.fecha).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })}
              </Text>
            </View>
            <View style={styles.planMetaItem}>
              <Clock color={colors.textSecondary} size={14} weight="regular" />
              <Text style={styles.planMetaText}>{plan.hora} hs</Text>
            </View>
          </View>
          <View style={styles.planFooter}>
            <Text style={styles.planPeople}>{plan.cupo_actual}/{plan.cupo_max} confirmados</Text>
            <Text style={styles.supportLabel}>People Conecta acompaña este grupo</Text>
          </View>
        </View>
      )}

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
      />

      <View style={[styles.inputBar, { paddingBottom: insets.bottom + spacing[2] }]}>
        <TextInput
          style={styles.input}
          placeholder="Escribí un mensaje..."
          placeholderTextColor={colors.neutral[400]}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!text.trim() || sending}
        >
          <Text style={styles.sendBtnText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE3CC',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0EBE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 20, color: colors.textPrimary },
  headerCopy: { flex: 1 },
  headerTitle: { ...typography.titleMedium, color: colors.textPrimary },
  headerSubtitle: { ...typography.bodySmall, color: colors.textSecondary },
  planCard: {
    marginHorizontal: spacing[4],
    marginTop: spacing[3],
    marginBottom: spacing[1],
    backgroundColor: '#F7F1E3',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#EDE3CC',
    padding: spacing[3],
    gap: spacing[2],
  },
  planCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[2],
  },
  planTitle: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    flex: 1,
  },
  planStatus: {
    ...typography.labelSmall,
    color: colors.primary[700],
    backgroundColor: colors.primary[50],
    borderRadius: radius.full,
    overflow: 'hidden',
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
  },
  planMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  planMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  planMetaText: { ...typography.bodySmall, color: colors.textSecondary },
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing[2],
  },
  planPeople: { ...typography.labelSmall, color: colors.primary[500] },
  supportLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  listContent: { padding: spacing[4], gap: spacing[3], flexGrow: 1, justifyContent: 'flex-end' },
  messageBubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing[2], marginBottom: spacing[2] },
  messageBubbleRowMine: { flexDirection: 'row-reverse' },
  bubble: {
    maxWidth: '78%', backgroundColor: colors.surface,
    borderRadius: radius.lg, borderBottomLeftRadius: 4,
    padding: spacing[3], gap: 3,
    borderWidth: 1,
    borderColor: '#EDE3CC',
  },
  bubbleMine: {
    backgroundColor: colors.primary[500],
    borderBottomLeftRadius: radius.lg, borderBottomRightRadius: 4,
    borderColor: colors.primary[500],
  },
  senderName: { ...typography.labelSmall, color: colors.primary[500] },
  messageText: { ...typography.bodyMedium, color: colors.textPrimary },
  messageTextMine: { color: colors.white },
  timestamp: { ...typography.bodySmall, color: colors.neutral[400], alignSelf: 'flex-end' },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: spacing[2],
    padding: spacing[3], backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.neutral[100],
  },
  input: {
    flex: 1, backgroundColor: colors.neutral[50],
    borderRadius: radius.full, paddingHorizontal: spacing[4], paddingVertical: spacing[2],
    maxHeight: 120, ...typography.bodyMedium, color: colors.textPrimary,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.primary[500],
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: colors.neutral[300] },
  sendBtnText: { color: colors.white, fontSize: 18 },
});
