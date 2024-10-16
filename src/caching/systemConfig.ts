import { GetEndpioint } from '@/services/endpoint';
import { showErrorResponse } from '@/utils/dialog';

export class SystemConfigClass {
  private static instance: SystemConfigClass;
  private isLoađed: boolean;
  private map: { [key: string]: any };

  private constructor() {
    this.map = {};
    this.isLoađed = false;
  }

  public static getInstance(): SystemConfigClass {
    if (!this.instance) {
      this.instance = new SystemConfigClass();
    }
    return this.instance;
  }

  public async LoadData() {
    try {
      const res = await GetEndpioint();
      this.isLoađed = true;
      this.map = res.data;
    } catch (e: any) {
      showErrorResponse(e);
    }
  }

  public async GetData(): Promise<{ [key: string]: any }> {
    if (!this.isLoađed) {
      await this.LoadData();
    }
    return this.map;
  }
}
