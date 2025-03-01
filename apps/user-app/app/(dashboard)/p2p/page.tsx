"use client";
import { useState } from "react";
import p2transfer from "../../lib/actions/p2ptransfer";
import p2pTransfer from "../../lib/actions/p2ptransfer";

export default function P2p() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    // Handle the send action here
    await p2pTransfer(number, Number(amount));
    console.log("Number:", number);
    console.log("Amount:", amount);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-xl font-semibold text-center">Send</div>
            <div className="pt-4">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Number
              </label>
              <input
                type="text"
                name="number"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="pt-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="text"
                name="amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={handleSend}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
