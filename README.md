# 404.js Blog - Plateforme de Partage de Connaissances

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![JSON Server](https://img.shields.io/badge/JSON_Server-0.17.0-000000?logo=json)](https://github.com/typicode/json-server)
[![RxJS](https://img.shields.io/badge/RxJS-7.5.0-B7178C?logo=reactivex)](https://rxjs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

![Bannière du projet](https://i.imgur.com/VxJyGQb.png)

## 📝 Description

404.js Blog est une plateforme moderne permettant aux développeurs de partager leurs connaissances techniques à travers des articles, commentaires et interactions communautaires.

**Fonctionnalités clés** :
- Système complet de gestion d'articles
- Authentification utilisateur
- Interactions via commentaires
- Recherche et filtres avancés
- UI dynamique avec animations

## ✨ Fonctionnalités Détaillées

### 🧑‍💻 Expérience Utilisateur
| Fonctionnalité | Description | Composant Principal |
|---------------|------------|---------------------|
| Création d'articles | Éditeur riche avec images et markdown | `ArticleForm` |
| Gestion de profil | Modification des informations utilisateur | `UserProfile` |
| Système de commentaires | Discussions sous les articles | `CommentSection` |
| Recherche | Filtrage par titre, catégorie et tags | `SearchBar` |

### ⚙️ Architecture Technique
```mermaid
graph TD
    A[Composants UI] --> B[Services API]
    B --> C[(JSON Server)]
    A --> D[Hooks Personnalisés]
    D --> E[RxJS Streams]
    E --> F[State Management]
    A --> G[Formik/Yup]
    B --> H[Axios]
