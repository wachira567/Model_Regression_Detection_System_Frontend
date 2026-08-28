import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const plans = [
    {
      name: "Starter",
      desc: "Perfect for indie developers and small teams starting with AI.",
      price: "$0",
      period: "forever",
      features: [
        { name: "Up to 3 Models", included: true },
        { name: "1,000 evaluations / month", included: true },
        { name: "1 Golden Dataset", included: true },
        { name: "Community Support", included: true },
        { name: "Advanced CI/CD Integration", included: false },
        { name: "SSO / SAML", included: false },
      ],
      buttonText: "Start for free",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Pro",
      desc: "For engineering teams pushing models to production daily.",
      price: "$49",
      period: "per user / month",
      features: [
        { name: "Unlimited Models", included: true },
        { name: "50,000 evaluations / month", included: true },
        { name: "Unlimited Golden Datasets", included: true },
        { name: "Priority Email Support", included: true },
        { name: "Advanced CI/CD Integration", included: true },
        { name: "SSO / SAML", included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Enterprise",
      desc: "Custom limits and dedicated support for large organizations.",
      price: "Custom",
      period: "contact sales",
      features: [
        { name: "Unlimited Models", included: true },
        { name: "Custom evaluation limits", included: true },
        { name: "Unlimited Golden Datasets", included: true },
        { name: "Dedicated Success Manager", included: true },
        { name: "Advanced CI/CD Integration", included: true },
        { name: "SSO / SAML", included: true },
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Simple, transparent pricing.
          </h1>
          <p className="text-xl text-slate-500">
            Start for free and scale as your team grows. No hidden fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
              }}
              className={`relative bg-white rounded-3xl p-8 border ${plan.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-200 shadow-sm'} flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm h-10">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                </div>
                <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    {feat.included ? (
                      <div className="mt-0.5 bg-emerald-100 p-0.5 rounded-full text-emerald-600 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                    ) : (
                      <div className="mt-0.5 bg-slate-100 p-0.5 rounded-full text-slate-400 shrink-0">
                        <X className="w-3 h-3" />
                      </div>
                    )}
                    <span className={`text-sm ${feat.included ? 'text-slate-700' : 'text-slate-400'}`}>
                      {feat.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => navigate('/login')}
                className={`w-full h-12 rounded-xl font-semibold transition-all ${
                  plan.buttonVariant === 'default' 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5' 
                    : 'bg-white text-slate-900 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
