import { useState, useRef, useEffect } from 'react';
import { Power, Settings, Trash2, Loader2, AlertCircle, CheckCircle2, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import DeviceForm from './DeviceForm';
import WifiConfigForm from './WifiConfigForm';

export default function RoomDetail({ sala, onBack }) {
  const [localSala, setLocalSala] = useState(sala);
  const [loading, setLoading] = useState(false);
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [configDispId, setConfigDispId] = useState(null);
  const [tiempo, setTiempo] = useState(30);
  const [timeLeft, setTimeLeft] = useState(null); // Segundos para el contador en vivo
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  const countdownRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0) {
      countdownRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setLocalSala(prev => ({ ...prev, estado: 'off' }));
      showToast("Apagado automático ejecutado", "success");
      setTimeLeft(null);
    }
    return () => clearInterval(countdownRef.current);
  }, [timeLeft]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const toggleEstado = async () => {
    setLoading(true);
    const nuevoEstado = localSala.estado === 'on' ? 'off' : 'on';
    try {
      await api.post(`/api/control/${localSala.id}/estado?valor=${nuevoEstado}`);
      setLocalSala({ ...localSala, estado: nuevoEstado });
      showToast(`Sala ${nuevoEstado}`, "success");
    } catch {
      showToast("Falla de conexión", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleProgramarApagado = async () => {
    try {
      await api.post(`/api/control/${localSala.id}/programar-apagado?minutos=${tiempo}`);
      showToast(`Apagado programado en ${tiempo} min`, "success");
      
      setTimeLeft(Number(tiempo) * 60);
    } catch {
      showToast("Error al programar", "error");
    }
  };

  const handleCancelarApagado = async () => {
    try {
      await api.post(`/api/control/${localSala.id}/cancelar-apagado`);
      setTimeLeft(null); 
      showToast("Programación cancelada", "success");
    } catch {
      showToast("Error al cancelar", "error");
    }
  };

  const handleDelete = async (dispId) => {
    if (!confirm("¿Eliminar este dispositivo?")) return;
    try {
      await api.delete(`/api/salas/${localSala.id}/dispositivos/${dispId}`);
      setLocalSala({ 
        ...localSala, 
        dispositivos: localSala.dispositivos.filter(d => d.id !== dispId) 
      });
      showToast("Dispositivo eliminado", "success");
    } catch {
      showToast("Error al eliminar", "error");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6 font-sans text-slate-800"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 mb-6 hover:text-indigo-600 transition-colors font-medium cursor-pointer">
        <X size={18} /> Cerrar Sala
      </button>

      <h2 className="text-4xl font-black text-center mb-2 tracking-tighter uppercase">{localSala.nombre}</h2>
      <p className="text-center text-slate-400 text-[10px] tracking-[0.3em] font-bold mb-8 uppercase italic">System Monitor</p>

      {/* BOTÓN DE PODER ANIMADO */}
      <div className="flex flex-col items-center justify-center py-10 relative">
        <AnimatePresence>
          {localSala.estado === 'on' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleEstado}
          disabled={loading}
          className="relative z-10 w-52 h-52 rounded-full flex items-center justify-center cursor-pointer border-8 border-white shadow-2xl"
          animate={{
            backgroundColor: localSala.estado === 'on' ? '#4f46e5' : '#f8fafc',
            boxShadow: localSala.estado === 'on' 
              ? '0px 0px 50px rgba(79, 70, 229, 0.4)' 
              : '0px 10px 30px rgba(0,0,0,0.05)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <Loader2 className="animate-spin text-indigo-400" size={64} />
          ) : (
            <Power size={80} className={localSala.estado === 'on' ? 'text-white' : 'text-slate-200'} />
          )}
        </motion.button>

        {/* CONTADOR EN VIVO */}
        {timeLeft !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-slate-900 text-white px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2"
          >
            <Clock size={14} className="animate-pulse text-indigo-400" />
            AUTO-OFF: {formatTime(timeLeft)}
          </motion.div>
        )}
      </div>

      {/* PANEL DEL TEMPORIZADOR */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl mb-8">
        <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3">
           Temporizador (Minutos)
        </div>
        <div className="flex gap-2">
          <input 
            type="number" 
            value={tiempo} 
            onChange={(e) => setTiempo(e.target.value)} 
            className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-lg" 
          />
          <button onClick={handleProgramarApagado} className="bg-indigo-600 text-white px-6 rounded-2xl font-bold cursor-pointer hover:bg-indigo-700 transition-all">OK</button>
          <button onClick={handleCancelarApagado} className="bg-red-50 text-red-500 px-4 rounded-2xl cursor-pointer hover:bg-red-100 transition-all"><X size={20}/></button>
        </div>
      </div>

      {/* DISPOSITIVOS */}
      <div className="space-y-4">
        <h3 className="font-black text-slate-300 uppercase text-[10px] tracking-[0.3em] ml-2">Dispositivos</h3>
        <AnimatePresence>
          {localSala.dispositivos?.map((disp) => (
            <motion.div 
              key={disp.id} 
              layout
              className="p-5 bg-white rounded-3xl border border-slate-50 shadow-sm flex justify-between items-center group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${localSala.estado === 'on' ? 'bg-green-500' : 'bg-slate-200'}`} />
                <span className="font-bold text-slate-700">{disp.nombre}</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setConfigDispId(configDispId === disp.id ? null : disp.id)} className="p-2 text-slate-300 hover:text-indigo-600 cursor-pointer"><Settings size={18} /></button>
                <button onClick={() => handleDelete(disp.id)} className="p-2 text-slate-300 hover:text-red-500 cursor-pointer"><Trash2 size={18} /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {configDispId && <WifiConfigForm salaId={localSala.id} dispId={configDispId} onConfigured={() => setConfigDispId(null)} />}
        
        <button 
          onClick={() => setShowDeviceForm(!showDeviceForm)} 
          className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold text-sm hover:border-indigo-300 hover:text-indigo-500 transition-all cursor-pointer"
        >
          {showDeviceForm ? "Cerrar" : "+ Añadir Hardware"}
        </button>

        {showDeviceForm && <DeviceForm salaId={localSala.id} onAdded={() => { setShowDeviceForm(false); }} />}
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 50, opacity: 0 }}
            className={`fixed bottom-10 left-6 right-6 p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 ${toast.type === 'error' ? 'bg-red-600' : 'bg-slate-900'} text-white`}
          >
            {toast.type === 'error' ? <AlertCircle size={20}/> : <CheckCircle2 size={20} className="text-indigo-400" />}
            <p className="font-bold text-xs uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}