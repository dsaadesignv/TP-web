# <APOD> else
## Charger dynamiquement le contenu en se connectant à une API
### Structurer la page
- Nous allons créer un squelette de page vide, avec l'ensemble des balises nécessaires, mais le contenu sera chargé dynamiquement en Javascript.
- Le squelette commenté :

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>NASA - APOD</title>
</head>
<body>

  <header> <!-- début header -->
    <h1>Astronomy Picture Of the Day</h1><!-- titre principal -->
    <a href="https://apod.nasa.gov/apod/astropix.html">https://apod.nasa.gov/apod/astropix.html</a><!-- lien vers le site NASA APOD avec l'attribut href -->

    <form id="form"><!-- formulaire pour sélectionner la date -->
        <input type="date" id="form-date"><!-- champ de texte de type date -->
        <button>GO</button><!-- bouton pour valider le formulaire -->
    </form><!-- fin du formulaire -->
    </header> <!-- fin header -->

    <iframe id="video-nasa" width="960" height="570" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><!-- iframe pour charger la page du player Youtube -->
    <figure><!-- puisqu'il s'agit d'un média nous utilisons la balise figure -->
        <img id="image-nasa"><!-- image de la figure -->
        <figcaption><!-- figcaption est une balise enfant (c'est-à-dire contenue par) de la balise figure -->
            <h2 id="image-titre"></h2><!-- titre de l'image -->
            <a href="#"></a><!-- lien vers la source -->
            <p id="image-description"><!-- début de la description -->
            </p><!-- fin de la description -->
            <time></time><!-- balise time pour contenir la date -->
        </figcaption><!-- fin de la légende de l'image -->
    </figure><!-- fin de la balise figure -->
<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="js/scripts.js"></script>
</body>
</html>
```

- La page fait référence à 2 scripts `.js` :
	- La (fameuse) bibliothèque jQuery qui donne accès à un grand nombre de fonctions via une écriture simplifiée.
	- Un fichier .js dans lequel nous écrirons les scripts nécessaires. Vous devez donc créer ce nouveau fichier `scripts.js` et le placer dans un dossier `js`. Aucun script ne sera écrit dans le fichier HTML.
- Ces scripts sont chargés en bas de page, juste avant la fermeture de la balise `body`. Le squelette étant en place nous travaillerons uniquement dans le fichier `scripts.js`.

### Se connecter à une API
- Étape 1 : Récupérer une clé API auprès de la NASA 🚀. Rdv ici : https://api.nasa.gov/
- Étape 2 : Tester la clé API en allant sur cette URL : https://api.nasa.gov/planetary/apod?api_key=VOTRE_CLÉ.
- Nous allons maintenant nous connecter à l'API avec Javascript. Dans le fichier scrips.js nous allons appeler la fonction `$.getJSON()` de jQuery et lui passer l'adresse testée auparavant, et afficher le résultat dans la console :

```javascript
$.getJSON('https://api.nasa.gov/planetary/apod?api_key=VOTRE_CLÉ')
.done(function(data){
		console.log(data);
	});
```

- En gros le script demande au serveur de la Nasa un fichier de données structuré en JSON (`getJSON`), et quand le fichier (`data`) est chargé (`done`) demande de l'afficher dans la console (`console.log`).
- Nous pouvons maintenant parcourir le fichier de données grâce à l'objet `data`. Par exemple pour afficher le titre uniquement nous pouvons écrire

```javascript
		console.log(data.title);
```

### Afficher les données
- Reste maintenant à charger les données dans le squelette HTML. Par exemple à charger le titre (`data.title`) dans la balise `<h2 id="image-titre"></h2>`. Pour cela nous allons utiliser le sélecteur jQuery, qui fonctionne globalement comme les sélecteurs CSS. :

```javascript
$.getJSON('https://api.nasa.gov/planetary/apod?api_key=VOTRE_CLÉ')
.done(function(data){
		console.log(data.title);
		$('#image-titre').text(data.title);
	});
```

- Nous utilisons ici la fonction `text()` pour afficher le texte. Nous pourions aussi utiliser la fonction `html()`.
- Il suffit maintenant de dupliquer cette ligne pour les autres éléments texte. Par contre pour l'image et la vidéo nous devons utiliser une autre fonction puisque nous devons écrire l'url du média dans l'attribut `src` de l'image ou de l'iframe. Pour cela nous utiliserons la fonction `attr()` qui permet de sélectionner l'attribut et de lui affecter une valeur :

```javascript
$.getJSON('https://api.nasa.gov/planetary/apod?api_key=VOTRE_CLÉ')
.done(function(data){
		console.log(data.title);
		$('#image-titre').text(data.title);
		$('#image-nasa').attr('src',data.url);
	});
```

- Maintenant que l'application est en place vous pouvez passer un paramètre de date dans votre url de connexion à l'API. Par exemple pour récupérer l'image du jour du 22 mars 2017, il faut ajouter le paramètre `date` et lui donner la valeur `2017-03-22`) :

```javascript
$.getJSON('https://api.nasa.gov/planetary/apod?api_key=VOTRE_CLÉ')
```
- L'étape consiste à sélectionner la date dans un sélecteur de date (date picker), et de passer dynamiquement cette date au script. Nous utiliserons ici le champ de fomulaire date `<input type="date" id="form-date">`.
- Côté `scripts.js` il nous faut maintenant récupérer la valeur de date quand on valide le formulaire. Pour cela nous utilisons la fonction `val()` de jQuery au sein d'un événement `submit`, toujours de jQuery. La valeur date est stocké dans une variable `date` créée avec `let` :

```javascript
$('#form').on('submit', function(){
	let date = $('#form-date').val();
	$.getJSON('https://api.nasa.gov/planetary/apod?api_key=VOTRE_CLÉ&date='+date)
	.done(function(data){
			console.log(data.title);
			$('#image-titre').text(data.title);
			$('#image-nasa').attr('src',data.url);
		});
		return false;
});
```

- Pour éviter que la page se recharge quand nous validons le formulaire, il faut ajouter `return false;` à la fin de l'événement `on('submit')`
- Enfin il reste à gérer le type de média, image ou vidéo, avec une structure conditionnelle if, else. Nous utiliserons la fonction `css()` pour afficher et masquer les balises `iframe` de la vidéo, ou `img` de l'image.

```javascript
$('#form').on('submit', function(){
	let date = $('#form-date').val();
	$.getJSON('https://api.nasa.gov/planetary/apod?api_key=VOTRE_CLÉ&date='+date)
	.done(function(data){
			console.log(data.title);
			$('#image-titre').text(data.title);
      if(data.media_type=='image'){
          $('#video-nasa').css("display", "none");
			    $('#image-nasa')
            .attr('src',data.url)
            .css("display", "block");
      }else{
          $('#image-nasa').css("display", "none");
          $('#video-nasa')
            .attr('src',data.url)
            .css("display", "block");
      }
		});
    return false;
});

```

## Et avec une autre API de la Nasa ?
- Maintenant que vous avez compris le principe et que vous disposez d'une clé API, attaquez-vous à celle des images de Mars Rover par exemple : https://api.nasa.gov/api.html#MarsPhotos
