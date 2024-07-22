
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

const TimeToInvoiceOneItem = 500;
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
    const[waitingCustomer, setWaitingCustomer] = useState<number>(0);

    useEffect(()=>{
        const counter =  setInterval(()=>{
            setCounters(prevCounters => {
                if(!prevCounters) return prevCounters;

                return prevCounters.map(counter => {
                    const customers = counter.customers;
                    if(
                        customers.length &&
                        Date.now() - customers[0].entryTime >= TimeToInvoiceOneItem
                    ){

                        const modifiedCustomers = [
                            customers[0].noOfItems === 1
                                ? null
                                : {
                                    ...customers[0],
                                    noOfItems: customers[0].noOfItems - 1
                                },
                            ...customers.slice(1)
                        ].filter(c => !!c)

                        return {
                            ...counter,
                            customers: modifiedCustomers
                        } as ICounter
                    }
                    return counter;
                })
            })
        }, TimeToInvoiceOneItem)
        return () => {
            clearInterval(counter)
        }
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
            return counters.map((counter,idx) => {
                if(counterToAdd !== idx) {
                    return counter;
                }
                return {
                    ...counter,
                    customers: [
                        ...counter.customers,
                        {
                            id: uuid(),
                            noOfItems: waitingCustomerItems,
                            entryTime: Date.now()
                        }
                    ]
                }
            })
        })
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setWaitingCustomer(parseInt(e.target.value))
        }
    }
    return (
        <div className="checkout">
            <form
                className="checkoutEntry"
                onSubmit={(e)=>{
                    e.preventDefault();
                    addCustomerToQueue(waitingCustomer as number)}
                }>
                <input
                    type="number"
                    min={1}
                    value={waitingCustomer}
                    onChange={onInputChange}
                />
                <button
                    disabled={!waitingCustomer}
                >
                    checkout
                </button>
            </form>
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
