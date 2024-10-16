import { GetEndpioint } from '@/services/endpoint';
import { showErrorResponse } from '@/utils/dialog';

export class EndpointClass {
  private static instance: EndpointClass;
  private isLoađed: boolean;
  private map: { [key: string]: string };

  private constructor() {
    this.map = {};
    this.isLoađed = false;
  }

  public static getInstance(): EndpointClass {
    if (!this.instance) {
      this.instance = new EndpointClass();
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

  public hasLoad(): boolean {
    return this.isLoađed;
  }

  public getUrl = (key: string, params: { [key: string]: string } = {}): string => {
    let url = this.map[key];
    if (!url) {
      throw new Error(`Không tìm thấy endpoint key: ${key}`);
    }

    if (params && Object.keys(params).length) {
      for (const param in params) {
        url = url.replace(`{${param}}`, params[param]);
      }
    }

    return url;
  };
}
