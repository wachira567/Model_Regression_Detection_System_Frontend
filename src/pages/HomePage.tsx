import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Database } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function HomePage() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Subtle Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100/50 to-emerald-50/50 rounded-full blur-[100px] opacity-70 -z-10 animate-pulse"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto z-10"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-8 border border-slate-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            MRDS 2.0 is now live
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.1] mb-6">
              Silence the Noise.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">See the Regressions.</span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              You train models. They regress. We catch them before your users do. The ultimate safety net for generative AI.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto h-14 px-8 bg-slate-900 text-white hover:bg-slate-800 rounded-full font-semibold transition-all duration-300 shadow-lg group text-lg"
            >
              Start for free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              onClick={() => navigate('/features')}
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 rounded-full font-semibold border-slate-200 text-slate-600 hover:bg-slate-50 text-lg transition-colors"
            >
              Explore features
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Story / Features Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Designed for reliability.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Everything you need to ensure your AI models perform flawlessly across every release.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="h-6 w-6 text-indigo-500" />,
                title: "Golden Datasets",
                desc: "Curate and lock in your perfect test cases. Never lose track of what 'correct' looks like."
              },
              {
                icon: <Zap className="h-6 w-6 text-amber-500" />,
                title: "Instant Analytics",
                desc: "Real-time regression scoring. Know exactly how much your model degraded, and exactly where."
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
                title: "Enterprise Grade",
                desc: "Secure Multi-Tenancy, role-based access, and isolated environments out of the box."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Ready to deploy with confidence?
          </h2>
          <p className="text-lg text-slate-500 mb-10">
            Join the hundreds of engineering teams trusting MRDS to protect their generative AI models in production.
          </p>
          <Button 
            onClick={() => navigate('/login')}
            className="h-14 px-10 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full font-semibold transition-all shadow-lg hover:shadow-indigo-600/30 text-lg group"
          >
            Get started for free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>
    </>
  );
}
