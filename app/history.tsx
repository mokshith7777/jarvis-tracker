import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { useTracker } from '../store/TrackerContext';
import { colors } from '../constants/colors';
import { money } from '../utils/currency';

export default function History(){
 const {transactions}=useTracker();
 const list=[...transactions].sort((a,b)=>b.date-a.date);
 return <Screen><ScrollView contentContainerStyle={styles.content}>
  <View style={styles.header}><View><Text style={styles.kicker}>ARCHIVE</Text><Text style={styles.title}>History</Text></View><Pressable onPress={()=>router.push('/add')} style={styles.add}><Ionicons name="add" size={22} color="#00150d"/></Pressable></View>
  {list.length===0?<Card><Text style={styles.empty}>No transactions recorded yet.</Text></Card>:list.map(t=><Pressable key={t.id} onPress={()=>router.push({pathname:'/transaction/[id]',params:{id:t.id}})}><Card style={styles.row}><View style={styles.icon}><Ionicons name={t.type==='income'?'arrow-down':'arrow-up'} size={19} color={t.type==='income'?colors.accent:colors.danger}/></View><View style={{flex:1}}><Text style={styles.name}>{t.title||t.category}</Text><Text style={styles.meta}>{t.category} · {new Date(t.date).toLocaleDateString()}</Text></View><Text style={[styles.amount,{color:t.type==='income'?colors.accent:colors.danger}]}>{t.type==='income'?'+':'-'}{money(t.amount)}</Text></Card></Pressable>)}
 </ScrollView></Screen>
}
const styles=StyleSheet.create({content:{padding:20,paddingBottom:40},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:22},kicker:{color:colors.accent,fontSize:11,fontWeight:'900',letterSpacing:2},title:{color:colors.text,fontSize:30,fontWeight:'900'},add:{width:45,height:45,borderRadius:14,backgroundColor:colors.accent,alignItems:'center',justifyContent:'center'},row:{padding:14,flexDirection:'row',alignItems:'center',gap:12,marginBottom:9},icon:{width:38,height:38,borderRadius:12,backgroundColor:colors.background,alignItems:'center',justifyContent:'center'},name:{color:colors.text,fontWeight:'800'},meta:{color:colors.muted,fontSize:11,marginTop:4},amount:{fontWeight:'900'},empty:{color:colors.muted}})
