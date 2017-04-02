import { Component, OnInit } from '@angular/core';
import { SecretHiterWebsocketService } from './secretHitler-websocket.service';

@Component({
	moduleId: module.id,
	selector: 'information-panel',
	templateUrl: './secret-hitler-info-panel.component.html',
	styleUrls: ['./secret-hitler-info-panel.component.css']
})
export class InfoPanelComponent implements OnInit
{
	information: string;
	currentPresident: string;

	constructor( private shWeb: SecretHiterWebsocketService)
	{

	}

	ngOnInit(): void
	{
		this.shWeb.infoPanel.subscribe((value) => this.handleMessage(value));
	}

	handleMessage(data: any)
	{
		if(data !== '')
		{
			if(data['code'] === 10)
			{
				this.information = "Voting on the goverment of " + data['president']  + " and " + data['chancellor']
			}
			else if( data['code'] === 1)
			{
				this.currentPresident = data['name'];
			}
			else if(data['code'] == 11)
			{
				this.information = "President killed "+ data["name"];
			}
		}
	}
}