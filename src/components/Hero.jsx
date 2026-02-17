import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

const heroVideo = '/images/HERO/hero.mp4';
const heroPoster = '/images/One.jpg';
const HERO_VIDEO_TIMEOUT_MS = 9000;

const Hero = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Video state:
  // - videoReady: first frame or playback is available
  // - videoFailed: hard failure, keep poster only
  // - requiresUserPlay: autoplay blocked on some devices (e.g. low power mode)
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [requiresUserPlay, setRequiresUserPlay] = useState(false);

  const tryPlayVideo = useCallback(async (fromUserGesture = false) => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    try {
      // Explicitly force muted inline playback for iOS/Safari compatibility.
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.then === 'function') {
        await playAttempt;
      }

      setVideoReady(true);
      setRequiresUserPlay(false);
    } catch {
      // Autoplay can be blocked on some devices/network modes.
      // Keep poster visible and show a manual play affordance.
      if (fromUserGesture) {
        setVideoFailed(true);
      } else {
        setRequiresUserPlay(true);
      }
    }
  }, [videoFailed]);

  useEffect(() => {
    if (videoFailed) return undefined;

    const timeoutId = window.setTimeout(() => {
      // Only hard-fail when video is neither ready nor waiting on user gesture.
      if (!videoReady && !requiresUserPlay) {
        setVideoFailed(true);
      }
    }, HERO_VIDEO_TIMEOUT_MS);

    // Kick off playback attempt on mount.
    void tryPlayVideo(false);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [videoFailed, videoReady, requiresUserPlay, tryPlayVideo]);

  const handleShopNowClick = () => {
    navigate('/jewelry');
  };

  return (
    <div className="relative pt-16 md:pt-20 min-h-[560px] md:min-h-[680px] flex items-center overflow-hidden">
      {/* Poster/base image is always rendered for instant paint and fallback. */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={heroPoster}
        alt="Lumis hero"
        loading="eager"
        decoding="async"
      />

      {!videoFailed && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          preload="auto"
          autoPlay
          muted
          defaultMuted
          loop
          playsInline
          onLoadedData={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          onCanPlay={() => {
            if (!videoReady) {
              void tryPlayVideo(false);
            }
          }}
          onError={() => setVideoFailed(true)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {requiresUserPlay && !videoFailed && (
        <button
          type="button"
          onClick={() => {
            void tryPlayVideo(true);
          }}
          className="absolute bottom-5 right-5 z-20 px-4 py-2 rounded-full bg-[#2b1f17]/70 backdrop-blur-sm border border-white/40 text-white text-sm font-medium hover:bg-[#2b1f17]/85 transition-colors"
          aria-label="Play hero video"
        >
          Tap to play video
        </button>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-[#1a120c]/35 via-[#2a1d13]/30 to-[#120c08]/55"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Content */}
        <div className="text-center">
          <h1 className="hero-title-reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#fff8f2] mb-5 leading-tight">
            Lumis Pretty Collection
          </h1>
        </div>

        {/* Shop Now Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <button
            className="group relative bg-gradient-to-r from-[#d9c3a6] to-[#9b7f63] text-[#fff8f1] px-7 sm:px-9 md:px-11 py-3.5 sm:py-4 rounded-full font-semibold text-base md:text-lg shadow-[0_10px_30px_rgba(80,58,40,0.35)] hover:shadow-[0_16px_42px_rgba(80,58,40,0.45)] transform hover:scale-105 transition-all duration-300 overflow-hidden touch-manipulation"
            onClick={handleShopNowClick}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Shop Now</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#cfb495] to-[#8f7459] rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
