import { useState } from 'react';
import { Loader2, Trash2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

export default function DeleteDevice({ salaId, dispositivoId, nombre, onDeleted, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); 

  const handleDelete = async () => {
    setLoading(true);
    setStatus('loading');

    try {
      await api.delete(`/api/salas/${salaId}/dispositivos/${dispositivoId}`);
      setStatus('success');
      setTimeout(() => {
        if (onDeleted) onDeleted(dispositivoId);
      }, 1200);
    } catch (error) {
      console.error("Error eliminando:", error);
      setStatus('error');
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white p-8 rounded-[2.5rem] border border-red-100 shadow-2xl max-w-sm w-full mx-auto text-center"
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Desvinculado</h3>
              <p className="text-slate-400 text-sm">El dispositivo ha sido removido.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="confirm" className="space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <AlertCircle size={32} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-black text-slate-900 text-xl tracking-tight">¿Eliminar {nombre}?</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Esta acción desconectará el dispositivo de la red de la sala de forma permanente.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-all flex justify-center items-center gap-2 shadow-lg shadow-red-100 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Trash2 size={18} /> Confirmar Baja</>}
              </button>

              <button
                onClick={onCancel}
                disabled={loading}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex justify-center items-center gap-2"
              >
                <X size={18} /> Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}