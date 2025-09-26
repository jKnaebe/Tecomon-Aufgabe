## 🌍 Projektübersicht

Dieses Projekt besteht aus einem **Fullstack-Wetter-Widget-System** mit **Frontend und Backend**.

- Das **Backend** ist mit **Node.js**, **Express** und **MongoDB (Mongoose)** umgesetzt.  
  Es ruft aktuelle Wetterdaten (Temperatur & Windgeschwindigkeit) über die **[Open-Meteo API](https://open-meteo.com/)** ab, speichert diese in einer Datenbank und stellt sie über eine **REST API** bereit.  
  Zudem werden die Daten für 5 Minuten gecached, um unnötige API-Anfragen zu vermeiden.

- Das **Frontend** ist mit **React (Next.js)** gebaut und kommuniziert über HTTP-Anfragen mit dem Backend.  
  Es ermöglicht das **Hinzufügen und Löschen von Städten** sowie die **Anzeige der aktuellen Wetterinformationen** in einer benutzerfreundlichen Oberfläche.

---

## 🚀 Setup-Anleitung

### Voraussetzungen:

- Node.js (v18+ empfohlen)
- MongoDB (Projekt wurde über MongoDB Atlas erstellt)
- NPM

### 1. Repository klonen

```bash
# Repository klonen
git clone <REPO_URL>
cd <REPO_NAME>
```

### 2. Backend starten

```bash
# Ins Backend wechseln
cd backend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

> 💡 Die App benötigt eine .env Datei im Projektverzeichnis. Beispiel `.env`-Datei:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/<DATABASE_NAME>?retryWrites=true&w=majority&appName=<APP_NAME>
```

> 💡 Das Backend sollte unter `http://localhost:5000` erreichbar sein

---

### 3. Frontend starten

```bash
# Ins Frontend wechseln
cd frontend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

> 💡 Standardmäßig läuft das Frontend unter `http://localhost:3000`  

---

## 📡 API-Beschreibung

### Basis-URL

```bash
http://localhost:5000/api/widgets
```

---

### GET /api/widgets

Gibt eine Liste aller gespeicherten Städte (Widgets) zurück, inklusive aktueller Wetterdaten.

**ResponsResponse-Beispiel (200 OK):**

```json
[
  {
    "_id": "651f2c7a91a43c8b0e8d0f21",
    "city": "Berlin",
    "temperature": 18.5,
    "windspeed": 12.3,
    "updatedAt": "2024-09-23T10:15:30.123Z",
    "weather": {
      "city": "Berlin",
      "temperature": 18.5,
      "windspeed": 12.3
    }
  }
]
```

---

### POST /api/widgets

Fügt eine neue Stadt hinzu oder aktualisiert sie, falls sie schon existiert.

**Request-Body:**

```json
{
  "city": "Berlin"
}
```

**Response-Beispiel (201 Created):**

```json
{
  "_id": "651f2c7a91a43c8b0e8d0f21",
  "city": "Berlin",
  "temperature": 18.5,
  "windspeed": 12.3,
  "updatedAt": "2024-09-23T10:15:30.123Z",
  "__v": 0
}
```

Fehler (400 Bad Request), wenn keine city angegeben wurde:

```json
{
  "error": "city benötigt"
}
```

---

### DELETE /api/widgets/:id

Löscht ein Widget anhand seiner MongoDB-ID.

**Beispiel:**

```bash
DELETE /api/widgets/651f2c7a91a43c8b0e8d0f21
```

**Response:**

- **204 No Content**, bei Erfolg
- **500 Internal Server Error**, falls etwas schiefgeht

---

## 📦 Projektstruktur

```txt
/project-root
├── backend/          → Node.js, Express, MongoDB (Mongoose)
│   ├── models/
│   ├── routes/
│   ├── services/     → Wetterdaten-Logik inkl. Caching
│   └── server.js
├── frontend/         → React (Next.js)
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
└── README.md
```
