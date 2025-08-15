# Copilot Instructions pentru MiniDeutsch

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

Aceasta este o aplicație educațională React Native cu Expo pentru copii români din Germania să învețe limba germană și matematică.

## Personaje principale:
- **Björn der Bär** 🐻 - Naratorul principal, voce caldă, paternală
- **Emma die Ente** 🦆 - Specialista pronunție, voce melodioasă, prietenească  
- **Max der Hase** 🐰 - Maestrul jocurilor, voce energică, jucăușă

## Structura aplicației:
- **Germană**: 8 zone cu 25 lecții fiecare (200 total)
- **Matematică**: 3 nivele cu 50 exerciții fiecare (150 total)
- **Sistemul de recompense**: stele, badge-uri, puncte
- **Progres**: salvare locală cu AsyncStorage + backup Supabase

## Tehnologii folosite:
- React Native cu Expo
- React Navigation pentru navigare
- Expo Audio pentru sistem audio pre-înregistrat
- AsyncStorage pentru salvare locală
- Supabase pentru backend
- Lottie pentru animații recompense

## Ghiduri de dezvoltare:
- Interfața să fie în română
- Conținutul educațional bilingv (română-germană)
- Fără voice recognition - doar audio pre-înregistrat
- Modularitate pentru adăugare ușoară de conținut
- Focus pe experiența utilizatorului copil
