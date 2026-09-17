import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill, SkillCategory, SkillLevel } from '../../models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  // Categorias disponíveis para a barra de filtros
  readonly categories: (SkillCategory | 'Todas')[] = [
    'Todas',
    'Frontend',
    'Backend',
    'Dados & Banco',
    'DevOps & Ferramentas'
  ];

  // Estado de Origem 1: Categoria atualmente selecionada (reativo com Signal)
  selectedCategory = signal<SkillCategory | 'Todas'>('Todas');

  // Estado de Origem 2: Catálogo de habilidades do Eudes
  skills = signal<Skill[]>([
    {
      id: 'python',
      name: 'Python',
      category: 'Backend',
      level: 'Domínio',
      description: 'Scripts de automação, APIs com FastAPI/Flask e manipulação de dados.'
    },
    {
      id: 'sql',
      name: 'SQL & Modelagem',
      category: 'Dados & Banco',
      level: 'Domínio',
      description: 'Consultas avançadas, índices, triggers e modelagem relacional (PostgreSQL/MySQL).'
    },
    {
      id: 'angular',
      name: 'Angular (v17 - v22)',
      category: 'Frontend',
      level: 'Domínio',
      description: 'Standalone Components, Signals, Control Flow moderno e arquiteturas escaláveis.'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Frontend',
      level: 'Domínio',
      description: 'Tipagem estrita, generics, interfaces e integração full stack de contratos.'
    },
    {
      id: 'java',
      name: 'Java & Spring Boot',
      category: 'Backend',
      level: 'Uso Diário',
      description: 'APIs RESTful corporativas, Spring Data JPA, Spring Security e validações.'
    },
    {
      id: 'scss',
      name: 'SCSS & CSS Moderno',
      category: 'Frontend',
      level: 'Uso Diário',
      description: 'CSS Grid, Flexbox, Design Tokens, variáveis nativas e arquiteturas responsivas.'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Dados & Banco',
      level: 'Uso Diário',
      description: 'Administração básica, otimização de queries e persistência em produção.'
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'DevOps & Ferramentas',
      level: 'Praticando',
      description: 'Containerização de aplicações frontend e backend, docker-compose e deploys.'
    },
    {
      id: 'git',
      name: 'Git & GitHub',
      category: 'DevOps & Ferramentas',
      level: 'Domínio',
      description: 'Gitflow, versionamento semântico, conventional commits e code review.'
    }
  ]);

  // Estado Derivado: computed() recalcula automaticamente quando selectedCategory ou skills mudar!
  filteredSkills = computed(() => {
    const category = this.selectedCategory();
    const list = this.skills();

    if (category === 'Todas') {
      return list;
    }

    return list.filter(skill => skill.category === category);
  });

  // Ação de interação do usuário disparada pelo template
  setCategory(category: SkillCategory | 'Todas'): void {
    this.selectedCategory.set(category);
  }
}
