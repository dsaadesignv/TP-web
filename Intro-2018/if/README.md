# <APOD> if
## Structurer le contenu en HTML
- Créez un dosser de travail et glissez sur l'icône de l'application Atom.
- Dans Atom créez un nouveau fichier que vous nommez `index.html` (jamais de caractères spéciaux dans les noms de fichier). La page nommée `index.html` s'affichera automatiquement quand vous entrerez l'url de votre site dans le navigateur : `https://www.url.com/` est exactement équivalent à `https://www.url.com/index.html`
- Ecrivez `html` et appuyez sur la touche de tabulation. Atom écrit automatiquement l'ensemble des balises de base d'un fichier html : `html`, `head`, `body`, etc :

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>
```
- Tout ce qui sera écrit entre les balises `<body>` et `</body>` constitue la partie visible de la page.
- La balise `title` correspond au titre de la page visible dans la barre en haut du navigateur (onglet). Il ne sera pas visible dans le corps de page. Pour l'afficher, écrivez le titre en utilisant la balise `h1` qui est la balise des titres principaux (les plus hauts dans la hiérarchie).  :

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Astronomy Picture Of the Day</title>
  </head>
  <body>
    <h1>Astronomy Picture Of the Day</h1>
  </body>
</html>
```
---
**De manière générale, référez-vous systématiquement au site de ressources pour développeurs de Mozilla : https://developer.mozilla.org/fr/. Vous y trouverez notamment :**
- **L'ensemble des balises (elements) HTML : https://developer.mozilla.org/fr/docs/Web/HTML/Element**
- **L'ensemble des sélecteurs et propriétés du langage CSS https://developer.mozilla.org/fr/docs/Web/CSS/Reference**
---
- Maintenant ouvrez le fichier `index.html` dans le navigateur en lançant l'extension `atom-live-server` : Packages > atom-live-server > Start server. Si l'extension n'est pas installée : Package > Settings View > Install Packages/Themes. Puis recherchez le package `atom-live-server`. Installez-le et rédémarrez Atom.
- L'intérêt de atom-live-server est que la page s'actualisera dès que vous modifierez le code, sans avoir à rafraîchir la page. Lancez le serveur Packages > atom-live-server > Start server. Le navigateur ouvre la page automatiquement. Modifiez le titre de la page HTML et enregistrez pour tester. La page se rafraîchit automatiquement et affiche le contenu modifié.
- Intégrer maintenant le reste du contenu de manière en vous référent à la documentation : https://developer.mozilla.org/fr/docs/Web/HTML/Element. Vous utiliserez les balises `header`, `a` (lien hypertexte), `img`, `h2` (titre de second niveau), et `p` (paragraphe)

## Mettre en forme le contenu avec CSS
### Où écrire le CSS ?
- CSS permet d'écrire des règles afin de mettre en forme des balises HTML.
- Ces règles s'écrivent directement dans la page HTML ou dans un fichier `.css` séparé.
- Dans la page HTML, ces règles s'écrivent entre des balises `style`, elles-mêmes placées entre les balises `head`, c'est-à-dire dans la partie non visible de la page :

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Astronomy Picture Of the Day</title>
    <style type="text/css">
			/* les règles s'écrivent ici */
    </style>
  </head>
  <body>

  </body>
</html>
```
- Pour écrire les règles CSS dans un fichier externe il faut :
	- 1. Créer le fichier et l'enregistrer dans un dossier `css` en le nommant par exemple `styles.css`.
	- 2. Lier le fichier à la page HTML en utilisant la balise `link` entre les balises `head` de la page. La balise link est "auto-fermante" :

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <link href="css/styles.css" rel="stylesheet" type="text/css">
  </head>
  <body>

  </body>
</html>
```

### Créer une règle CSS : sélecteurs et propriétés
- Les 2 points essentiels pour comprendre le fonctionnement de CSS :
    - Le principe des sélecteurs (à quoi on applique la règle)
    - Celui des propriétés (que dit la règle)
- Par exemple je souhaite changer la couleur du fond de la page :
    - La balise du fond de page est la balise `body`
    - La propriété qui décrit la couleur de fond est `background-color`. Cette propriété a une valeur qui est le nom de la couleur exprimée sous différents formats : son nom en anglais, sa valeur hexadécimal, une valeur RVB, etc.
- Donc pour écrire cette règle en CSS j'écris d'abord le nom du sélecteur avec 2 accolades

```css
body{

}
```
- Puis entre les accolades le nom de la propriété suivi de 2 points

```css
body{
    background-color:
}
```
- Enfin je définis la valeur de la propriété `background-color` (ici en noir exprimé en hexadécimal) :

```css
body{
    background-color:#000000;
}
```

- Nous avons utilisé un seul des sélecteurs possibles, le sélecteur de balise. Ce sélecteur est pratique, mais à la différence de `body` qui est unique, les autres balises peuvent être utilisées plusieurs fois dans une page, comme la balise `p` par exemple. Si vous avez 3 balises p dans votre page et que vous ne voulez sélectionner que la première, vous devez utiliser un autre type de sélecteur. Vous avez 3 voire 4 options, qui auront le même effet mais qu'il faudra choisir selon le projet :
	- Le sélecteur d'id
	- Le sélecteur de classe
	- Le sélecteur de pseudo-classe
	- Le sélecteur d'attribut
- Nous aborderons ici uniquement le second, le sélecteur de classe, qui est le plus répandu : il s'agit d'ajouter un attribut `class` à la première balise `p`, et de lui donner un nom en valeur, arbitraire, sans caractères spéciaux, espaces ou accents (par exemple ici : `rouge` puisque nous allons changer la couleur du texte en rouge)

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <link href="css/styles.css" rel="stylesheet" type="text/css">
  </head>
  <body>
		<p class="rouge">Ceci est un paragraphe</p>
		<p>Ceci est un autre paragraphe</p>
		<p>Ceci est un encore un autre paragraphe</p>
  </body>
</html>
```
- En CSS il nous faut maintenant écrire la règle en utilisant le sélecteur de classe avec un "." devant le nom choisi :

```css
.rouge{
    color:red;
}
```

### Toutes les propriétés CSS
- Maintenant que vous connaissez le principe des règles CSS vous pouvez définir toutes les propriétés formelles de l'ensemble des balises de la page :
	- Chaque balise doit être considérée comme un rectangle ou une boîte (_box_) avec une largeur (`width`), une hauteur (`height`), une marge externe (`margin`), une marge interne (`padding`), et un contour (`border`).
	- Les balises ont toutes une forme par défaut :
		- les balises `block` ont une largeur de 100% et une hauteur relative à leur contenu. Elles se disposent donc les unes en-dessous des autres.
		- les balises `inline` ont une largeur relative à leur contenu et se disposent les unes à côté des autres, tant qu'il y a de la place à droite.
		- les balises HTML des titres (`h1`, `h2`, etc.), la balise de lien (`a`) ou de texte (`strong`, etc.) ont également une forme par défaut.
	- Le positionnement des balises est assez complexe, nous ne l'aborderons pas ici. Le travail avec les marges ouvre déjà des possibilités nombreuses.
	- Les propriétés du texte peuvent être définies comme dans n'importe quel logiciel de traitement de texte (police, corps, style, soulignement, etc.)
	- La liste complète des propriétés : https://developer.mozilla.org/fr/docs/Web/CSS/Reference
