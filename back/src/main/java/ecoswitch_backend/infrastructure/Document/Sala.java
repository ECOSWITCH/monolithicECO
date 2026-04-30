package ecoswitch_backend.infrastructure.Document;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "salas")
@Data
public class Sala {
    @Id
    private String id;
    private String nombre;
    private String dispositivoIp;
    private String dispositivoId; 
    private String estado; 
    private List<Dispositivo> dispositivos = new ArrayList<>();

    public Sala() {}
    
    public Sala(String nombre, String dispositivoIp, String dispositivoId, List<Dispositivo> dispositivos) {
        this.nombre = nombre;
        this.dispositivoIp = dispositivoIp;
        this.dispositivoId = dispositivoId;
        this.estado = "off";
        this.dispositivos = dispositivos;
    }
}