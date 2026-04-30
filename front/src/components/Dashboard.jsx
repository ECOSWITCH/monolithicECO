import { useEffect, useState } from 'react';
import { Zap, Plus, Trash2, Home, Thermometer, Activity, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import RoomDetail from './RoomDetail';

export default function Dashboard() {
  const [salas, setSalas] = useState([]);
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSalas = async () => {
    try {
      const res = await api.get('/api/salas');
      setSalas(res.data);
    } catch (e) { 
      console.error("Error al cargar salas:", e); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchSalas(); }, []);

  const crearSala = async () => {
    const nombre = prompt("Nombre de la nueva sala:");
    if (!nombre) return;
    
    try {
      await api.post('/api/salas', { 
        nombre, 
        estado: 'off', 
        temp: '22°C', 
        consumo: '0.0 kWh' 
      });
      fetchSalas();
    } catch (e) {
      console.error("Error al crear sala:", e);
    }
  };

  const eliminarSala = async (e, salaId) => {
    e.stopPropagation();
    if (!confirm("¿Eliminar esta sala permanentemente?")) return;
    
    try {
      await api.delete(`/api/salas/${salaId}`);
      fetchSalas();
    } catch (e) {
      console.error("Error al eliminar sala:", e);
    }
  };

  if (salaSeleccionada) {
    return <RoomDetail sala={salaSeleccionada} onBack={() => { setSalaSeleccionada(null); fetchSalas(); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900 overflow-hidden">
      <nav className="flex justify-between items-center mb-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
            <Home size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter">EcoHome</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="text-5xl font-extrabold tracking-tighter">Panel de Control</h1>
        <p className="text-slate-400 mt-2">Gestiona tus espacios inteligentes.</p>
      </div>

      <motion.div className="space-y-4 max-w-3xl mx-auto">
        <AnimatePresence>
          {loading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-500" size={40} /></div>
          ) : (
            salas.map((sala) => (
              <motion.div 
                key={sala.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSalaSeleccionada(sala)}
                className="relative group flex items-center justify-between p-7 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-center gap-5">
                  <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{sala.nombre}</h3>
                    <div className="flex gap-4 text-xs font-bold text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><Thermometer size={14} /> {sala.temp}</span>
                      <span className="flex items-center gap-1"><Activity size={14} /> {sala.consumo}</span>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => eliminarSala(e, sala.id)} 
                  className="relative p-4 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Trash2 size={20} />
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      <div className="max-w-3xl mx-auto mt-10">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={crearSala} 
          className="relative w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-slate-400 cursor-pointer"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          <Plus size={24} /> Añadir nueva sala
        </motion.button>
      </div>
    </div>
  );
}