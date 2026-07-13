import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

interface VideoPlayerProps {
  mediaUrl: string;
  mediaType: 'video' | 'image';
  aspectRatio?: number;
  horizontalPadding?: number;
  isWorkoutPaused?: boolean;
}

function WebVideoPlayer({
  mediaUrl,
  playerWidth,
  playerHeight,
  isWorkoutPaused,
}: {
  mediaUrl: string;
  playerWidth: number;
  playerHeight: number;
  isWorkoutPaused: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isWorkoutPaused) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, [isWorkoutPaused]);

  return (
    <View style={[styles.container, { width: playerWidth, height: playerHeight }]}>
      {/* @ts-ignore – web-only element */}
      <video
        ref={videoRef}
        src={mediaUrl}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: '#111',
        }}
      />
    </View>
  );
}

function NativeVideoPlayer({
  mediaUrl,
  playerWidth,
  playerHeight,
  isWorkoutPaused,
}: {
  mediaUrl: string;
  playerWidth: number;
  playerHeight: number;
  isWorkoutPaused: boolean;
}) {
  const videoRef = useRef<Video>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isWorkoutPaused) {
      v.pauseAsync().catch(() => {});
    } else {
      v.playAsync().catch(() => {});
    }
  }, [isWorkoutPaused]);

  return (
    <View style={[styles.container, { width: playerWidth, height: playerHeight }]}>
      <Video
        ref={videoRef}
        source={{ uri: mediaUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={!isWorkoutPaused}
        isLooping
        isMuted
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

export function VideoPlayer({
  mediaUrl,
  mediaType,
  aspectRatio = 16 / 9,
  horizontalPadding = 40,
  isWorkoutPaused = false,
}: VideoPlayerProps) {
  const { width } = useWindowDimensions();
  const playerWidth = width - horizontalPadding;
  const playerHeight = Math.round(playerWidth / aspectRatio);

  if (mediaType === 'image') {
    if (Platform.OS === 'web') {
      return (
        // @ts-ignore – web-only element
        <div
          style={{
            width: playerWidth,
            height: playerHeight,
            borderRadius: 16,
            backgroundImage: `url(${mediaUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: '#111',
          }}
        />
      );
    }
    return (
      <View style={[styles.container, { width: playerWidth, height: playerHeight }]}>
        <Image
          source={{ uri: mediaUrl }}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
        />
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <WebVideoPlayer
        mediaUrl={mediaUrl}
        playerWidth={playerWidth}
        playerHeight={playerHeight}
        isWorkoutPaused={isWorkoutPaused}
      />
    );
  }

  return (
    <NativeVideoPlayer
      mediaUrl={mediaUrl}
      playerWidth={playerWidth}
      playerHeight={playerHeight}
      isWorkoutPaused={isWorkoutPaused}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#111',
    alignSelf: 'stretch',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
