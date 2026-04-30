package ecoswitch_backend.infrastructure.dto;

import lombok.Data;

@Data
public class WifiConfigDTO {
    private String ssid;
    private String password;
    private String mqttServer;
}