# ⏰ Atelier Vrije Grafiek — Prikklok

Een moderne, touchscreen-vriendelijke aanwezigheidsregistratie (kiosk) speciaal ontworpen voor gebruik op iPad en tablets in het **Atelier Vrije Grafiek**.

Gebruikers registreren eenvoudig hun aanwezigheid door hun persoonlijke cijfercode in te toetsen. Registraties worden automatisch doorgestuurd naar een **Google Sheet**, inclusief berekende aanwezigheidsduur en offline-buffer.

🔗 **Live Web App:** [https://wimvaes-boop.github.io/prikklok/](https://wimvaes-boop.github.io/prikklok/)

---

## ✨ Functionaliteiten

- **Snel In- en Uitchecken:**
  - Invoeren van een persoonlijke 4- tot 6-cijferige pincode.
  - **Inchecken:** Geeft een welkomstbericht met tijdstip en toont de gebruiker in de lijst met aanwezigen.
  - **Uitchecken:** Bij opnieuw intoetsen van dezelfde code wordt de gebruiker afgemeld en wordt direct de totale aanwezigheid berekend (bijv. `2u 45m`).
- **Live Aanwezigheidsoverzicht:**
  - Real-time lijst van wie er op dit moment in het atelier aanwezig is.
  - Dynamische loopteller per persoon (hoe lang is iemand al bezig).
- **Geoptimaliseerd voor iPad Kioskmodus:**
  - Grote, responsieve touch-knoppen zonder vertraging (`touch-action: manipulation`).
  - Volledig schermvullend zonder adresbalk wanneer toegevoegd aan het iOS beginscherm (*Add to Home Screen*).
- **100% Offline-Proof:**
  - Werkt lokaal via `localStorage` als de wifi in het atelier tijdelijk hapert.
  - Registraties worden in een wachtrij bewaard en automatisch gesynchroniseerd zodra er weer verbinding is.
- **Uitgebreide Beheersconsole (PIN-beveiligd, standaard `9999`):**
  - **Codes & Gebruikers beheren:** Nieuwe codes en namen toevoegen, bewerken of verwijderen.
  - **Iedereen Nu Uitloggen:** Met één druk op de knop alle actieve aanwezigen gelijktijdig uitchecken en registreren in de Google Sheet.
  - **Automatische 23:59 Einde-van-de-dag checkout:** Schakelt om 23:59 alle achtergebleven sessies automatisch uit. Bevat tevens een slimme inhaalcontrole wanneer de iPad 's nachts dichtgeklapt was.
- **Google Sheets Integratie:**
  - Live synchronisatie van de gebruikerslijst en in/uitcheckhistoriek via Google Apps Script.

---

## 📱 iPad Installatie (Kiosk / Schermvullend)

1. Open **Safari** op de iPad en surf naar:  
   👉 [https://wimvaes-boop.github.io/prikklok/](https://wimvaes-boop.github.io/prikklok/)
2. Tik bovenaan op het **Deel-icoon** (vierkantje met pijl omhoog $\uparrow$).
3. Scroll naar beneden en kies **"Zet op beginscherm"** (*Add to Home Screen*).
4. Noem de app **Atelier Vrije Grafiek** en tik op **Voeg toe**.
5. Open de app vanaf het beginscherm: de prikklok start nu **volledig schermvullend** zonder browserbalken!

---

## 📊 Google Sheets Koppeling

De prikklok koppelt direct met Google Drive via een eenvoudig **Google Apps Script**:

1. Maak een Google Spreadsheet aan met twee tabbladen:
   - `Gebruikers` (Kolommen: `PIN`, `Naam`, `Actief`)
   - `Aanwezigheid` (Kolommen: `Datum`, `Tijd`, `PIN`, `Naam`, `Actie`, `Inchecktijd`, `Uitchecktijd`, `Duur`)
2. Voeg het script uit [`GoogleAppsScript.gs`](./GoogleAppsScript.gs) toe via **Uitbreidingen $\rightarrow$ Apps Script**.
3. Implementeer het script als **Web-app** (*Toegang: Iedereen*).
4. Plak de gegenereerde Web-App URL in de beheersconsole van de app (**⚙️ Beheer $\rightarrow$ Google Sheets**).

> 💡 Zie [`HANDLEIDING_GOOGLE_SHEETS.md`](./HANDLEIDING_GOOGLE_SHEETS.md) voor de volledige stap-voor-stap handleiding.

---

## 🛠️ Projectstructuur

```text
├── index.html                  # Hoofdapplicatie (HTML5, CSS3, Vanilla JS)
├── GoogleAppsScript.gs         # Backend script voor Google Sheets
├── HANDLEIDING_GOOGLE_SHEETS.md# Uitgebreide installatiehandleiding
├── .gitignore                  # Git ignore regels
└── README.md                   # Dit bestand
```

---

## 👨‍💻 Credits

Ontwikkeld voor het **Atelier Vrije Grafiek**.  
*# another Staalvaes production.* — [wimvaes.be](https://www.wimvaes.be/)
