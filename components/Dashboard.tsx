import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { ShieldCheck, Activity, Database, Lock, AlertTriangle, Cpu, Network, Server, Globe, BellRing, MoreHorizontal } from 'lucide-react';
import { MetricCardProps } from '../types';

// --- Mock Data ---
const activeTasks = [
  { id: 'T-1029', name: '联合风控建模 V2', type: '联邦学习', status: 'Running', progress: 45, nodes: 3 },
  { id: 'T-1030', name: '黑名单隐私查询', type: 'PIR', status: 'Completed', progress: 100, nodes: 2 },
  { id: 'T-1031', name: '营销数据统计', type: 'MPC', status: 'Waiting', progress: 0, nodes: 4 },
  { id: 'T-1032', name: '多方联合画像', type: 'FL', status: 'Running', progress: 12, nodes: 5 },
  { id: 'T-1033', name: '反洗钱网络分析', type: 'MPC', status: 'Running', progress: 67, nodes: 3 },
];

const auditStream = [
  { id: 1, time: '10:24:12', msg: '节点 A 请求访问敏感数据表 [User_Credit]', type: 'warn' },
  { id: 2, time: '10:24:05', msg: '任务 #8821 完成 PSI 隐私求交', type: 'info' },
  { id: 3, time: '10:23:45', msg: '节点 C 离线，触发自动重连机制', type: 'error' },
  { id: 4, time: '10:22:10', msg: '管理员更新了隐私预算策略', type: 'info' },
  { id: 5, time: '10:20:00', msg: '检测到异常流量访问，已自动拦截', type: 'success' },
];

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-slate-800/40 backdrop-blur border border-slate-700/60 p-5 rounded-xl flex items-start justify-between hover:bg-slate-800/60 transition-all hover:border-slate-600 group hover:shadow-lg hover:shadow-black/20">
    <div>
      <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">{title}</h3>
      <div className="text-2xl font-bold text-white mb-2 font-mono tracking-tight">{value}</div>
      <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-400'}`}>
        <span>{change > 0 ? '+' : ''}{change}%</span>
        <span className="ml-1 text-slate-500 font-normal">较昨日</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 ${color} group-hover:scale-110 transition-transform duration-300`}>
      <Icon size={20} />
    </div>
  </div>
);

// --- Topology Visualization Component (Mock) ---
const SystemTopology = () => (
  <div className="relative w-full h-full bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950/50 to-slate-950/80"></div>
    <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
    
    {/* Center Hub */}
    <div className="relative z-10 flex flex-col items-center animate-pulse-slow">
      <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 bg-blue-900/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <Server size={32} className="text-blue-400" />
      </div>
      <div className="mt-2 text-sm font-bold text-blue-100 bg-slate-900/80 px-2 py-0.5 rounded border border-blue-900">核心计算枢纽</div>
    </div>

    {/* Satellite Nodes */}
    {[0, 1, 2, 3].map((i) => {
      const angle = (i * 90 + 45) * (Math.PI / 180);
      const r = 140;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      return (
        <React.Fragment key={i}>
          {/* Connection Line */}
          <div className="absolute left-1/2 top-1/2 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent origin-left w-[140px] z-0"
               style={{ transform: `translate(-50%, -50%) rotate(${i * 90 + 45}deg) translate(50%, 0)` }}
          ></div>
          {/* Node */}
          <div className="absolute z-10 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer group"
               style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
             <div className={`w-12 h-12 rounded-full border border-slate-600 bg-slate-800 flex items-center justify-center shadow-lg group-hover:border-emerald-500 group-hover:shadow-emerald-900/50 transition-all ${i===2 ? 'border-amber-500' : ''}`}>
                <Globe size={18} className={i===2 ? 'text-amber-400' : 'text-emerald-400'} />
             </div>
             <div className="mt-2 text-xs text-slate-400 bg-slate-900/90 px-1.5 rounded border border-slate-800">
               {['银行节点', '运营商节点', '电商节点', '政务节点'][i]}
             </div>
             {i === 2 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>}
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 flex flex-col gap-6 animate-fade-in">
      
      {/* 1. Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <MetricCard title="接入数据资产 (Data Assets)" value="1,284" change={3.2} trend="up" icon={Database} color="text-purple-400" />
        <MetricCard title="协同计算任务 (Tasks)" value="82" change={12.5} trend="up" icon={Activity} color="text-blue-400" />
        <MetricCard title="活跃计算节点 (Nodes)" value="16" change={0} trend="neutral" icon={Network} color="text-emerald-400" />
        <MetricCard title="审计告警 (Audit Alerts)" value="3" change={-50} trend="down" icon={AlertTriangle} color="text-amber-400" />
      </div>

      {/* 2. Middle Section: Topology & Real-time Status */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left: System Topology & Status (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Topology Map */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-1 relative flex flex-col min-h-[400px]">
             <div className="absolute top-4 left-4 z-20">
               <h3 className="font-bold text-white flex items-center gap-2">
                 <Network size={18} className="text-blue-400" />
                 全局数据协同态势 (System Topology)
               </h3>
               <p className="text-xs text-slate-400 mt-1">实时监控各参与方节点连接与数据流转状态</p>
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
                 实时任务监控 (Task Monitor)
               </h3>
               <button className="text-xs text-blue-400 hover:text-blue-300">查看全部 &rarr;</button>
             </div>
             <div className="overflow-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="text-xs text-slate-500 border-b border-slate-700/50">
                     <th className="pb-2 pl-2">任务 ID</th>
                     <th className="pb-2">任务名称</th>
                     <th className="pb-2">类型</th>
                     <th className="pb-2">节点数</th>
                     <th className="pb-2">进度</th>
                     <th className="pb-2">状态</th>
                     <th className="pb-2 text-right">操作</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {activeTasks.map(task => (
                     <tr key={task.id} className="border-b border-slate-800/50 hover:bg-slate-700/20 group">
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
                         <MoreHorizontal size={16} className="text-slate-500 cursor-pointer hover:text-white ml-auto" />
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
           
           {/* Privacy Budget Status - Fixed Height */}
           <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col h-[300px]">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Lock size={18} className="text-amber-400" />
                隐私预算消耗 (Privacy Budget)
              </h3>
              <div className="flex-1 flex items-center justify-center relative min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{name:'Used', value: 35}, {name:'Remaining', value: 65}]}
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
                    <div className="text-3xl font-bold text-white">65%</div>
                    <div className="text-xs text-slate-500 uppercase">剩余预算 (Remaining)</div>
                 </div>
              </div>
           </div>

           {/* Real-time Audit Feed */}
           <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col flex-1 min-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-white flex items-center gap-2">
                   <ShieldCheck size={18} className="text-emerald-400" />
                   实时合规审计 (Live Audit)
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
                    <span className="text-xs text-slate-600 animate-pulse">Waiting for new events...</span>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};