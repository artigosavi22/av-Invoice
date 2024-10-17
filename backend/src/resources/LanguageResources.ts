export class LanguageResourceManager {
  private static instance: LanguageResourceManager;
  private resources: Map<string, Record<string, string>>;

  private constructor() {
    this.resources = new Map();
  }

  public static getInstance(): LanguageResourceManager {
    if (!LanguageResourceManager.instance) {
      LanguageResourceManager.instance = new LanguageResourceManager();
    }
    return LanguageResourceManager.instance;
  }

  public getResource(language: string): Record<string, string> {
    if (!this.resources.has(language)) {
      const resource: Record<
        string,
        string
      > = require(`./language/${language}.json`);
      this.resources.set(language, resource);
    }
    return this.resources.get(language) as Record<string, string>;
  }
}
