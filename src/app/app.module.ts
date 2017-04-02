import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SecretHitlerComponent }	 from './secret-hitler.component';
import { PlayerTrackerComponent } from './secret-hitler-player-tracker.component';
import { ElectionTrackerComponent } from './secret-hitler-election-tracker.component';
import { PolicyTrackerComponent } from './secret-hitler-policy-tracker.component';
import {SecretHiterWebsocketService} from './secretHitler-websocket.service';
import { VoteResultsComponent } from './secret-hitler-vote-results-panel.component';
import { InfoPanelComponent } from './secret-hitler-info-panel.component';
import { SecretHitlerPlayerComponent} from './secret-hitler-player.component';
import { VotePanelComponent } from './secret-hitler-player-vote-panel.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, SecretHitlerComponent, PlayerTrackerComponent, ElectionTrackerComponent,
   PolicyTrackerComponent, VoteResultsComponent, InfoPanelComponent, SecretHitlerPlayerComponent, VotePanelComponent ],
  providers: [SecretHiterWebsocketService],
  bootstrap:    [ AppComponent ]
})


export class AppModule { }
