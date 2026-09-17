export type SkillCategory = 'Frontend' | 'Backend' | 'Dados & Banco' | 'DevOps & Ferramentas';

export type SkillLevel = 'Domínio' | 'Uso Diário' | 'Praticando';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
  description?: string;
}
