# Componente UI - MiniDeutsch

Acest folder conține componentele reutilizabile pentru interfața aplicației MiniDeutsch.

## Componente Disponibile

### CharacterCard
Afișează un card frumos pentru personajele din aplicație (Björn, Emma, Max).

**Props:**
- `character` (object): Obiectul personaj cu `name`, `emoji`, `role`, `colors`
- `onPress` (function): Callback pentru când este apăsat card-ul
- `style` (object): Stiluri suplimentare pentru card

### ProgressCard  
Afișează progresul unui modul educațional (Germană sau Matematică).

**Props:**
- `title` (string): Titlul modulului
- `progress` (number): Progresul curent
- `total` (number): Totalul de lecții/exerciții
- `onPress` (function): Callback pentru navigare
- `colors` (array): Culorile pentru gradient

### LevelButton
Buton pentru afișarea unui nivel/lecție cu starea acestuia.

**Props:**
- `level` (number): Numărul nivelului
- `isUnlocked` (boolean): Dacă nivelul este deblocat
- `isCompleted` (boolean): Dacă nivelul este completat
- `progress` (number): Progresul ca procent (0-100)
- `onPress` (function): Callback pentru intrarea în nivel
- `style` (object): Stiluri suplimentare

### RewardDisplay
Afișează recompensele utilizatorului (stele, monezi, streak, badge-uri).

**Props:**
- `stars` (number): Numărul de stele câștigate
- `coins` (number): Numărul de monezi
- `streak` (number): Numărul de zile consecutive
- `badges` (array): Array cu badge-urile câștigate
- `style` (object): Stiluri suplimentare

## Import

```javascript
import { CharacterCard, ProgressCard, LevelButton, RewardDisplay } from '../components';
```

Toate componentele sunt optimizate pentru tema aplicației și includ animații subtile și efecte vizuale.
