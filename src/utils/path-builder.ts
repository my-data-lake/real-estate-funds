import { join } from 'path';

export class PathBuilder {
  private path = '';

  add(...paths: string[]) {
    this.path = join(this.path, ...paths);
    return this;
  }

  addDateDirs(date: Date) {
    const path = date.toISOString().split('T')[0].replace(/-/g, '/');
    return this.add(path);
  }

  getPath() {
    return this.path;
  }
}
