import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { useTracker } from '../../store/TrackerContext';
import { colors } from '../../constants/colors';
import { money } from '../../utils/currency';

export default function Detail(){
 const {id}=useLocalSearchParams<{id:string}>();
 const {transactions,deleteTransaction}=useTracker();
 const t=transactions.find(x=>x.id===id);
 if(!t) return <Screen><View style={styles.center}><Text style={styles.empty}>Transaction not found.</Text></View></Screen>;
 function remove(){Alert.alert('Delete transaction?','This cannot be undone.',[{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:()=>{deleteTransaction(t.id);router.replace('/history')}}])}
 return <Screen><View style={styles.content}><Text style={styles.kicker}>TRANSACTION</Text><Text style={styles.title}>{t.title||t.category}</Text><Card><Text style={styles.label}>{t.type.toUpperCase()}</Text><Text style={[styles.amount,{color:t.type==='income'?colors.accent:colors.danger}]}>{t.type==='income'?'+':'-'}{money(t.amount)}</Text><Info label="Category" value={t.category}/><Info label="Date" value={new Date(t.date).toLocaleString()}/><Info label="Note" value={t.note||'No note'}/></Card><Pressable onPress={remove} style={styles.delete}><Text style={styles.deleteText}>DELETE TRANSACTION</Text></Pressable><Pressable onPress={()=>router.back()} style={styles.back}><Text style={styles.backText}>BACK</Text></Pressable></View></Screen>
}
function Info({label,value}:{label:string,value:string}){return <View style={styles.info}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value}</Text></View>}
const styles=StyleSheet.create({content:{padding:20},center:{flex:1,alignItems:'center',justifyContent:'center'},kicker:{color:colors.accent,fontSize:11,fontWeight:'900',letterSpacing:2},title:{color:colors.text,fontSize:29,fontWeight:'900',marginBottom:20},label:{color:colors.muted,fontSize:10,fontWeight:'900',letterSpacing:1.2},amount:{fontSize:37,fontWeight:'900',marginVertical:10},info:{paddingVertical:12,borderTopWidth:1,borderTopColor:colors.border},value:{color:colors.text,marginTop:5,fontWeight:'700'},delete:{backgroundColor:colors.danger,borderRadius:14,padding:17,alignItems:'center',marginTop:16},deleteText:{color:'#fff',fontWeight:'900'},back:{padding:16,alignItems:'center'},backText:{color:colors.accent,fontWeight:'900'},empty:{color:colors.muted}})
