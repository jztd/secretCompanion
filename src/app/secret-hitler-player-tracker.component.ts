import { Component, OnInit} from '@angular/core';
import { SecretHiterWebsocketService } from './secretHitler-websocket.service';


@Component({
	moduleId: module.id,
	selector: 'player-tracker',
	templateUrl: './secret-hitler-player-tracker.component.html',
	styleUrls: ['./secret-hitler-player-tracker.component.css'],
	})
export class PlayerTrackerComponent implements OnInit
{
	playerNameList: Array<string>;
	playerTurn : string;

	constructor(private shWeb: SecretHiterWebsocketService)
	{
		this.playerNameList = new Array<string>();
		// this.playerTurn = "Player4";
		// this.playerNameList.push("Player1");
		// this.playerNameList.push("Player2");
		// this.playerNameList.push("Player3");
		// this.playerNameList.push("Player4");
		// this.playerNameList.push("Player5");
	}

	ngOnInit(): void
	{
		this.shWeb.playerTracker.subscribe( (value) => this.handleMessage(value));
	}

	handleMessage(data:any): void
	{
		if(data !== '')
		{
			if("name" in data)
			{
				this.playerTurn = data["playerTurn"];
			}
			
			else if("players" in data)
			{
				for( let i=0; i < data["players"].length; i++)
				{
					this.playerNameList.push(data["players"][i]);

				}
			}
		}
	}
}