---
author: Alessandro Misurale
date: 22/07/2024
---


## Note di sviluppo

Nel tentare di implementare la poossibilità di ascoltare le parole da completare ho pensato all'utilizzo della
funzione Text-To-Speech di googleTranslate e in qualche modo integrarla nel sistema.

Il primo tentativo è stato quelli di utilizzare direttamente l'URL e comporlo con il messaggio che desideravo per poi
utilizzarlo come link da includere nel player, per il resto l'esercizio è strutturalmente simile al 401.

Il problema di questa implementazione risiede nei cockie di terze parti che vengono bloccati in automatico qual'ora tento di stabilire una connessione remota con i server di Translate.

Siccome non era possibile evadere il problema ho deciso di guardare e provare diversi pacchetti npm che utilizzavano
la funzione text to speech. Come prima opzione ho tentato direttamente una generazione di URL con il pacchetto "google-tts-api", che però restituiva un'errore utilizzandolo con TypeScript, errore relativo alla struttura del 
linguaggio che non permetteva di utilizzare gli import dinamici di Javascript e altre funzionalità.

Allora come alternativa ho provato a utilizzare il pacchetto "@google-cloud/text-to-speech" che offre direttamente la 
possibilità di ottenere file audio generati dinamicamente, ma ancora il problema di utilizzare un sistema simile è legato all'utilizzo di TypeScript come linguaggio. Infatti se si tenta di implementare l'applicazione con uno di 
questi metodi si viene vermati subito da un'errore relativo a TS.

Faccio notare che il problema non si è dipendente dalla presenza o meno del pacchetto "@types/node" in quanto anche se si introduce la compatibilità sintattica a livello di precompilatore tra nodejs e Typescript, viene ugualmente 
restituito un errore sull'esternalizzazione delle esportazioni da parte di Vite.

Un modo che mi viene in mente è utilizzare un js separato per utilizzare i pacchetti e poi esportarli nel Typescript per ottenere quel che si desidera.
