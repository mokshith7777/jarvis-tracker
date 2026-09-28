import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { useTracker } from '../store/TrackerContext';
import { colors } from '../constants/colors';
import { money } from '../utils/currency';

export default function Statistics(){
 const {transactions}=useTracker();
 const expenses=transactions.filter(t=>t.type==='expense');
 const total=expenses.reduce((s,t)=>s+t.amount,0);
 const grouped=expenses.reduce<Record<string,number>>((a,t)=>(a[t.category]=(a[t.category]||0)+t.amount,a),{});
 const entries=Object.entries(grouped).sort((a,b)=>b[1]-a[1]);
 return <Screen><ScrollView contentContainerStyle={styles.content}>
  <Text style={styles.kicker}>ANALYTICS</Text><Text style={styles.title}>Statistics</Text>
  <Card><Text style={styles.label}>TOTAL EXPENSES</Text><Text style={styles.total}>{money(total)}</Text><Text style={styles.muted}>{expenses.length} expense transactions</Text></Card>
  <Text style={styles.section}>BY CATEGORY</Text>
  {entries.length===0?<Card><Text style={styles.muted}>Statistics will appear after you add expenses.</Text></Card>:entries.map(([name,value])=><Card key={name} style={styles.item}><View style={styles.line}><Text style={styles.name}>{name}</Text><Text style={styles.value}>{money(value)}</Text></View><View style={styles.track}><View style={[styles.bar,{width:`${total?Math.max(3,value/total*100):0}%`}]} /></View></Card>)}
 </ScrollView></Screen>
}
const styles=StyleSheet.create({content:{padding:20,paddingBottom:40},kicker:{color:colors.accent,fontSize:11,fontWeight:'900',letterSpacing:2},title:{color:colors.text,fontSize:30,fontWeight:'900',marginBottom:20},label:{color:colors.muted,fontSize:10,fontWeight:'900',letterSpacing:1.2},total:{color:colors.text,fontSize:35,fontWeight:'900',marginTop:7},muted:{color:colors.muted},section:{color:colors.text,fontWeight:'900',fontSize:13,letterSpacing:1,marginTop:24,marginBottom:10},item:{padding:15,marginBottom:9},line:{flexDirection:'row',justifyContent:'space-between'},name:{color:colors.text,fontWeight:'800'},value:{color:colors.accent,fontWeight:'900'},track:{height:7,backgroundColor:colors.background,borderRadius:10,overflow:'hidden',marginTop:12},bar:{height:'100%',backgroundColor:colors.accent,borderRadius:10}})
