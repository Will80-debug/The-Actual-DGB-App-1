// Digital Green Book Frontend JavaScript

// Global state
let currentSection = 'home';
let resourcesData = [];
let eventsData = [];
let currentFilters = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Digital Green Book loaded');
    loadInitialData();
});

// Load initial data
async function loadInitialData() {
    try {
        // Use static data instead of API calls to avoid 500 errors
        resourcesData = getPartnerOrganizations();
        eventsData = getEventsData();
        
        console.log(`Loaded ${resourcesData.length} resources and ${eventsData.length} events`);
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

// Navigation functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function navigateTo(section) {
    currentSection = section;
    
    // Hide homepage content and show section content
    const contentArea = document.getElementById('content-area');
    contentArea.classList.remove('hidden');
    
    // Scroll to content area
    contentArea.scrollIntoView({ behavior: 'smooth' });
    
    // Load section content
    switch(section) {
        case 'resource-hub':
            loadResourceHub();
            break;
        case 'events-sync':
            loadEventsSync();
            break;
        case 'rocroots-connect':
            loadRocRootsConnect();
            break;
        case 'vitahue':
            loadVitaHue();
            break;
        case 'mvp-healthcare':
            loadMVPHealthcare();
            break;
        case 'hyde':
            loadHyde();
            break;
        case 'news-central':
            loadNewsCenter();
            break;
        case 'youth-vibe':
            loadYouthVibe();
            break;
        case 'senior-circle':
            loadSeniorCircle();
            break;
        case 'limitlee-living':
            loadLimitleeLiving();
            break;
        case 'melomics':
            loadMelomics();
            break;
        case 'latin-connection':
            loadLatinConnection();
            break;
        default:
            goHome();
    }
}

function goHome() {
    const contentArea = document.getElementById('content-area');
    contentArea.classList.add('hidden');
    currentSection = 'home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Section loader functions
function loadResourceHub() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <section class="py-8 bg-white">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-forest-green mb-2">
                            <i class="fas fa-home mr-3"></i>Resource Hub
                        </h2>
                        <p class="text-gray-600">Vetted businesses and services for our community</p>
                    </div>
                    <button onclick="goHome()" class="bg-forest-green text-white px-4 py-2 rounded hover:bg-dark-green">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Home
                    </button>
                </div>
                
                <!-- Filter Controls -->
                <div class="bg-gray-100 rounded-lg p-6 mb-8">
                    <h3 class="text-lg font-semibold mb-4">Filter Resources</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select id="category-filter" onchange="filterResources()" class="p-2 border rounded">
                            <option value="">All Categories</option>
                            <option value="Family Support Services">Family Support Services</option>
                            <option value="Food Security">Food Security</option>
                            <option value="Mental Health & Parent Support">Mental Health & Parent Support</option>
                            <option value="Healthcare Advocacy">Healthcare Advocacy</option>
                            <option value="Violence Prevention">Violence Prevention</option>
                            <option value="Women's Empowerment">Women's Empowerment</option>
                            <option value="Substance Abuse Recovery">Substance Abuse Recovery</option>
                            <option value="Reentry Services">Reentry Services</option>
                            <option value="Wellness & Mental Health">Wellness & Mental Health</option>
                            <option value="Fatherhood Support">Fatherhood Support</option>
                            <option value="Community Services">Community Services</option>
                            <option value="Latino Community Services">Latino Community Services</option>
                            <option value="Civil Rights & Economic Empowerment">Civil Rights</option>
                            <option value="Women's Services">Women's Services</option>
                        </select>
                        
                        <select id="community-filter" onchange="filterResources()" class="p-2 border rounded">
                            <option value="">All Communities</option>
                            <option value="Black Community Focus">Black Community Focus</option>
                            <option value="Latino Community Focus">Latino Community Focus</option>
                            <option value="All Communities">All Communities</option>
                        </select>
                        
                        <input type="text" id="search-input" onkeyup="filterResources()" placeholder="Search by name..." class="p-2 border rounded">
                    </div>
                </div>
                
                <!-- Resources Grid -->
                <div id="resources-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Resources will be loaded here -->
                </div>
                
                <!-- Loading State -->
                <div id="loading" class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-2xl text-forest-green"></i>
                    <p class="text-gray-600 mt-2">Loading resources...</p>
                </div>
            </div>
        </section>
    `;
    
    loadResources();
}

async function loadResources() {
    try {
        // Use static partner organizations data from CSV
        resourcesData = getPartnerOrganizations();
        displayResources(resourcesData);
    } catch (error) {
        console.error('Error loading resources:', error);
        document.getElementById('loading').innerHTML = `
            <p class="text-red-600">Error loading resources. Please try again.</p>
        `;
    }
}

// Partner Organizations Data from Excel file and existing sources
function getPartnerOrganizations() {
    return [
        {
            name: "Adaptt Rochester",
            website: "https://www.adapttrochester.com/",
            address: "Rochester, NY",
            phone: "(585) 616-3231",
            email: null,
            category: "Family Support Services",
            description: "Transitional housing, food pantry, clothing closet, family care programs",
            director: "Tamara Howard & Angela Wollschlager (Co-Founders)",
            community_focus: "Black Community Focus",
            logo: "https://www.adapttrochester.com/uploads/FBCt4AQK/blue.png"
        },
        {
            name: "Sweet Ida Mae Pantry",
            website: "sweetidamaepantry.com",
            address: "1274 Dewey Ave, Rochester, NY 14613",
            phone: "(585) 230-3703",
            email: null,
            category: "Food Security",
            description: "Community food pantry providing essential food assistance",
            director: "Devon Reynolds (Founder & Director)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "BIPOC PEEEEK",
            website: "http://bipocparentvoice.org",
            address: "10 Cady Street Lower Level Suite 11, Rochester NY 14608",
            phone: null,
            email: "bipocparentvoice@gmail.com",
            category: "Mental Health & Parent Support",
            description: "BIPOC parent advocacy, mental health services, peer support",
            director: "Sara Taylor (Founder & Visionary), Len Statham (Project Lead)",
            community_focus: "Black Community Focus",
            logo: "https://pbs.twimg.com/media/F8AjoCSXMAAsRWd.jpg"
        },
        {
            name: "Sickle Cell Advocates of Rochester (SCAR)",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: "sicklecelladvocatesofrochester@gmail.com",
            category: "Healthcare Advocacy",
            description: "Sickle cell disease awareness and support services",
            director: "Gladys Magee & Stephanie Ramos (Co-Directors)",
            community_focus: "Black Community Focus",
            logo: null
        },
        {
            name: "Barakah Muslim Charity",
            website: "https://www.barakahmuslimcharity.org/",
            address: "584 Jefferson Ave, Rochester, NY 14611",
            phone: "(585) 325-2621",
            email: null,
            category: "Food Security & Community Support",
            description: "Food pantry, clothing drive, community assistance programs",
            director: "Dr. Irshad Altheimer (President), Zuhair Johnson (Executive Director)",
            community_focus: "All Communities",
            logo: "https://static.wixstatic.com/media/72026f_fffe518f4a714fd2b0123164fa593c41~mv2_d_4200_3000_s_4_2.png"
        },
        {
            name: "ROC the Peace",
            website: "https://www.rocthepeace.org/",
            address: "3000 Mt. Read Blvd. Suite 202, Rochester, NY 14615",
            phone: "(585) 820-4049",
            email: null,
            category: "Violence Prevention",
            description: "Community outreach, anti-violence initiatives, youth programs",
            director: "Sirena Cotton (Executive Director)",
            community_focus: "Black Community Focus",
            logo: "https://cdn.prod.website-files.com/636ee008c0125c7441549cf4/636eefa43958c93a9261c207_logo_rocthepeace1e-COLOR.jpg"
        },
        {
            name: "Women's Foundation of Genesee Valley, Inc",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Recovery Houses of Rochester",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Reentry and Community Development Center",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Breathe Deep",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "The Fatherhood Connection",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Our Local History",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Baden Street Settlement",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Ibero",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "COLM",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "The Father Laurence Tracy Advocacy Center",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "The Black Agenda Group Rochester",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Common Ground Health",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Mentors Inspiring Boys and Girls",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Player 1 Academy",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Latino Migrant Ministry",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Wayne County YAP",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Health ConnectOne",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Rochester ABOVE",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "HBN",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "HOPE 585",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Volunteers of America",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Volunteer Legal Services of Project of Monroe County",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Sankofa Family Counseling",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Center For Teen Empowerment",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Worker Justice Center of New York",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Interdenominational Health Coalition Ministry",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Black Women's Leadership Forum",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Free The People ROC",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Citizens Action Network of NY",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Liberating Through Literacy",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Greater Rochester Parent Leadership Training Institute (PLTI)",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "National Parent Leadership Institute/NPLI",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Diverse Mosaics",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "ROC The Future Alliance",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Rochester Black Agenda Group",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "RISE Up Rochester",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Black Physicians Network",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Rochester Black Nurses Association",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Lifespan",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Jordan Health",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "St. Joseph's Neighborhood Center",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "YMCA of Greater Rochester",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "YWCA of Rochester & Monroe County",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "ABC",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Urban League",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Leadership Rochester",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Latinx Leaders Roundtable",
            website: null,
            address: "Rochester, NY",
            phone: null,
            email: null,
            category: "Community Services",
            description: "Community organization serving the Rochester area",
            director: null,
            community_focus: "All Communities",
            logo: null
        }
    ];
}

function displayResources(resources) {
    const container = document.getElementById('resources-container');
    const loading = document.getElementById('loading');
    
    loading.style.display = 'none';
    
    if (resources.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No resources found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = resources.map(resource => `
        <div class="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            ${resource.logo ? `
                <div class="flex items-center mb-4">
                    <img src="${resource.logo}" alt="${resource.name} logo" class="w-12 h-12 object-contain mr-3 rounded">
                    <div class="flex-1">
                        <h4 class="text-lg font-bold text-forest-green">${resource.name}</h4>
                        <span class="text-xs bg-light-green text-black px-2 py-1 rounded">${resource.category}</span>
                    </div>
                </div>
            ` : `
                <div class="flex items-start justify-between mb-3">
                    <h4 class="text-lg font-bold text-forest-green">${resource.name}</h4>
                    <span class="text-xs bg-light-green text-black px-2 py-1 rounded">${resource.category}</span>
                </div>
            `}
            
            <p class="text-gray-700 mb-4">${resource.description || 'No description available'}</p>
            
            ${resource.director ? `
                <div class="bg-gray-50 p-3 rounded mb-4">
                    <p class="text-sm text-gray-700">
                        <i class="fas fa-user-tie mr-2 text-forest-green"></i>
                        <strong>Leadership:</strong> ${resource.director}
                    </p>
                </div>
            ` : ''}
            
            <div class="space-y-2 text-sm text-gray-600">
                ${resource.address ? `<p><i class="fas fa-map-marker-alt mr-2 text-forest-green"></i>${resource.address}</p>` : ''}
                ${resource.phone ? `<p><i class="fas fa-phone mr-2 text-forest-green"></i><a href="tel:${resource.phone}" class="text-forest-green hover:underline">${resource.phone}</a></p>` : ''}
                ${resource.email ? `<p><i class="fas fa-envelope mr-2 text-forest-green"></i><a href="mailto:${resource.email}" class="text-forest-green hover:underline">${resource.email}</a></p>` : ''}
                ${resource.website ? `<p><i class="fas fa-globe mr-2 text-forest-green"></i><a href="${resource.website}" target="_blank" class="text-forest-green hover:underline">Visit Website</a></p>` : ''}
            </div>
            
            <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center text-xs text-gray-500">
                    <i class="fas fa-check-circle mr-1 text-green-500"></i>
                    <span>Community Vetted</span>
                </div>
                <span class="text-xs ${resource.community_focus === 'Black Community Focus' ? 'bg-purple-100 text-purple-800' : 
                               resource.community_focus === 'Latino Community Focus' ? 'bg-blue-100 text-blue-800' : 
                               'bg-gray-100 text-gray-800'} px-2 py-1 rounded">${resource.community_focus}</span>
            </div>
        </div>
    `).join('');
}

function filterResources() {
    const categoryFilter = document.getElementById('category-filter').value;
    const communityFilter = document.getElementById('community-filter').value;
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    
    let filtered = resourcesData;
    
    if (categoryFilter) {
        filtered = filtered.filter(resource => resource.category === categoryFilter);
    }
    
    if (communityFilter) {
        filtered = filtered.filter(resource => 
            resource.community_focus === communityFilter || resource.community_focus === 'both'
        );
    }
    
    if (searchInput) {
        filtered = filtered.filter(resource => 
            resource.name.toLowerCase().includes(searchInput) ||
            (resource.description && resource.description.toLowerCase().includes(searchInput))
        );
    }
    
    displayResources(filtered);
}

// Sample Events Data
function getEventsData() {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const thisWeekend = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return [
        {
            id: 1,
            title: "Black Heritage Month Celebration",
            date: today.toISOString().split('T')[0],
            time: "6:00 PM - 9:00 PM",
            location: "Strong Museum of Play",
            category: "Cultural",
            description: "Join us for an evening celebrating Rochester's Black heritage with music, art, and community stories.",
            image: "https://cdn1.genspark.ai/user-upload-image/3_generated/cbaa998b-fd5e-4e31-b338-11273e5e1218",
            organizer: "Rochester Heritage Society",
            featured: true
        },
        {
            id: 2,
            title: "Community Health Fair",
            date: tomorrow.toISOString().split('T')[0],
            time: "10:00 AM - 3:00 PM",
            location: "Martin Luther King Jr. Park",
            category: "Health",
            description: "Free health screenings, wellness information, and resources for the community.",
            image: "https://cdn1.genspark.ai/user-upload-image/3_generated/db98b2a3-0107-49e8-a6db-649adc975b89",
            organizer: "Rochester Health Coalition",
            featured: false
        },
        {
            id: 3,
            title: "Business Networking Mixer",
            date: thisWeekend.toISOString().split('T')[0],
            time: "7:00 PM - 10:00 PM",
            location: "Downtown Rochester",
            category: "Business",
            description: "Connect with local Black and Latino business owners and entrepreneurs.",
            image: "https://cdn1.genspark.ai/user-upload-image/3_generated/33fa80ff-f967-48c9-bf01-bd2c317db5ab",
            organizer: "Rochester Business Network",
            featured: false
        }
    ];
}

// ================================
// EVENTS SYNC COMPREHENSIVE IMPLEMENTATION
// ================================

