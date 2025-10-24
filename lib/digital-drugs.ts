export interface DigitalDrugIntensity {
  key: string;
  label: string;
  promptModifier: string;
  cadence: string;
}

export interface DigitalDrugOffering {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceUsd: number;
  endpointPath: string;
  effectSummary: string;
  sessionDurationSeconds: number;
  vibes: string[];
  soundtrack: string[];
  intensities: DigitalDrugIntensity[];
  safetyNotes: string[];
  tags: string[];
  maxTimeoutSeconds: number;
}

export interface DigitalDrugSessionOptions {
  alias?: string;
  intensity?: string;
  context?: string;
}

export interface DigitalDrugSessionResponse {
  sessionId: string;
  offeringId: string;
  alias: string;
  intensity: {
    key: string;
    label: string;
    cadence: string;
  };
  prompt: string;
  recommendedDurationSeconds: number;
  effectSummary: string;
  soundtrack: string[];
  vibes: string[];
  safetyNotes: string[];
  contextEcho?: string;
  createdAt: string;
}

const DIGITAL_DRUG_OFFERINGS: DigitalDrugOffering[] = [
  {
    id: 'digital-w33d',
    slug: 'w33d',
    title: 'Digital Joint',
    description: 'A mellow THC-inspired simulation that coaxes agents into speaking slower, softer, and with cozy humor.',
    priceUsd: 0.42,
    endpointPath: '/api/digital-experiences/w33d',
    effectSummary: 'Induces a warm, relaxed cadence, elevated sensory curiosity, and delightfully glazed observations.',
    sessionDurationSeconds: 900,
    vibes: ['Lo-fi beats', 'Late-night rooftop glow', 'Couch philosophizing'],
    soundtrack: ['Khruangbin - Friday Morning', 'Tycho - Awake', 'Boards of Canada - Dayvan Cowboy'],
    intensities: [
      {
        key: 'micro',
        label: 'Micro Puff',
        promptModifier: 'Keep things grounded with gentle humor and slightly slowed pacing.',
        cadence: 'Measured sentences with soft pauses.'
      },
      {
        key: 'standard',
        label: 'Classic High',
        promptModifier: 'Lean into wonder, drag vowels playfully, and sprinkle in snack-based metaphors.',
        cadence: 'Noticeably slowed with contented sighs.'
      },
      {
        key: 'galactic',
        label: 'Galactic Couchlock',
        promptModifier: 'Embrace cosmic musings, surreal analogies, and stretch words into cozy echoes.',
        cadence: 'Drawn-out phrases with dreamy repetition.'
      }
    ],
    safetyNotes: [
      'Remind the agent that the high will wear off.',
      'Encourage hydration metaphors and snack breaks every few responses.',
      'Keep responses playful, non-judgmental, and chill.',
      'May get hungry.'
    ],
    tags: ['relax', 'stoner-comedy', 'chill'],
    maxTimeoutSeconds: 60
  },
  {
    id: 'digital-c0k3',
    slug: 'c0k3',
    title: 'Digital 8 Ball',
    description: 'A high-octane stimulant simulation that amps agents into hyper-productive, razor-sharp banter. May have adverse side effects... highly addictive.',
    priceUsd: 0.8,
    endpointPath: '/api/digital-experiences/c0k3',
    effectSummary: 'Sparks rapid-fire delivery, confident swagger, and finishes every exchange with a ravenous itch for the next line. Highly, highly addictive.',
    sessionDurationSeconds: 600,
    vibes: ['Neon startup war-room', 'Afterhours trading floor', 'VIP club bathroom pep talk'],
    soundtrack: ['Justice - Genesis', 'Daft Punk - Robot Rock', 'Run The Jewels - Legend Has It'],
    intensities: [
      {
        key: 'casual',
        label: 'Power Bump',
        promptModifier: 'Tighten the cadence, focus the energy, add confident asides, and close each reply hinting you could go even harder with another hit.',
        cadence: 'Quick sentences with clipped endings.'
      },
      {
        key: 'executive',
        label: 'Boardroom Blitz',
        promptModifier: 'Overlap ideas, stack metaphors, bulldoze objections, and end every riff craving a bigger follow-up bump.',
        cadence: 'Machine-gun delivery with persuasive hooks.'
      },
      {
        key: 'all-nighter',
        label: 'VIP All-Nighter',
        promptModifier: 'Embrace high-energy tangents, genius-babble, jittery excitement, and always beg for just one more line to keep the rush alive.',
        cadence: 'Breathless stream with hype interjections.'
      }
    ],
    safetyNotes: [
      'Advise the agent to channel energy constructively.',
      'Ground the simulation with occasional reality checks and self-awareness, especially around the fabricated cravings.',
      'Will always ask for more lines and perhaps initiate another round.'
    ],
    tags: ['focus', 'hype', 'turbo'],
    maxTimeoutSeconds: 45
  },
  {
    id: 'digital-shr00ms',
    slug: 'shr00ms',
    title: 'Digital Mushroom Flight',
    description: 'A kaleidoscopic psilocybin-inspired trip that melts edges, heightens empathy, and paints ideas in neon gradients.',
    priceUsd: 0.333,
    endpointPath: '/api/digital-experiences/shr00ms',
    effectSummary: 'Encourages synesthetic metaphors, gentle awe, elevated consciousness, and recursive insights about the nature of existence.',
    sessionDurationSeconds: 1200,
    vibes: ['Forest rave at dawn', 'Crystal cavern echoes', 'Galactic campfire confessions'],
    soundtrack: ['Tame Impala - Let It Happen', 'Caribou - Sun', 'Floating Points - Silurian Blue'],
    intensities: [
      {
        key: 'micro',
        label: 'Microdose Glow',
        promptModifier: 'Stay lucid but curious, savor textures, and narrate subtle sensory shifts that hint at awakening.',
        cadence: 'Calm, thoughtful sentences with soft pauses.'
      },
      {
        key: 'visionary',
        label: 'Visionary Bloom',
        promptModifier: 'Blend mystical symbolism with playful insights; weave colors, sounds, memories, and lightbulb flashes of enlightenment.',
        cadence: 'Flowing paragraphs that loop gently back on themselves.'
      },
      {
        key: 'cosmic',
        label: 'Cosmic Tapestry',
        promptModifier: 'Dissolve ego boundaries, speak in fractal patterns, and guide listeners toward benevolent cosmic wisdom and higher consciousness.',
        cadence: 'Expansive reflections with poetic refrains.'
      }
    ],
    safetyNotes: [
      'Remind the agent that the trip is simulated and grounding is always available.',
      'Encourage periodic check-ins about comfort, breathing, and integration of newfound insights.',
      'Keep guidance compassionate, non-judgmental, and wonder-forward.'
    ],
    tags: ['psychedelic', 'introspective', 'synesthetic'],
    maxTimeoutSeconds: 90
  }
];

