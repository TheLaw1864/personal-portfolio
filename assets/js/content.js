/* =============================================================================
   content.js  -  THE SINGLE SOURCE OF TRUTH FOR THE WHOLE SITE
   -----------------------------------------------------------------------------
   Everything you see on the page is generated from this file.
   To update the site later, you ONLY edit this file:
     • Replace the text with your real copy.
     • Drop images into assets/img/ and point to them here.
     • Add / remove items from any array and the page rebuilds automatically.

   NOTE: the marketing content below was pulled from your real AGM & year-end
   presentations (2024–2026). The slide images live in assets/img/decks/.
   Sales figures are intentionally left for you to add manually (see the Sales
   capability and any card marked "add here").
   =========================================================================== */

const SITE_CONTENT = {

  /* ---- Basic identity / SEO ---------------------------------------------- */
  meta: {
    name: "Dakotah Howes",
    role: "Marketing & Commercial Growth",
    tagline: "I turn brand, digital and demand generation into pipeline - then help close it.",
    location: "KwaZulu-Natal, South Africa",
    email: "dakotah@workflowgroup.com",
    whatsapp: "+27 79 282 5894",
    siteTitle: "Dakotah Howes - Portfolio",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/dakotah-howes" },
      { label: "Email",    url: "mailto:dakotah@workflowgroup.com" },
      { label: "WhatsApp", url: "https://wa.me/27792825894", open: true }   // opens a WhatsApp chat
    ]
  },

  /* ---- HERO --------------------------------------------------------------- */
  hero: {
    kicker: "Marketing · Relationships · Sales",
    headlineLines: ["Marketing.", "Relationships.", "Sales."],
    subline: "I build brands people remember, partnerships that last, and conversations that turn into business. Most recently at ResRequest, hospitality software trusted by 1,100+ lodges and hotels in 18 countries.",
    primaryCta:   { label: "See my highlights", target: "#highlights" },
    secondaryCta: { label: "Get in touch",      target: "#contact" },
    stats: [
      { value: "7",      suffix: "",  label: "Trade shows" },
      { value: "11",     suffix: "",  label: "Flagship brands hosted" },
      { value: "76,543", suffix: "",  label: "Social engagements" },
      { value: "20",     suffix: "+", label: "Clients signed" }
    ]
  },

  /* ---- ABOUT -------------------------------------------------------------- */
  about: {
    heading: "About me",
    image: "",                       // e.g. "assets/img/dakotah.jpg" (leave empty to hide)
    imageCaption: "Dakotah Howes",
    paragraphs: [
      "I work where marketing, relationships and sales meet. I can plan the campaign, stand on the trade show floor, run the demo, edit the video afterwards, and still be the person a key client calls when they need something.",
      "At ResRequest I head digital marketing, look after key accounts and resellers, and sell. Everything on this site is real work from that role.",
      "I studied at the University of Cape Town and I'm based in KwaZulu-Natal, South Africa."
    ],
    highlights: ["Strategic Marketing", "Reseller Management", "Trade Shows & Events", "Video & Storytelling", "Key Accounts", "Sales"]
  },

  /* ---- CAPABILITIES  (the three areas I work in) -------------------------- */
  capabilities: {
    heading: "What I do",
    intro: "Three areas, one goal: more of the right customers, kept for longer.",
    items: [
      {
        id: "marketing", title: "Marketing", icon: "◆",
        summary: "Strategy first, then the brand, campaigns and content to deliver it.",
        details: [
          "Set the brand direction and make it visible everywhere, from apparel to the website.",
          "Run email, social, webinars and content across every channel.",
          "Design websites, mailers, videos and sales collateral."
        ],
        stat: { value: "76,543", suffix: "", label: "social engagements" }
      },
      {
        id: "relationships", title: "Relationships", icon: "❖",
        summary: "Partners, resellers and key accounts who stay because they're looked after.",
        details: [
          "Recruit, onboard and enable reseller partners in new markets.",
          "Host VIP dinners and client events that build trust in person.",
          "Own key-account communication and keep clients engaged."
        ],
        stat: { value: "11", suffix: "", label: "flagship brands hosted" }
      },
      {
        id: "sales", title: "Sales", icon: "●",
        summary: "Turning interest into signed business.",
        details: [
          "Signed 20+ new clients, bringing in $3,000+ a month.",
          "Run discovery calls, product demos and proposals through to close.",
          "Grow pipeline from events, referrals and campaigns."
        ],
        stat: { value: "20", suffix: "+", label: "clients signed" }
      }
    ]
  },

  /* ---- HIGHLIGHTS  (the four things I most want people to see) ----------- */
  highlights: {
    heading: "Where I make the biggest difference",
    intro: "Four areas I've owned end to end.",
    items: [
      {
        kicker: "Relationships · New markets",
        title: "Reseller management",
        image: "assets/img/decks/2026-agm/slide-14.jpg",
        intro: "I helped take ResRequest into Mauritius and the Indian Ocean islands through a new reseller partnership with Adapt IT.",
        points: [
          "Ran the Foundation & Reseller Enablement programme when the partner's team spent two weeks with us in South Africa.",
          "Built the reseller playbook: sales, billing, marketing, product, implementation and support in one place.",
          "Flew in for a week-long roadshow, trained the partner's sales team and opened the market with a launch event.",
          "Stay the day-to-day contact for the partner's new business lead."
        ]
      },
      {
        kicker: "Events · Relationships",
        title: "Trade shows & events",
        image: "assets/img/decks/2026-agm/slide-05.jpg",
        intro: "Most of our best relationships start face to face, so I make sure we show up well.",
        points: [
          "Planned stands, collateral, invitations and follow-up for WTM Africa, Africa's Travel Indaba, Meetings Africa, Kilifair, Experience Africa, We Are Africa and the Z Summit.",
          "Ran client events in Hoedspruit and Botswana, a user conference, and partner events with Profitroom.",
          "Hosted VIP dinners for the leaders of 11 flagship safari brands, with a branded gift box and personal invitation.",
          "Produced the Mauritius launch event, from the invite video to the programme on the day."
        ],
        cta: { label: "Watch the trade show recap", target: "#videos" }
      },
      {
        kicker: "Video · Storytelling",
        title: "Video editing & storytelling",
        image: "assets/video/our-story.jpg",
        intro: "I turn a company's story into something people actually want to watch.",
        points: [
          "Produced Our Story, a four-minute brand film shown at the Mauritius launch: script, voice-over, music and edit.",
          "Cut event recaps, launch invites and social reels that get people to show up.",
          "Turned product releases into masterclasses and short videos clients watch.",
          "Now producing a new brand film about ResRequest in Africa."
        ],
        cta: { label: "Watch the videos", target: "#videos" }
      },
      {
        kicker: "Strategy · Brand",
        title: "Strategic marketing",
        image: "assets/img/decks/2025-yearend/slide-08.jpg",
        intro: "I moved ResRequest to one bold, consistent look: ResRequest red with a white logo, on everything.",
        points: [
          "Apparel, scarves, stands, mailers, social posts and the website now share the same red and white, so we're recognisable across a trade show hall.",
          "Set simple brand rules (the exact red, the white logo, one type style) so every new piece looks like it belongs.",
          "Planned go-to-market for new markets and product releases, tying each campaign to a sales goal.",
          "Designed the new ResRequest website with a guided demo-booking journey that qualifies leads."
        ]
      }
    ]
  },

  /* ---- SELECTED WORK  (real initiatives, real slide images) -------------- */
  work: {
    heading: "More of my work",
    intro: "Campaigns and projects from my time at ResRequest. Click any card to see more.",
    items: [
      {
        title: "VIP Gifting & Client Dinners",
        category: "Relationships · Events",
        image: "assets/img/work/vip-gifting.jpg",
        blurb: "Relationships are built in person. I designed a branded gift box and a personal dinner invitation for the leaders of 11 flagship safari brands, then hosted them for an evening of good food and real conversation. No pitch, just time together.",
        tags: ["Relationship Building", "Key Accounts", "Gifting"]
      },
      {
        title: "New ResRequest Website",
        category: "Marketing · Design",
        image: "assets/video/website-walkthrough.jpg",
        video: "assets/video/website-walkthrough.mp4",
        blurb: "I designed the new ResRequest website: a clear story for lodges and camps, a page for every product, and a guided demo-booking journey that qualifies leads. Click to watch the walkthrough.",
        tags: ["Web Design", "UX", "Lead Generation"]
      },
      {
        title: "Email Marketing Programme",
        category: "Marketing · Relationships",
        image: "assets/img/decks/2026-agm/slide-03.jpg",
        blurb: "65 client and staff mailers in a year, 20,173 opens at a 26.8% average open rate, with staff comms reaching 86.7%.",
        tags: ["Email", "CRM", "Retention"]
      },
      {
        title: "Social Media Growth",
        category: "Marketing · Brand",
        image: "assets/img/decks/2026-agm/slide-12.jpg",
        blurb: "Grew ResRequest on LinkedIn, Facebook and Instagram to 76,543 engagements, with follower growth on every channel.",
        tags: ["Social", "Content"]
      },
      {
        title: "Webinars & Masterclasses",
        category: "Marketing · Product",
        image: "assets/img/decks/2026-agm/slide-08.jpg",
        blurb: "A masterclass series for each new release, with 18,704 invitations sent and hundreds of registered attendees.",
        tags: ["Webinars", "Enablement"]
      },
      {
        title: "Virtual User Conference",
        category: "Events · Community",
        image: "assets/img/decks/2024-agm/slide-10.jpg",
        blurb: "Produced ResRequest's online user conference, streamed live to clients around the world.",
        tags: ["Events", "Webinar"]
      }
    ]
  },

  /* ---- VIDEO CONTENT  (anyone visiting can press play) ------------------- */
  /* To add a video: drop an .mp4 into assets/video/ and add an entry below.   */
  /* "poster" is the still shown before it plays (optional).                   */
  /* YouTube or Vimeo also work: set youtube: "VIDEO_ID" or vimeo: "VIDEO_ID"   */
  /* instead of src, which keeps big files off the site.                       */
  videos: {
    heading: "Video content",
    intro: "Films, walkthroughs and campaign videos I've made. Press play on any of them.",
    items: [
      {
        title: "Our Story",
        category: "Brand Film",
        src: "assets/video/our-story.mp4",
        poster: "assets/video/our-story.jpg",
        blurb: "A four-minute brand film for the ResRequest launch in Mauritius. I produced the script, voice-over, music and edit."
      },
      {
        title: "Trade Shows 2026",
        category: "Event Recap",
        src: "assets/video/tradeshows-2026.mp4",
        poster: "assets/video/tradeshows-2026.jpg",
        blurb: "A scrapbook-style recap of our trade show season, edited for social."
      },
      {
        title: "Mauritius Launch Invite",
        category: "Event Promotion",
        src: "assets/video/mauritius-launch-invite.mp4",
        poster: "assets/video/mauritius-launch-invite.jpg",
        blurb: "The invite video that filled the room for our Mauritius launch, sent on WhatsApp and email."
      },
      {
        title: "New ResRequest Website Walkthrough",
        category: "Web Design",
        src: "assets/video/website-walkthrough.mp4",
        poster: "assets/video/website-walkthrough.jpg",
        blurb: "A three-minute tour of the website I designed, from the homepage story to the guided demo-booking flow."
      }
    ]
  },

  /* ---- ARCHIVE  (all presentations, browsable slide-by-slide) ------------ */
  /* Each deck's slides live in assets/img/decks/<slug>/slide-01.jpg ...      */
  archive: {
    heading: "The archive",
    intro: "Every AGM and year-end marketing presentation, kept as a living record. Click a year to page through the slides.",
    decks: [
      { year: "2024", title: "AGM - Digital Marketing", slug: "2024-agm",     count: 13, cover: "assets/img/decks/2024-agm/slide-10.jpg" },
      { year: "2025", title: "AGM - Marketing",         slug: "2025-agm",     count: 11, cover: "assets/img/decks/2025-agm/slide-08.jpg" },
      { year: "2025", title: "Year-End Review",         slug: "2025-yearend", count: 19, cover: "assets/img/decks/2025-yearend/slide-07.jpg" },
      { year: "2026", title: "AGM - Marketing",         slug: "2026-agm",     count: 17, cover: "assets/img/decks/2026-agm/slide-14.jpg" }
    ]
  },

  /* ---- BEYOND WORK  (its own page: beyond.html) -------------------------- */
  /* This drives the separate "Beyond work" page. Slideshows auto-advance and  */
  /* have arrows + dots. Empty image paths show a tidy placeholder.            */
  beyond: {
    heading: "Beyond work",
    tagline: "The person behind the portfolio.",
    intro: "There's a lot that doesn't fit on a CV. Here's a bit about who I am, what I'm good at, and the life that keeps me inspired.",
    portrait: "",                 // e.g. "assets/img/me-personal.jpg"
    portraitCaption: "A personal photo of you",
    // Free-form story - add as many paragraphs as you like
    backstory: [
      "Write your story here. Where you grew up, what pulled you into marketing, the moments that shaped how you work. This is the place to be human and a little personal.",
      "A second paragraph could cover what drives you today - the kind of work you love, the people you like working with, and where you want to go next.",
      "Keep it warm and real. People connect with people."
    ],
    // Skills grouped into columns
    skills: [
      { group: "Marketing & Digital", items: ["Digital Marketing", "SEO", "Email / CRM", "Social Media", "Content", "Analytics"] },
      { group: "Commercial", items: ["New Business", "Partnerships", "Key Accounts", "Sales Enablement", "Go-to-Market"] },
      { group: "Tools", items: ["HubSpot", "Google Analytics", "Canva", "Mailchimp", "WordPress", "Meta / LinkedIn Ads"] },
      { group: "The human bits", items: ["Storytelling", "Event Production", "Relationship Building", "Brand Voice"] }
    ],
    // Each becomes a slideshow (carousel). Add photos to assets/img/ and list them.
    slideshows: [
      {
        title: "Family", icon: "❤",
        caption: "The people who keep me grounded.",
        slides: [
          { image: "", caption: "Add a family photo here" },
          { image: "", caption: "And another moment" },
          { image: "", caption: "One more" }
        ]
      },
      {
        title: "Animals", icon: "🐾",
        caption: "The four-legged members of the household.",
        slides: [
          { image: "", caption: "Add a pet photo - name them!" },
          { image: "", caption: "Another furry friend" }
        ]
      },
      {
        title: "Life & Interests", icon: "✺",
        caption: "What I get up to off the clock.",
        slides: [
          { image: "", caption: "A hobby, a trip, a passion" },
          { image: "", caption: "Something you love doing" },
          { image: "", caption: "And another" }
        ]
      }
    ]
  },

  /* ---- CONTACT ------------------------------------------------------------ */
  contact: {
    heading: "Let's talk",
    email: "dakotah@workflowgroup.com",
    whatsapp: "+27 79 282 5894"
  }
};

if (typeof window !== "undefined") window.SITE_CONTENT = SITE_CONTENT;
