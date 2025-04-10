"use client";

import { Check, Gift } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// Slower bounce animation with gentler movement
const bounceAnimation = `@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20%);
  }
  60% {
    transform: translateY(-10%);
  }
}`;

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
  badge?: string;
  yearlyTotal?: number;
  yearlySavings?: number;
}

const plans: Plan[] = [
  {
    name: "Basic",
    description: "Perfect for personal use",
    monthlyPrice: 9,
    yearlyPrice: 64,
    yearlyTotal: 64,
    yearlySavings: 44,
    features: [
      "Up to 2 hours of transcription",
      "Basic accuracy",
      "Text-only exports",
      "Email support",
    ],
    badge: "40% OFF",
  },
  {
    name: "Pro",
    description: "Best for content creators",
    monthlyPrice: 18,
    yearlyPrice: 129,
    yearlyTotal: 129,
    yearlySavings: 87,
    features: [
      "Up to 10 hours of transcription",
      "Enhanced accuracy",
      "Multiple export formats",
      "Priority email support",
    ],
    popular: true,
    badge: "Most popular",
  },
  {
    name: "Business",
    description: "For teams and businesses",
    monthlyPrice: 27,
    yearlyPrice: 194,
    yearlyTotal: 194,
    yearlySavings: 130,
    features: [
      "Unlimited transcription",
      "Highest accuracy",
      "All export formats",
      "24/7 priority support",
    ],
    badge: "Best deal",
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [isFreeTrialEnabled, setIsFreeTrialEnabled] = useState(false);

  return (
    <>
      <style>{bounceAnimation}</style>
      <div
        id="pricing"
        className="py-16 overflow-hidden bg-gradient-to-b from-[#4f46e5]/5 via-white to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-[#4f46e5] uppercase tracking-wider mb-3">
              PRICING PLANS
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1f36] mb-4 leading-tight">
              Simple, transparent pricing for everyone
            </h3>
            <p className="flex items-center justify-center gap-2 text-[#4f46e5] mb-8">
              <Gift className="w-4 h-4" />
              <span className="text-sm">Start with a 7-day free trial</span>
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200">
                <button
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                    !isYearly ? "bg-[#4f46e5] text-white" : "text-gray-600"
                  )}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </button>
                <button
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors relative",
                    isYearly ? "bg-[#4f46e5] text-white" : "text-gray-600"
                  )}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs px-1.5 py-0.5 rounded-full animate-[bounce_2s_ease-in-out_infinite]">
                    40% OFF
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Free trial</span>
                <Switch
                  checked={isFreeTrialEnabled}
                  onCheckedChange={setIsFreeTrialEnabled}
                  className="data-[state=checked]:bg-[#4f46e5]"
                />
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-xl bg-white p-6 shadow-lg border border-gray-200",
                  plan.popular && "border-2 border-[#4f46e5] shadow-xl"
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4f46e5] text-white text-xs px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                ) : plan.badge === "Best deal" ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4f46e5]/10 text-[#4f46e5] text-xs px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                ) : (
                  <span className="absolute -top-3 right-4 bg-red-400 text-white text-xs px-3 py-1 rounded-full animate-[bounce_2s_ease-in-out_infinite]">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-lg font-semibold text-[#1a1f36]">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>

                <div className="mt-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-[#1a1f36]">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/month</span>
                  </div>
                  {isYearly && (
                    <div className="mt-1">
                      <p className="text-xs text-gray-500">
                        Billed as ${plan.yearlyTotal}/year
                      </p>
                      <p className="text-xs text-[#4f46e5]">
                        Save ${plan.yearlySavings} yearly
                      </p>
                    </div>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-[#4f46e5] mr-2 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <SignUpButton mode="modal">
                  <Button
                    className={cn(
                      "mt-6 w-full rounded-lg py-2 text-sm font-medium transition-all",
                      plan.popular
                        ? "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                        : "bg-[#4f46e5]/5 text-[#4f46e5] hover:bg-[#4f46e5]/10"
                    )}
                  >
                    {isFreeTrialEnabled ? "Start Free Trial" : "Get Started"}
                  </Button>
                </SignUpButton>

                <p className="text-xs text-center text-gray-500 mt-3">
                  {isFreeTrialEnabled
                    ? "No credit card required"
                    : "Instant access"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 