# ⚡ EcoSwitch IoT System

A smart energy management system designed to control power consumption remotely. Built for robustness, security, and scalability.

## 👥 Development Team

| Name | Role | Responsibilities |
| :--- | :--- | :--- |
| **Juan Pablo Caballero** | Lead Engineer | Architecture, Firmware, Backend & Integration |

## 🛠 Technologies Used

- **Firmware (C++):** Hardware management and sensor handling using FreeRTOS on ESP32.
- **Backend (Java 21):** Robust API built with Spring Boot for service orchestration.
- **Protocol (MQTT):** Lightweight and asynchronous communication between devices and the server.
- **Broker (Mosquitto):** Message server to manage IoT communication topics.
- **UI/UX (React Native):** Cross-platform mobile application.

## 🏗 System Architecture

The EcoSwitch system follows a decoupled, event-driven architecture:

```text
[ ESP32 Firmware ] 
       │
       ▼ (MQTT)
[ Mosquitto Broker ]
       │
       ▼ (MQTT)
[ Spring Boot Backend ] 
       │
       ▼ (REST / WebSockets)
[ React Native Mobile App ]