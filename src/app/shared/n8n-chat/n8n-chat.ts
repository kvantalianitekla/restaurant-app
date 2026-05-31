import { Component, afterNextRender } from '@angular/core';
import { createChat } from '@n8n/chat';
import { fromReadableStreamLike } from 'rxjs/internal/observable/innerFrom';

@Component({
  selector: 'app-n8n-chat',
  imports: [],
  templateUrl: './n8n-chat.html',
  styleUrl: './n8n-chat.css',
})
export class N8nChat {
  constructor() {
    afterNextRender(() => {
      createChat({
        webhookUrl: 'http://localhost:5678/webhook/7fca97dd-6ed3-4134-b41c-a6ea8baf3fe5/chat',
        target: '#n8n-chat',
        mode: 'window',
        defaultLanguage: 'en',
        showWelcomeScreen: false,
        initialMessages: ['Hello! How can I assist you today?'],

        i18n: {
          en: {
            title: 'your assistant',
            subtitle: 'AI robot',
            inputPlaceholder: 'Type your message here...',
            footer: '',
            getStarted: '',
            closeButtonTooltip: '',
          },
        },
      });
    });
  }
}
