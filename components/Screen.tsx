import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
export function Screen({children}:{children:ReactNode}){return <SafeAreaView style={styles.safe}><View style={styles.bg}>{children}</View></SafeAreaView>}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:colors.background},bg:{flex:1,backgroundColor:colors.background}})
