package ecoswitch_backend.infrastructure.controller;

import org.springframework.web.bind.annotation.*;
import ecoswitch_backend.application.service.ControlService;

@RestController
@RequestMapping("/api/control")
public class ControlController {

    private final ControlService controlService;

    public ControlController(ControlService controlService) {
        this.controlService = controlService;
    }

    @PostMapping("/{dispositivoId}/estado")
    public String cambiarEstado(
            @PathVariable String dispositivoId, 
            @RequestParam String valor) {
        
        controlService.cambiarEstado(valor, dispositivoId);
        return "Comando " + valor + " enviado al dispositivo " + dispositivoId;
    }

    @PostMapping("/{dispositivoId}/programar-apagado")
    public String programarApagado(
            @PathVariable String dispositivoId, 
            @RequestParam int minutos) {
        
        controlService.programarApagado(minutos, dispositivoId);
        return "Apagado en " + minutos + " min programado para " + dispositivoId;
    }
    
    @PostMapping("/{dispositivoId}/cancelar-apagado")
    public String cancelar(@PathVariable String dispositivoId) {
        
        controlService.cancelarApagado(dispositivoId);
        return "Programación cancelada para el dispositivo " + dispositivoId;
    }
}