
import { CardData } from '../types';

export const MOCK_CARDS: CardData[] = [
  {
    id: 'art-1',
    name: 'Twilight Sierras',
    artist: 'Elena Rossi',
    year: '1892',
    originCountry: 'Italy / USA',
    medium: 'Thick Oil (Rich Texture - paint stands out from the surface)',
    substrate: 'Primed Linen (Museum Grade - the highest quality, durable fabric base)',
    pigmentQuality: 'Lightfast (Anti-Fade - colors will stay bright for 100+ years; identifies the specific era and geographic region of the paint)',
    surfaceShine: 'Satin Glow (Semi-Matte - needs directional lighting to avoid flattening the depth)',
    physicalHealth: 'Surface Cracks (Damage Alert - directly identifies if the art is aging poorly or has been repaired)',
    placementSuggestion: 'East Wall (No Sun Zone - protects the materials from UV damage)',
    hiddenDetails: 'Hidden Under-layers (X-Ray Secret - detects if there are unique sketches or different paintings hidden under the top layer)',
    mbti: 'INFJ',
    mbtiTrait: 'The Mystic (The Guardian - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'INFJ energy is high-key "main character" vibes for people who actually hate attention. It resonates with this piece because of the soulful, haunting layers hidden behind a simple landscape.',
    shortBio: 'A dramatic oil landscape capturing the golden hour.',
    fullDescription: 'Elena Rossi basically invented the 19th-century "glow-up." This landscape has more layers than a tech-founder’s pitch deck.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Crusty impasto with high-range peaks.',
    substanceAnalysis: [
      { label: 'Linseed Binder', percentage: 72, description: 'OG binding agent for that organic flex.' },
      { label: 'Cadmium', percentage: 8, description: 'The yellow intensity is terrifyingly real.' }
    ],
    style: 'Chic',
    vibe: 'Calm',
    totalAcquisitions: 42,
    reviews: [
      { id: 'rev-1', collectorName: 'Julian V.', mbti: 'INFJ', rating: 5, vibeCheck: 'Finally, a piece that understands my internal monologue.', placedIn: 'Library', date: '2024-11-12', verified: true }
    ]
  },
  {
    id: 'art-2',
    name: 'Geometric Void',
    artist: 'Kaito Tanaka',
    year: '1955',
    originCountry: 'Japan',
    medium: 'Industrial Acrylic (Ultra-Smooth - no visible brushstrokes, high-precision finish)',
    substrate: 'Hardwood Panel (Rigid Base - prevents warping and provides 100% stable color retention)',
    pigmentQuality: 'Eternal Brilliance (Synthetics - identifies mid-century industrial grade pigments produced in Tokyo)',
    surfaceShine: 'High Gloss (Mirror Glow - very shiny, needs soft lighting to avoid glare)',
    physicalHealth: 'Surface Cracks or Warping (Damage Alert - identifies professional restoration in 1998; 100% Pristine status elsewhere)',
    placementSuggestion: 'Office Side-Wall (No Sun Zone - protects the materials from UV damage)',
    hiddenDetails: 'Mathematical Under-grids (X-Ray Secret - detects Tanaka’s structural plotting used to find the "Void" center)',
    mbti: 'INTJ',
    mbtiTrait: 'The Strategist (The Architect - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'INTJ energy is "No thoughts, just logic." If this painting could talk, it would explain why your daily routine is inefficient.',
    shortBio: 'Abstract minimalism exploring the void.',
    fullDescription: 'Kaito was the final boss of "less is more." This is for the minimalists who want a literal black hole in their office.',
    imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Smooth as liquid silk. No brushstrokes allowed.',
    substanceAnalysis: [
      { label: 'Polymer', percentage: 85, description: 'Bulletproof acrylic grade.' },
      { label: 'Carbon', percentage: 12, description: 'The darkest black in the neural archive.' }
    ],
    style: 'Minimalist',
    vibe: 'Focus',
    totalAcquisitions: 18,
    reviews: [
      { id: 'rev-2', collectorName: 'Hiroshi M.', mbti: 'INTJ', rating: 5, vibeCheck: 'Precision incarnate. I put this in my boardroom and productivity increased.', placedIn: 'Executive Suite', date: '2025-01-20', verified: true }
    ]
  },
  {
    id: 'art-4',
    name: 'Neon Metro',
    artist: 'Marcus Thorne',
    year: '1988',
    originCountry: 'USA (NYC)',
    medium: 'Enamel (Industrial Strength - heavy gloss with high drip potential and thick application)',
    substrate: 'Recycled Metal (Brutalist Base - identifies NYC subway origins from 1980s; highly durable but reactive)',
    pigmentQuality: 'Self-Lighting (High Phosphor - glows under specific spectral wavelengths; identifies the neon era of paint manufacture)',
    surfaceShine: 'Iridescent (Oil Slick Glow - color shifts based on viewer angle; needs multi-point lighting)',
    physicalHealth: 'Edge Oxidation (Damage Alert - directly identifies if the art is aging poorly or has been repaired; adds to street aesthetic)',
    placementSuggestion: 'Social Lounge (No Sun Zone - protects the materials from UV damage while maximizing social energy)',
    hiddenDetails: 'Hidden Tag (X-Ray Secret - detects a ghosted graffiti tag "Viper" under the top blue layer)',
    mbti: 'ENTP',
    mbtiTrait: 'The Visionary (The Debater - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ENTP is "Wait, let’s try it this way." This artwork matches the Visionary brain because it breaks rules of traditional canvas use.',
    shortBio: 'Vibrant city lights in a rainy noir setting.',
    fullDescription: 'Marcus Thorne made art for people who think sleep is optional.',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Industrial drip with high-gloss iridescence.',
    substanceAnalysis: [
      { label: 'Zinc Phosphor', percentage: 35, description: 'Secret sauce for neon pop.' },
      { label: 'Acrylate', percentage: 50, description: 'Urban-grade sealant.' }
    ],
    style: 'Bold',
    vibe: 'Energy',
    totalAcquisitions: 210,
    reviews: [
      { id: 'rev-3', collectorName: 'Leo S.', mbti: 'ENTP', rating: 4, vibeCheck: 'Loud and rule-breaking. It feels alive.', placedIn: 'Studio', date: '2024-09-12', verified: true }
    ]
  },
  {
    id: 'art-5',
    name: 'Ethereal Bloom',
    artist: 'Sophie Laurent',
    year: '2021',
    originCountry: 'France',
    medium: 'Mixed Media (Multi-Dimensional - combines watercolor with digital ink overlays)',
    substrate: 'Handmade Cotton Paper (Organic Grid - identifies artisan French production with deckled edges)',
    pigmentQuality: 'Ultra-Pigmented (Max Saturation - contains modern concentrated liquid dyes for extreme vibrance)',
    surfaceShine: 'Matte Finish (No Glare - absorbs 98% of light to emphasize deep color pools)',
    physicalHealth: 'Pristine State (Archival Guard - modern polymer spray prevents moisture absorption)',
    placementSuggestion: 'Bedroom Nook (Intimate Zone - best for soft morning light and personal reflection)',
    hiddenDetails: 'Digital Watermark (X-Ray Secret - contains an embedded NFC chip that links to the artist\'s original voice note)',
    mbti: 'INFP',
    mbtiTrait: 'The Healer (The Idealist - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'INFPs look for the magic in everything. This piece is a literal visual hug. It resonates with the Healer personality because it’s soft but has deep, intense emotional core.',
    shortBio: 'A delicate floral abstraction exploring memory.',
    fullDescription: 'Sophie Laurent doesn\'t paint flowers; she paints the feeling of a flower blooming in your heart.',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Smooth with slight fiber-grain visibility.',
    substanceAnalysis: [
      { label: 'Indigo Dye', percentage: 40, description: 'Natural extract for that deep velvet blue.' },
      { label: 'Polymer Ink', percentage: 60, description: 'Modern binder for high-res sharpness.' }
    ],
    style: 'Chic',
    vibe: 'Intimate',
    totalAcquisitions: 55,
    reviews: [
      { id: 'rev-5', collectorName: 'Clara D.', mbti: 'INFP', rating: 5, vibeCheck: 'I cry every time I look at it. In a good way.', placedIn: 'Bedroom', date: '2024-12-01', verified: true }
    ]
  },
  {
    id: 'art-6',
    name: 'Cyberpunk Skyline',
    artist: 'Jax Vector',
    year: '2023',
    originCountry: 'Singapore',
    medium: 'UV-Reactive Resin (Neon Core - glows intensely under blacklight; identifies the 21st-century synthetic shift)',
    substrate: 'Clear Acrylic Slab (Floating Base - creates a 3D light-box effect without visible borders)',
    pigmentQuality: 'Photoluminescent (Self-Charging - stores ambient light and emits a soft glow in total darkness)',
    surfaceShine: 'Refractive (Prism Glow - splits light into spectral rainbows at sharp angles)',
    physicalHealth: 'High Durability (Industrial Grade - identifies heat-treated resin resistant to scratches)',
    placementSuggestion: 'Media Room (Energy Hub - maximizes the neon effect with artificial lighting)',
    hiddenDetails: 'Circuitry Overlay (X-Ray Secret - under a certain light frequency, the skyline reveals a map of a digital city)',
    mbti: 'ESTP',
    mbtiTrait: 'The Dynamo (The Entrepreneur - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ESTPs are all about the thrill. This piece is loud, fast, and unapologetically modern. It matches the Dynamo energy of Singapore’s fast-paced tech scene.',
    shortBio: 'A futuristic depiction of Singapore in 2100.',
    fullDescription: 'Jax Vector is basically the Da Vinci of the metaverse. This piece isn\'t a window; it\'s a portal to a future that hasn\'t happened yet.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Glassy, cold, and perfectly level.',
    substanceAnalysis: [
      { label: 'Epoxy Resin', percentage: 90, description: 'Crystal clear structural base.' },
      { label: 'Fluorescent Powder', percentage: 10, description: 'The neon engine.' }
    ],
    style: 'Bold',
    vibe: 'Energy',
    totalAcquisitions: 120,
    reviews: [
      { id: 'rev-6', collectorName: 'Zane T.', mbti: 'ESTP', rating: 5, vibeCheck: 'Sick vibes. My gaming room is now complete.', placedIn: 'Man Cave', date: '2025-01-10', verified: true }
    ]
  },
  {
    id: 'art-7',
    name: 'Zen Arch',
    artist: 'Minh Tu',
    year: '2019',
    originCountry: 'Vietnam',
    medium: 'Ink Wash (Fluid Motion - mimics ancient Sumi-e techniques with modern waterproof carbon)',
    substrate: 'Rice Paper on Silk (Breathable Base - identifies traditional Vietnamese mounting for humidity control)',
    pigmentQuality: 'Deep Carbon (Eternal Black - identifies high-density soot particles that won\'t fade)',
    surfaceShine: 'Velvet Matte (Zero Reflect - allows the viewer to focus on the negative space)',
    physicalHealth: 'Pristine Aging (Acid-Free - identifies specialized pH-neutral mounting glue)',
    placementSuggestion: 'Yoga Studio (Zen Zone - calms the visual field and promotes deep breathing)',
    hiddenDetails: 'Seal of Lineage (X-Ray Secret - reveals a hidden family stamp used only by Tu\'s ancestors)',
    mbti: 'ISFJ',
    mbtiTrait: 'The Protector (The Nurturer - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ISFJs value tradition and quiet strength. This piece is the ultimate stabilizer. It provides a visual anchor for the Protector who needs a calm space to recharge.',
    shortBio: 'A minimalist ink study of balance and nature.',
    fullDescription: 'Minh Tu captures the silence between the waves. This is more of a meditation than a painting.',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Fibrous, soft, and slightly absorbent.',
    substanceAnalysis: [
      { label: 'Pine Soot', percentage: 95, description: 'Ancient recipe for the ultimate black.' },
      { label: 'Animal Glue', percentage: 5, description: 'Natural binder for the silk mount.' }
    ],
    style: 'Minimalist',
    vibe: 'Calm',
    totalAcquisitions: 34,
    reviews: [
      { id: 'rev-7', collectorName: 'An N.', mbti: 'ISFJ', rating: 5, vibeCheck: 'Brings immediate peace to my hectic living room.', placedIn: 'Living Room', date: '2024-10-15', verified: true }
    ]
  },
  {
    id: 'art-8',
    name: 'Abstract Ember',
    artist: 'Diego Valdez',
    year: '2020',
    originCountry: 'Mexico',
    medium: 'Encaustic (Waxy Sheen - uses hot beeswax mixed with raw earth pigments)',
    substrate: 'Stone Slab (Heavy Base - identifies volcanic basalt substrate from central Mexico)',
    pigmentQuality: 'Earth Ocher (Natural Depth - identifies mineral deposits from the Jalisco valley)',
    surfaceShine: 'Lustrous (Amber Glow - reflects a warm, waxy light like a candle)',
    physicalHealth: 'Heat Sensitive (Maintenance Alert - identifies a low melting point; must stay below 35°C)',
    placementSuggestion: 'Dining Gallery (Warm Zone - enhances appetite and fireside conversation)',
    hiddenDetails: 'Buried Petroglyphs (X-Ray Secret - detects actual pre-Hispanic stone carvings beneath the wax layer)',
    mbti: 'ESFP',
    mbtiTrait: 'The Performer (The Entertainer - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ESFPs are the life of the party. This artwork is literally fire. It resonates with the Performer because it\'s tactile, warm, and demands to be talked about.',
    shortBio: 'A textured exploration of fire and earth.',
    fullDescription: 'Diego Valdez uses ancient Aztec wax techniques to create something that looks like it\'s still cooling down.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Rough, organic, and deeply layered.',
    substanceAnalysis: [
      { label: 'Beeswax', percentage: 80, description: 'The ancient aromatic binder.' },
      { label: 'Iron Oxide', percentage: 20, description: 'For that deep volcanic red.' }
    ],
    style: 'Abstract',
    vibe: 'Energy',
    totalAcquisitions: 78,
    reviews: [
      { id: 'rev-8', collectorName: 'Mateo R.', mbti: 'ESFP', rating: 5, vibeCheck: 'Everyone who comes over touches it. It’s a great conversation starter.', placedIn: 'Entryway', date: '2024-08-22', verified: true }
    ]
  },
  {
    id: 'art-9',
    name: 'Industrial Pulse',
    artist: 'Lena Krantz',
    year: '2015',
    originCountry: 'Germany',
    medium: 'Spray Enamel (Urban Edge - identifies high-pressure aerosol technique with heavy industrial drippings)',
    substrate: 'Concrete Sheet (Urban Base - identifies cast industrial concrete reinforced with mesh)',
    pigmentQuality: 'Automotive Grade (High Durability - identifies paint used for high-end German machinery)',
    surfaceShine: 'Semi-Gloss (Machine Sheen - reflects like a freshly polished engine block)',
    physicalHealth: 'Impact Resistant (Reinforced - identifies carbon fiber mesh inside the concrete)',
    placementSuggestion: 'Industrial Loft (Command Center - matches high ceilings and exposed brick)',
    hiddenDetails: 'Blueprint Ghost (X-Ray Secret - reveals the original factory plans for the site where the concrete was cast)',
    mbti: 'ISTP',
    mbtiTrait: 'The Virtuoso (The Crafter - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ISTPs love how things are built. This piece is art for people who respect engineering. It resonates with the Virtuoso because it\'s gritty, functional, and technically impressive.',
    shortBio: 'A brutalist abstraction of Berlin’s factory district.',
    fullDescription: 'Lena Krantz is the queen of "factory chic." This isn\'t just art; it\'s a piece of the city.',
    imageUrl: 'https://images.unsplash.com/photo-1515405290373-cf1f00826182?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Gritty, cold, and heavy.',
    substanceAnalysis: [
      { label: 'Portland Cement', percentage: 70, description: 'The backbone of the city.' },
      { label: 'Enamel Steel', percentage: 30, description: 'The industrial heart.' }
    ],
    style: 'Bold',
    vibe: 'Focus',
    totalAcquisitions: 92,
    reviews: [
      { id: 'rev-9', collectorName: 'Karl H.', mbti: 'ISTP', rating: 5, vibeCheck: 'Solid as a rock. Literally.', placedIn: 'Loft', date: '2024-11-05', verified: true }
    ]
  },
  {
    id: 'art-10',
    name: 'Monochromatic Serenity',
    artist: 'Claire Deville',
    year: '2022',
    originCountry: 'Canada',
    medium: 'Plaster & Gesso (Sculptural - identifies a multi-layer drying process that creates 3D relief)',
    substrate: 'Wood Cradle (Stable Frame - identifies kiln-dried birch that prevents surface warping)',
    pigmentQuality: 'Titanium Pure (Infinite White - identifies highest grade mineral white with 99% light reflection)',
    surfaceShine: 'Chalky Matte (Soft Diffusion - scatters light evenly for a cloud-like appearance)',
    physicalHealth: 'Fragile Peaks (Handle Alert - identifies delicate edges that can chip if touched)',
    placementSuggestion: 'Minimalist Office (Focus Zone - eliminates visual noise for deep thinking)',
    hiddenDetails: 'Hand-Signed Void (X-Ray Secret - identifies a tiny artist signature carved into the wood beneath the plaster)',
    mbti: 'INTJ',
    mbtiTrait: 'The Strategist (The Mastermind - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'INTJs need zero distractions. This piece is the ultimate visual silence. It resonates with the Strategist because it\'s orderly, complex in its simplicity, and purely logical.',
    shortBio: 'A study in white textures and light shadows.',
    fullDescription: 'Claire Deville creates art for the mind to rest in. This is 50 shades of white, and every one of them is perfect.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Cracked, topographical, and lunar.',
    substanceAnalysis: [
      { label: 'Calcium Carbonate', percentage: 85, description: 'The structural bone of the relief.' },
      { label: 'White Acrylic', percentage: 15, description: 'Flexible binder for the peaks.' }
    ],
    style: 'Minimalist',
    vibe: 'Focus',
    totalAcquisitions: 45,
    reviews: [
      { id: 'rev-10', collectorName: 'Sarah L.', mbti: 'INTJ', rating: 5, vibeCheck: 'Zero distractions. It helps me enter deep work mode immediately.', placedIn: 'Office', date: '2025-02-14', verified: true }
    ]
  },
  {
    id: 'art-11',
    name: 'Velvet Horizon',
    artist: 'Amara Okafor',
    year: '2018',
    originCountry: 'Nigeria',
    medium: 'Encaustic & Charcoal (Smoky Texture - identifies a fusion of burnt wood and molten wax)',
    substrate: 'Ebonized Oak (Deep Base - identifies dark-stained wood for maximum contrast)',
    pigmentQuality: 'Carbon Ash (Natural Black - identifies charred organic matter from the Savannah)',
    surfaceShine: 'Soft Lustre (Skin Glow - reflects light like polished obsidian)',
    physicalHealth: 'Pristine Preservation (Archival - identifies a specialized wax sealant that resists dust)',
    placementSuggestion: 'Evening Lounge (Mood Zone - glows under dim, incandescent lighting)',
    hiddenDetails: 'Loom Patterns (X-Ray Secret - reveals the texture of traditional Aso Oke fabric used to apply the wax)',
    mbti: 'ISFP',
    mbtiTrait: 'The Composer (The Artist - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ISFPs are all about the aesthetic experience. This piece is pure sensory joy. It resonates with the Composer because it\'s earthy, sophisticated, and deeply personal.',
    shortBio: 'A dark, atmospheric landscape of the Nigerian night.',
    fullDescription: 'Amara Okafor paints with fire and soot. This piece feels like a warm night breeze captured in a frame.',
    imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Velvety, soft, and invitingly dark.',
    substanceAnalysis: [
      { label: 'Oak Charcoal', percentage: 60, description: 'The smoky soul of the piece.' },
      { label: 'Damar Resin', percentage: 40, description: 'For that polished obsidian finish.' }
    ],
    style: 'Chic',
    vibe: 'Intimate',
    totalAcquisitions: 61,
    reviews: [
      { id: 'rev-11', collectorName: 'Fola B.', mbti: 'ISFP', rating: 5, vibeCheck: 'It feels like the painting is breathing. So deep.', placedIn: 'Den', date: '2024-09-30', verified: true }
    ]
  },
  {
    id: 'art-12',
    name: 'Electric Soul',
    artist: 'Kai Storm',
    year: '2024',
    originCountry: 'UK (London)',
    medium: 'Digital Oil (Techno-Fluid - identifies AI-assisted brush strokes printed with physical oil overlays)',
    substrate: 'Aluminum Sheet (Sleek Base - identifies aircraft-grade metal for high-def image clarity)',
    pigmentQuality: 'Neon Acrylic (High Voltage - identifies modern fluorescent dyes with UV-active properties)',
    surfaceShine: 'Metallic Glow (Silver Pulse - the substrate reflects through the paint for a backlit effect)',
    physicalHealth: 'Weather Proof (Outdoor Grade - identifies a protective UV-shield that prevents sun-fading)',
    placementSuggestion: 'Urban Patio (Vibe Center - looks incredible under both sunlight and night neon)',
    hiddenDetails: 'Binary Signature (X-Ray Secret - detects a unique hash code hidden in the pixel-grain to verify its NFT twin)',
    mbti: 'ENTP',
    mbtiTrait: 'The Visionary (The Debater - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ENTPs are always ahead of the curve. This piece is a tech-flex. It resonates with the Visionary because it’s a hybrid of digital and physical, rule-breaking and high-energy.',
    shortBio: 'A high-contrast portrait exploring digital identity.',
    fullDescription: 'Kai Storm is the first artist to master the "phygital" (physical + digital) medium. This isn\'t art; it\'s a status symbol for the 22nd century.',
    imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Slick, vibrant, and perfectly sharp.',
    substanceAnalysis: [
      { label: 'Liquid Oil', percentage: 40, description: 'Physical texture for that human touch.' },
      { label: 'Aluminum', percentage: 60, description: 'The reflective engine of the piece.' }
    ],
    style: 'Bold',
    vibe: 'Energy',
    totalAcquisitions: 156,
    reviews: [
      { id: 'rev-12', collectorName: 'Liam W.', mbti: 'ENTP', rating: 5, vibeCheck: 'It’s basically a billboard for my personality. Love it.', placedIn: 'Office', date: '2025-02-01', verified: true }
    ]
  },
  {
    id: 'art-13',
    name: 'Coastal Silence',
    artist: 'Eva Holm',
    year: '2012',
    originCountry: 'Norway',
    medium: 'Cold Wax & Oil (Matte Layers - identifies a specialized Scandinavian drying process for a frozen look)',
    substrate: 'Wood Board (Rigid Base - identifies Nordic pine for a sturdy, rustic feel)',
    pigmentQuality: 'Granulated Mineral (Stone Dust - identifies natural rock particles mixed into the paint for a sandy texture)',
    surfaceShine: 'Zero Shine (Frost Finish - identifies the absence of resin for a natural, open-pore look)',
    physicalHealth: 'Pristine Aging (Archival - identifies natural resistance to humidity due to high wax content)',
    placementSuggestion: 'Beach House (Themed Zone - resonates with natural ocean surroundings)',
    hiddenDetails: 'Driftwood Frame (X-Ray Secret - identifies actual pieces of storm-washed wood embedded in the board)',
    mbti: 'ISTJ',
    mbtiTrait: 'The Logistician (The Inspector - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ISTJs value reliability and order. This piece is solid, dependable art. It resonates with the Logistician because it\'s grounded in nature, technically precise, and has zero unnecessary fluff.',
    shortBio: 'A minimalist seascape of the Lofoten Islands.',
    fullDescription: 'Eva Holm captures the exact moment a wave turns into seafoam. This is as close as you can get to the ocean without getting wet.',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Gritty, cool, and layered like ice.',
    substanceAnalysis: [
      { label: 'Natural Wax', percentage: 50, description: 'The "frozen" binder.' },
      { label: 'Iron Silt', percentage: 50, description: 'For that authentic Atlantic grey.' }
    ],
    style: 'Minimalist',
    vibe: 'Calm',
    totalAcquisitions: 29,
    reviews: [
      { id: 'rev-13', collectorName: 'Erik S.', mbti: 'ISTJ', rating: 5, vibeCheck: 'No nonsense. Beautifully constructed.', placedIn: 'Study', date: '2024-12-12', verified: true }
    ]
  },
  {
    id: 'art-14',
    name: 'Saffron Dusk',
    artist: 'Priya Verma',
    year: '2023',
    originCountry: 'India',
    medium: 'Gouache on Silk (Vibrant Opaque - identifies traditional Rajasthani painting techniques with modern pigment loads)',
    substrate: 'Tussar Silk (Lustrous Base - identifies organic silk from eastern India with a rich gold-toned grain)',
    pigmentQuality: 'Saffron Extract (Natural Dye - identifies organic spice-based pigments that create a unique glow)',
    surfaceShine: 'Silk Glow (Organic Lustre - the natural shimmer of the fabric shines through the thin paint layers)',
    physicalHealth: 'Pristine Integrity (Archival - identifies modern acid-free mounting for the silk)',
    placementSuggestion: 'Entry Foyer (First Impression - creates a warm and welcoming high-class energy)',
    hiddenDetails: 'Gold Leaf Ghost (X-Ray Secret - detects actual 24k gold powder mixed into the yellow pigment for subtle warmth)',
    mbti: 'ENFJ',
    mbtiTrait: 'The Protagonist (The Giver - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ENFJs are all about warmth and connection. This painting is a sunset you can share. It resonates with the Protagonist because it\'s welcoming, vibrant, and radiates positive leadership energy.',
    shortBio: 'A glowing sunset landscape of the Thar Desert.',
    fullDescription: 'Priya Verma uses literal saffron to paint the sky. This isn\'t just a color; it\'s a fragrance for the eyes.',
    imageUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Smooth with a delicate shimmer.',
    substanceAnalysis: [
      { label: 'Saffron Dye', percentage: 30, description: 'The organic heart of the glow.' },
      { label: 'Gum Arabic', percentage: 70, description: 'Traditional binder for the silk.' }
    ],
    style: 'Chic',
    vibe: 'Energy',
    totalAcquisitions: 84,
    reviews: [
      { id: 'rev-14', collectorName: 'Aditi K.', mbti: 'ENFJ', rating: 5, vibeCheck: 'Everyone feels happier just walking by it.', placedIn: 'Hallway', date: '2025-01-05', verified: true }
    ]
  },
  {
    id: 'art-15',
    name: 'Abstract Rainfall',
    artist: 'Sam Rivers',
    year: '2021',
    originCountry: 'Australia',
    medium: 'Acrylic Pour (Liquid Gravity - identifies a technique using physical motion to spread the paint)',
    substrate: 'Canvas Gallery Wrap (Deep Profile - identifies high-tension fabric suitable for heavy paint loads)',
    pigmentQuality: 'Liquid Plastic (High Flexibility - identifies modern polymers that won\'t crack under movement)',
    surfaceShine: 'Super Gloss (Wet Look - reflects light like a pool of water)',
    physicalHealth: 'Total Resilience (Archival - identifies a thick varnish that protects against moisture)',
    placementSuggestion: 'Living Center (Vibe Hub - acts as a focal point for modern social spaces)',
    hiddenDetails: 'Gravity Map (X-Ray Secret - reveals the tilt-angles used by the artist to guide the paint flows)',
    mbti: 'ESFP',
    mbtiTrait: 'The Performer (The Entertainer - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'ESFPs love a spectacle. This painting is a frozen dance. It resonates with the Performer because it\'s spontaneous, colorful, and fun.',
    shortBio: 'A vibrant blue and white abstract study of gravity.',
    fullDescription: 'Sam Rivers lets the paint do the work. This piece is a snapshot of liquid in motion.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Slick, wavy, and dimensional.',
    substanceAnalysis: [
      { label: 'Silicone Oil', percentage: 5, description: 'The secret for the "cell" textures.' },
      { label: 'Acrylic Resin', percentage: 95, description: 'The vibrant body.' }
    ],
    style: 'Abstract',
    vibe: 'Energy',
    totalAcquisitions: 112,
    reviews: [
      { id: 'rev-15', collectorName: 'Joey M.', mbti: 'ESFP', rating: 5, vibeCheck: 'It’s so bright, it’s like a party on my wall.', placedIn: 'Living Room', date: '2024-07-19', verified: true }
    ]
  },
  {
    id: 'art-16',
    name: 'The Alchemist',
    artist: 'Viktor Drago',
    year: '2016',
    originCountry: 'Russia',
    medium: 'Oxidized Copper & Oil (Metallic Aging - identifies a chemical process where real metal is rusted for color)',
    substrate: 'Steel Sheet (Industrial Base - identifies heavy metal plate as the canvas)',
    pigmentQuality: 'Patina Green (Chemical Reaction - identifies actual copper oxidation for that unique teal glow)',
    surfaceShine: 'Matte & Metallic (Dual Sheen - parts are dull and rusty, others reflect raw steel)',
    physicalHealth: 'Stable Decay (Maintenance Alert - identifies a protective wax that stops further rusting)',
    placementSuggestion: 'Study Alcove (Intimate Tech - best for dark wood and intellectual vibes)',
    hiddenDetails: 'Alchemical Symbols (X-Ray Secret - detects etched symbols from medieval chemistry beneath the paint)',
    mbti: 'INTJ',
    mbtiTrait: 'The Strategist (The Architect - identifies which personality type best resonates with the work’s logic and energy)',
    mbtiSavvyInfo: 'INTJs appreciate the complex systems. This piece is a chemical experiment. It resonates with the Strategist because it\'s rigorous, scientific, and intellectually challenging.',
    shortBio: 'A dark, textured abstract using real metal oxidation.',
    fullDescription: 'Viktor Drago doesn\'t paint; he experiments. This piece literally took 3 months to "rust" into perfection.',
    imageUrl: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=800',
    textureNote: 'Crusty, metallic, and sharp.',
    substanceAnalysis: [
      { label: 'Copper Salt', percentage: 40, description: 'The source of the teal patina.' },
      { label: 'Cold Steel', percentage: 60, description: 'The heavy foundation.' }
    ],
    style: 'Bold',
    vibe: 'Focus',
    totalAcquisitions: 67,
    reviews: [
      { id: 'rev-16', collectorName: 'Dimitri V.', mbti: 'INTJ', rating: 5, vibeCheck: 'The chemistry behind it is fascinating.', placedIn: 'Library', date: '2024-09-02', verified: true }
    ]
  }
];
