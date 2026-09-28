import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { useTracker } from '../store/TrackerContext';
import { colors } from '../constants/colors';

export default function Settings(){
 const {clearAll}=useTracker();
 function clear(){Alert.alert('Delete all data?','This cannot be undone.',[{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:clearAll}])}
 return <Screen><ScrollView contentContainerStyle={styles.content}>
  <Text style={styles.kicker}>SYSTEM</Text><Text style={styles.title}>Settings</Text>
  <Card style={styles.card}>
   <Row icon="shield-checkmark-outline" title="Local-first storage" subtitle="Your tracker data stays on this device."/>
   <Row icon="cloud-offline-outline" title="Offline mode" subtitle="Core features do not require internet."/>
  </Card>
  <Text style={styles.section}>DATA</Text>
  <Card><Pressable onPress={clear} style={styles.dangerRow}><Ionicons name="trash-outline" size={21} color={colors.danger}/><View style={{flex:1}}><Text style={styles.dangerTitle}>Delete all transactions</Text><Text style={styles.sub}>Permanently clears local tracker data</Text></View></Pressable></Card>
  <Text style={styles.section}>APP</Text><Card><Row icon="information-circle-outline" title="JARVIS TRACKER" subtitle="Version 1.0.0"/></Card>
  <Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>BACK</Text></Pressable>
 </ScrollView></Screen>
}
function Row({icon,title,subtitle}:{icon:any,title:string,subtitle:string}){return <View style={styles.row}><Ionicons name={icon} size={21} color={colors.accent}/><View style={{flex:1}}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.sub}>{subtitle}</Text></View></View>}
const styles=StyleSheet.create({content:{padding:20,paddingBottom:40},kicker:{color:colors.accent,fontSize:11,fontWeight:'900',letterSpacing:2},title:{color:colors.text,fontSize:30,fontWeight:'900',marginBottom:20},card:{padding:3},row:{flexDirection:'row',alignItems:'center',gap:13,padding:15,borderBottomWidth:1,borderBottomColor:colors.border},rowTitle:{color:colors.text,fontWeight:'800'},sub:{color:colors.muted,fontSize:11,marginTop:4},section:{color:colors.text,fontWeight:'900',fontSize:12,letterSpacing:1,marginTop:24,marginBottom:9},dangerRow:{flexDirection:'row',alignItems:'center',gap:13,padding:15},dangerTitle:{color:colors.danger,fontWeight:'900'},back:{padding:16,alignItems:'center'},backText:{color:colors.accent,fontWeight:'900'}})
