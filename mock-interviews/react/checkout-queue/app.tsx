
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import './app.css';

interface ICounter {
    name: string;
    customers: Array<{
        id: string;
        noOfItems: number;
        entryTime: number
    }>;

}

const TimeToInvoiceOneItem = 1500;
const DefaultCounters: Array<ICounter> = Array(5)
    .fill(null)
    .map((_,id)=> ({
        name: `${id + 1}`,
        customers:[]
    } as ICounter))

const CheckoutCounter = ({name, customers}:ICounter) => {
    const activeCustomers = useMemo(()=>customers, [customers]);

    return (
        <div className="checkoutCounter">
            <div className="counter">{name}</div>
            {activeCustomers.map((customer) => (
                <div className="customer"
                    key={customer.id}
                >
                    {customer.noOfItems}
                </div>
            ))}
        </div>
    )
}

const Checkout = () => {
    const[counters, setCounters] = useState(DefaultCounters);
    const[waitingCustomer, setWaitingCustomer] = useState<number>();

    useEffect(()=>{
        setInterval(()=>{
            setCounters(prevCounters => {
                if(!prevCounters) return prevCounters;
                const newCounters = structuredClone(prevCounters);
                newCounters.forEach(counter => {
                    const customers = counter.customers;
                    if(
                        customers.length &&
                        Date.now() - customers[0].entryTime >= TimeToInvoiceOneItem
                    ){
                        const activeCustomer = customers[0]
                        activeCustomer.noOfItems--;

                        if(activeCustomer.noOfItems === 0)
                            customers.shift()
                    }
                })
                return newCounters;
            })
        }, TimeToInvoiceOneItem)
    },[])

    const addCustomerToQueue = (waitingCustomerItems: number) =>{
        setWaitingCustomer(0);
        setCounters((counters) => {
            const maxItems = counters.map(
                (counter, idx) =>{
                    const totalItems = counter.customers
                        .reduce((acc, cur) => (acc+ cur.noOfItems),0)
                    return {
                        idx,
                        totalItems,
                    }
                }
            )
            maxItems.sort((a,b) => a.totalItems - b.totalItems);
            const counterToAdd = maxItems[0].idx;
            const newCounters = structuredClone(counters);
            newCounters[counterToAdd].customers.push({
                id: uuid(),
                noOfItems: waitingCustomerItems,
                entryTime: Date.now()
            })
            return newCounters;
        })
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setWaitingCustomer(parseInt(e.target.value))
        }
    }
    return (
        <div className="checkout">
            <div className="checkoutEntry">
                <input
                    type="number"
                    min={1}
                    value={waitingCustomer}
                    onChange={onInputChange}
                />
                <button
                    disabled={!waitingCustomer}
                    onClick={()=>addCustomerToQueue(waitingCustomer as number)}
                >
                    checkout
                </button>
            </div>
            <div className="counterArea">
                {
                    counters.map(counter => (
                        <CheckoutCounter
                            key={counter.name}
                            name={counter.name}
                            customers={counter.customers}
                        />
                    ))
                }
            </div>
        </div>
    )
}



bootstrapReactApp(<Checkout/>)
