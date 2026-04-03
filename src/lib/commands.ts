export type CommandOutput =
  | { type: "text"; content: string }
  | { type: "ascii"; content: string }
  | { type: "list"; items: { label: string; value: string }[] }
  | { type: "section"; heading: string; body: string[] }
  | { type: "links"; heading: string; items: { label: string; description: string; url: string }[] }
  | { type: "error"; content: string };

export interface HistoryEntry {
  input: string;
  output: CommandOutput[];
}

export const COMMANDS: Record<string, () => CommandOutput[]> = {
  help: () => [
    {
      type: "list",
      items: [
        { label: "about", value: "Background and experience" },
        { label: "clients", value: "Brand roster" },
        { label: "work", value: "Selected projects" },
        { label: "contact", value: "Get in touch" },
        { label: "clear", value: "Clear the terminal" },
      ],
    },
  ],

  about: () => [
    {
      type: "ascii" as const,
      content: `
  +++=================================++++++++++++++++++++++++++++++++++++++++
  +=+================================++=++++++++++++++++++++++++++++++++++++++
  ++++=+=============================+++**++++++++++++++++++++++++++++++++++++
  +++++==========================+#%%%%%%%%%%%@%*+++++++++++++++++++++++++++++
  ++++=+=====================++%####%%%%%%%%%@@@@@@*++++++++++++++++++++++++++
  +++++++++================+###*##*########%%%@@%@@@@#++++++++++++++++++++++++
  +++++++==+=============+##*************########%%%@@@*++++++++++++++++++++++
  ++++++++++==+==+====+++##********+***+*+*******#####%@%+++++++++++++++++++++
  +++++++++++++++=++===*%##******++++++++++********####%@@++++++++++++++++++++
  +++++++++++++++++++++%###****++++++++++++++++*****####%@@+++++++++++++++++++
  ++++++++++++++++++++#%###******+++++++++++++++****#####%@#++++++++++++++++++
  ++++++++++++++++++++#%####******++++++++++++*******####%@%++++++++++++++++++
  ++++++++++++++++++++%%###*#***++++++++++++++*******###%@@%++++++++++++++++++
  ++++++++++++++++++++%########****++++++++++++++**#####%%@%++++++++++++++++++
  ++++++++++++++++++*#%######*######**+++++++***#**######%@%++++++++++++++++++
  +++++++++++++++++***%########%%%###**++++*#############%@#++++++++++++++++++
  ++++++++++++++++++**###**###*#%#+**##****###*%%@%######%@#*#++++++++++++++++
  ++++++++++++++++++*+*##************##***##****##*######%#*#*++++++++++++++++
  ++++++++++++++++++++*##***++*++++**##****##**********###*+*+++++++++++++++++
  ++++++++++++++++++*+*##****++*****###***###****+*****##*++*+++++++++++++++++
  ++++++++++++++++++***##****++++***##**+**##**++*****###*++*+++++++++++++++++
  ++++++++++++++++++++*##*******+**#***+++*###++**+***###***++++++++++++++++++
  +++++++++++++++++++++###******++**#*#######**++****####**+++++++++++++++++++
  +++++++++++++++++++++###*****+*****************+**####**++++++++++++++++++++
  +++++++++++++++++++++####***********+**+**********####++++++++++++++++++++++
  +++++++++++++++++++++*#####****###############***####+++++++++++++++++++++++
  ++++++++++++++++++++++*####*******#******###*****###*+++++++++++++++++++++++
  +++++++++++++++++++++++######******************#####++++++++++++++++++++++++
  +++++++++++++++++++++++*#######**************####%#*++++++++++++++++++++++++
  +++++++++++++++++++++++*########************###%%##*++++++++++++++++++++++++
  +++++++++++++++++++++++#**#%%%####********###%%%###*++++++++++++++++++++++++
  +++++++++++++++++++++++##*###%%%%##########%%%%#####++++++++++++++++++++++++
  ++++++++++++++++++++++*##***####%%%%%%%%%%%%###*####++++++++++++++++++++++++
  ++++++++++++++++++++####*#*#######********####*######@*+++++++++++++++++++++
  +++++++++++++++++*#%#####****#####*******#######*#####@@%*++++++++++++++++++
  ++++++++++++++#%@@@@#####*****######***#######**######@@@@@%#+++++++++++++++
  ++++++++++#%@@@@@@@@%####******####*########***######@@@@@@@@@%%*+++++++++++
  ++++++*%%@@@@@@@@@@@@%###*******#########*****#*####%@@@@@@@@@@@%%%#++++++++
  +++*%@@@@@@@@@@@@@@@@@@###*********************##*#%@@@@@@@@@@@@@%%%%%%#*+++
  #%@@@@@@@@@@@@@@@@@@@@@@##*##*****#***********####@@@@@@@@@@@@@%@%@%%%%%%###
  @@@@@@@@@@@@@@@@@@@@@@@@@@%###******##*******###@@@@@@@@@@@@@@@@%@%%%%%%%%##
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@###***********##%@@@@@@@@@@@@@@@@@@%%%%%%%%%###
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%####
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@%%%%%%%###*
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%###*+++++++++++++++
  @@@@@@@@@@@@@@@@@@@@%%%%%%%%#########*********++*+++*+++++++++++++++++++++++`,
    },
    {
      type: "section",
      heading: "Adam Copeland — Executive Producer",
      body: [
        "A career spanning 20+ years in production resulting in award-winning work",
        "working across a broad spectrum of clients from sports apparel to tech",
        "to gaming to luxury to food and beverage to pharma among others.",
        "",
        "Led large production teams and developed scalable in-house production, content",
        "creation, and creative services teams. Fluent in all formats from traditional",
        "to digital and scaled creative work with robust localization expertise.",
        "Ability to flex from small and budget-restricted projects to high-profile",
        "multi-million dollar efforts.",
        "",
        "Adept manager having managed teams of up to 40+ employees. Strong background",
        "in creative talent management with a unique first-hand view of high-profile",
        "talent having served as Kanye West's assistant early in my career.",
      ],
    },
  ],

  clients: () => [
    {
      type: "section",
      heading: "Brand Roster",
      body: [
        "SPORTS APPAREL   Nike · Adidas · HOKA",
        "TECH             Microsoft · Intel · Tencent",
        "GAMING           Xbox · Pokémon · Activision · Ubisoft · Riot Games",
        "LUXURY           L'Oréal · Louis Vuitton · Hugo Boss · Assouline",
        "FASHION          Men's Wearhouse",
        "FOOD & BEV       Bacardi · Patrón",
        "PHARMA           Johnson & Johnson",
      ],
    },
  ],

  work: () => [
    {
      type: "links",
      heading: "Selected Projects",
      items: [
        {
          label: "Kanye West — Yeethoven: Kanye & Beethoven Mashup",
          description: "YouTube",
          url: "https://www.youtube.com/watch?v=DdF8Z1hMEwg",
        },
        {
          label: "Kanye West — My Beautiful Dark Twisted Fantasy Film",
          description: "YouTube",
          url: "https://www.youtube.com/watch?v=Jg5wkZ-dJXA",
        },
        {
          label: "Kanon — Brand Film",
          description: "YouTube",
          url: "https://www.youtube.com/watch?v=vdRny3uE7cU",
        },
        {
          label: "Adidas — Never Made",
          description: "Vimeo",
          url: "https://vimeo.com/477378020",
        },
        {
          label: "Adidas — Alexander Wang Season 1",
          description: "Vimeo",
          url: "https://vimeo.com/272070261",
        },
        {
          label: "Adidas — NMD Launch",
          description: "Vimeo",
          url: "https://vimeo.com/474812321",
        },
        {
          label: "Adidas — Y-3 Paris Runway Livestream",
          description: "Vimeo",
          url: "https://vimeo.com/323616990",
        },
        {
          label: "Adidas — Art Basel #TLKS",
          description: "Vimeo",
          url: "https://vimeo.com/324851518",
        },
        {
          label: "Adidas — Brand Film",
          description: "Vimeo",
          url: "https://vimeo.com/324850428",
        },
        {
          label: "Adidas — Brand Film (Never Finished)",
          description: "Vimeo",
          url: "https://vimeo.com/585219281",
        },
        {
          label: "Adidas — Pitch Black NMD",
          description: "Vimeo",
          url: "https://vimeo.com/324851774",
        },
        {
          label: "Adidas — AI NMD Film",
          description: "Vimeo",
          url: "https://vimeo.com/324851408",
        },
        {
          label: "Adidas — Arkyn",
          description: "Vimeo",
          url: "https://vimeo.com/585216064",
        },
        {
          label: "Louis Vuitton — Virgil Abloh Collection Launch",
          description: "Vimeo",
          url: "https://vimeo.com/768415121",
        },
        {
          label: "Hoka — PWRUP",
          description: "YouTube",
          url: "https://www.youtube.com/watch?v=-V0A6UEtsFY",
        },
        {
          label: "Adobe Lightroom — Assisted Culling ft. Jake Inez",
          description: "Instagram",
          url: "https://www.instagram.com/reel/DQXUOwqEjb6/",
        },
        {
          label: "Assouline — Holiday 2025 (AI)",
          description: "YouTube",
          url: "https://www.youtube.com/watch?v=_z8UPdq5fl0",
        },
      ],
    },
  ],

  contact: () => [
    {
      type: "section",
      heading: "Contact",
      body: [
        "EMAIL      aface1@gmail.com",
        "LINKEDIN   linkedin.com/in/adambendercopeland",
      ],
    },
  ],
};

export const AVAILABLE_COMMANDS = Object.keys(COMMANDS);
