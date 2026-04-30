package ecoswitch_backend.application.service;

import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import ecoswitch_backend.infrastructure.Document.Telemetry;
import ecoswitch_backend.infrastructure.repository.TelemetryRepository;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class TelemetryService {
    private final TelemetryRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private double totalPower = 0;
    private int count = 0;
    private String lastStatus = "unknown";

    public TelemetryService(TelemetryRepository repository) { this.repository = repository; }

    public void processAndSave(String json) {
        try {
            JsonNode node = objectMapper.readTree(json);
            totalPower += node.get("power").asInt();
            lastStatus = node.get("status").asText();
            count++;
        } catch (Exception e) { e.printStackTrace(); }
    }

    @Scheduled(fixedRate = 3600000)
    public void saveHourlyAverage() {
        if (count > 0) {
            Telemetry t = new Telemetry();
            t.setPower((int) (totalPower / count)); 
            t.setStatus(lastStatus);
            repository.save(t);
            

            totalPower = 0;
            count = 0;
        }
    }
}