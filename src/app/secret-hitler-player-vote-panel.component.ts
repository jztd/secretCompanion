import { Component, Input, OnInit } from '@angular/core';

import { SecretHiterWebsocketService } from './secretHitler-websocket.service';


@Component({
	moduleId: module.id,
  	selector: 'vote-panel',
  	templateUrl: './secret-hitler-vote-panel.component.html',
  	styleUrls: ['./secret-hitler-vote-panel.component.css'],
})


export class VotePanelComponent implements OnInit
{
	votingData: string;


	constructor(private shWeb: SecretHiterWebsocketService)
	{

	}

	ngOnInit(): void
	{
		this.shWeb.votingPanel.subscribe((value) => this.handleMessage(value));
	}

	handleMessage(data:any): void
	{
		if(data !== '')
		{
			if('code' in data)
			{
				if(data['code'] === 10)
				{
					this.votingData = "Voting for President: " + data['president']+" and Chancellor "+ data['chancellor'];
				}
			}
		}
	}

	submitVote(vote: string): void
	{
		let code = '000';
		let msg = '';
		if(vote === 'ja')
		{
			msg = '1';
		}
		else
		{
			msg = '0';
		}
		// hide everything
		this.votingData = '';

		this.shWeb.send(JSON.stringify({'code': code, 'vote': msg}));
	}
}
