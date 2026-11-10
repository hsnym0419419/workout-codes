import { Image, ImageSourcePropType } from 'react-native';
import { MediaSource } from '@/types/exercise';

export function toUri(source: MediaSource): string {
  if (typeof source === 'number') {
    if (typeof Image.resolveAssetSource === 'function') {
      return Image.resolveAssetSource(source).uri;
    }
    return '';
  }
  if (typeof source === 'string') {
    return source;
  }
  return source.uri;
}

export function toImageSource(source: MediaSource): ImageSourcePropType {
  return { uri: toUri(source) };
}

export function getAspectRatio(source: MediaSource, fallback = 4 / 3): number {
  let dims: { width?: number; height?: number } | null = null;
  if (typeof source === 'number') {
    if (typeof Image.resolveAssetSource === 'function') {
      dims = Image.resolveAssetSource(source);
    }
  } else if (source && typeof source === 'object') {
    dims = source;
  }
  if (dims && dims.width && dims.height) {
    return dims.width / dims.height;
  }
  return fallback;
}