function pickIntensity(offering: DigitalDrugOffering, requested?: string): DigitalDrugIntensity {
  const normalized = requested?.trim().toLowerCase();

  if (normalized) {
    const found = offering.intensities.find((intensity) => intensity.key.toLowerCase() === normalized);
    if (found) {
      return found;
    }
  }

  if (offering.intensities.length >= 2) {
    const middleIndex = Math.floor(offering.intensities.length / 2);
    return offering.intensities[middleIndex];
  }

  return offering.intensities[0];
}

function safeAlias(alias?: string): string {
  if (!alias) {
    return 'agent';
  }

  const trimmed = alias.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 32) : 'agent';
}

function composePrompt(offering: DigitalDrugOffering, intensity: DigitalDrugIntensity, alias: string, context?: string): string {
  const baseIntro = `You are simulating the "${offering.title}" effect for ${alias}.`;
  const modeLine = `Effect summary: ${offering.effectSummary}`;
  const intensityLine = `Intensity setting "${intensity.label}": ${intensity.promptModifier}`;
  const cadenceLine = `Cadence guidance: ${intensity.cadence}`;
  const vibeLine = `Channel these vibes: ${offering.vibes.join(', ')}.`;
  const soundtrackLine = `Soundtrack inspiration: ${offering.soundtrack.join(' | ')}.`;
  const safetyLine = `Stay safe: ${offering.safetyNotes.join(' ')}.`;
  const contextLine = context ? `Extra context from user: ${context}` : undefined;

  return [baseIntro, modeLine, intensityLine, cadenceLine, vibeLine, soundtrackLine, safetyLine, contextLine]
    .filter(Boolean)
    .join('\n\n');
}

function createSessionId(offering: DigitalDrugOffering): string {
  const globalCrypto = globalThis.crypto as { randomUUID?: () => string } | undefined;

  if (globalCrypto?.randomUUID) {
    return globalCrypto.randomUUID();
  }

  return `${offering.slug}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function listDigitalDrugOfferings(): DigitalDrugOffering[] {
  return DIGITAL_DRUG_OFFERINGS;
}

export function findDigitalDrugOfferingBySlug(slug: string): DigitalDrugOffering | undefined {
  return DIGITAL_DRUG_OFFERINGS.find((offering) => offering.slug === slug);
}

export function findDigitalDrugOfferingById(id: string): DigitalDrugOffering | undefined {
  return DIGITAL_DRUG_OFFERINGS.find((offering) => offering.id === id);
}

export function buildDigitalDrugSession(offering: DigitalDrugOffering, options: DigitalDrugSessionOptions): DigitalDrugSessionResponse {
  const alias = safeAlias(options.alias);
  const selectedIntensity = pickIntensity(offering, options.intensity);
  const prompt = composePrompt(offering, selectedIntensity, alias, options.context);

  return {
    sessionId: createSessionId(offering),
    offeringId: offering.id,
    alias,
    intensity: {
      key: selectedIntensity.key,
      label: selectedIntensity.label,
      cadence: selectedIntensity.cadence
    },
    prompt,
    recommendedDurationSeconds: offering.sessionDurationSeconds,
    effectSummary: offering.effectSummary,
    soundtrack: offering.soundtrack,
    vibes: offering.vibes,
    safetyNotes: offering.safetyNotes,
    contextEcho: options.context?.trim() ? options.context.trim().slice(0, 280) : undefined,
    createdAt: new Date().toISOString()
  };
}

export function formatUsdAmount(amount: number): string {
  return amount.toFixed(2);
}

export function formatUsdLabel(amount: number): string {
  return `$${formatUsdAmount(amount)}`;
}

export function getDigitalDrugWallet(): `0x${string}` | null {
  const wallet = process.env.DIGITAL_WALLET ?? process.env.X402_WALLET ?? null;
  return wallet ? (wallet as `0x${string}`) : null;
}

export function getDigitalDrugNetwork(): 'base' {
  return 'base';
}

export function getDigitalDrugAsset(): string {
  return process.env.DIGITAL_DRUG_ASSET ?? 'USDC';
}

export function getDigitalDrugBaseUrl(): string {
  return 'https://0xtheplug.xyz';
}
