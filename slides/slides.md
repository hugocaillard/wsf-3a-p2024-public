---
theme: apple-basic
title: Node.js 3A P2025
titleTemplate: '%s'
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
layout: intro
---

<style>
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  div.slidev-layout h3 {
    text-transform: none;
  }
  div.slidev-layout blockquote {
    margin-top: 1.25rem;
  }
  pre.shiki-container {
    margin-top: .25rem;
  }
  pre.shiki {
    border-radius: 4px;
    box-shadow: 0px 0px 2px 2px rgba(154,154,154,0.3)
  }
  h2 + pre.shiki-container {
    margin-top: .5rem;
  }
</style>

# Développement Backend avec Node.js

<div class="mt-12">
<h2>Web School Factory</h2>
<h2>3A - P2024</h2>

2021-2022  
Hugo Caillard - [@Cohars](https://twitter.com/Cohars)

</div>

---
layout: image-right
---

# Quelques fondamentaux

- Client / Serveur ?
- Frontend / Backend ?
- JSON ?
- API ?
- API Rest ?
- API GraphQL ?
- HTTP ?

---
layout: image-right
---

# Qu'est-ce que Node.js&nbsp;?

---
layout: image-right
---

# Qu'est-ce que Node.js&nbsp;?

- Node.js est un **environnement d'exécution** de JavaScript qui repose sur le moteur V8.
- **V8 est un moteur d'exécution** de JavaScript développé par Google, il est notamment utilisé par Chrome et Node.js.
- Node.js a été présenté pour la première fois en **mai 2009** par **Ryan Dahl** et s'est très vite imposé dans le développement web.
- Il existe d'autres environnements JS : **SpiderMonkey** (Mozilla), **JavaScriptCore** (WebKit / Apple), **Deno** (alternative en Rust)

---

## Exemple de code

Créer un serveur HTTP en quelques lignes, comme l'a [présenté Ryan Dahl en 2009](https://www.youtube.com/watch?v=EeYvFl7li9E).

### `index.js`
```js
import http from 'http'

const server = http.createServer((req, res) => {
  res.write('Hello world')
  res.end()
})

server.listen('5000')
console.log('server listening on port 5000')
```

Le code ci-dessus lance un **serveur HTTP sur le port 5000**. Pour toutes requêtes ce sur port, le serveur répondra *"Hello world"*.

> ⚙️ Tester ce code : https://stackblitz.com/edit/node-http-server

[`http`](https://nodejs.org/api/http.html) est un module natif à Node.js. Mais il est possible dans installer d'autres.

---

## NPM

[NPM](https://www.npmjs.com/) est le `package manager` par défaut de Node.js.
Des alternatives existent ([yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/)) mais nous nous concentrerons sur NPM.

NPM sert notamment à :
- Gérer les **"packages"** ou dépendances de notre projet. Il existe 2 types de dépendances :
  - les **"dependencies"**, qui sont nécessaires à notre serveur en production,
  - les **"devDependencies"**, qui servent à faciliter le développement et les tests de notre projet.
- Lancer des scripts pour exécuter son code ou le tester par exemple.

La commande `npm init` sert à **initialiser** un projet et créer le fichier `package.json`.

---

## `package.json` 

Exemple de `package.json`, quelques propriétés importantes :

### `package.json`
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module", // use import / export
  "licence": "MIT",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```


---

## Installer des packages

```bash
$ npm install dotenv # or npm i dotenv
$ npm install --save-dev nodemon # or npm i -D nodemon
```

### `package.json`
```json
{
  "dependencies": {
    "dotenv": "^16.0.0",
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```

[Documentation officielle](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies)

---

## Nodemon

[Nodemon](https://nodemon.io/) est un utilitaire qui sert à redémarrer notre serveur à chaque fois qu'un fichier est modifié.
Il s'agit donc d'une "`devDependencies`" qui nous sera utile uniquement au développement de notre serveur mais ne sera pas nécessaire en production.

Après l'avoir installé avec `npm i -D nodemon`, modifions le fichier `package.json` pour utiliser nodemon.

### `package.json`
```json {all|5}
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
  // ...
}
```

Il est maintenant possible de lancer notre serveur avec la commande `$ npm run dev` qui va lancer `nodemon`. Dès que l'on modifiera un fichier, notre serveur se relancera pour prendre en compte ces changements.

---

## Utiliser un package / module

Exemple d'utilisation du module `dotenv`

### .env
```
PORT=5000
```

### index.js
```js {all|1|4|11-12|all}
import dotenv from 'dotenv'
import http from 'http'

dotenv.config()

const server = http.createServer((req, res) => {
  res.write('Hello world')
  res.end()
})

server.listen(process.env.PORT)
console.log(`server listening on port ${process.env.PORT}`)

```

> ⚙️ Tester ce code : https://stackblitz.com/edit/node-dotenv

---

## Créer un module

### `./add.js`
```js
/**
 * @description The add function returns the sum of 2 numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a, b) {
  return a + b
}

```

### `./index.js`
```js
import { add } from './add.js'

add(1, 2) // 3
```

> ⚙️ Tester ce code : https://stackblitz.com/edit/node-simple-module

---

## Créer un module - Exercice 💻

Renommer le fichier `add.js` en `operations.js` et créer une function `sub` afin que le code suivant soit valide:


### `./index.js`
```js
import assert from 'assert'

import { add, sub } from './operation.js'

assert.strictEqual(add(40, 2), 42, 'Failed to add 40 and 2')
assert.strictEqual(sub(50, 8), 42, 'Failed to substract 8 from 50')

console.info('✅')
```

> 👉 `assert` est un module natif (comme `http`) qui permet de tester des égalités et termine le programme en cas d'erreur. Plus tard, nous utiliserons des packages plus avancés pour tester notre code.


---

## JSDoc

```js
/**
 * @description The add function returns the sum of 2 numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
```

JSDoc permet de documenter son code directement dans les commentaires.

Il existe plusieurs syntaxes, celle qui nous intéresse plus particulièrement est celle de TypeScript. C'est un bon moyen de typer son code tout en écrivant du JS "classique".

- [TypeScript with JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [JSDoc support in VS Code](https://code.visualstudio.com/docs/languages/typescript#_jsdoc-support)

---
layout: intro
--- 

# Créer une API avec Fastify

---

## Créer un serveur avec Fastify

Fastify est un framework web pour Node.js. C'est à dire une couche d'abstraction.

Utiliser un framework permet d'éviter de **"ré-inventer la roue"**. Par exemple, Fastify implémente des méthodes pour gérer le `routing`, l'authentification, la validation des données, les erreurs, etc. 

Il est recommandé de toujours utiliser un framework, afin de pouvoir se concentrer sur l'essentiel : **les fonctionnalités et la logique de notre API**.

- [Fastify](https://www.fastify.io/) – [Getting Started](https://www.fastify.io/docs/latest/Guides/Getting-Started/)
- [GitHub](https://github.com/fastify/)

Fastify est open source. Des centaines de développeurs ont contribué a Fastify et a son ecosystème. Les deux "Lead Maintainers" sont [Matteo Collina](https://github.com/mcollina) et [Thomas Della Vedova](https://twitter.com/delvedor)


---
layout: image-right
---

## Il existe de centaines de Frameworks pour le Web

- **PHP** : Symfony, Laravel, CakePHP
- **Python** : Django, Flask, Tornado
- **Java** : Spring, Play, Blade
- **Rust** : Rocket, Warp
- **Go** : Revel, Gin, Beego
- **Ruby** : Ruby on Rails
- **JavaScript** : Express, Koa, Nest, Meteor
- ...

---
layout: image-right
---

## Il existe de centaines de Frameworks pour le Web

Ils ont plus ou moins les mêmes promesses : performances, puissance, sécurité, scalabilité, flexibilité, simplicité etc.

Bien qu'ils aient des particularités et subtilités, *tous* (ou preque) reposent sur les mêmes principes.

> 👉 **Ce sont ces principes que nous allons appréhender avec Fastify. Le but n'est pas d'apprendre à utiliser *un* Framework, mais d'en comprendre les logiques.**
---

## Pourquoi Fastify ?

Il existe de très nombreux Frameworks Web (pour Node.js ou bien pour d'autre plateformes, PHP, Go, Python etc).

Exemples de Frameworks bas-niveaux (ou *low-level*, c'est à dire des Frameworks légers qui laissent beaucoup de flexibilité) :  
[Express](https://github.com/expressjs/express) - [Koa](https://github.com/koajs/koa) - [Fastify](https://github.com/fastify/fastify)


Exemples de Frameworks haut-niveaux (ou *high-level*, c'est à dire qu'ils imposent plus de choses, mais en contre-partie, apportent plus de fonctionalités) :  
[Loopback](https://github.com/loopbackio/loopback-next) - [Sails](https://github.com/balderdashy/sails) - [NestJS](https://github.com/nestjs/nest)

**Fastify** est un framework léger, qui aide à effectuer beaucoup de tâches et à structurer son code. En apprenant Fastify (ou Express), on apprend les bases.
Ces connaissances serviront à comprendre n'importe quel autre framework.

---

## Une première route

```sh
$ npm i fastify
```

### `app.js`
```js {all|1|4-6|10|all}
import Fastify from 'fastify'
const fastify = Fastify()

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
```

> ⚙️ Tester ce code : https://stackblitz.com/edit/fastify-basic-server

---

## Structurer son code

Il est possible de mieux structurer notre projet, par exemple en créant un fichier `routes/index.js` et en y exportant une function qui sera ensuite passée à `fastify.register()`.🗽

### `./routes/index.js`
```js
export async function routes(app) {
  app.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })
}
```

Dans `app.js`, nous importons notre route.

### `./app.js`
```js
import fastify from 'fastify'

import { routes } from './routes/index.js'

const app = fastify()
app.register(routes)
```

---

## Les "*query strings*"

Il est possible de passer des données dynamiques à une URL via les "*query strings*". C'est-à-dire un format spécifique et standardisé que notre serveur sera apte à comprendre.

Dans l'exemple suivant, nous passons 2 paramètres (`name` et `age`) à la route `GET /users/search` :

```
/users/search?name=Toto&age=42
```

```js
app.get('/users/search', (request, reply) => {
  // request.query => { name: "Toto", age: "42" }
  const name = request.query.name // "Toto"
  const age = request.query.age   // "42"

  reply.send({ ok: true }) // Fake response
})

```
Dans le code ci-dessus, on voit que Fastify est capable d'analyser la query string, afin de transformer `name=Toto&age=42` en un objet JavaScript.

---

## Les routes dynamiques

Dans le contexte d'une API REST, une `route` (ou une URL) décrit la ressource vers laquelle elle mène.
Par exemple :
- `https://javascript.plainenglish.io/` est l'URL d'un blog qui traite du JavaScript
- `https://javascript.plainenglish.io/4c4aebb726d6` mène vers un article bien précis.

On passe un paramètre à l'URL qui correspond à l'ID de l'article qui nous intéresse.
On pourrait l'écrire :
- `https://javascript.plainenglish.io/:id` où `id` est un paramètre dynamique.

---

## Implémenter une route dynamique avec Fastify

Les paramètres dynamiques sont indiqués à Fastify avec la notation `":"` -> `":parameter"`.  
Il est ensuite possible d'accéder à ces paramètre avec `request.params.<parameter>`.

Par exemple :

```js
fastify.get('/articles/:id', (request, reply) => {
  reply.send({ id: request.params.id })
})
```

\> `GET /articles/1`

\< `{ id: "1" }`

---
layout: intro
---

# Valider la donnée

---

## Valider la donnée

> 💡 **"Never trust user input"**

Lors du développemment d'une API, il est primordial de s'assurer que les utilisateurs envoient et reçoivent la donnée attendue.
Fastify fourni des outils pour valider ces données, basé sur les [`JSON schema`](https://json-schema.org/learn/getting-started-step-by-step).

Prenons pour exemple le JSON ci-dessous qui représenterait une adresse sur une carte :
```json
{
  "name": "Web School Factory",
  "address": "29 rue Didot, 75014 Paris",
  "category": "School"
}
```
---

On pourrait le décrire de la façon suivante :

```json
{
  "type": "object",
  "title": "address",
  "properties": {
    "name": { "type": "string" },
    "address": { "type": "string" },
    "category": { 
      "type": "string",
      "enum": ["School", "Shop", "Cinema", "Restaurant"]
    },
  },
  "required": ["name", "address"]
}
```

---

Il est possible qu'un objet contiennent un autre objet. Ici la propriété `position` en est un :

```json
{
  "name": "Web School Factory",
  "address": "29 rue Didot, 75014 Paris",
  "category": "School",
  "position": {
    "lat": 48.82772489330344,
    "lon": 2.3146392659104555
  }
}
```

> ⚙️ [Tester](https://stackblitz.com/edit/node-ajv-basic)

---

```json
{
  "type": "object",
  "title": "address",
  "properties": {
    "name": { "type": "string" },
    "address": { "type": "string" },
    "category": { 
      "type": "string",
      "enum": ["School", "Shop", "Cinema", "Restaurant"]
    },
    "position": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number", "minimum": -90, "maximum": 90
        },
        "lon": {
          "type": "number", "minimum": -180, "maximum": 180
        }
      },
      "required": ["lat", "lon"]
    }
  },
  "required": ["name", "address", "position"]
}
```
---

## La validation des données avec Fastify

En définissant une route, il est possible de spécifier des options en deuxième argument. Notamment le schema, ici le schema décrit la réponse attendue :

```js
const basicSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

app.get('/', { schema: basicSchema }, home)
```

> - [Documentation officielle](https://www.fastify.io/docs/latest/Getting-Started/#validate-your-data)
> - [Documentation officielle avancée](https://www.fastify.io/docs/latest/Validation-and-Serialization/)

---

## La validation des données avec Fastify

Il est possible de valider d'autres propriétés de la requête telles que la `querystring`, les `params`, ou le `body`. Par exemple :

```js
export const helloSchema = {
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: [], // optionnel, aucune propriété n'est requise
    additionalProperties: false, // remove other propertiers
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}
```

---

## Valider les paramètres de la requêtes

Les schémas ne font pas que valider la donnée mais il peuvent aussi la modifier pour l'adapter à ce qui est attendu.

```js
const schema = {
  params: {
    type: 'object',
    properties: { id: { type: 'number' } },
  },
}

fastify.get('/articles/:id', { schema}, (request, reply) => {
  reply.send({ id: request.params.id })
})
```

\> `GET /articles/1`
\< `{ id: 1 }`
 
Ici, l'`id` est automatiquement converti en nombre grâce au schema de validation

---
layout: intro
---

# Données dynamiques - Récaptitulatif

---

## Query string

`GET /hello?name=bob&age=42`

```ts {all|2|3|5-6|8-9|13|14-15|all}
const helloSchema = {
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'number' },
    },
    required: [], // nothing's required
    additionalProperties: false, // remove other propertiers
  },
}

app.get('/hello', { schema: helloSchema }, (request, reply) => {
  const name = request.query.name
  const age = request.query.age

  const message = name ? `Hello ${name}` : 'Hello world'
  if (age) console.log(age)

  reply.send({ message })
})
```

---

## URL parameters
`GET /articles/1`

```ts {all|4|7|9|15|all}
const articles = [{ id: 1, title: 'Hello' }] // fake array of articles

const articlesSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
    additionalProperties: false,
  },
}

app.get('/articles/:id', { schema: articlesSchema }, (request, reply) => {
  const id = request.params.id
  const article = articles.find((a) => a.id === id)
  if (!article) {
    return reply.code(404).send({ error: 'article not found', id })
  }
  reply.send({ article })
})
```
---

## Body

`POST /messages { "pseudo": "Bob", "message": "Hello world" }`

```ts
const messages = [] // fake message store
const messageSchema = {
  body: {
    type: 'object',
    properties: {
      pseudo: { type: 'string' },
      message: { type: 'string' },
    },
    required: ['pseudo', 'message'],
    additionalProperties: false,
  },
}

app.post('/messages', { schema: messageSchema }, (request, reply) => {
  const message = request.body.message
  messages.push(message)

  reply.send({ message: 'message received' })
})
```

---

## À propos de Fastify

Si Fastify est léger et performant ; c'est qu'il repose lui-même sur des modules légers et performants :

- Le routing est géré avec [`find-my-way`](https://github.com/delvedor/find-my-way) : "A crazy fast HTTP router"
- La validation du JSON avec [`Ajv`](https://github.com/ajv-validator/ajv) : "The fastest JSON schema Validator"
- Le parsing du JSON [`fast-json-stringify`](https://github.com/fastify/fast-json-stringify) "2x faster than JSON.stringify()"
- Les logs avec [`pino`](https://github.com/pinojs/pino) : "super fast, all natural json logger"

Ces modules sont directement intégrés à Fastify, il est cependant intéressant (voir important) de savoir comment ils fonctionnent et pourraient vous être utiles dans votre propres projets.

Pour aller plus loin :
- Take your HTTP server to ludicrous speed by @mcollina : [Slides](https://mcollina.github.io/take-your-http-server-to-ludicrous-speed) – [Video](https://www.youtube.com/watch?v=5z46jJZNe8k)
- What if I told you that HTTP can be fast by @delvedor : [Slides](https://delvedor.github.io/What-if-I-told-you-that-HTTP-can-be-fast) - [Video](https://www.webexpo.net/prague2017/talk/what-if-i-told-you-that-http-can-be-fast/)

---
layout: intro
---

# HTTP Basics

---

## HTTP Basics

Une URL (Uniform Resource Locator) ou "adresse web" associe une chaine de caractère à une ressource sur le web. Elle précise le protocole à utiliser (notamment HTTP ou HTTPS), le domaine ou "hôte", suivi du *path* et éventuellement d'une *query*.

> 💡 HTTP utilise par défaut le port **80** et HTTPS **443**. Ainsi, nous n'utilisons pas les ports au quotidien. Ils sont utiles en tant que développeur notamment pour lancer plusieurs serveurs sur des ports différents en local.

### Exemple d'URL

`https://localhost:5000/hello?name=Bob`

`protocol://hostname:port/pathname?query`

> 👉 [Documentation du module URL de node](https://nodejs.org/api/url.html#url_url_strings_and_url_objects)

---

## Les "méthodes" ou "verbes"

Il existe 9 méthodes HTTP différentes qui, par conventions, correspondent à des actions précises:

• `POST` -> Create  
• `GET` -> Read  
• `PUT` -> Update/Replace  
• `PATCH` -> Update/modify  
• `DELETE` -> Delete  

Considérons une URL avec une ressource "articles": https://my-personal-blog.com/articles/

• `GET  /articles` -> liste des articles  
• `POST /articles` -> créer un article

• `GET    /articles/:id` -> récupérer un article  
• `PUT    /articles/:id` -> modifier l'ensemble des informations de l'article  
• `PATCH   /articles/:id` -> modifier une ou plusieurs informations de l'article (eg: "author")  
• `DELETE /articles/:id` -> supprimer l'article  


> 👉 [Documentation MDN](https://developer.mozilla.org/fr/docs/Web/HTTP/Methods)

---

## Les ["status codes"](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

Les *status codes* sont des codes de réponse indiquant si une requête a réussi ou échoué.

Le standard défini un grand nombre de codes pour gérer toutes les situations mais dans les faits il suffit de connaître les principaux.

En voici quelques uns :

- 2xx: Success (**200**: OK, **201**: Created)
- 4xx: Client error (**400**: Bad Request, **401**: Unauthorized, **403**: Forbidden, **404**: Not Found)
- 5xx: Server error (**500**: Internal Server Error, **504**: Gateway Timeout)

> 👉 [Documentation MDN](https://developer.mozilla.org/fr/docs/Web/HTTP/Status)

---
layout: intro
---

# TP 02 - Realtime chat webapp

---

## Objectifs

- Réaliser un système de messagerie en temps réel avec Fastify et Fastify WebSocket
- Développer l'application front-end de la messagerie
- L'ensemble du code doit être bien organiser, structure, lisible et compréhensible
- L'aspect sécurité sera également à prendre en compte

## Consignes

- Équipes de 2 à 3 personnes
- Pour la partie **back** : partir du [code de la démo](https://github.com/hugocaillard/wsf-2a-p2025-public/tree/main/tp/02_realtime-chat/back)
- Pour la partie **front** : le [code de la démo](https://github.com/hugocaillard/wsf-2a-p2025-public/tree/main/tp/02_realtime-chat/front) est disponible également, libre à vous en servir ou simplement de vous en inspirer
- Il n'est pas nécessaire de déployer le code en ligne

---

## Fonctionnalités à implémenter

- Sauvegarder et afficher la date de publication d'un message
- Récupérer l'historique des messages récents
- Sécuriser le service (ex: éviter les pseudos ou message trop longs)
- Différencier les messages envoyés des messages reçus

## Autres idées de fonctionalités

- Améliorer le style de l'application
- Système d'authentification simple (et éviter les doublons de pseudos)
- Pouvoir supprimer ses propres messages
- "Réactions" à un message (emoji)
- Système de modération (ex: repérer et filtrer les messages à caractère haineux)
