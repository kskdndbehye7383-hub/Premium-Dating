import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Check, CreditCard, Calendar, Lock, CheckCircle, AlertOctagon, ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";
import { mockLogout } from "./Login";

export default function Membership() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "error" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus(null);
    setStatusMessage("");
    
    if (cardNumber.length !== 16 || expiry.length !== 6 || cvv.length !== 3) {
      alert("Please ensure: \n- Card Number is 16 digits \n- Expiry is 6 digits (MMYYYY) \n- CVV is 3 digits");
      return;
    }

    setLoading(true);

    try {
      // Simulate real-world transaction gateway latency (2.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Validate payment connecting to our real node backend database
      const response = await fetch('/api/cards/validate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Mark user as premium
        const currentUserEmail = localStorage.getItem("spark_user_email");
        if (currentUserEmail) {
          await fetch('/api/users/upgrade', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: currentUserEmail })
          });
        }

        // Success: the card number MATCHES a number in the database and was deleted
        setPaymentStatus("success");
        setStatusMessage("Payment successful! Your premium membership is activated. Redirecting...");
        
        // Redirect to main App after successful purchase
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      } else {
        // Error: card not in the database
        setPaymentStatus("error");
        setStatusMessage("Payment failed. Please verify your card. Redirecting to login shortly...");
        setLoading(false);
        
        setTimeout(() => {
          mockLogout();
          navigate("/login", { replace: true });
        }, 5000);
      }
    } catch (error) {
      console.error("Payment error", error);
      setPaymentStatus("error");
      setStatusMessage("Connection error. Could not verify payment. Redirecting to login shortly...");
      setLoading(false);
      
      setTimeout(() => {
        mockLogout();
        navigate("/login", { replace: true });
      }, 5000);
    }
  };

  // Ensure only digits are typed
  const handleDigitInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const val = e.target.value.replace(/\D/g, ''); 
    setter(val);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50 p-6 overflow-y-auto pt-10 pb-20">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Left Side: Product Details */}
        <div className="md:w-1/2 bg-gradient-to-br from-amber-500 to-orange-400 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner mb-6 backdrop-blur-sm border border-white/30">
              <Crown className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Spark Premium</h1>
            <p className="text-orange-50 font-medium text-lg mb-8">Unlock your full dating potential.</p>
            
            <div className="space-y-4">
              <FeatureItem text="See everyone who liked you" />
              <FeatureItem text="Unlimited likes & swipes" />
              <FeatureItem text="5 Super Likes a day" />
              <FeatureItem text="Priority matching & visibility" />
              <FeatureItem text="Hide your age and distance" />
            </div>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8 relative">
            <button 
              onClick={() => {
                mockLogout();
                navigate("/login", { replace: true });
              }}
              className="absolute -top-6 right-0 md:-top-4 flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors group z-20"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
            <p className="text-gray-500 font-medium">Billed $9.99 monthly. Cancel anytime.</p>
          </div>

          {/* Alert Notification System */}
          {paymentStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 flex items-start gap-3 animate-in fade-in zoom-in duration-300">
              <CheckCircle className="shrink-0 mt-0.5" size={18} />
              <p className="text-sm font-semibold">{statusMessage}</p>
            </div>
          )}
          
          {paymentStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start gap-3 animate-in fade-in zoom-in duration-300">
              <AlertOctagon className="shrink-0 mt-0.5" size={18} />
              <p className="text-sm font-semibold">{statusMessage}</p>
            </div>
          )}

          <form onSubmit={handlePayment} className="space-y-5">
            {/* Card Number */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Card Number</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-orange-500 transition-colors z-10">
                  <CreditCard size={20} />
                </div>
                <input
                  type="text"
                  maxLength={16}
                  value={cardNumber}
                  onChange={(e) => handleDigitInput(e, setCardNumber)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-400 outline-none rounded-xl transition-all font-mono font-medium text-gray-900 placeholder:text-gray-300 shadow-inner"
                  placeholder="0000 0000 0000 0000"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 ml-2 font-medium">{cardNumber.length}/16 digits</p>
            </div>

            <div className="flex gap-4">
              {/* Expiry Date */}
              <div className="space-y-2 flex-1">
                <label className="text-sm font-bold text-gray-700 ml-1">Expiry Date</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-orange-500 transition-colors z-10">
                    <Calendar size={20} />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={expiry}
                    onChange={(e) => handleDigitInput(e, setExpiry)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-400 outline-none rounded-xl transition-all font-mono font-medium text-gray-900 placeholder:text-gray-300 shadow-inner"
                    placeholder="MMYYYY"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 ml-2 font-medium">{expiry.length}/6 digits</p>
              </div>

              {/* CVV */}
              <div className="space-y-2 flex-1">
                <label className="text-sm font-bold text-gray-700 ml-1">CVV Code</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-orange-500 transition-colors z-10">
                    <Lock size={20} />
                  </div>
                  <input
                    type="text"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => handleDigitInput(e, setCvv)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-400 outline-none rounded-xl transition-all font-mono font-medium text-gray-900 placeholder:text-gray-300 shadow-inner"
                    placeholder="123"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 ml-2 font-medium">{cvv.length}/3 digits</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || paymentStatus !== null}
              className={cn(
                "w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all mt-6 flex items-center justify-center",
                (loading || paymentStatus !== null)
                  ? "bg-orange-300 shadow-none cursor-not-allowed opacity-80" 
                  : "bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-xl hover:shadow-orange-200 active:scale-[0.99]"
              )}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing payment...
                </div>
              ) : paymentStatus === "error" ? (
                "Redirecting to login..."
              ) : paymentStatus === "success" ? (
                "Success! Redirecting..."
              ) : (
                "Pay $9.99 Now"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center font-medium">
      <div className="mr-3 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <Check size={12} strokeWidth={3} className="text-white" />
      </div>
      {text}
    </div>
  );
}
