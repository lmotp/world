import {
  LoadingManager,
  TextureLoader,
  DataArrayTexture,
  RGBAFormat,
  UnsignedByteType,
  LinearMipMapLinearFilter,
  LinearFilter,
  ClampToEdgeWrapping,
} from "three";

function _GetImageData(image: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext("2d") as any;
  context.translate(0, image.height);
  context.scale(1, -1);
  context.drawImage(image, 0, 0);

  return context.getImageData(0, 0, image.width, image.height);
}

class TextureAtlas {
  private manager_: any;
  private loader_: any;
  private textures_: any; // You might want to replace 'any' with a more specific type
  public onLoad: () => void;

  constructor() {
    this.create_();
    this.onLoad = () => {};
  }

  Load(atlas: string, names: string[]) {
    this.loadAtlas_(atlas, names);
  }

  create_() {
    this.manager_ = new LoadingManager();
    this.loader_ = new TextureLoader(this.manager_);
    this.textures_ = {};

    this.manager_.onLoad = () => {
      this.onLoad_();
    };
  }

  get Info() {
    return this.textures_;
  }

  onLoad_() {
    for (let k in this.textures_) {
      let X = null;
      let Y = null;
      const atlas = this.textures_[k];
      let data = null;

      for (let t = 0; t < atlas.textures.length; t++) {
        const loader = atlas.textures[t];
        const curData = loader();

        const h = curData.height;
        const w = curData.width;

        if (X === null) {
          X = w;
          Y = h;
          data = new Uint8Array(atlas.textures.length * 4 * X * Y) as any;
        }

        if (w !== X || h !== Y) {
          console.error("Texture dimensions do not match");
          return;
        }
        const offset = t * (4 * w * h);

        data.set(curData.data, offset);
      }

      const diffuse = new DataArrayTexture(data, X, Y, atlas.textures.length);
      diffuse.format = RGBAFormat;
      diffuse.type = UnsignedByteType;
      diffuse.minFilter = LinearMipMapLinearFilter;
      diffuse.magFilter = LinearFilter;
      diffuse.wrapS = ClampToEdgeWrapping;
      diffuse.wrapT = ClampToEdgeWrapping;
      // diffuse.wrapS = THREE.RepeatWrapping;
      // diffuse.wrapT = THREE.RepeatWrapping;
      diffuse.generateMipmaps = true;
      diffuse.needsUpdate = true;

      atlas.atlas = diffuse;
    }

    this.onLoad();
  }

  loadType_(t: string) {
    if (typeof t == "string") {
      const texture = this.loader_.load(t);
      return () => {
        return _GetImageData(texture.image);
      };
    } else {
      return () => {
        return t;
      };
    }
  }

  loadAtlas_(atlas: string, names: string[]) {
    this.textures_[atlas] = {
      textures: names.map((n) => this.loadType_(n)),
    };
  }
}

export default TextureAtlas;
