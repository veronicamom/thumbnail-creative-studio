import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { TelegramBotSimulator } from './components/TelegramBotSimulator';
import { ThumbnailStudio } from './components/ThumbnailStudio';
import { CastingComparator } from './components/CastingComparator';
import { TemplateLibrary } from './components/TemplateLibrary';
import { FontIntelligenceManager } from './components/FontIntelligenceManager';
import { FontLicenseManager } from './components/FontLicenseManager';
import { LogoManager } from './components/LogoManager';
import { ImplementationPlanViewer } from './components/ImplementationPlanViewer';
import {
  ACTOR_PROFILES,
  AGENCY_LOGOS,
  generateCuratedPresets,
  INITIAL_TELEGRAM_CONFIG
} from './data/defaultData';
import { SAMPLE_PHOTOS } from './data/sampleImages';
import {
  ActorProfile,
  AgencyLogo,
  DesignPreset,
  TelegramConfig
} from './types/studio';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('compare');
  const [presets, setPresets] = useState<DesignPreset[]>(() => generateCuratedPresets());
  const [currentPreset, setCurrentPreset] = useState<DesignPreset>(() => presets[0]);
  const [logos, setLogos] = useState<AgencyLogo[]>(AGENCY_LOGOS);
  const [activeLogo, setActiveLogo] = useState<AgencyLogo>(AGENCY_LOGOS[0]);
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>(INITIAL_TELEGRAM_CONFIG);
  const [actorProfiles, setActorProfiles] = useState<ActorProfile[]>(ACTOR_PROFILES);
  const [currentPhoto, setCurrentPhoto] = useState<string>(SAMPLE_PHOTOS[0].dataUrl);

  // Switch to Studio with chosen preset and photo
  const handleOpenInStudio = (preset: DesignPreset, photoUrl?: string, captionText?: string) => {
    setCurrentPreset(preset);
    if (photoUrl) setCurrentPhoto(photoUrl);
    setActiveTab('studio');
  };

  // Apply Font Pairing from AI Font Curator directly
  const handleApplyFontPairing = (titleFont: string, actorFont: string) => {
    const updated: DesignPreset = {
      ...currentPreset,
      title: {
        ...currentPreset.title,
        font: titleFont
      },
      actorName: {
        ...currentPreset.actorName,
        font: actorFont
      }
    };
    setCurrentPreset(updated);
    setActiveTab('studio');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Universal Top Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onQuickCreate={() => setActiveTab('studio')}
        isBotConfigured={telegramConfig.isConnected || !!telegramConfig.botToken}
      />

      {/* Main Tab Views */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'simulator' && (
          <TelegramBotSimulator
            presets={presets}
            activeLogo={activeLogo}
            telegramConfig={telegramConfig}
            onUpdateTelegramConfig={setTelegramConfig}
            onOpenInStudio={handleOpenInStudio}
          />
        )}

        {activeTab === 'compare' && (
          <CastingComparator
            referencePhotoUrl={currentPhoto}
            presets={presets}
            activeLogo={activeLogo}
            onOpenInStudio={handleOpenInStudio}
          />
        )}

        {activeTab === 'studio' && (
          <ThumbnailStudio
            currentPreset={currentPreset}
            currentPhoto={currentPhoto}
            currentLogo={activeLogo}
            allPresets={presets}
            allLogos={logos}
            onSelectPreset={setCurrentPreset}
            onSelectLogo={setActiveLogo}
          />
        )}

        {activeTab === 'templates' && (
          <TemplateLibrary
            presets={presets}
            onSelectPreset={setCurrentPreset}
            onOpenInStudio={(preset) => handleOpenInStudio(preset)}
          />
        )}

        {activeTab === 'fonts' && (
          <FontIntelligenceManager
            onApplyFontPairing={handleApplyFontPairing}
          />
        )}

        {activeTab === 'license' && (
          <FontLicenseManager />
        )}

        {activeTab === 'logos' && (
          <LogoManager
            logos={logos}
            activeLogo={activeLogo}
            onSelectLogo={setActiveLogo}
            onAddLogo={(newLogo) => setLogos((prev) => [newLogo, ...prev])}
            actorProfiles={actorProfiles}
            onUpdateActorProfiles={setActorProfiles}
          />
        )}

        {activeTab === 'plan' && (
          <ImplementationPlanViewer />
        )}
      </main>

      {/* Subdued Footer */}
      <footer className="border-t border-white/10 bg-[#09090b] py-4 px-6 text-center text-xs text-zinc-500 font-mono">
        TELEGRAM CREATIVE STUDIO (TCS) · CAA & MMA AGENCY DESIGN AUTOMATION ENGINE · MAC STUDIO DAEMON COMPATIBLE
      </footer>
    </div>
  );
}
