import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes

// Get all resources with optional filtering
app.get('/api/resources', async (c) => {
  const { env } = c
  const category = c.req.query('category')
  const community = c.req.query('community')
  
  let query = 'SELECT * FROM resources WHERE 1=1'
  const params: any[] = []
  
  if (category) {
    query += ' AND category = ?'
    params.push(category)
  }
  
  if (community) {
    query += ' AND (community_focus = ? OR community_focus = "both")'
    params.push(community)
  }
  
  query += ' ORDER BY name ASC'
  
  try {
    const { results } = await env.DB.prepare(query).bind(...params).all()
    return c.json(results || [])
  } catch (error) {
    return c.json({ error: 'Database error' }, 500)
  }
})

// Get events with optional filtering
app.get('/api/events', async (c) => {
  const { env } = c
  const category = c.req.query('category')
  const community = c.req.query('community')
  const date = c.req.query('date')
  
  let query = 'SELECT * FROM events WHERE 1=1'
  const params: any[] = []
  
  if (category) {
    query += ' AND category = ?'
    params.push(category)
  }
  
  if (community) {
    query += ' AND (community_focus = ? OR community_focus = "both")'
    params.push(community)
  }
  
  if (date) {
    query += ' AND event_date >= ?'
    params.push(date)
  } else {
    // Default: show future events only
    const today = new Date().toISOString().split('T')[0]
    query += ' AND event_date >= ?'
    params.push(today)
  }
  
  query += ' ORDER BY event_date ASC'
  
  try {
    const { results } = await env.DB.prepare(query).bind(...params).all()
    return c.json(results || [])
  } catch (error) {
    return c.json({ error: 'Database error' }, 500)
  }
})

// Get historical content
app.get('/api/history', async (c) => {
  const { env } = c
  const period = c.req.query('period')
  
  let query = 'SELECT * FROM historical_content WHERE 1=1'
  const params: any[] = []
  
  if (period) {
    query += ' AND time_period = ?'
    params.push(period)
  }
  
  query += ' ORDER BY title ASC'
  
  try {
    const { results } = await env.DB.prepare(query).bind(...params).all()
    return c.json(results || [])
  } catch (error) {
    return c.json({ error: 'Database error' }, 500)
  }
})

// Get health resources
app.get('/api/health', async (c) => {
  const { env } = c
  const category = c.req.query('category')
  
  let query = 'SELECT * FROM health_resources WHERE 1=1'
  const params: any[] = []
  
  if (category) {
    query += ' AND category = ?'
    params.push(category)
  }
  
  query += ' ORDER BY title ASC'
  
  try {
    const { results } = await env.DB.prepare(query).bind(...params).all()
    return c.json(results || [])
  } catch (error) {
    return c.json({ error: 'Database error' }, 500)
  }
})

// Get news articles
app.get('/api/news', async (c) => {
  const { env } = c
  const category = c.req.query('category')
  const location = c.req.query('location')
  
  let query = 'SELECT * FROM news_articles WHERE 1=1'
  const params: any[] = []
  
  if (category) {
    query += ' AND category = ?'
    params.push(category)
  }
  
  if (location) {
    query += ' AND location = ?'
    params.push(location)
  }
  
  query += ' ORDER BY publish_date DESC'
  
  try {
    const { results } = await env.DB.prepare(query).bind(...params).all()
    return c.json(results || [])
  } catch (error) {
    return c.json({ error: 'Database error' }, 500)
  }
})

// Get economic content
app.get('/api/economic', async (c) => {
  const { env } = c
  const category = c.req.query('category')
  
  let query = 'SELECT * FROM economic_content WHERE 1=1'
  const params: any[] = []
  
  if (category) {
    query += ' AND category = ?'
    params.push(category)
  }
  
  query += ' ORDER BY title ASC'
  
  try {
    const { results } = await env.DB.prepare(query).bind(...params).all()
    return c.json(results || [])
  } catch (error) {
    return c.json({ error: 'Database error' }, 500)
  }
})

