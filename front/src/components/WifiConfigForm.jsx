import { useState } from 'react';
import { Loader2, Wifi, Server, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import api from '../api/axios';

export default function WifiConfigForm({ salaId, dispId, onConfigured }) {
  const [config, setConfig] = useState({ 
    ssid: '', 
    password: '', 
    mqttServer: '172.20.10.4' 
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const payload = {
      ssid: config.ssid,
      password: config.password,
      mqttServer: config.mqttServer
    };
    
    console.log("Enviando JSON al servidor:", JSON.stringify(payload));

    try {
      await api.post(`/api/salas/${salaId}/dispositivos/${dispId}/configurar`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setStatus('success');
      setTimeout(() => { if (onConfigured) onConfigured(); }, 2000);
    } catch (err) {
      console.error("Detalle del error:", err);
      setStatus('error');
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl shadow-blue-500/10">
      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in zoom-in duration-300">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="text-green-600 animate-pulse" size={40} />
          </div>
          <p className="font-bold text-slate-800">Configuración Aplicada</p>
          <p className="text-sm text-slate-500 text-center">El dispositivo se está reiniciando para conectar al nuevo nodo.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Wifi size={20} /></div>
            <h4 className="font-black text-xl text-slate-800">Parámetros de Red</h4>
          </div>
          
          <div className="space-y-4">
            <input 
              className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none" 
              placeholder="Nombre de la red (SSID)" 
              value={config.ssid}
              onChange={(e) => setConfig({...config, ssid: e.target.value})} 
              required 
            />
            
            <input 
              className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none" 
              type="password"
              placeholder="Contraseña" 
              value={config.password}
              onChange={(e) => setConfig({...config, password: e.target.value})} 
              required 
            />
            
            <div className="relative">
              <Server className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none" 
                placeholder="IP del Servidor MQTT" 
                value={config.mqttServer}
                onChange={(e) => setConfig({...config, mqttServer: e.target.value})} 
                required 
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer
              ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30'}`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Aplicar Configuración</>}
          </button>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl animate-in slide-in-from-top-2">
              <AlertCircle size={16} />
              <span>{err?.response?.data?.message || "No se pudo establecer conexión con el controlador."}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}