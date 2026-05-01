import { useEffect, useState } from 'react';
import { Zap, Plus, Trash2, Home, Thermometer, Activity, Loader2, X, AlertTriangle, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import RoomDetail from './RoomDetail';

export default function Dashboard() {
  const [salas, setSalas] = useState([]);
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null, nombre: '' });

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

  const handleCrearSala = async () => {
    if (!newRoomName.trim()) return;
    try {
      await api.post('/api/salas', { 
        nombre: newRoomName, 
        estado: 'off', 
        temp: '22°C', 
        consumo: '0.0 kWh' 
      });
      setNewRoomName('');
      setShowCreateModal(false);
      fetchSalas();
    } catch (e) {
      console.error("Error al crear sala:", e);
    }
  };

  const handleEliminarSala = async () => {
    try {
      await api.delete(`/api/salas/${confirmDelete.id}`);
      setConfirmDelete({ show: false, id: null, nombre: '' });
      fetchSalas();
    } catch (e) {
      console.error("Error al eliminar sala:", e);
    }
  };

  if (salaSeleccionada) {
    return <RoomDetail sala={salaSeleccionada} onBack={() => { setSalaSeleccionada(null); fetchSalas(); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900 overflow-x-hidden">
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
        <p className="text-slate-400 mt-2 font-medium">Gestiona tus espacios inteligentes de forma eficiente.</p>
      </div>

      {/* LISTA DE SALAS */}
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
                whileHover={{ scale: 1.01 }}
                onClick={() => setSalaSeleccionada(sala)}
                className="relative group flex items-center justify-between p-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 cursor-pointer overflow-hidden transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-center gap-5">
                  <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl tracking-tight text-slate-800">{sala.nombre}</h3>
                    <div className="flex gap-4 text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">
                      <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg"><Thermometer size={12} className="text-orange-400" /> {sala.temp}</span>
                      <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg"><Activity size={12} className="text-green-400" /> {sala.consumo}</span>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete({ show: true, id: sala.id, nombre: sala.nombre });
                  }} 
                  className="relative p-4 rounded-full bg-red-50 text-red-500 transition-all cursor-pointer z-10"
                >
                  <Trash2 size={20} />
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* BOTÓN AÑADIR */}
      <div className="max-w-3xl mx-auto mt-10">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)} 
          className="relative w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-slate-400 cursor-pointer"
        >
          <Plus size={24} /> Añadir nueva sala
        </motion.button>
      </div>

      {/* MODAL DE ELIMINACIÓN */}
      <AnimatePresence>
        {confirmDelete.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete({ show: false, id: null, nombre: '' })}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm p-10 rounded-[3rem] shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">¿Eliminar sala?</h4>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Estás a punto de borrar permanentemente la sala <b>{confirmDelete.nombre}</b> y todos sus dispositivos asociados.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleEliminarSala}
                  className="w-full py-5 bg-red-500 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-red-200 cursor-pointer"
                >
                  Confirmar Borrado
                </button>
                <button 
                  onClick={() => setConfirmDelete({ show: false, id: null, nombre: '' })}
                  className="w-full py-5 bg-slate-100 text-slate-500 rounded-3xl font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE CREACIÓN */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm p-10 rounded-[3rem] shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <Edit3 size={24} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Nueva Sala</h4>
              </div>
              
              <input 
                autoFocus
                type="text"
                placeholder="Ej. Sala de Estar"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCrearSala()}
                className="w-full p-5 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-lg mb-8"
              />

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleCrearSala}
                  className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 cursor-pointer"
                >
                  Crear Espacio
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="w-full py-5 bg-white text-slate-400 rounded-3xl font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}