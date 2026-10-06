import { Image, ImageSourcePropType } from 'react-native';
import { MediaSource } from '@/types/exercise';

export function toImageSource(source: MediaSource): ImageSourcePropType {
  if (typeof source === 'string') {
    return { uri: source };
  }
  return source;
}

export function toUri(source: MediaSource): string {
  if (typeof source === 'number') {
    return Image.resolveAssetSource(source).uri;
  }
  if (typeof source === 'string') {
    return source;
  }
  return source.uri;
}
