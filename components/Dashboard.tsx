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

// --- Topology Visualization Component (Adjusted for Light Mode) ---
const SystemTopology = () => (
  <div className="relative w-full h-full bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] border border-gray-100">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-white to-white"></div>
    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
    
    {/* Center Hub - Shifted Left and Up slightly to make room */}
    <div className="absolute top-[40%] left-[45%] z-10 flex flex-col items-center animate-pulse-slow">
      <div className="w-24 h-24 rounded-full border-2 border-blue-200 bg-white flex items-center justify-center shadow-xl shadow-blue-100">
        <Server size={32} className="text-blue-600" />
      </div>
      <div className="mt-2 text-sm font-bold text-gray-700 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm whitespace-nowrap">核心计算枢纽</div>
    </div>

    {/* Satellite Nodes - Positioned absolute to ensure no overlap */}
    
    {/* Node 1: Top Right */}
    <div className="absolute top-[15%] right-[20%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute top-[100%] right-[100%] w-32 h-0.5 bg-gradient-to-l from-gray-300 to-blue-300 origin-right rotate-45 transform translate-y-[-20px] translate-x-[20px] -z-10"></div>
        <div className="w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-md group-hover:border-emerald-500 transition-colors">
            <Globe size={20} className="text-emerald-500" />
        </div>
        <div className="mt-2 text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">银行节点</div>
    </div>

    {/* Node 2: Bottom Right (Far) */}
    <div className="absolute bottom-[20%] right-[15%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute bottom-[100%] right-[100%] w-40 h-0.5 bg-gradient-to-l from-gray-300 to-blue-300 origin-right -rotate-12 transform translate-y-[20px] translate-x-[20px] -z-10"></div>
        <div className="w-14 h-14 rounded-full border border-amber-200 bg-white flex items-center justify-center shadow-md transition-colors">
            <Globe size={20} className="text-amber-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
        </div>
        <div className="mt-2 text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">电商节点</div>
    </div>

    {/* Node 3: Bottom Left */}
    <div className="absolute bottom-[15%] left-[25%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute bottom-[100%] left-[100%] w-32 h-0.5 bg-gradient-to-r from-gray-300 to-blue-300 origin-left rotate-[-45] transform translate-y-[20px] translate-x-[-20px] -z-10"></div>
        <div className="w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-md group-hover:border-purple-500 transition-colors">
             <Globe size={20} className="text-purple-500" />
        </div>
        <div className="mt-2 text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">政务节点</div>
    </div>
    
    {/* Node 4: Top Left (Far) */}
    <div className="absolute top-[25%] left-[15%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
        <div className="absolute top-[100%] left-[100%] w-36 h-0.5 bg-gradient-to-r from-gray-300 to-blue-300 origin-left rotate-[15] transform translate-y-[-20px] translate-x-[-20px] -z-10"></div>
        <div className="w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-md group-hover:border-blue-500 transition-colors">
             <Globe size={20} className="text-blue-500" />
        </div>
        <div className="mt-2 text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">运营商</div>
    </div>

  </div>
);

export const Dashboard: React.FC = () => {
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
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                   网络正常
                </span>
             </div>
             <SystemTopology />
          </div>

          {/* Bottom: Task Monitoring Table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col shadow-sm">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 <Activity size={18} className="text-purple-600" />
                 任务监控 (Task Monitor)
               </h3>
             </div>
             <div className="overflow-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                     <th className="py-2 pl-3 font-medium">任务 ID</th>
                     <th className="py-2 font-medium">业务场景</th>
                     <th className="py-2 font-medium">技术引擎</th>
                     <th className="py-2 font-medium">参与方</th>
                     <th className="py-2 font-medium">进度</th>
                     <th className="py-2 font-medium">状态</th>
                     <th className="py-2 text-right pr-3 font-medium">操作</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {activeTasks.map(task => (
                     <tr key={task.id} className="border-b border-gray-50 hover:bg-gray-50 group cursor-pointer transition-colors" onClick={() => { /* Navigate logic here if context available */ }}>
                       <td className="py-3 pl-3 font-mono text-gray-600">{task.id}</td>
                       <td className="py-3 text-gray-800 font-medium">{task.name}</td>
                       <td className="py-3 text-gray-500 text-xs">
                          <span className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">{task.type}</span>
                       </td>
                       <td className="py-3 text-gray-600">{task.nodes}</td>
                       <td className="py-3 w-32">
                         <div className="flex items-center gap-2">
                           <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 rounded-full" style={{width: `${task.progress}%`}}></div>
                           </div>
                           <span className="text-xs text-gray-500 w-8">{task.progress}%</span>
                         </div>
                       </td>
                       <td className="py-3">
                         <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                           task.status === 'Running' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                           task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
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
                   全链路可信审计 (Trusted Audit)
                 </h3>
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                 {auditStream.map((log) => (
                   <div key={log.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                        log.type === 'warn' ? 'bg-amber-500' : 
                        log.type === 'error' ? 'bg-rose-500' :
                        log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <div className="text-xs text-gray-400 font-mono mb-0.5">{log.time}</div>
                        <div className="text-sm text-gray-700 leading-snug">{log.msg}</div>
                      </div>
                   </div>
                 ))}
                 <div className="text-center pt-2">
                    <span className="text-xs text-gray-400 animate-pulse">正在同步区块链存证...</span>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};