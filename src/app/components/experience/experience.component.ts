import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  // Marcos da Jornada Técnica modelados como Missões / Quests de Aventura RPG
  experiences = signal<Experience[]>([
    {
      id: 'proenergia-2026',
      role: 'Boss Raid: O Desafio Proenergia Summit',
      organization: 'Arena de Inovação Energética [Ano 2026]',
      period: 'FASE 03 // 2026',
      type: 'Hackathon',
      questStage: 'FASE 03 // BOSS RAID',
      questBadge: 'DUNGEON CONCLUÍDA',
      description: 'Convocado para uma maratona de desenvolvimento de alta intensidade. Liderança na forja de interfaces reativas em Angular 22 com Signals, integrando feitiços de backend em Python e modelagem relacional de dados em tempo recorde.',
      technologies: ['Angular 22', 'TypeScript', 'SCSS', 'Python', 'SQL']
    },
    {
      id: 'projetos-praticos',
      role: 'Missão Principal: Forja de Sistemas Full Stack',
      organization: 'Laboratório de Código Aberto [2025 - 2026]',
      period: 'FASE 02 // 2025 - 2026',
      type: 'Projeto',
      questStage: 'FASE 02 // MAIN QUEST',
      questBadge: 'QUEST EM PROGRESSO',
      description: 'Expedição contínua de desenvolvimento: criação de APIs RESTful com Java e Python, desvendamento de mistérios da POO e arquitetura de bancos de dados relacionais robustos com SQL.',
      technologies: ['Python', 'SQL', 'Java', 'Angular', 'Git & GitHub']
    },
    {
      id: 'formacao-continua',
      role: 'Prólogo: Os Fundamentos da Engenharia',
      organization: 'Academia de Autodidatas & Trilhas de Maestria',
      period: 'FASE 01 // 2024 - Presente',
      type: 'Formação',
      questStage: 'FASE 01 // TUTORIAL',
      questBadge: 'BASE DESBLOQUEADA',
      description: 'Início da jornada do herói: domínio das leis ancestrais de Clean Code, estruturas de dados, versionamento com Git e princípios de sistemas escaláveis para subir de nível constantemente.',
      technologies: ['Estrutura de Dados', 'Clean Code', 'Bancos Relacionais', 'Metodologias Ágeis']
    }
  ]);
}
