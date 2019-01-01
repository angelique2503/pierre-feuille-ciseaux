class Player {

	constructor(score) {
		this.score = score;
		this.element_id = '';
		this.winner = false;
		this.match_nul = false;
		this.str = '';
  	}

  	/*** Getters ***/

  	get_score() {
  		return this.score;
  	}

  	/*** Setters ***/

  	set_score(new_score) {
  		this.score = new_score;
  		return this.score;
  	}

  	/*** Play ***/

  	play(id) { // ID de pierre, feuille ou ciseaux
  		this.element_id = id;
  	}

	who_wins(ia_element_id, player_element_id, list, winning_combination) {

		for (let i = 0; i < winning_combination.length; i++) {

			if ( player_element_id == ia_element_id ) {
				this.str = 'Match nul !';
				this.match_nul = true;
				this.winner = false;
			}

			if ( winning_combination[i].winner == player_element_id && winning_combination[i].loser == ia_element_id ) {
				this.str = winning_combination[i].str;
				this.winner = true;
				this.score += 1;
			}

		}

	}

}

class IA extends Player {

	constructor(score) {
    	super(score);
	}

	play(list) { // Pierre, feuille ou ciseaux tiré au hasard
  		let n = Math.floor(Math.random() * Math.floor(3));
  		this.element_id = list[n].id;
  		return list[n];
	}

	who_wins(ia_element_id, player_element_id, list, winning_combination) {

		for (let i = 0; i < winning_combination.length; i++) {

			if ( player_element_id == ia_element_id ) {
				this.str = 'Match nul !';
				this.match_nul = true;
				this.winner = false;
			}

			if ( winning_combination[i].winner == ia_element_id && winning_combination[i].loser == player_element_id ) {
				this.str = winning_combination[i].str;
				this.winner = true;
				this.score += 1;
			}

		}

	}

}
