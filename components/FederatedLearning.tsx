import React, { useState, useEffect } from 'react';
import { 
  Play, Save, Settings, Database, Server, FileOutput, 
  CheckCircle, ChevronRight, Layers, ShieldCheck, Activity,
  Cpu, Lock, FileText, Fingerprint, Eye, X, AlertCircle
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { MOCK_AUDIT_LOGS } from '../constants';

// --- Steps Definition ---
const STEPS = [
  { id: 1, label: '数据接入 (Data)', icon: Database },
  { id: 2, label: '节点选择 (Nodes)', icon: Server },
  { id: 3, label: '建模配置 (Config)', icon: Settings },
  { id: 4, label: '联邦训练 (Training)', icon: Activity },
  { id: 5, label: '模型交付 (Delivery)', icon: FileOutput },
];

const MOCK_ASSETS_LIST = [
  { id: 'DA-001', name: 'Retail_Trans_Q3', rows: '4.5M', owner: 'Bank A', type: 'Host' },
  { id: 'DA-002', name: 'Credit_Blacklist', rows: '85K', owner: 'FinTech B', type: 'Guest' },
  { id: 'DA-005', name: 'User_Behavior_Log', rows: '12M', owner: 'E-Comm C', type: 'Guest' },
];

// --- Sub-components ---

interface DataSelectionProps {
    selectedAssets: string[];
    onToggle: (id: string) => void;
}

const DataSelectionStep: React.FC<DataSelectionProps> = ({ selectedAssets, onToggle }) => {
  const selectedDetails = MOCK_ASSETS_LIST.filter(a => selectedAssets.includes(a.id));

  return (
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">可选数据资产 (Available Assets)</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {MOCK_ASSETS_LIST.map(asset => {
              const isSelected = selectedAssets.includes(asset.id);
              return (
                <div 
                  key={asset.id} 
                  onClick={() => onToggle(asset.id)}
                  className={`p-3 border rounded-lg flex justify-between items-center cursor-pointer group transition-all active:scale-[0.98]
                    ${isSelected 
                        ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500' 
                        : 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-600'}`}>
                        <Database size={16} />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>{asset.name}</div>
                      <div className="text-xs text-gray-500">{asset.owner} • {asset.rows} rows</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                     ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300 group-hover:border-blue-400'}
                  `}>
                      {isSelected && <CheckCircle size={14} className="text-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">已选参与方 (Selected Participants)</h3>
          {selectedDetails.length === 0 ? (
              <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
                <Database size={32} className="mb-2 opacity-50" />
                <p>请从左侧选择 Host 和 Guest 数据集</p>
                <p className="mt-2 text-xs opacity-50">至少需要 1 个 Host 和 1 个 Guest</p>
              </div>
          ) : (
              <div className="space-y-2 flex-1 overflow-y-auto">
                  {selectedDetails.map(asset => (
                      <div key={asset.id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center animate-fade-in">
                          <div>
                              <div className="text-sm font-bold text-gray-800">{asset.name}</div>
                              <div className="text-xs text-gray-500">{asset.type} Node • {asset.owner}</div>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); onToggle(asset.id); }} className="text-gray-400 hover:text-gray-700 p-1 hover:bg-gray-200 rounded-full">
                              <X size={16} />
                          </button>
                      </div>
                  ))}
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center gap-2 text-xs text-emerald-600">
                      <CheckCircle size={14} />
                      <span>数据可用性校验通过</span>
                  </div>
              </div>
          )}
        </div>
      </div>
  );
}

const NodeConfigStep = () => (
  <div className="h-full flex flex-col items-center justify-center relative">
    {/* Topology Viz */}
    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
    <div className="relative z-10 flex items-center gap-16">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 rounded-xl bg-white border-2 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-100">
           <Database size={32} className="text-blue-600" />
        </div>
        <div className="mt-3 text-sm font-bold text-gray-800">Bank A (Host)</div>
        <div className="text-xs text-gray-500">Features: 24</div>
      </div>
      
      <div className="flex-1 h-px bg-gray-300 w-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded border border-gray-200 text-[10px] text-gray-500 whitespace-nowrap shadow-sm">
           RSA-PSI Encryption
        </div>
      </div>

      <div className="flex flex-col items-center animate-fade-in" style={{animationDelay: '0.2s'}}>
         <div className="w-16 h-16 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm">
            <Cpu size={24} className="text-gray-600" />
         </div>
         <div className="mt-3 text-sm font-bold text-gray-600">TTP Server</div>
      </div>

      <div className="flex-1 h-px bg-gray-300 w-32"></div>

      <div className="flex flex-col items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
        <div className="w-20 h-20 rounded-xl bg-white border-2 border-amber-500 flex items-center justify-center shadow-lg shadow-amber-100">
           <Database size={32} className="text-amber-500" />
        </div>
        <div className="mt-3 text-sm font-bold text-gray-800">FinTech B (Guest)</div>
        <div className="text-xs text-gray-500">Labels: Y</div>
      </div>
    </div>
    <div className="mt-12 p-4 bg-white/80 backdrop-blur rounded-lg border border-gray-200 max-w-lg w-full shadow-sm">
       <h4 className="text-sm font-bold text-gray-800 mb-2">连接性检查 (Connectivity Check)</h4>
       <div className="space-y-2">
         <div className="flex justify-between text-xs text-gray-600">
            <span>Latency (A ↔ B)</span>
            <span className="text-emerald-600 font-medium">45ms (Good)</span>
         </div>
         <div className="flex justify-between text-xs text-gray-600">
            <span>Bandwidth</span>
            <span className="text-blue-600 font-medium">1.2 GB/s</span>
         </div>
       </div>
    </div>
  </div>
);

const ModelConfigStep = () => (
  <div className="grid grid-cols-12 gap-6 h-full">
     {/* Algorithm Selection */}
     <div className="col-span-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">算法选择 (Algorithm)</h3>
        <div className="space-y-3">
           {['SecureBoost (XGB)', 'Vertical LR', 'Fed-DNN', 'Random Forest'].map((algo, i) => (
             <div key={i} className={`p-3 rounded-lg border cursor-pointer transition-all ${i === 0 ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                <div className="flex justify-between items-center">
                   <span className={`text-sm font-medium ${i===0 ? 'text-blue-700' : 'text-gray-700'}`}>{algo}</span>
                   {i === 0 && <CheckCircle size={14} className="text-blue-600" />}
                </div>
             </div>
           ))}
        </div>
     </div>
     
     {/* Params Form */}
     <div className="col-span-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-6">超参数配置 (Hyperparameters)</h3>
        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-4">
              <div>
                 <label className="text-xs text-gray-500 block mb-1.5">Learning Rate</label>
                 <input type="text" defaultValue="0.1" className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-sm text-gray-900 focus:border-blue-500 outline-none" />
              </div>
              <div>
                 <label className="text-xs text-gray-500 block mb-1.5">Max Depth</label>
                 <input type="range" className="w-full accent-blue-600" min="3" max="10" defaultValue="6" />
                 <div className="flex justify-between text-[10px] text-gray-400"><span>3</span><span>10</span></div>
              </div>
           </div>
           <div className="space-y-4">
              <div>
                 <label className="text-xs text-gray-500 block mb-1.5">Privacy Budget (ε)</label>
                 <div className="flex items-center gap-2">
                    <input type="text" defaultValue="1.0" className="flex-1 bg-gray-50 border border-gray-300 rounded p-2 text-sm text-gray-900 focus:border-blue-500 outline-none" />
                    <Lock size={16} className="text-amber-500" />
                 </div>
              </div>
              <div>
                 <label className="text-xs text-gray-500 block mb-1.5">Batch Size</label>
                 <select className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-sm text-gray-900 focus:border-blue-500 outline-none">
                    <option>128</option>
                    <option>256</option>
                    <option>512</option>
                 </select>
              </div>
           </div>
        </div>
     </div>
  </div>
);

const TrainingStep = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEpoch(p => (p < 50 ? p + 1 : p));
      setLogs(prev => [`[INFO] Epoch ${prev.length + 1} completed. Loss: ${(Math.random()*0.5).toFixed(4)}`, ...prev].slice(0, 6));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const data = Array.from({length: epoch}, (_, i) => ({ name: i, value: Math.exp(-0.1*i) + Math.random() * 0.1 }));

  return (
    <div className="h-full flex flex-col gap-4">
       {/* Charts */}
       <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 flex gap-4 shadow-sm">
          <div className="flex-1">
             <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Training Loss</h4>
             <ResponsiveContainer width="100%" height="90%">
               <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorLoss)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
          <div className="w-64 border-l border-gray-100 pl-4 space-y-4">
             <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">Current Epoch</div>
                <div className="text-2xl font-mono text-gray-900">{epoch}/50</div>
             </div>
             <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">AUC Score</div>
                <div className="text-2xl font-mono text-emerald-600">0.892</div>
             </div>
          </div>
       </div>
       
       {/* Logs */}
       <div className="h-32 bg-gray-900 border border-gray-800 rounded-xl p-3 font-mono text-xs overflow-hidden">
          {logs.map((log, i) => (
            <div key={i} className="text-gray-400 mb-1">{log}</div>
          ))}
       </div>
    </div>
  );
};

