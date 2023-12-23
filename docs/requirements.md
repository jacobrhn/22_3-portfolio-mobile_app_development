
# Projekt Requirements

_[ >> README.md <<](../README.md)_

#### Table of Contents
- [MUST-HAVE-Anforderungen](#must-have-anforderungen)
- [Vorschläge für mögliche NICE-TO-HAVEs](#vorschläge-für-mögliche-nice-to-haves)
- [Weitere Bemerkungen](#weitere-bemerkungen)
- [Vorgehen](#vorgehen)
- [Bewertungsschema](#bewertungsschema)
    - [Schwerpunkte](#schwerpunkte)
    - [Qualität und Gesamteindruck](#qualität-und-gesamteindruck)



# Introduction
In Gruppen von 2-3 Leuten soll eine Smartphone-App entwickelt werden.
Empfohlen wird der Einsatz von React Native (siehe Online-Videokurs).
Die Gruppen legen ihr Thema für die App selbst fest oder setzen folgenden Themenvorschlag um. Dieser Vorschlag kann auch zur Orientierung des Umfangs eigener Projektideen dienen. Thema des Vorschlags ist die „Digitale Hochschullehre“. Es geht um eine App als mobiler Lernbegleiter bzw. Quiz-App mit folgenden Anforderungen, die für Gruppen mit 2 Leuten gedacht sind. Gruppen mit drei Personen erweitern diese entsprechend für einen größeren Umfang.

# Requirements
⟶ Gruppen mit 3 Leuten sollten mehr MUST-HAVE-Anforderungen festlegen als Gruppen mit 2 Leuten.
Die NICE-TO-HAVEs müssen nicht vom Dozenten bestätigt werden.
Die Abgabe erfolgt über Moodle, siehe dazu den entsprechenden Eintrag im Moodle-Kursraum.

## MUST-HAVE-Anforderungen 
_Müssen bei 3er-Gruppen und anderen Ideen vom Dozenten bestätigt werden!_
_Die folgende Liste gilt für 2 Personen und muss bei 3 Personen erweitert werden!_

#### Verwaltungsmodus
* Fragen/Antworten können erstellt, bearbeitet und gelöscht werden.
* Die Fragen werden mit „richtig“ oder „falsch“ beantwortet
#### Anwendungsmodus (hier Lernmodus)
* Die Fragen können als Quiz zum Lernen durchgearbeitet werden:
* Es wird gefragt, wie viele Fragen beantwortet werden sollen.
* Für diese Anzahl werden aus dem Thema zufällige Fragen gewählt.
* Hierbei werden nacheinander die einzelnen Fragen gestellt und dazu können Antworten eingegeben werden. Zu den Antworten gibt es passende Rückmeldungen (richtig/falsch o.ä.).
#### Weitere Vorgaben:
* Die Daten werden lokal auf dem Gerät gespeichert.
* Möglichst gut lesbarer Code mit Kommentaren an relevanten, nicht-trivialen Stellen und einheitlicher Code-Struktur.
## Vorschläge für mögliche NICE-TO-HAVEs 
_Müssen nicht vom Dozenten bestätigt werden_
* Fragen/Antworten gehören zu Kategorien (oder Themen bzw. Kurse) — diese stehen für beliebige Themen oder Vorlesungsinhalte, die jemand lernen möchte (Beispiele: Englisch, Geographie, Marketing, Kotlin, Algorithmen, etc.). Kategorien enthalten beliebig viele Fragen.
* Komplexe Logik zum Lernen (Zählen der Lernversuche für bestimmte Kategorien, Erinnerungen, Statistiken, etc.),
Fragen mit formatiertem Text, Bildern, etc.,
* Weitere Fragetypen: Multiple Choice, Lückentext, freie Texteingabe, usw.
* Daten in der Cloud (z.B. mit Firebase, automatische Synchronisierung, offline-Fähigkeit),
* (Push)-Notifications,
* Testing (Unit, UI),
* Einsatz mobiler Gerätefunktionen (Sensoren, Kamera, Augmented Reality, etc.),
* oder eigene Ideen.
* Falls für die App ein Backend benötigt wird, dann sollte möglichst ein vorgefertigtes „Backend-As-A-Service” aus der Cloud benutzt werden (wie z.B. Firebase, Supabase oder eines der vielen weiteren Angebote). Der Schwerpunkt dieser Veranstaltung liegt auf der Programmierung der mobilen App, sodass die Entwicklung eines eigenen Backends vermieden werden sollte. Ein extra für die App entwickeltes Backend wird bei der Bewertung nicht als „Nice-To-Have“-Anforderung berücksichtigt, allerdings kann sich ein fehlerhaftes Backend nachteilig auf die Bewertung des Gesamteindrucks auswirken (siehe Bewertungsschema).

## Weitere Bemerkungen
Die Gestaltung und den Aufbau der Apps können die Gruppen selbst bestimmen.
Bei den zusätzlichen Nice-To-Haves können eigene Ideen umgesetzt werden.
Gruppen mit 3 Leuten sollten mehr MUST-HAVE-Anforderungen festlegen als Gruppen mit 2 Leuten.

# Vorgehen
1. Gruppen mit 2-3 Personen bilden (siehe Gruppenbildung in Moodle).
2. In der Gruppe die App-Idee herausarbeiten.
3. Skizzen oder Mockups zur App-Idee erstellen (evtl. mit einem der vielen Prototyping-Tools wie z.B. Excalidraw oder Figma, oder …) _Mockups/Skizzen im Kurs kurz vorstellen (Termin wird bekannt gegeben, siehe Moodle)_
4. Projekt in GitHub/GitLab einrichten (Zugang für Dozenten bei privaten Repositories ermöglichen, GitHub: @behrends, GitLab: @ebehrends).
5. Eigene App-Ideen und Anforderungen mit Dozenten besprechen, der diese bestätigt.

# Bewertungsschema
In der Regel wird eine Gruppennote vergeben. Individuelle Punktabzüge sind möglich, falls Gruppenmitglieder z.B. deutlich weniger Beiträge zum Code geliefert haben.

Die Bewertung setzt sich wie aus folgendem Bewertungsschema zusammen (100 Punkte = 1.0, siehe Punkte/Notenskala des SZI):

## Schwerpunkte
Maximale Punktzahl|Kategorie|Beschreibung
-------------------|-------------------|-------------------
60|MUST-HAVEs|korrekte und vollständige Umsetzung der vereinbarten Anforderungen
20|NICE-TO-HAVEs|mehrere nicht-triviale, zusätzliche Funktionalitäten
20|Qualität und Gesamteindruck|_siehe unten_

## Qualität und Gesamteindruck
Die Bewertungskategorie „Qualität und Gesamteindruck“ ergibt sich aus den folgenden Aspekten:
Aspekt|Beschreibung
-|-
Lesbarkeit|Können andere, außenstehende Programmierer den Code gut nachvollziehen? (Kommentare sollten komplexere Passagen erläutern)
Aufbau|Ist eine strukturierte Unterteilung mit klaren Zuständigkeiten der Programmteile erkennbar (Verzeichnisse/Packages/Architektur/…, Komponenten/Screens/Klassen/…, Funktionen/Methoden)?
Programmierstil|Ist der Code übersichtlich und einheitlich geschrieben (z.B. Klammern, Einrückung, Schreibweise der Bezeichner für Variablen u.a.)? Werden bekannte Konventionen eingehalten?
Bedienung|Läuft das Programm fehlerfrei, stabil und flüssig? Hinweise: Für komplexere oder nicht offensichtliche Abläufe bzgl. der Bedienung in den Apps muss eine kurze Anleitung geliefert werden.
Eindruck|Wirken das Programm und der Code fertig und aufgeräumt oder entsteht an manchen Stellen der Eindruck, dass nur das Nötigste umgesetzt wurde?

**⟶ Wenn es in den oben genannten Bereichen wesentliche Mängel gibt, dann führt dies zu Punktabzügen in der Bewertungskategorie „Qualität und Gesamteindruck“**

Durch KI-Tools wie z.B. ChatGPT, GitHub Copilot oder Replit AI kann inzwischen mit wenig Aufwand sichergestellt werden, dass der Programmcode etablierte Konventionen und „best practices“ einhält. Der Einsatz dieser Tools ist ausdrücklich erlaubt und daher wird eine hohe Qualität des Codes und der App allgemein erwartet.

