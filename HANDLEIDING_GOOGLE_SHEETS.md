# Handleiding: Atelier Prikklok & Google Sheets Koppeling

Met deze prikklok kunnen gebruikers in het atelier snel hun aanwezigheid registreren via een cijfercode.
De app werkt zowel **online als offline** en is geoptimaliseerd voor **iPads en tablets**.

---

## 1. De Kiosk openen op een iPad (Volledig Scherm / Kiosk Modus)

1. Open **Safari** op de iPad en surf naar het HTML-bestand (of host het via GitHub Pages, lokale webserver, of Google Drive / Netlify).
2. Tik onderaan of bovenaan op het **Deel-icoon** (het vierkantje met de pijl omhoog).
3. Scroll naar beneden en kies **"Zet op beginscherm"** (*Add to Home Screen*).
4. Geef het de naam **"Prikklok"** en tik op **Voeg toe**.
5. Open de app nu vanaf het beginscherm: de app opent nu in een **strakke schermvullende weergave (zonder adresbalken of navigatie)**, ideaal als vaste kiosk!

---

## 2. Google Sheets Instellen (Google Drive)

Volg deze eenmalige stappen om de Google Sheet te koppelen:

### Stap 2.1: Maak een Google Sheet aan
1. Ga naar [Google Drive](https://drive.google.com) of [Google Sheets](https://sheets.google.com).
2. Maak een nieuw leeg werkblad en noem het bijvoorbeeld: **Atelier Prikklok Registratie**.
3. Maak onderaan **twee tabbladen** aan:
   - **Tabblad 1:** `Gebruikers`
   - **Tabblad 2:** `Aanwezigheid`

#### Indeling Tabblad "Gebruikers":
Vul op rij 1 de volgende kolomtitels in:
| A (PIN) | B (Naam) | C (Actief) |
|---|---|---|
| 1234 | Jan Peeters | JA |
| 5678 | Sophie Willems | JA |
| 9012 | Luc De Smet | JA |

> **Tip:** Codes die beginnen met een `0` (bijv. `0123`) kun je in Google Sheets vooraf laten gaan door een apostrof (`'0123`) zodat Google Sheets de nul niet verwijdert.

#### Indeling Tabblad "Aanwezigheid":
Vul op rij 1 de volgende kolomtitels in (de app vult de rijen eronder automatisch aan):
| A (Datum) | B (Tijd) | C (PIN) | D (Naam) | E (Actie) | F (Inchecktijd) | G (Uitchecktijd) | H (Duur) |

---

### Stap 2.2: Google Apps Script toevoegen
1. Klik in Google Sheets bovenaan in het menu op **Uitbreidingen** -> **Apps Script** (*Extensions -> Apps Script*).
2. Verwijder alle tekst in het venster (`function myFunction() {...}`).
3. Open het meegeleverde bestand [`GoogleAppsScript.gs`](file:///c:/Users/Wim/Desktop/Antigravity%20projecten/Prikklok/GoogleAppsScript.gs) in dit project, kopieer de volledige inhoud en plak deze in het Apps Script venster.
4. Klik op het **Opslaan** icoon (diskette).

---

### Stap 2.3: Implementeren als Web-App (Cruciaal!)
1. Klik rechtsboven op de blauwe knop **Implementeren** (*Deploy*) -> **Nieuwe implementatie** (*New deployment*).
2. Klik op het tandwiel-icoon links en kies type **Web-app**.
3. Vul de instellingen in:
   - **Beschrijving:** `Atelier Prikklok API`
   - **Uitvoeren als:** `Mij` (*Me - jouw Google account*)
   - **Wie heeft toegang:** **`Iedereen`** (*Anyone*) ⚠️ *(Dit is essentieel, anders kan de iPad geen verbinding maken!)*
4. Klik op **Implementeren**.
5. Google zal vragen om autorisatie:
   - Klik op *Toegang controleren* / *Review permissions*.
   - Kies je Google account.
   - Klik op *Geavanceerd* (*Advanced*) -> *Ga naar Atelier Prikklok (onveilig)*.
   - Klik op *Toestaan* (*Allow*).
6. Je krijgt nu een **Web-app URL** die eindigt op `/exec`. Kopieer deze URL.

---

## 3. De URL koppelen in de Prikklok App

1. Open de app ([index.html](file:///c:/Users/Wim/Desktop/Antigravity%20projecten/Prikklok/index.html)).
2. Tik rechtsboven op **⚙️ Beheer**.
3. Voer de beheerdercode in (standaard: **`9999`**).
4. Ga naar het tabblad **Google Sheets**.
5. Plak je Web-app URL in het invoerveld en klik op **URL Opslaan**.
6. Klik op **Verbinding Testen** om te controleren of alles werkt.
7. Klik op **Codes importeren uit Google Sheet** om direct alle personen uit je sheet op te halen.

---

## 4. Hoe werkt het in het atelier?

1. **Aanmelden (Inchecken):**
   - De gebruiker toetst zijn/haar cijfercode in op het scherm.
   - Druk op **REGISTREER AANWEZIGHEID**.
   - Het scherm toont een groene melding: *"Welkom [Naam]! Succesvol ingecheckt om [Tijd]"*.
   - De persoon verschijnt direct in de lijst *"Nu aanwezig in het atelier"* met een live teller.
   - De actie wordt automatisch naar de Google Sheet gestuurd.

2. **Afmelden (Uitchecken):**
   - Wanneer de gebruiker vertrekt, toetst die opnieuw dezelfde code in.
   - Het scherm toont een blauwe melding: *"Tot ziens [Naam]! Uitgecheckt om [Tijd]. Aanwezig geweest: [X uur Y min]"*.
   - De persoon verdwijnt uit de lijst met aanwezigen.
   - De totale duur en uitchecktijd worden toegevoegd aan het tabblad *Aanwezigheid* in Google Sheets.

3. **Offline werking:**
   - Als de wifi op de iPad even wegvalt, kan iedereen gewoon blijven in- en uitchecken.
   - De registraties worden veilig in de wachtrij geplaatst.
   - Zodra de iPad weer wifi heeft, worden alle registraties automatisch doorgestuurd naar Google Sheets!

4. **Codes beheren:**
   - Je kunt codes toevoegen in de app zelf (via Beheer -> Codes toevoegen).
   - Óf je voegt ze toe in het Google Sheet tabblad *Gebruikers* en klikt op *Ververs uit Sheet*.

---

## 5. Atelier Leegmaken & Automatisch Uitloggen om 23:59

1. **Handmatig iedereen tegelijk uitloggen:**
   - Ga naar **⚙️ Beheer** (PIN: `9999`).
   - Bovenin tabblad **Codes & Gebruikers** zie je het aantal huidige aanwezigen.
   - Klik op de rode knop **🚪 Iedereen Nu Uitloggen**.
   - Na bevestiging worden alle aanwezigen gelijktijdig uitgecheckt:
     - De aanwezigheidslijst wordt direct leeggemaakt (0 personen).
     - Voor elke persoon wordt de gewerkte tijd berekend.
     - De uitchecks worden direct geregistreerd en gesynchroniseerd naar Google Sheets met de markering `UITCHECK (Beheer)`.

2. **Automatisch uitloggen om 23:59 (Einde van de dag):**
   - In **⚙️ Beheer** staat het vinkje **"Automatisch iedereen uitloggen om 23:59"** standaard ingeschakeld.
   - **Als de iPad aan staat:** Zodra de klok `23:59` slaat, checkt het systeem automatisch alle resterende personen uit en stuurt de registraties naar Google Sheets met de actie `UITCHECK (Auto 23:59)`.
   - **Als de iPad 's nachts op stand-by stond:** Zodra de app de volgende ochtend wordt geopend of geactiveerd, herkent het systeem eventuele achtergebleven sessies van gisteren en sluit deze automatisch netjes af op 23:59 van die dag. Zo begint elke dag gegarandeerd met een schone lei!

