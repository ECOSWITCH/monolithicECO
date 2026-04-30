package ecoswitch_backend.application.service;

import org.springframework.stereotype.Service;
import ecoswitch_backend.infrastructure.config.MqttGateway;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ControlService {
    
    private final MqttGateway mqttGateway;
    private final Map<String, Timer> timers = new ConcurrentHashMap<>();

    public ControlService(MqttGateway mqttGateway) {
        this.mqttGateway = mqttGateway;
    }

    public void cambiarEstado(String estado, String dispositivoId) { 
        if (dispositivoId == null) return;
        
        if ("off".equals(estado)) {
            cancelarApagado(dispositivoId);
        }
        
        String topic = "ecoswitch/control/ESP32-1305613c";
        mqttGateway.sendToMqtt(estado, topic);
        System.out.println("MQTT -> Topic: " + topic + " | Comando: " + estado);
    }

    public void programarApagado(int minutos, String dispositivoId) {
        if (dispositivoId == null) return;
        
        cancelarApagado(dispositivoId); 
        
        Timer timer = new Timer(true);
        timers.put(dispositivoId, timer);
        
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                cambiarEstado("off", dispositivoId);
                timers.remove(dispositivoId);
            }
        }, minutos * 60000L);
    }

    public void cancelarApagado(String salaId) {
        if (salaId == null) return;
        
        Timer t = timers.remove(salaId); 
        if (t != null) {
            t.cancel();
        }
    }
}