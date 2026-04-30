package ecoswitch_backend.infrastructure.controller;

import ecoswitch_backend.application.service.SalaService;
import ecoswitch_backend.infrastructure.Document.Dispositivo;
import ecoswitch_backend.infrastructure.Document.Sala;
import ecoswitch_backend.infrastructure.config.MqttGateway;
import ecoswitch_backend.infrastructure.dto.WifiConfigDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salas")
public class SalaController {

    private final SalaService salaService;

    public SalaController(SalaService salaService) {
        this.salaService = salaService;
    }

    // --- CRUD DE SALAS ---
    @PostMapping
    public Sala crear(@RequestBody Sala sala) { return salaService.crearSala(sala); }

    @GetMapping
    public List<Sala> listar() { return salaService.listarSalas(); }

    @PutMapping("/{id}")
    public Sala actualizar(@PathVariable String id, @RequestBody Sala sala) { 
        return salaService.actualizarSala(id, sala); 
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) { salaService.eliminarSala(id); }

    // --- GESTIÓN DE DISPOSITIVOS ---
    @PostMapping("/{salaId}/dispositivos")
    public Sala agregarDispositivo(@PathVariable String salaId, @RequestBody Dispositivo disp) {
        return salaService.agregarDispositivo(salaId, disp);
    }

    @PutMapping("/{salaId}/dispositivos/{dispId}")
    public Sala actualizarDispositivo(@PathVariable String salaId, @PathVariable String dispId, @RequestBody Dispositivo disp) {
        return salaService.actualizarDispositivo(salaId, dispId, disp);
    }

    @DeleteMapping("/{salaId}/dispositivos/{dispId}")
    public Sala eliminarDispositivo(@PathVariable String salaId, @PathVariable String dispId) {
        return salaService.eliminarDispositivo(salaId, dispId);
    }

    @PostMapping("/{dispositivoId}/wifi-config")
    public ResponseEntity<String> configurarWifi(@PathVariable String dispositivoId, @RequestBody WifiConfigDTO config) {
        salaService.enviarConfiguracion(dispositivoId, config);
        return ResponseEntity.ok("Configuración enviada al dispositivo " + dispositivoId);
    }
    
    @Autowired
    private MqttGateway mqttGateway; 
    @PostMapping("/{salaId}/dispositivos/{dispId}/configurar")
        public ResponseEntity<String> configurarDispositivo(@PathVariable String dispId, @RequestBody WifiConfigDTO config) {
        String topic = "ecoswitch/config/ESP32-1305613c"; 
        
        String jsonPayload = String.format("{\"ssid\":\"%s\", \"password\":\"%s\", \"mqttserver\":\"%s\"}", 
                            config.getSsid(), config.getPassword(), config.getMqttServer());
                            
        mqttGateway.sendToMqtt(jsonPayload, topic);
        return ResponseEntity.ok("Configuración enviada");
    }
}