package ecoswitch_backend.infrastructure.Document;

import lombok.Data;

@Data
public class Dispositivo {
    private String id;
    private String nombre;
    private String tipo; 
    private String puerto;
    private String notas;
}
