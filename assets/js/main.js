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
];

// Instanciation

const ia = new IA(ia_score);
const player = new Player(player_score);

/*** Functions ***/

function winner() { // Qui est le gagnant final ?
	let winner;
	if ( ia.get_score() === 10 || player.get_score() === 10 ) {
		winner = true;
		if ( ia.get_score() === 10 ) {
			final_winner = 'IA';
		}
		else {
			final_winner = 'Player';
		}
	}
	else {
		winner = false;
	}
	return winner;
}

function start() { // Jouer

	let player_choice = this.dataset.id;

	if ( winner() ) { // Si un joueur gagne la partie, alors le jeu est stoppé
		stop();
	}
	else {
		ia.play(list); // L'IA joue
		player.play(player_choice); // Le joueur joue
		write_results(list[ia.element_id], list[player.element_id]); // Qui gagne ?
	}

}

function stop() { // Stopper la partie et permettre de rejouer
	var message = '';
	var replay_button = '<button type="button" id="replay">Rejouer</button>';
	var results = document.querySelector('table tfoot td');
	if ( final_winner == 'IA' ) {
		message = 'Dommage, vous avez perdu ! <br/>'+replay_button;
	}
	if ( final_winner == 'Player' ) {
		message = 'Bravo, vous avez gagné ! <br/>'+replay_button;
	}
	results.innerHTML = message;
	document.getElementById('replay').addEventListener('click',reset);
}

function reset() {
	ia.set_score(0);
	player.set_score(0);
	final_winner = '';
	document.getElementById('ia-score').innerHTML = 0,
	document.getElementById('player-score').innerHTML = 0;
	document.getElementById('replay').remove();
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
	results.innerHTML = str;

}

function i_am_the_winner(player_element_id, ia_element_id) {

	// Gagnant ou perdant ?
	ia.who_wins(ia_element_id, player_element_id, list, winning_combination);
	player.who_wins(ia_element_id, player_element_id, list, winning_combination);

	if ( ia.winner ) {
		str = ia.str;
	}
	if ( player.winner ) {
		str = player.str;
	}

}

/*** Events ***/

document.addEventListener("DOMContentLoaded", function(event) {

	var buttons = document.querySelectorAll('button');
	var images = document.querySelectorAll('img');

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click',start);
	}

	/*for (let i = 0; i < images.length; i++) {
		images[i].addEventListener("DOMAttrModified", function(event) {
    		if (event.attrName == "src") {
    		}
		});
	}*/

});
