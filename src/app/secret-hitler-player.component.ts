import {Component, OnInit, Input} from '@angular/core';

import { SecretHiterWebsocketService } from './secretHitler-websocket.service';


@Component({
	moduleId: module.id,
	selector: 'secret-hitler-player',
	templateUrl: './secret-hitler-player.component.html',
	styleUrls: ['./secret-hitler-player.component.css']
})
export class SecretHitlerPlayerComponent implements OnInit
{
	@Input()
	gameCode: string;
	@Input()
	playerName: string; 

	faction: string;
	secretRole: string;

	displayFaction: boolean;
	displaySecretRole: boolean;

	factionBtnText: string;
	secretRoleBtnText: string;

	overlayText: string;

	alive: boolean;
	constructor(private shWeb: SecretHiterWebsocketService)
	{
		this.faction = "";
		this.secretRole = "";
		this.displayFaction = false;
		this.displaySecretRole = false;
		this.overlayText = "Waiting for other players...";
		this.factionBtnText = "Show Faction";
		this.secretRoleBtnText = "Show Secret Role";
		this.alive = true;
	}

	ngOnInit(): void
	{
		this.shWeb.overLayPanel.subscribe((value) => this.handleMessage(value));
		this.shWeb.start("player", this.gameCode, this.playerName);
	}

	handleMessage(data: any): void
	{
		if(data !== '')
		{
			if('badCode' in data)
			{
				this.overlayText = "Invalid Game Code";
			}
			else if('added' in data)
			{
				if(data['added'] === false)
				{
					this.overlayText = "Username Already in Use";
				}
			}
		}
	}	

	toggleFaction(): void
	{
		if( this.displayFaction === false)
		{
			this.displayFaction = true;
			this.factionBtnText = "Hide Faction";
		}
		else
		{
			this.displayFaction = false;
			this.factionBtnText = "Show Faction";
		}
	}

	toggleSecretRole(): void
	{
		if(this.displaySecretRole === false)
		{
			this.displaySecretRole = true;
			this.secretRoleBtnText = "Hide Secret Role";
		}
		else
		{
			this.displaySecretRole = false;
			this.secretRoleBtnText = "Show Secret Role";
		}
	}
}