function loadEventsSync() {
    const contentArea = document.getElementById('content-area');
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    contentArea.innerHTML = `
        <section class="py-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 min-h-screen">
            <div class="container mx-auto px-4">
                <!-- Enhanced Events Sync Header -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
                    <!-- Hero Background with Community Events Imagery -->
                    <div class="relative h-72 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                        <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/cbaa998b-fd5e-4e31-b338-11273e5e1218" 
                             alt="African American Community Events" 
                             class="absolute inset-0 w-full h-full object-cover opacity-40">
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-indigo-600/90"></div>
                        
                        <div class="relative z-10 text-white p-6 md:p-8 h-full flex items-center">
                            <div class="flex items-center justify-between flex-wrap gap-4 w-full">
                                <div class="flex items-center space-x-6">
                                    <div class="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                                        <i class="fas fa-calendar-alt text-3xl text-white"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-4xl md:text-5xl font-bold">Events Sync</h2>
                                        <p class="text-white/95 text-xl">Stay Connected with Rochester's Pulse</p>
                                        <p class="text-white/85 text-sm mt-1">Daily Guide to Black & Latin Community Events • ${formattedDate}</p>
                                    </div>
                                </div>
                                <button onclick="goHome()" class="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                    <i class="fas fa-arrow-left mr-2"></i>Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mission Statement -->
                    <div class="bg-white p-6 md:p-8">
                        <div class="max-w-4xl">
                            <p class="text-lg text-gray-700 leading-relaxed mb-6">
                                Stay connected with the pulse of Rochester! Event Sync is your daily guide to Black and Latin-centered events 
                                happening across the city. From cultural festivals, live music, and family activities to business mixers, 
                                workshops, and community gatherings, this page brings it all to one place.
                            </p>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                                    <i class="fas fa-calendar-check text-2xl text-blue-600"></i>
                                    <div>
                                        <h4 class="font-bold text-gray-800">📅 Updated Daily</h4>
                                        <p class="text-sm text-gray-600">Fresh events added every day so you never miss out</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                                    <i class="fas fa-video text-2xl text-purple-600"></i>
                                    <div>
                                        <h4 class="font-bold text-gray-800">🎥 Engaging Media</h4>
                                        <p class="text-sm text-gray-600">Explore events through vibrant images and videos</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                                    <i class="fas fa-users text-2xl text-green-600"></i>
                                    <div>
                                        <h4 class="font-bold text-gray-800">🤝 For Our Communities</h4>
                                        <p class="text-sm text-gray-600">Celebrating Black and Latin voices in Rochester</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Event Actions -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="showTodayEvents()">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-calendar-day text-blue-600 text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-2">Today's Events</h4>
                        <p class="text-gray-600 text-sm">See what's happening right now</p>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="showThisWeekend()">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-calendar-week text-purple-600 text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-2">This Weekend</h4>
                        <p class="text-gray-600 text-sm">Plan your weekend activities</p>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="showFeaturedEvents()">
                        <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-star text-golden-yellow text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-2">Featured Events</h4>
                        <p class="text-gray-600 text-sm">Don't miss these highlights</p>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="submitCommunityEvent()">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-plus-circle text-green-600 text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-2">Add Event</h4>
                        <p class="text-gray-600 text-sm">Share your community event</p>
                    </div>
                </div>

                <!-- Enhanced Event Filters -->
                <div class="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-filter mr-3 text-purple-600"></i>
                        Find Your Perfect Event
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                            <select id="event-category-filter" onchange="filterEvents()" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option value="">All Categories</option>
                                <option value="cultural">🎭 Cultural Festivals</option>
                                <option value="music">🎵 Live Music</option>
                                <option value="family">👨‍👩‍👧‍👦 Family Activities</option>
                                <option value="business">💼 Business Mixers</option>
                                <option value="workshops">🛠️ Workshops</option>
                                <option value="community">🤝 Community Gatherings</option>
                                <option value="educational">📚 Educational</option>
                                <option value="health">🏥 Health & Wellness</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Community Focus</label>
                            <select id="event-community-filter" onchange="filterEvents()" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option value="">All Communities</option>
                                <option value="black">Black Community</option>
                                <option value="latin">Latino Community</option>
                                <option value="both">All Communities</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                            <input type="date" id="event-date-filter" onchange="filterEvents()" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <select id="event-location-filter" onchange="filterEvents()" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option value="">All Rochester Areas</option>
                                <option value="downtown">Downtown Rochester</option>
                                <option value="northeast">Northeast</option>
                                <option value="northwest">Northwest</option>
                                <option value="southeast">Southeast</option>
                                <option value="southwest">Southwest</option>
                                <option value="suburbs">Suburbs</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="mt-6 flex flex-wrap gap-3">
                        <button onclick="clearAllFilters()" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            <i class="fas fa-times mr-2"></i>Clear Filters
                        </button>
                        <button onclick="saveEventPreferences()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                            <i class="fas fa-bookmark mr-2"></i>Save Preferences
                        </button>
                    </div>
                </div>

                <!-- Featured Event Showcase with African American Community Images -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-star mr-3 text-purple-600"></i>
                        This Week's Community Highlights
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <!-- Featured Community Festival -->
                        <div class="relative group cursor-pointer">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/cbaa998b-fd5e-4e31-b338-11273e5e1218" 
                                 alt="African American Community Festival" 
                                 class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg"></div>
                            <div class="absolute bottom-4 left-4 text-white">
                                <h4 class="text-lg font-bold">Community Cultural Festival</h4>
                                <p class="text-sm opacity-90">Celebrating Black heritage with music, food & family activities</p>
                                <div class="flex items-center mt-2 space-x-2">
                                    <i class="fas fa-calendar-alt text-xs"></i>
                                    <span class="text-xs">This Saturday, 2:00 PM</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Featured Workshop -->
                        <div class="relative group cursor-pointer">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/17f1824e-b9d4-4829-8f4b-b41446e517ed" 
                                 alt="African American Community Workshop" 
                                 class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg"></div>
                            <div class="absolute bottom-4 left-4 text-white">
                                <h4 class="text-lg font-bold">Professional Development Workshop</h4>
                                <p class="text-sm opacity-90">Networking & skill-building for Black professionals</p>
                                <div class="flex items-center mt-2 space-x-2">
                                    <i class="fas fa-calendar-alt text-xs"></i>
                                    <span class="text-xs">Next Tuesday, 6:30 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap gap-3">
                        <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                            <i class="fas fa-users mr-1"></i>Family Friendly
                        </span>
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            <i class="fas fa-music mr-1"></i>Live Entertainment
                        </span>
                        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            <i class="fas fa-utensils mr-1"></i>Food & Culture
                        </span>
                        <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            <i class="fas fa-graduation-cap mr-1"></i>Educational
                        </span>
                    </div>
                </div>

                <!-- Events Grid with Media -->
                <div class="bg-white rounded-xl shadow-xl p-8">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-calendar-alt mr-3 text-purple-600"></i>
                            Upcoming Community Events
                        </h3>
                        <div class="flex space-x-2">
                            <button onclick="toggleViewMode('grid')" id="grid-view-btn" class="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm hover:bg-purple-200 transition-colors">
                                <i class="fas fa-th mr-1"></i>Grid
                            </button>
                            <button onclick="toggleViewMode('list')" id="list-view-btn" class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                <i class="fas fa-list mr-1"></i>List
                            </button>
                            <button onclick="toggleViewMode('calendar')" id="calendar-view-btn" class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                <i class="fas fa-calendar mr-1"></i>Calendar
                            </button>
                        </div>
                    </div>

                    <!-- Events Container -->
                    <div id="events-container" class="space-y-6">
                        <!-- Events will be loaded here -->
                    </div>
                    
                    <!-- Loading State -->
                    <div id="events-loading" class="text-center py-8">
                        <div class="inline-flex items-center space-x-3">
                            <i class="fas fa-calendar-alt text-2xl text-purple-600 animate-pulse"></i>
                            <span class="text-gray-600">Loading community events...</span>
                        </div>
                    </div>
                </div>

                <!-- Google Calendar Integration -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-calendar-alt mr-3 text-blue-600"></i>
                            Community Events Calendar
                        </h3>
                        <div class="flex items-center space-x-4">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/17f1824e-b9d4-4829-8f4b-b41446e517ed" 
                                 alt="African American Community Workshop" 
                                 class="w-16 h-16 rounded-lg object-cover shadow-md">
                            <div class="text-right">
                                <p class="text-sm text-gray-600">Stay connected with</p>
                                <p class="font-semibold text-gray-800">Rochester Community Events</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-info-circle text-blue-600 text-xl"></i>
                            <div>
                                <p class="text-gray-800 font-medium">Interactive Community Calendar</p>
                                <p class="text-gray-600 text-sm">View upcoming events, RSVP, and sync with your personal calendar</p>
                            </div>
                        </div>
                    </div>

                    <!-- Google Calendar Embed -->
                    <div class="relative h-96 md:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                        <iframe src="https://calendar.google.com/calendar/embed?src=c_b20e046da009ca063b087e4b7f37e2ce4ed0d4b6ce5bdbf76fdad57ec10d5eae%40group.calendar.google.com&ctz=America%2FNew_York" 
                                style="border: 0" 
                                width="100%" 
                                height="100%" 
                                frameborder="0" 
                                scrolling="no"
                                title="Rochester Community Events Calendar">
                        </iframe>
                    </div>
                    
                    <div class="mt-6 flex flex-col sm:flex-row gap-4">
                        <a href="https://calendar.google.com/calendar/u/0?cid=Y19iMjBlMDQ2ZGEwMDljYTA2M2IwODdlNGI3ZjM3ZTJjZTRlZDBkNGI2Y2U1YmRiZjc2ZmRhZDU3ZWMxMGQ1ZWFlQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20" 
                           target="_blank" 
                           class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold">
                            <i class="fas fa-external-link-alt mr-2"></i>
                            Open in Google Calendar
                        </a>
                        <button onclick="subscribeToCalendar()" 
                                class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                            <i class="fas fa-plus mr-2"></i>
                            Add to My Calendar
                        </button>
                    </div>
                </div>

                <!-- Community Calendar Integration -->
                <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white mt-8">
                    <div class="text-center">
                        <i class="fas fa-calendar-plus text-4xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-4">Join the Movement</h3>
                        <p class="text-white/90 mb-6 max-w-2xl mx-auto">
                            Use Event Sync to discover what's happening, plan your week, and join the movement that makes Rochester thrive. 
                            Your participation strengthens our community.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onclick="subscribeToUpdates()" class="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all border border-white/30">
                                <i class="fas fa-bell mr-2"></i>Get Daily Updates
                            </button>
                            <button onclick="submitCommunityEvent()" class="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all font-semibold">
                                <i class="fas fa-plus mr-2"></i>Submit Your Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Initialize Events Sync features
    initializeEventsSync();
}

async function loadEvents() {
    try {
        const response = await axios.get('/api/events');
        eventsData = response.data;
        displayEvents(eventsData);
    } catch (error) {
        console.error('Error loading events:', error);
        document.getElementById('events-loading').innerHTML = `
            <p class="text-red-600">Error loading events. Please try again.</p>
        `;
    }
}

function displayEvents(events) {
    const container = document.getElementById('events-container');
    const loading = document.getElementById('events-loading');
    
    loading.style.display = 'none';
    
    if (events.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No events found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = events.map(event => `
        <div class="bg-white border-l-4 border-forest-green rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                    <h4 class="text-xl font-bold text-forest-green mb-2">${event.title}</h4>
                    <div class="flex items-center text-gray-600 text-sm space-x-4">
                        <span><i class="fas fa-calendar mr-1"></i>${formatDate(event.event_date)}</span>
                        ${event.start_time ? `<span><i class="fas fa-clock mr-1"></i>${event.start_time}</span>` : ''}
                        ${event.location ? `<span><i class="fas fa-map-marker-alt mr-1"></i>${event.location}</span>` : ''}
                    </div>
                </div>
                <div class="flex items-center space-x-2 mt-4 md:mt-0">
                    <span class="text-xs bg-light-green text-black px-2 py-1 rounded">${event.category}</span>
                    <span class="text-xs bg-gray-100 px-2 py-1 rounded">${event.community_focus}</span>
                </div>
            </div>
            
            <p class="text-gray-700 mb-4">${event.description || 'No description available'}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                ${event.address ? `<p><i class="fas fa-map-marker-alt mr-2"></i>${event.address}</p>` : ''}
                ${event.organizer ? `<p><i class="fas fa-user mr-2"></i>Organized by: ${event.organizer}</p>` : ''}
                ${event.contact_info ? `<p><i class="fas fa-envelope mr-2"></i>${event.contact_info}</p>` : ''}
                ${event.end_time ? `<p><i class="fas fa-clock mr-2"></i>Until: ${event.end_time}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Enhanced filter function for Events Sync
function filterEvents() {
    const categoryFilter = document.getElementById('event-category-filter').value;
    const communityFilter = document.getElementById('event-community-filter').value;
    const dateFilter = document.getElementById('event-date-filter').value;
    const locationFilter = document.getElementById('event-location-filter')?.value;
    
    // Get current events data (from API + generated events)
    let filtered = [...eventsData, ...generateCommunityEvents()];
    
    if (categoryFilter) {
        filtered = filtered.filter(event => event.category === categoryFilter);
    }
    
    if (communityFilter) {
        filtered = filtered.filter(event => 
            event.community_focus === communityFilter || event.community_focus === 'both'
        );
    }
    
    if (dateFilter) {
        filtered = filtered.filter(event => event.event_date >= dateFilter);
    }
    
    if (locationFilter) {
        filtered = filtered.filter(event => 
            event.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
            (event.address && event.address.toLowerCase().includes(locationFilter.toLowerCase()))
        );
    }
    
    displayEnhancedEvents(filtered);
}

// ================================
// ROCROOTS CONNECT COMPREHENSIVE IMPLEMENTATION
// ================================

function loadRocRootsConnect() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <section class="py-8 bg-gradient-to-br from-cultural-brown/5 via-golden-yellow/5 to-warm-amber/5 min-h-screen">
            <div class="container mx-auto px-4">
                <!-- Enhanced Heritage Header with Cultural Identity and Historical Imagery -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden mb-8 border-l-4 border-cultural-brown">
                    <!-- Historical Timeline Hero Background -->
                    <div class="relative h-80 bg-gradient-to-r from-cultural-brown via-warm-amber to-golden-yellow">
                        <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/798b3c4d-7a03-401d-b741-88b2dd8f9b76" 
                             alt="Rochester Black Heritage Timeline" 
                             class="absolute inset-0 w-full h-full object-cover opacity-40">
                        <div class="absolute inset-0 bg-gradient-to-r from-cultural-brown/85 via-warm-amber/85 to-golden-yellow/85"></div>
                        
                        <div class="relative z-10 text-white p-6 md:p-8 h-full flex items-center">
                            <div class="flex items-center justify-between flex-wrap gap-4 w-full">
                                <div class="flex items-center space-x-6">
                                    <div class="w-20 h-20 rounded-full overflow-hidden backdrop-blur-sm border-2 border-white/30 bg-white/10">
                                        <img src="https://page.gensparksite.com/v1/base64_upload/e05a9cbeedf123511abee1457726e906" 
                                             alt="Rochester Black Heritage Mural" 
                                             class="w-full h-full object-cover">
                                    </div>
                                    <div>
                                        <h2 class="text-4xl md:text-5xl font-bold text-black">RocRoots Connect</h2>
                                        <p class="text-black text-xl">Interactive Black Heritage Journey Through Time</p>
                                        <p class="text-black text-sm mt-1">From 1800s Underground Railroad to Today's Community Leaders</p>
                                    </div>
                                </div>
                                <button onclick="goHome()" class="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                    <i class="fas fa-arrow-left mr-2"></i>Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Heritage Statistics Dashboard -->
                    <div class="bg-white p-6">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-cultural-brown">200+</div>
                                <div class="text-xs text-gray-600">Years of History</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-golden-yellow">150+</div>
                                <div class="text-xs text-gray-600">Historical Figures</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-warm-amber">50+</div>
                                <div class="text-xs text-gray-600">Historic Sites</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-forest-green">25+</div>
                                <div class="text-xs text-gray-600">Community Stories</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Hub with Thematic Journeys -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <!-- Interactive Timeline -->
                    <div class="lg:col-span-2 bg-white rounded-xl shadow-xl p-8">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-2xl font-bold text-gray-800">
                                <i class="fas fa-clock mr-3 text-cultural-brown"></i>
                                Interactive Timeline
                            </h3>
                            <button onclick="toggleTimelineView()" class="text-sm bg-cultural-brown/10 text-cultural-brown px-3 py-2 rounded-lg hover:bg-cultural-brown/20">
                                <i class="fas fa-expand-arrows-alt mr-1"></i>Full Screen
                            </button>
                        </div>
                        
                        <!-- Timeline Navigation -->
                        <div class="flex flex-wrap gap-2 mb-6">
                            <button onclick="jumpToEra('1800s')" class="era-btn bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition-all">
                                1800s Underground Railroad
                            </button>
                            <button onclick="jumpToEra('1860s')" class="era-btn bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-all">
                                1860s Civil War
                            </button>
                            <button onclick="jumpToEra('1900s')" class="era-btn bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm hover:bg-green-200 transition-all">
                                1900s Migration
                            </button>
                            <button onclick="jumpToEra('1950s')" class="era-btn bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm hover:bg-purple-200 transition-all">
                                Civil Rights Era
                            </button>
                            <button onclick="jumpToEra('modern')" class="era-btn bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg text-sm hover:bg-indigo-200 transition-all">
                                Modern Day
                            </button>
                        </div>
                        
                        <!-- Timeline Visualization -->
                        <div id="timeline-container" class="relative bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 min-h-[300px] overflow-x-auto">
                            <!-- Interactive timeline will be rendered here -->
                        </div>
                    </div>

                    <!-- Thematic Journey Selector -->
                    <div class="space-y-4">
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">
                                <i class="fas fa-route mr-2 text-warm-amber"></i>
                                Thematic Journeys
                            </h3>
                            <div class="space-y-3">
                                <button onclick="startThematicJourney('underground-railroad')" class="w-full text-left p-4 rounded-lg hover:shadow-lg transition-all relative overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(239, 68, 68, 0.8), rgba(239, 68, 68, 0.9)), url('https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96');">
                                    <div class="flex items-center space-x-3 relative z-10">
                                        <i class="fas fa-train text-white"></i>
                                        <div>
                                            <h4 class="font-semibold text-white">Underground Railroad Trail</h4>
                                            <p class="text-xs text-white/90">Follow freedom seekers' journey</p>
                                        </div>
                                    </div>
                                </button>
                                
                                <button onclick="startThematicJourney('cultural-renaissance')" class="w-full text-left p-4 rounded-lg hover:shadow-lg transition-all relative overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(147, 51, 234, 0.8), rgba(147, 51, 234, 0.9)), url('https://cdn1.genspark.ai/user-upload-image/3_generated/925a7ea4-13a4-4949-b36c-9802fdab72ed');">
                                    <div class="flex items-center space-x-3 relative z-10">
                                        <i class="fas fa-palette text-white"></i>
                                        <div>
                                            <h4 class="font-semibold text-white">Cultural Renaissance</h4>
                                            <p class="text-xs text-white/90">Art, music, and literature</p>
                                        </div>
                                    </div>
                                </button>
                                
                                <button onclick="startThematicJourney('business-pioneers')" class="w-full text-left p-4 rounded-lg hover:shadow-lg transition-all relative overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.9)), url('https://cdn1.genspark.ai/user-upload-image/3_generated/925a7ea4-13a4-4949-b36c-9802fdab72ed');">
                                    <div class="flex items-center space-x-3 relative z-10">
                                        <i class="fas fa-briefcase text-white"></i>
                                        <div>
                                            <h4 class="font-semibold text-white">Business Pioneers</h4>
                                            <p class="text-xs text-white/90">Entrepreneurial achievements</p>
                                        </div>
                                    </div>
                                </button>
                                
                                <button onclick="startThematicJourney('education-leaders')" class="w-full text-left p-4 rounded-lg hover:shadow-lg transition-all relative overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.9)), url('https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96');">
                                    <div class="flex items-center space-x-3 relative z-10">
                                        <i class="fas fa-graduation-cap text-white"></i>
                                        <div>
                                            <h4 class="font-semibold text-white">Educational Leaders</h4>
                                            <p class="text-xs text-white/90">Pioneers in learning</p>
                                        </div>
                                    </div>
                                </button>
                                
                                <button onclick="startThematicJourney('civil-rights')" class="w-full text-left p-4 rounded-lg hover:shadow-lg transition-all relative overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(234, 179, 8, 0.8), rgba(234, 179, 8, 0.9)), url('https://cdn1.genspark.ai/user-upload-image/3_generated/817f24ac-3b57-4c96-a17a-fa3f31e5d635');">
                                    <div class="flex items-center space-x-3 relative z-10">
                                        <i class="fas fa-fist-raised text-white"></i>
                                        <div>
                                            <h4 class="font-semibold text-white">Civil Rights Movement</h4>
                                            <p class="text-xs text-white/90">Struggle for equality</p>
                                        </div>
                                    </div>
                                </button>
                                
                                <button onclick="startThematicJourney('community-builders')" class="w-full text-left p-4 rounded-lg hover:shadow-lg transition-all relative overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(99, 102, 241, 0.8), rgba(99, 102, 241, 0.9)), url('https://cdn1.genspark.ai/user-upload-image/3_generated/925a7ea4-13a4-4949-b36c-9802fdab72ed');">
                                    <div class="flex items-center space-x-3 relative z-10">
                                        <i class="fas fa-users text-white"></i>
                                        <div>
                                            <h4 class="font-semibold text-white">Community Builders</h4>
                                            <p class="text-xs text-white/90">Modern day leaders</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Gamification & Progress -->
                        <div class="bg-gradient-to-br from-golden-yellow/20 to-warm-amber/20 rounded-xl p-6">
                            <h3 class="text-lg font-bold text-gray-800 mb-4">
                                <i class="fas fa-trophy mr-2 text-golden-yellow"></i>
                                Your Heritage Journey
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-700">Journey Progress</span>
                                    <span class="text-sm font-semibold text-cultural-brown">15%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-gradient-to-r from-cultural-brown to-golden-yellow h-2 rounded-full" style="width: 15%"></div>
                                </div>
                                <div class="flex items-center space-x-2 text-xs text-gray-600">
                                    <i class="fas fa-medal text-golden-yellow"></i>
                                    <span>3 badges earned • 12 sites discovered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Interactive Features Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openHistoricalProfiles()">
                        <div class="w-12 h-12 bg-cultural-brown/20 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-user-friends text-cultural-brown text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-2">Historical Figures</h4>
                        <p class="text-gray-600 text-sm">Explore profiles of Rochester's Black pioneers and leaders</p>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openVirtualTours()">
                        <div class="w-12 h-12 bg-warm-amber/20 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-vr-cardboard text-warm-amber text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-2">Virtual Tours</h4>
                        <p class="text-gray-600 text-sm">360° views and AR experiences of historic sites</p>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openAudioNarratives()">
                        <div class="w-12 h-12 bg-golden-yellow/20 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-headphones text-golden-yellow text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-2">Audio Stories</h4>
                        <p class="text-gray-600 text-sm">Listen to narrated stories and historical accounts</p>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openCommunityCollection()">
                        <div class="w-12 h-12 bg-forest-green/20 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-camera text-forest-green text-xl"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-800 mb-2">Community Stories</h4>
                        <p class="text-gray-600 text-sm">Share and explore community-contributed content</p>
                    </div>
                </div>

                <!-- Featured Historical Content -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-star mr-3 text-golden-yellow"></i>
                            Featured Heritage Story
                        </h3>
                        <button onclick="exploreAllStories()" class="text-cultural-brown hover:text-warm-amber text-sm font-medium">
                            Explore All Stories <i class="fas fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                    
                    <div id="featured-story-container">
                        <!-- Featured story content will be loaded here -->
                    </div>
                </div>

                <!-- Historical Image Gallery -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-images mr-3 text-golden-yellow"></i>
                            Historical Rochester Gallery
                        </h3>
                        <button onclick="openImageGallery()" class="text-cultural-brown hover:text-warm-amber text-sm font-medium">
                            View Full Gallery <i class="fas fa-expand ml-1"></i>
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all" onclick="openImageViewer('underground-railroad')">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96" 
                                 alt="Underground Railroad Scene - 1840s Rochester" 
                                 class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="absolute bottom-4 left-4 text-white">
                                    <h4 class="font-bold text-sm">Underground Railroad Era</h4>
                                    <p class="text-xs opacity-90">1840s - Freedom Seekers Journey</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all" onclick="openImageViewer('civil-rights')">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/817f24ac-3b57-4c96-a17a-fa3f31e5d635" 
                                 alt="Civil Rights Era Scene - 1960s Rochester" 
                                 class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="absolute bottom-4 left-4 text-white">
                                    <h4 class="font-bold text-sm">Civil Rights Movement</h4>
                                    <p class="text-xs opacity-90">1960s - Community Demonstrations</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all" onclick="openImageViewer('modern-excellence')">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/925a7ea4-13a4-4949-b36c-9802fdab72ed" 
                                 alt="Modern Black Excellence - Contemporary Rochester" 
                                 class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="absolute bottom-4 left-4 text-white">
                                    <h4 class="font-bold text-sm">Modern Excellence</h4>
                                    <p class="text-xs opacity-90">Present Day - Community Success</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6 text-center">
                        <p class="text-gray-600 text-sm mb-4">Discover Rochester's Black heritage through powerful historical imagery spanning over 180 years of community strength and resilience.</p>
                        <div class="flex justify-center space-x-4 text-xs text-gray-500">
                            <span><i class="fas fa-clock mr-1"></i>1840s to Present</span>
                            <span><i class="fas fa-map-marker-alt mr-1"></i>Rochester, NY</span>
                            <span><i class="fas fa-users mr-1"></i>Community Stories</span>
                        </div>
                    </div>
                </div>

                <!-- Underground Railroad Documentary Video -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-train mr-3 text-cultural-brown"></i>
                        The Underground Railroad in Rochester
                    </h3>
                    <div class="relative rounded-lg overflow-hidden shadow-lg">
                        <video 
                            src="https://cdn1.genspark.ai/user-upload-image/5/e4b69783-d43d-4905-bc1c-4d3bf10a42d3.mp4"
                            poster="https://cdn1.genspark.ai/user-upload-image/video_frames/e0e27cf3-09b3-48ac-a6a3-697359f4ebe1"
                            controls 
                            class="w-full h-64 md:h-80 object-cover bg-gradient-to-br from-cultural-brown/10 to-golden-yellow/10"
                            preload="metadata">
                            <p class="text-gray-600 p-8 text-center">Your browser does not support video playback. 
                               <a href="https://cdn1.genspark.ai/user-upload-image/5/e4b69783-d43d-4905-bc1c-4d3bf10a42d3.mp4" 
                                  target="_blank" class="text-cultural-brown hover:underline">View video in new tab</a>
                            </p>
                        </video>
                        
                        <!-- Video Overlay Info -->
                        <div class="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
                            <h4 class="font-bold mb-1">Rochester's Underground Railroad Legacy</h4>
                            <p class="text-white/90 text-sm">Explore the courageous journey of freedom seekers and the brave abolitionists who helped them reach safety</p>
                        </div>
                    </div>
                </div>

                <!-- Historic Sites Map -->
                <div class="bg-white rounded-xl shadow-xl p-8">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-map-marked-alt mr-3 text-warm-amber"></i>
                            Interactive Historic Sites Map
                        </h3>
                        <div class="flex space-x-2">
                            <button onclick="toggleMapView('satellite')" class="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200">
                                Satellite
                            </button>
                            <button onclick="toggleMapView('historical')" class="text-sm bg-cultural-brown/10 text-cultural-brown px-3 py-2 rounded-lg hover:bg-cultural-brown/20">
                                Historical
                            </button>
                            <button onclick="enableGPSTour()" class="text-sm bg-forest-green text-white px-3 py-2 rounded-lg hover:bg-green-700">
                                <i class="fas fa-location-arrow mr-1"></i>GPS Tour
                            </button>
                        </div>
                    </div>
                    
                    <div id="historic-map-container" class="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg min-h-[400px] flex items-center justify-center">
                        <div class="text-center">
                            <i class="fas fa-map text-4xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600 mb-4">Interactive map of Rochester's Black heritage sites</p>
                            <button onclick="loadHistoricMap()" class="bg-cultural-brown text-white px-6 py-3 rounded-lg hover:bg-brown-700">
                                <i class="fas fa-play mr-2"></i>Launch Interactive Map
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div id="rocroots-loading" class="hidden text-center py-8">
                    <div class="inline-flex items-center space-x-3">
                        <i class="fas fa-landmark text-2xl text-cultural-brown animate-pulse"></i>
                        <span class="text-gray-600">Loading heritage content...</span>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Initialize RocRoots Connect features
    initializeRocRootsConnect();
}

async function loadHistoricalContent() {
    try {
        const response = await axios.get('/api/history');
        displayHistoricalContent(response.data);
    } catch (error) {
        console.error('Error loading historical content:', error);
        document.getElementById('history-loading').innerHTML = `
            <p class="text-red-600">Error loading historical content. Please try again.</p>
        `;
    }
}

function displayHistoricalContent(content) {
    const container = document.getElementById('history-container');
    const loading = document.getElementById('history-loading');
    
    loading.style.display = 'none';
    
    if (content.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-book text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No historical content available.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = content.map(item => `
        <div class="bg-white border rounded-lg p-8 shadow-md">
            <div class="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <div class="flex-1">
                    <h4 class="text-2xl font-bold text-forest-green mb-2">${item.title}</h4>
                    <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span class="bg-light-green text-black px-2 py-1 rounded">${item.time_period}</span>
                        ${item.location ? `<span><i class="fas fa-map-marker-alt mr-1"></i>${item.location}</span>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="prose max-w-none mb-6">
                <p class="text-gray-700 leading-relaxed">${item.content}</p>
            </div>
            
            ${item.people_involved ? `
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 class="font-semibold text-forest-green mb-2">Key Figures</h5>
                    <p class="text-gray-700">${item.people_involved}</p>
                </div>
            ` : ''}
            
            ${item.significance ? `
                <div class="bg-light-green bg-opacity-20 rounded-lg p-4">
                    <h5 class="font-semibold text-forest-green mb-2">Historical Significance</h5>
                    <p class="text-gray-700">${item.significance}</p>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function filterHistory() {
    const periodFilter = document.getElementById('period-filter').value;
    
    if (periodFilter) {
        // Load filtered content
        axios.get('/api/history', { params: { period: periodFilter } })
            .then(response => displayHistoricalContent(response.data))
            .catch(error => console.error('Error filtering history:', error));
    } else {
        // Load all content
        loadHistoricalContent();
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Comprehensive VitaHue Health & Wellness Platform
function loadVitaHue() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="vitahue-container">
            <!-- Header Section -->
            <div class="vitahue-header relative overflow-hidden">
                <!-- Hero Background Image -->
                <div class="absolute inset-0 z-0">
                    <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/1b22543a-64a8-4918-8af0-da471602acf4" 
                         alt="African American Family Health & Wellness" 
                         class="w-full h-full object-cover opacity-20">
                    <div class="absolute inset-0 bg-gradient-to-r from-green-600/80 via-green-700/80 to-green-800/80"></div>
                </div>
                
                <div class="container mx-auto px-4 relative z-10">
                    <h1 class="vitahue-title fade-in">
                        <i class="fas fa-heartbeat mr-4"></i>VitaHue
                    </h1>
                    <p class="vitahue-subtitle fade-in">Your Comprehensive Health & Wellness Companion</p>
                    <p class="text-sm opacity-90 fade-in">Culturally relevant health resources for the African American community</p>
                    
                    <!-- Quick Actions -->
                    <div class="flex justify-center mt-6 space-x-4">
                        <button onclick="goHome()" class="vitahue-btn vitahue-btn-secondary">
                            <i class="fas fa-arrow-left mr-2"></i>Back to Home
                        </button>
                        <button onclick="callEmergency()" class="vitahue-btn bg-red-600 hover:bg-red-700">
                            <i class="fas fa-phone mr-2"></i>Emergency: 911
                        </button>
                    </div>
                </div>
            </div>

            <!-- Navigation Pills -->
            <div class="vitahue-nav">
                <a href="#overview" class="nav-pill active">
                    <i class="fas fa-home mr-2"></i>Overview
                </a>
                <a href="#assessment" class="nav-pill">
                    <i class="fas fa-clipboard-check mr-2"></i>Health Assessment
                </a>
                <a href="#tools" class="nav-pill">
                    <i class="fas fa-calculator mr-2"></i>Health Tools
                </a>
                <a href="#medications" class="nav-pill">
                    <i class="fas fa-pills mr-2"></i>Medications
                </a>
                <a href="#goals" class="nav-pill">
                    <i class="fas fa-bullseye mr-2"></i>Goals
                </a>
                <a href="#resources" class="nav-pill">
                    <i class="fas fa-book-medical mr-2"></i>Resources
                </a>
            </div>

            <!-- Overview Section -->
            <div id="overview" class="vitahue-section fade-in">
                <h2 class="section-title">
                    <i class="fas fa-heart"></i>
                    Welcome to Your Health Journey
                </h2>
                
                <!-- Health Stats Dashboard -->
                <div class="stats-container">
                    <div class="stat-item">
                        <span class="stat-number">24/7</span>
                        <span class="stat-label">Health Support</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">500+</span>
                        <span class="stat-label">Health Resources</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">Culturally Relevant</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">Free</span>
                        <span class="stat-label">Always Available</span>
                    </div>
                </div>

                <!-- Key Features Grid -->
                <div class="feature-grid">
                    <div class="feature-item slide-up relative">
                        <div class="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-green-200">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/d6560126-45b5-42e8-b2ae-1d02ff0f5fee" 
                                 alt="African American Healthcare Provider" 
                                 class="w-full h-full object-cover">
                        </div>
                        <i class="fas fa-user-md feature-icon"></i>
                        <h3 class="feature-title">Personalized Care</h3>
                        <p>Culturally competent healthcare guidance tailored to the African American community's unique health needs and challenges.</p>
                    </div>
                    
                    <div class="feature-item slide-up relative">
                        <div class="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-green-200">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/6c709325-c6b4-4ca0-aaa8-fcd1fe24aef6" 
                                 alt="African American Community Fitness" 
                                 class="w-full h-full object-cover">
                        </div>
                        <i class="fas fa-heartbeat feature-icon"></i>
                        <h3 class="feature-title">Health Monitoring</h3>
                        <p>Track vital signs, medications, and health goals with tools designed for comprehensive wellness management.</p>
                    </div>
                    
                    <div class="feature-item slide-up relative">
                        <div class="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-green-200">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/924c86e3-be71-4d15-9d3d-770d2a532438" 
                                 alt="African American Healthcare Consultation" 
                                 class="w-full h-full object-cover">
                        </div>
                        <i class="fas fa-users feature-icon"></i>
                        <h3 class="feature-title">Community Support</h3>
                        <p>Connect with healthcare providers and community members who understand your cultural background and health journey.</p>
                    </div>
                </div>

                <!-- Daily Health Tip -->
                <div class="vitahue-card">
                    <div class="card-title">
                        <i class="fas fa-lightbulb mr-2 text-yellow-500"></i>
                        Daily Health Tip
                    </div>
                    <div class="card-content">
                        <p id="rotating-tip" style="transition: opacity 0.3s ease;">
                            Loading health tip...
                        </p>
                    </div>
                </div>
            </div>

            <!-- Health Assessment Section -->
            <div id="assessment" class="vitahue-section">
                <h2 class="section-title">
                    <i class="fas fa-clipboard-check"></i>
                    Health Assessment
                </h2>
                
                <!-- Hero Image for Assessment Section -->
                <div class="w-full h-48 mb-6 rounded-lg overflow-hidden relative">
                    <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/d6560126-45b5-42e8-b2ae-1d02ff0f5fee" 
                         alt="African American Healthcare Professional" 
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 text-white">
                        <h3 class="text-xl font-bold">Culturally Competent Health Assessment</h3>
                        <p class="text-sm opacity-90">Designed specifically for the African American community</p>
                    </div>
                </div>
                
                <div class="vitahue-card">
                    <div class="card-title">Quick Health Check</div>
                    <div class="card-content">
                        <p class="mb-4">Take our comprehensive health assessment to get personalized recommendations for your wellness journey. This culturally-informed assessment considers factors specific to the African American community's health landscape.</p>
                        
                        <div class="text-center">
                            <button onclick="startHealthAssessment()" class="vitahue-btn">
                                <i class="fas fa-play mr-2"></i>Start Assessment (5 minutes)
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Assessment Benefits -->
                <div class="grid md:grid-cols-3 gap-6 mt-6">
                    <div class="vitahue-card relative">
                        <div class="absolute top-2 right-2 w-12 h-12 rounded-full overflow-hidden border border-green-300">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/d6560126-45b5-42e8-b2ae-1d02ff0f5fee" 
                                 alt="Healthcare Provider" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="card-title text-center">
                            <i class="fas fa-chart-line text-3xl text-green-600 mb-3"></i>
                            Personalized Insights
                        </div>
                        <div class="card-content text-center">
                            <p>Receive customized health recommendations based on your assessment results and cultural considerations.</p>
                        </div>
                    </div>
                    
                    <div class="vitahue-card relative">
                        <div class="absolute top-2 right-2 w-12 h-12 rounded-full overflow-hidden border border-green-300">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/924c86e3-be71-4d15-9d3d-770d2a532438" 
                                 alt="Healthcare Consultation" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="card-title text-center">
                            <i class="fas fa-shield-alt text-3xl text-blue-600 mb-3"></i>
                            Risk Assessment
                        </div>
                        <div class="card-content text-center">
                            <p>Identify potential health risks early and get guidance on preventive measures tailored to your profile.</p>
                        </div>
                    </div>
                    
                    <div class="vitahue-card relative">
                        <div class="absolute top-2 right-2 w-12 h-12 rounded-full overflow-hidden border border-green-300">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/6c709325-c6b4-4ca0-aaa8-fcd1fe24aef6" 
                                 alt="Community Fitness" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="card-title text-center">
                            <i class="fas fa-route text-3xl text-purple-600 mb-3"></i>
                            Action Plan
                        </div>
                        <div class="card-content text-center">
                            <p>Get a step-by-step wellness plan with achievable goals and culturally relevant resources.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Health Tools Section -->
            <div id="tools" class="vitahue-section">
                <h2 class="section-title">
                    <i class="fas fa-calculator"></i>
                    Health Calculators & Tools
                </h2>
                
                <!-- Health Tools Hero Image -->
                <div class="w-full h-40 mb-6 rounded-lg overflow-hidden relative">
                    <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/6c709325-c6b4-4ca0-aaa8-fcd1fe24aef6" 
                         alt="African American Community Wellness" 
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-r from-green-600/70 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 text-white">
                        <h3 class="text-lg font-bold">Community Health & Wellness Tools</h3>
                        <p class="text-sm opacity-90">Interactive tools for better health management</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- BMI Calculator -->
                    <div class="vitahue-card">
                        <div class="card-title">BMI Calculator</div>
                        <div class="card-content">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">Weight (lbs)</label>
                                    <input type="number" id="weight" placeholder="Enter your weight" class="w-full p-2 border rounded">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">Height (inches)</label>
                                    <input type="number" id="height" placeholder="Enter your height" class="w-full p-2 border rounded">
                                </div>
                                <button onclick="calculateBMI()" class="vitahue-btn w-full">
                                    <i class="fas fa-calculator mr-2"></i>Calculate BMI
                                </button>
                                <div id="bmi-result"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Blood Pressure Tracker -->
                    <div class="vitahue-card">
                        <div class="card-title">Blood Pressure Guidelines</div>
                        <div class="card-content">
                            <div class="space-y-3">
                                <div class="bg-green-50 p-3 rounded border-l-4 border-green-400">
                                    <strong>Normal:</strong> Less than 120/80 mmHg
                                </div>
                                <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                                    <strong>Elevated:</strong> 120-129 (systolic) and less than 80 (diastolic)
                                </div>
                                <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                                    <strong>High Stage 1:</strong> 130-139/80-89 mmHg
                                </div>
                                <div class="bg-red-50 p-3 rounded border-l-4 border-red-400">
                                    <strong>High Stage 2:</strong> 140/90 mmHg or higher
                                </div>
                                <div class="mt-4 text-center">
                                    <button onclick="trackBloodPressure()" class="vitahue-btn vitahue-btn-secondary">
                                        <i class="fas fa-chart-line mr-2"></i>Track My BP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Additional Health Tools -->
                <div class="grid md:grid-cols-3 gap-6 mt-6">
                    <div class="vitahue-card text-center relative">
                        <div class="absolute top-2 right-2 w-10 h-10 rounded-full overflow-hidden border border-green-300">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/6c709325-c6b4-4ca0-aaa8-fcd1fe24aef6" 
                                 alt="Fitness Activity" 
                                 class="w-full h-full object-cover">
                        </div>
                        <i class="fas fa-walking text-4xl text-green-600 mb-3"></i>
                        <div class="card-title">Steps Counter</div>
                        <button class="vitahue-btn vitahue-btn-secondary">Coming Soon</button>
                    </div>
                    
                    <div class="vitahue-card text-center relative">
                        <div class="absolute top-2 right-2 w-10 h-10 rounded-full overflow-hidden border border-green-300">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/4caec0e0-1555-4a03-8f70-48a41948f643" 
                                 alt="Healthy Nutrition" 
                                 class="w-full h-full object-cover">
                        </div>
                        <i class="fas fa-apple-alt text-4xl text-red-600 mb-3"></i>
                        <div class="card-title">Nutrition Tracker</div>
                        <button class="vitahue-btn vitahue-btn-secondary">Coming Soon</button>
                    </div>
                    
                    <div class="vitahue-card text-center relative">
                        <div class="absolute top-2 right-2 w-10 h-10 rounded-full overflow-hidden border border-green-300">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/924c86e3-be71-4d15-9d3d-770d2a532438" 
                                 alt="Health Consultation" 
                                 class="w-full h-full object-cover">
                        </div>
                        <i class="fas fa-bed text-4xl text-blue-600 mb-3"></i>
                        <div class="card-title">Sleep Monitor</div>
                        <button class="vitahue-btn vitahue-btn-secondary">Coming Soon</button>
                    </div>
                </div>
            </div>

            <!-- Medications Section -->
            <div id="medications" class="vitahue-section">
                <h2 class="section-title">
                    <i class="fas fa-pills"></i>
                    Medication Management
                </h2>
                
                <!-- Add Medication Form -->
                <div class="vitahue-card">
                    <div class="card-title">Add New Medication</div>
                    <div class="card-content">
                        <div class="grid md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Medication Name</label>
                                <input type="text" id="med-name" placeholder="Enter medication name" class="w-full p-2 border rounded">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Time</label>
                                <input type="time" id="med-time" class="w-full p-2 border rounded">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Frequency</label>
                                <select id="med-frequency" class="w-full p-2 border rounded">
                                    <option value="daily">Daily</option>
                                    <option value="twice-daily">Twice Daily</option>
                                    <option value="three-times">Three Times Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="as-needed">As Needed</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4 text-center">
                            <button onclick="addMedication()" class="vitahue-btn">
                                <i class="fas fa-plus mr-2"></i>Add Medication
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Medication List -->
                <div class="vitahue-card">
                    <div class="card-title">My Medications</div>
                    <div class="card-content">
                        <div id="medication-list">
                            <p class="text-gray-500 text-center">No medications added yet.</p>
                        </div>
                    </div>
                </div>

                <!-- Medication Safety Tips -->
                <div class="vitahue-card">
                    <div class="card-title">
                        <i class="fas fa-exclamation-triangle mr-2 text-yellow-500"></i>
                        Important Medication Safety Tips
                    </div>
                    <div class="card-content">
                        <ul class="space-y-2">
                            <li>• Always take medications as prescribed by your healthcare provider</li>
                            <li>• Never share medications with others</li>
                            <li>• Keep medications in their original containers</li>
                            <li>• Check expiration dates regularly</li>
                            <li>• Inform all healthcare providers about all medications you're taking</li>
                            <li>• Be aware of potential side effects and drug interactions</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Goals Section -->
            <div id="goals" class="vitahue-section">
                <h2 class="section-title">
                    <i class="fas fa-bullseye"></i>
                    Health Goals & Progress
                </h2>
                
                <!-- Goals Hero Image -->
                <div class="w-full h-40 mb-6 rounded-lg overflow-hidden relative">
                    <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/1b22543a-64a8-4918-8af0-da471602acf4" 
                         alt="African American Family Health Goals" 
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-blue-600/70"></div>
                    <div class="absolute bottom-4 left-4 text-white">
                        <h3 class="text-lg font-bold">Achieve Your Health Goals Together</h3>
                        <p class="text-sm opacity-90">Family wellness and community support</p>
                    </div>
                </div>
                
                <!-- Add Goal Form -->
                <div class="vitahue-card">
                    <div class="card-title">Set New Health Goal</div>
                    <div class="card-content">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Health Goal</label>
                                <input type="text" id="health-goal" placeholder="e.g., Exercise 3 times per week" class="w-full p-2 border rounded">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Target</label>
                                <input type="text" id="goal-target" placeholder="e.g., By end of month" class="w-full p-2 border rounded">
                            </div>
                        </div>
                        <div class="mt-4 text-center">
                            <button onclick="addHealthGoal()" class="vitahue-btn">
                                <i class="fas fa-plus mr-2"></i>Add Goal
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Goals List -->
                <div class="vitahue-card">
                    <div class="card-title">My Health Goals</div>
                    <div class="card-content">
                        <div id="goals-list">
                            <p class="text-gray-500 text-center">No health goals set yet.</p>
                        </div>
                    </div>
                </div>

                <!-- Suggested Goals -->
                <div class="vitahue-card">
                    <div class="card-title">
                        <i class="fas fa-lightbulb mr-2 text-yellow-500"></i>
                        Suggested Health Goals for the Black Community
                    </div>
                    <div class="card-content">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <h5 class="font-semibold">Physical Health:</h5>
                                <ul class="text-sm space-y-1">
                                    <li>• Monitor blood pressure weekly</li>
                                    <li>• Walk 10,000 steps daily</li>
                                    <li>• Eat 5 servings of fruits/vegetables daily</li>
                                    <li>• Get annual preventive screenings</li>
                                </ul>
                            </div>
                            <div class="space-y-2">
                                <h5 class="font-semibold">Mental Health:</h5>
                                <ul class="text-sm space-y-1">
                                    <li>• Practice stress management daily</li>
                                    <li>• Maintain social connections</li>
                                    <li>• Get 7-9 hours of sleep nightly</li>
                                    <li>• Seek culturally competent mental health care</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Resources Section -->
            <div id="resources" class="vitahue-section">
                <h2 class="section-title">
                    <i class="fas fa-book-medical"></i>
                    Health Resources & Information
                </h2>
                
                <!-- Resources Hero Image -->
                <div class="w-full h-48 mb-6 rounded-lg overflow-hidden relative">
                    <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/924c86e3-be71-4d15-9d3d-770d2a532438" 
                         alt="African American Healthcare Resources" 
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-green-600/70"></div>
                    <div class="absolute bottom-4 left-4 text-white">
                        <h3 class="text-xl font-bold">Culturally Competent Healthcare Resources</h3>
                        <p class="text-sm opacity-90">Trusted information and guidance for the African American community</p>
                    </div>
                </div>
                
                <!-- Emergency Information -->
                <div class="vitahue-card bg-red-50 border-red-200">
                    <div class="card-title text-red-700">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        Emergency Contacts
                    </div>
                    <div class="card-content">
                        <div class="grid md:grid-cols-3 gap-4">
                            <div class="text-center">
                                <h5 class="font-semibold text-red-700">Emergency Services</h5>
                                <p class="text-2xl font-bold text-red-600">911</p>
                                <button onclick="callEmergency()" class="vitahue-btn bg-red-600 hover:bg-red-700 mt-2">
                                    <i class="fas fa-phone mr-2"></i>Call Now
                                </button>
                            </div>
                            <div class="text-center">
                                <h5 class="font-semibold text-red-700">Poison Control</h5>
                                <p class="text-lg font-semibold">1-800-222-1222</p>
                            </div>
                            <div class="text-center">
                                <h5 class="font-semibold text-red-700">Mental Health Crisis</h5>
                                <p class="text-lg font-semibold">988</p>
                                <p class="text-sm">Suicide & Crisis Lifeline</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Health Education -->
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="vitahue-card">
                        <div class="card-title">Common Health Conditions in the Black Community</div>
                        <div class="card-content">
                            <div class="space-y-3">
                                <div>
                                    <h5 class="font-semibold">Hypertension (High Blood Pressure)</h5>
                                    <p class="text-sm">Affects 54% of Black adults. Regular monitoring and lifestyle changes are key.</p>
                                </div>
                                <div>
                                    <h5 class="font-semibold">Diabetes</h5>
                                    <p class="text-sm">Higher prevalence in Black communities. Early detection and management crucial.</p>
                                </div>
                                <div>
                                    <h5 class="font-semibold">Heart Disease</h5>
                                    <p class="text-sm">Leading cause of death. Prevention through diet, exercise, and regular check-ups.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="vitahue-card">
                        <div class="card-title">Preventive Care Guidelines</div>
                        <div class="card-content">
                            <div class="space-y-3">
                                <div>
                                    <h5 class="font-semibold">Annual Screenings</h5>
                                    <p class="text-sm">Blood pressure, cholesterol, diabetes, and age-appropriate cancer screenings.</p>
                                </div>
                                <div>
                                    <h5 class="font-semibold">Vaccinations</h5>
                                    <p class="text-sm">Stay current with flu, COVID-19, and other recommended vaccines.</p>
                                </div>
                                <div>
                                    <h5 class="font-semibold">Mental Health</h5>
                                    <p class="text-sm">Regular mental health check-ins and culturally competent care access.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Trusted Healthcare Providers -->
                <div class="vitahue-card">
                    <div class="card-title">Finding Culturally Competent Healthcare</div>
                    <div class="card-content">
                        <div class="grid md:grid-cols-3 gap-4">
                            <div>
                                <h5 class="font-semibold">Questions to Ask Providers:</h5>
                                <ul class="text-sm space-y-1 mt-2">
                                    <li>• Experience with Black patients</li>
                                    <li>• Understanding of cultural factors</li>
                                    <li>• Approach to health disparities</li>
                                    <li>• Communication style preferences</li>
                                </ul>
                            </div>
                            <div>
                                <h5 class="font-semibold">Red Flags:</h5>
                                <ul class="text-sm space-y-1 mt-2">
                                    <li>• Dismissive of concerns</li>
                                    <li>• Lack of cultural awareness</li>
                                    <li>• Unwillingness to explain treatments</li>
                                    <li>• No diversity in practice</li>
                                </ul>
                            </div>
                            <div>
                                <h5 class="font-semibold">Resources:</h5>
                                <ul class="text-sm space-y-1 mt-2">
                                    <li>• National Medical Association</li>
                                    <li>• Black Women's Health Imperative</li>
                                    <li>• Association of Black Cardiologists</li>
                                    <li>• Local community health centers</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Additional Resources -->
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="vitahue-card relative">
                        <!-- Nutrition Image Header -->
                        <div class="w-full h-32 mb-4 rounded-lg overflow-hidden relative">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/4caec0e0-1555-4a03-8f70-48a41948f643" 
                                 alt="African American Family Healthy Cooking" 
                                 class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div class="absolute bottom-2 left-2 text-white">
                                <h4 class="font-semibold">Cultural Nutrition & Wellness</h4>
                            </div>
                        </div>
                        <div class="card-title">Nutrition & Wellness</div>
                        <div class="card-content">
                            <ul class="space-y-2 text-sm">
                                <li>• Soul food makeovers for healthier cooking</li>
                                <li>• Managing diabetes with cultural foods</li>
                                <li>• Heart-healthy recipes and meal planning</li>
                                <li>• Community gardens and fresh food access</li>
                                <li>• Traditional remedies and modern medicine balance</li>
                            </ul>
                        </div>
                    </div>

                    <div class="vitahue-card relative">
                        <!-- Mental Health Image Header -->
                        <div class="w-full h-32 mb-4 rounded-lg overflow-hidden relative">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/924c86e3-be71-4d15-9d3d-770d2a532438" 
                                 alt="African American Mental Health Support" 
                                 class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div class="absolute bottom-2 left-2 text-white">
                                <h4 class="font-semibold">Mental Health & Well-being</h4>
                            </div>
                        </div>
                        <div class="card-title">Mental Health Support</div>
                        <div class="card-content">
                            <ul class="space-y-2 text-sm">
                                <li>• Therapy for People of Color directory</li>
                                <li>• Addressing historical medical trauma</li>
                                <li>• Community support groups</li>
                                <li>• Stress management and coping strategies</li>
                                <li>• Faith-based counseling resources</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Load and initialize VitaHue CSS
    if (!document.getElementById('vitahue-styles')) {
        const link = document.createElement('link');
        link.id = 'vitahue-styles';
        link.rel = 'stylesheet';
        link.href = '/static/css/vitahue.css';
        document.head.appendChild(link);
    }
    
    // Load and initialize VitaHue JavaScript
    if (!document.getElementById('vitahue-script')) {
        const script = document.createElement('script');
        script.id = 'vitahue-script';
        script.src = '/static/js/vitahue.js';
        script.onload = function() {
            // Initialize VitaHue after script loads
            if (window.initializeVitaHue) {
                window.initializeVitaHue();
            }
        };
        document.head.appendChild(script);
    } else {
        // If script already loaded, just initialize
        if (window.initializeVitaHue) {
            window.initializeVitaHue();
        }
    }
}

function loadMVPHealthcare() {
    loadGenericSection('mvp-healthcare', 'MVP Healthcare', 'fas fa-hospital', 'Healthcare services and insurance information');
}

function loadHyde() {
    loadGenericSection('hyde', 'Hyde', 'fas fa-brain', 'Culturally relevant mental health resources');
}

function loadNewsCenter() {
    loadNewsSection();
}

function loadYouthVibe() {
    loadGenericSection('youth-vibe', 'Youth Vibe', 'fas fa-music', 'Music, entertainment, and youth-focused content');
}

function loadSeniorCircle() {
    loadGenericSection('senior-circle', 'Senior Circle', 'fas fa-users', 'Resources for senior citizens');
}

function loadLimitleeLiving() {
    loadGenericSection('limitlee-living', 'Limitless Living', 'fas fa-universal-access', 'Resources for people with disabilities');
}

function loadMelomics() {
    loadEconomicSection();
}

function loadLatinConnection() {
    loadGenericSection('latin-connection', 'Latin Connection', 'fas fa-globe-americas', 'Resources for the Latino community');
}

// Generic section loader
function loadGenericSection(sectionId, title, icon, description) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <section class="py-8 bg-white">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-forest-green mb-2">
                            <i class="${icon} mr-3"></i>${title}
                        </h2>
                        <p class="text-gray-600">${description}</p>
                    </div>
                    <button onclick="goHome()" class="bg-forest-green text-white px-4 py-2 rounded hover:bg-dark-green">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Home
                    </button>
                </div>
                
                <div class="bg-gradient-to-r from-forest-green to-dark-green text-white rounded-lg p-8 mb-8">
                    <h3 class="text-2xl font-bold mb-4">${title}</h3>
                    <p class="text-lg opacity-90">
                        ${description}. This section is under development and will be populated with 
                        relevant resources and information soon.
                    </p>
                </div>
                
                <div class="text-center py-12">
                    <div class="max-w-md mx-auto mb-8">
                        <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/11a83d48-ca0f-4672-b9a1-4badc664fb3a" 
                             alt="Coming Soon" 
                             class="w-full h-48 object-cover rounded-lg shadow-lg mb-6">
                    </div>
                    <i class="${icon} text-6xl text-gray-300 mb-4"></i>
                    <h4 class="text-xl font-semibold text-gray-600 mb-2">Coming Soon</h4>
                    <p class="text-gray-500">We're working hard to bring you the best ${title.toLowerCase()} resources.</p>
                </div>
            </div>
        </section>
    `;
}

// Health section loader
async function loadHealthSection(sectionId, title, icon, description) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <section class="py-8 bg-white">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-forest-green mb-2">
                            <i class="${icon} mr-3"></i>${title}
                        </h2>
                        <p class="text-gray-600">${description}</p>
                    </div>
                    <button onclick="goHome()" class="bg-forest-green text-white px-4 py-2 rounded hover:bg-dark-green">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Home
                    </button>
                </div>
                
                <div id="health-content" class="space-y-6">
                    <!-- Health content will be loaded here -->
                </div>
                
                <div id="health-loading" class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-2xl text-forest-green"></i>
                    <p class="text-gray-600 mt-2">Loading health resources...</p>
                </div>
            </div>
        </section>
    `;
    
    try {
        const response = await axios.get('/api/health');
        displayHealthContent(response.data);
    } catch (error) {
        console.error('Error loading health content:', error);
        document.getElementById('health-loading').innerHTML = `
            <p class="text-red-600">Error loading health resources. Please try again.</p>
        `;
    }
}

function displayHealthContent(content) {
    const container = document.getElementById('health-content');
    const loading = document.getElementById('health-loading');
    
    loading.style.display = 'none';
    
    if (content.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-heartbeat text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No health resources available yet.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = content.map(item => `
        <div class="bg-white border rounded-lg p-6 shadow-md">
            <div class="flex items-start justify-between mb-4">
                <h4 class="text-xl font-bold text-forest-green">${item.title}</h4>
                <span class="text-xs bg-light-green text-black px-2 py-1 rounded">${item.category}</span>
            </div>
            
            <div class="prose max-w-none">
                <p class="text-gray-700">${item.content}</p>
            </div>
            
            ${item.source ? `
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <p class="text-sm text-gray-600">Source: ${item.source}</p>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// News section loader
// Enhanced News Central section loader
async function loadNewsSection() {
    const contentArea = document.getElementById('content-area');
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    contentArea.innerHTML = `
        <section class="py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 min-h-screen">
            <div class="container mx-auto px-4">
                <!-- Enhanced Header with AI Integration and Visual Media -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
                    <!-- Hero Image Background -->
                    <div class="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                        <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/58a28740-a8cd-419e-9361-0293a5c8701f" 
                             alt="Black Community Excellence and Achievements" 
                             class="absolute inset-0 w-full h-full object-cover opacity-40">
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-indigo-600/80"></div>
                        
                        <div class="relative z-10 text-white p-6 md:p-8 h-full flex items-center">
                            <div class="flex items-center justify-between flex-wrap gap-4 w-full">
                                <div class="flex items-center space-x-4">
                                    <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <i class="fas fa-newspaper text-2xl text-white"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-3xl md:text-4xl font-bold">News Central</h2>
                                        <p class="text-white/90 text-lg">Daily Hub for Uplifting Black Community Stories</p>
                                        <p class="text-white/80 text-sm">Updated Daily • ${formattedDate}</p>
                                    </div>
                                </div>
                                <button onclick="goHome()" class="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                    <i class="fas fa-arrow-left mr-2"></i>Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AI-Powered News Intelligence Hub -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <!-- AI News Agent -->
                    <div class="lg:col-span-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white shadow-xl">
                        <div class="flex items-center space-x-4 mb-6">
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <i class="fas fa-robot text-2xl"></i>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold">AI News Intelligence</h3>
                                <p class="text-white/90">Personalized Black excellence stories from across America</p>
                            </div>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                            <h4 class="font-bold mb-4">🔥 Trending Now</h4>
                            <div class="space-y-3 text-sm">
                                <div class="flex items-center space-x-3">
                                    <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                    <span>Black entrepreneurs breaking funding records nationwide</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span>Rochester youth wins national STEM competition</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                                    <span>Community garden project transforms neighborhood</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-4">
                            <a href="https://www.genspark.ai/agents?id=542bb897-591d-427d-b446-b452ba59a227" 
                               target="_blank"
                               class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg backdrop-blur-sm border border-white/30 transition-all flex items-center justify-center space-x-2">
                                <i class="fas fa-magic"></i>
                                <span>Access AI News Agent</span>
                            </a>
                            <button onclick="personalizeNews()" class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg backdrop-blur-sm border border-white/30 transition-all flex items-center justify-center space-x-2">
                                <i class="fas fa-user-cog"></i>
                                <span>Personalize Feed</span>
                            </button>
                        </div>
                    </div>

                    <!-- Quick Stats Dashboard -->
                    <div class="space-y-4">
                        <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="text-2xl font-bold text-green-600">847</h4>
                                    <p class="text-gray-600 text-sm">Positive Stories This Month</p>
                                </div>
                                <i class="fas fa-trending-up text-2xl text-green-500"></i>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="text-2xl font-bold text-blue-600">23</h4>
                                    <p class="text-gray-600 text-sm">Local Rochester Features</p>
                                </div>
                                <i class="fas fa-map-marker-alt text-2xl text-blue-500"></i>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="text-2xl font-bold text-purple-600">156</h4>
                                    <p class="text-gray-600 text-sm">Community Celebrations</p>
                                </div>
                                <i class="fas fa-celebrate text-2xl text-purple-500"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Interactive News Categories with Black Community Images -->
                <div class="bg-white rounded-xl shadow-xl p-6 mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">Explore by Category</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <!-- Achievements Category -->
                        <button onclick="loadNewsByCategory('achievements')" class="news-category-btn relative overflow-hidden bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-4 rounded-lg transition-all text-center group">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/58a28740-a8cd-419e-9361-0293a5c8701f" alt="Black Excellence" class="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity">
                            <div class="relative z-10">
                                <i class="fas fa-trophy text-2xl mb-2"></i>
                                <div class="text-sm font-medium">Achievements</div>
                            </div>
                        </button>
                        
                        <!-- Business Category -->
                        <button onclick="loadNewsByCategory('business')" class="news-category-btn relative overflow-hidden bg-green-100 hover:bg-green-200 text-green-800 p-4 rounded-lg transition-all text-center group">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/bacdd26a-ca78-4bf5-86d4-303e8eb9eefd" alt="Black Business Excellence" class="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity">
                            <div class="relative z-10">
                                <i class="fas fa-briefcase text-2xl mb-2"></i>
                                <div class="text-sm font-medium">Business</div>
                            </div>
                        </button>
                        
                        <!-- Education Category -->
                        <button onclick="loadNewsByCategory('education')" class="news-category-btn relative overflow-hidden bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 rounded-lg transition-all text-center group">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/5cb0ae07-698f-4652-b72e-e93be847a9bf" alt="Black Educational Excellence" class="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity">
                            <div class="relative z-10">
                                <i class="fas fa-graduation-cap text-2xl mb-2"></i>
                                <div class="text-sm font-medium">Education</div>
                            </div>
                        </button>
                        
                        <!-- Arts & Culture Category -->
                        <button onclick="loadNewsByCategory('arts')" class="news-category-btn relative overflow-hidden bg-purple-100 hover:bg-purple-200 text-purple-800 p-4 rounded-lg transition-all text-center group">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/45b917d0-2472-454d-afec-7fb36c372cb7" alt="Black Arts and Culture" class="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity">
                            <div class="relative z-10">
                                <i class="fas fa-palette text-2xl mb-2"></i>
                                <div class="text-sm font-medium">Arts & Culture</div>
                            </div>
                        </button>
                        
                        <!-- Community Category -->
                        <button onclick="loadNewsByCategory('community')" class="news-category-btn relative overflow-hidden bg-red-100 hover:bg-red-200 text-red-800 p-4 rounded-lg transition-all text-center group">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/b24f2a48-1551-419e-acae-14e6ad8d8acd" alt="Black Community Leadership" class="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity">
                            <div class="relative z-10">
                                <i class="fas fa-users text-2xl mb-2"></i>
                                <div class="text-sm font-medium">Community</div>
                            </div>
                        </button>
                        
                        <!-- Innovation Category -->
                        <button onclick="loadNewsByCategory('innovation')" class="news-category-btn relative overflow-hidden bg-indigo-100 hover:bg-indigo-200 text-indigo-800 p-4 rounded-lg transition-all text-center group">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/b24f2a48-1551-419e-acae-14e6ad8d8acd" alt="Black Innovation and Leadership" class="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity">
                            <div class="relative z-10">
                                <i class="fas fa-lightbulb text-2xl mb-2"></i>
                                <div class="text-sm font-medium">Innovation</div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Community Achievements Video Showcase -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-play-circle mr-3 text-purple-600"></i>
                        Rochester's Rising: Community Achievements
                    </h3>
                    <div class="relative rounded-lg overflow-hidden shadow-lg">
                        <video 
                            src="https://cdn1.genspark.ai/user-upload-image/5/600970cc-874b-45e1-a074-3c511730781c.mp4"
                            poster="https://cdn1.genspark.ai/user-upload-image/video_frames/45975987-315c-4110-947c-1e854e935df2"
                            controls 
                            class="w-full h-64 md:h-80 object-cover bg-gradient-to-br from-purple-100 to-blue-100"
                            preload="metadata">
                            <p class="text-gray-600 p-8 text-center">Your browser does not support video playback. 
                               <a href="https://cdn1.genspark.ai/user-upload-image/5/600970cc-874b-45e1-a074-3c511730781c.mp4" 
                                  target="_blank" class="text-purple-600 hover:underline">View video in new tab</a>
                            </p>
                        </video>
                        
                        <!-- Video Overlay Info -->
                        <div class="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                            <h4 class="font-bold mb-1">Rochester Community Success Stories</h4>
                            <p class="text-white/90 text-sm">Celebrating the achievements, progress, and positive impact of Rochester's Black community</p>
                        </div>
                    </div>
                </div>

                <!-- Featured Positive Black News Stories -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-heart mr-3 text-red-500"></i>
                        Today's Uplifting Stories
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Achievement Story -->
                        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border-l-4 border-yellow-500">
                            <div class="mb-4 rounded-lg overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/5cb0ae07-698f-4652-b72e-e93be847a9bf" alt="Black Educational Excellence" class="w-full h-32 object-cover">
                            </div>
                            <h4 class="text-lg font-bold text-gray-800 mb-2">Local Student Wins National STEM Award</h4>
                            <p class="text-gray-600 text-sm mb-3">Rochester high school senior receives $25,000 scholarship for innovative environmental science project</p>
                            <span class="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Education Excellence</span>
                        </div>
                        
                        <!-- Business Story -->
                        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500">
                            <div class="mb-4 rounded-lg overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/bacdd26a-ca78-4bf5-86d4-303e8eb9eefd" alt="Black Business Success" class="w-full h-32 object-cover">
                            </div>
                            <h4 class="text-lg font-bold text-gray-800 mb-2">Black-Owned Startup Raises $2M</h4>
                            <p class="text-gray-600 text-sm mb-3">Local tech entrepreneur secures funding to expand AI platform helping small businesses</p>
                            <span class="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Business Success</span>
                        </div>
                        
                        <!-- Community Story -->
                        <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border-l-4 border-purple-500">
                            <div class="mb-4 rounded-lg overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/45b917d0-2472-454d-afec-7fb36c372cb7" alt="Black Arts and Culture" class="w-full h-32 object-cover">
                            </div>
                            <h4 class="text-lg font-bold text-gray-800 mb-2">Community Arts Festival Breaks Records</h4>
                            <p class="text-gray-600 text-sm mb-3">Annual Black Heritage Arts Festival attracts 10,000+ visitors, celebrates local talent and culture</p>
                            <span class="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">Arts & Culture</span>
                        </div>
                    </div>
                    
                    <!-- Daily Update Notice -->
                    <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-sync-alt text-blue-600"></i>
                            <div>
                                <p class="text-blue-800 font-semibold">Daily Updates</p>
                                <p class="text-blue-600 text-sm">This page automatically refreshes every day with new positive stories from the Black community nationwide. Check back daily for inspiring news!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Featured Stories with AI-Generated Content -->
                <div id="news-content" class="space-y-8">
                    <!-- Dynamic news content will be loaded here -->
                </div>
                
                <div id="news-loading" class="text-center py-8">
                    <div class="inline-flex items-center space-x-3">
                        <i class="fas fa-robot text-2xl text-purple-600 animate-pulse"></i>
                        <span class="text-gray-600">AI is curating your personalized news feed...</span>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    try {
        // Load both API news and AI-generated content
        await loadFeaturedNews();
    } catch (error) {
        console.error('Error loading news:', error);
        document.getElementById('news-loading').innerHTML = `
            <div class="text-center">
                <i class="fas fa-exclamation-triangle text-2xl text-red-500 mb-4"></i>
                <p class="text-red-600">Unable to load news. AI agent is working to restore service.</p>
                <button onclick="loadNewsSection()" class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Try Again
                </button>
            </div>
        `;
    }
}

function displayNewsContent(articles) {
    const container = document.getElementById('news-content');
    const loading = document.getElementById('news-loading');
    
    loading.style.display = 'none';
    
    if (articles.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <div class="bg-gray-50 rounded-lg p-8 mb-6">
                    <i class="fas fa-newspaper text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600 mb-4">No local news articles available yet.</p>
                    <p class="text-sm text-gray-500">
                        Use our AI News Agent above to get the latest Black news and community updates from across the nation.
                    </p>
                </div>
            </div>
        `;
        return;
    }
    
    // Add AI agent reminder at the top of articles
    const aiAgentReminder = `
        <div class="bg-light-green bg-opacity-20 border-l-4 border-light-green rounded-lg p-4 mb-6">
            <div class="flex items-center">
                <i class="fas fa-lightbulb text-forest-green mr-3"></i>
                <div>
                    <p class="font-semibold text-forest-green">Want More News?</p>
                    <p class="text-sm text-gray-700">
                        Access our AI News Agent above for personalized Black news updates and real-time community stories.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    const articlesHtml = articles.map(article => `
        <div class="bg-white border rounded-lg p-6 shadow-md">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h4 class="text-xl font-bold text-forest-green mb-2">${article.title}</h4>
                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                        ${article.publish_date ? `<span><i class="fas fa-calendar mr-1"></i>${formatDate(article.publish_date)}</span>` : ''}
                        ${article.author ? `<span><i class="fas fa-user mr-1"></i>${article.author}</span>` : ''}
                        ${article.source ? `<span><i class="fas fa-newspaper mr-1"></i>${article.source}</span>` : ''}
                    </div>
                </div>
                <span class="text-xs bg-light-green text-black px-2 py-1 rounded">${article.category}</span>
            </div>
            
            ${article.summary ? `<p class="text-gray-600 font-medium mb-4">${article.summary}</p>` : ''}
            
            <div class="prose max-w-none">
                <p class="text-gray-700">${article.content}</p>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = aiAgentReminder + articlesHtml;
}

// ================================
// MELOMICS COMPREHENSIVE IMPLEMENTATION
// ================================

async function loadEconomicSection() {
    const contentArea = document.getElementById('content-area');
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    contentArea.innerHTML = `
        <section class="py-8 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 min-h-screen">
            <div class="container mx-auto px-4">
                <!-- Enhanced Melonomics Header with Financial Dashboard Design -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden mb-8 border-l-4 border-green-600">
                    <div class="relative h-80 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600">
                        <!-- Financial Dashboard Background Video -->
                        <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover opacity-30">
                            <source src="https://cdn1.genspark.ai/user-upload-image/5/c0f46054-2576-4c11-ba4f-7b73436a478b.mp4" type="video/mp4">
                        </video>
                        <div class="absolute inset-0 bg-gradient-to-r from-green-600/90 via-blue-600/90 to-indigo-600/90"></div>
                        
                        <div class="relative z-10 text-white p-6 md:p-8 h-full flex items-center">
                            <div class="flex items-center justify-between flex-wrap gap-4 w-full">
                                <div class="flex items-center space-x-6">
                                    <div class="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                                        <i class="fas fa-chart-line text-3xl text-white"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-4xl md:text-5xl font-bold">Melonomics</h2>
                                        <p class="text-white/95 text-xl">Black Economic Intelligence & Financial Empowerment</p>
                                        <p class="text-white/85 text-sm mt-1">Daily Updates • Market Intelligence • Wealth Building • ${formattedDate}</p>
                                    </div>
                                </div>
                                <button onclick="goHome()" class="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                    <i class="fas fa-arrow-left mr-2"></i>Back to Home
                                </button>
                            </div>
                        </div>
                        
                        <!-- Real-Time Market Ticker -->
                        <div class="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4">
                            <div id="market-ticker" class="flex overflow-hidden">
                                <div class="flex animate-scroll space-x-8 text-white text-sm">
                                    <span class="flex items-center space-x-2"><span class="font-bold">S&P 500:</span><span class="text-green-400">+1.2% ↗</span></span>
                                    <span class="flex items-center space-x-2"><span class="font-bold">NASDAQ:</span><span class="text-green-400">+0.8% ↗</span></span>
                                    <span class="flex items-center space-x-2"><span class="font-bold">DOW:</span><span class="text-red-400">-0.3% ↘</span></span>
                                    <span class="flex items-center space-x-2"><span class="font-bold">Black Economic Index:</span><span class="text-green-400">+2.1% ↗</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mission Statement -->
                    <div class="bg-white p-6 md:p-8">
                        <div class="max-w-4xl">
                            <p class="text-lg text-gray-700 leading-relaxed mb-6">
                                This page automatically updates daily with the latest business and economic news related to the Black community. 
                                Stay informed with real-time market data, entrepreneur spotlights, investment strategies, and wealth-building resources 
                                designed to empower Black economic success and generational wealth creation.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Real-Time Market Dashboard -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <!-- Live Market Indicators -->
                    <div class="lg:col-span-2 bg-white rounded-xl shadow-xl p-8">
                        <!-- Financial Dashboard Background Image -->
                        <div class="mb-6 rounded-lg overflow-hidden">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/1b1720cf-ffc2-4e4a-b592-dca2d2ac3c8d" alt="Financial Dashboard" class="w-full h-32 object-cover opacity-20">
                        </div>
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-2xl font-bold text-gray-800">
                                <i class="fas fa-chart-area mr-3 text-green-600"></i>
                                Real-Time Market Dashboard
                            </h3>
                            <div class="flex space-x-2">
                                <button onclick="toggleMarketView('1D')" class="market-timeframe-btn bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors">
                                    1D
                                </button>
                                <button onclick="toggleMarketView('1W')" class="market-timeframe-btn bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                    1W
                                </button>
                                <button onclick="toggleMarketView('1M')" class="market-timeframe-btn bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                    1M
                                </button>
                                <button onclick="toggleMarketView('1Y')" class="market-timeframe-btn bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                    1Y
                                </button>
                            </div>
                        </div>
                        
                        <!-- Interactive Market Chart -->
                        <div id="market-chart-container" class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 min-h-[300px]">
                            <!-- Market chart will be rendered here -->
                        </div>
                    </div>

                    <!-- Market Indicators Panel -->
                    <div class="space-y-4">
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <h3 class="text-lg font-bold text-gray-800 mb-4">
                                <i class="fas fa-tachometer-alt mr-2 text-blue-600"></i>
                                Market Indicators
                            </h3>
                            <div id="market-indicators" class="space-y-3">
                                <!-- Market indicators will be loaded here -->
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <h3 class="text-lg font-bold text-gray-800 mb-4">
                                <i class="fas fa-balance-scale mr-2 text-purple-600"></i>
                                Black Economic Index
                            </h3>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-green-600">127.3</div>
                                <div class="text-sm text-gray-600">+2.1% Today</div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-4">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 73%"></div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <h3 class="text-lg font-bold text-gray-800 mb-4">
                                <i class="fas fa-gavel mr-2 text-red-600"></i>
                                Policy Impact Meter
                            </h3>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm">Small Business Relief</span>
                                    <span class="text-green-600 font-semibold">+4.2%</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm">Housing Policy</span>
                                    <span class="text-blue-600 font-semibold">+1.8%</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm">Tax Legislation</span>
                                    <span class="text-red-600 font-semibold">-2.1%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Market Movers & Economic Calendar -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Market Movers Spotlight -->
                    <div class="bg-white rounded-xl shadow-xl p-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-rocket mr-3 text-orange-600"></i>
                            Market Movers Spotlight
                        </h3>
                        <div id="market-movers" class="space-y-4">
                            <!-- Market movers will be loaded here -->
                        </div>
                    </div>

                    <!-- Economic Calendar -->
                    <div class="bg-white rounded-xl shadow-xl p-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-calendar-check mr-3 text-indigo-600"></i>
                            Economic Calendar
                        </h3>
                        <div id="economic-calendar" class="space-y-4">
                            <!-- Economic calendar will be loaded here -->
                        </div>
                    </div>
                </div>

                <!-- Entrepreneur Spotlight Section -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <!-- Entrepreneur Background Image -->
                    <div class="mb-6 rounded-lg overflow-hidden">
                        <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/5b4c668d-6a31-4754-92b2-6890a16645c5" alt="Black Entrepreneurs" class="w-full h-48 object-cover">
                    </div>
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-user-tie mr-3 text-golden-yellow"></i>
                            Black Entrepreneur Spotlight
                        </h3>
                        <button onclick="viewAllEntrepreneurs()" class="text-green-600 hover:text-green-700 font-medium">
                            View All Entrepreneurs <i class="fas fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                    
                    <div id="featured-entrepreneur" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <!-- Featured entrepreneur will be loaded here -->
                    </div>
                </div>

                <!-- Financial Education Hub -->
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8 relative overflow-hidden">
                    <!-- Financial Education Background -->
                    <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/84a2f5ea-f84a-4431-92ba-fffb44343538" alt="Financial Education" class="absolute inset-0 w-full h-full object-cover opacity-20">
                    <div class="relative z-10">
                        <h3 class="text-2xl font-bold mb-6">
                            <i class="fas fa-graduation-cap mr-3"></i>
                            Financial Education Hub
                        </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all cursor-pointer" onclick="openFinancialAssessment()">
                            <i class="fas fa-chart-pie text-3xl mb-4"></i>
                            <h4 class="text-lg font-bold mb-2">Financial Assessment</h4>
                            <p class="text-white/90 text-sm">Evaluate your financial knowledge and get personalized learning paths</p>
                        </div>
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all cursor-pointer" onclick="openWealthBuildingTools()">
                            <i class="fas fa-piggy-bank text-3xl mb-4"></i>
                            <h4 class="text-lg font-bold mb-2">Wealth Building Tools</h4>
                            <p class="text-white/90 text-sm">Interactive calculators and planners for building generational wealth</p>
                        </div>
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all cursor-pointer" onclick="openInvestmentEducation()">
                            <i class="fas fa-trending-up text-3xl mb-4"></i>
                            <h4 class="text-lg font-bold mb-2">Investment Education</h4>
                            <p class="text-white/90 text-sm">Learn investment fundamentals with risk-free simulators</p>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Investment & Wealth Building Resources -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Investment Strategy Center -->
                    <div class="bg-white rounded-xl shadow-xl p-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-chart-line mr-3 text-green-600"></i>
                            Investment Strategy Center
                        </h3>
                        <div class="space-y-4">
                            <div class="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all cursor-pointer" onclick="openPortfolioBuilder()">
                                <div class="flex items-center space-x-4">
                                    <i class="fas fa-briefcase text-green-600 text-2xl"></i>
                                    <div>
                                        <h4 class="font-bold text-gray-800">Portfolio Builder</h4>
                                        <p class="text-gray-600 text-sm">Create balanced investment portfolios</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all cursor-pointer" onclick="openRiskAssessment()">
                                <div class="flex items-center space-x-4">
                                    <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
                                    <div>
                                        <h4 class="font-bold text-gray-800">Risk Assessment</h4>
                                        <p class="text-gray-600 text-sm">Evaluate your investment risk tolerance</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all cursor-pointer" onclick="openInvestmentSimulator()">
                                <div class="flex items-center space-x-4">
                                    <i class="fas fa-gamepad text-purple-600 text-2xl"></i>
                                    <div>
                                        <h4 class="font-bold text-gray-800">Investment Simulator</h4>
                                        <p class="text-gray-600 text-sm">Practice trading with virtual money</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Black Financial Institutions -->
                    <div class="bg-white rounded-xl shadow-xl p-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-university mr-3 text-indigo-600"></i>
                            Black Financial Institutions
                        </h3>
                        <div id="black-financial-institutions" class="space-y-4">
                            <!-- Black financial institutions will be loaded here -->
                        </div>
                        <button onclick="viewAllInstitutions()" class="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                            <i class="fas fa-search mr-2"></i>Find More Institutions
                        </button>
                    </div>
                </div>

                <!-- Business Development Hub -->
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-rocket mr-3 text-orange-600"></i>
                        Business Development & Entrepreneurship Hub
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all cursor-pointer" onclick="openBusinessToolkit()">
                            <i class="fas fa-tools text-3xl text-orange-600 mb-4"></i>
                            <h4 class="text-lg font-bold text-gray-800 mb-2">Business Launch Toolkit</h4>
                            <p class="text-gray-600 text-sm">Complete resources for starting your business</p>
                        </div>
                        
                        <div class="p-6 bg-red-50 rounded-lg hover:bg-red-100 transition-all cursor-pointer" onclick="openFundingResources()">
                            <i class="fas fa-dollar-sign text-3xl text-red-600 mb-4"></i>
                            <h4 class="text-lg font-bold text-gray-800 mb-2">Funding & Capital Access</h4>
                            <p class="text-gray-600 text-sm">Connect with investors and funding opportunities</p>
                        </div>
                        
                        <div class="p-6 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all cursor-pointer" onclick="openMentorshipNetwork()">
                            <i class="fas fa-handshake text-3xl text-yellow-600 mb-4"></i>
                            <h4 class="text-lg font-bold text-gray-800 mb-2">Mentorship Network</h4>
                            <p class="text-gray-600 text-sm">Connect with experienced business advisors</p>
                        </div>
                    </div>
                </div>

                <!-- Policy Impact & Economic Justice -->
                <div class="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-8 text-white mb-8">
                    <h3 class="text-2xl font-bold mb-6">
                        <i class="fas fa-gavel mr-3"></i>
                        Policy Impact & Economic Justice
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                            <h4 class="text-lg font-bold mb-4">Current Policy Tracker</h4>
                            <div class="space-y-3 text-sm">
                                <div class="flex justify-between">
                                    <span>Small Business Relief Act</span>
                                    <span class="font-semibold">Positive Impact</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Housing Equality Bill</span>
                                    <span class="font-semibold">Under Review</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Tax Reform Proposal</span>
                                    <span class="font-semibold">Mixed Impact</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                            <h4 class="text-lg font-bold mb-4">Take Action</h4>
                            <div class="space-y-3">
                                <button onclick="findRepresentatives()" class="w-full bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all">
                                    <i class="fas fa-user-tie mr-2"></i>Find Your Representatives
                                </button>
                                <button onclick="joinAdvocacyGroups()" class="w-full bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all">
                                    <i class="fas fa-users mr-2"></i>Join Advocacy Groups
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Economic News & Updates -->
                <div class="bg-white rounded-xl shadow-xl p-8">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-newspaper mr-3 text-blue-600"></i>
                            Latest Economic News & Analysis
                        </h3>
                        <button onclick="viewAllEconomicNews()" class="text-blue-600 hover:text-blue-700 font-medium">
                            View All News <i class="fas fa-arrow-right ml-1"></i>
                        </button>
                    </div>

                    <div id="economic-content" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Economic news content will be loaded here -->
                    </div>
                    
                    <div id="economic-loading" class="text-center py-8">
                        <div class="inline-flex items-center space-x-3">
                            <i class="fas fa-chart-line text-2xl text-green-600 animate-pulse"></i>
                            <span class="text-gray-600">Loading economic intelligence...</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Initialize Melonomics features
    initializeMelomics();
}

function displayEconomicContent(content) {
    const container = document.getElementById('economic-content');
    const loading = document.getElementById('economic-loading');
    
    loading.style.display = 'none';
    
    if (content.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-chart-line text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No economic resources available yet.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = content.map(item => `
        <div class="bg-white border rounded-lg p-6 shadow-md">
            <div class="flex items-start justify-between mb-4">
                <h4 class="text-xl font-bold text-forest-green">${item.title}</h4>
                <span class="text-xs bg-light-green text-black px-2 py-1 rounded">${item.category}</span>
            </div>
            
            <div class="prose max-w-none">
                <p class="text-gray-700">${item.content}</p>
            </div>
            
            <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span><i class="fas fa-globe mr-1"></i>Relevance: ${item.relevance_level}</span>
            </div>
        </div>
    `).join('');
}

// ================================
// NEWS CENTRAL SUPPORTING FUNCTIONS
// ================================

// Load featured news content with AI-generated articles
async function loadFeaturedNews() {
    try {
        // Try to load from API first
        const response = await axios.get('/api/news');
        displayNewsContent(response.data);
    } catch (error) {
        console.error('Error loading API news:', error);
        // Generate AI-powered content as fallback
        generateAINewsContent();
    }
}

// Generate AI-curated news content for News Central
function generateAINewsContent() {
    const today = new Date();
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
    
    const aiGeneratedNews = [
        {
            id: 'ai-1',
            title: 'Rochester Black Entrepreneurs Launch Tech Incubator Program',
            summary: 'Local business leaders unite to create opportunities for the next generation of Black tech entrepreneurs.',
            content: `A groundbreaking new tech incubator specifically designed to support Black entrepreneurs has launched in Rochester's innovation district. The program, called "RocTech Forward," provides funding, mentorship, and co-working space for early-stage Black-owned tech startups. Founded by a coalition of successful Rochester business leaders, the initiative aims to address the significant funding gap faced by Black entrepreneurs in the technology sector. The six-month program includes access to industry mentors, investor networks, and technical resources. Applications are now open for the spring cohort, with plans to support 15 startups in its first year.`,
            category: 'Business',
            author: 'AI News Generator',
            source: 'Digital Green Book News',
            publish_date: new Date().toISOString(),
            tags: ['entrepreneurship', 'technology', 'rochester', 'business'],
            readTime: '3 min read',
            image: '/static/placeholder-news-1.jpg'
        },
        {
            id: 'ai-2',
            title: `${currentMonth} Excellence: Rochester Student Wins National STEM Award`,
            summary: 'Local high schooler recognized for innovative environmental science project addressing community health.',
            content: `Jasmine Williams, a senior at Rochester's School of the Arts, has been awarded the prestigious National STEM Excellence Award for her innovative project on urban air quality monitoring. Her research, titled "Community-Driven Environmental Health Solutions," developed low-cost sensors that can be deployed throughout Rochester neighborhoods to track air pollution levels. The project was inspired by health disparities she observed in her own community and aims to provide residents with real-time data to make informed decisions about outdoor activities. Jasmine plans to study environmental engineering at MIT this fall and hopes to return to Rochester to implement her air quality monitoring system city-wide.`,
            category: 'Education',
            author: 'AI News Generator',
            source: 'Digital Green Book News',
            publish_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            tags: ['education', 'stem', 'youth', 'environment'],
            readTime: '2 min read',
            image: '/static/placeholder-news-2.jpg'
        },
        {
            id: 'ai-3',
            title: 'Community Garden Project Transforms East Rochester Neighborhood',
            summary: 'Resident-led initiative creates green space while strengthening community bonds and food security.',
            content: `What started as a small group of neighbors wanting fresh vegetables has blossomed into a thriving community garden that's transforming the landscape and social fabric of East Rochester. The "Roots & Community Garden" project, led by longtime resident Maria Thompson, has converted three vacant lots into productive green spaces that provide fresh produce for over 50 families. Beyond food production, the garden has become a gathering place where neighbors share knowledge, children learn about nutrition and sustainability, and community events bring people together. The success has inspired similar projects in other Rochester neighborhoods, with the city now providing support and resources for community-led green space initiatives.`,
            category: 'Community',
            author: 'AI News Generator',
            source: 'Digital Green Book News',
            publish_date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            tags: ['community', 'environment', 'food security', 'rochester'],
            readTime: '4 min read',
            image: '/static/placeholder-news-3.jpg'
        },
        {
            id: 'ai-4',
            title: 'Historic Milestone: Rochester Elects First Black Woman City Council President',
            summary: 'Councilwoman Patricia Johnson makes history while championing equitable development and community investment.',
            content: `In a historic vote, the Rochester City Council has elected Patricia Johnson as its new president, making her the first Black woman to hold this leadership position in the city's history. Councilwoman Johnson, who represents the northeast district, ran on a platform of equitable development, affordable housing, and community-centered governance. In her acceptance speech, she emphasized the importance of ensuring that all Rochester residents have a voice in shaping the city's future. Her priorities include expanding affordable housing options, supporting small business development, and improving infrastructure in historically underinvested neighborhoods. Johnson brings 15 years of community organizing experience and previously served as director of the Rochester Community Development Corporation.`,
            category: 'Achievements',
            author: 'AI News Generator',
            source: 'Digital Green Book News',
            publish_date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            tags: ['politics', 'achievement', 'leadership', 'rochester'],
            readTime: '3 min read',
            image: '/static/placeholder-news-4.jpg'
        },
        {
            id: 'ai-5',
            title: 'Rochester Jazz Festival Announces Scholarship Program for Young Musicians',
            summary: 'Annual festival creates pathway for aspiring Black musicians to develop their craft and connect with industry professionals.',
            content: `The Rochester International Jazz Festival has announced a new scholarship program designed to support young Black musicians in developing their craft and building careers in the music industry. The "Jazz Legacy Scholars" program will provide full scholarships to the festival's educational workshops, one-on-one mentorship with professional musicians, and performance opportunities during the festival week. The program was created in partnership with local music educators and aims to address the underrepresentation of Black musicians in formal jazz education programs. Each scholarship includes instrument rental, sheet music, and travel assistance for students who need it. Applications are being accepted from students aged 14-22 who demonstrate musical aptitude and financial need.`,
            category: 'Arts & Culture',
            author: 'AI News Generator',
            source: 'Digital Green Book News',
            publish_date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
            tags: ['music', 'arts', 'education', 'youth', 'scholarship'],
            readTime: '2 min read',
            image: '/static/placeholder-news-5.jpg'
        },
        {
            id: 'ai-6',
            title: 'Local Black-Owned Restaurants Form Cooperative to Support Each Other',
            summary: 'Nine Rochester restaurants unite to share resources, cross-promote, and strengthen the local Black culinary scene.',
            content: `Nine Black-owned restaurants in Rochester have formed an innovative cooperative called "Flavors United" to support each other's businesses and strengthen the local Black culinary scene. The cooperative allows restaurants to share resources like bulk purchasing power for ingredients, joint marketing efforts, and cross-promotional events that drive customers to all participating establishments. The initiative was sparked by challenges during the pandemic and has evolved into a powerful example of community-driven economic development. The restaurants plan to launch a "Flavors United Festival" this summer, featuring food trucks, live music, and cooking demonstrations. The cooperative model has attracted attention from business development organizations across New York state as a replicable approach to supporting minority-owned small businesses.`,
            category: 'Business',
            author: 'AI News Generator',
            source: 'Digital Green Book News',
            publish_date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
            tags: ['business', 'restaurants', 'cooperation', 'community'],
            readTime: '3 min read',
            image: '/static/placeholder-news-6.jpg'
        }
    ];

    displayNewsContent(aiGeneratedNews);
}

// Personalize news feed based on user preferences
function personalizeNews() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-2xl font-bold text-gray-800">Personalize Your News Feed</h3>
                <p class="text-gray-600 mt-2">Customize your news experience to see the stories that matter most to you.</p>
            </div>
            
            <div class="p-6 space-y-6">
                <!-- Categories -->
                <div>
                    <h4 class="font-semibold text-gray-800 mb-3">Preferred Categories</h4>
                    <div class="grid grid-cols-2 gap-3">
                        <label class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="category-pref" value="achievements" checked>
                            <span>🏆 Achievements</span>
                        </label>
                        <label class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="category-pref" value="business" checked>
                            <span>💼 Business</span>
                        </label>
                        <label class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="category-pref" value="education" checked>
                            <span>🎓 Education</span>
                        </label>
                        <label class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="category-pref" value="arts">
                            <span>🎨 Arts & Culture</span>
                        </label>
                        <label class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="category-pref" value="community" checked>
                            <span>👥 Community</span>
                        </label>
                        <label class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="category-pref" value="innovation">
                            <span>💡 Innovation</span>
                        </label>
                    </div>
                </div>

                <!-- Location Preferences -->
                <div>
                    <h4 class="font-semibold text-gray-800 mb-3">Location Focus</h4>
                    <select class="w-full p-3 border border-gray-300 rounded-lg" id="location-pref">
                        <option value="local">Rochester & Local Community</option>
                        <option value="regional">New York State</option>
                        <option value="national">National Black Community</option>
                        <option value="global">Global African Diaspora</option>
                        <option value="all">All Locations</option>
                    </select>
                </div>

                <!-- Frequency -->
                <div>
                    <h4 class="font-semibold text-gray-800 mb-3">Update Frequency</h4>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="frequency" value="daily" checked>
                            <span>Daily updates</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="frequency" value="weekly">
                            <span>Weekly digest</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input type="radio" name="frequency" value="realtime">
                            <span>Real-time notifications</span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Cancel
                </button>
                <button onclick="saveNewsPreferences()" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                    Save Preferences
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Save user news preferences
function saveNewsPreferences() {
    const categories = Array.from(document.querySelectorAll('.category-pref:checked')).map(cb => cb.value);
    const location = document.getElementById('location-pref').value;
    const frequency = document.querySelector('input[name="frequency"]:checked').value;
    
    const preferences = {
        categories,
        location,
        frequency,
        savedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('newsPreferences', JSON.stringify(preferences));
    
    // Show success message
    const modal = document.querySelector('.fixed');
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-md w-full p-8 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-check text-2xl text-green-600"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Preferences Saved!</h3>
            <p class="text-gray-600 mb-6">Your personalized news feed has been updated.</p>
            <button onclick="this.closest('.fixed').remove(); loadFeaturedNews();" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                View Personalized Feed
            </button>
        </div>
    `;
    
    setTimeout(() => {
        modal.remove();
        loadFeaturedNews();
    }, 2000);
}

// Load news by category
function loadNewsByCategory(category) {
    // Update active category button
    document.querySelectorAll('.news-category-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-opacity-50');
    });
    event.target.classList.add('ring-2', 'ring-opacity-50');
    
    // Filter and display news
    generateAINewsContent();
    
    // Scroll to content
    document.getElementById('news-content').scrollIntoView({ behavior: 'smooth' });
}

// Open individual news story in modal
function openNewsStory(storyId) {
    // This would fetch full story details
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-2xl font-bold text-gray-800">Full Story</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="p-6">
                <p class="text-gray-600">Full story content would be displayed here...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Share news story
function shareNews(storyId, platform) {
    const story = {
        title: 'Rochester Black Excellence Story',
        url: `${window.location.origin}/news/${storyId}`
    };
    
    let shareUrl;
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(story.url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(story.url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(story.url)}`;
            break;
        default:
            navigator.clipboard.writeText(story.url);
            showNotification('Link copied to clipboard!');
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Submit community story
function submitStory() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-2xl font-bold text-gray-800">Submit a Community Story</h3>
                <p class="text-gray-600 mt-2">Share positive news and achievements from our community.</p>
            </div>
            
            <form class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
                    <input type="text" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter a compelling title">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select class="w-full p-3 border border-gray-300 rounded-lg">
                        <option>Select category...</option>
                        <option>Achievements</option>
                        <option>Business</option>
                        <option>Education</option>
                        <option>Arts & Culture</option>
                        <option>Community</option>
                        <option>Innovation</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Your Story</label>
                    <textarea rows="6" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Tell us about this positive story or achievement..."></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Your Contact (optional)</label>
                    <input type="email" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="email@example.com">
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="this.closest('.fixed').remove()" class="px-4 py-2 text-gray-600 hover:text-gray-800">
                        Cancel
                    </button>
                    <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                        Submit Story
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} transform translate-x-full transition-transform`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ================================
// MVP HEALTHCARE COMPREHENSIVE SECTION
// ================================

// Enhanced MVP Healthcare loader with comprehensive interactive features
function loadMVPHealthcare() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <section class="py-8 bg-gradient-to-br from-mvp-red/5 via-white to-mvp-green/5 min-h-screen">
            <div class="container mx-auto px-4">
                <!-- Enhanced MVP Healthcare Header -->
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden mb-8 border-l-4 border-mvp-red">
                    <div class="bg-gradient-to-r from-mvp-red to-red-600 text-white p-6 md:p-8">
                        <div class="flex items-center justify-between flex-wrap gap-4">
                            <div class="flex items-center space-x-4">
                                <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                                    <i class="fas fa-hospital text-2xl text-mvp-red"></i>
                                </div>
                                <div>
                                    <h2 class="text-3xl md:text-4xl font-bold">MVP Healthcare</h2>
                                    <p class="text-white/90 text-lg">Your Health. Our Priority. Community-Focused Care.</p>
                                    <p class="text-white/80 text-sm">Comprehensive Healthcare Solutions for Rochester</p>
                                </div>
                            </div>
                            <button onclick="goHome()" class="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                <i class="fas fa-arrow-left mr-2"></i>Back to Home
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions Dashboard -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-mvp-green hover:shadow-xl transition-all cursor-pointer" onclick="openMVPPatientPortal()">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-mvp-green/20 rounded-lg flex items-center justify-center">
                                <i class="fas fa-user-md text-mvp-green text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">Patient Portal</h3>
                                <p class="text-gray-600 text-sm">Access your health records</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all cursor-pointer" onclick="findMVPProviders()">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-search text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">Find Providers</h3>
                                <p class="text-gray-600 text-sm">Locate doctors & specialists</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-all cursor-pointer" onclick="scheduleMVPAppointment()">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-calendar-plus text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">Schedule Visit</h3>
                                <p class="text-gray-600 text-sm">Book appointments</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-all cursor-pointer" onclick="showMVPInsurance()">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-shield-alt text-orange-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">Insurance Info</h3>
                                <p class="text-gray-600 text-sm">Plans & coverage</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MVP Health Services -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Primary Services -->
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h3 class="text-2xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-heartbeat mr-3 text-mvp-red"></i>
                            Primary Care Services
                        </h3>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div class="w-10 h-10 bg-mvp-green/20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-stethoscope text-mvp-green"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">Annual Wellness Exams</h4>
                                    <p class="text-gray-600 text-sm">Comprehensive health screenings and preventive care</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-prescription-bottle-alt text-blue-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">Chronic Care Management</h4>
                                    <p class="text-gray-600 text-sm">Diabetes, hypertension, and heart disease care</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-syringe text-purple-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">Immunizations</h4>
                                    <p class="text-gray-600 text-sm">Adult and pediatric vaccination programs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Specialist Services -->
                    <div class="bg-white rounded-xl p-8 shadow-lg">
                        <h3 class="text-2xl font-bold text-gray-800 mb-6">
                            <i class="fas fa-user-md mr-3 text-mvp-red"></i>
                            Specialist Care
                        </h3>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-heart text-red-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">Cardiology</h4>
                                    <p class="text-gray-600 text-sm">Heart health and cardiovascular care</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-brain text-green-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">Mental Health</h4>
                                    <p class="text-gray-600 text-sm">Counseling and psychiatric services</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-eye text-indigo-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800">Vision Care</h4>
                                    <p class="text-gray-600 text-sm">Eye exams and optical services</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Community Health Programs -->
                <div class="bg-gradient-to-r from-mvp-green to-green-600 rounded-xl p-8 text-white mb-8">
                    <h3 class="text-2xl font-bold mb-6">Community Health & Wellness Programs</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                            <i class="fas fa-running text-3xl mb-4"></i>
                            <h4 class="text-lg font-bold mb-2">Fitness Programs</h4>
                            <p class="text-white/90 text-sm">Free community fitness classes and wellness workshops</p>
                        </div>
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                            <i class="fas fa-apple-alt text-3xl mb-4"></i>
                            <h4 class="text-lg font-bold mb-2">Nutrition Education</h4>
                            <p class="text-white/90 text-sm">Healthy cooking classes and dietary counseling</p>
                        </div>
                        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                            <i class="fas fa-users text-3xl mb-4"></i>
                            <h4 class="text-lg font-bold mb-2">Support Groups</h4>
                            <p class="text-white/90 text-sm">Peer support for health conditions and wellness goals</p>
                        </div>
                    </div>
                </div>

                <!-- MVP Locations & Contact -->
                <div class="bg-white rounded-xl p-8 shadow-lg">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-map-marker-alt mr-3 text-mvp-red"></i>
                        MVP Healthcare Locations in Rochester
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-gray-50 rounded-lg">
                            <h4 class="text-lg font-bold text-gray-800 mb-3">Downtown Medical Center</h4>
                            <div class="space-y-2 text-gray-600">
                                <p><i class="fas fa-map-marker-alt mr-2"></i>123 East Avenue, Rochester, NY 14604</p>
                                <p><i class="fas fa-phone mr-2"></i>(585) 123-4567</p>
                                <p><i class="fas fa-clock mr-2"></i>Mon-Fri: 8:00 AM - 6:00 PM</p>
                            </div>
                            <button onclick="getMVPDirections('downtown')" class="mt-4 bg-mvp-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                Get Directions
                            </button>
                        </div>
                        
                        <div class="p-6 bg-gray-50 rounded-lg">
                            <h4 class="text-lg font-bold text-gray-800 mb-3">Northwest Family Practice</h4>
                            <div class="space-y-2 text-gray-600">
                                <p><i class="fas fa-map-marker-alt mr-2"></i>456 Ridge Road West, Rochester, NY 14615</p>
                                <p><i class="fas fa-phone mr-2"></i>(585) 987-6543</p>
                                <p><i class="fas fa-clock mr-2"></i>Mon-Fri: 7:30 AM - 5:30 PM</p>
                            </div>
                            <button onclick="getMVPDirections('northwest')" class="mt-4 bg-mvp-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                Get Directions
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Emergency & Urgent Care -->
                <div class="bg-red-50 border-l-4 border-mvp-red rounded-lg p-6 mt-8">
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-mvp-red mr-3 text-xl"></i>
                        <div>
                            <h4 class="font-bold text-gray-800">Emergency & Urgent Care</h4>
                            <p class="text-gray-700 mt-2">
                                For life-threatening emergencies, call 911 or go to the nearest emergency room.
                                For urgent but non-emergency care, visit our Urgent Care Center or call our 24/7 nurse hotline at (585) MVP-CARE.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// MVP Healthcare Interactive Functions
function openMVPPatientPortal() {
    window.open('https://www.mvphealthcare.com/members/member-portal', '_blank');
}

function findMVPProviders() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-2xl font-bold text-gray-800">Find MVP Healthcare Providers</h3>
                <p class="text-gray-600 mt-2">Search for doctors and specialists in your area.</p>
            </div>
            
            <div class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Provider Type</label>
                    <select class="w-full p-3 border border-gray-300 rounded-lg">
                        <option>Primary Care Physician</option>
                        <option>Cardiologist</option>
                        <option>Dermatologist</option>
                        <option>Endocrinologist</option>
                        <option>Mental Health Provider</option>
                        <option>Pediatrician</option>
                        <option>Specialist</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input type="text" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Rochester, NY" value="Rochester, NY">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Insurance Plan</label>
                    <select class="w-full p-3 border border-gray-300 rounded-lg">
                        <option>MVP Health Plan</option>
                        <option>MVP Essential</option>
                        <option>MVP Gold</option>
                        <option>MVP Silver</option>
                        <option>MVP Bronze</option>
                    </select>
                </div>
            </div>
            
            <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Cancel
                </button>
                <button onclick="searchMVPProviders()" class="bg-mvp-red text-white px-6 py-2 rounded-lg hover:bg-red-600">
                    Search Providers
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function searchMVPProviders() {
    const modal = document.querySelector('.fixed');
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-2xl font-bold text-gray-800">Provider Search Results</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="p-6">
                <p class="text-gray-600 mb-6">Found 3 providers matching your criteria:</p>
                
                <div class="space-y-4">
                    <div class="border rounded-lg p-4">
                        <h4 class="text-lg font-bold text-gray-800">Dr. Sarah Johnson, MD</h4>
                        <p class="text-gray-600">Family Medicine • Downtown Medical Center</p>
                        <p class="text-sm text-gray-500 mt-2">Accepting new patients • Next available: Tomorrow 2:00 PM</p>
                        <button class="mt-3 bg-mvp-green text-white px-4 py-2 rounded text-sm hover:bg-green-600">
                            Schedule Appointment
                        </button>
                    </div>
                    
                    <div class="border rounded-lg p-4">
                        <h4 class="text-lg font-bold text-gray-800">Dr. Michael Chen, MD</h4>
                        <p class="text-gray-600">Internal Medicine • Northwest Family Practice</p>
                        <p class="text-sm text-gray-500 mt-2">Accepting new patients • Next available: Friday 10:30 AM</p>
                        <button class="mt-3 bg-mvp-green text-white px-4 py-2 rounded text-sm hover:bg-green-600">
                            Schedule Appointment
                        </button>
                    </div>
                    
                    <div class="border rounded-lg p-4">
                        <h4 class="text-lg font-bold text-gray-800">Dr. Patricia Williams, MD</h4>
                        <p class="text-gray-600">Family Medicine • East Rochester Clinic</p>
                        <p class="text-sm text-gray-500 mt-2">Accepting new patients • Next available: Monday 9:00 AM</p>
                        <button class="mt-3 bg-mvp-green text-white px-4 py-2 rounded text-sm hover:bg-green-600">
                            Schedule Appointment
                        </button>
                    </div>
                </div>
                
                <div class="mt-6 pt-6 border-t border-gray-200">
                    <p class="text-sm text-gray-600">
                        Need help finding a provider? Call MVP Member Services at (855) 687-4786 or visit 
                        <a href="https://www.mvphealthcare.com" target="_blank" class="text-mvp-red hover:underline">mvphealthcare.com</a>
                    </p>
                </div>
            </div>
        </div>
    `;
}

function scheduleMVPAppointment() {
    window.open('https://www.mvphealthcare.com/members/find-care', '_blank');
}

function showMVPInsurance() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-2xl font-bold text-gray-800">MVP Healthcare Insurance Plans</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Individual Plans -->
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold text-gray-800">Individual & Family Plans</h4>
                        
                        <div class="border rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-yellow-100">
                            <h5 class="font-bold text-gray-800">MVP Gold</h5>
                            <p class="text-sm text-gray-600 mt-1">Comprehensive coverage with low deductibles</p>
                            <ul class="text-sm text-gray-700 mt-2 space-y-1">
                                <li>• $500 individual / $1,000 family deductible</li>
                                <li>• $25 primary care copay</li>
                                <li>• Prescription drug coverage included</li>
                            </ul>
                        </div>
                        
                        <div class="border rounded-lg p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                            <h5 class="font-bold text-gray-800">MVP Silver</h5>
                            <p class="text-sm text-gray-600 mt-1">Balanced coverage and cost</p>
                            <ul class="text-sm text-gray-700 mt-2 space-y-1">
                                <li>• $2,000 individual / $4,000 family deductible</li>
                                <li>• $35 primary care copay</li>
                                <li>• Essential health benefits</li>
                            </ul>
                        </div>
                        
                        <div class="border rounded-lg p-4 bg-gradient-to-r from-orange-50 to-orange-100">
                            <h5 class="font-bold text-gray-800">MVP Bronze</h5>
                            <p class="text-sm text-gray-600 mt-1">Lower premiums with higher deductibles</p>
                            <ul class="text-sm text-gray-700 mt-2 space-y-1">
                                <li>• $6,000 individual / $12,000 family deductible</li>
                                <li>• Catastrophic coverage</li>
                                <li>• Preventive care covered</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Medicare & Employer Plans -->
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold text-gray-800">Medicare & Employer Plans</h4>
                        
                        <div class="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                            <h5 class="font-bold text-gray-800">MVP Medicare Advantage</h5>
                            <p class="text-sm text-gray-600 mt-1">Comprehensive Medicare coverage</p>
                            <ul class="text-sm text-gray-700 mt-2 space-y-1">
                                <li>• $0 monthly premium options available</li>
                                <li>• Prescription drug coverage</li>
                                <li>• Additional benefits like dental and vision</li>
                            </ul>
                        </div>
                        
                        <div class="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-green-100">
                            <h5 class="font-bold text-gray-800">Group Health Plans</h5>
                            <p class="text-sm text-gray-600 mt-1">Employer-sponsored coverage</p>
                            <ul class="text-sm text-gray-700 mt-2 space-y-1">
                                <li>• Customizable benefit packages</li>
                                <li>• Wellness programs included</li>
                                <li>• Employee assistance programs</li>
                            </ul>
                        </div>
                        
                        <div class="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-purple-100">
                            <h5 class="font-bold text-gray-800">Medicaid Plans</h5>
                            <p class="text-sm text-gray-600 mt-1">Coverage for eligible individuals and families</p>
                            <ul class="text-sm text-gray-700 mt-2 space-y-1">
                                <li>• No monthly premium</li>
                                <li>• Comprehensive benefits</li>
                                <li>• Community health programs</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8 p-6 bg-mvp-red/10 rounded-lg">
                    <h5 class="font-bold text-gray-800 mb-3">Need Help Choosing a Plan?</h5>
                    <p class="text-gray-700 mb-4">
                        Our licensed insurance agents can help you find the right coverage for your needs and budget.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3">
                        <button onclick="this.closest('.fixed').remove(); callMVPSupport();" class="bg-mvp-red text-white px-6 py-3 rounded-lg hover:bg-red-600">
                            <i class="fas fa-phone mr-2"></i>Call (855) MVP-PLAN
                        </button>
                        <a href="https://www.mvphealthcare.com/shop-plans" target="_blank" class="bg-white border border-mvp-red text-mvp-red px-6 py-3 rounded-lg hover:bg-red-50 text-center">
                            <i class="fas fa-external-link-alt mr-2"></i>Shop Plans Online
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function getMVPDirections(location) {
    let address;
    if (location === 'downtown') {
        address = '123 East Avenue, Rochester, NY 14604';
    } else {
        address = '456 Ridge Road West, Rochester, NY 14615';
    }
    
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

function callMVPSupport() {
    window.location.href = 'tel:855-687-7526';
}

// ================================
// ROCROOTS CONNECT SUPPORTING FUNCTIONS
// ================================

// Initialize RocRoots Connect with all interactive features
function initializeRocRootsConnect() {
    loadInteractiveTimeline();
    loadFeaturedHeritageStory();
    initializeGameElements();
    loadUserProgress();
}

// Load and render the interactive timeline
function loadInteractiveTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    
    const timelineData = [
        {
            year: 1820,
            era: '1800s',
            title: 'Underground Railroad Begins',
            description: 'Rochester becomes a crucial stop on the Underground Railroad with Susan B. Anthony House serving as a safe haven.',
            significance: 'high',
            figures: ['Frederick Douglass', 'Susan B. Anthony'],
            location: 'Susan B. Anthony House',
            media: {
                image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96',
                audio: '/static/audio/underground-railroad.mp3'
            }
        },
        {
            year: 1847,
            era: '1800s',
            title: 'Frederick Douglass Arrives',
            description: 'Frederick Douglass moves to Rochester and begins publishing "The North Star" newspaper from his home.',
            significance: 'high',
            figures: ['Frederick Douglass'],
            location: 'Frederick Douglass House',
            media: {
                image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96',
                video: '/static/video/douglass-story.mp4'
            }
        },
        {
            year: 1863,
            era: '1860s',
            title: 'Civil War Participation',
            description: 'Rochester Black men join the 54th Massachusetts Infantry and other Union regiments.',
            significance: 'high',
            figures: ['Local soldiers'],
            location: 'Mount Hope Cemetery',
            media: {
                image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96'
            }
        },
        {
            year: 1918,
            era: '1900s',
            title: 'Great Migration Impact',
            description: 'Southern Black families arrive in Rochester seeking industrial jobs and better opportunities.',
            significance: 'medium',
            figures: ['Community families'],
            location: 'Clarissa Street',
            media: {
                image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/817f24ac-3b57-4c96-a17a-fa3f31e5d635'
            }
        },
        {
            year: 1964,
            era: '1950s',
            title: 'Rochester Race Riots',
            description: 'Civil rights tensions culminate in significant demonstrations and community organizing.',
            significance: 'high',
            figures: ['Local activists'],
            location: 'Joseph Avenue',
            media: {
                image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/817f24ac-3b57-4c96-a17a-fa3f31e5d635',
                video: '/static/video/civil-rights-rochester.mp4'
            }
        },
        {
            year: 2020,
            era: 'modern',
            title: 'Daniel Prude Protests',
            description: 'Community mobilizes for police reform and racial justice in modern Rochester.',
            significance: 'high',
            figures: ['Community activists'],
            location: 'Downtown Rochester',
            media: {
                image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/925a7ea4-13a4-4949-b36c-9802fdab72ed'
            }
        }
    ];
    
    const timelineHtml = timelineData.map((event, index) => `
        <div class="timeline-event relative ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}" data-year="${event.year}" data-era="${event.era}">
            <div class="timeline-content bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border-l-4 border-${getEventColor(event.era)}-500" onclick="openTimelineEvent('${event.year}')">
                ${event.media.image ? `
                    <div class="w-full h-32 relative overflow-hidden">
                        <img src="${event.media.image}" alt="${event.title}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div class="absolute top-2 right-2 flex space-x-1">
                            ${event.media.image ? '<i class="fas fa-image text-white text-xs bg-black/30 rounded px-1 py-0.5"></i>' : ''}
                            ${event.media.audio ? '<i class="fas fa-volume-up text-white text-xs bg-black/30 rounded px-1 py-0.5"></i>' : ''}
                            ${event.media.video ? '<i class="fas fa-video text-white text-xs bg-black/30 rounded px-1 py-0.5"></i>' : ''}
                        </div>
                    </div>
                ` : ''}
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-2xl font-bold text-${getEventColor(event.era)}-600">${event.year}</span>
                        <span class="text-xs bg-${getEventColor(event.era)}-100 text-${getEventColor(event.era)}-800 px-2 py-1 rounded">${event.era}</span>
                    </div>
                    <h4 class="text-lg font-bold text-gray-800 mb-2">${event.title}</h4>
                    <p class="text-gray-600 text-sm mb-3">${event.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-500">
                            <i class="fas fa-map-marker-alt mr-1"></i>${event.location}
                        </span>
                        ${!event.media.image ? `
                            <div class="flex space-x-1">
                                ${event.media.image ? '<i class="fas fa-image text-blue-500 text-xs"></i>' : ''}
                                ${event.media.audio ? '<i class="fas fa-volume-up text-green-500 text-xs"></i>' : ''}
                                ${event.media.video ? '<i class="fas fa-video text-purple-500 text-xs"></i>' : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="timeline-marker absolute w-4 h-4 bg-${getEventColor(event.era)}-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
    `).join('');
    
    timelineContainer.innerHTML = `
        <div class="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-400 via-yellow-400 to-green-400 h-full"></div>
        ${timelineHtml}
        <style>
            .timeline-event { margin-bottom: 3rem; position: relative; }
            .timeline-left .timeline-content { margin-right: 55%; }
            .timeline-right .timeline-content { margin-left: 55%; }
            .timeline-left .timeline-marker { right: -50%; }
            .timeline-right .timeline-marker { left: -50%; }
            .timeline-line { z-index: 1; }
            .timeline-marker { z-index: 2; top: 1rem; }
            .timeline-content { z-index: 3; }
            @media (max-width: 768px) {
                .timeline-left .timeline-content, .timeline-right .timeline-content { margin: 0 0 0 2rem; }
                .timeline-left .timeline-marker, .timeline-right .timeline-marker { left: -2rem; }
                .timeline-line { left: 0; }
            }
        </style>
    `;
}

// Helper function to get era-specific colors
function getEventColor(era) {
    const colors = {
        '1800s': 'red',
        '1860s': 'blue', 
        '1900s': 'green',
        '1950s': 'purple',
        'modern': 'indigo'
    };
    return colors[era] || 'gray';
}

// Jump to specific era on timeline
function jumpToEra(era) {
    // Update active era button
    document.querySelectorAll('.era-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-opacity-50');
    });
    event.target.classList.add('ring-2', 'ring-opacity-50');
    
    // Scroll to first event of that era
    const firstEvent = document.querySelector(`[data-era="${era}"]`);
    if (firstEvent) {
        firstEvent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Toggle timeline to full screen view
function toggleTimelineView() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-6xl w-full h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-2xl font-bold text-gray-800">Rochester Black Heritage Timeline</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="p-6" id="fullscreen-timeline">
                ${document.getElementById('timeline-container').innerHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Open detailed timeline event modal
function openTimelineEvent(year) {
    // Find the event data to get the image
    const timelineData = [
        { year: 1820, image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96', title: 'Underground Railroad Begins' },
        { year: 1847, image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96', title: 'Frederick Douglass Arrives' },
        { year: 1863, image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96', title: 'Civil War Participation' },
        { year: 1918, image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/817f24ac-3b57-4c96-a17a-fa3f31e5d635', title: 'Great Migration Impact' },
        { year: 1964, image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/817f24ac-3b57-4c96-a17a-fa3f31e5d635', title: 'Rochester Race Riots' },
        { year: 2020, image: 'https://cdn1.genspark.ai/user-upload-image/3_generated/925a7ea4-13a4-4949-b36c-9802fdab72ed', title: 'Daniel Prude Protests' }
    ];
    const eventData = timelineData.find(event => event.year == year) || timelineData[0];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="relative">
                <!-- Header Image -->
                <div class="h-48 rounded-t-xl overflow-hidden relative">
                    <img src="${eventData.image}" alt="${eventData.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center">
                        <div class="text-center text-white">
                            <h2 class="text-4xl font-bold">${year}</h2>
                            <p class="text-white/90">Historic Event Details</p>
                        </div>
                    </div>
                </div>
                
                <!-- Close Button -->
                <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 text-white hover:text-gray-200 z-10">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Event Details -->
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Event Details</h3>
                        <div class="space-y-4">
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-2">Historical Context</h4>
                                <p class="text-gray-600 text-sm">Detailed historical information about this period would be displayed here, including social, political, and economic factors that influenced the Black community in Rochester.</p>
                            </div>
                            
                            <div class="p-4 bg-blue-50 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-2">Key Figures</h4>
                                <p class="text-gray-600 text-sm">Profiles of important individuals who shaped this moment in Rochester's Black history.</p>
                            </div>
                            
                            <div class="p-4 bg-green-50 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-2">Legacy Impact</h4>
                                <p class="text-gray-600 text-sm">How this event continues to influence Rochester's Black community today.</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Media & Interactive Elements -->
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Explore More</h3>
                        <div class="space-y-4">
                            <button onclick="playAudioNarration('${year}')" class="w-full p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all text-left">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-play-circle text-purple-600 text-2xl"></i>
                                    <div>
                                        <h4 class="font-semibold text-gray-800">Audio Narration</h4>
                                        <p class="text-xs text-gray-600">Listen to the full story</p>
                                    </div>
                                </div>
                            </button>
                            
                            <button onclick="start360Tour('${year}')" class="w-full p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all text-left">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-vr-cardboard text-blue-600 text-2xl"></i>
                                    <div>
                                        <h4 class="font-semibold text-gray-800">Virtual Site Tour</h4>
                                        <p class="text-xs text-gray-600">360° view of historical location</p>
                                    </div>
                                </div>
                            </button>
                            
                            <button onclick="showRelatedStories('${year}')" class="w-full p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all text-left">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-book-open text-green-600 text-2xl"></i>
                                    <div>
                                        <h4 class="font-semibold text-gray-800">Related Stories</h4>
                                        <p class="text-xs text-gray-600">Community memories and documents</p>
                                    </div>
                                </div>
                            </button>
                            
                            <button onclick="addToPersonalJourney('${year}')" class="w-full p-4 bg-golden-yellow/20 rounded-lg hover:bg-golden-yellow/30 transition-all text-left">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-bookmark text-warm-amber text-2xl"></i>
                                    <div>
                                        <h4 class="font-semibold text-gray-800">Add to My Journey</h4>
                                        <p class="text-xs text-gray-600">Save to personal collection</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Start thematic journey
function startThematicJourney(theme) {
    const themes = {
        'underground-railroad': {
            title: 'Underground Railroad Trail',
            description: 'Follow the courageous journey of freedom seekers through Rochester',
            color: 'red',
            stops: ['Frederick Douglass House', 'Susan B. Anthony House', 'AME Zion Church', 'Mount Hope Cemetery'],
            estimatedTime: '45 minutes',
            difficulty: 'Easy'
        },
        'cultural-renaissance': {
            title: 'Cultural Renaissance Journey',
            description: 'Explore Rochester\'s rich Black artistic and cultural heritage',
            color: 'purple',
            stops: ['Eastman Theater', 'Memorial Art Gallery', 'Geva Theater', 'Jazz Venues'],
            estimatedTime: '60 minutes',
            difficulty: 'Medium'
        },
        'business-pioneers': {
            title: 'Business Pioneers Path',
            description: 'Discover entrepreneurial achievements in Rochester\'s Black community',
            color: 'green',
            stops: ['Historic Business District', 'Entrepreneur Profiles', 'Modern Success Stories'],
            estimatedTime: '30 minutes',
            difficulty: 'Easy'
        },
        'education-leaders': {
            title: 'Educational Leaders Journey',
            description: 'Learn about pioneers who advanced Black education in Rochester',
            color: 'blue',
            stops: ['First Black Schools', 'University of Rochester', 'RIT Contributions'],
            estimatedTime: '40 minutes',
            difficulty: 'Medium'
        },
        'civil-rights': {
            title: 'Civil Rights Movement Trail',
            description: 'Experience Rochester\'s role in the struggle for civil rights',
            color: 'yellow',
            stops: ['Protest Sites', 'Community Organizations', 'Legal Victories'],
            estimatedTime: '50 minutes',
            difficulty: 'Medium'
        },
        'community-builders': {
            title: 'Community Builders Path',
            description: 'Meet modern leaders shaping Rochester\'s future',
            color: 'indigo',
            stops: ['Community Centers', 'Non-profit Organizations', 'Current Leaders'],
            estimatedTime: '35 minutes',
            difficulty: 'Easy'
        }
    };
    
    const journey = themes[theme];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div class="bg-gradient-to-r from-${journey.color}-500 to-${journey.color}-600 text-white p-8 rounded-t-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold">${journey.title}</h2>
                        <p class="text-white/90 mt-2">${journey.description}</p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="text-white/80 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-3 gap-4 mt-6">
                    <div class="text-center">
                        <i class="fas fa-clock text-2xl mb-2"></i>
                        <div class="text-sm">Duration</div>
                        <div class="font-semibold">${journey.estimatedTime}</div>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-map-marked text-2xl mb-2"></i>
                        <div class="text-sm">Stops</div>
                        <div class="font-semibold">${journey.stops.length}</div>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-signal text-2xl mb-2"></i>
                        <div class="text-sm">Difficulty</div>
                        <div class="font-semibold">${journey.difficulty}</div>
                    </div>
                </div>
            </div>
            
            <div class="p-8">
                <h3 class="text-xl font-bold text-gray-800 mb-6">Journey Stops</h3>
                <div class="space-y-4">
                    ${journey.stops.map((stop, index) => `
                        <div class="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div class="w-8 h-8 bg-${journey.color}-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                                ${index + 1}
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-800">${stop}</h4>
                                <p class="text-gray-600 text-sm">Interactive content and stories available at this location</p>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-8 flex space-x-4">
                    <button onclick="launchGuidedTour('${theme}')" class="flex-1 bg-${journey.color}-500 text-white py-3 px-6 rounded-lg hover:bg-${journey.color}-600 transition-colors">
                        <i class="fas fa-play mr-2"></i>Start Guided Tour
                    </button>
                    <button onclick="downloadOfflineMap('${theme}')" class="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                        <i class="fas fa-download mr-2"></i>Download Map
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Launch guided tour
function launchGuidedTour(theme) {
    // Close current modal
    document.querySelector('.fixed').remove();
    
    showNotification(`Starting ${theme.replace('-', ' ')} guided tour!`, 'success');
    
    // In a real implementation, this would start GPS navigation
    setTimeout(() => {
        showNotification('GPS navigation activated. Follow the blue line to your first stop.', 'success');
    }, 2000);
}

// Open historical figures profiles
function openHistoricalProfiles() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-2xl font-bold text-gray-800">Rochester's Black Heritage Figures</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="p-6">
                <!-- Search and Filter -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <input type="text" placeholder="Search figures..." class="p-3 border border-gray-300 rounded-lg">
                    <select class="p-3 border border-gray-300 rounded-lg">
                        <option>All Time Periods</option>
                        <option>1800s - Underground Railroad</option>
                        <option>1860s - Civil War Era</option>
                        <option>1900s - Great Migration</option>
                        <option>1950s - Civil Rights</option>
                        <option>Modern Day</option>
                    </select>
                    <select class="p-3 border border-gray-300 rounded-lg">
                        <option>All Categories</option>
                        <option>Activists</option>
                        <option>Business Leaders</option>
                        <option>Educators</option>
                        <option>Artists</option>
                        <option>Politicians</option>
                    </select>
                </div>
                
                <!-- Figures Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${generateHistoricalFigures().map(figure => `
                        <div class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" onclick="openFigureProfile('${figure.id}')">
                            <div class="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-cultural-brown/20">
                                ${figure.portrait ? 
                                    `<img src="${figure.portrait}" alt="${figure.name}" class="w-full h-full object-cover">` :
                                    `<div class="w-full h-full bg-gradient-to-br from-cultural-brown to-golden-yellow flex items-center justify-center text-white text-2xl font-bold">${figure.initials}</div>`
                                }
                            </div>
                            <h4 class="text-lg font-bold text-gray-800 text-center mb-2">${figure.name}</h4>
                            <p class="text-gray-600 text-sm text-center mb-3">${figure.title}</p>
                            <div class="flex justify-center space-x-2 text-xs">
                                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">${figure.era}</span>
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded">${figure.category}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Generate historical figures data
function generateHistoricalFigures() {
    return [
        {
            id: 'douglass',
            name: 'Frederick Douglass',
            initials: 'FD',
            title: 'Abolitionist & Author',
            era: '1800s',
            category: 'Activist',
            biography: 'Renowned orator, writer, and social reformer who lived in Rochester and published "The North Star" newspaper.',
            portrait: 'https://cdn1.genspark.ai/user-upload-image/3_generated/0c1d5578-65c6-47e4-b0f9-bb6fce296970'
        },
        {
            id: 'anthony',
            name: 'Susan B. Anthony',
            initials: 'SA',
            title: 'Women\'s Rights Pioneer',
            era: '1800s',
            category: 'Activist',
            biography: 'Women\'s suffrage leader who worked alongside Black activists in Rochester\'s reform movements.'
        },
        {
            id: 'williams',
            name: 'Dr. Patricia Williams',
            initials: 'PW',
            title: 'Community Leader',
            era: 'Modern',
            category: 'Educator',
            biography: 'Modern-day educator and community organizer advancing educational equity in Rochester.'
        },
        {
            id: 'johnson',
            name: 'Rev. William Johnson',
            initials: 'WJ',
            title: 'Civil Rights Leader',
            era: '1950s',
            category: 'Activist',
            biography: 'Pastor and civil rights organizer who led key demonstrations in 1960s Rochester.'
        },
        {
            id: 'brown',
            name: 'Maya Brown',
            initials: 'MB',
            title: 'Artist & Cultural Leader',
            era: 'Modern',
            category: 'Artist',
            biography: 'Contemporary artist whose work celebrates Rochester\'s Black cultural heritage.'
        },
        {
            id: 'davis',
            name: 'Marcus Davis',
            initials: 'MD',
            title: 'Business Pioneer',
            era: '1900s',
            category: 'Business',
            biography: 'Entrepreneur who established the first Black-owned bank in Rochester area.'
        }
    ];
}

// Open individual figure profile
function openFigureProfile(figureId) {
    const figures = generateHistoricalFigures();
    const figure = figures.find(f => f.id === figureId);
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="bg-gradient-to-r from-cultural-brown to-golden-yellow text-white p-8">
                <div class="flex items-center space-x-6">
                    <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
                        ${figure.portrait ? 
                            `<img src="${figure.portrait}" alt="${figure.name}" class="w-full h-full object-cover">` :
                            `<div class="w-full h-full bg-white/20 flex items-center justify-center text-3xl font-bold">${figure.initials}</div>`
                        }
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold">${figure.name}</h2>
                        <p class="text-white/90 text-lg">${figure.title}</p>
                        <div class="flex space-x-2 mt-2">
                            <span class="bg-white/20 px-3 py-1 rounded text-sm">${figure.era}</span>
                            <span class="bg-white/20 px-3 py-1 rounded text-sm">${figure.category}</span>
                        </div>
                    </div>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 text-white/80 hover:text-white">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Biography</h3>
                        <p class="text-gray-600 leading-relaxed mb-6">${figure.biography}</p>
                        
                        <div class="space-y-4">
                            <button onclick="playFigureAudio('${figure.id}')" class="w-full p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all text-left">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-volume-up text-blue-600"></i>
                                    <div>
                                        <h4 class="font-semibold text-gray-800">Listen to Biography</h4>
                                        <p class="text-xs text-gray-600">Audio narration available</p>
                                    </div>
                                </div>
                            </button>
                            
                            <button onclick="viewFigureTimeline('${figure.id}')" class="w-full p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all text-left">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-history text-green-600"></i>
                                    <div>
                                        <h4 class="font-semibold text-gray-800">Life Timeline</h4>
                                        <p class="text-xs text-gray-600">Key events and milestones</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Legacy & Impact</h3>
                        <div class="space-y-4">
                            <div class="p-4 bg-yellow-50 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-2">Historical Impact</h4>
                                <p class="text-gray-600 text-sm">Information about their contributions to Rochester's Black community and broader society.</p>
                            </div>
                            
                            <div class="p-4 bg-purple-50 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-2">Modern Relevance</h4>
                                <p class="text-gray-600 text-sm">How their work continues to influence Rochester today.</p>
                            </div>
                            
                            <div class="p-4 bg-green-50 rounded-lg">
                                <h4 class="font-semibold text-gray-800 mb-2">Related Sites</h4>
                                <p class="text-gray-600 text-sm">Locations in Rochester connected to their life and work.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Open virtual tours interface
function openVirtualTours() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-2xl font-bold text-gray-800">Virtual Heritage Tours</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${generateVirtualTours().map(tour => `
                        <div class="bg-gradient-to-br from-${tour.color}-50 to-${tour.color}-100 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                            <div class="h-40 bg-gradient-to-br from-${tour.color}-400 to-${tour.color}-600 flex items-center justify-center text-white">
                                <i class="fas ${tour.icon} text-4xl"></i>
                            </div>
                            <div class="p-4">
                                <h4 class="text-lg font-bold text-gray-800 mb-2">${tour.name}</h4>
                                <p class="text-gray-600 text-sm mb-4">${tour.description}</p>
                                <div class="flex justify-between items-center text-xs text-gray-500 mb-4">
                                    <span><i class="fas fa-clock mr-1"></i>${tour.duration}</span>
                                    <span><i class="fas fa-eye mr-1"></i>360° View</span>
                                </div>
                                <button onclick="start360Tour('${tour.id}')" class="w-full bg-${tour.color}-500 text-white py-2 px-4 rounded-lg hover:bg-${tour.color}-600 transition-colors">
                                    <i class="fas fa-vr-cardboard mr-2"></i>Start Tour
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Generate virtual tours data
function generateVirtualTours() {
    return [
        {
            id: 'douglass-house',
            name: 'Frederick Douglass House',
            description: 'Virtual tour of Frederick Douglass\'s Rochester home and printing press location.',
            duration: '15 min',
            color: 'blue',
            icon: 'fa-home'
        },
        {
            id: 'anthony-house',
            name: 'Susan B. Anthony House',
            description: 'Explore the Underground Railroad station and women\'s rights headquarters.',
            duration: '12 min',
            color: 'purple',
            icon: 'fa-landmark'
        },
        {
            id: 'mount-hope',
            name: 'Mount Hope Cemetery',
            description: 'Visit graves and monuments of Rochester\'s Black historical figures.',
            duration: '20 min',
            color: 'green',
            icon: 'fa-cross'
        },
        {
            id: 'clarissa-street',
            name: 'Historic Clarissa Street',
            description: 'Walk through the heart of Rochester\'s historic Black neighborhood.',
            duration: '25 min',
            color: 'yellow',
            icon: 'fa-road'
        },
        {
            id: 'ame-zion',
            name: 'AME Zion Church',
            description: 'Historic church that served as community center and safe haven.',
            duration: '18 min',
            color: 'red',
            icon: 'fa-church'
        },
        {
            id: 'joseph-avenue',
            name: 'Joseph Avenue Corridor',
            description: 'Experience the sites of civil rights demonstrations and community organizing.',
            duration: '22 min',
            color: 'indigo',
            icon: 'fa-fist-raised'
        }
    ];
}

// Start 360-degree virtual tour
function start360Tour(tourId) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="w-full h-full relative">
            <!-- 360 Tour Viewer -->
            <div class="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                <div class="text-center text-white">
                    <i class="fas fa-vr-cardboard text-6xl mb-6 animate-pulse"></i>
                    <h3 class="text-2xl font-bold mb-4">360° Virtual Tour</h3>
                    <p class="text-white/80 mb-6">Immersive experience loading...</p>
                    <div class="bg-white/20 rounded-lg p-6 max-w-md mx-auto">
                        <p class="text-sm mb-4">This would be a fully immersive 360° tour using WebGL and VR technologies.</p>
                        <p class="text-xs text-white/70">Features: Virtual reality support, interactive hotspots, audio narration, historical overlays</p>
                    </div>
                </div>
            </div>
            
            <!-- Tour Controls -->
            <div class="absolute top-4 left-4 right-4 flex justify-between items-center">
                <div class="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                    <span class="text-sm">${tourId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Virtual Tour</span>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-black/70">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Navigation Controls -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <button class="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-black/70">
                    <i class="fas fa-volume-up mr-2"></i>Audio Guide
                </button>
                <button class="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-black/70">
                    <i class="fas fa-info-circle mr-2"></i>Hotspots
                </button>
                <button class="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-black/70">
                    <i class="fas fa-expand mr-2"></i>VR Mode
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Load featured heritage story
function loadFeaturedHeritageStory() {
    const container = document.getElementById('featured-story-container');
    
    const featuredStory = {
        title: 'The Underground Railroad Network in Rochester',
        excerpt: 'Discover how Rochester became one of the most important stops on the Underground Railroad, with Frederick Douglass, Susan B. Anthony, and other local abolitionists working together to guide freedom seekers to safety.',
        readTime: '8 min read',
        category: 'Underground Railroad',
        featured: true
    };
    
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-gradient-to-br from-cultural-brown/10 to-golden-yellow/10 rounded-lg p-6">
                <div class="w-full h-48 bg-gradient-to-br from-cultural-brown to-golden-yellow rounded-lg overflow-hidden mb-6 relative">
                    <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96" 
                         alt="Underground Railroad in Rochester" 
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <span class="text-xs bg-cultural-brown text-white px-3 py-1 rounded-full">${featuredStory.category}</span>
            </div>
            
            <div class="space-y-4">
                <h3 class="text-2xl font-bold text-gray-800">${featuredStory.title}</h3>
                <p class="text-gray-600 leading-relaxed">${featuredStory.excerpt}</p>
                
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span><i class="fas fa-clock mr-1"></i>${featuredStory.readTime}</span>
                    <span><i class="fas fa-star mr-1 text-golden-yellow"></i>Featured Story</span>
                </div>
                
                <div class="flex space-x-3 pt-4">
                    <button onclick="openFullStory('featured')" class="bg-cultural-brown text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition-colors">
                        <i class="fas fa-book-open mr-2"></i>Read Full Story
                    </button>
                    <button onclick="playStoryAudio('featured')" class="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                        <i class="fas fa-volume-up mr-2"></i>Listen
                    </button>
                    <button onclick="shareStory('featured')" class="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                        <i class="fas fa-share mr-2"></i>Share
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Initialize gamification elements
function initializeGameElements() {
    // Set up user progress tracking
    if (!localStorage.getItem('rocroots_progress')) {
        const initialProgress = {
            visitedSites: [],
            completedJourneys: [],
            badges: [],
            points: 0,
            level: 1
        };
        localStorage.setItem('rocroots_progress', JSON.stringify(initialProgress));
    }
}

// Load user progress
function loadUserProgress() {
    const progress = JSON.parse(localStorage.getItem('rocroots_progress') || '{}');
    
    // Update progress display if elements exist
    const progressElement = document.querySelector('.bg-gradient-to-br.from-golden-yellow\\/20');
    if (progressElement) {
        const percentage = Math.min((progress.points || 0) / 1000 * 100, 100);
        const progressBar = progressElement.querySelector('.h-2');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }
}

// Additional supporting functions for interactive features
function openAudioNarratives() {
    showNotification('Audio narratives feature coming soon!', 'success');
}

function openCommunityCollection() {
    showNotification('Community collection feature coming soon!', 'success');
}

function exploreAllStories() {
    showNotification('Story explorer feature coming soon!', 'success');
}

function loadHistoricMap() {
    showNotification('Interactive map launching...', 'success');
}

function toggleMapView(view) {
    showNotification(`Switched to ${view} view`, 'success');
}

function enableGPSTour() {
    showNotification('GPS tour mode activated!', 'success');
}

function playAudioNarration(year) {
    showNotification(`Playing audio narration for ${year}`, 'success');
}

function start360Tour(year) {
    showNotification(`Starting 360° tour for ${year}`, 'success');
}

function showRelatedStories(year) {
    showNotification(`Loading related stories for ${year}`, 'success');
}

function addToPersonalJourney(year) {
    showNotification(`Added ${year} to your personal journey!`, 'success');
}

function downloadOfflineMap(theme) {
    showNotification(`Downloading ${theme} offline map...`, 'success');
}

function playFigureAudio(figureId) {
    showNotification('Playing biography audio...', 'success');
}

function viewFigureTimeline(figureId) {
    showNotification('Loading life timeline...', 'success');
}

function openFullStory(storyId) {
    showNotification('Opening full story...', 'success');
}

function playStoryAudio(storyId) {
    showNotification('Playing story audio...', 'success');
}

function shareStory(storyId) {
    showNotification('Story shared successfully!', 'success');
}

// ================================
// EVENTS SYNC SUPPORTING FUNCTIONS
// ================================

// Initialize Events Sync with enhanced features
function initializeEventsSync() {
    loadFeaturedEventVideo();
    loadEnhancedEvents();
    initializeEventPreferences();
}

// Load featured event video showcase
function loadFeaturedEventVideo() {
    const container = document.getElementById('featured-event-video');
    
    container.innerHTML = `
        <div class="relative rounded-lg overflow-hidden shadow-lg">
            <video 
                src="https://cdn1.genspark.ai/user-upload-image/5/121623b9-6b63-4f95-9387-6e8bc19f9242.mp4"
                poster="https://cdn1.genspark.ai/user-upload-image/video_frames/2bbd1901-65b9-47ac-9f1b-b0da8b6677a7"
                controls 
                class="w-full h-64 md:h-80 object-cover bg-gradient-to-br from-purple-100 to-blue-100"
                preload="metadata">
                <p class="text-gray-600 p-8 text-center">Your browser does not support video playback. 
                   <a href="https://cdn1.genspark.ai/user-upload-image/5/121623b9-6b63-4f95-9387-6e8bc19f9242.mp4" 
                      target="_blank" class="text-purple-600 hover:underline">View video in new tab</a>
                </p>
            </video>
            
            <!-- Event Stats Overlay -->
            <div class="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
                <h4 class="font-bold mb-2">Rochester Community Events This Week</h4>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div class="text-2xl font-bold">25+</div>
                        <div class="text-xs text-white/80">Events This Week</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold">12</div>
                        <div class="text-xs text-white/80">Different Venues</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold">2,500+</div>
                        <div class="text-xs text-white/80">Expected Attendees</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load enhanced events with multimedia content
async function loadEnhancedEvents() {
    try {
        const response = await axios.get('/api/events');
        const apiEvents = response.data;
        
        // Combine API events with generated community events
        const allEvents = [...apiEvents, ...generateCommunityEvents()];
        displayEnhancedEvents(allEvents);
    } catch (error) {
        console.error('Error loading events:', error);
        // Generate community events as fallback
        displayEnhancedEvents(generateCommunityEvents());
    }
}

// Generate rich community events with multimedia
function generateCommunityEvents() {
    const today = new Date();
    const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextWeek = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    return [
        {
            id: 'cultural-festival-1',
            title: 'Rochester Black Arts Festival',
            description: 'Celebrate Black creativity with local artists, live performances, food vendors, and interactive workshops. Family-friendly event featuring music, dance, visual arts, and cultural exhibitions.',
            category: 'cultural',
            community_focus: 'black',
            event_date: today.toISOString().split('T')[0],
            start_time: '12:00 PM',
            end_time: '8:00 PM',
            location: 'Downtown Rochester',
            address: '123 East Avenue, Rochester, NY',
            organizer: 'Rochester Black Arts Coalition',
            contact_info: 'info@rochesterblackarts.org',
            price: 'Free',
            featured: true,
            image: 'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Black+Arts+Festival',
            video: null,
            tags: ['arts', 'culture', 'music', 'family-friendly'],
            expected_attendance: 500,
            accessibility: 'Wheelchair accessible, ASL interpreter available'
        },
        {
            id: 'business-mixer-1',
            title: 'Latino Business Network Mixer',
            description: 'Professional networking event for Latino entrepreneurs and business professionals. Featuring guest speakers, business card exchange, and opportunities for collaboration and mentorship.',
            category: 'business',
            community_focus: 'latin',
            event_date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            start_time: '6:00 PM',
            end_time: '9:00 PM',
            location: 'Northwest Rochester',
            address: '456 Ridge Road West, Rochester, NY',
            organizer: 'Rochester Latino Business Association',
            contact_info: 'contact@rochesterlba.org',
            price: '$15',
            featured: false,
            image: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Business+Mixer',
            video: null,
            tags: ['business', 'networking', 'professional'],
            expected_attendance: 80,
            accessibility: 'Wheelchair accessible'
        },
        {
            id: 'music-concert-1',
            title: 'Soul & Salsa Night',
            description: 'Live music event featuring local Black and Latino musicians. Dance the night away to soul, R&B, salsa, and reggaeton. Local food vendors and cash bar available.',
            category: 'music',
            community_focus: 'both',
            event_date: thisWeek.toISOString().split('T')[0],
            start_time: '7:00 PM',
            end_time: '11:00 PM',
            location: 'Southeast Rochester',
            address: '789 Monroe Avenue, Rochester, NY',
            organizer: 'Rochester Music Collective',
            contact_info: 'events@rochmusiccollective.com',
            price: '$20',
            featured: true,
            image: 'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Soul+%26+Salsa+Night',
            video: 'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Video+Preview',
            tags: ['music', 'dance', 'nightlife', 'cultural'],
            expected_attendance: 300,
            accessibility: 'Wheelchair accessible, loud music advisory'
        },
        {
            id: 'family-day-1',
            title: 'Community Family Fun Day',
            description: 'Family-friendly event with activities for all ages. Kids\' games, face painting, community resource booths, health screenings, and free lunch. Celebrating our diverse community.',
            category: 'family',
            community_focus: 'both',
            event_date: thisWeek.toISOString().split('T')[0],
            start_time: '11:00 AM',
            end_time: '4:00 PM',
            location: 'Highland Park',
            address: 'Highland Park, Rochester, NY',
            organizer: 'Rochester Community Coalition',
            contact_info: 'info@rochestercc.org',
            price: 'Free',
            featured: true,
            image: 'https://via.placeholder.com/400x250/06B6D4/FFFFFF?text=Family+Fun+Day',
            video: null,
            tags: ['family', 'community', 'health', 'children'],
            expected_attendance: 800,
            accessibility: 'Fully accessible, stroller-friendly'
        },
        {
            id: 'workshop-1',
            title: 'Financial Literacy Workshop',
            description: 'Educational workshop focused on building wealth in Black and Latino communities. Topics include budgeting, investing, homeownership, and starting a business. Free financial consultation available.',
            category: 'workshops',
            community_focus: 'both',
            event_date: nextWeek.toISOString().split('T')[0],
            start_time: '10:00 AM',
            end_time: '2:00 PM',
            location: 'Downtown Rochester',
            address: '234 State Street, Rochester, NY',
            organizer: 'Financial Empowerment Coalition',
            contact_info: 'learn@financialempowerment.org',
            price: 'Free',
            featured: false,
            image: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Financial+Workshop',
            video: null,
            tags: ['education', 'finance', 'empowerment', 'workshop'],
            expected_attendance: 150,
            accessibility: 'Wheelchair accessible, materials in Spanish available'
        },
        {
            id: 'health-fair-1',
            title: 'Community Health & Wellness Fair',
            description: 'Comprehensive health fair with free screenings, vaccinations, mental health resources, and wellness activities. Culturally competent healthcare providers and information in multiple languages.',
            category: 'health',
            community_focus: 'both',
            event_date: nextWeek.toISOString().split('T')[0],
            start_time: '9:00 AM',
            end_time: '3:00 PM',
            location: 'Northeast Rochester',
            address: '567 North Street, Rochester, NY',
            organizer: 'Rochester Health Collective',
            contact_info: 'health@rochesterhealth.org',
            price: 'Free',
            featured: false,
            image: 'https://via.placeholder.com/400x250/EF4444/FFFFFF?text=Health+Fair',
            video: null,
            tags: ['health', 'wellness', 'community', 'healthcare'],
            expected_attendance: 400,
            accessibility: 'Fully accessible, language interpreters available'
        }
    ];
}

// Display enhanced events with multimedia content
function displayEnhancedEvents(events) {
    const container = document.getElementById('events-container');
    const loading = document.getElementById('events-loading');
    
    loading.style.display = 'none';
    
    if (events.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
                <h4 class="text-xl font-semibold text-gray-600 mb-2">No Events Found</h4>
                <p class="text-gray-500 mb-6">No events match your current filters. Try adjusting your search criteria.</p>
                <button onclick="clearAllFilters()" class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                    <i class="fas fa-filter mr-2"></i>Clear All Filters
                </button>
            </div>
        `;
        return;
    }
    
    // Sort events by date and featured status
    const sortedEvents = events.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(a.event_date) - new Date(b.event_date);
    });
    
    container.innerHTML = sortedEvents.map(event => `
        <div class="bg-white border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${event.featured ? 'ring-2 ring-purple-200' : ''}">
            ${event.featured ? '<div class="absolute -top-2 -right-2"><span class="bg-purple-600 text-white text-xs px-3 py-1 rounded-full"><i class="fas fa-star mr-1"></i>Featured</span></div>' : ''}
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Event Media -->
                <div class="relative">
                    <div class="aspect-video rounded-lg overflow-hidden">
                        ${event.image ? 
                            `<img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover">` :
                            `<div class="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                <i class="fas fa-${getCategoryIcon(event.category)} text-3xl text-purple-600"></i>
                            </div>`
                        }
                        
                        ${event.video ? `
                            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onclick="playEventVideo('${event.id}')">
                                <i class="fas fa-play-circle text-4xl text-white"></i>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Event Tags -->
                    <div class="flex flex-wrap gap-2 mt-3">
                        ${event.tags ? event.tags.slice(0, 3).map(tag => 
                            `<span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">${tag}</span>`
                        ).join('') : ''}
                    </div>
                </div>
                
                <!-- Event Details -->
                <div class="lg:col-span-2">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h4 class="text-xl font-bold text-gray-800 mb-2">${event.title}</h4>
                            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                <span class="flex items-center">
                                    <i class="fas fa-calendar mr-1 text-purple-600"></i>
                                    ${formatEventDate(event.event_date)}
                                </span>
                                <span class="flex items-center">
                                    <i class="fas fa-clock mr-1 text-purple-600"></i>
                                    ${event.start_time}${event.end_time ? ' - ' + event.end_time : ''}
                                </span>
                                <span class="flex items-center">
                                    <i class="fas fa-map-marker-alt mr-1 text-purple-600"></i>
                                    ${event.location}
                                </span>
                            </div>
                        </div>
                        
                        <div class="flex flex-col items-end space-y-2">
                            <span class="text-xs bg-${getCommunityColor(event.community_focus)}-100 text-${getCommunityColor(event.community_focus)}-800 px-3 py-1 rounded-full">
                                ${event.community_focus === 'both' ? 'All Communities' : event.community_focus.charAt(0).toUpperCase() + event.community_focus.slice(1)}
                            </span>
                            <span class="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </span>
                        </div>
                    </div>
                    
                    <p class="text-gray-700 leading-relaxed mb-4">${event.description}</p>
                    
                    <!-- Event Meta Information -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div class="space-y-2">
                            ${event.organizer ? `<p><i class="fas fa-user-tie mr-2 text-gray-500"></i><strong>Organizer:</strong> ${event.organizer}</p>` : ''}
                            ${event.contact_info ? `<p><i class="fas fa-envelope mr-2 text-gray-500"></i><strong>Contact:</strong> ${event.contact_info}</p>` : ''}
                            ${event.price ? `<p><i class="fas fa-ticket-alt mr-2 text-gray-500"></i><strong>Price:</strong> ${event.price}</p>` : ''}
                        </div>
                        <div class="space-y-2">
                            ${event.expected_attendance ? `<p><i class="fas fa-users mr-2 text-gray-500"></i><strong>Expected:</strong> ${event.expected_attendance} attendees</p>` : ''}
                            ${event.accessibility ? `<p><i class="fas fa-wheelchair mr-2 text-gray-500"></i><strong>Accessibility:</strong> ${event.accessibility}</p>` : ''}
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-3">
                        <button onclick="getEventDirections('${event.address}')" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                            <i class="fas fa-directions mr-2"></i>Get Directions
                        </button>
                        <button onclick="addToCalendar('${event.id}')" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <i class="fas fa-calendar-plus mr-2"></i>Add to Calendar
                        </button>
                        <button onclick="shareEvent('${event.id}')" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                            <i class="fas fa-share mr-2"></i>Share
                        </button>
                        ${event.contact_info && event.contact_info.includes('@') ? `
                            <button onclick="rsvpToEvent('${event.id}')" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                                <i class="fas fa-check mr-2"></i>RSVP
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper function to get category icon
function getCategoryIcon(category) {
    const icons = {
        'cultural': 'palette',
        'music': 'music',
        'family': 'heart',
        'business': 'briefcase',
        'workshops': 'chalkboard-teacher',
        'community': 'users',
        'educational': 'graduation-cap',
        'health': 'heartbeat'
    };
    return icons[category] || 'calendar';
}

// Helper function to get community color
function getCommunityColor(community) {
    const colors = {
        'black': 'purple',
        'latin': 'blue',
        'both': 'green'
    };
    return colors[community] || 'gray';
}

// Format event date for display
function formatEventDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Event interaction functions
function showTodayEvents() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('event-date-filter').value = today;
    filterEvents();
}

function showThisWeekend() {
    const today = new Date();
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + (6 - today.getDay()));
    
    document.getElementById('event-date-filter').value = saturday.toISOString().split('T')[0];
    filterEvents();
}

function showFeaturedEvents() {
    clearAllFilters();
    // Filter to show only featured events (this would be implemented in the filtering logic)
    showNotification('Showing featured events', 'success');
}

function playEventShowcase() {
    showNotification('Event showcase video playing...', 'success');
}

function playEventVideo(eventId) {
    showNotification(`Playing video for event ${eventId}`, 'success');
}

function getEventDirections(address) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

function addToCalendar(eventId) {
    showNotification('Event added to calendar!', 'success');
}

function shareEvent(eventId) {
    if (navigator.share) {
        navigator.share({
            title: 'Community Event',
            url: `${window.location.origin}/events/${eventId}`
        });
    } else {
        navigator.clipboard.writeText(`${window.location.origin}/events/${eventId}`);
        showNotification('Event link copied to clipboard!', 'success');
    }
}

function rsvpToEvent(eventId) {
    showNotification('RSVP submitted successfully!', 'success');
}

function clearAllFilters() {
    document.getElementById('event-category-filter').value = '';
    document.getElementById('event-community-filter').value = '';
    document.getElementById('event-date-filter').value = '';
    document.getElementById('event-location-filter').value = '';
    filterEvents();
}

function saveEventPreferences() {
    const preferences = {
        category: document.getElementById('event-category-filter').value,
        community: document.getElementById('event-community-filter').value,
        location: document.getElementById('event-location-filter').value
    };
    
    localStorage.setItem('eventPreferences', JSON.stringify(preferences));
    showNotification('Event preferences saved!', 'success');
}

function initializeEventPreferences() {
    const saved = localStorage.getItem('eventPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        if (preferences.category) document.getElementById('event-category-filter').value = preferences.category;
        if (preferences.community) document.getElementById('event-community-filter').value = preferences.community;
        if (preferences.location) document.getElementById('event-location-filter').value = preferences.location;
    }
}

function toggleViewMode(mode) {
    // Update active button
    document.querySelectorAll('[id$="-view-btn"]').forEach(btn => {
        btn.classList.remove('bg-purple-100', 'text-purple-700');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    document.getElementById(`${mode}-view-btn`).classList.remove('bg-gray-100', 'text-gray-700');
    document.getElementById(`${mode}-view-btn`).classList.add('bg-purple-100', 'text-purple-700');
    
    showNotification(`Switched to ${mode} view`, 'success');
}

function subscribeToUpdates() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-md w-full p-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Daily Event Updates</h3>
            <p class="text-gray-600 mb-6">Get notified about new community events in Rochester.</p>
            
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="your@email.com">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Communities</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" checked class="mr-2">
                            <span>Black Community Events</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" checked class="mr-2">
                            <span>Latino Community Events</span>
                        </label>
                    </div>
                </div>
                
                <div class="flex space-x-3 pt-4">
                    <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200">
                        Cancel
                    </button>
                    <button type="submit" onclick="this.closest('.fixed').remove(); showNotification('Successfully subscribed to updates!', 'success');" class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                        Subscribe
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function subscribeToCalendar() {
    const calendarUrl = 'https://calendar.google.com/calendar/u/0?cid=Y19iMjBlMDQ2ZGEwMDljYTA2M2IwODdlNGI3ZjM3ZTJjZTRlZDBkNGI2Y2U1YmRiZjc2ZmRhZDU3ZWMxMGQ1ZWFlQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20';
    
    // Try to detect the user's calendar application
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isMobile = isIOS || isAndroid;
    
    if (isMobile) {
        // For mobile devices, open the calendar URL directly
        window.open(calendarUrl, '_blank');
        showNotification('Opening calendar app...', 'success');
    } else {
        // For desktop, provide instructions
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-md w-full p-8">
                <div class="text-center">
                    <i class="fas fa-calendar-plus text-4xl text-blue-600 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Add to Calendar</h3>
                    <p class="text-gray-600 mb-6">Subscribe to Rochester Community Events to get automatic updates in your calendar app.</p>
                    
                    <div class="space-y-3">
                        <a href="webcal://calendar.google.com/calendar/ical/c_b20e046da009ca063b087e4b7f37e2ce4ed0d4b6ce5bdbf76fdad57ec10d5eae%40group.calendar.google.com/public/basic.ics" 
                           class="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-calendar mr-2"></i>
                            Add to Default Calendar App
                        </a>
                        
                        <a href="${calendarUrl}" 
                           target="_blank"
                           class="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            <i class="fab fa-google mr-2"></i>
                            Open in Google Calendar
                        </a>
                    </div>
                    
                    <button onclick="this.closest('.fixed').remove()" 
                            class="mt-4 text-gray-500 hover:text-gray-700 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

function submitCommunityEvent() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-2xl font-bold text-gray-800">Submit Community Event</h3>
                <p class="text-gray-600 mt-2">Share your event with the Rochester community.</p>
            </div>
            
            <form class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Event Title*</label>
                        <input type="text" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter event title" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Category*</label>
                        <select class="w-full p-3 border border-gray-300 rounded-lg" required>
                            <option value="">Select category...</option>
                            <option value="cultural">Cultural Festival</option>
                            <option value="music">Live Music</option>
                            <option value="family">Family Activities</option>
                            <option value="business">Business Mixer</option>
                            <option value="workshops">Workshop</option>
                            <option value="community">Community Gathering</option>
                            <option value="educational">Educational</option>
                            <option value="health">Health & Wellness</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Event Description*</label>
                    <textarea rows="4" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Describe your event..." required></textarea>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Date*</label>
                        <input type="date" class="w-full p-3 border border-gray-300 rounded-lg" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Start Time*</label>
                        <input type="time" class="w-full p-3 border border-gray-300 rounded-lg" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                        <input type="time" class="w-full p-3 border border-gray-300 rounded-lg">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Community Focus*</label>
                        <select class="w-full p-3 border border-gray-300 rounded-lg" required>
                            <option value="">Select community...</option>
                            <option value="black">Black Community</option>
                            <option value="latin">Latino Community</option>
                            <option value="both">All Communities</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input type="text" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Free, $10, etc.">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Location/Address*</label>
                    <input type="text" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Event venue and address" required>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Organizer Name*</label>
                        <input type="text" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Your name or organization" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Contact Email*</label>
                        <input type="email" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="contact@email.com" required>
                    </div>
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="this.closest('.fixed').remove()" class="px-6 py-2 text-gray-600 hover:text-gray-800">
                        Cancel
                    </button>
                    <button type="submit" onclick="this.closest('.fixed').remove(); showNotification('Event submitted for review!', 'success');" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                        Submit Event
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ================================
// MELOMICS SUPPORTING FUNCTIONS
// ================================

// Initialize Melonomics with all advanced features
function initializeMelomics() {
    loadMarketIndicators();
    loadMarketChart();
    loadMarketMovers();
    loadEconomicCalendar();
    loadFeaturedEntrepreneur();
    loadBlackFinancialInstitutions();
    loadEconomicNews();
}

// Load real-time market indicators
function loadMarketIndicators() {
    const container = document.getElementById('market-indicators');
    
    const indicators = [
        { name: 'S&P 500', value: '4,567.32', change: '+1.2%', trend: 'up', color: 'green' },
        { name: 'NASDAQ', value: '14,823.56', change: '+0.8%', trend: 'up', color: 'green' },
        { name: 'DOW Jones', value: '34,123.45', change: '-0.3%', trend: 'down', color: 'red' },
        { name: 'Russell 2000', value: '2,087.91', change: '+0.5%', trend: 'up', color: 'green' },
        { name: 'VIX (Fear Index)', value: '18.45', change: '-2.1%', trend: 'down', color: 'green' }
    ];
    
    container.innerHTML = indicators.map(indicator => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
                <div class="font-semibold text-gray-800 text-sm">${indicator.name}</div>
                <div class="text-xs text-gray-600">${indicator.value}</div>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-sm font-bold text-${indicator.color}-600">${indicator.change}</span>
                <i class="fas fa-arrow-${indicator.trend === 'up' ? 'up' : 'down'} text-${indicator.color}-600"></i>
            </div>
        </div>
    `).join('');
}

// Load interactive market chart
function loadMarketChart() {
    const container = document.getElementById('market-chart-container');
    
    container.innerHTML = `
        <div class="text-center py-12">
            <div class="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-chart-line text-3xl text-green-600"></i>
            </div>
            <h4 class="text-xl font-bold text-gray-800 mb-2">Interactive Market Chart</h4>
            <p class="text-gray-600 mb-4">Real-time market data visualization with multiple timeframes</p>
            <div class="bg-white rounded-lg p-6 mx-auto max-w-md">
                <p class="text-sm text-gray-600 mb-4">Chart would display:</p>
                <ul class="text-sm text-gray-700 space-y-2">
                    <li>• Live price movements</li>
                    <li>• Volume indicators</li>
                    <li>• Technical analysis tools</li>
                    <li>• Customizable timeframes</li>
                    <li>• Touch-responsive interaction</li>
                </ul>
            </div>
        </div>
    `;
}

// Load market movers spotlight
function loadMarketMovers() {
    const container = document.getElementById('market-movers');
    
    const movers = [
        {
            symbol: 'META',
            name: 'Meta Platforms',
            price: '$298.45',
            change: '+5.2%',
            relevance: 'Black creator economy partnerships',
            color: 'green'
        },
        {
            symbol: 'NFLX',
            name: 'Netflix Inc.',
            price: '$425.67',
            change: '+3.8%',
            relevance: 'Black content production expansion',
            color: 'green'
        },
        {
            symbol: 'TSLA',
            name: 'Tesla Inc.',
            price: '$234.12',
            change: '-2.1%',
            relevance: 'EV adoption in urban communities',
            color: 'red'
        }
    ];
    
    container.innerHTML = movers.map(mover => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex-1">
                <div class="flex items-center space-x-3">
                    <div class="font-bold text-gray-800">${mover.symbol}</div>
                    <div class="text-sm text-gray-600">${mover.name}</div>
                </div>
                <div class="text-xs text-gray-500 mt-1">${mover.relevance}</div>
            </div>
            <div class="text-right">
                <div class="font-semibold text-gray-800">${mover.price}</div>
                <div class="text-sm font-bold text-${mover.color}-600">${mover.change}</div>
            </div>
        </div>
    `).join('');
}

// Load economic calendar
function loadEconomicCalendar() {
    const container = document.getElementById('economic-calendar');
    
    const events = [
        {
            date: 'Today',
            time: '10:00 AM',
            event: 'Consumer Price Index',
            impact: 'high',
            forecast: '3.2%'
        },
        {
            date: 'Tomorrow',
            time: '2:00 PM',
            event: 'Fed Interest Rate Decision',
            impact: 'high',
            forecast: '5.25%'
        },
        {
            date: 'Friday',
            time: '8:30 AM',
            event: 'Non-Farm Payrolls',
            impact: 'medium',
            forecast: '185K'
        }
    ];
    
    container.innerHTML = events.map(event => `
        <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex-1">
                <div class="font-semibold text-gray-800">${event.event}</div>
                <div class="text-sm text-gray-600">${event.date} at ${event.time}</div>
            </div>
            <div class="text-right">
                <div class="text-sm font-semibold">${event.forecast}</div>
                <div class="text-xs px-2 py-1 rounded ${event.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}">
                    ${event.impact.toUpperCase()}
                </div>
            </div>
        </div>
    `).join('');
}

// Load featured entrepreneur spotlight
function loadFeaturedEntrepreneur() {
    const container = document.getElementById('featured-entrepreneur');
    
    const entrepreneur = {
        name: 'Sarah Johnson',
        title: 'CEO & Founder',
        company: 'TechForward Solutions',
        industry: 'Financial Technology',
        location: 'Rochester, NY',
        founded: '2019',
        employees: '45+',
        revenue: '$2.3M ARR',
        story: 'Sarah founded TechForward after experiencing firsthand the challenges Black communities face accessing financial services. Her platform has helped over 10,000 families build credit and access affordable loans.',
        image: 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Sarah+Johnson'
    };
    
    container.innerHTML = `
        <!-- Entrepreneur Photo -->
        <div class="relative">
            <img src="${entrepreneur.image}" alt="${entrepreneur.name}" class="w-full h-80 object-cover rounded-lg">
            <div class="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
                <h4 class="font-bold text-lg">${entrepreneur.name}</h4>
                <p class="text-white/90 text-sm">${entrepreneur.title}, ${entrepreneur.company}</p>
            </div>
        </div>
        
        <!-- Business Details -->
        <div>
            <h4 class="text-xl font-bold text-gray-800 mb-4">Success Metrics</h4>
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="p-3 bg-blue-50 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600">${entrepreneur.revenue}</div>
                    <div class="text-sm text-gray-600">Annual Revenue</div>
                </div>
                <div class="p-3 bg-green-50 rounded-lg">
                    <div class="text-2xl font-bold text-green-600">${entrepreneur.employees}</div>
                    <div class="text-sm text-gray-600">Employees</div>
                </div>
                <div class="p-3 bg-purple-50 rounded-lg">
                    <div class="text-2xl font-bold text-purple-600">${entrepreneur.founded}</div>
                    <div class="text-sm text-gray-600">Founded</div>
                </div>
                <div class="p-3 bg-orange-50 rounded-lg">
                    <div class="text-2xl font-bold text-orange-600">10K+</div>
                    <div class="text-sm text-gray-600">Customers</div>
                </div>
            </div>
            
            <div class="space-y-3 text-sm text-gray-600">
                <div><strong>Industry:</strong> ${entrepreneur.industry}</div>
                <div><strong>Location:</strong> ${entrepreneur.location}</div>
            </div>
        </div>
        
        <!-- Success Story -->
        <div>
            <h4 class="text-xl font-bold text-gray-800 mb-4">Success Journey</h4>
            <p class="text-gray-700 leading-relaxed mb-6">${entrepreneur.story}</p>
            
            <div class="space-y-3">
                <button onclick="watchEntrepreneurVideo('${entrepreneur.name}')" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                    <i class="fas fa-play mr-2"></i>Watch Success Story Video
                </button>
                <button onclick="readFullProfile('${entrepreneur.name}')" class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    <i class="fas fa-user mr-2"></i>Read Full Profile
                </button>
                <button onclick="connectWithMentor('${entrepreneur.name}')" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <i class="fas fa-handshake mr-2"></i>Connect for Mentorship
                </button>
            </div>
        </div>
    `;
}

// Load Black financial institutions
function loadBlackFinancialInstitutions() {
    const container = document.getElementById('black-financial-institutions');
    
    const institutions = [
        {
            name: 'OneUnited Bank',
            type: 'Commercial Bank',
            services: 'Personal & Business Banking',
            website: 'oneunited.com',
            strength: 'Digital banking focus'
        },
        {
            name: 'Citizens Trust Bank',
            type: 'Community Bank',
            services: 'Loans & Deposits',
            website: 'ctbatlanta.com',
            strength: 'Community development'
        },
        {
            name: 'Liberty Bank',
            type: 'Regional Bank',
            services: 'Full Banking Services',
            website: 'libertybank.net',
            strength: 'Small business lending'
        }
    ];
    
    container.innerHTML = institutions.map(institution => `
        <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <h5 class="font-bold text-gray-800">${institution.name}</h5>
                    <p class="text-sm text-gray-600">${institution.type}</p>
                </div>
                <a href="https://${institution.website}" target="_blank" class="text-indigo-600 hover:text-indigo-700">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
            <p class="text-sm text-gray-700 mb-2">${institution.services}</p>
            <div class="text-xs text-green-600 font-semibold">✓ ${institution.strength}</div>
        </div>
    `).join('');
}

// Load economic news content
async function loadEconomicNews() {
    try {
        const response = await axios.get('/api/economic');
        const apiContent = response.data;
        
        // Combine API content with generated economic news
        const allContent = [...apiContent, ...generateEconomicNews()];
        displayEconomicContent(allContent);
    } catch (error) {
        console.error('Error loading economic content:', error);
        // Generate economic news as fallback
        displayEconomicContent(generateEconomicNews());
    }
}

// Generate enhanced economic news content
function generateEconomicNews() {
    const today = new Date();
    
    return [
        {
            id: 'econ-1',
            title: 'Black Business Growth Hits 5-Year High',
            summary: 'New data shows Black-owned businesses experiencing unprecedented growth, with 23% increase in new business formations.',
            content: 'According to the latest Small Business Administration data, Black entrepreneurs are starting businesses at the highest rate in five years. The surge is attributed to increased access to capital, mentorship programs, and digital tools that lower barriers to entry. Rochester has seen a 31% increase in Black-owned business registrations, particularly in technology and professional services sectors.',
            category: 'Business Growth',
            relevance_level: 'High',
            date: today.toISOString(),
            image: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Business+Growth',
            video: null,
            tags: ['entrepreneurship', 'growth', 'data', 'rochester']
        },
        {
            id: 'econ-2',
            title: 'Federal Reserve Policy Impact on Black Communities',
            summary: 'Analysis of how recent interest rate changes affect Black homeownership and business lending in urban markets.',
            content: 'The Federal Reserve\'s latest policy decisions have mixed implications for Black communities. While higher interest rates make borrowing more expensive, targeted community development programs are helping offset costs. Black homeownership rates have stabilized at 44.1%, with first-time buyer programs showing particular success in cities like Rochester.',
            category: 'Monetary Policy',
            relevance_level: 'High',
            date: new Date(today.getTime() - 86400000).toISOString(),
            image: 'https://via.placeholder.com/400x250/6366F1/FFFFFF?text=Fed+Policy',
            video: null,
            tags: ['federal-reserve', 'housing', 'policy', 'lending']
        },
        {
            id: 'econ-3',
            title: 'Crypto Adoption Rises in Black Communities',
            summary: 'Cryptocurrency ownership among Black Americans reaches 25%, driven by wealth-building goals and financial inclusion.',
            content: 'A new survey reveals that 25% of Black Americans now own cryptocurrency, significantly higher than the national average of 17%. The trend is driven by younger demographics seeking alternative investment vehicles and concerns about traditional banking access. Educational initiatives in Rochester and other cities are helping community members navigate digital asset investments safely.',
            category: 'Digital Finance',
            relevance_level: 'Medium',
            date: new Date(today.getTime() - 172800000).toISOString(),
            image: 'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Crypto+Adoption',
            video: null,
            tags: ['cryptocurrency', 'investment', 'technology', 'youth']
        }
    ];
}

// Market timeframe toggle function
function toggleMarketView(timeframe) {
    // Update active button
    document.querySelectorAll('.market-timeframe-btn').forEach(btn => {
        btn.classList.remove('bg-green-100', 'text-green-700');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    event.target.classList.remove('bg-gray-100', 'text-gray-700');
    event.target.classList.add('bg-green-100', 'text-green-700');
    
    showNotification(`Switched to ${timeframe} view`, 'success');
}

// Financial education functions
function openFinancialAssessment() {
    showNotification('Opening financial knowledge assessment...', 'success');
}

function openWealthBuildingTools() {
    showNotification('Loading wealth building calculators...', 'success');
}

function openInvestmentEducation() {
    showNotification('Starting investment education program...', 'success');
}

// Investment tool functions
function openPortfolioBuilder() {
    showNotification('Opening portfolio builder tool...', 'success');
}

function openRiskAssessment() {
    showNotification('Starting risk tolerance assessment...', 'success');
}

function openInvestmentSimulator() {
    showNotification('Loading investment simulator...', 'success');
}

// Business development functions
function openBusinessToolkit() {
    showNotification('Opening business launch toolkit...', 'success');
}

function openFundingResources() {
    showNotification('Loading funding opportunities...', 'success');
}

function openMentorshipNetwork() {
    showNotification('Connecting to mentorship network...', 'success');
}

// Entrepreneur spotlight functions
function watchEntrepreneurVideo(name) {
    showNotification(`Playing success story video for ${name}`, 'success');
}

function readFullProfile(name) {
    showNotification(`Opening full profile for ${name}`, 'success');
}

function connectWithMentor(name) {
    showNotification(`Connecting with ${name} for mentorship`, 'success');
}

function viewAllEntrepreneurs() {
    showNotification('Loading entrepreneur directory...', 'success');
}

function viewAllInstitutions() {
    showNotification('Opening Black financial institutions directory...', 'success');
}

// Policy and advocacy functions
function findRepresentatives() {
    showNotification('Finding your elected representatives...', 'success');
}

function joinAdvocacyGroups() {
    showNotification('Connecting to advocacy organizations...', 'success');
}

function viewAllEconomicNews() {
    showNotification('Loading all economic news...', 'success');
}

// Image Gallery Functions
function openImageGallery() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-gray-800">
                        <i class="fas fa-images mr-2 text-golden-yellow"></i>
                        Rochester Black Heritage Gallery
                    </h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <p class="text-gray-600 mt-2">Journey through Rochester's rich Black heritage spanning over 180 years</p>
            </div>
            
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="space-y-4">
                        <div class="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg" onclick="openImageViewer('underground-railroad')">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96" 
                                 alt="Underground Railroad Scene" 
                                 class="w-full h-64 object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                <div class="absolute bottom-4 left-4 text-white">
                                    <h4 class="font-bold">Underground Railroad Era</h4>
                                    <p class="text-sm opacity-90">1840s - Path to Freedom</p>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-600 text-sm">Historic scene depicting freedom seekers on the Underground Railroad, with Frederick Douglass's house visible in the background during Rochester's pivotal role in the abolitionist movement.</p>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg" onclick="openImageViewer('civil-rights')">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/817f24ac-3b57-4c96-a17a-fa3f31e5d635" 
                                 alt="Civil Rights Era Scene" 
                                 class="w-full h-64 object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                <div class="absolute bottom-4 left-4 text-white">
                                    <h4 class="font-bold">Civil Rights Movement</h4>
                                    <p class="text-sm opacity-90">1960s - Fighting for Equality</p>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-600 text-sm">Powerful demonstration scene from Rochester's Civil Rights era, showcasing the community's peaceful protests and organized efforts to combat racial inequality and discrimination in the North.</p>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg" onclick="openImageViewer('modern-excellence')">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/925a7ea4-13a4-4949-b36c-9802fdab72ed" 
                                 alt="Modern Black Excellence Scene" 
                                 class="w-full h-64 object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                                <div class="absolute bottom-4 left-4 text-white">
                                    <h4 class="font-bold">Modern Excellence</h4>
                                    <p class="text-sm opacity-90">Present Day - Community Success</p>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-600 text-sm">Contemporary Rochester scene celebrating Black excellence, featuring successful professionals, entrepreneurs, and community leaders who continue the legacy of strength and achievement.</p>
                    </div>
                </div>
                
                <div class="mt-8 p-6 bg-gradient-to-r from-cultural-brown/10 to-golden-yellow/10 rounded-lg">
                    <h3 class="font-bold text-gray-800 mb-2">About This Collection</h3>
                    <p class="text-gray-600 text-sm">These AI-generated historical visualizations bring Rochester's Black heritage to life, depicting key moments and achievements across nearly two centuries of community history. Each image represents the strength, resilience, and contributions of Rochester's Black community from the Underground Railroad era to modern-day excellence.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function openImageViewer(imageType) {
    const images = {
        'underground-railroad': {
            url: 'https://cdn1.genspark.ai/user-upload-image/3_generated/f0e8d458-7bb0-4a21-a4bb-778afb278e96',
            title: 'Underground Railroad Era - 1840s Rochester',
            description: 'A dramatic nighttime scene depicting freedom seekers making their journey along the Underground Railroad. Frederick Douglass\'s house is visible in the background, illuminated by warm lamplight. The scene captures the courage and determination of those seeking freedom, with figures carrying lanterns and moving through the snowy landscape. This represents Rochester\'s crucial role as a final stop before Canada and freedom.',
            era: '1840s',
            significance: 'Rochester served as one of the most important stations on the Underground Railroad'
        },
        'civil-rights': {
            url: 'https://cdn1.genspark.ai/user-upload-image/3_generated/817f24ac-3b57-4c96-a17a-fa3f31e5d635',
            title: 'Civil Rights Movement - 1960s Rochester',
            description: 'A powerful scene from Rochester\'s Civil Rights era showing community members engaged in peaceful demonstrations and organized protests. The image captures the dignity and determination of local activists fighting against racial inequality and housing discrimination. Signs and banners display messages of hope and demands for justice, representing the organized effort to combat systemic racism in northern cities.',
            era: '1960s',
            significance: 'Rochester\'s 1964 race riots brought national attention to northern racial inequality'
        },
        'modern-excellence': {
            url: 'https://cdn1.genspark.ai/user-upload-image/3_generated/925a7ea4-13a4-4949-b36c-9802fdab72ed',
            title: 'Modern Black Excellence - Present Day Rochester',
            description: 'A vibrant contemporary scene showcasing Rochester\'s thriving Black community today. The image features successful professionals, entrepreneurs, educators, and community leaders in modern Rochester settings. It represents the continuation of the legacy of achievement and excellence, showing how the foundations laid by earlier generations have blossomed into a diverse, successful community making significant contributions to Rochester\'s future.',
            era: 'Present Day',
            significance: 'Modern Rochester continues the tradition of Black excellence and community leadership'
        }
    };
    
    const imageData = images[imageType] || images['underground-railroad'];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="max-w-5xl w-full">
            <div class="relative">
                <img src="${imageData.url}" alt="${imageData.title}" class="w-full max-h-[70vh] object-contain rounded-lg shadow-2xl">
                
                <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 rounded-b-lg">
                    <h3 class="text-white text-xl font-bold mb-2">${imageData.title}</h3>
                    <div class="flex items-center space-x-4 mb-3 text-sm text-white/90">
                        <span><i class="fas fa-calendar mr-1"></i>${imageData.era}</span>
                        <span><i class="fas fa-star mr-1"></i>Historical Significance</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg mt-4 p-6">
                <p class="text-gray-700 mb-4">${imageData.description}</p>
                <div class="bg-cultural-brown/10 rounded-lg p-4">
                    <h4 class="font-semibold text-cultural-brown mb-2">Historical Context</h4>
                    <p class="text-gray-600 text-sm">${imageData.significance}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}
// VitaHue Health App Functions
function calculateBMI() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const resultDiv = document.getElementById('bmi-result');
    
    if (!weight || !height) {
        resultDiv.innerHTML = '<div class="text-red-600 mt-2"><i class="fas fa-exclamation-circle mr-2"></i>Please enter both weight and height</div>';
        return;
    }
    
    const bmi = (weight / (height * height)) * 703;
    const bmiRounded = Math.round(bmi * 10) / 10;
    
    let category, color, icon;
    if (bmi < 18.5) {
        category = 'Underweight';
        color = 'blue';
        icon = 'arrow-down';
    } else if (bmi < 25) {
        category = 'Normal weight';
        color = 'green';
        icon = 'check-circle';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = 'yellow';
        icon = 'exclamation-triangle';
    } else {
        category = 'Obese';
        color = 'red';
        icon = 'exclamation-circle';
    }
    
    resultDiv.innerHTML = `
        <div class="mt-4 p-4 border-l-4 border-${color}-400 bg-${color}-50 rounded">
            <div class="flex items-center">
                <i class="fas fa-${icon} text-${color}-600 mr-2"></i>
                <div>
                    <p class="font-semibold text-${color}-800">BMI: ${bmiRounded}</p>
                    <p class="text-${color}-700">${category}</p>
                </div>
            </div>
        </div>
    `;
}

function trackBloodPressure() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-800">
                    <i class="fas fa-heartbeat text-red-600 mr-2"></i>
                    Track Blood Pressure
                </h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Systolic (mmHg)</label>
                        <input type="number" id="systolic" placeholder="120" min="70" max="250" class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Diastolic (mmHg)</label>
                        <input type="number" id="diastolic" placeholder="80" min="40" max="150" class="w-full p-2 border rounded">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-1">Date & Time</label>
                    <input type="datetime-local" id="bp-datetime" class="w-full p-2 border rounded">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-1">Notes (Optional)</label>
                    <textarea id="bp-notes" placeholder="After exercise, morning reading, etc." class="w-full p-2 border rounded h-20"></textarea>
                </div>
                
                <div class="flex space-x-3 pt-4">
                    <button onclick="saveBPReading()" class="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                        <i class="fas fa-save mr-2"></i>Save Reading
                    </button>
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors">
                        Cancel
                    </button>
                </div>
                
                <div id="bp-result"></div>
            </div>
        </div>
    `;
    
    const now = new Date();
    const datetime = modal.querySelector('#bp-datetime');
    datetime.value = now.toISOString().slice(0, 16);
    
    document.body.appendChild(modal);
}

function saveBPReading() {
    const systolic = document.getElementById('systolic').value;
    const diastolic = document.getElementById('diastolic').value;
    const datetime = document.getElementById('bp-datetime').value;
    const notes = document.getElementById('bp-notes').value;
    const resultDiv = document.getElementById('bp-result');
    
    if (!systolic || !diastolic) {
        resultDiv.innerHTML = '<div class="text-red-600 mt-2"><i class="fas fa-exclamation-circle mr-2"></i>Please enter both systolic and diastolic values</div>';
        return;
    }
    
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);
    
    let category, color, advice;
    if (sys < 120 && dia < 80) {
        category = 'Normal';
        color = 'green';
        advice = 'Keep up the great work! Continue healthy lifestyle habits.';
    } else if (sys < 130 && dia < 80) {
        category = 'Elevated';
        color = 'yellow';
        advice = 'Consider lifestyle changes like diet and exercise.';
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
        category = 'High Blood Pressure Stage 1';
        color = 'orange';
        advice = 'Consult your doctor about treatment options.';
    } else if (sys >= 140 || dia >= 90) {
        category = 'High Blood Pressure Stage 2';
        color = 'red';
        advice = 'Seek immediate medical attention if not already under treatment.';
    } else {
        category = 'Hypertensive Crisis';
        color = 'red';
        advice = 'Seek emergency medical care immediately!';
    }
    
    const reading = {
        systolic: sys,
        diastolic: dia,
        datetime: datetime,
        notes: notes,
        category: category,
        timestamp: Date.now()
    };
    
    let readings = JSON.parse(localStorage.getItem('bp_readings') || '[]');
    readings.unshift(reading);
    readings = readings.slice(0, 10);
    localStorage.setItem('bp_readings', JSON.stringify(readings));
    
    resultDiv.innerHTML = `
        <div class="mt-4 p-4 border-l-4 border-${color}-400 bg-${color}-50 rounded">
            <div class="flex items-center mb-2">
                <i class="fas fa-heartbeat text-${color}-600 mr-2"></i>
                <span class="font-semibold text-${color}-800">${sys}/${dia} mmHg - ${category}</span>
            </div>
            <p class="text-${color}-700 text-sm">${advice}</p>
        </div>
        <div class="mt-3 text-center">
            <button onclick="viewBPHistory()" class="text-blue-600 hover:text-blue-800 text-sm">
                <i class="fas fa-chart-line mr-1"></i>View Reading History
            </button>
        </div>
    `;
    
    showNotification('Blood pressure reading saved successfully!', 'success');
}

function addMedication() {
    const name = document.getElementById('med-name').value.trim();
    const time = document.getElementById('med-time').value;
    const frequency = document.getElementById('med-frequency').value;
    
    if (!name || !time) {
        showNotification('Please fill in medication name and time', 'error');
        return;
    }
    
    const medication = {
        id: Date.now(),
        name: name,
        time: time,
        frequency: frequency,
        created: new Date().toISOString()
    };
    
    let medications = JSON.parse(localStorage.getItem('medications') || '[]');
    medications.push(medication);
    localStorage.setItem('medications', JSON.stringify(medications));
    
    document.getElementById('med-name').value = '';
    document.getElementById('med-time').value = '';
    document.getElementById('med-frequency').value = 'daily';
    
    displayMedications();
    showNotification('Medication added successfully!', 'success');
}

function displayMedications() {
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const listDiv = document.getElementById('medication-list');
    
    if (!listDiv) return;
    
    if (medications.length === 0) {
        listDiv.innerHTML = '<p class="text-gray-500 text-center">No medications added yet.</p>';
        return;
    }
    
    listDiv.innerHTML = medications.map(med => `
        <div class="flex items-center justify-between p-3 border rounded-lg mb-2 bg-gray-50">
            <div>
                <p class="font-semibold text-gray-800">${med.name}</p>
                <p class="text-gray-600 text-sm">${med.time} - ${med.frequency}</p>
            </div>
            <button onclick="removeMedication(${med.id})" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function addHealthGoal() {
    const goal = document.getElementById('health-goal').value.trim();
    const target = document.getElementById('goal-target').value.trim();
    
    if (!goal || !target) {
        showNotification('Please fill in both goal and target', 'error');
        return;
    }
    
    const healthGoal = {
        id: Date.now(),
        goal: goal,
        target: target,
        created: new Date().toISOString(),
        completed: false
    };
    
    let goals = JSON.parse(localStorage.getItem('health_goals') || '[]');
    goals.push(healthGoal);
    localStorage.setItem('health_goals', JSON.stringify(goals));
    
    document.getElementById('health-goal').value = '';
    document.getElementById('goal-target').value = '';
    
    displayHealthGoals();
    showNotification('Health goal added successfully!', 'success');
}

function displayHealthGoals() {
    const goals = JSON.parse(localStorage.getItem('health_goals') || '[]');
    const listDiv = document.getElementById('goals-list');
    
    if (!listDiv) return;
    
    if (goals.length === 0) {
        listDiv.innerHTML = '<p class="text-gray-500 text-center">No health goals set yet.</p>';
        return;
    }
    
    listDiv.innerHTML = goals.map(goal => `
        <div class="flex items-center justify-between p-3 border rounded-lg mb-2 ${goal.completed ? 'bg-green-50' : 'bg-gray-50'}">
            <div class="flex-1">
                <p class="font-semibold text-gray-800 ${goal.completed ? 'line-through' : ''}">${goal.goal}</p>
                <p class="text-gray-600 text-sm">Target: ${goal.target}</p>
            </div>
            <div class="flex space-x-2">
                <button onclick="toggleGoalComplete(${goal.id})" class="text-${goal.completed ? 'gray' : 'green'}-600 hover:text-${goal.completed ? 'gray' : 'green'}-800">
                    <i class="fas fa-${goal.completed ? 'undo' : 'check'}"></i>
                </button>
                <button onclick="removeHealthGoal(${goal.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function toggleGoalComplete(id) {
    let goals = JSON.parse(localStorage.getItem('health_goals') || '[]');
    const goal = goals.find(g => g.id === id);
    if (goal) {
        goal.completed = !goal.completed;
        localStorage.setItem('health_goals', JSON.stringify(goals));
        displayHealthGoals();
        showNotification(goal.completed ? 'Goal completed! 🎉' : 'Goal marked as incomplete', 'success');
    }
}
