import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { useTracker } from '../store/TrackerContext';
import { colors } from '../constants/colors';
import { money } from '../utils/currency';

export default function Dashboard() {
  const { transactions } = useTracker();
  const income = transactions.filter(t => t.type === 'income').reduce((s,t)=>s+t.amount,0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s,t)=>s+t.amount,0);
  const balance = income - expense;
  const recent = [...transactions].sort((a,b)=>b.createdAt-a.createdAt).slice(0,4);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>JARVIS</Text>
            <Text style={styles.title}>TRACKER</Text>
          </View>
          <Pressable style={styles.iconButton} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={22} color={colors.text} />
          </Pressable>
        </View>

        <Card style={styles.balanceCard}>
          <Text style={styles.label}>CURRENT BALANCE</Text>
          <Text style={styles.balance}>{money(balance)}</Text>
          <View style={styles.statsRow}>
            <Stat icon="arrow-down" label="Income" value={money(income)} />
            <Stat icon="arrow-up" label="Expenses" value={money(expense)} />
          </View>
        </Card>

        <View style={styles.actions}>
          <Pressable style={styles.primaryAction} onPress={() => router.push('/add')}>
            <Ionicons name="add" size={24} color="#00150d" />
            <Text style={styles.primaryText}>ADD TRANSACTION</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction} onPress={() => router.push('/history')}>
            <Ionicons name="time-outline" size={22} color={colors.accent} />
            <Text style={styles.secondaryText}>HISTORY</Text>
          </Pressable>
        </View>

        <SectionHeader title="RECENT ACTIVITY" onPress={() => router.push('/history')} />
        {recent.length === 0 ? (
          <Card><Text style={styles.empty}>No transactions yet. Your database is beautifully empty.</Text></Card>
        ) : recent.map(t => (
          <Pressable key={t.id} onPress={() => router.push({pathname:'/transaction/[id]', params:{id:t.id}})}>
            <Card style={styles.transaction}>
              <View style={styles.txIcon}><Ionicons name={t.type === 'income' ? 'arrow-down' : 'arrow-up'} size={19} color={t.type === 'income' ? colors.accent : colors.danger} /></View>
              <View style={{flex:1}}>
                <Text style={styles.txTitle}>{t.title || t.category}</Text>
                <Text style={styles.txMeta}>{t.category}</Text>
              </View>
              <Text style={[styles.txAmount,{color:t.type==='income'?colors.accent:colors.danger}]}>{t.type==='income'?'+':'-'}{money(t.amount)}</Text>
            </Card>
          </Pressable>
        ))}

        <View style={styles.bottomNav}>
          <Nav icon="grid" label="Dashboard" active onPress={() => router.replace('/dashboard')} />
          <Nav icon="list" label="History" onPress={() => router.push('/history')} />
          <Nav icon="pie-chart" label="Stats" onPress={() => router.push('/statistics')} />
          <Nav icon="settings" label="Settings" onPress={() => router.push('/settings')} />
        </View>
      </ScrollView>
    </Screen>
  );
}

function Stat({icon,label,value}:{icon:any,label:string,value:string}) {
  return <View style={styles.stat}><Ionicons name={icon} size={17} color={colors.accent}/><View><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View></View>
}
function SectionHeader({title,onPress}:{title:string,onPress:()=>void}) {
  return <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text><Pressable onPress={onPress}><Text style={styles.see}>VIEW ALL</Text></Pressable></View>
}
function Nav({icon,label,active,onPress}:{icon:any,label:string,active?:boolean,onPress:()=>void}) {
  return <Pressable onPress={onPress} style={styles.navItem}><Ionicons name={icon} size={21} color={active?colors.accent:colors.muted}/><Text style={[styles.navText,active&&{color:colors.accent}]}>{label}</Text></Pressable>
}
const styles=StyleSheet.create({
 content:{padding:20,paddingBottom:30},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:22},kicker:{color:colors.accent,fontSize:12,fontWeight:'800',letterSpacing:4},title:{color:colors.text,fontSize:27,fontWeight:'900',letterSpacing:2},iconButton:{width:44,height:44,borderRadius:14,backgroundColor:colors.panel,borderWidth:1,borderColor:colors.border,alignItems:'center',justifyContent:'center'},
 balanceCard:{padding:22,marginBottom:16},label:{color:colors.muted,fontSize:11,fontWeight:'800',letterSpacing:1.5},balance:{color:colors.text,fontSize:38,fontWeight:'900',marginTop:7,marginBottom:22},statsRow:{flexDirection:'row',gap:25},stat:{flexDirection:'row',alignItems:'center',gap:9},statLabel:{color:colors.muted,fontSize:11},statValue:{color:colors.text,fontWeight:'800',marginTop:2},
 actions:{flexDirection:'row',gap:10,marginBottom:26},primaryAction:{flex:1,backgroundColor:colors.accent,borderRadius:15,minHeight:54,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8},primaryText:{fontWeight:'900',fontSize:12},secondaryAction:{width:125,borderRadius:15,borderWidth:1,borderColor:colors.border,backgroundColor:colors.panel,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:7},secondaryText:{color:colors.text,fontWeight:'800',fontSize:12},
 sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:11},sectionTitle:{color:colors.text,fontWeight:'900',fontSize:13,letterSpacing:1},see:{color:colors.accent,fontSize:10,fontWeight:'900'},empty:{color:colors.muted,lineHeight:22},transaction:{padding:14,flexDirection:'row',alignItems:'center',gap:12,marginBottom:9},txIcon:{width:38,height:38,borderRadius:12,backgroundColor:colors.background,alignItems:'center',justifyContent:'center'},txTitle:{color:colors.text,fontWeight:'800'},txMeta:{color:colors.muted,fontSize:11,marginTop:3},txAmount:{fontWeight:'900'},bottomNav:{marginTop:25,borderTopWidth:1,borderTopColor:colors.border,paddingTop:15,flexDirection:'row',justifyContent:'space-around'},navItem:{alignItems:'center',gap:4},navText:{color:colors.muted,fontSize:10,fontWeight:'700'}
});
