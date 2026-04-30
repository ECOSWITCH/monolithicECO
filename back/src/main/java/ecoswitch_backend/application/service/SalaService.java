package ecoswitch_backend.application.service;

import org.springframework.stereotype.Service;
import ecoswitch_backend.infrastructure.Document.Dispositivo;
import ecoswitch_backend.infrastructure.Document.Sala;
import ecoswitch_backend.infrastructure.config.MqttGateway;
import ecoswitch_backend.infrastructure.dto.WifiConfigDTO;
import ecoswitch_backend.infrastructure.repository.SalaRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SalaService {

    private final SalaRepository repository;
    private final ControlService controlService;
    private final MqttGateway mqttGateway;

    public SalaService(SalaRepository repository, ControlService controlService, MqttGateway mqttGateway) {
        this.repository = repository;
        this.controlService = controlService;
        this.mqttGateway = mqttGateway;
    }

    public Sala crearSala(Sala sala) { return repository.save(sala); }
    public List<Sala> listarSalas() { return repository.findAll(); }
    public Sala actualizarSala(String id, Sala salaActualizada) {
        salaActualizada.setId(id);
        return repository.save(salaActualizada);
    }
    public void eliminarSala(String id) { repository.deleteById(id); }

    public Sala agregarDispositivo(String salaId, Dispositivo disp) {
        Sala sala = repository.findById(salaId).orElseThrow();
        disp.setId(UUID.randomUUID().toString());
        if (sala.getDispositivos() == null) sala.setDispositivos(new ArrayList<>());
        sala.getDispositivos().add(disp);
        return repository.save(sala);
    }

    public Sala actualizarDispositivo(String salaId, String dispId, Dispositivo dispActualizado) {
        Sala sala = repository.findById(salaId).orElseThrow();
        sala.getDispositivos().removeIf(d -> d.getId().equals(dispId));
        dispActualizado.setId(dispId); 
        sala.getDispositivos().add(dispActualizado);
        return repository.save(sala);
    }

    public Sala eliminarDispositivo(String salaId, String dispId) {
        Sala sala = repository.findById(salaId).orElseThrow();
        sala.getDispositivos().removeIf(d -> d.getId().equals(dispId));
        return repository.save(sala);
    }

    public void enviarConfiguracion(String dispositivoId, WifiConfigDTO config) {
        String jsonConfig = String.format(
            "{\"ssid\":\"%s\", \"password\":\"%s\", \"mqttserver\":\"%s\"}", 
            config.getSsid(), config.getPassword(), config.getMqttServer()
        );
        mqttGateway.sendToMqtt(jsonConfig, "ecoswitch/config/" + dispositivoId);
    }
}