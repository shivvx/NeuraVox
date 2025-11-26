import { motion } from "motion/react";
import { Clock, CheckCircle2, AlertCircle, Play, Pause } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  status: 'in-progress' | 'completed' | 'consent-required';
  progress?: number;
}

export function AgentTasks() {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  
  const tasks: Task[] = [
    { id: '1', title: 'Answer customer inquiries', status: 'in-progress', progress: 65 },
    { id: '2', title: 'Provide product recommendations', status: 'completed', progress: 100 },
    { id: '3', title: 'Assist with order processing', status: 'completed', progress: 100 },
    { id: '4', title: 'Handle customer complaints', status: 'consent-required', progress: 45 },
  ];

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'in-progress':
        return <Clock className="w-3 h-3 text-blue-400" />;
      case 'completed':
        return <CheckCircle2 className="w-3 h-3 text-green-400" />;
      case 'consent-required':
        return <AlertCircle className="w-3 h-3 text-yellow-400" />;
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'in-progress':
        return 'In progress';
      case 'completed':
        return 'Completed';
      case 'consent-required':
        return 'Consent required';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'in-progress':
        return 'text-blue-400';
      case 'completed':
        return 'text-green-400';
      case 'consent-required':
        return 'text-yellow-400';
    }
  };

  const getProgressColor = (status: Task['status']) => {
    switch (status) {
      case 'in-progress':
        return 'from-blue-500 to-cyan-500';
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'consent-required':
        return 'from-yellow-500 to-orange-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[380px] bg-gradient-to-br from-zinc-950/80 via-zinc-900/60 to-zinc-950/80 backdrop-blur-2xl rounded-[24px] border border-white/10 p-[32px] max-xl:max-w-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_48px_rgba(168,85,247,0.15)] transition-shadow relative overflow-hidden"
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[24px]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10">
        <div className="mb-[8px]">
          <h2 className="text-[24px] text-white">Agent Tasks</h2>
        </div>
        <p className="text-white/50 text-[14px] mb-[32px]">
          Overview of all the tasks the agent is currently running
        </p>

        <div className="space-y-[20px]">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              onHoverStart={() => setHoveredTask(task.id)}
              onHoverEnd={() => setHoveredTask(null)}
              className="py-[12px] border-b border-white/5 last:border-0 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-[8px]">
                <span className="text-white/80 text-[14px] flex-1">{task.title}</span>
                <motion.div 
                  className={`flex items-center gap-[6px] text-[13px] ${getStatusColor(task.status)}`}
                  animate={task.status === 'in-progress' ? { opacity: [1, 0.6, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {getStatusIcon(task.status)}
                  <span>{getStatusText(task.status)}</span>
                </motion.div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-[6px] bg-zinc-800/50 rounded-full overflow-hidden mt-[8px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={`h-full bg-gradient-to-r ${getProgressColor(task.status)} relative`}
                >
                  {task.status === 'in-progress' && (
                    <motion.div
                      animate={{ x: ['-100%', '300%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  )}
                </motion.div>
              </div>

              {/* Action buttons on hover */}
              {hoveredTask === task.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex gap-2 mt-[8px]"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 h-[28px] bg-purple-600/80 hover:bg-purple-600 rounded-[6px] text-[11px] text-white flex items-center justify-center gap-1 transition-colors"
                  >
                    {task.status === 'in-progress' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {task.status === 'in-progress' ? 'Pause' : 'Resume'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 h-[28px] bg-zinc-800/80 hover:bg-zinc-800 rounded-[6px] text-[11px] text-white transition-colors"
                  >
                    Details
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}