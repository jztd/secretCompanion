import {Component, OnInit, Input} from '@angular/core';
import { SecretHiterWebsocketService } from './secretHitler-websocket.service';


@Component({
	moduleId: module.id,
	selector: 'policy-tracker',
	templateUrl: './secret-hitler-policy-tracker.component.html',
	styleUrls: ['./secret-hitler-policy-tracker.component.css']
})


export class PolicyTrackerComponent implements OnInit
{
	facPolicyCount: number = 0;
	libPolicyCount: number = 0;
	fascistText: Array<string>;

	@Input()
	players: number;

	constructor(private shWeb: SecretHiterWebsocketService)
	{
		this.fascistText = new Array();
	}

	ngOnInit(): void
	{
		this.shWeb.policyTracker.subscribe((value) => this.handleMessage(value));
		this.setPolicyText();

	}

	handleMessage(data: any): void
	{
		if(data !== '')
		{
			if('policy' in data)
			{
				let policy = data['policy'];
				if(policy === 'Liberal')
				{
					this.libPolicyCount++;
				}
				else
				{
					this.facPolicyCount++;
				}
			}
		}
	}

	setPolicyText(): void
	{
		if(this.players < 7)
		{
			this.fascistText.push("Fascist Policy");
			this.fascistText.push("Fascist Policy");
			this.fascistText.push("President Views Top 3 Policies");
		}
		else if(this.players < 9)
		{
			this.fascistText.push("Fascist Policy");
 			this.fascistText.push("President Investigates Another Player");
 			this.fascistText.push("President Issues a Special Election");

		}
		else
		{
			this.fascistText.push("President Investigates Another Player");
			this.fascistText.push("President Investigates Another Player");
			this.fascistText.push("President Issues a Special Election");

		}

		this.fascistText.push("President Must Kill Another Player");
		this.fascistText.push("President Must Kill Another Player + Veto Power Enabled");
		this.fascistText.push("Fascists Win");


	}

}