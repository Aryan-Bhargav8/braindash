'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import Payment from "@/components/view/payment";
import {Dialog, DialogContent} from "@/components/ui/dialog";


export default function PaymentPage() {
  const [payment , setPayment] = useState(0);
  const handlePricing = (amount: number) => {
    setPayment(amount);
  };

  return (
    <main className="flex-grow">
      <Dialog open={payment != 0} onOpenChange={(open) => {
        if (!open) {
          setPayment(0);
        }
      }}>
        <DialogContent className={"bg-secondary"}>
          <Payment amount={payment} />
        </DialogContent>
      </Dialog>
      <div className="px-4 sm:px-8 lg:px-32 mb-12 hidde">
        <div className="w-full flex items-center justify-center">
          <div className="text-center max-w-3xl">
            <h1 className="text-primary text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 text-center">
              The Perfect Plan For Your Needs
            </h1>
            <p className="text-senary text-lg sm:text-xl text-center mb-8">
              Our transparent pricing makes it easy to find a plan that works within your financial constraints.
            </p>
            <img src="/images/cat-payment.png" alt="Image description"
                 className="m-auto animate-float max-w-full h-auto"/>
          </div>
        </div>
      </div>

      <div className={"relative"}>
        {/* Pricing Section */}
        <section className={cn(
          "px-4 sm:px-8 lg:px-32 py-12 transition-all",
          // payment != 0 && "opacity-0 translate-x-[-20%]"
        )}>
          <h2 className="text-primary text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-12 text-center">Choose a
            Pricing Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[
              {title: 'Monthly', price: 9, period: 'per month'},
              {title: 'Quarterly', price: 24, period: 'per quarter'},
              {title: 'Yearly', price: 80, period: 'per year'}
            ].map((plan, index) => (
              <div key={plan.title}
                   className={`bg-gradient-to-tr from-light to-${index === 1 ? 'septenary' : 'secondary'} bg-opacity-20 p-8 rounded-[2rem] shadow-lg flex flex-col items-center ${index === 1 ? 'border-2 border-primary' : ''}`}>
                <h3 className="text-primary font-bold text-2xl mb-4 text-center">{plan.title}</h3>
                <div className="text-4xl font-bold text-primary mb-4 text-center">{plan.price}$</div>
                <img src="/images/coin-payment.png" alt="Coin" className="hover:animate-bounce"/>
                <p className="text-primary mb-6 text-center text-xl">{plan.period}</p>
                <ul className="text-primary mb-8">
                  {[1, 2, 3].map((feature) => (
                    <li key={feature} className="flex items-center mb-2 justify-center">
                      <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                      Feature {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePricing(plan.price * 100)}
                  className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/*<section className={cn(*/}
        {/*  "absolute top-0 left-0 w-full",*/}
        {/*  "px-4 sm:px-8 lg:px-32 py-12 transition-all opacity-0 translate-x-[20%] pointer-events-none",*/}
        {/*  payment != 0 && "opacity-1 translate-x-[0%] pointer-events-auto"*/}
        {/*)}>*/}
        {/*  <div className={"flex flex-col container h-full"}>*/}
        {/*    <button onClick={() => handlePricing(0)} className={"bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex w-[160px]"}>*/}
        {/*      <ArrowLeft/>*/}
        {/*      <p className={"pl-2 font-semibold"}>Go back</p>*/}
        {/*    </button>*/}
        {/*    <Payment amount={payment} />*/}
        {/*  </div>*/}
        {/*</section>*/}
      </div>
    </main>
  );
}