interface ReportStepProps {
    onShowAudit: () => void;
    onDeliver: () => void;
}

const ReportStep: React.FC<ReportStepProps> = ({ onShowAudit, onDeliver }) => (
   <div className="h-full flex gap-6">
      {/* Report Preview */}
      <div className="flex-1 bg-white text-gray-900 p-8 rounded shadow-sm border border-gray-200 overflow-y-auto relative">
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-[-30deg]">
            <span className="text-6xl font-black text-gray-300">PRIVACY SHIELD</span>
         </div>
         <h1 className="text-2xl font-bold mb-2 text-gray-800">联合风控建模报告</h1>
         <div className="text-sm text-gray-500 mb-8">Task ID: #8821 | Date: 2026-01-15</div>
         
         <div className="space-y-6">
            <section>
               <h2 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2 text-gray-800">1. 任务概览</h2>
               <p className="text-sm leading-relaxed text-gray-600">本次任务由 Bank A (Host) 与 FinTech B (Guest) 共同发起，旨在构建基于纵向联邦学习的信贷风控模型。</p>
            </section>
            <section>
               <h2 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2 text-gray-800">2. 模型性能</h2>
               <div className="grid grid-cols-3 gap-4 text-center py-4 bg-gray-50 rounded border border-gray-100">
                  <div>
                     <div className="text-xs text-gray-500">KS Value</div>
                     <div className="text-xl font-bold text-gray-800">0.45</div>
                  </div>
                  <div>
                     <div className="text-xs text-gray-500">AUC</div>
                     <div className="text-xl font-bold text-gray-800">0.89</div>
                  </div>
                  <div>
                     <div className="text-xs text-gray-500">Lift</div>
                     <div className="text-xl font-bold text-gray-800">3.2x</div>
                  </div>
               </div>
            </section>
            <section>
               <h2 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2 text-gray-800">3. 隐私合规声明</h2>
               <p className="text-sm leading-relaxed text-gray-600">本报告及模型产出已通过差分隐私 (epsilon=1.0) 保护，所有中间参数均经过加密传输。</p>
            </section>
         </div>
      </div>

      {/* Action Panel */}
      <div className="w-72 flex flex-col gap-4">
         <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <Fingerprint size={16} className="text-blue-600" /> 数字水印
            </h3>
            <div className="flex items-center justify-between mb-2">
               <span className="text-sm text-gray-600">嵌入水印</span>
               <div className="w-8 h-4 bg-blue-600 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div></div>
            </div>
            <p className="text-xs text-gray-500">水印包含：任务ID、操作人、时间戳</p>
         </div>

         <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <ShieldCheck size={16} className="text-emerald-600" /> 审计存证
            </h3>
            <button 
                onClick={onShowAudit}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm text-gray-700 mb-2 transition-all active:scale-95 shadow-sm"
            >
               查看审计日志
            </button>
            <button 
                onClick={onDeliver}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white font-medium shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
               确认交付 & 存证
            </button>
         </div>
      </div>
   </div>
);


