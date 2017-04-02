import {Component, OnInit} from '@angular/core';

import { SecretHiterWebsocketService } from './secretHitler-websocket.service';

@Component({
	moduleId: module.id,
	selector: 'election-tracker',
	templateUrl: 'secret-hitler-election-tracker.component.html',
	styleUrls: ['secret-hitler-election-tracker.component.css']
})
export class ElectionTrackerComponent implements OnInit
{
	step1: boolean = false;
	step2: boolean = false;
	step3: boolean = false;
	
	constructor(private shWeb: SecretHiterWebsocketService)
	{

	}
	
	ngOnInit(): void
	{
		// subscribe to stuff
		this.shWeb.electionTracker.subscribe((value) => this.handleMessage(value));
	}

	private handleMessage(data: any): void
	{
		if(data !== '')
		{
			if("reset" in data)
			{
				if(data["reset"] === true)
				{
					this.step1 = false;
					this.step2 = false;
					this.step3 = false;
				}
				else
				{
					if(this.step1 === false)
					{
						this.step1 = true;
					}
					else if( this.step2 === false)
					{
						this.step2 = true;
					}
					else if( this.step3 === false)
					{
						this.step3 = true;
					}
				}
			}	
		}
	}
}