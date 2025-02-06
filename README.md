# MnemosineFrontend

Mnemosine è un'applicazione web sviluppata per supportare la diagnosi e il monitoraggio dei pazienti affetti dal morbo di Alzheimer. Questo progetto è stato creato utilizzando [Angular CLI](https://github.com/angular/angular-cli) versione 17.1.0.

## Sviluppo

Il progetto include un file `.gitignore`, che impedisce di aggiungere file non necessari al repository, mantenendo il progetto snello e facile da gestire. Per lavorare su questo progetto, è sufficiente utilizzare un IDE (Ambiente di Sviluppo Integrato) come `Visual Studio Code` (altamente consigliato) o `Atom`.

### Prerequisiti

Prima di iniziare, assicurati che sul tuo computer siano installati i seguenti strumenti:

1. [Node.js](https://nodejs.org) (versione LTS consigliata)
2. [npm](https://www.npmjs.com) (il gestore di pacchetti di Node.js)

È consigliato, inoltre, avere [Git](https://git-scm.com) per sincronizzare facilmente il progetto con il repository remoto su GitHub.

### Clonare il Progetto

Per scaricare il progetto sul tuo computer, apri il terminale e esegui il seguente comando:

```bash
git clone https://github.com/is-sobrero/mnemosineFE.git
```

Successivamente, entra nella cartella del progetto:

```bash
cd mnemosineFE
```

### Installare le Dipendenze

Una volta scaricato il progetto, esegui il comando seguente per installare tutte le dipendenze necessarie:

```bash
npm install
```

### Avviare il Server di Sviluppo

Per avviare l'applicazione in modalità sviluppo, esegui:

```bash
npm run start
```

Il server di sviluppo sarà avviato e l'applicazione sarà accessibile all'indirizzo: [http://localhost:4200](http://localhost:4200).

Alternativamente, se desideri utilizzare il comando Angular CLI direttamente, puoi installarlo globalmente con:

```bash
npm install -g @angular/cli
```

E poi avviare il server con:

```bash
ng serve
```

### Creare Nuovi Componenti

Per generare un nuovo componente, puoi usare il comando:

```bash
ng generate component nome-componente
```

Puoi anche generare altri tipi di entità come direttive, pipe, servizi, classi, guardie, interfacce, enum e moduli, ad esempio:

```bash
ng generate directive nome-direttiva
ng generate pipe nome-pipe
```

### Costruire il Progetto

Per creare una versione ottimizzata del progetto per la produzione, esegui:

```bash
ng build
```

I file compilati saranno salvati nella cartella `dist/`.

### Eseguire i Test Unitari

Per eseguire i test unitari, utilizza il comando:

```bash
ng test
```

Questo avvierà Karma, uno strumento di test per il codice Angular, per eseguire i test definiti nel progetto.

### Eseguire i Test End-to-End

Per eseguire i test end-to-end (E2E), che simulano l'interazione dell'utente con l'app, usa il comando:

```bash
ng e2e
```

Prima di eseguire i test E2E, è necessario configurare un pacchetto di test specifico per questo scopo.

## Linee Guida per gli Asset

1. **Lessico e Immagini**: Le parole e le immagini vengono create internamente per garantire coerenza.
2. **Caratteristiche**: Evitiamo l'uso di foto, preferendo illustrazioni.
3. **Tematiche**: Le illustrazioni si concentrano su scene di vita quotidiana, animali e elementi naturali.
4. **Lunghezza delle Parole**: Preferiamo parole di almeno 5 caratteri per facilitare la lettura.

## Ulteriori Risorse

Per ulteriori dettagli sull'uso di Angular CLI, puoi consultare il comando:

```bash
ng help
```

E visita la documentazione ufficiale di Angular CLI: [Angular CLI Overview and Command Reference](https://angular.io/cli).

---

Per facilitare lo sviluppo e migliorare la produttività quando si lavora con Angular, è consigliato di utilizzare alcune estensioni per **Visual Studio Code**. Queste estensioni ti aiuteranno a scrivere codice più rapidamente, a evitare errori comuni e a mantenere il progetto ben organizzato.

### Estensioni Consigliate

1. **Angular Essentials**
   - **Descrizione**: Un pacchetto che include una serie di estensioni utili per lavorare con Angular, tra cui IntelliSense per i moduli Angular e i componenti.
   - **Link**: [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)
2. **Angular Language Service**

   - **Descrizione**: Fornisce supporto IntelliSense, errori e suggerimenti direttamente nei template di Angular. È molto utile per ottenere autocompletamento e rilevamento degli errori nei file `.html` e `.ts`.
   - **Link**: [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

3. **Prettier - Code formatter**

   - **Descrizione**: Un formattatore di codice che assicura che il tuo codice sia scritto in modo coerente, con uno stile uniforme, evitando errori di formattazione.
   - **Link**: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

4. **TSLint**

   - **Descrizione**: Un'estensione che aiuta a mantenere alta la qualità del codice TypeScript, evidenziando i potenziali errori e le incongruenze nel codice, in modo da poterli correggere prima che diventino un problema.
   - **Link**: [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

5. **Bracket Pair Colorizer 2**

   - **Descrizione**: Colora le parentesi corrispondenti per facilitare la lettura del codice e la gestione delle strutture annidate (ad esempio, nei componenti e nei template Angular).
   - **Link**: [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)

6. **Path Intellisense**

   - **Descrizione**: Aggiunge l'autocompletamento delle importazioni di file e percorsi nel tuo progetto Angular, riducendo gli errori dovuti a percorsi di file sbagliati.
   - **Link**: [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

7. **GitLens**
   - **Descrizione**: Potenzia il supporto di Git in Visual Studio Code, rendendo più facile capire la cronologia dei commit, le modifiche nel codice e chi ha fatto cosa.
   - **Link**: [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

### Configurazioni Aggiuntive

- **Escludere la cartella `node_modules` da Prettier e TSLint**: Assicurati che la cartella `node_modules` venga esclusa dalle estensioni di formattazione e linting per evitare problemi di prestazioni.
- **Configurare Prettier**: Puoi aggiungere un file di configurazione `.prettierrc` per personalizzare lo stile di formattazione del codice in base alle preferenze del team.
- **Formattazione**: Per formattare automaticamente il codice, puoi utilizzare lo shortcut di `Ctrl+Shift+F` (Windows), `Cmd+Shift+F` (macOS) o `Ctrl+SHift+I` (Linux). È richiesto un codice pulito e leggibile.

Queste estensioni ti aiuteranno a lavorare in modo più efficiente e a mantenere il codice più pulito e organizzato.

## Licenza

Questo progetto è concesso in licenza sotto la Licenza MIT. Puoi utilizzare, modificare e distribuire il codice, a condizione che venga mantenuto il copyright e la dichiarazione di licenza nelle copie del software o nelle versioni modificate.

## Contribuire

Questo progetto è aperto esclusivamente agli **studenti dell'IS A. Sobrero di Casale Monferrato**. Se sei uno studente di questa scuola e desideri contribuire al progetto, segui questi passaggi:

1. **Clona il repository**: Usa il comando `git clone` per scaricare il progetto sul tuo computer.
2. **Crea una nuova branch**: Prima di iniziare a lavorare su una modifica, crea una nuova branch per separare il tuo lavoro dalle modifiche principali.
3. **Fai le modifiche**: Apporta le modifiche necessarie al codice o aggiungi nuove funzionalità.
4. **Testa il tuo codice**: Assicurati che il tuo codice funzioni correttamente eseguendo i test unitari e/o E2E.
5. **Crea una Pull Request (PR)**: Quando hai finito, invia una pull request per proporre le tue modifiche. Descrivi nel dettaglio cosa hai cambiato e perché.

> Per favore, assicurati di seguire le linee guida di codifica del progetto e di rispettare sempre il codice etico e le linee guida interne della scuola.

### Linee guida per il Contributo

- Segui le convenzioni di codifica del progetto.
- Assicurati che il codice sia ben documentato e comprensibile.
- Prima di fare una pull request, assicurati che tutte le modifiche siano testate e funzionanti.
- Rispetta sempre il codice etico e le linee guida interne della scuola.

Se non sei uno studente dell'IS A. Sobrero, purtroppo non possiamo accettare il tuo contributo al progetto, ma ti ringraziamo comunque per l'interesse!

## Contatti

Se hai domande o hai bisogno di supporto, non esitare a [contattarci](https://github.com/is-sobrero/mnemosineFE/issues) aprendo un nuovo "Issue" su GitHub. Saremo felici di aiutarti!
Se hai domande più specifiche sulla documentazione, contatta [Ornitorink0](matteogurri1@gmail.com).
