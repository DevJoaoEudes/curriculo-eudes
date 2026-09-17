import { Component, signal, effect } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [HeroComponent, SkillsComponent, ExperienceComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Signal reativo: true = Dark Mode (padrão), false = Light Mode
  readonly isDarkMode = signal<boolean>(true);

  constructor() {
    // Reage automaticamente quando o signal isDarkMode mudar
    effect(() => {
      const theme = this.isDarkMode() ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  // Método que inverte o valor do signal
  toggleTheme(): void {
    this.isDarkMode.update((dark) => !dark);
  }
}
