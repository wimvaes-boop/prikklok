/**
 * =======================================================================
 * GOOGLE APPS SCRIPT CODE VOOR ATELIER PRIKKLOK
 * =======================================================================
 * 
 * Instructies voor installatie:
 * 1. Open Google Sheets (https://sheets.google.com) en maak een nieuw werkblad.
 * 2. Geef het bestand een naam, bijv. "Atelier Prikklok Registratie".
 * 3. Maak twee tabbladen onderaan aan:
 *    - Tabblad 1: "Gebruikers"
 *    - Tabblad 2: "Aanwezigheid"
 * 
 * 4. Vul in tabblad "Gebruikers" op rij 1 de volgende kolomkoppen in:
 *    Kolom A: PIN
 *    Kolom B: Naam
 *    Kolom C: Actief (JA of NEE)
 *    (Voeg hieronder alvast een paar gebruikers toe, bijv. A2: 1234, B2: Jan Jansen, C2: JA)
 * 
 * 5. Vul in tabblad "Aanwezigheid" op rij 1 de volgende kolomkoppen in:
 *    Kolom A: Datum
 *    Kolom B: Tijd
 *    Kolom C: PIN
 *    Kolom D: Naam
 *    Kolom E: Actie (INCHECK of UITCHECK)
 *    Kolom F: Inchecktijd
 *    Kolom G: Uitchecktijd
 *    Kolom H: Duur
 * 
 * 6. Ga in het menu naar: Uitbreidingen -> Apps Script (Extensions -> Apps Script).
 * 7. Verwijder alle bestaande code in de editor en plak onderstaande code erin.
 * 8. Klik op het blauwe knopje "Implementeren" (Deploy) rechtsboven -> "Nieuwe implementatie" (New deployment).
 * 9. Kies als type: "Web-app".
 * 10. Stel in:
 *     - Uitvoeren als: "Mij" (Me)
 *     - Wie heeft toegang: "Iedereen" (Anyone) -> HEEL BELANGRIJK!
 * 11. Klik op "Implementeren", geef eenmalig toestemming aan Google.
 * 12. Kopieer de Web-app URL (eindigt op /exec) en plak deze in de instellingen van de Prikklok app.
 */

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheetGebruikers = ss.getSheetByName("Gebruikers");
    
    // Automatisch tabblad aanmaken indien niet aanwezig
    if (!sheetGebruikers) {
      sheetGebruikers = ss.insertSheet("Gebruikers");
      sheetGebruikers.appendRow(["PIN", "Naam", "Actief"]);
      sheetGebruikers.appendRow(["1234", "Voorbeeld Gebruiker", "JA"]);
    }
    
    const data = sheetGebruikers.getDataRange().getValues();
    const gebruikers = {};
    
    // Lees rijen (sla de header over op rij 0)
    for (let i = 1; i < data.length; i++) {
      const pin = String(data[i][0]).trim();
      const naam = String(data[i][1]).trim();
      const actief = data[i][2] !== undefined ? String(data[i][2]).trim().toUpperCase() : "JA";
      
      if (pin && naam && (actief === "" || actief === "JA" || actief === "TRUE" || actief === "1")) {
        gebruikers[pin] = naam;
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      gebruikers: gebruikers,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const postData = JSON.parse(e.postData.contents);
    
    // Actie 1: Synchroniseer of bewaar gebruikerslijst vanuit app
    if (postData.action === "save_users") {
      let sheetGebruikers = ss.getSheetByName("Gebruikers");
      if (!sheetGebruikers) {
        sheetGebruikers = ss.insertSheet("Gebruikers");
      }
      
      // Bewaar headers en overschrijf gebruikers
      sheetGebruikers.clear();
      sheetGebruikers.appendRow(["PIN", "Naam", "Actief"]);
      
      const userList = postData.users || {};
      for (const [pin, naam] of Object.entries(userList)) {
        sheetGebruikers.appendRow([String(pin), String(naam), "JA"]);
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Gebruikers bijgewerkt"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Actie 2: Aanwezigheid registreren (In- of Uitcheck)
    let sheetAanwezigheid = ss.getSheetByName("Aanwezigheid");
    if (!sheetAanwezigheid) {
      sheetAanwezigheid = ss.insertSheet("Aanwezigheid");
      sheetAanwezigheid.appendRow([
        "Datum", "Tijd", "PIN", "Naam", "Actie", "Inchecktijd", "Uitchecktijd", "Duur"
      ]);
    }
    
    const datum = postData.datum || new Date().toLocaleDateString('nl-BE');
    const tijd = postData.tijd || new Date().toLocaleTimeString('nl-BE');
    const pin = postData.pin || "";
    const naam = postData.naam || "";
    const actie = postData.actie || "";
    const inchecktijd = postData.inchecktijd || "";
    const uitchecktijd = postData.uitchecktijd || "";
    const duur = postData.duur || "";
    
    sheetAanwezigheid.appendRow([
      datum,
      tijd,
      "'" + pin, // prefix met quote zodat voorloopnullen in PIN bewaard blijven
      naam,
      actie,
      inchecktijd,
      uitchecktijd,
      duur
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Aanwezigheid geregistreerd"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
