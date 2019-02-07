import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService} from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'handychat';
  chats: Observable<any[]>;

  constructor(public chatService: ChatService) {}
}
