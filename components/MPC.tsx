import React, { useState } from 'react';
import { 
  Users, Filter, Calculator, FileCheck, EyeOff, 
  ArrowRight, Download, CheckCircle, AlertTriangle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const STEPS = [
  { id: 1, label: '隐私求交 (PSI)', icon: Users },
  { id: 2, label: '统计配置 (Config)', icon: Filter },
  { id: 3, label: '隐私保护 (DP)', icon: EyeOff },
  { id: 4, label: '分析结果 (Result)', icon: FileCheck },
];

// --- Sub-Components ---

const PSIStep = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <div className="relative w-[500px] h-[300px] flex items-center justify-center">
      {/* Left Circle (A) */}
      <div className="absolute left-10 w-64 h-64 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center animate-pulse-slow">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-200">Dataset A</div>
          <div className="text-sm text-blue-400">10M Users</div>
        </div>
      </div>
      
      {/* Right Circle (B) */}
      <div className="absolute right-10 w-64 h-64 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center animate-pulse-slow" style={{animationDelay: '1s'}}>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-200">Dataset B</div>
          <div className="text-sm text-purple-400">5M Users</div>
        </div>
      </div>

      {/* Intersection */}
      <div className="absolute z-10 text-center">
         <div className="text-3xl font-bold text-white mb-1">2.4M</div>
         <div className="text-xs text-slate-300 uppercase tracking-wider bg-slate-900/80 px-2 py-1 rounded">Matched Users</div>
      </div>
    </div>
    
    <div className="mt-8 max-w-xl w-full text-center">
       <h3 className="text-xl font-bold text-white mb-2">RSA-Blind-Signature PSI</h3>
       <p className="text-slate-400 text-sm">双方仅获取交集用户 ID，非交集数据绝不泄露。计算过程在 TEE 环境中执行。</p>
    </div>
  </div>
);

const StatsConfigStep = () => (
   <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-8">
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="font-bold text-white mb-4">分析维度 (Dimensions)</h3>
            <div className="space-y-3">
               {['Gender', 'Age_Group', 'City', 'Device_Type'].map(dim => (
                  <label key={dim} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded border border-slate-700 cursor-pointer hover:border-blue-500">
                     <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500" />
                     <span className="text-slate-200">{dim}</span>
                  </label>
               ))}
            </div>
         </div>
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="font-bold text-white mb-4">统计指标 (Metrics)</h3>
            <div className="space-y-3">
               {['Count (Unique Users)', 'Sum (Transaction Amount)', 'Avg (Stay Duration)', 'Conversion Rate'].map((metric, i) => (
                  <label key={metric} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded border border-slate-700 cursor-pointer hover:border-emerald-500">
                     <input type="radio" name="metric" defaultChecked={i===0} className="w-4 h-4 border-slate-600 bg-slate-700 text-emerald-600 focus:ring-emerald-500" />
                     <span className="text-slate-200">{metric}</span>
                  </label>
               ))}
            </div>
         </div>
      </div>
   </div>
);

const DPStep = () => (
  <div className="max-w-2xl mx-auto h-full flex flex-col justify-center text-center">
     <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/50">
        <EyeOff size={40} className="text-amber-500" />
     </div>
     <h2 className="text-2xl font-bold text-white mb-2">差分隐私保护 (Differential Privacy)</h2>
     <p className="text-slate-400 mb-10">向统计结果中添加拉普拉斯噪声，防止反推个体隐私。</p>

     <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-left">
        <div className="mb-8">
           <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-slate-200">隐私预算 Epsilon (ε)</label>
              <span className="text-2xl font-mono text-blue-400">1.5</span>
           </div>
           <input type="range" min="0.1" max="10" step="0.1" defaultValue="1.5" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
           <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>High Privacy (Low Accuracy)</span>
              <span>High Accuracy (Low Privacy)</span>
           </div>
        </div>

        <div className="p-4 bg-amber-900/20 border border-amber-900/50 rounded flex gap-3">
           <AlertTriangle size={20} className="text-amber-500 shrink-0" />
           <div className="text-sm text-amber-200">
              当前配置预计会产生 <strong>±2.4%</strong> 的统计误差。
           </div>
        </div>
     </div>
  </div>
);

const ResultStep = () => {
  const data = [
    { name: '18-24', val: 4000 }, { name: '25-34', val: 3000 },
    { name: '35-44', val: 2000 }, { name: '45+', val: 2780 },
  ];

  return (
     <div className="h-full flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
           <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-sm text-slate-400 mb-1">Total Matched Users</div>
              <div className="text-3xl font-bold text-white">2,401,920</div>
           </div>
           <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-sm text-slate-400 mb-1">Total Value (Est.)</div>
              <div className="text-3xl font-bold text-emerald-400">¥ 842.5 M</div>
           </div>
           <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-sm text-slate-400 mb-1">Compliance Check</div>
              <div className="text-3xl font-bold text-blue-400 flex items-center justify-center gap-2">
                 <CheckCircle size={28} /> PASS
              </div>
           </div>
        </div>

        <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col">
           <h3 className="font-bold text-white mb-4">用户画像分布 (Age Distribution)</h3>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][index % 4]} />
                    ))}
                  </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
     </div>
  );
}

export const MPC: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="h-full flex flex-col bg-slate-950 animate-fade-in">
       {/* Header */}
       <div className="h-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 flex items-center justify-between shrink-0">
          <div>
             <h1 className="text-lg font-bold text-white">联合营销分析 (Joint Marketing Analysis)</h1>
             <p className="text-xs text-slate-400">Task #MPC-092 • Retail + E-Commerce</p>
          </div>
          <div className="flex items-center gap-8">
             {STEPS.map((step, idx) => (
                <div key={step.id} onClick={() => setCurrentStep(step.id)} className={`flex flex-col items-center gap-1 cursor-pointer group ${currentStep === step.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${currentStep === step.id ? 'border-purple-500 bg-purple-500/20 text-purple-400' : 'border-slate-600 bg-slate-800 text-slate-400'}`}>
                      <step.icon size={18} />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-wider">{step.label}</span>
                </div>
             ))}
          </div>
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm hover:text-white transition-colors flex items-center gap-2">
             <Download size={16} /> 导出报告
          </button>
       </div>

       {/* Content */}
       <div className="flex-1 p-8 min-h-0 overflow-y-auto">
          {currentStep === 1 && <PSIStep />}
          {currentStep === 2 && <StatsConfigStep />}
          {currentStep === 3 && <DPStep />}
          {currentStep === 4 && <ResultStep />}
       </div>

       {/* Footer */}
       <div className="h-16 border-t border-slate-800 bg-slate-900 px-8 flex items-center justify-end gap-4 shrink-0">
          {currentStep > 1 && (
            <button onClick={() => setCurrentStep(c => c-1)} className="px-6 py-2 text-slate-400 hover:text-white transition-colors">
               上一步
            </button>
          )}
          <button onClick={() => setCurrentStep(c => Math.min(c+1, 4))} className="px-8 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded font-medium shadow-lg shadow-purple-900/30 transition-colors flex items-center gap-2">
             {currentStep === 4 ? '完成 (Finish)' : '下一步 (Next)'} <ArrowRight size={16} />
          </button>
       </div>
    </div>
  );
};