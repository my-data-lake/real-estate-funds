export abstract class StorageService {
  abstract upload(
    fileContent: Buffer | string,
    destination: { bucket: string; path: string },
  ): Promise<void>;
}
