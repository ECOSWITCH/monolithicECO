package ecoswitch_backend.infrastructure.Document;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "telemetry") 
public class Telemetry {
    @Id
    private String id; 
    
    private Integer power;
    private String status;
    private LocalDateTime timestamp;

    public Telemetry() { this.timestamp = LocalDateTime.now(); }

}
