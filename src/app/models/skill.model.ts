export type SkillCategory = 'Frontend' | 'Backend' | 'Dados & Banco' | 'DevOps & Ferramentas';

export type SkillLevel = 'Domínio' | 'Uso Diário' | 'Praticando';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  gameLevel: string; // Nível no estilo jogo retro (sempre abaixo de 50)
  icon?: string;
  description?: string;
}
