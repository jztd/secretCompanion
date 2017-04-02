import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class SecretHiterWebsocketService
{
	public websocket: WebSocket;

	// subjects for board
	public playerTracker: BehaviorSubject<string>;
	public infoPanel: BehaviorSubject<string>;
	public policyTracker: BehaviorSubject<string>;
	public electionTracker: BehaviorSubject<string>;
	public voteResultspanel: BehaviorSubject<string>;
	public overLayPanel: BehaviorSubject<string>;

	// subjects for player
	public informationFromServerPanel: BehaviorSubject<string>;
	public votingPanel: BehaviorSubject<string>;
	public policySelectionPanel: BehaviorSubject<string>;
	public nominationPanel: BehaviorSubject<string>;
	
	constructor()
	{

		//setup subjects for board
		this.playerTracker = new BehaviorSubject("");
		this.infoPanel = new BehaviorSubject("");
		this.policyTracker = new BehaviorSubject("");
		this.electionTracker = new BehaviorSubject("");
		this.voteResultspanel = new BehaviorSubject("");
		this.overLayPanel = new BehaviorSubject(""); // secret-hitler.component

		//subjects for player
		this.informationFromServerPanel = new BehaviorSubject("");
		this.votingPanel = new BehaviorSubject("");
		this.policySelectionPanel = new BehaviorSubject("");
		this.nominationPanel = new BehaviorSubject("");
		
	}

	private onOpen(ev: Event): void
	{
		// send create message
		console.log("connection open...");
		console.log(this.websocket.readyState);
	}

	private onMessage(data: any): void
	{
		// overlay stuff
		if("gameCode" in data)
		{
			console.log("received Game Code...");
			this.overLayPanel.next(data);
		}
		else if("badGame" in data || "badCode" in data)
		{
			this.overLayPanel.next(data);
		}
		else if ("connected" in data)
		{
			this.overLayPanel.next(data);
		}
		else if("code" in data)
		{
			// board codes
			if(data["code"] === 0)
			{
				// got player data
				this.playerTracker.next(data);
			}
			else if(data["code"] === 1)
			{
				this.infoPanel.next(data);
			}
			else if(data["code"] === 5)
			{
				console.log("recieved election tracking information")
				this.electionTracker.next(data);
			}
			else if(data["code"] === 3)
			{
				console.log("recieved played policy...")
				this.policyTracker.next(data);
			}
			else if (data["code"] === 4)
			{
				// voting results
				this.voteResultspanel.next(data);
			}
			else if(data["code"] === 9)
			{
				this.overLayPanel.next(data);
				this.playerTracker.next(data);
			}
			else if(data["code"] === 10)
			{
				// voting initiated
				this.infoPanel.next(data);
				this.votingPanel.next(data);
			}
			else if (data["code"] === 11)
			{
				this.infoPanel.next(data);
			}


			// player codes
		}

	}

	private onClose(ev: Event): void
	{

	}

	private onError(ev: Event): void
	{

	}

	public send (data: string): void
	{
		let that = this;

		 let timer = setTimeout(function(){
				if(that.websocket.readyState === 1)
				{
					console.log("sending data...")
					that.websocket.send(data);
					clearTimeout(timer);
				}
			
		}, 1000);
	}

	public start(type: string, gameCode: string ="", name: string =""): void
	{

		console.log("starting connection...");
		this.websocket = new WebSocket("ws://0.0.0.0:9000/");

		this.websocket.onopen =  event => {this.onOpen(event);}
		this.websocket.onmessage = event => { this.onMessage(JSON.parse(event.data));}
		this.websocket.onclose = event => {this.onClose(event);}
		this.websocket.onerror = event => {this.onError(event);}
		
		let msg = {};
		
		if(type === "game")
		{
		 	msg = {'gameName': 'secretHitler'};	
		}
		else if( type === "player")
		{
			msg = {'gameCode':gameCode, 'name':name}
		}

		this.send(JSON.stringify(msg));
	}

}