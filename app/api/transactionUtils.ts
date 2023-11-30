'use server'

import { nanoid } from "nanoid";
import { myCreateServerClient } from "./customHooks"
import { getVan } from "./vanFetching";
import { getCurrentUserByEmail } from "./api";

export async function addTransaction(vanId, numDays){
    const supabase = await myCreateServerClient();
    const van = await getVan(vanId);
    const hostId = van.hostId;
    const subtotal = Math.round(van.price * numDays)
    const total = (subtotal + (subtotal * 0.06)).toFixed(2);
    const transactionId = nanoid();

    const { error } =  await supabase
        .from('transactions')
        .insert({
            transaction_id: transactionId,
            host_id: hostId,
            van_id: vanId,
            num_days: numDays,
            total_amount: total
        })
    if(error) console.log(error)
    else {
        addHostTransaction(hostId, transactionId, van.id, numDays, total);
        AddUserOrder(transactionId, van.id, numDays, total)
    }

    return transactionId;
}

async function addHostTransaction(hostId, transactionId, vanId, numDays, total){
    const supabase = await myCreateServerClient();

    interface HostTransactionInterface {
        transaction_id: string;
        van_id: string;
        num_days: number;
        total_amount: number;
    }

    const newTransaction: HostTransactionInterface = {
        transaction_id: transactionId,
        van_id: vanId,
        num_days: numDays,
        total_amount: total
    }

    let { data: transactionData, error: fetchError } = await supabase
        .from('users')
        .select('transactions')
        .eq('id', hostId)
    if(fetchError) console.log(fetchError);

    let newTransactionData: object[];
    if(transactionData[0].transactions === null){
        newTransactionData = [newTransaction];
    } else {
        newTransactionData = [newTransaction, ...transactionData[0].transactions]
    }

    const { error: postError } = await supabase
        .from('users')
        .update({transactions: newTransactionData})
        .eq('id', hostId)
    if(postError) console.log(postError)
}

async function AddUserOrder(transactionId, vanId, numDays, total){
    interface UserOrderInterface {
        transaction_id: string;
        van_id: string;
        num_days: number;
        total_amount: number;
    }
    const supabase = await myCreateServerClient();
    const { data: userData } = await supabase.auth.getSession();
    const user = await getCurrentUserByEmail(userData.session.user.email);
    const userId = user[0].id;

    const newOrder: UserOrderInterface = {
        transaction_id: transactionId,
        van_id: vanId,
        num_days: numDays,
        total_amount: total
    }

    let { data: orderData, error: fetchError } = await supabase
        .from('users')
        .select('orders')
        .eq('id', userId)
    if(fetchError) console.log(fetchError);

    let newOrderData: object[];
    if(orderData[0].orders === null){
        newOrderData = [newOrder];
    } else {
        newOrderData = [newOrder, ...orderData[0].orders]
    }

    const { error: postError } = await supabase
        .from('users')
        .update({orders: newOrderData})
        .eq('id', userId)
    if(postError) console.log(postError)
}

export async function removeTransaction(transactionId: string){
    const supabase = await myCreateServerClient();
    const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('transaction_id', transactionId)
}
