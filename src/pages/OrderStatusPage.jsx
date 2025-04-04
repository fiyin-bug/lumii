// src/pages/OrderStatusPage.js
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const OrderStatusPage = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status'); // Expect 'success' or 'failed'
    const reference = searchParams.get('reference');
    const reason = searchParams.get('reason'); // Reason for failure

    const isSuccess = status === 'success';

    // --- Determine Failure Message ---
    let failureMessage = "Your payment could not be processed. Please try again or contact support.";
    if (!isSuccess) { // If not success (could be 'failed' or something else/missing)
         // Use specific reason if provided
        if (reason === 'invalid_order_state') failureMessage = "There was an issue processing your order status. Please contact support.";
        else if (reason === 'order_not_found') failureMessage = "We couldn't find the order details after payment. Please contact support with your reference code.";
        else if (reason === 'server_error') failureMessage = "An unexpected error occurred on our end. Please try again later or contact support.";
        else if (reason === 'insufficient_stock') failureMessage = "Unfortunately, one or more items went out of stock during checkout. Please review your cart."; // Example
        else if (reason && reason !== 'payment_failed') failureMessage = `Payment failed: ${reason.replace(/_/g, ' ')}. Please try again or contact support.` // Generic reason display
        else if (!status) failureMessage = "The order status is unclear. Please check your email or contact support."; // Handle missing status
    }

    return (
        <div className={`py-20 px-6 min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center w-full">

                {/* --- Icon --- */}
                {isSuccess ? (
                     <i className="fas fa-check-circle text-6xl text-green-500 mb-6 animate-pulse"></i>
                ) : (
                     <i className="fas fa-times-circle text-6xl text-red-500 mb-6"></i>
                )}

                {/* --- Title --- */}
                <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                    {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
                </h1>

                {/* --- Message --- */}
                <p className="text-gray-600 mb-6">
                    {isSuccess
                        ? 'Thank you for your order. Your payment has been confirmed. You will receive an email confirmation shortly.'
                        : failureMessage}
                </p>

                {/* --- Reference Code (Show if available) --- */}
                {reference && (
                    <p className="text-sm text-gray-500 mb-6 bg-gray-100 px-3 py-2 rounded inline-block">
                       Order Reference: <strong>{reference}</strong>
                    </p>
                )}

                {/* --- Action Buttons --- */}
                {isSuccess ? (
                     <Link
                        to="/"
                        className="inline-block bg-[#f4b8da] text-white px-8 py-3 rounded-md hover:bg-[#e9a0c7] transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
                    >
                        Continue Shopping
                    </Link>
                ) : (
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                         <Link
                            to="/cart" // Link back to cart
                            className="inline-block bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition-colors duration-300 font-medium shadow-sm hover:shadow-md"
                        >
                            View Cart & Retry
                        </Link>
                        <Link
                            to="/contact" // Link to contact page
                            className="inline-block bg-[#f4b8da] text-white px-6 py-3 rounded-md hover:bg-[#e9a0c7] transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
                        >
                            Contact Support
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderStatusPage;