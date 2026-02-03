import React, { useState } from 'react';
import { 
  Users, Filter, Calculator, FileCheck, EyeOff, 
  ArrowRight, Download, CheckCircle, AlertTriangle, 
  FileText, ShieldCheck, X
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
      <div className="absolute left-10 w-64 h-64 rounded-full bg-blue-50 border-2 border-blue-400 flex items-center justify-center animate-pulse-slow shadow-lg shadow-blue-100">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-800">Dataset A</div>
          <div className="text-sm text-blue-600">10M Users</div>
        </div>
      </div>
      
      {/* Right Circle (B) */}
      <div className="absolute right-10 w-64 h-64 rounded-full bg-purple-50 border-2 border-purple-400 flex items-center justify-center animate-pulse-slow shadow-lg shadow-purple-100" style={{animationDelay: '1s'}}>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-800">Dataset B</div>
          <div className="text-sm text-purple-600">5M Users</div>
        </div>
      </div>

      {/* Intersection */}
      <div className="absolute z-10 text-center">
         <div className="text-3xl font-bold text-gray-800 mb-1">2.4M</div>
         <div className="text-xs text-gray-600 uppercase tracking-wider bg-white/90 border border-gray-200 px-2 py-1 rounded shadow-sm">Matched Users</div>
      </div>
    </div>
    
    <div className="mt-8 max-w-xl w-full text-center">
       <h3 className="text-xl font-bold text-gray-800 mb-2">RSA-Blind-Signature PSI</h3>
       <p className="text-gray-500 text-sm">双方仅获取交集用户 ID，非交集数据绝不泄露。计算过程在 TEE 环境中执行。</p>
    </div>
  </div>
);

const StatsConfigStep = () => (
   <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-8">
         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">分析维度 (Dimensions)</h3>
            <div className="space-y-3">
               {['Gender', 'Age_Group', 'City', 'Device_Type'].map(dim => (
                  <label key={dim} className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:border-blue-500 transition-colors">
                     <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                     <span className="text-gray-700">{dim}</span>
                  </label>
               ))}
            </div>
         </div>
         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">统计指标 (Metrics)</h3>
            <div className="space-y-3">
               {['Count (Unique Users)', 'Sum (Transaction Amount)', 'Avg (Stay Duration)', 'Conversion Rate'].map((metric, i) => (
                  <label key={metric} className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:border-emerald-500 transition-colors">
                     <input type="radio" name="metric" defaultChecked={i===0} className="w-4 h-4 border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                     <span className="text-gray-700">{metric}</span>
                  </label>
               ))}
            </div>
         </div>
      </div>
   </div>
);

const DPStep = () => (
  <div className="max-w-2xl mx-auto h-full flex flex-col justify-center text-center">
     <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-200">
        <EyeOff size={40} className="text-amber-500" />
     </div>
     <h2 className="text-2xl font-bold text-gray-800 mb-2">差分隐私保护 (Differential Privacy)</h2>
     <p className="text-gray-500 mb-10">向统计结果中添加拉普拉斯噪声，防止反推个体隐私。</p>

     <div className="bg-white border border-gray-200 rounded-xl p-8 text-left shadow-sm">
        <div className="mb-8">
           <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">隐私预算 Epsilon (ε)</label>
              <span className="text-2xl font-mono text-blue-600">1.5</span>
           </div>
           <input type="range" min="0.1" max="10" step="0.1" defaultValue="1.5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
           <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>High Privacy (Low Accuracy)</span>
              <span>High Accuracy (Low Privacy)</span>
           </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-100 rounded flex gap-3">
           <AlertTriangle size={20} className="text-amber-500 shrink-0" />
           <div className="text-sm text-amber-800">
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
           <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Matched Users</div>
              <div className="text-3xl font-bold text-gray-800">2,401,920</div>
           </div>
           <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Value (Est.)</div>
              <div className="text-3xl font-bold text-emerald-600">¥ 842.5 M</div>
           </div>
           <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Compliance Check</div>
              <div className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-2">
                 <CheckCircle size={28} /> PASS
              </div>
           </div>
        </div>

        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm">
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">用户画像分布 (Age Distribution)</h3>
              <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded border border-blue-200 text-xs font-medium hover:bg-blue-100 transition-colors transition-transform active:scale-95">
                      <FileText size={14}/> 导出结果 (CSV)
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-600 rounded border border-purple-200 text-xs font-medium hover:bg-purple-100 transition-colors transition-transform active:scale-95">
                      <ShieldCheck size={14}/> 下载隐私证明 (ZK-Proof)
                  </button>
              </div>
           </div>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1f2937' }} />
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNext = () => {
     if (currentStep === 4) {
        setShowSuccessModal(true);
     } else {
        setCurrentStep(c => c + 1);
     }
  };

  const resetFlow = () => {
     setShowSuccessModal(false);
     setCurrentStep(1);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 animate-fade-in relative">
       {/* Header */}
       <div className="h-20 border-b border-gray-200 bg-white/80 backdrop-blur px-8 flex items-center justify-between shrink-0 z-10">
          <div>
             <h1 className="text-lg font-bold text-gray-800">联合营销分析 (Joint Marketing Analysis)</h1>
             <p className="text-xs text-gray-500">Task #MPC-092 • Retail + E-Commerce</p>
          </div>
          <div className="flex items-center gap-8">
             {STEPS.map((step, idx) => (
                <div key={step.id} onClick={() => setCurrentStep(step.id)} className={`flex flex-col items-center gap-1 cursor-pointer group ${currentStep === step.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${currentStep === step.id ? 'border-purple-500 bg-purple-50 text-purple-600' : 'border-gray-300 bg-white text-gray-400'}`}>
                      <step.icon size={18} />
                   </div>
                   <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep === step.id ? 'text-purple-600' : 'text-gray-400'}`}>{step.label}</span>
                </div>
             ))}
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-2">
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
       <div className="h-16 border-t border-gray-200 bg-white px-8 flex items-center justify-end gap-4 shrink-0">
          {currentStep > 1 && (
            <button onClick={() => setCurrentStep(c => c-1)} className="px-6 py-2 text-gray-500 hover:text-gray-800 transition-colors">
               上一步
            </button>
          )}
          <button onClick={handleNext} className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium shadow-lg shadow-purple-500/20 transition-colors flex items-center gap-2">
             {currentStep === 4 ? '完成 (Finish)' : '下一步 (Next)'} <ArrowRight size={16} />
          </button>
       </div>

       {/* Success Modal */}
       {showSuccessModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-scale-in">
              <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-sm text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <button onClick={resetFlow} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20}/></button>
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-500 border border-purple-100">
                      <CheckCircle size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">任务完成！</h2>
                  <p className="text-gray-500 text-sm mb-6">MPC 多方计算已结束，结果已加密存储并分发给参与方。</p>
                  <button onClick={resetFlow} className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium">关闭并返回</button>
              </div>
          </div>
       )}
    </div>
  );
};