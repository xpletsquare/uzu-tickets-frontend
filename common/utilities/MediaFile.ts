
export class MediaFile {
  file: File | Blob;
  src: string | ArrayBuffer = '';

  constructor(file: File | Blob) {
    this._processFile(file);
    this.file = file;
  }

  private _processFile(file: File | Blob) {
    const reader = new FileReader;

    reader.onloadend = () => {
      this.src = reader.result || '';
    }

    reader.readAsDataURL(file);
  }
}