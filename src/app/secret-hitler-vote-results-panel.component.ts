import {Component, OnInit} from '@angular/core';

import { SecretHiterWebsocketService } from './secretHitler-websocket.service';

@Component({
	moduleId: module.id,
	selector: 'vote-result-panel',
	templateUrl: './secret-hitler-vote-results-panel.component.html',
	styleUrls:['./secret-hitler-vote-results-panel.component.css'],
})
export class VoteResultsComponent implements OnInit
{

	yesList: Array<string>;
	noList: Array<string>;

	ngOnInit():void
	{
		this.shWeb.voteResultspanel.subscribe((value) => this.handleMessage(value));
	}

	constructor(private shWeb: SecretHiterWebsocketService)
	{
	}

	handleMessage(data: any): void
	{
		if(data !== '')
		{
			if('ja' in data)
			{
				this.yesList = data['ja'];
			}
			if('nein' in data)
			{
				this.noList = data['nein'];
			}
		}
	}
}