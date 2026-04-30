#include <WiFiManager.h>
#include <PubSubClient.h>
#include <Preferences.h>
#include <ArduinoJson.h>

Preferences prefs;
WiFiClient espClient;
PubSubClient client(espClient);

#define PIN_RELE 25  
#define PIN_LEDS 26  

const char* mqtt_server = "broker.emqx.io"; 
String miClientId;

void callback(char* topic, byte* payload, unsigned int length) {
    String message = "";
    for (unsigned int i = 0; i < length; i++) message += (char)payload[i];

    Serial.print("Mensaje recibido en [");
    Serial.print(topic);
    Serial.print("]: ");
    Serial.println(message);

    if (message == "on") {
        digitalWrite(PIN_RELE, LOW);  
        digitalWrite(PIN_LEDS, HIGH); 
        Serial.println(">>> ACCIÓN: ENCENDIDO");
    } 
    else if (message == "off") {
        digitalWrite(PIN_RELE, HIGH);  
        digitalWrite(PIN_LEDS, LOW);   
        Serial.println(">>> ACCIÓN: APAGADO");
    }
}

void setup() {
    Serial.begin(115200);
    pinMode(PIN_RELE, OUTPUT);
    pinMode(PIN_LEDS, OUTPUT);

    digitalWrite(PIN_RELE, HIGH);  
    digitalWrite(PIN_LEDS, LOW); 

    miClientId = "ESP32-" + String((uint32_t)ESP.getEfuseMac(), HEX);

    WiFiManager wm;
    if (!wm.autoConnect("EcoSwitch_Setup")) ESP.restart();

    Serial.println("ID del Cliente: " + miClientId);
    Serial.println("Broker: " + String(mqtt_server));
    
    client.setServer(mqtt_server, 1883);
    client.setCallback(callback);
}

void loop() {
    if (!client.connected()) {
        Serial.print("Conectando a MQTT...");
        if (client.connect(miClientId.c_str())) {
            Serial.println("¡CONECTADO!");
            String topicEscucha = "ecoswitch/control/" + miClientId;
            client.subscribe(topicEscucha.c_str());
            Serial.println("Suscrito a: " + topicEscucha);
        } else {
            Serial.print("Fallo, rc=");
            Serial.print(client.state());
            Serial.println(" reintentando en 5s");
            delay(5000);
        }
    }
    client.loop();
}