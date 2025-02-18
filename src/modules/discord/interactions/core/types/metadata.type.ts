export interface CommandMetadata {
  name: string;
  description: string;
  permissions?: string[];
  cooldown?: number;
}
