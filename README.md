# Projet 7 Openclassrooms 

Créez un réseau social d’entreprise.

## Groupomania 

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. 

Construire le frontend avec un Framework frontend.
Construire le backend en javascript avec une base de données en MySQL.

### Techno 

- Frontend 
1. Vuecli 
2. Vue.js 3 
3. Vue router 
4. Vuex 

- Backend 
1. Node.js 
2. Express 
3. Sequelize (MySQL) 

- BDD 
1. phpMyAdmin (wamp) 

### Initialisation du projet 

1. Cloner le projet
2. Créer la base de données avec un gestionnaire BDD (phpMyAdmin)
3. Configurer votre la Connection de votre BDD dans le fichier `db.config.js` dans API/Config 
4. Ouvrir 2 terminal à partir du dossier racine du projet 

Dans le premier 

5. Exécuter `cd API` 
6. Exécuter `npm install` 
7. Exécuter `npm run start` 

Dans le deuxième

8. Exécuter `cd frontend` 
9. Exécuter `npm install` 
10. Exécuter `npm run serve` 
11. L'application s'exécute sur [http://localhost:8080](http://localhost:8080) 

### Information complémentaire 

Veuillez créer un fichier `.env` dans le dossier API et ajouter le mot de passe JWT pour le Token comme suivant `JWT_PASS=Token_Groupomania_mdp`.

### Modérateur 

Pour attribuer un modérateur rendez-vous dans phpMyAdmin puis dans la table `users`. 

Après avoir créé un compte depuis l'app attribuer à un utilisateur dans la colonne `role` le numéro `1`.

Accédez à la page modérateur via l'adresse [http://localhost:8080/mod](http://localhost:8080/mod).

 