import { Component, Input, OnInit } from '@angular/core';
// import { PlayerTrackerComponent } from './secret-hitler-player-tracker.component';
// import { ElectionTrackerComponent} from './secret-hitler-election-tracter.component';

import { SecretHiterWebsocketService } from './secretHitler-websocket.service';


@Component({
	moduleId: module.id,
  	selector: 'secret-hitler',
  	templateUrl: './secret-hitler.component.html',
  	styleUrls: ['./secret-hitler.component.css'],
})


export class SecretHitlerComponent implements OnInit
{
	@Input()
	totalPlayers: number = 0;
	connectedPlayers: number = 0;
	gameCode = "";
	constructor(private shWeb: SecretHiterWebsocketService)
	{

	}

	private handleMessage(data: any)
	{
		if(data !== '')
		{
			if("gameCode" in data)
			{
				console.log("recieved game code...");
				this.gameCode = data["gameCode"];
			}
			else if("connected" in data)
			{
				if(data["added"] === true)
				{
					this.connectedPlayers++;
				}
			}
		}
	}

	ngOnInit(): void
	{

		this.shWeb.overLayPanel.subscribe((value) => this.handleMessage(value));
		this.shWeb.start("game");
		this.shWeb.send(JSON.stringify({gameCode:this.gameCode, code:"00", players:this.totalPlayers}));
		//this.connectedPlayers = this.totalPlayers;

	}

}