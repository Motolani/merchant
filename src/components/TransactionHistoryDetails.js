/* eslint-disable prettier/prettier */
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import Entypo  from "react-native-vector-icons/Entypo"
import { SafeAreaView } from 'react-native-safe-area-context';



const TransactionHistoryDetails = ({route, navigation}) => {
    const { transaction } = route.params;
    // console.log("transaction", transaction)
    const TransactionType = transaction?.DebitCredit == "D" ? "Debit" : "Credit";
    const TransactionTypeSign = transaction?.DebitCredit == "D" ? "-" : "+";


  return (
    <SafeAreaView className="bg-white h-full">
    <ScrollView className="relative h-full" contentContainerStyle={{paddingBottom: 60}} automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
        {
            Platform.OS === "android" ? (
                <View className="px-1">
                <View className="flex flex-row mt-2 items-center justify-between">
                    <TouchableOpacity className="h-10 w-10 rounded-full bg-gray-200 items-center justify-center" onPress={() => navigation.goBack()}>
                        <Entypo name='chevron-left' size={34} color="rgb(51, 65, 85)" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 rounded-md bg-blue-400 items-center justify-center">
                        <Text className="text-white text-xs font-bold">Save</Text>
                    </TouchableOpacity>
                </View>
                <View className="mt-5 px-2">
                    <Text className="text-2xl text-slate-700 font-bold text-start">Transaction</Text>
                    <Text className="text-2xl text-slate-700 font-bold text-start">Details</Text>
                </View>
                <TouchableOpacity className="bg-white  border border-gray-100 rounded-md shadow-sm self-center items-center justify-center h-12 w-28">
                    <Text className="font-bold text-green-500">{transaction?.Channel}</Text>
                </TouchableOpacity>
                <Text className="text-center font-semibold mt-2 text-slate-700">{transaction?.TranDate}</Text>
    
                <View className="mt-6 px-2">
                    <View className="items-start border-b border-gray-200 pb-1 pt-1">
                        <Text className="text-lg text-slate-700 font-bold">{TransactionTypeSign}₦{transaction?.Amount}</Text>
                        <Text className="text-lg text-slate-700 font-semibold">{TransactionType}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-4 space-y-1 pt-4">
                        <Text className=" text-slate-400 font-bold">Source Account</Text>
                        <Text className=" text-slate-700 font-bold">{transaction?.SourceAccount}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Balance</Text>
                        <Text className=" text-slate-700 font-bold">₦{transaction?.Balance}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Description</Text>
                        <Text className="text-slate-700 font-bold">{transaction?.Description}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Channel</Text>
                        <Text className="text-slate-700 font-bold">{transaction?.Channel}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Bank Code</Text>
                        <Text className="text-slate-700 font-bold">{transaction?.BankCode}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Request ID</Text>
                        <Text className="text-slate-700 font-bold">{transaction?.RequestID}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Transaction ID</Text>
                        <Text className="text-slate-700 font-bold">{transaction?.TranID}</Text>
                    </View>
    
                </View>
            </View>
            ) : (
                <View className="px-4">
                <View className="flex flex-row items-center">
                    <TouchableOpacity className="h-10 w-10 rounded-full bg-gray-200 items-center justify-center" onPress={() => navigation.goBack()}>
                        <Entypo name='chevron-left' size={34} color="rgb(51, 65, 85)" />
                    </TouchableOpacity>
                </View>
                <View className="mt-5">
                    <Text className="text-3xl text-slate-700 font-bold text-start">Transaction</Text>
                    <Text className="text-3xl text-slate-700 font-bold text-start">Details</Text>
                </View>
                <TouchableOpacity className="bg-white rounded-md shadow-sm self-center items-center justify-center h-12 w-28">
                    <Text className="font-bold text-green-500">{transaction?.Channel}</Text>
                </TouchableOpacity>
                <Text className="text-base text-center font-semibold mt-2 text-slate-700">{transaction?.TranDate}</Text>
    
                <View className="mt-8">
                    <View className="items-start border-b border-gray-200 pb-1 pt-1">
                        <Text className="text-lg text-slate-700 font-bold">{TransactionTypeSign}₦{transaction?.Amount}</Text>
                        <Text className="text-lg text-slate-700 font-semibold">{TransactionType}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-4 space-y-1 pt-4">
                        <Text className=" text-slate-400 font-bold">Source Account</Text>
                        <Text className="text-base text-slate-700 font-bold">{transaction?.SourceAccount}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Balance</Text>
                        <Text className="text-base text-slate-700 font-bold">₦{transaction?.Balance}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Description</Text>
                        <Text className="text-base text-slate-700 font-bold">{transaction?.Description}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Channel</Text>
                        <Text className="text-base text-slate-700 font-bold">{transaction?.Channel}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Bank Code</Text>
                        <Text className="text-base text-slate-700 font-bold">{transaction?.BankCode}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Request ID</Text>
                        <Text className="text-base text-slate-700 font-bold">{transaction?.RequestID}</Text>
                    </View>
    
                    <View className="items-start border-b border-gray-200 pb-3 space-y-1 pt-3">
                        <Text className=" text-slate-400 font-bold">Transaction ID</Text>
                        <Text className="text-base text-slate-700 font-bold">{transaction?.TranID}</Text>
                    </View>
    
                </View>
            </View>
            )
        }
    </ScrollView>
    </SafeAreaView>        
  )
}

export default TransactionHistoryDetails