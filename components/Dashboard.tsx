import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { ShieldCheck, Activity, Database, Lock, AlertTriangle, Network, Server, Globe, Zap, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { MetricCardProps, PageRoute } from '../types';

// --- Mock Data ---
const activeTasks = [
  { id: 'T-2026-8821', name: '联合风控建模 (Joint Risk Control)', type: '联邦学习', status: 'Running', progress: 45, nodes: 3, route: PageRoute.FEDERATED_LEARNING },
  { id: 'T-2026-1030', name: '黑名单隐私查询 (Blacklist PIR)', type: 'PIR', status: 'Completed', progress: 100, nodes: 2, route: PageRoute.PIR },
  { id: 'T-MPC-92', name: '联合营销分析 (Joint Marketing)', type: 'MPC', status: 'Waiting', progress: 0, nodes: 4, route: PageRoute.MPC },
];

const auditStream = [
  { id: 1, time: '2026-01-15 10:24', msg: '节点 A 发起 [User_Credit] 联合建模请求', type: 'info' },
  { id: 2, time: '2026-01-15 10:24', msg: '任务 #8821 触发数字水印嵌入操作', type: 'success' },
  { id: 3, time: '2026-01-15 10:23', msg: '检测到非授权访问尝试，已自动拦截', type: 'warn' },
  { id: 4, time: '2026-01-15 10:22', msg: '隐私预算剩余量低于 20%，请注意', type: 'warn' },
];

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-slate-800/40 backdrop-blur border border-slate-700/60 p-5 rounded-xl flex items-start justify-between hover:bg-slate-800/60 transition-all hover:border-blue-500/50 group cursor-default">
    <div>
      <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">{title}</h3>
      <div className="text-2xl font-bold text-white mb-2 font-mono tracking-tight">{value}</div>
      <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-emerald-400' : 'text-slate-400'}`}>
        <span>{trend === 'down' ? '-' : '+'}{Math.abs(change)}%</span>
        <span className="ml-1 text-slate-500 font-normal">性能提升</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 ${color} group-hover:scale-110 transition-transform duration-300`}>
      <Icon size={20} />
    </div>
  </div>
);

// --- Topology Visualization Component (Adjusted Layout) ---
const SystemTopology = () => (
  <div className="relative w-full h-full bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950/50 to-slate-950/80"></div>
    <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
    
    {/* Center Hub - Shifted Left and Up slightly to make room */}
    <div className="absolute top-[40%] left-[45%] z-10 flex flex-col items-center animate-pulse-slow">
      <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 bg-blue-900/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <Server size={32} className="text-blue-400" />
      </div>
      <div className="mt-2 text-sm font-bold text-blue-100 bg-slate-900/80 px-2 py-0.5 rounded border border-blue-900 whitespace-nowrap">核心计算枢纽</div>
    </div>

    {/* Satellite Nodes - Positioned absolute to ensure no overlap */}
    
    {/* Node 1: Top Right */}
    <div className="absolute top-[15%] right-[20%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute top-[100%] right-[100%] w-32 h-0.5 bg-gradient-to-l from-slate-700 to-blue-500/50 origin-right rotate-45 transform translate-y-[-20px] translate-x-[20px] -z-10 opacity-50"></div>
        <div className="w-14 h-14 rounded-full border border-slate-600 bg-slate-800 flex items-center justify-center shadow-lg group-hover:border-emerald-500 transition-colors">
            <Globe size={20} className="text-emerald-400" />
        </div>
        <div className="mt-2 text-xs text-slate-400 bg-slate-900/90 px-2 rounded border border-slate-800">银行节点</div>
    </div>

    {/* Node 2: Bottom Right (Far) */}
    <div className="absolute bottom-[20%] right-[15%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute bottom-[100%] right-[100%] w-40 h-0.5 bg-gradient-to-l from-slate-700 to-blue-500/50 origin-right -rotate-12 transform translate-y-[20px] translate-x-[20px] -z-10 opacity-50"></div>
        <div className="w-14 h-14 rounded-full border border-amber-500 bg-slate-800 flex items-center justify-center shadow-lg transition-colors">
            <Globe size={20} className="text-amber-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
        </div>
        <div className="mt-2 text-xs text-slate-400 bg-slate-900/90 px-2 rounded border border-slate-800">电商节点</div>
    </div>

    {/* Node 3: Bottom Left */}
    <div className="absolute bottom-[15%] left-[25%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute bottom-[100%] left-[100%] w-32 h-0.5 bg-gradient-to-r from-slate-700 to-blue-500/50 origin-left rotate-[-45] transform translate-y-[20px] translate-x-[-20px] -z-10 opacity-50"></div>
        <div className="w-14 h-14 rounded-full border border-slate-600 bg-slate-800 flex items-center justify-center shadow-lg group-hover:border-purple-500 transition-colors">
             <Globe size={20} className="text-purple-400" />
        </div>
        <div className="mt-2 text-xs text-slate-400 bg-slate-900/90 px-2 rounded border border-slate-800">政务节点</div>
    </div>
    
    {/* Node 4: Top Left (Far) */}
    <div className="absolute top-[25%] left-[15%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute top-[100%] left-[100%] w-36 h-0.5 bg-gradient-to-r from-slate-700 to-blue-500/50 origin-left rotate-[15] transform translate-y-[-20px] translate-x-[-20px] -z-10 opacity-50"></div>
        <div className="w-14 h-14 rounded-full border border-slate-600 bg-slate-800 flex items-center justify-center shadow-lg group-hover:border-blue-500 transition-colors">
             <Globe size={20} className="text-blue-400" />
        </div>
        <div className="mt-2 text-xs text-slate-400 bg-slate-900/90 px-2 rounded border border-slate-800">运营商</div>
    </div>

  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 flex flex-col gap-6 animate-fade-in">
      
      {/* 1. Top Metrics Cards (Aligned with PPT Value Props) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <MetricCard title="安全性提升 (Security)" value="High" change={40} trend="up" icon={ShieldCheck} color="text-emerald-400" />
        <MetricCard title="计算效率提升 (Efficiency)" value="Fast" change={50} trend="up" icon={Zap} color="text-blue-400" />
        <MetricCard title="使用门槛降低 (Threshold)" value="Low" change={-70} trend="down" icon={Layers} color="text-purple-400" />
        <MetricCard title="合规审计通过率 (Audit)" value="100%" change={0} trend="neutral" icon={Database} color="text-amber-400" />
      </div>

      {/* 2. Middle Section */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left: System Topology & Status (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Topology Map */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-1 relative flex flex-col min-h-[400px]">
             <div className="absolute top-4 left-4 z-20 pointer-events-none">
               <h3 className="font-bold text-white flex items-center gap-2">
                 <Network size={18} className="text-blue-400" />
                 多维一体融合架构 (Integrated Architecture)
               </h3>
               <p className="text-xs text-slate-400 mt-1">联邦学习 + MPC + 差分隐私 协同工作态势</p>
             </div>
             <div className="absolute top-4 right-4 z-20 flex gap-2">
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/50">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                   网络正常
                </span>
             </div>
             <SystemTopology />
          </div>

          {/* Bottom: Task Monitoring Table */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-white flex items-center gap-2">
                 <Activity size={18} className="text-purple-400" />
                 场景驱动任务监控 (Task Monitor)
               </h3>
             </div>
             <div className="overflow-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="text-xs text-slate-500 border-b border-slate-700/50">
                     <th className="pb-2 pl-2">任务 ID</th>
                     <th className="pb-2">业务场景</th>
                     <th className="pb-2">技术引擎</th>
                     <th className="pb-2">参与方</th>
                     <th className="pb-2">进度</th>
                     <th className="pb-2">状态</th>
                     <th className="pb-2 text-right">操作</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {activeTasks.map(task => (
                     <tr key={task.id} className="border-b border-slate-800/50 hover:bg-slate-700/20 group cursor-pointer" onClick={() => { /* Navigate logic here if context available */ }}>
                       <td className="py-3 pl-2 font-mono text-slate-400">{task.id}</td>
                       <td className="py-3 text-slate-200 font-medium">{task.name}</td>
                       <td className="py-3 text-slate-400 text-xs">
                          <span className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded">{task.type}</span>
                       </td>
                       <td className="py-3 text-slate-400">{task.nodes}</td>
                       <td className="py-3 w-32">
                         <div className="flex items-center gap-2">
                           <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 rounded-full" style={{width: `${task.progress}%`}}></div>
                           </div>
                           <span className="text-xs text-slate-500 w-8">{task.progress}%</span>
                         </div>
                       </td>
                       <td className="py-3">
                         <span className={`text-xs px-2 py-0.5 rounded-full border ${
                           task.status === 'Running' ? 'bg-blue-950/30 text-blue-400 border-blue-900' :
                           task.status === 'Completed' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900' :
                           'bg-slate-800 text-slate-400 border-slate-700'
                         }`}>
                           {task.status}
                         </span>
                       </td>
                       <td className="py-3 text-right pr-2">
                         <button className="text-xs text-blue-400 hover:text-white border border-blue-500/30 px-2 py-1 rounded hover:bg-blue-600 transition-colors">
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
           <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col h-[300px]">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Lock size={18} className="text-amber-400" />
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
                        <Cell fill="#334155" /> {/* Slate 700 */}
                      </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute bottom-6 left-0 right-0 text-center">
                    <div className="text-3xl font-bold text-white">76%</div>
                    <div className="text-xs text-slate-500 uppercase">剩余预算 (Safe)</div>
                 </div>
              </div>
           </div>

           {/* Real-time Audit Feed */}
           <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col flex-1 min-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-white flex items-center gap-2">
                   <ShieldCheck size={18} className="text-emerald-400" />
                   全链路可信审计 (Trusted Audit)
                 </h3>
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                 {auditStream.map((log) => (
                   <div key={log.id} className="flex gap-3 items-start p-3 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                        log.type === 'warn' ? 'bg-amber-500' : 
                        log.type === 'error' ? 'bg-rose-500' :
                        log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <div className="text-xs text-slate-500 font-mono mb-0.5">{log.time}</div>
                        <div className="text-sm text-slate-300 leading-snug">{log.msg}</div>
                      </div>
                   </div>
                 ))}
                 <div className="text-center pt-2">
                    <span className="text-xs text-slate-600 animate-pulse">正在同步区块链存证...</span>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};