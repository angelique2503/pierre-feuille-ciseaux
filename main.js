/*
	Projet: Pierre-feuille-ciseaux
	Auteur: Angélique Allain
	Ce fichier a besoin du fichier classes.js pour fonctionner
*/

/*** Initialisation ***/

var player_score = 0,
	ia_score = 0,
	the_winner = '',
	final_winner = '',
	str = '';

const list = [
  	{ id: 0, name: 'Pierre', src: 'images/stone.svg' },
  	{ id: 1, name: 'Feuille', src: 'images/leaf.svg' },
  	{ id: 2, name: 'Ciseaux', src: 'images/cut.svg' }
];

const winning_combination = [ 														// Combinaisons gagnantes
	{ winner: 0, loser: 2, str: 'La pierre écrase les ciseaux et gagne !' }, 		// La pierre (0) écrase les ciseaux (2) et gagne
	{ winner: 1, loser: 0, str: 'La feuille enveloppe la pierre et gagne !' }, 		// La feuille (1) enveloppe la pierre (0) et gagne
	{ winner: 2, loser: 1, str: 'Les ciseaux découpent la feuille et gagnent !' } 	// Les ciseaux (2) découpent la feuille (1) et gagnent.
]

// Instanciation

const ia = new IA(ia_score);
const player = new Player(player_score);

/*** Functions ***/

function start() {

	let player_choice = this.dataset.id;

	ia.play(list); // L'IA joue
	player.play(player_choice); // Le joueur joue

	write_results(list[ia.element_id], list[player.element_id]);

}

function write_results(ia_choice, player_choice) {

	let ia_image = document.querySelector('#ia-container img'),
		player_image = document.querySelector('#player-container img'),
		ia_legend = document.querySelector('#ia-container figcaption'),
		player_legend = document.querySelector('#player-container figcaption'),
		results = document.querySelector('table tfoot td'),
		ia_score = document.getElementById('ia-score'),
		player_score = document.getElementById('player-score');

	i_am_the_winner(player_choice.id, ia_choice.id);

	// Set images and legends
	ia_image.src = ia_choice.src;
	ia_legend.innerHTML = ia_choice.name;
	player_image.src = player_choice.src;
	player_legend.innerHTML = player_choice.name;

	// Set scores
	player_score.innerHTML = player.score;
	ia_score.innerHTML = ia.score;

	// Set results
	results.innerHTML = '<p>'+str+'</p>';

}

function i_am_the_winner(player_element_id, ia_element_id) {
	ia.who_wins(ia_element_id, player_element_id, list, winning_combination);
	player.who_wins(ia_element_id, player_element_id, list, winning_combination);
	if ( ia.winner ) {
		str = ia.str;
	}
	else {
		str = player.str;
	}
}

function final_winner() {
	if ( ia.score === 10 ) {
		final_winner = 'IA';
	}
	if ( player.score === 10 ) {
		final_winner = 'You';
	}
}

/*** Events ***/

document.addEventListener("DOMContentLoaded", function(event) {

	var buttons = document.querySelectorAll('button');
	var images = document.querySelectorAll('img');

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click',start);
	}

	for (let i = 0; i < images.length; i++) {
		images[i].addEventListener("DOMAttrModified", function(event) {
    		if (event.attrName == "src") {
    		}
		});
	}

});