// Initialize database tables
app.get('/api/init', async (c) => {
  const { env } = c
  
  try {
    // This endpoint can be used to initialize the database in production
    await env.DB.exec(`
      -- Resources table
      CREATE TABLE IF NOT EXISTS resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        email TEXT,
        website TEXT,
        verified_date DATE,
        community_focus TEXT,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Events table
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        event_date DATE NOT NULL,
        start_time TIME,
        end_time TIME,
        location TEXT,
        address TEXT,
        organizer TEXT,
        contact_info TEXT,
        category TEXT,
        community_focus TEXT,
        is_recurring BOOLEAN DEFAULT FALSE,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Historical content
      CREATE TABLE IF NOT EXISTS historical_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        time_period TEXT,
        location TEXT,
        people_involved TEXT,
        significance TEXT,
        media_urls TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Health resources
      CREATE TABLE IF NOT EXISTS health_resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        source TEXT,
        culturally_relevant BOOLEAN DEFAULT TRUE,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      -- News articles
      CREATE TABLE IF NOT EXISTS news_articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        summary TEXT,
        source TEXT,
        author TEXT,
        publish_date DATE,
        category TEXT,
        location TEXT,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Economic content
      CREATE TABLE IF NOT EXISTS economic_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        relevance_level TEXT,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)
    
    return c.json({ success: true, message: 'Database initialized' })
  } catch (error) {
    console.error('Database initialization error:', error)
    return c.json({ error: 'Failed to initialize database' }, 500)
  }
})

// Main homepage
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Digital Green Book - Monroe County Resources</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'forest-green': '#1B4332',
                  'dark-green': '#2D5A27',
                  'medium-green': '#40916C',
                  'light-green': '#52B788',
                  'cream': '#F8F6E8',
                  'mvp-red': '#C8102E',
                  'mvp-green': '#00A859',
                  'mvp-brown': '#4D342F'
                }
              }
            }
          }
        </script>
        <link href="/static/style.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-gray-50 via-white to-lightest-green/20 text-black font-sans">
        <!-- Header with Hero Image -->
        <header class="relative bg-forest-green text-white shadow-lg overflow-hidden">
            <!-- Hero Background Image -->
            <div class="absolute inset-0">
                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/fdb30df2-4962-4553-94c3-8d5c9702e7be" 
                     alt="Community Resource Hub" 
                     class="w-full h-full object-cover opacity-30">
                <div class="absolute inset-0 bg-forest-green/70"></div>
            </div>
            
            <div class="relative z-10 container mx-auto px-4 py-8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div>
                            <h1 class="text-3xl md:text-4xl font-bold">The Digital Green Book</h1>
                            <p class="text-light-green text-lg">Monroe County Community Resources</p>
                            <p class="text-white/90 text-sm mt-1">Connecting communities to trusted, vetted resources</p>
                        </div>
                    </div>
                    <div class="hidden md:flex items-center space-x-2 text-lg">
                        <i class="fas fa-map-marker-alt text-light-green"></i>
                        <span>Rochester, NY</span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Digital Green Book Promotional Banner -->
        <section class="py-8 bg-black">
            <div class="container mx-auto px-4 text-center">
                <img src="https://page.gensparksite.com/v1/base64_upload/de1733566596a591f3376f73adbcc68f" 
                     alt="Digital Green Book - Tap In and Thrive" 
                     class="mx-auto max-w-full h-auto rounded-lg shadow-lg">
            </div>
        </section>

        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-forest-green to-dark-green text-white py-12">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">
                    Connecting Communities to Trusted Resources
                </h2>
                <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                    Honoring Victor Hugo Green's legacy, we connect the Black and Brown communities 
                    of Monroe County to vetted resources, services, and opportunities that have our 
                    communities' best interests at heart.
                </p>
                <div class="flex justify-center space-x-4">
                    <button onclick="scrollToSection('resources')" class="bg-light-green hover:bg-medium-green text-black font-semibold py-3 px-6 rounded-lg transition-colors">
                        <i class="fas fa-search mr-2"></i>Find Resources
                    </button>
                    <button onclick="scrollToSection('events')" class="border-2 border-light-green text-light-green hover:bg-light-green hover:text-black font-semibold py-3 px-6 rounded-lg transition-colors">
                        <i class="fas fa-calendar mr-2"></i>View Events
                    </button>
                </div>
            </div>
        </section>

        <!-- Heritage & Mission Section -->
        <section class="py-8 bg-white">
            <div class="container mx-auto px-4 text-center">
                <img src="https://page.gensparksite.com/v1/base64_upload/2bca431a7d064024aea2bfca84ccfaec" 
                     alt="Our Heritage & Mission - Digital Green Book Legacy" 
                     class="mx-auto max-w-full h-auto rounded-lg shadow-lg">
            </div>
        </section>

        <!-- Navigation Grid -->
        <section id="resources" class="py-12 bg-white">
            <div class="container mx-auto px-4">
                <h3 class="text-2xl md:text-3xl font-bold text-center text-forest-green mb-12">
                    Community Resources & Services
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <!-- Resource Hub -->
                    <div class="bg-forest-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('resource-hub')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/7b1d2913-6fa6-4025-9849-c7261ce23cd4" 
                                 alt="Community Resources" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-light-green/50">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/7b1d2913-6fa6-4025-9849-c7261ce23cd4" 
                                     alt="Resources" 
                                     class="w-full h-full object-cover">
                            </div>
                            <h4 class="text-xl font-bold mb-2">Resource Hub</h4>
                            <p class="text-sm opacity-90">Vetted businesses and services for housing, jobs, health, and community support</p>
                        </div>
                    </div>

                    <!-- Events Sync -->
                    <div class="bg-medium-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('events-sync')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-25">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/33fa25b8-1e91-4a7c-bfc2-e8ed152d77d7" 
                                 alt="Community Events" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cream/50">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/33fa25b8-1e91-4a7c-bfc2-e8ed152d77d7" 
                                     alt="Events" 
                                     class="w-full h-full object-cover">
                            </div>
                            <h4 class="text-xl font-bold mb-2">Events Sync</h4>
                            <p class="text-sm opacity-90">Community calendar of Black and Brown cultural and educational events</p>
                        </div>
                    </div>

                    <!-- RocRoots Connect -->
                    <div class="bg-forest-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('rocroots-connect')">
                        <!-- Background Mural Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://page.gensparksite.com/v1/base64_upload/e05a9cbeedf123511abee1457726e906" 
                                 alt="Rochester Black Heritage Mural" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-light-green/50">
                                <img src="https://page.gensparksite.com/v1/base64_upload/e05a9cbeedf123511abee1457726e906" 
                                     alt="Rochester Heritage" 
                                     class="w-full h-full object-cover">
                            </div>
                            <h4 class="text-xl font-bold mb-2">RocRoots Connect</h4>
                            <p class="text-sm opacity-90">Interactive history of Black heritage and contributions in Rochester</p>
                        </div>
                    </div>

                    <!-- VitaHue -->
                    <div class="bg-medium-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('vitahue')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/db98b2a3-0107-49e8-a6db-649adc975b89" 
                                 alt="Community Health" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cream/50">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/db98b2a3-0107-49e8-a6db-649adc975b89" 
                                     alt="Health" 
                                     class="w-full h-full object-cover">
                            </div>
                            <h4 class="text-xl font-bold mb-2">VitaHue</h4>
                            <p class="text-sm opacity-90">Health information and resources relevant to the Black community</p>
                        </div>
                    </div>

                    <!-- MVP Healthcare -->
                    <div class="bg-mvp-red text-white rounded-lg p-6 hover:bg-red-700 transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('mvp-healthcare')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/3ad23880-bd38-462f-8dc9-25b65186f7c2" 
                                 alt="Healthcare Services" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/50">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/3ad23880-bd38-462f-8dc9-25b65186f7c2" 
                                     alt="MVP Healthcare" 
                                     class="w-full h-full object-cover">
                            </div>
                            <h4 class="text-xl font-bold mb-2">MVP Healthcare</h4>
                            <p class="text-sm opacity-90">Healthcare services and insurance information</p>
                        </div>
                    </div>

                    <!-- Hyde -->
                    <div class="bg-medium-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('hyde')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/3a4cabf1-05bd-423e-be11-d5def513ef13" 
                                 alt="Mental Health Wellness Background" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="flex justify-center mb-4">
                                <img src="https://page.gensparksite.com/v1/base64_upload/4de31b976f09eff608106a75354173ca" 
                                     alt="Mental Health Support" 
                                     class="w-24 h-24 object-cover rounded-full border-4 border-white/30 shadow-lg">
                            </div>
                            <h4 class="text-xl font-bold mb-2">Hyde</h4>
                            <p class="text-sm opacity-90">Understands your culture, predicts risks early, and provides personalized mental health support when you need it most.</p>
                        </div>
                    </div>

                    <!-- News Central -->
                    <div class="bg-forest-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('news-central')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/fbc98b65-619a-4aa1-8026-eddc855fbfa5" 
                                 alt="News Broadcasting Studio Background" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="flex justify-center mb-4">
                                <img src="https://page.gensparksite.com/v1/base64_upload/8b1be146cd79b0e7da494fc5644f125d" 
                                     alt="DGB News" 
                                     class="w-24 h-24 object-cover rounded-full border-4 border-white/30 shadow-lg">
                            </div>
                            <h4 class="text-xl font-bold mb-2">News Central</h4>
                            <p class="text-sm opacity-90">Positive Black news and community achievements across America</p>
                        </div>
                    </div>

                    <!-- Youth Vibe -->
                    <div class="bg-medium-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('youth-vibe')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-25">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/b4aed00a-47e3-4811-9dab-6f80ebee57bb" 
                                 alt="Youth Education" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cream/50">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/b4aed00a-47e3-4811-9dab-6f80ebee57bb" 
                                     alt="Youth" 
                                     class="w-full h-full object-cover">
                            </div>
                            <h4 class="text-xl font-bold mb-2">Youth Vibe</h4>
                            <p class="text-sm opacity-90">Music, entertainment, sports leagues, and youth-focused content</p>
                        </div>
                    </div>

                    <!-- Black Tech -->
                    <div class="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white rounded-lg p-6 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-900 transition-all duration-300 cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('black-tech')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8aeec252-b5f6-41fe-bc67-7e15da4fbc3d" 
                                 alt="Black Tech Innovation" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <i class="fas fa-microchip text-3xl text-white"></i>
                            </div>
                            <h4 class="text-xl font-bold mb-2">Black Tech</h4>
                            <p class="text-sm opacity-90">AI, policy, founders, jobs, grants & daily tech updates for the community</p>
                        </div>
                    </div>

                    <!-- Senior Circle -->
                    <div class="bg-forest-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('senior-circle')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-25">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/ecdb08bc-661e-4374-aa2b-ec557e34a363" 
                                 alt="Senior Community" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-light-green/50">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/ecdb08bc-661e-4374-aa2b-ec557e34a363" 
                                     alt="Seniors" 
                                     class="w-full h-full object-cover">
                            </div>
                            <h4 class="text-xl font-bold mb-2">Senior Circle</h4>
                            <p class="text-sm opacity-90">Resources and programs designed specifically for senior citizens</p>
                        </div>
                    </div>

                    <!-- Limitless Living -->
                    <div class="bg-medium-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('limitlee-living')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/0001687b-a626-44ce-bfe2-c47b9da592be" 
                                 alt="Accessible Community Environment" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="flex justify-center mb-4">
                                <img src="https://page.gensparksite.com/v1/base64_upload/2c1beef5b7dfcb0bfd3a012c7f071fbe" 
                                     alt="Limitless Living - Accessibility and Inclusion" 
                                     class="w-24 h-24 object-cover rounded-full border-4 border-white/30 shadow-lg">
                            </div>
                            <h4 class="text-xl font-bold mb-2">Limitless Living</h4>
                            <p class="text-sm opacity-90">Resources and support for people with disabilities</p>
                        </div>
                    </div>

                    <!-- Melonomics -->
                    <div class="bg-forest-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('melomics')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/33fa80ff-f967-48c9-bf01-bd2c317db5ab" 
                                 alt="Black Business Meeting" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <div class="flex justify-center mb-4">
                                <img src="https://page.gensparksite.com/v1/base64_upload/a8ebbadbb83b6863326e7c896ae72ec8" 
                                     alt="Group Economics - Professional Business Meeting" 
                                     class="w-24 h-24 object-cover rounded-full border-4 border-white/30 shadow-lg">
                            </div>
                            <h4 class="text-xl font-bold mb-2">Melonomics</h4>
                            <p class="text-sm opacity-90">Economic news, financial literacy, and business opportunities</p>
                        </div>
                    </div>

                    <!-- Latin Connection -->
                    <div class="bg-medium-green text-white rounded-lg p-6 hover:bg-dark-green transition-colors cursor-pointer shadow-lg relative overflow-hidden" onclick="navigateTo('latin-connection')">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-20">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/bf3e70cb-f6eb-4d43-a157-7c5a8beb3689" 
                                 alt="Latin Community Gathering" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center">
                            <i class="fas fa-globe-americas text-6xl text-cream mb-4"></i>
                            <h4 class="text-xl font-bold mb-2">Latin Connection</h4>
                            <p class="text-sm opacity-90">Resources, events, and news for the Latino community</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="py-12 bg-gray-100">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h3 class="text-2xl md:text-3xl font-bold text-forest-green mb-6">
                        Honoring Victor Hugo Green's Legacy
                    </h3>
                    <p class="text-lg text-gray-700 mb-6">
                        The original Green Book, published by Victor Hugo Green from 1936-1966, was a vital 
                        travel guide that helped Black Americans find safe spaces during the Jim Crow era. 
                        Today, The Digital Green Book continues that mission of connection and safety by 
                        helping Black and Brown communities in Monroe County find trusted, vetted resources.
                    </p>
                    <div class="bg-white rounded-lg p-6 shadow-md">
                        <h4 class="text-xl font-bold text-forest-green mb-4">Our Mission</h4>
                        <p class="text-gray-700">
                            To provide a comprehensive, culturally-centered platform that connects our 
                            communities to resources, services, and opportunities that understand and 
                            support our unique needs and experiences.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-forest-green text-white py-8">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h5 class="font-bold mb-4">The Digital Green Book</h5>
                        <p class="text-sm opacity-90">
                            Connecting Monroe County's Black and Brown communities to trusted resources since 2024.
                        </p>
                    </div>
                    <div>
                        <h5 class="font-bold mb-4">Quick Links</h5>
                        <ul class="text-sm space-y-2 opacity-90">
                            <li><a href="#" class="hover:text-light-green">Resource Hub</a></li>
                            <li><a href="#" class="hover:text-light-green">Events</a></li>
                            <li><a href="#" class="hover:text-light-green">History</a></li>
                            <li><a href="#" class="hover:text-light-green">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-bold mb-4">Connect With Us</h5>
                        <div class="flex space-x-4">
                            <i class="fab fa-facebook text-xl hover:text-light-green cursor-pointer"></i>
                            <i class="fab fa-twitter text-xl hover:text-light-green cursor-pointer"></i>
                            <i class="fab fa-instagram text-xl hover:text-light-green cursor-pointer"></i>
                        </div>
                    </div>
                </div>
                <div class="border-t border-dark-green mt-8 pt-8 text-center text-sm opacity-90">
                    <p>&copy; 2024 The Digital Green Book. Built with community, for community.</p>
                </div>
            </div>
        </footer>

        <!-- Content Sections (Initially Hidden) -->
        <div id="content-area" class="hidden">
            <!-- Individual section content will be loaded here -->
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app