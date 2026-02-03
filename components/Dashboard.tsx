import React, { useContext } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { ShieldCheck, Activity, Database, Lock, AlertTriangle, Network, Server, Globe, Zap, ArrowUpRight, ArrowDownRight, Layers, Cpu } from 'lucide-react';
import { MetricCardProps, PageRoute } from '../types';
import { GlobalContext } from '../App';

// --- Enterprise Grade Topology Visualization ---
const SystemTopology = () => {
  // Coordinates for nodes (in percentages)
  const POS = {
    CENTER: { x: 50, y: 50 },
    BANK:   { x: 82, y: 20 }, // Top Right (Active)
    ECOMM:  { x: 82, y: 80 }, // Bottom Right (Active)
    GOV:    { x: 18, y: 80 }, // Bottom Left (Idle)
    TELCO:  { x: 18, y: 20 }, // Top Left (Idle)
  };

  return (
    <div className="relative w-full h-full bg-slate-50/50 rounded-xl overflow-hidden flex items-center justify-center min-h-[360px] border border-gray-100">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
      }}></div>

      {/* --- Layer 1: SVG Connections & Data Flow --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
          </marker>
          {/* Gradients */}
          <linearGradient id="gradActive" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* 1. Static Links (Background) */}
        <line x1={`${POS.CENTER.x}%`} y1={`${POS.CENTER.y}%`} x2={`${POS.GOV.x}%`} y2={`${POS.GOV.y}%`} stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5" />
        <line x1={`${POS.CENTER.x}%`} y1={`${POS.CENTER.y}%`} x2={`${POS.TELCO.x}%`} y2={`${POS.TELCO.y}%`} stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5" />

        {/* 2. Active Links (Bank & E-Comm) */}
        {/* Center <-> Bank */}
        <line x1={`${POS.CENTER.x}%`} y1={`${POS.CENTER.y}%`} x2={`${POS.BANK.x}%`} y2={`${POS.BANK.y}%`} stroke="#bfdbfe" strokeWidth="3" />
        {/* Center <-> E-Comm */}
        <line x1={`${POS.CENTER.x}%`} y1={`${POS.CENTER.y}%`} x2={`${POS.ECOMM.x}%`} y2={`${POS.ECOMM.y}%`} stroke="#fde68a" strokeWidth="3" />

        {/* 3. Data Flow Animations (Moving Dots) */}
        {/* Flow: Bank -> Center (Upload Gradients) */}
        <circle r="4" fill="#3b82f6">
           <animateMotion 
             dur="2s" 
             repeatCount="indefinite" 
             path={`M ${POS.BANK.x*10} ${POS.BANK.y*5.5} L ${POS.CENTER.x*10} ${POS.CENTER.y*5.5}`} // Approximation for responsiveness, usually better with JS calculation but this works for fixed aspect
             calcMode="linear"
             keyPoints="0;1"
             keyTimes="0;1"
           />
           {/* Fallback simple animation for React SVG compatibility issues if path is complex */}
           <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Flow: Center -> Bank (Global Model) */}
        <circle r="3" fill="#60a5fa" opacity="0.6">
           <animateMotion 
             dur="2s" 
             begin="1s"
             repeatCount="indefinite" 
             path={`M ${POS.CENTER.x*10} ${POS.CENTER.y*5.5} L ${POS.BANK.x*10} ${POS.BANK.y*5.5}`} 
           />
        </circle>

        {/* Flow: E-Comm -> Center */}
        <circle r="4" fill="#d97706">
           <animateMotion 
             dur="2.5s" 
             repeatCount="indefinite" 
             path={`M ${POS.ECOMM.x*10} ${POS.ECOMM.y*5.5} L ${POS.CENTER.x*10} ${POS.CENTER.y*5.5}`} 
           />
        </circle>
      </svg>
      
      {/* Note: SVG Paths above are simplified. For perfect responsive lines, we use CSS absolute positioning for the dots below instead. */}
      
      {/* --- Alternative CSS-based Data Particles (More reliable for responsive divs) --- */}
      {/* Packet: Bank to Center */}
      <div className="absolute z-0 w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-ping-move-bank" style={{ top: '35%', left: '66%', animationDuration: '3s' }}></div>
      {/* Packet: Center to Bank */}
      <div className="absolute z-0 w-2 h-2 rounded-full bg-blue-400 opacity-50 animate-ping-move-bank-reverse" style={{ top: '35%', left: '66%', animationDuration: '3s', animationDelay: '1.5s' }}></div>
      
      {/* Packet: Ecomm to Center */}
      <div className="absolute z-0 w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-ping-move-ecomm" style={{ top: '65%', left: '66%', animationDuration: '2.5s' }}></div>


      {/* --- Layer 2: Nodes --- */}

      {/* 1. Center Hub (TTP) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-100/50 rounded-full animate-pulse"></div>
          <div className="w-20 h-20 rounded-xl bg-white border-2 border-blue-600 flex items-center justify-center shadow-2xl shadow-blue-200 z-10 relative">
            <Cpu size={32} className="text-blue-700" />
            <div className="absolute -top-2 -right-2 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
            </div>
          </div>
        </div>
        <div className="mt-3 px-3 py-1 bg-white/90 backdrop-blur border border-blue-200 rounded-full shadow-sm text-center">
          <div className="text-xs font-bold text-gray-800">TTP 聚合枢纽</div>
          <div className="text-[10px] text-gray-500">Aggregator</div>
        </div>
      </div>

      {/* 2. Bank Node (Active Host) */}
      <div className="absolute top-[20%] left-[82%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer">
        <div className="relative">
           {/* Active Ring */}
           <div className="absolute -inset-6 border-2 border-dashed border-blue-300 rounded-full animate-[spin_10s_linear_infinite]"></div>
           <div className="w-16 h-16 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-xl shadow-blue-100 transition-transform group-hover:scale-110">
             <Server size={24} className="text-blue-600" />
           </div>
           <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white font-bold shadow-sm">HOST</div>
        </div>
        <div className="mt-3 text-center">
           <div className="text-sm font-bold text-gray-800">银行节点 (Bank)</div>
           <div className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1 justify-center">
             <Activity size={8} className="animate-spin" /> Training
           </div>
        </div>
      </div>

      {/* 3. E-Commerce Node (Active Guest) */}
      <div className="absolute top-[80%] left-[82%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer">
        <div className="relative">
           {/* Active Ring */}
           <div className="absolute -inset-6 border-2 border-dashed border-amber-300 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
           <div className="w-16 h-16 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center shadow-xl shadow-amber-100 transition-transform group-hover:scale-110">
             <Database size={24} className="text-amber-600" />
           </div>
           <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white font-bold shadow-sm">GUEST</div>
        </div>
        <div className="mt-3 text-center">
           <div className="text-sm font-bold text-gray-800">金融科技节点 (FinTech)</div>
           <div className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 flex items-center gap-1 justify-center">
             <Zap size={8} /> Syncing
           </div>
        </div>
      </div>

      {/* 4. Gov Node (Idle) */}
      <div className="absolute top-[80%] left-[18%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-300 flex items-center justify-center shadow-sm">
             <Globe size={20} className="text-gray-400" />
        </div>
        <div className="mt-2 text-xs font-medium text-gray-500">政务节点</div>
        <div className="text-[10px] text-gray-400">Idle</div>
      </div>

      {/* 5. Telco Node (Idle) */}
      <div className="absolute top-[20%] left-[18%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-300 flex items-center justify-center shadow-sm">
             <Network size={20} className="text-gray-400" />
        </div>
        <div className="mt-2 text-xs font-medium text-gray-500">运营商</div>
        <div className="text-[10px] text-gray-400">Idle</div>
      </div>

    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { tasks, auditLogs } = useContext(GlobalContext);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Middle Section */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left: System Topology & Status (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Topology Map */}
          <div className="bg-white border border-gray-200 rounded-xl p-1 relative flex flex-col min-h-[400px] shadow-sm">
             <div className="absolute top-4 left-4 z-20 pointer-events-none">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 <Network size={18} className="text-blue-600" />
                 多维一体融合架构 (Integrated Architecture)
               </h3>
               <p className="text-xs text-gray-500 mt-1">联邦学习 + MPC + 差分隐私 协同工作态势</p>
             </div>
             <div className="absolute top-4 right-4 z-20 flex gap-2">
                <div className="flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    联邦网络正常
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Latency: 24ms</span>
                </div>
             </div>
             <SystemTopology />
          </div>

          {/* Bottom: Task Monitoring Table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col shadow-sm">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 <Activity size={18} className="text-purple-600" />
                 实时任务监控 (Real-time Task Monitor)
               </h3>
             </div>
             <div className="overflow-auto max-h-[300px]">
               <table className="w-full text-left border-collapse">
                 <thead className="sticky top-0 z-10">
                   <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50">
                     <th className="py-2 pl-3 font-medium">任务 ID</th>
                     <th className="py-2 font-medium">业务场景</th>
                     <th className="py-2 font-medium">技术引擎</th>
                     <th className="py-2 font-medium">节点</th>
                     <th className="py-2 font-medium">进度</th>
                     <th className="py-2 font-medium">状态</th>
                     <th className="py-2 text-right pr-3 font-medium">操作</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {tasks.map(task => (
                     <tr key={task.id} className="border-b border-gray-50 hover:bg-gray-50 group cursor-pointer transition-colors animate-slide-up" onClick={() => { /* Navigate logic here if context available */ }}>
                       <td className="py-3 pl-3 font-mono text-gray-600">{task.id}</td>
                       <td className="py-3 text-gray-800 font-medium">{task.name}</td>
                       <td className="py-3 text-gray-500 text-xs">
                          <span className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">{task.type}</span>
                       </td>
                       <td className="py-3 text-gray-600">{task.nodes}</td>
                       <td className="py-3 w-32">
                         <div className="flex items-center gap-2">
                           <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{width: `${task.progress}%`}}></div>
                           </div>
                           <span className="text-xs text-gray-500 w-8">{task.progress}%</span>
                         </div>
                       </td>
                       <td className="py-3">
                         <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                           task.status === 'Running' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                           task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                           task.status === 'Waiting' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                           'bg-gray-100 text-gray-500 border-gray-200'
                         }`}>
                           {task.status}
                         </span>
                       </td>
                       <td className="py-3 text-right pr-3">
                         <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                           详情
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* Right: Real-time Audit & Status (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
           
           {/* Privacy Budget Status */}
           <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col h-[300px] shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lock size={18} className="text-amber-500" />
                隐私预算消耗 (Privacy Budget)
              </h3>
              <div className="flex-1 flex items-center justify-center relative min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{name:'Used', value: 24}, {name:'Remaining', value: 76}]}
                        cx="50%" cy="50%" innerRadius={60} outerRadius={80}
                        startAngle={180} endAngle={0}
                        dataKey="value" stroke="none"
                        paddingAngle={5}
                      >
                        <Cell fill="#f59e0b" /> {/* Amber */}
                        <Cell fill="#e2e8f0" /> {/* Slate 200 */}
                      </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute bottom-6 left-0 right-0 text-center">
                    <div className="text-3xl font-bold text-gray-800">76%</div>
                    <div className="text-xs text-gray-500 uppercase font-medium">剩余预算 (Safe)</div>
                 </div>
              </div>
           </div>

           {/* Real-time Audit Feed */}
           <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col flex-1 min-h-[400px] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-gray-800 flex items-center gap-2">
                   <ShieldCheck size={18} className="text-emerald-600" />
                   全链路可信审计 (Live Audit)
                 </h3>
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar flex flex-col-reverse">
                 {/* Note: Rendering in reverse order to have latest at top visually if we were using column-reverse, but standard is top-down. 
                     We actually just map the logs. The Context adds new ones to the FRONT of the array. */}
                 {auditLogs.map((log) => (
                   <div key={log.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-all animate-fade-in">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                        log.type === 'warn' ? 'bg-amber-500' : 
                        log.type === 'error' ? 'bg-rose-500' :
                        log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <div className="text-xs text-gray-400 font-mono mb-0.5">{log.timestamp}</div>
                        <div className="text-sm text-gray-700 leading-snug">{log.action}</div>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="text-center pt-2 mt-auto border-t border-gray-100">
                 <span className="text-xs text-gray-400 animate-pulse">正在同步区块链存证...</span>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};