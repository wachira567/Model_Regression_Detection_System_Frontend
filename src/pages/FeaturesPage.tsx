import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Database, GitBranch, Target, Cpu } from 'lucide-react';

export default function FeaturesPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const features = [
    {
      icon: <Database className="w-8 h-8 text-indigo-500" />,
      title: "Golden Datasets",
      description: "Curate test cases that define perfection for your model. MRDS securely stores these ground truths and evaluates all future model iterations against them.",
      color: "bg-indigo-50",
      border: "border-indigo-100"
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "Real-time Regression Scoring",
      description: "When you push a new model, we instantly compare its outputs to your golden dataset using advanced similarity metrics and LLM-as-a-judge capabilities.",
      color: "bg-amber-50",
      border: "border-amber-100"
    },
    {
      icon: <GitBranch className="w-8 h-8 text-emerald-500" />,
      title: "CI/CD Integration",
      description: "Trigger evaluations directly from your GitHub Actions or Jenkins pipelines. Block deployments automatically if the regression score drops below your threshold.",
      color: "bg-emerald-50",
      border: "border-emerald-100"
    },
    {
      icon: <Target className="w-8 h-8 text-rose-500" />,
      title: "Drift Analytics",
      description: "Visualize exactly how your model's behavior is drifting over time. Pinpoint specific prompt categories where the model is getting worse.",
      color: "bg-rose-50",
      border: "border-rose-100"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      title: "Enterprise Multi-Tenancy",
      description: "Full isolation between organizations. Invite your team members with granular Role-Based Access Control (RBAC) and Super Admin capabilities.",
      color: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      title: "Model Agnostic",
      description: "Whether you use OpenAI, Anthropic, or open-source local models, MRDS seamlessly integrates via our flexible REST API.",
      color: "bg-purple-50",
      border: "border-purple-100"
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
            Powerful features.<br />Beautifully simple.
          </h1>
          <p className="text-xl text-slate-500">
            MRDS provides a comprehensive suite of tools designed to ensure your generative AI applications never degrade in production.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
              }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} ${feature.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Architecture Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-32 bg-slate-900 rounded-[3rem] p-12 text-center text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Built on modern architecture</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12 relative z-10">
            Powered by FastAPI, PostgreSQL, and React. Engineered for lightning-fast evaluations and massive scalability.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {['FastAPI Backend', 'Async PostgreSQL', 'Vite & React 19', 'Framer Motion'].map((tech, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl font-medium text-slate-300">
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
