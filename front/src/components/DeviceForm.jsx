import { useState } from 'react';
import { Loader2, Plus, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

export default function DeviceForm({ salaId, onAdded }) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Enchufe');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await api.post(`/api/salas/${salaId}/dispositivos`, { nombre, tipo, estado: 'off' });
      setStatus('success');
      setTimeout(() => { if (onAdded) onAdded(response.data); }, 1500);
    } catch (error) {
      setStatus('error');
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner mt-4"
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-4 space-y-2"
          >
            <CheckCircle2 size={40} className="text-green-500" />
            <p className="font-black text-slate-800 text-xs uppercase tracking-widest">Enlace Exitoso</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            onSubmit={handleSubmit} className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-indigo-600" />
              <h3 className="font-black text-xs text-slate-400 uppercase tracking-widest">Nuevo Dispositivo</h3>
            </div>
            
            <input 
              type="text" placeholder="Nombre (ej. Cafetera)" value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold"
              required
            />

            <select 
              value={tipo} onChange={(e) => setTipo(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border-none shadow-sm cursor-pointer outline-none font-bold"
            >
              <option>Enchufe</option>
              <option>Luz</option>
              <option>Sensor</option>
            </select>

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all cursor-pointer flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20} /> Emparejar</>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}