export const FederatedLearning: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleAsset = (id: string) => {
      setSelectedAssets(prev => 
          prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 animate-fade-in relative">
      {/* Wizard Header */}
      <div className="h-20 border-b border-gray-200 bg-white/80 backdrop-blur px-6 flex items-center justify-between shrink-0 z-10">
         <div>
            <h1 className="text-lg font-bold text-gray-800">联合风控建模 (Joint Risk Control Modeling)</h1>
            <p className="text-xs text-gray-500">Task #8821 • Bank A + FinTech B</p>
         </div>
         
         {/* Stepper */}
         <div className="flex items-center gap-2">
            {STEPS.map((step, idx) => (
               <React.Fragment key={step.id}>
                  <div 
                     onClick={() => setCurrentStep(step.id)}
                     className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer
                        ${currentStep === step.id ? 'bg-blue-50 border-blue-200 text-blue-700' : 
                          currentStep > step.id ? 'bg-gray-100 border-gray-200 text-gray-500' : 'border-transparent text-gray-400'}
                     `}
                  >
                     <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                        ${currentStep === step.id ? 'bg-blue-600 text-white' : 
                          currentStep > step.id ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'}
                     `}>
                        {currentStep > step.id ? <CheckCircle size={12} /> : step.id}
                     </div>
                     <span className="text-xs font-medium hidden md:block">{step.label}</span>
                  </div>
                  {idx < STEPS.length - 1 && <div className="w-4 h-0.5 bg-gray-200"></div>}
               </React.Fragment>
            ))}
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 min-h-0 overflow-hidden relative">
         {currentStep === 1 && <DataSelectionStep selectedAssets={selectedAssets} onToggle={toggleAsset} />}
         {currentStep === 2 && <NodeConfigStep />}
         {currentStep === 3 && <ModelConfigStep />}
         {currentStep === 4 && <TrainingStep />}
         {currentStep === 5 && <ReportStep onShowAudit={() => setShowAuditModal(true)} onDeliver={() => setShowSuccessModal(true)} />}
      </div>

      {/* Footer Navigation */}
      <div className="h-16 border-t border-gray-200 bg-white px-6 flex items-center justify-between shrink-0">
         <button 
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(c => c - 1)}
            className="px-4 py-2 rounded text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
         >
            Back (上一步)
         </button>
         <button 
            onClick={() => setCurrentStep(c => Math.min(c + 1, 5))}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium shadow-lg shadow-blue-500/20 transition-colors"
         >
            {currentStep === 5 ? 'Finish (完成)' : 'Next (下一步)'} <ChevronRight size={16} />
         </button>
      </div>

      {/* --- Audit Logs Modal --- */}
      {showAuditModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-8 animate-fade-in">
              <div className="bg-white border border-gray-200 rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                          <FileText size={18} className="text-blue-600" /> 审计日志 (Audit Logs) - Task #8821
                      </h3>
                      <button onClick={() => setShowAuditModal(false)} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                      {MOCK_AUDIT_LOGS.map(log => (
                          <div key={log.id} className="p-3 bg-gray-50 rounded border border-gray-200 flex justify-between items-center">
                              <div className="flex gap-4">
                                  <div className="text-xs font-mono text-gray-500">{log.timestamp}</div>
                                  <div className="text-sm text-gray-700">{log.action}</div>
                              </div>
                              <div className="flex gap-4 items-center">
                                  <span className="text-xs text-gray-500">{log.user}</span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${log.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>{log.status}</span>
                              </div>
                          </div>
                      ))}
                      <div className="p-2 text-center text-xs text-gray-500 mt-4 border-t border-gray-100 pt-4">
                          所有记录已通过区块链哈希验证 (Block Height: #12,492)
                      </div>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                      <button onClick={() => setShowAuditModal(false)} className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-sm">关闭</button>
                  </div>
              </div>
          </div>
      )}

      {/* --- Success Delivery Modal --- */}
      {showSuccessModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-scale-in">
              <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-sm text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-emerald-100">
                      <CheckCircle size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">交付成功！</h2>
                  <p className="text-gray-500 text-sm mb-6">模型文件已加密打包，审计报告已上链存证。任务 #8821 已标记为完成。</p>
                  <button onClick={() => setShowSuccessModal(false)} className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">返回仪表盘</button>
              </div>
          </div>
      )}
    </div>
  );
};