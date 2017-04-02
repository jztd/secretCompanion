import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
  	selector: 'app-landing',
  	templateUrl: './app-landing.component.html',
})
export class AppComponent  { 
	name = 'Angular';
	selectedGame = "";
	enteredCode = "";
	enteredName = "";
	players = 0;

	invalidJoin: boolean = false;

	
	selectGame(game: string): void
	{
		this.selectedGame = game;
	}

	joinGame(code: string, name: string): void
	{
		if(code !== "" && name !== "")
		{
			this.enteredCode = code;
			this.enteredName = name;
		}
		else
		{
			// error notification
			this.invalidJoin = true;

		}
	}
	selectPlayers(p: number): void
	{
		this.players = p;
	}

}
