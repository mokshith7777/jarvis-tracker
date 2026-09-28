import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { useTracker } from '../store/TrackerContext';
import { colors } from '../constants/colors';
import { categories } from '../constants/categories';

export default function Add() {
  const { addTransaction } = useTracker();
  const [type,setType]=useState<'expense'|'income'>('expense');
  const [amount,setAmount]=useState('');
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState(categories[0]);
  const [note,setNote]=useState('');

  function save() {
    const n=Number(amount.replace(/,/g,''));
    if(!Number.isFinite(n)||n<=0) return;
    addTransaction({type,amount:n,title:title.trim(),category,note:note.trim(),date:Date.now()});
    router.replace('/history');
  }

  return <Screen><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.kicker}>NEW ENTRY</Text><Text style={styles.title}>Add Transaction</Text>
    <View style={styles.segment}><Pressable onPress={()=>setType('expense')} style={[styles.segmentBtn,type==='expense'&&styles.active]}><Text style={[styles.segmentText,type==='expense'&&styles.activeText]}>EXPENSE</Text></Pressable><Pressable onPress={()=>setType('income')} style={[styles.segmentBtn,type==='income'&&styles.active]}><Text style={[styles.segmentText,type==='income'&&styles.activeText]}>INCOME</Text></Pressable></View>
    <Card>
      <Text style={styles.label}>AMOUNT</Text>
      <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor={colors.muted} style={styles.amount}/>
      <Text style={styles.label}>TITLE</Text><TextInput value={title} onChangeText={setTitle} placeholder="e.g. Groceries" placeholderTextColor={colors.muted} style={styles.input}/>
      <Text style={styles.label}>CATEGORY</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8,paddingVertical:10}}>{categories.map(c=><Pressable key={c} onPress={()=>setCategory(c)} style={[styles.chip,category===c&&styles.chipActive]}><Text style={[styles.chipText,category===c&&styles.chipTextActive]}>{c}</Text></Pressable>)}</ScrollView>
      <Text style={styles.label}>NOTE</Text><TextInput value={note} onChangeText={setNote} placeholder="Optional note" placeholderTextColor={colors.muted} style={[styles.input,{height:90,textAlignVertical:'top'}]} multiline/>
    </Card>
    <Pressable onPress={save} style={styles.save}><Text style={styles.saveText}>SAVE TRANSACTION</Text></Pressable>
    <Pressable onPress={()=>router.back()} style={styles.cancel}><Text style={styles.cancelText}>CANCEL</Text></Pressable>
  </ScrollView></Screen>
}
const styles=StyleSheet.create({content:{padding:20,paddingBottom:40},kicker:{color:colors.accent,fontSize:11,fontWeight:'900',letterSpacing:2},title:{color:colors.text,fontSize:28,fontWeight:'900',marginBottom:20},segment:{flexDirection:'row',backgroundColor:colors.panel,borderRadius:14,padding:4,marginBottom:14},segmentBtn:{flex:1,padding:13,alignItems:'center',borderRadius:11},active:{backgroundColor:colors.accent},segmentText:{color:colors.muted,fontWeight:'900',fontSize:11},activeText:{color:'#00150d'},label:{color:colors.muted,fontSize:10,fontWeight:'900',letterSpacing:1.2,marginTop:9},amount:{color:colors.text,fontSize:34,fontWeight:'900',borderBottomWidth:1,borderBottomColor:colors.border,paddingVertical:8,marginBottom:8},input:{color:colors.text,backgroundColor:colors.background,borderWidth:1,borderColor:colors.border,borderRadius:12,padding:13,marginTop:7,marginBottom:7},chip:{paddingHorizontal:13,paddingVertical:9,borderRadius:20,borderWidth:1,borderColor:colors.border},chipActive:{backgroundColor:colors.accent,borderColor:colors.accent},chipText:{color:colors.muted,fontSize:11,fontWeight:'700'},chipTextActive:{color:'#00150d'},save:{backgroundColor:colors.accent,borderRadius:14,padding:17,alignItems:'center',marginTop:16},saveText:{fontWeight:'900'},cancel:{padding:15,alignItems:'center'},cancelText:{color:colors.muted,fontWeight:'800'}})
