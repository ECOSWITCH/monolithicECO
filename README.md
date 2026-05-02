<div align="center">

<br/>

<pre>
███████╗ ██████╗ ██████╗ ███████╗██╗    ██╗██╗████████╗ ██████╗██╗  ██╗
██╔════╝██╔════╝██╔═══██╗██╔════╝██║    ██║██║╚══██╔══╝██╔════╝██║  ██║
█████╗  ██║     ██║   ██║███████╗██║ █╗ ██║██║   ██║   ██║     ███████║
██╔══╝  ██║     ██║   ██║╚════██║██║███╗██║██║   ██║   ██║     ██╔══██║
███████╗╚██████╗╚██████╔╝███████║╚███╔███╔╝██║   ██║   ╚██████╗██║  ██║
╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚══╝╚══╝ ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝
</pre>

### ⚡ Estación de Carga Inteligente · Dodecaedro IoT · Control Remoto Total

<br/>

[![Python](https://img.shields.io/badge/Python-3.12-3670A0?style=flat-square&logo=python&logoColor=ffdd54)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![ESP32](https://img.shields.io/badge/ESP32-Firmware-E7352C?style=flat-square&logo=espressif&logoColor=white)](https://espressif.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Vercel](https://img.shields.io/badge/Live-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://monolithic-eco.vercel.app/)
[![Render](https://img.shields.io/badge/API-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

<br/>

> **"Un objeto que no solo carga tus dispositivos, sino que los protege, los monitorea y habla contigo."**

<br/>

🌐 **App en producción:** [monolithic-eco.vercel.app](https://monolithic-eco.vercel.app/)

<br/>

</div>

---

## 👥 Equipo

| Integrante | Rol |
|------------|-----|
| **Juan Pablo Caballero Castellanos** | Líder FullStack · Cloud · AI · 3D Modeling · Prototipado |
| **Robinson Steven Núñez Portela** | FullStack · IA · 3D Modeling · Prototipado |
| **Oscar Andrés Sánchez Porras** | Frontend · Integración de IA · 3D Modeling · Prototipado |
| **Juan Sebastián Guayazán Clavijo** | Frontend · Desarrollo de interfaces · Soporte FullStack · Prototipado |
| **Martin Andres Ruiz Sarmiento** | Administración · Electricista autodidacta · Prototipado · 3D Modeling |

---

## 📑 Contenido

1. [Descripción](#-descripción)
2. [Por qué un Dodecaedro](#-por-qué-un-dodecaedro)
3. [Documentación del proyecto](#-documentación-del-proyecto)
4. [Arquitectura del sistema](#-arquitectura-del-sistema)
5. [Endpoints API](#-endpoints-api)
6. [Stack tecnológico](#-stack-tecnológico)
7. [Vistas y funcionalidades](#-vistas-y-funcionalidades)
8. [Evolución del prototipo](#-evolución-del-prototipo)
9. [Instalación local](#-instalación-local)
10. [Variables de entorno](#-variables-de-entorno)
11. [Tríptico 1 · Proceso del proyecto](#-tríptico-1--proceso-del-proyecto)
12. [Tríptico 2 · Desarrollo del producto](#-tríptico-2--desarrollo-del-producto)

---

## 📝 Descripción

**EcoSwitch** nació de una pregunta simple: ¿cuánta energía desperdicías cada noche dejando el celular conectado hasta la mañana? La respuesta nos llevó a diseñar algo que va mucho más allá de un adaptador inteligente.

Es una **estación de carga con forma de dodecaedro**, un sólido platónico de 12 caras pentagonales que integra tomas eléctricas NEMA 5-15R, puertos USB, iluminación NeoPixel y un ESP32 que lo conecta todo con tu teléfono. Detecta cuándo tu dispositivo terminó de cargar, corta el suministro automáticamente y te lo hace saber. Todo en tiempo real, desde la app.

**Así funciona de principio a fin:**

```
 Dispositivo conectado
        │
        ▼
 ESP32 monitorea corriente
        │
        ▼
 ¿Carga completa? ──► NO ──► Sigue cargando · NeoPixel verde
        │
       SÍ
        │
        ▼
 Relé corta el suministro
        │
        ▼
 NeoPixel cambia a azul · App recibe notificación
        │
        ▼
 Historial guardado en MongoDB Atlas
```

---

## 🔷 Por qué un Dodecaedro

No fue un capricho estético. Fue la conclusión de semanas de iteración donde cada forma anterior fallaba en algo.

El rectángulo era funcional pero genérico. El cilindro desperdiciaba espacio interno. El enchufe giratorio que desarrollamos en MID fidelidad resolvía la rotación pero no la escala. Necesitábamos una forma que distribuyera tomas en múltiples orientaciones, que tuviera suficiente volumen interno para la electrónica y que al mismo tiempo se viera bien sobre un escritorio.

El **dodecaedro** resolvió todo eso de un golpe:

| Problema | Solución que da el dodecaedro |
|----------|-------------------------------|
| Tomas en una sola cara | 12 caras pentagonales disponibles en 360° |
| Poco espacio interno | Cavidad amplia y orgánica para PCB, relé y anillos LED |
| Difícil de agarrar | Cuerpo de 10 cm validado con P95 masculino de anchura de mano |
| Indistinguible en el mercado | Forma única que convierte el dispositivo en objeto de diseño |
| Inestabilidad al apoyarlo | Base pentagonal de 200 x 180 mm con 20 mm de espesor |

Las caras translúcidas de PLA superiores funcionan además como difusores de luz para el **modo lámpara**, integrando estética y utilidad en un mismo componente. No hay ninguna otra regleta en el mercado con esa forma. Eso, en términos de producto, vale mucho.

### Especificaciones físicas del dodecaedro

| Parámetro | Valor |
|-----------|-------|
| Forma | Dodecaedro regular · 12 caras pentagonales |
| Arista por cara | 70 mm ±0.5 mm |
| Altura total con base | 132 mm |
| Altura sin base | 112 mm |
| Base rectangular | 200 x 180 mm |
| Espesor de base | 20 mm |
| Carcasa superior | PLA translúcido · modo lámpara |
| Carcasa inferior | PLA opaco · soporte estructural |
| Tomas integradas | 3x NEMA 5-15R · 40 x 40 mm · profundidad 35 mm |
| Norma eléctrica | RETIE · NTC 2050 · IEC 60335-1 |

---

## 📄 Documentación del proyecto

| Documento | Descripción |
|-----------|-------------|
| [📘 Bitácora PRTO](docs/Bitacora.pdf) | Registro completo del proceso: bocetos, árbol funcional, canvas, antropometría y evolución del prototipo |

---

## 🏗️ Arquitectura del sistema

El sistema tiene tres capas que se comunican entre sí en tiempo real:

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO FINAL                            │
│              App Web · monolithic-eco.vercel.app                │
│                React 18 · TypeScript · Tailwind                 │
└─────────────────────────┬───────────────────────────────────────┘
                          │  HTTPS · REST
┌─────────────────────────▼───────────────────────────────────────┐
│                      BACKEND · API REST                         │
│               FastAPI 0.115 · Python 3.12 · Render              │
│                                                                 │
│   /auth        /device/toggle      /history      /analytics     │
│                                                                 │
│          MongoDB Atlas · Motor async · Beanie 1.30              │
└────────────────┬──────────────────────────────┬─────────────────┘
                 │  MQTT · WebSocket             │  Read/Write
┌────────────────▼──────────────┐   ┌────────────▼────────────────┐
│     FIRMWARE · ESP32          │   │     BASE DE DATOS           │
│   Arduino Framework           │   │     MongoDB Atlas           │
│                               │   │                             │
│  relay_control.h              │   │  Users · Devices            │
│  neopixel_status.h            │   │  PowerRecords · Sessions    │
│  wifi_mqtt.h                  │   │                             │
└────────────────┬──────────────┘   └─────────────────────────────┘
                 │  GPIO · AC Control
┌────────────────▼──────────────────────────────────────────────┐
│                    HARDWARE · DODECAEDRO                       │
│                                                               │
│   Relé de corte AC    Anillo NeoPixel x2    Tomas NEMA 5-15R  │
│   Sensor corriente    Fuente AC switching   Bloque USB Hembra  │
│   LED piloto rojo     Interruptor On/Off    Cable SJT 3x14 AWG │
└───────────────────────────────────────────────────────────────┘
```

### Estructura de carpetas

```
ECOSWITCH/
├── frontend/
│   └── src/
│       ├── pages/            # Dashboard · Control · Historial · Configuración
│       ├── components/       # Componentes reutilizables
│       └── services/         # Llamadas a la API
│
├── backend/
│   └── src/com/ecoswitch/app/
│       ├── main.py           # Punto de entrada FastAPI + CORS + rutas
│       ├── database/
│       │   └── repository.py # Motor + MongoDB Atlas
│       ├── models/
│       │   ├── user.py       # Documento User
│       │   └── device.py     # Documento Device y PowerRecord
│       ├── schemas/
│       │   └── schemas.py    # Validación Pydantic
│       └── services/
│           ├── relay_service.py        # Control del relé vía MQTT
│           ├── auth_service.py         # bcrypt + JWT
│           └── google_auth_service.py  # OAuth2 Google
│
└── firmware/
    └── ecoswitch_esp32/
        ├── main.ino              # Lógica principal
        ├── relay_control.h       # Corte automático AC
        ├── neopixel_status.h     # Anillos LED
        └── wifi_mqtt.h           # Conectividad Wi-Fi + MQTT
```

---

## 📡 Endpoints API

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/register` | Registro con email y contraseña |
| `POST` | `/login` | Login con email y contraseña |
| `POST` | `/auth/google/register` | Registro con cuenta Google |
| `POST` | `/auth/google/login` | Login con cuenta Google |

### Control del dispositivo

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/device/toggle` | Activar o desactivar una toma específica |
| `GET` | `/device/status/{device_id}` | Estado actual de todas las tomas y LEDs |
| `POST` | `/device/schedule` | Programar corte automático por tiempo |
| `DELETE` | `/device/schedule/{id}` | Cancelar una programación activa |

### Historial y analítica

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/history/{email}` | Historial de sesiones de carga del usuario |
| `GET` | `/analytics/{email}` | Resumen de consumo energético por período |

---

## 🧰 Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 · TypeScript · Tailwind CSS · Vite |
| Backend | FastAPI 0.115 · Python 3.12 · Pydantic |
| Base de datos | MongoDB Atlas · Motor async · Beanie 1.30 |
| Microcontrolador | ESP32 · Arduino Framework · MQTT · NeoPixel |
| Hardware | Relé AC · Sensor de corriente · Tomas NEMA 5-15R · Fuente AC switching |
| Autenticación | bcrypt · Google OAuth2 · JWT |
| Despliegue | Vercel para frontend · Render para backend |
| Modelado 3D | Autodesk Fusion 360 |
| Fabricación | Impresión 3D en PLA translúcido · Corte láser en madera |

---

## 🖥️ Vistas y funcionalidades

| Vista | Qué hace |
|-------|----------|
| **Dashboard** | Estado en tiempo real de cada toma del dodecaedro con indicadores visuales |
| **Control remoto** | Activar o desactivar individualmente cada puerto de carga desde cualquier lugar |
| **Historial** | Registro de sesiones de carga con timestamps y consumo estimado |
| **Análisis** | Gráficas de consumo energético por período |
| **Configuración** | Umbrales de corte automático, objetivos de carga y preferencias de notificación |

---

## 🔬 Evolución del prototipo

El proyecto vivió tres iteraciones reales antes de llegar al dodecaedro. Cada una resolvió algo que la anterior no podía.

| | 🟤 LOW | 🔵 MID | 🟢 MID-HI · PMV Final |
|-|--------|--------|----------------------|
| **Forma** | Caja rectangular 6x4x3 cm | Enchufe giratorio 360° NEMA 5-15P | Dodecaedro 12 caras pentagonales |
| **Electrónica** | ESP32 + relé + LED simple | ESP32 + relé + LEDs duales + shunt sensor | ESP32 + 2x anillo NeoPixel + fuente AC switching + relé |
| **Tomas** | 1 toma hembra básica | 1 toma NEMA + estación USB complementaria | 3x NEMA 5-15R integradas en caras + bloque USB |
| **Conectividad** | Wi-Fi básico | Wi-Fi + Bluetooth | Wi-Fi + BT + MQTT + WebSocket |
| **Carcasa** | Boceto 3D · sin fabricar | ABS blanco · planos técnicos completos | PLA translúcido superior + PLA opaco inferior |
| **App** | Mockup de pantallas | Wireframes funcionales | App React desplegada en Vercel |
| **Norma** | Sin certificación | RETIE referenciado | RETIE · NTC 2050 · IEC 60335-1 |
| **Estado** | Concepto validado | Prototipo funcional | PMV físico y digital operativo |

---

### 🟤 Prototipo LOW

Los primeros bocetos planteaban un módulo compacto que se intercalara entre el cargador y la pared. El foco era validar la lógica eléctrica básica: ESP32 conectado a un relé, un LED indicador y un sensor de corriente para detectar fin de carga. Simple, directo, funcional.

<div align="center">
  <img src="images/prototipo-low.png" alt="Prototipo LOW · Boceto inicial" width="70%"/>
</div>

---

### 🔵 Prototipo MID

La segunda versión escaló hacia un enchufe inteligente con cabezal giratorio 360°. Se incorporaron indicadores LED duales, cable flexible SJT 3x14 AWG de 150 cm y una estación de carga complementaria con puertos USB-C PD y USB-A. Los planos técnicos llegaron a tener vistas frontal, lateral y corte transversal A-A' con dimensiones reales.

<div align="center">
  <img src="images/prototipo-mid.png" alt="Prototipo MID · Enchufe giratorio 360°" width="70%"/>
</div>

---

### 🟢 Prototipo MID-HI · PMV Final

El salto al dodecaedro fue el más grande del proyecto, no solo en forma sino en complejidad técnica. Las fases 6 y 7 del ensamblaje integraron el bus periférico de cableado radial, la gestión de potencia a múltiples tomas, la unión mecánica de las caras translúcidas y el cierre final del sólido con todos los componentes adentro funcionando.

<div align="center">
  <img src="images/prototipo-mid-hi.png" alt="Prototipo MID-HI · PMV Final encendido" width="70%"/>
</div>

---

## ⚡ Instalación local

### Backend · FastAPI

```bash
# 1. Clonar el repositorio
git clone https://github.com/ecoswitch/ecoswitch-backend.git
cd ecoswitch-backend

# 2. Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate        # Mac · Linux
.\venv\Scripts\activate         # Windows

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 5. Levantar el servidor
uvicorn src.com.ecoswitch.app.main:app --reload
```

La API queda disponible en `http://localhost:8000` y la documentación interactiva en `http://localhost:8000/docs`.

---

### Frontend · React

```bash
# 1. Clonar el repositorio
git clone https://github.com/ecoswitch/ecoswitch-frontend.git
cd ecoswitch-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con la URL del backend

# 4. Levantar en desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

---

### Firmware · ESP32

```bash
# Requisitos: Arduino IDE 2.x con soporte ESP32

# 1. Abrir ecoswitch_esp32/main.ino en Arduino IDE

# 2. Instalar librerías necesarias desde el Library Manager
#    Adafruit NeoPixel
#    PubSubClient · MQTT
#    ArduinoJson

# 3. Editar wifi_mqtt.h con tus credenciales
#    WIFI_SSID · WIFI_PASSWORD · MQTT_BROKER · MQTT_PORT

# 4. Seleccionar placa: ESP32 Dev Module
#    Upload Speed: 115200

# 5. Flashear con Sketch > Upload
```

---

## 🔐 Variables de entorno

### Backend

Crear un archivo `.env` en la raíz del proyecto backend:

```env
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/ECOSWITCH_DB
GOOGLE_CLIENT_ID=tu_google_oauth_client_id
JWT_SECRET=tu_secreto_jwt
PORT=8000
PYTHON_VERSION=3.12
```

| Variable | Descripción |
|----------|-------------|
| `MONGO_URI` | Cadena de conexión a MongoDB Atlas |
| `GOOGLE_CLIENT_ID` | Client ID de Google Cloud Console |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |
| `PORT` | Puerto del servidor · Render lo asigna automáticamente |

### Frontend

Crear un archivo `.env.local` en la raíz del proyecto frontend:

```env
VITE_API_URL=https://tu-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=tu_google_oauth_client_id
```

### Firmware

Editar directamente `wifi_mqtt.h`:

```cpp
#define WIFI_SSID       "tu_red_wifi"
#define WIFI_PASSWORD   "tu_contraseña"
#define MQTT_BROKER     "tu_broker_mqtt"
#define MQTT_PORT       1883
#define DEVICE_ID       "ecoswitch_01"
```

---

## 🗺️ Tríptico 1 · Proceso del proyecto

### 🧠 Mapa mental

El mapa mental del proyecto articula tres ejes: **Usuario** con capacidades físicas, riesgos y experiencia digital; **Acciones** de conectar y desconectar de forma remota; y **Entorno** con lugares que tienen enchufes eléctricos, condiciones físicas de uso y normatividad RETIE, NTC e IEC.

> 🔗 [Ver Mapa Mental en LucidChart](https://lucid.app/lucidchart/cc35df14-a85d-416f-aea7-ed194f4b500b/edit?invitationId=inv_7afff581-e5d5-46d7-87e0-97dda95f3b10&page=0_0#)

---

### 📊 Canvas del modelo de negocio

EcoSwitch tiene un canvas con socios clave como fabricantes de componentes y laboratorios de certificación RETIE/ICONTEC, una propuesta de valor centrada en desconexión automática + ahorro energético + diseño diferencial, y segmentos de clientes que abarcan usuarios domésticos, estudiantes y profesionales con múltiples dispositivos.

> 🔗 [Ver Canvas del modelo de negocio](https://canva.link/6v7tgqcdu6fy7og)

---

## 🔧 Tríptico 2 · Desarrollo del producto

### 📐 Esquema básico

El esquema detalla la arquitectura eléctrica del dispositivo: cabezal macho NEMA con Fase, Neutro y Tierra hacia el relé de corte y luego a la toma hembra, con el ESP32 como cerebro central, diodo de protección y resistencia 220Ω para el LED indicador.

> 🔗 [Ver Esquema Básico en LucidChart](https://lucid.app/lucidchart/cc35df14-a85d-416f-aea7-ed194f4b500b/edit?invitationId=inv_7afff581-e5d5-46d7-87e0-97dda95f3b10&page=3vQSn0uL1Zla#)

---

### 💥 Diagrama de partes

Vista isométrica con cortes del dodecaedro mostrando la distribución interna: PCB principal, anillos NeoPixel, ESP32, relé, bloque USB, indicadores LED, tomas NEMA 5-15R y gestión de cableado radial del bus periférico.

> 🔗 [Ver Diagrama de Partes en LucidChart](https://lucid.app/lucidchart/cc35df14-a85d-416f-aea7-ed194f4b500b/edit?invitationId=inv_7afff581-e5d5-46d7-87e0-97dda95f3b10&page=mKhOC_4ZjNGT#)

---

### 🖥️ Modelado 3D · Autodesk Fusion 360

Todos los componentes del dodecaedro fueron modelados en Fusion 360, desde las piezas eléctricas individuales hasta el ensamblaje final. Los archivos `.f3d` están disponibles para descarga en la carpeta `files/`.

<br/>

**Componentes eléctricos**

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="images/nema.png" width="200px" alt="NEMA Macho y Hembra"/><br/>
        <sub><b>NEMA Macho y Hembra</b></sub>
      </td>
      <td align="center">
        <img src="images/tomacorriente.png" width="200px" alt="Toma Corriente"/><br/>
        <sub><b>Toma Corriente</b></sub>
      </td>
      <td align="center">
        <img src="images/rele.png" width="200px" alt="Relé de corte"/><br/>
        <sub><b>Relé de corte</b></sub>
      </td>
    </tr>
  </table>
</div>

<br/>

**Iluminación y conectividad**

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="images/leds.png" width="200px" alt="Anillos LED NeoPixel"/><br/>
        <sub><b>Anillos LED NeoPixel</b></sub>
      </td>
      <td align="center">
        <img src="images/enchufe360.png" width="200px" alt="Enchufe 360°"/><br/>
        <sub><b>Enchufe 360°</b></sub>
      </td>
    </tr>
  </table>
</div>

<br/>

**Ensamblaje final**

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="images/dodecaedro.png" width="300px" alt="Dodecaedro · Vista general"/><br/>
        <sub><b>Dodecaedro · Vista general</b></sub>
      </td>
      <td align="center">
        <img src="images/ecoswitch.png" width="300px" alt="EcoSwitch · Ensamblaje completo"/><br/>
        <sub><b>EcoSwitch · Ensamblaje completo</b></sub>
      </td>
    </tr>
  </table>
</div>

<br/>

**Archivos de modelado disponibles**

| Archivo | Descripción |
|---------|-------------|
| [📁 Descargar · nema.f3d](files/nema.f3d) | Conector NEMA macho y hembra |
| [📁 Descargar · tomacorriente.f3d](files/tomacorriente.f3d) | Toma corriente integrada |
| [📁 Descargar · rele.f3d](files/rele.f3d) | Módulo relé de corte AC |
| [📁 Descargar · leds.f3d](files/leds.f3d) | Anillos LED NeoPixel |
| [📁 Descargar · enchufe360.f3d](files/enchufe360.f3d) | Enchufe giratorio 360° |
| [📁 Descargar · dodecaedro.f3d](files/dodecaedro.f3d) | Cuerpo dodecaédrico completo |
| [📁 Descargar · ecoswitch.f3d](files/ecoswitch.f3z) | Ensamblaje final EcoSwitch |

---

## 📌 Notas de despliegue

- El backend está en **Render free tier** y puede tardar hasta 50 segundos en responder tras inactividad.
- El firmware del ESP32 no se versiona en binario compilado. Se genera localmente con Arduino IDE.
- Las caras translúcidas actúan como difusores de luz para el modo lámpara, sin necesidad de piezas adicionales.
- El CORS del backend acepta requests desde `localhost:5173` y el dominio de Vercel del frontend.

---

<div align="center">

<br/>

**EcoSwitch** · Escuela Colombiana de Ingeniería Julio Garavito · 2026-1

*Prototipado Físico y Digital · ADMI PRTO-1 · Decanatura Administración de Empresas*

<br/>

![Made with love](https://img.shields.io/badge/Hecho_con-muchísimo_esfuerzo-ff6b6b?style=flat-square)
![Dodecahedron](https://img.shields.io/badge/Forma-Dodecaedro_Regular-6366f1?style=flat-square)
![Colombia](https://img.shields.io/badge/Hecho_en-Colombia_🇨🇴-FCD116?style=flat-square&labelColor=003087)

<br/>

</div>