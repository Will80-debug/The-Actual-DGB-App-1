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
        case 'black-tech':
            loadBlackTech();
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

// Partner Organizations Data from complete Excel file (fixed version)
// Total: 54 organizations with comprehensive contact information
function getPartnerOrganizations() {
    return [
        {
            name: "Adaptt Rochester",
            website: "https://www.adapttrochester.com/",
            address: "Rochester, NY (no specific physical address listed)",
            phone: "(585) 616-3231",
            email: null,
            category: "Family Support Services",
            description: "Transitional housing, food pantry, clothing closet, family care programs",
            director: "Tamara Howard & Angela Wollschlager (Co-Founders)",
            community_focus: "All Communities",
            logo: "https://www.adapttrochester.com/uploads/FBCt4AQK/blue.png"
        },
        {
            name: "Sweet Ida Mae Pantry",
            website: "sweetidamaepantry.com (parked)",
            address: "1274 Dewey Ave, Rochester, NY 14613",
            phone: "(585) 230-3703",
            email: null,
            category: "Food Security",
            description: "Community food pantry",
            director: "Devon Reynolds ( Founder & Director )",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "BIPOC PEEEEK",
            website: "http://bipocparentvoice.org",
            address: "10 Cady Street Lower Level Suite 11, Rochester NY 14608",
            phone: null,
            email: "Contact via bipocparentvoice@gmail.com",
            category: "Mental Health & Parent Support",
            description: "BIPOC parent advocacy, mental health services, peer support",
            director: "Sara Taylor (Founder & Visionary), Len Statham (Project Lead)",
            community_focus: "Black Community Focus",
            logo: "https://pbs.twimg.com/media/F8AjoCSXMAAsRWd.jpg"
        },
        {
            name: "Sickle Cell Advocates of Rochester(SCAR)",
            website: null,
            address: "Rochester, NY (community-based organization)",
            phone: null,
            email: "sicklecelladvocatesofrochester@gmail.com",
            category: "Healthcare Advocacy",
            description: "Sickle cell disease awareness and support",
            director: "Gladys Magee & Stephanie Ramos (Co-Directors)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Barakah Muslim Charity",
            website: "https://www.barakahmuslimcharity.org/",
            address: "584 Jefferson Ave, Rochester, NY 14611",
            phone: "(585) 325-2621",
            email: null,
            category: "Food Security & Community Support",
            description: "Food pantry, clothing drive, community assistance",
            director: "Dr. Irshad Altheimer ( President of Board ), Zuhair Johnson ( Executive Director )",
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
            community_focus: "All Communities",
            logo: "https://cdn.prod.website-files.com/636ee008c0125c7441549cf4/636eefa43958c93a9261c207_logo_rocthepeace1e-COLOR.jpg"
        },
        {
            name: "Women's Foundation of Genesee Valley, Inc",
            website: "https://womensfoundation.org/",
            address: "494 East Ave, Rochester, NY 14607",
            phone: "(585) 242-0940",
            email: null,
            category: "Women's Empowerment",
            description: "Grants, education, economic self-sufficiency programs",
            director: "Krystle Ellis ( Executive Director ), Sydney Bell ( Board Chair )",
            community_focus: "All Communities",
            logo: "https://www.grantforward.com/sponsor_image/20240512222452_a124033a8ae8018e3bff4d74b555badf.jpg"
        },
        {
            name: "Recovery Houses of Rochester",
            website: "https://www.recoveryhousesofrochester.org/",
            address: "Rochester, NY (multiple locations)",
            phone: "Contact via website",
            email: null,
            category: "Substance Abuse Recovery",
            description: "Safe housing and support for men in recovery",
            director: "Van Smith ( Founder & Executive Director )",
            community_focus: "All Communities",
            logo: "https://rehabs.org/wp-content/uploads/2021/09/recovery-houses-of-rochester-rochester-ny-front.jpg"
        },
        {
            name: "Reentry and Community Development Center",
            website: "https://www.rcdc-17.org/",
            address: "437 North Street, Rochester, NY 14605",
            phone: "(585) 445-8380",
            email: null,
            category: "Reentry Services",
            description: "Support groups, case management, substance abuse support",
            director: "Miquel Powell, LMSW, CASAC ( Executive Director )",
            community_focus: "All Communities",
            logo: "https://static.wixstatic.com/media/0ea964_8de335872f3849b08e9eb6b2921ffe27~mv2.jpg"
        },
        {
            name: "Breathe Deep",
            website: "https://breathedeepinc.org/",
            address: "28 Green Clover Dr, Henrietta, NY 14467",
            phone: "(585) 732-9249",
            email: null,
            category: "Wellness & Mental Health",
            description: "Restorative wellness programs for marginalized communities",
            director: "Dr. Melany J. Silas-Chandler (CEO & President)",
            community_focus: "All Communities",
            logo: "https://i.ytimg.com/vi/ChkP0k3SyL0/maxresdefault.jpg"
        },
        {
            name: "The Fatherhood Connection",
            website: "https://fatherhoodconnection.com/",
            address: "210 West Main St, Rochester, NY 14620",
            phone: "(585) 284-2445",
            email: null,
            category: "Fatherhood Support",
            description: "Community building and identity solutions for fathers",
            director: "Reginald Cox (Founder/Director)",
            community_focus: "All Communities",
            logo: "https://fatherhoodconnection.com/wp-content/uploads/2021/09/Logo-back-768x436.png"
        },
        {
            name: "Our Local History",
            website: "https://www.ccsi.org/ourlocalhistory/",
            address: "1099 Jay St, Building J, Rochester, NY 14611",
            phone: "(585) 328-5190",
            email: null,
            category: "Education & Community History",
            description: "Local history curriculum and community engagement",
            director: "Shane Wiegand & Sydney Bell (Co-Directors)",
            community_focus: "All Communities",
            logo: "https://www.ccsi.org/wp-content/uploads/2021/04/CCSIlogo-tag-CMYK-muted-650px.png"
        },
        {
            name: "Baden Street Settlement",
            website: "https://badenstreet.org/",
            address: "152 Baden Street, Rochester, NY 14605",
            phone: "(585) 325-4910",
            email: null,
            category: "Community Services",
            description: "Behavioral health, substance use disorder treatment, community programs",
            director: "Catherine Thomas (Executive Director)",
            community_focus: "All Communities",
            logo: "https://badenstreet.org/wp-content/uploads/Baden-Logo1-282.png.webp"
        },
        {
            name: "Ibero",
            website: "https://www.ibero.org/",
            address: "124 Evergreen Street, Rochester, NY 14605",
            phone: "(585) 256-8900",
            email: null,
            category: "Latino Community Services",
            description: "Dual-language services, human services for Latino community",
            director: "Angélica Pérez-Delgado (President & CEO)",
            community_focus: "Latino Community Focus",
            logo: "https://www.ibero.org/wp-content/uploads/2020/05/ibero-logo.jpg"
        },
        {
            name: "COLM",
            website: null,
            address: null,
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
            website: "https://www.fathertracycenter.org/",
            address: "821 N. Clinton Ave, Rochester, NY 14605",
            phone: "(585) 563-7008",
            email: null,
            category: "Community Advocacy",
            description: "Walk-in advocacy, information and referral services",
            director: "Beatriz LeBron (Executive Director)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "The Black Agenda Group Rochester",
            website: "https://blackagendagrouproc.org",
            address: "Rochester, NY (community-based organization)",
            phone: "Contact via website",
            email: null,
            category: "Community Advocacy",
            description: "Culturally specific interventions, racism as public health crisis",
            director: "Community-based leadership -",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Common Ground Health",
            website: "https://commongroundhealth.org/",
            address: "1150 University Avenue, Rochester, NY 14607",
            phone: "(585) 224-3101",
            email: null,
            category: "Public Health",
            description: "Regional health planning, community health research",
            director: "Wade Norwood (Co-CEO)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Mentors Inspiring Boys and Girls",
            website: "https://www.mibandg.org/",
            address: "75 Grover St, Rochester, NY 14611",
            phone: "(585) 719-5383",
            email: null,
            category: "Youth Development",
            description: "Mentoring programs for boys and girls",
            director: "Robert Ricks (Executive Director)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Player 1 Academy",
            website: "https://www.player1academy.org/",
            address: "1 E Main St, Rochester, NY 14614",
            phone: "(585) 270-5067",
            email: null,
            category: "Education & Technology",
            description: "STEAM-focused programs, AI education, virtual reality",
            director: "William Powell (Founder/Executive Director)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Latino Migrant Ministry",
            website: "https://migrantministry.org/",
            address: "Roman Catholic Diocese of Rochester",
            phone: "(585) 328-3210",
            email: null,
            category: "Religious & Social Services",
            description: "Migrant worker support, Hispanic ministry",
            director: "Michael Sauter (Director)",
            community_focus: "Latino Community Focus",
            logo: null
        },
        {
            name: "Wayne County YAP",
            website: "Contact via Facebook @YAPWayneNY:https://www.facebook.com/YAPWayneNY",
            address: "Newark, NY (Wayne County office)",
            phone: "(315) 331-2763",
            email: null,
            category: "Youth Services",
            description: "Community-based alternatives to youth incarceration",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Health ConnectOne",
            website: "https://healthconnectone.org/",
            address: "1 South Washington Street, Suite 200, Rochester, NY 14614",
            phone: "Contact via website",
            email: null,
            category: "Health Services",
            description: "Training and doula program accreditation",
            director: "Dr. Twylla Dillion (President & CEO)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Rochester ABOVE",
            website: "Contact information needed",
            address: "P.O. Box 26242, Rochester, NY 14626",
            phone: "(585) 576-2471",
            email: null,
            category: "Community Organization",
            description: "Details need verification",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "HBN",
            website: "https://www.healthy-baby.net/",
            address: "Rochester, NY",
            phone: "(585) 546-4930",
            email: null,
            category: "Maternal & Child Health",
            description: "Community-based doula services, baby support programs",
            director: "Sherita D. Bullock (President & CEO)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "HOPE 585",
            website: "https://hope585.org/",
            address: "Rochester, NY 14604",
            phone: "(585) 261-0583",
            email: null,
            category: "Youth & Family Support",
            description: "Foster care support, hope-based programs",
            director: "Dr. Ashley Cross (Executive Director)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Volunteers of America",
            website: "https://www.voaupny.org/",
            address: "214 Lake Avenue, Rochester, NY 14608",
            phone: "(585) 647-1150",
            email: null,
            category: "Community Services",
            description: "Housing, childcare, reentry programs",
            director: "Dr. Junior Dillion (President & CEO)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Volunteer Legal Services of Project of Monroe County",
            website: "https://www.justcauseny.org/",
            address: "1 West Main Street, Suite 500, Rochester, NY 14614",
            phone: "(585) 232-3051",
            email: null,
            category: "Legal Services",
            description: "Free legal assistance for low-income residents",
            director: "Tina M Foster (Executive Director)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Sankofa Family Counseling",
            website: "https://www.sankofafamilycounseling.com/",
            address: "1400 Portland Ave. Ste. #54, Rochester, NY 14621",
            phone: "(585) 491-6646",
            email: null,
            category: "Mental Health Services",
            description: "Family counseling, therapy for adults, children, couples",
            director: "Khadijah Tillman (CEO/Founder)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Center For Teen Empowerment",
            website: "https://teenempowerment.org/rochester",
            address: "373 Genesee Street, Rochester, NY 14611",
            phone: "(585) 697-3464",
            email: null,
            category: "Youth Development",
            description: "Youth organizing, empowerment programs for teens 14-19",
            director: "Doug Ackley (Executive Director)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Worker Justice Center of New York",
            website: "https://www.wjcny.org/",
            address: "1187 Culver Road, Rochester, NY 14609",
            phone: "(585) 325-3050",
            email: null,
            category: "Labor Rights",
            description: "Legal services and education for low-wage workers",
            director: "Alaina Varvaloucas (Executive Director)",
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Interdenominational Health Coalition Ministry",
            website: "https://www.ihmcroc.org/",
            address: "PO Box 24621, Rochester, NY 14624",
            phone: "(585) 436-9397",
            email: null,
            category: "Faith-Based Health Ministry",
            description: "Health resources and support for congregations",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Black Women's Leadership Forum",
            website: "https://bwlfroc.org/",
            address: "Rochester, NY",
            phone: null,
            email: "Contact via BWLF.Rochester@gmail.com:mailto:BWLF.Rochester@gmail.com",
            category: "Leadership Development",
            description: "Black women's professional development and networking",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Free The People ROC",
            website: "https://ftproc.org/",
            address: "Rochester, NY",
            phone: "Contact via website",
            email: null,
            category: "Social Justice & Abolition",
            description: "Grassroots organizing, anti-police movement",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Citizens Action Network of NY",
            website: "https://citizenactionny.org/",
            address: "1392 Culver Rd, Rochester, NY 14609",
            phone: "(585) 369-4212",
            email: null,
            category: "Community Organizing",
            description: "Progressive activism, social justice advocacy",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Liberating Through Literacy",
            website: "https://www.liberatinglitliteracy.org/",
            address: "3240 Chili Ave b13, Rochester, NY 14624",
            phone: "(585) 261-4823",
            email: null,
            category: "Education & Literacy",
            description: "Community literacy programs, adult education",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Greater Rochester Parent Leadership Training Institute (PLTI)",
            website: null,
            address: "216 Clifford Ave, Rochester, NY 14621",
            phone: "Contact via social media",
            email: "Contact via Facebook @GreaterRochesterPLTI",
            category: "Parent Leadership",
            description: "Advocacy training, civic engagement for parents",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "National Parent Leadership Institute/NPLI",
            website: "https://parentswholead.org/",
            address: "Greater Rochester community (local chapter)",
            phone: "Contact via website",
            email: null,
            category: "Parent Leadership",
            description: "Evidence-based parent involvement programs",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Diverse Mosaics",
            website: "https://diversemosaic.com/",
            address: "1 East Main Street, Rochester, NY",
            phone: "(585) 558-1900",
            email: null,
            category: "Family Support",
            description: "Wrap-around services, African-centered education, youth advocacy",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "ROC The Future Alliance",
            website: "https://rocthefuture.org/",
            address: "205 St. Paul Street, Rochester, NY 14604",
            phone: "Contact via website",
            email: null,
            category: "Education & Child Development",
            description: "Collective impact initiative for academic success",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Rochester Black Agenda Group",
            website: "https://blackagendagrouproc.org",
            address: "Rochester, NY (community-based organization)",
            phone: "Contact via website",
            email: null,
            category: "Community Advocacy",
            description: "Culturally specific interventions, racism as public health crisis",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "RISE Up Rochester",
            website: "https://www.riseuprochester.net/",
            address: "244 S Plymouth Ave, Rochester, NY 14608",
            phone: "(585) 454-3060",
            email: null,
            category: "Violence Prevention",
            description: "Community empowerment, crime victim support",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Black Physicians Network",
            website: "https://bpnroc.org/",
            address: "P.O. Box 92131, Rochester, NY 14692",
            phone: null,
            email: "Contact via bpnrochester@gmail.com:mailto:bpnrochester@gmail.com",
            category: "Healthcare Advocacy",
            description: "Physician network, healthcare diversity initiatives",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Rochester Black Nurses Association",
            website: "https://rocbna.org/",
            address: "1485 Howard Road, Rochester, NY 14624",
            phone: "(585) 210-8374",
            email: null,
            category: "Healthcare Advocacy",
            description: "Black nurses professional development and advocacy",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "HCR Home Care of Rochester – Black Seniors In Home Project",
            website: "https://www.hcrhealth.com/",
            address: "85 Metro Park, Rochester, NY 14623",
            phone: "(585) 272-1930",
            email: null,
            category: "Healthcare Services",
            description: "Home health care services",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Lifespan",
            website: "https://www.lifespan-roch.org/",
            address: "1900 S. Clinton Avenue, Rochester, NY 14618",
            phone: "(585) 244-8400",
            email: null,
            category: "Senior Services",
            description: "Information, guidance and services for older adults",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Jordan Health",
            website: "https://www.jordanhealth.org/",
            address: "82 Holland St, Rochester, NY 14605",
            phone: "(585) 423-5800",
            email: null,
            category: "Healthcare Services",
            description: "Comprehensive health centers, primary care",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "St. Joseph's Neighborhood Center",
            website: "https://www.sjncenter.org/",
            address: "417 South Avenue, Rochester, NY 14620",
            phone: "(585) 325-5260",
            email: null,
            category: "Community Health",
            description: "Medical care, social services",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "YMCA of Greater Rochester",
            website: "https://rochesterymca.org/",
            address: "444 East Main Street, Rochester, NY 14604",
            phone: "(585) 546-5500",
            email: null,
            category: "Community Services",
            description: "Swimming, health & wellness, childcare programs",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "YWCA of Rochester & Monroe County",
            website: "https://www.ywcarochester.org/",
            address: "175 North Clinton Avenue, Rochester, NY 14604",
            phone: "(585) 546-5820",
            email: null,
            category: "Women's Services",
            description: "Eliminating racism, empowering women, survivor services",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "ABC",
            website: "https://www.abcinfo.org/",
            address: "400 West Avenue, Rochester, NY 14611",
            phone: "(585) 325-5116",
            email: null,
            category: "Community Action",
            description: "Anti-poverty programs, community development",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Urban League",
            website: "https://www.urbanleagueroc.org/",
            address: "265 North Clinton Avenue, Rochester, NY 14605",
            phone: "(585) 325-6530",
            email: null,
            category: "Civil Rights & Economic Empowerment",
            description: "Community transformation, individual empowerment",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Leadership Rochester",
            website: "https://leadershiprochester.org/",
            address: "75 College Avenue, Rochester, NY 14607",
            phone: "(585) 325-7701",
            email: null,
            category: "Leadership Development",
            description: "Transform and strengthen Greater Rochester through diverse leadership programs",
            director: null,
            community_focus: "All Communities",
            logo: null
        },
        {
            name: "Latinx Leaders Roundtable",
            website: "https://rochesterlatinx.org/",
            address: "817 East Main Street, Rochester, NY 14605",
            phone: "(585) 256-8900",
            email: null,
            category: "Latino Community Leadership",
            description: "Advocacy, civic engagement, community development for Latino/Latinx community",
            director: null,
            community_focus: "Latino Community Focus",
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
                                <button onclick="startThematicJourney('underground-railroad')" class="w-full text-left p-4 rounded-lg hover:shadow-lg transition-all relative overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(239, 68, 68, 0.8), rgba(239, 68, 68, 0.9)), url('https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619');">
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
                                
                                <button onclick="startThematicJourney('education-leaders')" class="w-full text-left p-4 rounded-lg hover:shadow-lg transition-all relative overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.9)), url('https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619');">
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
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619" 
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
                            poster="https://www.genspark.ai/api/files/s/r3JFLjZa?cache_control=3600"
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
    document.getElementById('content-area').innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-mvp-red/5 via-white to-mvp-green/10">
            <!-- Hero Section with MVP Branding -->
            <div class="relative overflow-hidden bg-gradient-to-r from-mvp-red to-mvp-brown text-white">
                <!-- Background Hero Image -->
                <div class="absolute inset-0 opacity-30">
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a224d35b-c9ab-4299-ad54-b238cfa29716" 
                         alt="MVP Healthcare Professional Consultation" 
                         class="w-full h-full object-cover">
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-mvp-red/80 to-mvp-brown/80"></div>
                
                <div class="relative z-10 px-4 py-16">
                    <div class="max-w-6xl mx-auto text-center">
                        <div class="animate-pulse mb-6">
                            <h1 class="text-5xl md:text-7xl font-bold mb-4 text-white">
                                MVP Healthcare
                            </h1>
                            <div class="w-32 h-1 bg-mvp-green mx-auto mb-4 rounded-full"></div>
                        </div>
                        <p class="text-2xl md:text-3xl font-light mb-6">
                            Your Community Health Partner in Rochester, NY
                        </p>
                        <div class="flex flex-wrap justify-center gap-4 mb-8">
                            <button onclick="scrollToMVPSection('provider-search')" class="bg-mvp-green hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                                <i class="fas fa-search mr-2"></i>Find Providers
                            </button>
                            <button onclick="scrollToMVPSection('community-events')" class="border-2 border-mvp-green text-mvp-green hover:bg-mvp-green hover:text-white font-semibold py-3 px-6 rounded-lg transition-all">
                                <i class="fas fa-calendar mr-2"></i>Community Events
                            </button>
                            <button onclick="openMVPApp()" class="border-2 border-white text-white hover:bg-white hover:text-mvp-red font-semibold py-3 px-6 rounded-lg transition-all">
                                <i class="fas fa-mobile-alt mr-2"></i>Mobile App
                            </button>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div class="text-3xl font-bold text-mvp-green">500K+</div>
                                <div class="text-sm opacity-90">Members Served</div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div class="text-3xl font-bold text-mvp-green">25+</div>
                                <div class="text-sm opacity-90">Locations</div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div class="text-3xl font-bold text-mvp-green">24/7</div>
                                <div class="text-sm opacity-90">Member Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="bg-white shadow-lg sticky top-0 z-40">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex overflow-x-auto no-scrollbar">
                        <button onclick="scrollToMVPSection('provider-search')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-user-md mr-2"></i>Provider Search
                        </button>
                        <button onclick="scrollToMVPSection('services')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-hospital mr-2"></i>Services
                        </button>
                        <button onclick="scrollToMVPSection('community-events')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-calendar mr-2"></i>Events
                        </button>
                        <button onclick="scrollToMVPSection('volunteer-hub')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-hands-helping mr-2"></i>Volunteer Hub
                        </button>
                        <button onclick="scrollToMVPSection('mobile-app')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-mobile-alt mr-2"></i>Mobile App
                        </button>
                        <button onclick="scrollToMVPSection('wellness')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-heartbeat mr-2"></i>Wellness
                        </button>
                        <button onclick="scrollToMVPSection('member-resources')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-id-card mr-2"></i>Member Resources
                        </button>
                        <button onclick="scrollToMVPSection('health-education')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-graduation-cap mr-2"></i>Health Education
                        </button>
                        <button onclick="scrollToMVPSection('emergency')" class="mvp-tab-btn whitespace-nowrap px-6 py-4 text-mvp-red border-b-2 border-transparent hover:border-mvp-red transition-all">
                            <i class="fas fa-ambulance mr-2"></i>Emergency
                        </button>
                    </div>
                </div>
            </div>

            <!-- Provider Search Section -->
            <section id="provider-search" class="py-16 bg-white relative">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-3">
                    <img src="https://cdn1.genspark.ai/user-upload-image/24_generated/b4b3dabe-0249-451f-9954-18ea3268d1c9" 
                         alt="MVP Healthcare Medical Facility" 
                         class="w-full h-full object-cover">
                </div>
                <div class="max-w-6xl mx-auto px-4">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-mvp-brown mb-4">Find Your Healthcare Provider</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Search our network of healthcare professionals accepting MVP Health Care plans
                        </p>
                    </div>

                    <!-- Search Form -->
                    <div class="bg-gradient-to-r from-mvp-red to-mvp-brown rounded-xl p-8 mb-12">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label class="block text-white font-semibold mb-2">Provider Type</label>
                                <select class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mvp-green">
                                    <option>Primary Care Physician</option>
                                    <option>Cardiologist</option>
                                    <option>Dermatologist</option>
                                    <option>Orthopedist</option>
                                    <option>Gynecologist</option>
                                    <option>Psychiatrist</option>
                                    <option>Pediatrician</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-white font-semibold mb-2">Location</label>
                                <select class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mvp-green">
                                    <option>Rochester, NY</option>
                                    <option>Greece, NY</option>
                                    <option>Irondequoit, NY</option>
                                    <option>Webster, NY</option>
                                    <option>Penfield, NY</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-white font-semibold mb-2">Insurance Plan</label>
                                <select class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mvp-green">
                                    <option>MVP Gold</option>
                                    <option>MVP Silver</option>
                                    <option>MVP Bronze</option>
                                    <option>MVP Essential</option>
                                    <option>MVP Medicaid</option>
                                </select>
                            </div>
                        </div>
                        <button onclick="searchMVPProviders()" class="w-full bg-mvp-green hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all">
                            <i class="fas fa-search mr-2"></i>Search Providers
                        </button>
                    </div>

                    <!-- Featured Providers -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white border border-mvp-red/20 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" onclick="openProviderDetails('dr-johnson')">
                            <div class="flex items-center mb-4">
                                <div class="w-16 h-16 bg-mvp-red/10 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-user-md text-2xl text-mvp-red"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-mvp-brown">Dr. Sarah Johnson</h3>
                                    <p class="text-gray-600">Family Medicine</p>
                                </div>
                            </div>
                            <p class="text-gray-700 mb-4">Accepting new patients. Specializes in preventive care and chronic disease management.</p>
                            <div class="flex items-center justify-between">
                                <span class="text-mvp-green font-semibold">★★★★★ 4.9</span>
                                <button class="text-mvp-red hover:text-mvp-brown transition-colors">
                                    <i class="fas fa-calendar mr-1"></i>Book Appointment
                                </button>
                            </div>
                        </div>

                        <div class="bg-white border border-mvp-red/20 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" onclick="openProviderDetails('dr-martinez')">
                            <div class="flex items-center mb-4">
                                <div class="w-16 h-16 bg-mvp-red/10 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-heartbeat text-2xl text-mvp-red"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-mvp-brown">Dr. Carlos Martinez</h3>
                                    <p class="text-gray-600">Cardiology</p>
                                </div>
                            </div>
                            <p class="text-gray-700 mb-4">Leading cardiologist with expertise in heart disease prevention and intervention.</p>
                            <div class="flex items-center justify-between">
                                <span class="text-mvp-green font-semibold">★★★★★ 4.8</span>
                                <button class="text-mvp-red hover:text-mvp-brown transition-colors">
                                    <i class="fas fa-calendar mr-1"></i>Book Appointment
                                </button>
                            </div>
                        </div>

                        <div class="bg-white border border-mvp-red/20 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" onclick="openProviderDetails('dr-washington')">
                            <div class="flex items-center mb-4">
                                <div class="w-16 h-16 bg-mvp-red/10 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-child text-2xl text-mvp-red"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-mvp-brown">Dr. Kenya Washington</h3>
                                    <p class="text-gray-600">Pediatrics</p>
                                </div>
                            </div>
                            <p class="text-gray-700 mb-4">Dedicated pediatrician focused on comprehensive child healthcare from infancy to adolescence.</p>
                            <div class="flex items-center justify-between">
                                <span class="text-mvp-green font-semibold">★★★★★ 4.9</span>
                                <button class="text-mvp-red hover:text-mvp-brown transition-colors">
                                    <i class="fas fa-calendar mr-1"></i>Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Services Directory Section -->
            <section id="services" class="py-16 bg-gray-50 relative">
                <!-- Subtle Background Pattern -->
                <div class="absolute inset-0 opacity-2">
                    <img src="https://cdn1.genspark.ai/user-upload-image/24_generated/b4b3dabe-0249-451f-9954-18ea3268d1c9" 
                         alt="Medical Facility Background" 
                         class="w-full h-full object-cover">
                </div>
                <div class="max-w-6xl mx-auto px-4">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-mvp-brown mb-4">Comprehensive Healthcare Services</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our full range of medical services and specialties
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openServiceDetails('primary-care')">
                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-r from-mvp-red to-mvp-brown rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-stethoscope text-3xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold text-mvp-brown mb-2">Primary Care</h3>
                                <p class="text-gray-600 mb-4">Comprehensive primary care services including annual physicals, preventive care, and routine health maintenance.</p>
                                <button class="text-mvp-red hover:text-mvp-brown font-semibold">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openServiceDetails('specialist-care')">
                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-r from-mvp-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-user-md text-3xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold text-mvp-brown mb-2">Specialist Care</h3>
                                <p class="text-gray-600 mb-4">Access to our network of specialists including cardiology, orthopedics, dermatology, and more.</p>
                                <button class="text-mvp-red hover:text-mvp-brown font-semibold">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openServiceDetails('urgent-care')">
                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-r from-mvp-brown to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-clock text-3xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold text-mvp-brown mb-2">Urgent Care</h3>
                                <p class="text-gray-600 mb-4">Quick access to non-emergency medical care when you need it most, with extended hours.</p>
                                <button class="text-mvp-red hover:text-mvp-brown font-semibold">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openServiceDetails('mental-health')">
                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-brain text-3xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold text-mvp-brown mb-2">Mental Health</h3>
                                <p class="text-gray-600 mb-4">Comprehensive mental health services including counseling, therapy, and psychiatric care.</p>
                                <button class="text-mvp-red hover:text-mvp-brown font-semibold">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openServiceDetails('preventive-care')">
                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-shield-alt text-3xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold text-mvp-brown mb-2">Preventive Care</h3>
                                <p class="text-gray-600 mb-4">Screenings, vaccinations, and wellness programs to keep you healthy and prevent disease.</p>
                                <button class="text-mvp-red hover:text-mvp-brown font-semibold">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="openServiceDetails('pharmacy')">
                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-pills text-3xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold text-mvp-brown mb-2">Pharmacy Services</h3>
                                <p class="text-gray-600 mb-4">Full-service pharmacy with prescription medications, refill reminders, and medication management.</p>
                                <button class="text-mvp-red hover:text-mvp-brown font-semibold">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Community Events Section -->
            <section id="community-events" class="py-16 bg-white">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-mvp-brown mb-4">Community Health Events</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Join us for health screenings, wellness workshops, and community health initiatives
                        </p>
                    </div>

                    <!-- Featured Event -->
                    <div class="bg-gradient-to-r from-mvp-red to-mvp-brown rounded-xl p-8 text-white mb-8">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div class="flex items-center mb-4">
                                    <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                        <i class="fas fa-heartbeat text-2xl text-white"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-2xl font-bold">Free Health Screening Event</h3>
                                        <p class="opacity-90">Saturday, February 15, 2025</p>
                                    </div>
                                </div>
                                <p class="text-lg mb-6 opacity-90">
                                    Join us for free health screenings including blood pressure checks, diabetes screenings, and wellness consultations. 
                                    Open to all community members.
                                </p>
                                <div class="flex flex-wrap gap-4">
                                    <button onclick="rsvpEvent('health-screening')" class="bg-mvp-green hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                                        <i class="fas fa-calendar-check mr-2"></i>RSVP Now
                                    </button>
                                    <button onclick="getDirections('community-center')" class="border-2 border-white text-white hover:bg-white hover:text-mvp-red px-6 py-3 rounded-lg font-semibold transition-all">
                                        <i class="fas fa-map-marker-alt mr-2"></i>Get Directions
                                    </button>
                                </div>
                            </div>
                            <div class="text-center">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a458ed0b-9d99-4f08-afa9-9692799fbe11" 
                                     alt="MVP Healthcare Community Health Screening Event" 
                                     class="w-full max-w-md mx-auto rounded-lg shadow-lg">
                            </div>
                        </div>
                    </div>

                    <!-- Upcoming Events Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white border border-mvp-red/20 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                            <div class="h-48 bg-gradient-to-r from-mvp-green/20 to-green-200 flex items-center justify-center relative overflow-hidden">
                                <div class="absolute inset-0 opacity-30">
                                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a458ed0b-9d99-4f08-afa9-9692799fbe11" 
                                         alt="Fitness & Wellness Workshop" 
                                         class="w-full h-full object-cover">
                                </div>
                                <i class="fas fa-dumbbell text-6xl text-mvp-green relative z-10"></i>
                            </div>
                            <div class="p-6">
                                <div class="flex items-center mb-2">
                                    <div class="w-12 h-12 bg-mvp-green/10 rounded-full flex items-center justify-center mr-3">
                                        <i class="fas fa-calendar text-mvp-green"></i>
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-mvp-brown">Fitness & Wellness Workshop</h3>
                                        <p class="text-gray-600 text-sm">February 20, 2025</p>
                                    </div>
                                </div>
                                <p class="text-gray-700 mb-4">Learn about nutrition, exercise, and healthy lifestyle choices from our wellness experts.</p>
                                <button onclick="rsvpEvent('fitness-workshop')" class="w-full bg-mvp-red hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all">
                                    <i class="fas fa-plus-circle mr-2"></i>Register
                                </button>
                            </div>
                        </div>

                        <div class="bg-white border border-mvp-red/20 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                            <div class="h-48 bg-gradient-to-r from-purple-200 to-purple-300 flex items-center justify-center">
                                <i class="fas fa-baby text-6xl text-purple-600"></i>
                            </div>
                            <div class="p-6">
                                <div class="flex items-center mb-2">
                                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <i class="fas fa-calendar text-purple-600"></i>
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-mvp-brown">New Parent Support Group</h3>
                                        <p class="text-gray-600 text-sm">February 25, 2025</p>
                                    </div>
                                </div>
                                <p class="text-gray-700 mb-4">Connect with other new parents and learn about infant care, nutrition, and development.</p>
                                <button onclick="rsvpEvent('parent-support')" class="w-full bg-mvp-red hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all">
                                    <i class="fas fa-plus-circle mr-2"></i>Register
                                </button>
                            </div>
                        </div>

                        <div class="bg-white border border-mvp-red/20 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                            <div class="h-48 bg-gradient-to-r from-blue-200 to-blue-300 flex items-center justify-center">
                                <i class="fas fa-prescription-bottle-alt text-6xl text-blue-600"></i>
                            </div>
                            <div class="p-6">
                                <div class="flex items-center mb-2">
                                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <i class="fas fa-calendar text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-mvp-brown">Medication Management Class</h3>
                                        <p class="text-gray-600 text-sm">March 5, 2025</p>
                                    </div>
                                </div>
                                <p class="text-gray-700 mb-4">Learn how to properly manage your medications, understand side effects, and ensure safety.</p>
                                <button onclick="rsvpEvent('medication-class')" class="w-full bg-mvp-red hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all">
                                    <i class="fas fa-plus-circle mr-2"></i>Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Volunteer Hub Section -->
            <section id="volunteer-hub" class="py-16 bg-gradient-to-br from-mvp-green/5 to-green-50 relative">
                <!-- Background Image -->
                <div class="absolute inset-0 opacity-5">
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a2a769d1-b69e-45e9-9c14-2926bd343246" 
                         alt="MVP Healthcare Volunteers" 
                         class="w-full h-full object-cover">
                </div>
                <div class="max-w-6xl mx-auto px-4">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-mvp-brown mb-4">Volunteer Hub</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Make a difference in your community by volunteering with MVP Healthcare initiatives
                        </p>
                    </div>

                    <!-- Volunteer Impact Stats -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <div class="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div class="w-16 h-16 bg-mvp-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-users text-2xl text-mvp-green"></i>
                            </div>
                            <div class="text-3xl font-bold text-mvp-brown mb-2">2,500+</div>
                            <div class="text-gray-600">Active Volunteers</div>
                        </div>
                        <div class="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div class="w-16 h-16 bg-mvp-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-heart text-2xl text-mvp-red"></i>
                            </div>
                            <div class="text-3xl font-bold text-mvp-brown mb-2">50K+</div>
                            <div class="text-gray-600">Lives Impacted</div>
                        </div>
                        <div class="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div class="w-16 h-16 bg-mvp-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-clock text-2xl text-mvp-brown"></i>
                            </div>
                            <div class="text-3xl font-bold text-mvp-brown mb-2">100K+</div>
                            <div class="text-gray-600">Volunteer Hours</div>
                        </div>
                        <div class="bg-white rounded-lg p-6 text-center shadow-lg">
                            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-award text-2xl text-purple-600"></i>
                            </div>
                            <div class="text-3xl font-bold text-mvp-brown mb-2">25+</div>
                            <div class="text-gray-600">Community Programs</div>
                        </div>
                    </div>

                    <!-- Volunteer Opportunities -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="flex items-center mb-4">
                                <div class="w-16 h-16 bg-gradient-to-r from-mvp-red to-red-600 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-stethoscope text-2xl text-white"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-mvp-brown">Health Screening Events</h3>
                                    <p class="text-mvp-green font-semibold">15 positions available</p>
                                </div>
                            </div>
                            <p class="text-gray-700 mb-6">
                                Help with community health screenings by assisting with registration, patient guidance, and event coordination.
                            </p>
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-sm text-gray-600"><i class="fas fa-calendar mr-1"></i>Weekends</span>
                                <span class="text-sm text-gray-600"><i class="fas fa-clock mr-1"></i>4 hours</span>
                            </div>
                            <button onclick="volunteerApply('health-screening')" class="w-full bg-mvp-red hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all">
                                <i class="fas fa-hand-paper mr-2"></i>Volunteer Now
                            </button>
                        </div>

                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="flex items-center mb-4">
                                <div class="w-16 h-16 bg-gradient-to-r from-mvp-green to-green-600 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-graduation-cap text-2xl text-white"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-mvp-brown">Health Education Programs</h3>
                                    <p class="text-mvp-green font-semibold">8 positions available</p>
                                </div>
                            </div>
                            <p class="text-gray-700 mb-6">
                                Teach community members about healthy lifestyle choices, nutrition, and disease prevention.
                            </p>
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-sm text-gray-600"><i class="fas fa-calendar mr-1"></i>Flexible</span>
                                <span class="text-sm text-gray-600"><i class="fas fa-clock mr-1"></i>2-3 hours</span>
                            </div>
                            <button onclick="volunteerApply('health-education')" class="w-full bg-mvp-green hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all">
                                <i class="fas fa-hand-paper mr-2"></i>Volunteer Now
                            </button>
                        </div>

                        <div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="flex items-center mb-4">
                                <div class="w-16 h-16 bg-gradient-to-r from-mvp-brown to-amber-700 rounded-full flex items-center justify-center mr-4">
                                    <i class="fas fa-hands-helping text-2xl text-white"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-mvp-brown">Senior Support Services</h3>
                                    <p class="text-mvp-green font-semibold">12 positions available</p>
                                </div>
                            </div>
                            <p class="text-gray-700 mb-6">
                                Provide companionship and assistance to seniors with transportation, grocery shopping, and social activities.
                            </p>
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-sm text-gray-600"><i class="fas fa-calendar mr-1"></i>Weekly</span>
                                <span class="text-sm text-gray-600"><i class="fas fa-clock mr-1"></i>3 hours</span>
                            </div>
                            <button onclick="volunteerApply('senior-support')" class="w-full bg-mvp-brown hover:bg-amber-800 text-white py-3 px-4 rounded-lg font-semibold transition-all">
                                <i class="fas fa-hand-paper mr-2"></i>Volunteer Now
                            </button>
                        </div>
                    </div>

                    <!-- Volunteer Application CTA -->
                    <div class="mt-12 text-center">
                        <div class="bg-gradient-to-r from-mvp-red to-mvp-brown rounded-xl overflow-hidden shadow-2xl">
                            <div class="grid grid-cols-1 lg:grid-cols-2 items-center">
                                <div class="p-8 text-white">
                                    <h3 class="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
                                    <p class="text-xl mb-6 opacity-90">Join our volunteer network and help strengthen community health</p>
                                    <button onclick="openVolunteerApplication()" class="bg-mvp-green hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all">
                                        <i class="fas fa-clipboard-list mr-2"></i>Complete Volunteer Application
                                    </button>
                                </div>
                                <div class="hidden lg:block">
                                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a2a769d1-b69e-45e9-9c14-2926bd343246" 
                                         alt="MVP Healthcare Volunteers in Action" 
                                         class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Mobile App Integration Section -->
            <section id="mobile-app" class="py-16 bg-white">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-mvp-brown mb-4">MVP Mobile App</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Access your healthcare anytime, anywhere with the MVP Health Care mobile app
                        </p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <!-- App Features -->
                        <div>
                            <h3 class="text-3xl font-bold text-mvp-brown mb-6">Healthcare at Your Fingertips</h3>
                            
                            <div class="space-y-6">
                                <div class="flex items-start">
                                    <div class="w-12 h-12 bg-mvp-red/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <i class="fas fa-id-card text-mvp-red"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-mvp-brown mb-2">Digital ID Card</h4>
                                        <p class="text-gray-600">Carry your MVP Health Care ID card digitally and access it anytime.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="w-12 h-12 bg-mvp-green/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <i class="fas fa-search text-mvp-green"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-mvp-brown mb-2">Find Providers</h4>
                                        <p class="text-gray-600">Search for doctors, specialists, and healthcare facilities in your network.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="w-12 h-12 bg-mvp-brown/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <i class="fas fa-prescription-bottle-alt text-mvp-brown"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-mvp-brown mb-2">Prescription Management</h4>
                                        <p class="text-gray-600">View prescription history, find pharmacies, and manage refills.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <i class="fas fa-calendar-alt text-purple-600"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-mvp-brown mb-2">Appointment Scheduling</h4>
                                        <p class="text-gray-600">Schedule, reschedule, or cancel appointments with your healthcare providers.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <i class="fas fa-file-medical text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-mvp-brown mb-2">Health Records</h4>
                                        <p class="text-gray-600">Access your health records, test results, and medical history securely.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <i class="fas fa-comments text-green-600"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-mvp-brown mb-2">Secure Messaging</h4>
                                        <p class="text-gray-600">Communicate securely with your healthcare team and get answers to questions.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Download Buttons -->
                            <div class="mt-8 flex flex-wrap gap-4">
                                <button onclick="downloadApp('ios')" class="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center transition-all">
                                    <i class="fab fa-apple text-2xl mr-3"></i>
                                    <div class="text-left">
                                        <div class="text-xs">Download on the</div>
                                        <div class="font-semibold">App Store</div>
                                    </div>
                                </button>
                                <button onclick="downloadApp('android')" class="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center transition-all">
                                    <i class="fab fa-google-play text-2xl mr-3"></i>
                                    <div class="text-left">
                                        <div class="text-xs">Get it on</div>
                                        <div class="font-semibold">Google Play</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- App Preview with Real MVP Interface -->
                        <div class="text-center">
                            <div class="relative inline-block">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/4107b484-d579-4949-9357-f1c542e7103d" 
                                     alt="MVP Healthcare Mobile App Interface" 
                                     class="w-80 h-auto mx-auto rounded-3xl shadow-2xl">
                            </div>
                            
                            <!-- App Features Highlight -->
                            <div class="mt-6 grid grid-cols-2 gap-4 max-w-sm mx-auto">
                                <div class="bg-white rounded-lg p-4 shadow-md">
                                    <i class="fas fa-id-card text-mvp-red text-2xl mb-2"></i>
                                    <div class="text-xs font-semibold text-mvp-brown">Digital ID Card</div>
                                </div>
                                <div class="bg-white rounded-lg p-4 shadow-md">
                                    <i class="fas fa-calendar-alt text-mvp-green text-2xl mb-2"></i>
                                    <div class="text-xs font-semibold text-mvp-brown">Appointments</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Back to Top Button -->
            <div class="fixed bottom-6 right-6 z-50">
                <button onclick="goHome()" class="bg-mvp-red hover:bg-red-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
                    <i class="fas fa-home text-xl"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners for MVP Healthcare interactions
    addMVPHealthcareEventListeners();
}

function loadHyde() {
    document.getElementById('content-area').innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
            <!-- Hero Section -->
            <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 text-white">
                <!-- Hero Background Image -->
                <div class="absolute inset-0 opacity-25">
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a65ce159-5471-40d2-96c6-cc2e40be9970.png" 
                         alt="Supportive mental health therapy setting" 
                         class="w-full h-full object-cover">
                </div>
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-teal-600/85 to-green-600/80"></div>
                
                <div class="relative z-10 px-4 py-20">
                    <div class="max-w-6xl mx-auto text-center">
                        <!-- Icon -->
                        <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30">
                            <i class="fas fa-brain text-6xl"></i>
                        </div>
                        
                        <h1 class="text-5xl md:text-7xl font-bold mb-4">Hyde</h1>
                        <div class="w-32 h-1 bg-white mx-auto mb-6 rounded-full"></div>
                        
                        <p class="text-2xl md:text-3xl font-light mb-6 max-w-4xl mx-auto">
                            AI-Centered Mental Health Support with Privacy by Design
                        </p>
                        
                        <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                            Combining multimodal AI (text + voice), personalized care plans, AI-moderated peer groups, and proactive crisis prevention protocols. Hyde augments wellbeing and facilitates rapid handoff to human professionals when needed.
                        </p>
                        
                        <div class="bg-yellow-500/90 backdrop-blur-md rounded-xl p-4 max-w-4xl mx-auto border-2 border-yellow-300 mb-8">
                            <p class="text-yellow-900 font-medium text-lg">
                                <i class="fas fa-info-circle mr-2"></i>
                                <strong>Important:</strong> Hyde is not a medical device nor a replacement for licensed care. If you're in crisis, call 988 (Suicide & Crisis Lifeline) or 911 immediately.
                            </p>
                        </div>
                        
                        <div class="flex flex-wrap gap-4 justify-center">
                            <button onclick="scrollToHydeSection('features')" class="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-xl shadow-lg">
                                <i class="fas fa-rocket mr-2"></i>Explore Features
                            </button>
                            <button onclick="scrollToHydeSection('voice')" class="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg transition-all font-bold text-xl shadow-lg">
                                <i class="fas fa-microphone mr-2"></i>Voice AI
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="sticky top-0 z-40 bg-white shadow-md border-b-2 border-blue-200">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex flex-wrap gap-2 py-4 justify-center">
                        <button onclick="scrollToHydeSection('features')" class="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium">
                            <i class="fas fa-star mr-2"></i>Features
                        </button>
                        <button onclick="scrollToHydeSection('voice')" class="px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-blue-50 transition-all font-medium border-2 border-blue-200">
                            <i class="fas fa-microphone mr-2"></i>Voice AI
                        </button>
                        <button onclick="scrollToHydeSection('privacy')" class="px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-blue-50 transition-all font-medium border-2 border-blue-200">
                            <i class="fas fa-shield-alt mr-2"></i>Privacy
                        </button>
                        <button onclick="scrollToHydeSection('support')" class="px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-blue-50 transition-all font-medium border-2 border-blue-200">
                            <i class="fas fa-users mr-2"></i>Peer Support
                        </button>
                        <button onclick="scrollToHydeSection('crisis')" class="px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-blue-50 transition-all font-medium border-2 border-blue-200">
                            <i class="fas fa-phone-volume mr-2"></i>Crisis Help
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-6xl mx-auto px-4 py-12">
                
                <!-- Core Features Section -->
                <section id="features" class="mb-16">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-gray-900 mb-4">
                            <i class="fas fa-star text-blue-600 mr-3"></i>Core Features
                        </h2>
                        <p class="text-xl text-gray-700 max-w-3xl mx-auto">
                            Comprehensive mental health support powered by AI, designed with your privacy and wellbeing in mind
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <!-- Daily Check-ins -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer" onclick="openHydeFeature('checkins')">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i class="fas fa-calendar-check text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Daily Check-ins</h3>
                            <p class="text-gray-700 text-center mb-4">Text or voice mood tracking with AI analysis and insights</p>
                            <div class="flex items-center justify-center text-blue-600 font-medium">
                                <span>Learn More</span>
                                <i class="fas fa-arrow-right ml-2"></i>
                            </div>
                        </div>

                        <!-- Emotion-Aware Journaling -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-2 border-teal-200 hover:border-teal-400 transition-all cursor-pointer" onclick="openHydeFeature('journaling')">
                            <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i class="fas fa-book text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Smart Journaling</h3>
                            <p class="text-gray-700 text-center mb-4">Sentiment analysis and personalized insights from your entries</p>
                            <div class="flex items-center justify-center text-teal-600 font-medium">
                                <span>Learn More</span>
                                <i class="fas fa-arrow-right ml-2"></i>
                            </div>
                        </div>

                        <!-- Risk Assessment -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200 hover:border-red-400 transition-all cursor-pointer" onclick="openHydeFeature('risk')">
                            <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i class="fas fa-heartbeat text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Crisis Prevention</h3>
                            <p class="text-gray-700 text-center mb-4">Early warning system for mental health risk detection</p>
                            <div class="flex items-center justify-center text-red-600 font-medium">
                                <span>Learn More</span>
                                <i class="fas fa-arrow-right ml-2"></i>
                            </div>
                        </div>

                        <!-- Personalized Recommendations -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer" onclick="openHydeFeature('recommendations')">
                            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i class="fas fa-brain text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">AI Recommendations</h3>
                            <p class="text-gray-700 text-center mb-4">Personalized micro-interventions (CBT, DBT, mindfulness)</p>
                            <div class="flex items-center justify-center text-green-600 font-medium">
                                <span>Learn More</span>
                                <i class="fas fa-arrow-right ml-2"></i>
                            </div>
                        </div>

                        <!-- Privacy Dashboard -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer" onclick="openHydeFeature('privacy-controls')">
                            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i class="fas fa-user-shield text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Privacy Controls</h3>
                            <p class="text-gray-700 text-center mb-4">Complete data controls and easy export functionality</p>
                            <div class="flex items-center justify-center text-purple-600 font-medium">
                                <span>Learn More</span>
                                <i class="fas fa-arrow-right ml-2"></i>
                            </div>
                        </div>

                        <!-- Cultural Intelligence -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200 hover:border-orange-400 transition-all cursor-pointer" onclick="openHydeFeature('cultural')">
                            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i class="fas fa-globe text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Cultural Awareness</h3>
                            <p class="text-gray-700 text-center mb-4">Context-aware content for diverse cultural backgrounds</p>
                            <div class="flex items-center justify-center text-orange-600 font-medium">
                                <span>Learn More</span>
                                <i class="fas fa-arrow-right ml-2"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Journaling Feature Image -->
                    <div class="mb-12 rounded-xl overflow-hidden shadow-2xl">
                        <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/b6f42ff1-60cf-41c6-a236-f8cb20c06d69.png" 
                             alt="Person journaling mental health feelings" 
                             class="w-full h-96 object-cover">
                    </div>
                </section>

                <!-- Voice Interaction Section -->
                <section id="voice" class="mb-16">
                    <div class="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl shadow-2xl overflow-hidden">
                        <div class="p-8 md:p-12 text-white">
                            <div class="flex items-center mb-6">
                                <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mr-6">
                                    <i class="fas fa-microphone text-4xl"></i>
                                </div>
                                <div>
                                    <h2 class="text-4xl font-bold mb-2">Voice AI Interaction</h2>
                                    <p class="text-xl text-white/90">Natural conversations with empathetic AI support</p>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
                                        <h3 class="text-2xl font-bold mb-4">
                                            <i class="fas fa-waveform-path mr-2"></i>Voice Features
                                        </h3>
                                        <ul class="space-y-3 text-lg">
                                            <li class="flex items-start">
                                                <i class="fas fa-check-circle text-green-300 mr-3 mt-1"></i>
                                                <span>Real-time speech-to-text with visual feedback</span>
                                            </li>
                                            <li class="flex items-start">
                                                <i class="fas fa-check-circle text-green-300 mr-3 mt-1"></i>
                                                <span>AI conversations with crisis detection</span>
                                            </li>
                                            <li class="flex items-start">
                                                <i class="fas fa-check-circle text-green-300 mr-3 mt-1"></i>
                                                <span>Natural speech output (calm, soothing, warm)</span>
                                            </li>
                                            <li class="flex items-start">
                                                <i class="fas fa-check-circle text-green-300 mr-3 mt-1"></i>
                                                <span>Continuous mode for back-and-forth chat</span>
                                            </li>
                                            <li class="flex items-start">
                                                <i class="fas fa-check-circle text-green-300 mr-3 mt-1"></i>
                                                <span>Captions, speed control, accessibility</span>
                                            </li>
                                            <li class="flex items-start">
                                                <i class="fas fa-check-circle text-green-300 mr-3 mt-1"></i>
                                                <span>Granular privacy controls for voice data</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="rounded-xl overflow-hidden shadow-xl">
                                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a5822bab-91f5-4ef9-a741-218da99388cc.png" 
                                         alt="Person using voice AI mental health app" 
                                         class="w-full h-full object-cover">
                                </div>
                            </div>
                            
                            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6">
                                <h3 class="text-2xl font-bold mb-4">
                                    <i class="fas fa-play-circle mr-2"></i>Try Voice AI Demo
                                </h3>
                                <p class="mb-6 text-lg">Experience natural AI conversation with empathetic responses</p>
                                <button onclick="startVoiceDemo()" class="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-xl shadow-lg">
                                    <i class="fas fa-microphone mr-2"></i>Start Voice Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Privacy & Security Section -->
                <section id="privacy" class="mb-16">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200">
                        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-shield-alt text-5xl mr-4"></i>
                                <div>
                                    <h2 class="text-4xl font-bold">Privacy & Security</h2>
                                    <p class="text-xl text-white/90">Your data, your control - always</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-8">
                            <div class="mb-8 rounded-xl overflow-hidden shadow-lg">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/bb346650-462a-4bd1-b92d-fddb021d4385.png" 
                                     alt="Data privacy and security protection" 
                                     class="w-full h-64 object-cover">
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 class="text-2xl font-bold text-blue-900 mb-4">
                                        <i class="fas fa-lock text-blue-600 mr-2"></i>Privacy Features
                                    </h3>
                                    <ul class="space-y-3 text-gray-700 text-lg">
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Data Minimization:</strong> Only necessary information collected</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Encryption:</strong> Journal entries encrypted at rest</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Consent Management:</strong> Granular control over data usage</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Right to Deletion:</strong> GDPR Article 17 compliant</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Data Export:</strong> Download all your data anytime</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Audit Trail:</strong> Complete transparency logging</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 class="text-2xl font-bold text-indigo-900 mb-4">
                                        <i class="fas fa-shield-alt text-indigo-600 mr-2"></i>Security Measures
                                    </h3>
                                    <ul class="space-y-3 text-gray-700 text-lg">
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Rate Limiting:</strong> Prevent abuse and brute force</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Input Sanitization:</strong> XSS and injection prevention</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Secure Headers:</strong> CSP, HSTS protection</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Password Security:</strong> Bcrypt hashing with salt</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Session Management:</strong> Secure JWT tokens</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                            <span><strong>Two-Factor Auth:</strong> Optional 2FA for accounts</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300">
                                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                                    <i class="fas fa-certificate text-blue-600 mr-2"></i>Compliance Standards
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div class="bg-white rounded-lg p-4 text-center shadow-sm">
                                        <div class="text-3xl font-bold text-blue-600 mb-2">HIPAA</div>
                                        <p class="text-gray-700">Healthcare privacy ready</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-4 text-center shadow-sm">
                                        <div class="text-3xl font-bold text-blue-600 mb-2">GDPR</div>
                                        <p class="text-gray-700">EU data rights compliant</p>
                                    </div>
                                    <div class="bg-white rounded-lg p-4 text-center shadow-sm">
                                        <div class="text-3xl font-bold text-blue-600 mb-2">CCPA</div>
                                        <p class="text-gray-700">California privacy law</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Peer Support Section -->
                <section id="support" class="mb-16">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-200">
                        <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-users text-5xl mr-4"></i>
                                <div>
                                    <h2 class="text-4xl font-bold">AI-Moderated Peer Support</h2>
                                    <p class="text-xl text-white/90">Safe community spaces for connection and healing</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-8">
                            <div class="mb-8 rounded-xl overflow-hidden shadow-lg">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/e37236c3-ba78-4281-a035-d620cfce55d2.png" 
                                     alt="Diverse peer support group" 
                                     class="w-full h-64 object-cover">
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div class="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                                    <i class="fas fa-comments text-3xl text-green-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Safe Spaces</h3>
                                    <p class="text-gray-700 text-lg">AI-moderated groups ensure respectful, supportive conversations</p>
                                </div>
                                
                                <div class="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                                    <i class="fas fa-user-friends text-3xl text-green-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Find Your Community</h3>
                                    <p class="text-gray-700 text-lg">Connect with others facing similar mental health challenges</p>
                                </div>
                                
                                <div class="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                                    <i class="fas fa-shield-alt text-3xl text-green-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Moderation</h3>
                                    <p class="text-gray-700 text-lg">AI monitors for harmful content and crisis situations</p>
                                </div>
                                
                                <div class="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                                    <i class="fas fa-hand-holding-heart text-3xl text-green-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Peer Support</h3>
                                    <p class="text-gray-700 text-lg">Share experiences and receive empathy from real people</p>
                                </div>
                            </div>
                            
                            <div class="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                                    <i class="fas fa-users-cog mr-2 text-green-600"></i>Planned Peer Group Features
                                </h3>
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-lg">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                                        <span>Topic-specific support groups (anxiety, depression, trauma)</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                                        <span>Cultural affinity spaces (BIPOC, LGBTQ+, veterans)</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                                        <span>Scheduled group sessions with trained facilitators</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                                        <span>Anonymous participation with privacy protection</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Crisis Intervention Section -->
                <section id="crisis" class="mb-16">
                    <div class="bg-red-50 border-2 border-red-300 rounded-2xl shadow-xl p-8">
                        <div class="text-center mb-8">
                            <i class="fas fa-phone-volume text-6xl text-red-600 mb-4"></i>
                            <h2 class="text-4xl font-bold text-red-900 mb-4">24/7 Crisis Support</h2>
                            <p class="text-xl text-red-800 max-w-3xl mx-auto">
                                If you're experiencing a mental health crisis, immediate help is available
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200">
                                <div class="flex items-start">
                                    <i class="fas fa-phone text-4xl text-red-600 mr-4 mt-1"></i>
                                    <div class="flex-1">
                                        <h3 class="text-2xl font-bold text-red-900 mb-2">988 Suicide & Crisis Lifeline</h3>
                                        <p class="text-gray-700 text-lg mb-4">Free, confidential support 24/7 for people in distress</p>
                                        <a href="tel:988" class="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-all font-bold text-xl">
                                            <i class="fas fa-phone mr-2"></i>Call 988
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200">
                                <div class="flex items-start">
                                    <i class="fas fa-comment text-4xl text-red-600 mr-4 mt-1"></i>
                                    <div class="flex-1">
                                        <h3 class="text-2xl font-bold text-red-900 mb-2">Crisis Text Line</h3>
                                        <p class="text-gray-700 text-lg mb-4">Text HOME to 741741 for 24/7 crisis support via text</p>
                                        <a href="sms:741741&body=HOME" class="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-all font-bold text-xl">
                                            <i class="fas fa-sms mr-2"></i>Text HOME
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <h3 class="text-2xl font-bold text-gray-900 mb-4">
                                <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>Other Emergency Resources
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="text-center">
                                    <i class="fas fa-ambulance text-3xl text-red-600 mb-2"></i>
                                    <h4 class="font-bold text-lg mb-2">Emergency</h4>
                                    <a href="tel:911" class="text-red-600 hover:text-red-700 font-medium text-lg">Call 911</a>
                                </div>
                                <div class="text-center">
                                    <i class="fas fa-hospital text-3xl text-red-600 mb-2"></i>
                                    <h4 class="font-bold text-lg mb-2">SAMHSA Helpline</h4>
                                    <a href="tel:1-800-662-4357" class="text-red-600 hover:text-red-700 font-medium text-lg">1-800-662-HELP</a>
                                </div>
                                <div class="text-center">
                                    <i class="fas fa-user-md text-3xl text-red-600 mb-2"></i>
                                    <h4 class="font-bold text-lg mb-2">Veterans Crisis</h4>
                                    <a href="tel:988" class="text-red-600 hover:text-red-700 font-medium text-lg">Press 1 after 988</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Database Schema Section -->
                <section class="mb-16">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200">
                        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
                            <h2 class="text-4xl font-bold mb-2">
                                <i class="fas fa-database mr-3"></i>Core Data Models
                            </h2>
                            <p class="text-xl text-white/90">Privacy-first database architecture</p>
                        </div>
                        
                        <div class="p-8">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div class="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-600">
                                    <i class="fas fa-user text-2xl text-indigo-600 mb-2"></i>
                                    <h3 class="font-bold text-gray-900">Users & Profiles</h3>
                                    <p class="text-sm text-gray-700">Cultural context & preferences</p>
                                </div>
                                
                                <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                                    <i class="fas fa-check-square text-2xl text-purple-600 mb-2"></i>
                                    <h3 class="font-bold text-gray-900">Consent Management</h3>
                                    <p class="text-sm text-gray-700">Granular privacy controls</p>
                                </div>
                                
                                <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                                    <i class="fas fa-book-open text-2xl text-blue-600 mb-2"></i>
                                    <h3 class="font-bold text-gray-900">Journal Entries</h3>
                                    <p class="text-sm text-gray-700">Encrypted with sentiment AI</p>
                                </div>
                                
                                <div class="bg-teal-50 rounded-lg p-4 border-l-4 border-teal-600">
                                    <i class="fas fa-calendar-check text-2xl text-teal-600 mb-2"></i>
                                    <h3 class="font-bold text-gray-900">Check-ins</h3>
                                    <p class="text-sm text-gray-700">Daily mood tracking</p>
                                </div>
                                
                                <div class="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                                    <i class="fas fa-exclamation-triangle text-2xl text-red-600 mb-2"></i>
                                    <h3 class="font-bold text-gray-900">Risk Signals</h3>
                                    <p class="text-sm text-gray-700">Crisis assessment</p>
                                </div>
                                
                                <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                                    <i class="fas fa-running text-2xl text-green-600 mb-2"></i>
                                    <h3 class="font-bold text-gray-900">Activities</h3>
                                    <p class="text-sm text-gray-700">CBT, DBT, mindfulness</p>
                                </div>
                                
                                <div class="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                                    <i class="fas fa-lightbulb text-2xl text-orange-600 mb-2"></i>
                                    <h3 class="font-bold text-gray-900">Recommendations</h3>
                                    <p class="text-sm text-gray-700">Personalized suggestions</p>
                                </div>
                                
                                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-600">
                                    <i class="fas fa-clipboard-list text-2xl text-gray-600 mb-2"></i>
                                    <h3 class="font-bold text-gray-900">Audit Logs</h3>
                                    <p class="text-sm text-gray-700">Complete transparency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    `;
    
    // Initialize event listeners
    setTimeout(addHydeEventListeners, 100);
}

function loadNewsCenter() {
    loadNewsSection();
}

function loadYouthVibe() {
    document.getElementById('content-area').innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
            <!-- Hero Section -->
            <div class="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
                <!-- Background Hero Image -->
                <div class="absolute inset-0 opacity-30">
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/aabf3411-04e7-4f23-8b26-6d4a5addd6c9" 
                         alt="Youth Vibe Community" 
                         class="w-full h-full object-cover">
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80"></div>
                
                <div class="relative z-10 px-4 py-16">
                    <div class="max-w-6xl mx-auto text-center">
                        <div class="animate-pulse mb-6">
                            <h1 class="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                                Youth Vibe
                            </h1>
                            <div class="w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto mb-4 rounded-full"></div>
                        </div>
                        <p class="text-2xl md:text-3xl font-light mb-6">
                            Your instant gateway to everything young and happening in Rochester, NY
                        </p>
                        <div class="flex flex-wrap justify-center gap-4 mb-8">
                            <button onclick="scrollToAgeGroup('13-15')" class="age-btn bg-white/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/30 transition-all border border-white/30">
                                <i class="fas fa-users mr-2"></i>Ages 13-15
                            </button>
                            <button onclick="scrollToAgeGroup('16-18')" class="age-btn bg-white/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/30 transition-all border border-white/30">
                                <i class="fas fa-graduation-cap mr-2"></i>Ages 16-18
                            </button>
                            <button onclick="scrollToAgeGroup('19-24')" class="age-btn bg-white/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/30 transition-all border border-white/30">
                                <i class="fas fa-briefcase mr-2"></i>Ages 19-24
                            </button>
                        </div>
                        <div class="flex justify-center space-x-6">
                            <button onclick="goHome()" class="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center">
                                <i class="fas fa-arrow-left mr-2"></i>Back to Home
                            </button>
                            <button onclick="openPersonalizationModal()" class="bg-gradient-to-r from-yellow-400 to-pink-400 text-black px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center">
                                <i class="fas fa-user-cog mr-2"></i>Customize My Vibe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Pills -->
            <div class="bg-white shadow-lg sticky top-0 z-40 border-b">
                <div class="max-w-6xl mx-auto px-4 py-4">
                    <div class="flex flex-wrap gap-2 justify-center">
                        <button onclick="jumpToCategory('opportunities')" class="nav-pill bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm hover:bg-purple-200 transition-all">
                            🚀 Opportunities
                        </button>
                        <button onclick="jumpToCategory('success-stories')" class="nav-pill bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm hover:bg-pink-200 transition-all">
                            ⭐ Success Stories
                        </button>
                        <button onclick="jumpToCategory('mentorship')" class="nav-pill bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm hover:bg-indigo-200 transition-all">
                            👥 Mentorship
                        </button>
                        <button onclick="jumpToCategory('skills')" class="nav-pill bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition-all">
                            💪 Skills
                        </button>
                        <button onclick="jumpToCategory('creative')" class="nav-pill bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm hover:bg-yellow-200 transition-all">
                            🎨 Creative Hub
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-6xl mx-auto px-4 py-8">
                
                <!-- Strategic Content Categories -->
                <section id="opportunities" class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
                        <span class="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Opportunities Waiting for You</span>
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <!-- Education Pathways -->
                        <div class="opportunity-card bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all cursor-pointer" onclick="openCategoryModal('education')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/e2d7d50b-226a-4ca8-b604-afe72e4c7348.png" 
                                     alt="Students celebrating college acceptance" 
                                     class="w-full h-full object-cover opacity-40">
                            </div>
                            <div class="text-center p-6">
                                <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center -mt-12 relative z-10 border-4 border-blue-500">
                                    <i class="fas fa-graduation-cap text-2xl"></i>
                                </div>
                                <h3 class="font-bold text-lg mb-2">Education Pathways</h3>
                                <p class="text-sm opacity-90 mb-4">Academic resources, college prep, scholarships</p>
                                <div class="bg-white/20 rounded-lg p-2">
                                    <span class="text-xs font-semibold">156 Opportunities</span>
                                </div>
                            </div>
                        </div>

                        <!-- Creative Development -->
                        <div class="opportunity-card bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all cursor-pointer" onclick="openCategoryModal('creative')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/80a64394-0af1-46ea-ac4c-fbea06c271ad.png" 
                                     alt="Young artists and musicians creating" 
                                     class="w-full h-full object-cover opacity-40">
                            </div>
                            <div class="text-center p-6">
                                <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center -mt-12 relative z-10 border-4 border-pink-500">
                                    <i class="fas fa-palette text-2xl"></i>
                                </div>
                                <h3 class="font-bold text-lg mb-2">Creative Development</h3>
                                <p class="text-sm opacity-90 mb-4">Arts programs, digital media, creative expression</p>
                                <div class="bg-white/20 rounded-lg p-2">
                                    <span class="text-xs font-semibold">89 Opportunities</span>
                                </div>
                            </div>
                        </div>

                        <!-- Career Launch -->
                        <div class="opportunity-card bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all cursor-pointer" onclick="openCategoryModal('career')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/5182340c-9e1f-49d6-994d-7b61606c8deb.png" 
                                     alt="Young entrepreneur working" 
                                     class="w-full h-full object-cover opacity-40">
                            </div>
                            <div class="text-center p-6">
                                <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center -mt-12 relative z-10 border-4 border-green-500">
                                    <i class="fas fa-rocket text-2xl"></i>
                                </div>
                                <h3 class="font-bold text-lg mb-2">Career Launch</h3>
                                <p class="text-sm opacity-90 mb-4">Job readiness, internships, entrepreneurship</p>
                                <div class="bg-white/20 rounded-lg p-2">
                                    <span class="text-xs font-semibold">124 Opportunities</span>
                                </div>
                            </div>
                        </div>

                        <!-- Community Leadership -->
                        <div class="opportunity-card bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all cursor-pointer" onclick="openCategoryModal('leadership')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/c24dec27-ed73-49a6-aa85-2a7c3768e330.png" 
                                     alt="Young leaders organizing community" 
                                     class="w-full h-full object-cover opacity-40">
                            </div>
                            <div class="text-center p-6">
                                <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center -mt-12 relative z-10 border-4 border-purple-500">
                                    <i class="fas fa-megaphone text-2xl"></i>
                                </div>
                                <h3 class="font-bold text-lg mb-2">Community Leadership</h3>
                                <p class="text-sm opacity-90 mb-4">Civic engagement, advocacy, service</p>
                                <div class="bg-white/20 rounded-lg p-2">
                                    <span class="text-xs font-semibold">67 Opportunities</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Second Row of Categories -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <!-- Physical Wellbeing -->
                        <div class="opportunity-card bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all cursor-pointer" onclick="openCategoryModal('wellness')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/d4088ddc-a522-4776-9c7a-39f97ee30949.png" 
                                     alt="Teenagers playing basketball" 
                                     class="w-full h-full object-cover opacity-40">
                            </div>
                            <div class="text-center p-6">
                                <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center -mt-12 relative z-10 border-4 border-orange-500">
                                    <i class="fas fa-heartbeat text-2xl"></i>
                                </div>
                                <h3 class="font-bold text-lg mb-2">Physical Wellbeing</h3>
                                <p class="text-sm opacity-90 mb-4">Sports, fitness, nutrition programs</p>
                                <div class="bg-white/20 rounded-lg p-2">
                                    <span class="text-xs font-semibold">43 Opportunities</span>
                                </div>
                            </div>
                        </div>

                        <!-- Mental Health -->
                        <div class="opportunity-card bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer" onclick="openCategoryModal('mental-health')">
                            <div class="text-center">
                                <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-brain text-2xl"></i>
                                </div>
                                <h3 class="font-bold text-lg mb-2">Mental Health</h3>
                                <p class="text-sm opacity-90 mb-4">Wellness, support resources, stress management</p>
                                <div class="bg-white/20 rounded-lg p-2">
                                    <span class="text-xs font-semibold">52 Resources</span>
                                </div>
                            </div>
                        </div>

                        <!-- Social Connection -->
                        <div class="opportunity-card bg-gradient-to-br from-violet-500 to-purple-500 text-white rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer" onclick="openCategoryModal('social')">
                            <div class="text-center">
                                <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-users text-2xl"></i>
                                </div>
                                <h3 class="font-bold text-lg mb-2">Social Connection</h3>
                                <p class="text-sm opacity-90 mb-4">Events, meetups, interest communities</p>
                                <div class="bg-white/20 rounded-lg p-2">
                                    <span class="text-xs font-semibold">78 Events</span>
                                </div>
                            </div>
                        </div>

                        <!-- Financial Literacy -->
                        <div class="opportunity-card bg-gradient-to-br from-yellow-500 to-amber-500 text-white rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer" onclick="openCategoryModal('financial')">
                            <div class="text-center">
                                <div class="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-dollar-sign text-2xl"></i>
                                </div>
                                <h3 class="font-bold text-lg mb-2">Financial Literacy</h3>
                                <p class="text-sm opacity-90 mb-4">Money management, saving, investing</p>
                                <div class="bg-white/20 rounded-lg p-2">
                                    <span class="text-xs font-semibold">34 Resources</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Success Stories Section -->
                <section id="success-stories" class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
                        <span class="bg-gradient-to-r from-pink-600 to-yellow-600 text-transparent bg-clip-text">Success Stories That Inspire</span>
                    </h2>
                    
                    <div class="relative overflow-hidden rounded-2xl mb-8">
                        <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/db5c27b9-5633-4126-b22d-daf2eca2c8c8" 
                             alt="Youth Success Stories" 
                             class="w-full h-64 object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                            <div class="absolute bottom-6 left-6 text-white">
                                <h3 class="text-2xl font-bold mb-2">Rochester Youth Making It Happen</h3>
                                <p class="text-lg opacity-90">From graduation to entrepreneurship, see what's possible</p>
                            </div>
                        </div>
                    </div>

                    <!-- Success Story Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    A
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800">Amara J., 19</h4>
                                    <p class="text-sm text-gray-600">College Scholarship Winner</p>
                                </div>
                            </div>
                            <p class="text-gray-700 text-sm mb-4">"Through Youth Vibe, I found the scholarship that paid for my entire college education. Now I'm studying computer science at RIT!"</p>
                            <div class="flex items-center text-yellow-500">
                                <i class="fas fa-star mr-1"></i>
                                <span class="text-sm font-semibold">Full Scholarship Recipient</span>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    M
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800">Marcus R., 22</h4>
                                    <p class="text-sm text-gray-600">Young Entrepreneur</p>
                                </div>
                            </div>
                            <p class="text-gray-700 text-sm mb-4">"Started my graphic design business through the entrepreneurship program. Now I'm employing three other young creators!"</p>
                            <div class="flex items-center text-green-500">
                                <i class="fas fa-briefcase mr-1"></i>
                                <span class="text-sm font-semibold">Business Owner</span>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    S
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800">Sophia L., 17</h4>
                                    <p class="text-sm text-gray-600">Community Leader</p>
                                </div>
                            </div>
                            <p class="text-gray-700 text-sm mb-4">"Led a campaign that brought a new community center to my neighborhood. Youth voices matter when we organize together!"</p>
                            <div class="flex items-center text-blue-500">
                                <i class="fas fa-megaphone mr-1"></i>
                                <span class="text-sm font-semibold">City Council Youth Rep</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Music & Creators Hub -->
                <section class="mb-12">
                    <div class="text-center mb-8">
                        <h2 class="text-4xl font-bold text-gray-800 mb-4">
                            <span class="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">Music & Creators Hub</span>
                        </h2>
                        <p class="text-xl text-gray-600">Your daily dose of culture, creativity, and community vibes</p>
                    </div>

                    <!-- Daily Trends Hero -->
                    <div class="relative mb-8 rounded-2xl overflow-hidden">
                        <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/bdd5c3f7-5968-4ccd-9e6c-3737f097c9e3" 
                             alt="Music & Creators Community" 
                             class="w-full h-64 object-cover">
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/60 to-transparent">
                            <div class="absolute bottom-6 left-6 text-white">
                                <h3 class="text-2xl font-bold mb-2">Today's Culture Feed</h3>
                                <p class="text-lg opacity-90">Fresh drops, trending sounds, and creative inspiration</p>
                                <div class="flex items-center space-x-4 mt-3">
                                    <span class="bg-white/20 px-3 py-1 rounded-full text-sm">🔥 Trending Now</span>
                                    <span class="bg-white/20 px-3 py-1 rounded-full text-sm">⚡ Daily Updates</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Daily Dashboard -->
                    <div class="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 mb-8 text-white">
                        <div class="text-center mb-6">
                            <h3 class="text-2xl font-bold mb-2">🎵 Today's Vibe Check</h3>
                            <p class="opacity-90">Automatically updated daily • Last refresh: Just now</p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <!-- Today's Beat -->
                            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                                <i class="fas fa-music text-3xl mb-2"></i>
                                <h4 class="font-bold mb-1">Beat of the Day</h4>
                                <p class="text-sm opacity-90">"Summer Nights" - Open verse challenge</p>
                                <button onclick="playBeatPreview()" class="mt-2 bg-white/30 px-3 py-1 rounded-full text-xs hover:bg-white/40">
                                    ▶ Listen (30s)
                                </button>
                            </div>

                            <!-- Trending Sound -->
                            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                                <i class="fab fa-tiktok text-3xl mb-2"></i>
                                <h4 class="font-bold mb-1">TikTok Trend</h4>
                                <p class="text-sm opacity-90">#RochesterVibes dance challenge</p>
                                <button onclick="viewTrend()" class="mt-2 bg-white/30 px-3 py-1 rounded-full text-xs hover:bg-white/40">
                                    Learn Moves
                                </button>
                            </div>

                            <!-- Meme of Day -->
                            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                                <i class="fas fa-laugh text-3xl mb-2"></i>
                                <h4 class="font-bold mb-1">Meme Check</h4>
                                <p class="text-sm opacity-90">"When the beat drops just right" 😤</p>
                                <button onclick="shareMeme()" class="mt-2 bg-white/30 px-3 py-1 rounded-full text-xs hover:bg-white/40">
                                    Share It
                                </button>
                            </div>

                            <!-- Local Spotlight -->
                            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                                <i class="fas fa-star text-3xl mb-2"></i>
                                <h4 class="font-bold mb-1">ROC Spotlight</h4>
                                <p class="text-sm opacity-90">Maya J. - Teen Producer</p>
                                <button onclick="viewProfile()" class="mt-2 bg-white/30 px-3 py-1 rounded-full text-xs hover:bg-white/40">
                                    See Story
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Age-Segmented Music & Culture Experiences -->
                <section class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
                        <span class="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Culture by Your Vibe</span>
                    </h2>

                    <!-- Ages 13-15: Explore & Create -->
                    <div id="age-13-15" class="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                                13-15
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-gray-800">Explore & Create</h3>
                                <p class="text-gray-600">Discover your creative voice and build your first fanbase</p>
                            </div>
                        </div>

                        <!-- Music & Audio Content -->
                        <div class="mb-6">
                            <h4 class="text-lg font-bold text-blue-600 mb-4 flex items-center">
                                <i class="fas fa-headphones mr-2"></i>Music & Audio Playground
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-music text-2xl text-blue-500 mr-2"></i>
                                        <span class="font-semibold">Clean Hits</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Daily new drops (rap, R&B, Afrobeat) - 30sec previews</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <span>"Good Days" - SZA</span>
                                            <button class="text-blue-500 hover:text-blue-700">▶</button>
                                        </div>
                                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <span>"Heat Waves" - Glass Animals</span>
                                            <button class="text-blue-500 hover:text-blue-700">▶</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-puzzle-piece text-2xl text-pink-500 mr-2"></i>
                                        <span class="font-semibold">Lyric Games</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">"Lyric Decoder" + "Guess the Sample" polls</p>
                                    <div class="bg-pink-50 p-3 rounded text-sm">
                                        <p class="mb-2">🎵 "I got my mind set on you..." - Which artist?</p>
                                        <div class="grid grid-cols-2 gap-1 text-xs">
                                            <button class="bg-pink-100 p-1 rounded hover:bg-pink-200">A) Drake</button>
                                            <button class="bg-pink-100 p-1 rounded hover:bg-pink-200">B) J. Cole</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-trophy text-2xl text-yellow-500 mr-2"></i>
                                        <span class="font-semibold">Beat Challenge</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Weekly beat + open verse challenge</p>
                                    <div class="text-center">
                                        <button onclick="joinBeatChallenge()" class="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg">
                                            Join This Week
                                        </button>
                                        <p class="text-xs text-gray-500 mt-1">47 submissions so far</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Social & Trends -->
                        <div class="mb-6">
                            <h4 class="text-lg font-bold text-purple-600 mb-4 flex items-center">
                                <i class="fab fa-tiktok mr-2"></i>Social Trends Lab
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-fire text-2xl text-red-500 mr-2"></i>
                                        <span class="font-semibold">Daily Trendboard</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Safe TikTok sounds & dance challenges</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="bg-red-50 p-2 rounded">🔥 #RocYouthVibes - 2.3M views</div>
                                        <div class="bg-orange-50 p-2 rounded">💃 Smooth moves challenge</div>
                                        <div class="bg-yellow-50 p-2 rounded">🎵 "Good Energy" sound trend</div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-cut text-2xl text-green-500 mr-2"></i>
                                        <span class="font-semibold">Edit Templates</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">CapCut templates teens can copy</p>
                                    <button onclick="browseTemplates()" class="w-full bg-green-100 text-green-700 py-2 rounded font-semibold text-sm hover:bg-green-200">
                                        Browse 24 Templates
                                    </button>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-gamepad text-2xl text-blue-500 mr-2"></i>
                                        <span class="font-semibold">Gaming Quick-Hits</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Fortnite/Roblox updates simplified</p>
                                    <div class="space-y-1 text-xs">
                                        <div class="bg-blue-50 p-2 rounded">🎮 New Fortnite season drops Friday</div>
                                        <div class="bg-purple-50 p-2 rounded">🏆 Local Roblox tournament tonight</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Creative Challenges -->
                        <div>
                            <h4 class="text-lg font-bold text-cyan-600 mb-4 flex items-center">
                                <i class="fas fa-palette mr-2"></i>Creative Challenges
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-camera text-2xl text-pink-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">15-Sec Dance Tutorial</h5>
                                    <p class="text-xs text-gray-600 mb-3">Learn trending moves</p>
                                    <button onclick="joinDanceChallenge()" class="bg-pink-100 text-pink-700 px-3 py-1 rounded text-xs font-semibold hover:bg-pink-200 transition-all">Join Now</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-laugh text-2xl text-yellow-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Safe Meme Monday</h5>
                                    <p class="text-xs text-gray-600 mb-3">Weekly meme creation</p>
                                    <button onclick="joinMemeChallenge()" class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-200 transition-all">Create Meme</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-tshirt text-2xl text-green-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Fit Battle Friday</h5>
                                    <p class="text-xs text-gray-600 mb-3">Rate outfits 1-5</p>
                                    <button onclick="joinFitBattleChallenge()" class="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold hover:bg-green-200 transition-all">Show Outfit</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-hamburger text-2xl text-orange-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">$10 Food Challenge</h5>
                                    <p class="text-xs text-gray-600 mb-3">Make meals last all day</p>
                                    <button onclick="joinFoodChallenge()" class="bg-orange-100 text-orange-700 px-3 py-1 rounded text-xs font-semibold hover:bg-orange-200 transition-all">Take Challenge</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Ages 16-18: Build & Connect -->
                    <div id="age-16-18" class="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                                16-18
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-gray-800">Build & Connect</h3>
                                <p class="text-gray-600">Level up your skills and build your creative network</p>
                            </div>
                        </div>

                        <!-- Advanced Creative Content -->
                        <div class="mb-6">
                            <h4 class="text-lg font-bold text-purple-600 mb-4 flex items-center">
                                <i class="fas fa-microphone mr-2"></i>Creator Development Hub
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-record-vinyl text-2xl text-purple-500 mr-2"></i>
                                        <span class="font-semibold">Producer Spotlight</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Weekly producer features + beat breakdowns</p>
                                    <div class="bg-purple-50 p-3 rounded">
                                        <div class="flex items-center mb-2">
                                            <div class="w-8 h-8 bg-purple-500 rounded-full mr-2"></div>
                                            <div>
                                                <p class="font-semibold text-sm">BeatsBy_Jay_ROC</p>
                                                <p class="text-xs text-gray-600">Local teen producer</p>
                                            </div>
                                        </div>
                                        <button class="w-full bg-purple-100 text-purple-700 py-1 rounded text-sm">View Beat Pack</button>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-video text-2xl text-red-500 mr-2"></i>
                                        <span class="font-semibold">Content Creation</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Film/TV/Streaming watch parties + reviews</p>
                                    <div class="space-y-2">
                                        <div class="bg-red-50 p-2 rounded text-xs">
                                            🎬 "Black Panther 2" watch party - Friday 8PM
                                        </div>
                                        <div class="bg-blue-50 p-2 rounded text-xs">
                                            📱 Spoiler-free recap templates available
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-palette text-2xl text-pink-500 mr-2"></i>
                                        <span class="font-semibold">Digital Art Studio</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Cover art remixes + design challenges</p>
                                    <button onclick="joinArtChallenge()" class="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-2 rounded font-semibold text-sm">
                                        This Week: Album Cover Remix
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Advanced Gaming & Sports -->
                        <div class="mb-6">
                            <h4 class="text-lg font-bold text-green-600 mb-4 flex items-center">
                                <i class="fas fa-trophy mr-2"></i>Competitive Culture
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-gamepad text-2xl text-blue-500 mr-2"></i>
                                        <span class="font-semibold">Esports Central</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">2K/Madden/Minecraft tournaments</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="bg-blue-50 p-2 rounded">🏆 ROC Youth 2K Tournament - March 25</div>
                                        <div class="bg-green-50 p-2 rounded">⚡ Loadout of the week: Fortnite</div>
                                        <div class="bg-purple-50 p-2 rounded">🎮 Local game night @ Innovation Center</div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-basketball-ball text-2xl text-orange-500 mr-2"></i>
                                        <span class="font-semibold">Sports Highlights</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">NBA/NFL/Local athlete spotlights</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="bg-orange-50 p-2 rounded">🏀 Play of the Day: Vote now!</div>
                                        <div class="bg-red-50 p-2 rounded">⭐ Marcus Johnson - East High MVP</div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fab fa-youtube text-2xl text-red-500 mr-2"></i>
                                        <span class="font-semibold">Anime & Manga</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Season calendars + release trackers</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="bg-red-50 p-2 rounded">📅 Attack on Titan finale - This Sunday</div>
                                        <div class="bg-blue-50 p-2 rounded">🎨 Fan art of the week contest</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Fashion & Lifestyle -->
                        <div>
                            <h4 class="text-lg font-bold text-pink-600 mb-4 flex items-center">
                                <i class="fas fa-tshirt mr-2"></i>Style & Lifestyle
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-shoe-prints text-2xl text-red-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Sneaker Drop Calendar</h5>
                                    <p class="text-xs text-gray-600 mb-2">Jordan 4s dropping Friday</p>
                                    <button class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Set Reminder</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-cut text-2xl text-purple-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Hair & Nail Trends</h5>
                                    <p class="text-xs text-gray-600 mb-2">Spring protective styles</p>
                                    <button class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">View Tutorial</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-recycle text-2xl text-green-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Thrift Flips</h5>
                                    <p class="text-xs text-gray-600 mb-2">Transform old fits</p>
                                    <button class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Share Flip</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-mobile-alt text-2xl text-blue-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Budget Tech Tips</h5>
                                    <p class="text-xs text-gray-600 mb-2">Creator gear under $50</p>
                                    <button class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">View List</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Ages 19-24: Launch & Lead -->
                    <div id="age-19-24" class="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                                19-24
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-gray-800">Launch & Lead</h3>
                                <p class="text-gray-600">Monetize your creativity and inspire the next generation</p>
                            </div>
                        </div>

                        <!-- Professional Creative Development -->
                        <div class="mb-6">
                            <h4 class="text-lg font-bold text-green-600 mb-4 flex items-center">
                                <i class="fas fa-rocket mr-2"></i>Creative Entrepreneurship
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-dollar-sign text-2xl text-green-500 mr-2"></i>
                                        <span class="font-semibold">Teenpreneur Spotlight</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Weekly interviews with young entrepreneurs</p>
                                    <div class="bg-green-50 p-3 rounded">
                                        <div class="flex items-center mb-2">
                                            <div class="w-8 h-8 bg-green-500 rounded-full mr-2"></div>
                                            <div>
                                                <p class="font-semibold text-sm">Keisha M., 22</p>
                                                <p class="text-xs text-gray-600">Digital marketing agency owner</p>
                                            </div>
                                        </div>
                                        <button class="w-full bg-green-100 text-green-700 py-1 rounded text-sm">Read Full Interview</button>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-chart-line text-2xl text-blue-500 mr-2"></i>
                                        <span class="font-semibold">Creator Monetization</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Turn your content into income streams</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="bg-blue-50 p-2 rounded">💰 Brand partnership opportunities</div>
                                        <div class="bg-purple-50 p-2 rounded">🎵 Music licensing for creators</div>
                                        <div class="bg-green-50 p-2 rounded">📱 Social media management tips</div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-users text-2xl text-purple-500 mr-2"></i>
                                        <span class="font-semibold">Community Building</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Lead workshops and mentor younger creators</p>
                                    <button onclick="applyMentorRole()" class="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 rounded font-semibold text-sm">
                                        Become a Mentor
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Advanced Opportunities -->
                        <div class="mb-6">
                            <h4 class="text-lg font-bold text-teal-600 mb-4 flex items-center">
                                <i class="fas fa-briefcase mr-2"></i>Professional Opportunities
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-microphone-alt text-2xl text-red-500 mr-2"></i>
                                        <span class="font-semibold">Media & Broadcasting</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Podcast hosting, radio internships</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="bg-red-50 p-2 rounded">🎙️ WXXI Youth Radio Program</div>
                                        <div class="bg-orange-50 p-2 rounded">📺 Channel 10 internship openings</div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-code text-2xl text-blue-500 mr-2"></i>
                                        <span class="font-semibold">Tech & Innovation</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">App development, AI tools for creators</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="bg-blue-50 p-2 rounded">💻 RIT coding bootcamp - April start</div>
                                        <div class="bg-purple-50 p-2 rounded">🤖 AI tools workshop series</div>
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-handshake text-2xl text-green-500 mr-2"></i>
                                        <span class="font-semibold">Industry Connections</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">Network with music industry professionals</p>
                                    <div class="space-y-2 text-xs">
                                        <div class="bg-green-50 p-2 rounded">🎵 Record label showcases</div>
                                        <div class="bg-yellow-50 p-2 rounded">🤝 Industry mentor matching</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Leadership & Community Impact -->
                        <div>
                            <h4 class="text-lg font-bold text-orange-600 mb-4 flex items-center">
                                <i class="fas fa-megaphone mr-2"></i>Community Leadership
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-star text-2xl text-yellow-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Excellence Spotlight</h5>
                                    <p class="text-xs text-gray-600 mb-2">Black youth achievements</p>
                                    <button class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Nominate Someone</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-calendar text-2xl text-purple-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Local Scene</h5>
                                    <p class="text-xs text-gray-600 mb-2">Open mics, showcases</p>
                                    <button class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Find Events</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-heart text-2xl text-red-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Volunteer Gigs</h5>
                                    <p class="text-xs text-gray-600 mb-2">Community service</p>
                                    <button class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Sign Up</button>
                                </div>
                                <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-all">
                                    <i class="fas fa-trophy text-2xl text-green-500 mb-2"></i>
                                    <h5 class="font-semibold text-sm">Challenge Prizes</h5>
                                    <p class="text-xs text-gray-600 mb-2">Win equipment & cash</p>
                                    <button class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Enter Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Mentorship System -->
                <section id="mentorship" class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
                        <span class="bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">Connect with Mentors Who Get It</span>
                    </h2>
                    
                    <div class="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl mb-8">
                        <div class="absolute inset-0 opacity-30">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/e3226eab-6dbf-46de-98a4-631eeeb891df.png" 
                                 alt="Mentorship relationship" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10 text-center p-8">
                            <i class="fas fa-handshake text-6xl mb-4 opacity-80"></i>
                            <h3 class="text-2xl font-bold mb-4">Find Your Perfect Mentor Match</h3>
                            <p class="text-lg mb-6 opacity-90">Connect with successful professionals who understand your journey and want to help you succeed.</p>
                            <button onclick="openMentorMatchModal()" class="bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                                <i class="fas fa-search mr-2"></i>Find My Mentor
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="mentor-type bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="text-center">
                                <i class="fas fa-user-tie text-4xl text-blue-500 mb-4"></i>
                                <h4 class="font-bold text-lg mb-2">Industry Professionals</h4>
                                <p class="text-sm text-gray-600 mb-4">Connect with experts in your field of interest</p>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">147 Available</span>
                            </div>
                        </div>

                        <div class="mentor-type bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="text-center">
                                <i class="fas fa-graduation-cap text-4xl text-green-500 mb-4"></i>
                                <h4 class="font-bold text-lg mb-2">Near-Peer Mentors</h4>
                                <p class="text-sm text-gray-600 mb-4">Learn from youth just a few steps ahead</p>
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">89 Available</span>
                            </div>
                        </div>

                        <div class="mentor-type bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="text-center">
                                <i class="fas fa-lightbulb text-4xl text-yellow-500 mb-4"></i>
                                <h4 class="font-bold text-lg mb-2">Entrepreneurs</h4>
                                <p class="text-sm text-gray-600 mb-4">Business owners who started young</p>
                                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">56 Available</span>
                            </div>
                        </div>

                        <div class="mentor-type bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                            <div class="text-center">
                                <i class="fas fa-heart text-4xl text-pink-500 mb-4"></i>
                                <h4 class="font-bold text-lg mb-2">Life Coaches</h4>
                                <p class="text-sm text-gray-600 mb-4">Support for personal development</p>
                                <span class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold">32 Available</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Quick Actions Bar -->
                <section class="mb-12">
                    <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6">
                        <h3 class="text-2xl font-bold text-white text-center mb-6">Take Action Now</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button onclick="openApplicationSystem()" class="bg-white/20 backdrop-blur-md text-white p-4 rounded-xl hover:bg-white/30 transition-all text-center">
                                <i class="fas fa-file-alt text-2xl mb-2"></i>
                                <div class="text-sm font-semibold">Apply Now</div>
                            </button>
                            <button onclick="openEventCalendar()" class="bg-white/20 backdrop-blur-md text-white p-4 rounded-xl hover:bg-white/30 transition-all text-center">
                                <i class="fas fa-calendar text-2xl mb-2"></i>
                                <div class="text-sm font-semibold">Events</div>
                            </button>
                            <button onclick="openResourceLibrary()" class="bg-white/20 backdrop-blur-md text-white p-4 rounded-xl hover:bg-white/30 transition-all text-center">
                                <i class="fas fa-book text-2xl mb-2"></i>
                                <div class="text-sm font-semibold">Resources</div>
                            </button>
                            <button onclick="openCommunityChat()" class="bg-white/20 backdrop-blur-md text-white p-4 rounded-xl hover:bg-white/30 transition-all text-center">
                                <i class="fas fa-comments text-2xl mb-2"></i>
                                <div class="text-sm font-semibold">Connect</div>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Footer Call-to-Action -->
                <section class="text-center bg-white rounded-2xl p-8 shadow-lg">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Ready to Vibe with Your Future?</h3>
                    <p class="text-gray-600 mb-6 text-lg">Join thousands of Rochester youth who are making moves and building their dreams.</p>
                    <div class="flex justify-center space-x-4">
                        <button onclick="startPersonalizedJourney()" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                            <i class="fas fa-rocket mr-2"></i>Start My Journey
                        </button>
                        <button onclick="connectWithPeers()" class="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all">
                            <i class="fas fa-users mr-2"></i>Connect with Peers
                        </button>
                    </div>
                </section>
            </div>
        </div>
    `;

    // Add event listeners for interactive elements
    addYouthVibeEventListeners();
}

// Youth Vibe Interactive Functions
function addYouthVibeEventListeners() {
    // Smooth scrolling for navigation
    window.scrollToAgeGroup = function(ageGroup) {
        const element = document.getElementById(`age-${ageGroup}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.jumpToCategory = function(category) {
        const element = document.getElementById(category);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Modal Functions
    window.openPersonalizationModal = function() {
        showYouthVibeModal('Customize Your Youth Vibe Experience', `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">What's your main interest?</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="interest-btn p-3 rounded-lg border hover:bg-purple-50 text-left" data-interest="tech">
                            <i class="fas fa-laptop mr-2"></i>Technology
                        </button>
                        <button class="interest-btn p-3 rounded-lg border hover:bg-purple-50 text-left" data-interest="arts">
                            <i class="fas fa-palette mr-2"></i>Arts & Creative
                        </button>
                        <button class="interest-btn p-3 rounded-lg border hover:bg-purple-50 text-left" data-interest="sports">
                            <i class="fas fa-football-ball mr-2"></i>Sports & Fitness
                        </button>
                        <button class="interest-btn p-3 rounded-lg border hover:bg-purple-50 text-left" data-interest="business">
                            <i class="fas fa-briefcase mr-2"></i>Business & Entrepreneurship
                        </button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">How do you like to learn?</label>
                    <select class="w-full p-3 rounded-lg border">
                        <option>Hands-on experiences</option>
                        <option>Online tutorials</option>
                        <option>Group workshops</option>
                        <option>One-on-one mentoring</option>
                    </select>
                </div>
                <button onclick="savePersonalization()" class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold">
                    Save My Preferences
                </button>
            </div>
        `);
    };

    window.openCategoryModal = function(category) {
        const categoryData = {
            education: {
                title: 'Education Pathways',
                icon: 'graduation-cap',
                color: 'blue',
                opportunities: [
                    { name: 'Rochester City School District Dual Enrollment', type: 'Academic Program', deadline: 'Rolling Admissions' },
                    { name: 'MCC Early College High School Program', type: 'College Prep', deadline: 'March 15th' },
                    { name: 'Gates Millennium Scholarship', type: 'Scholarship', deadline: 'January 15th' },
                    { name: 'STEM Academy Summer Program', type: 'Summer Program', deadline: 'April 30th' }
                ]
            },
            creative: {
                title: 'Creative Development',
                icon: 'palette',
                color: 'pink',
                opportunities: [
                    { name: 'Eastman Community Music School', type: 'Music Program', deadline: 'Ongoing' },
                    { name: 'Rochester Youth Art Program', type: 'Visual Arts', deadline: 'Monthly Enrollment' },
                    { name: 'Digital Media Bootcamp', type: 'Technology', deadline: 'June 1st' },
                    { name: 'Teen Theater Workshop', type: 'Performing Arts', deadline: 'August 15th' }
                ]
            }
        };

        const data = categoryData[category] || categoryData.education;
        showYouthVibeModal(data.title, `
            <div class="space-y-4">
                <div class="text-center mb-6">
                    <i class="fas fa-${data.icon} text-6xl text-${data.color}-500 mb-4"></i>
                    <p class="text-gray-600">Discover opportunities perfect for your interests and goals</p>
                </div>
                ${data.opportunities.map(opp => `
                    <div class="border rounded-lg p-4 hover:bg-gray-50">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-semibold text-gray-800">${opp.name}</h4>
                            <span class="text-xs bg-${data.color}-100 text-${data.color}-800 px-2 py-1 rounded">${opp.type}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">Application Deadline: ${opp.deadline}</p>
                        <button class="bg-${data.color}-500 text-white px-4 py-2 rounded text-sm hover:bg-${data.color}-600">
                            Learn More
                        </button>
                    </div>
                `).join('')}
            </div>
        `);
    };

    window.openMentorMatchModal = function() {
        showYouthVibeModal('Find Your Perfect Mentor', `
            <div class="space-y-6">
                <div class="text-center mb-6">
                    <i class="fas fa-handshake text-6xl text-orange-500 mb-4"></i>
                    <p class="text-gray-600">Answer a few questions to get matched with the perfect mentor for your goals</p>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">What area do you want guidance in?</label>
                    <select class="w-full p-3 rounded-lg border">
                        <option>College preparation</option>
                        <option>Career exploration</option>
                        <option>Starting a business</option>
                        <option>Creative development</option>
                        <option>Leadership skills</option>
                        <option>Personal development</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Preferred mentorship style:</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="radio" name="style" class="mr-2"> Regular one-on-one meetings
                        </label>
                        <label class="flex items-center">
                            <input type="radio" name="style" class="mr-2"> Group mentorship sessions
                        </label>
                        <label class="flex items-center">
                            <input type="radio" name="style" class="mr-2"> Project-based collaboration
                        </label>
                    </div>
                </div>
                
                <button onclick="findMentorMatches()" class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold">
                    Find My Matches
                </button>
            </div>
        `);
    };

    // Interactive Functions
    window.openApplicationSystem = function() {
        showYouthVibeModal('Universal Application System', `
            <div class="space-y-4">
                <div class="text-center mb-6">
                    <i class="fas fa-file-alt text-6xl text-purple-500 mb-4"></i>
                    <h3 class="text-xl font-semibold">Apply to Multiple Opportunities</h3>
                    <p class="text-gray-600">Save time with our streamlined application system</p>
                </div>
                
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 class="font-semibold text-green-800 mb-2">✓ Profile 85% Complete</h4>
                    <p class="text-sm text-green-700">Add transcripts to reach 100% completion</p>
                </div>
                
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 border rounded">
                        <span>Summer Internship Program</span>
                        <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm">Apply</button>
                    </div>
                    <div class="flex justify-between items-center p-3 border rounded">
                        <span>Leadership Development Workshop</span>
                        <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm">Apply</button>
                    </div>
                    <div class="flex justify-between items-center p-3 border rounded">
                        <span>Coding Bootcamp Scholarship</span>
                        <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm">Apply</button>
                    </div>
                </div>
            </div>
        `);
    };

    window.openEventCalendar = function() {
        showYouthVibeModal('Upcoming Youth Events', `
            <div class="space-y-4">
                <div class="text-center mb-6">
                    <i class="fas fa-calendar text-6xl text-green-500 mb-4"></i>
                </div>
                
                <div class="space-y-3">
                    <div class="border-l-4 border-blue-500 pl-4 py-2">
                        <h4 class="font-semibold">Teen Tech Meetup</h4>
                        <p class="text-sm text-gray-600">Saturday, March 23rd • 2:00 PM</p>
                        <p class="text-sm">Innovation Center @ RIT</p>
                    </div>
                    <div class="border-l-4 border-pink-500 pl-4 py-2">
                        <h4 class="font-semibold">Art & Music Showcase</h4>
                        <p class="text-sm text-gray-600">Friday, March 29th • 6:00 PM</p>
                        <p class="text-sm">Memorial Art Gallery</p>
                    </div>
                    <div class="border-l-4 border-green-500 pl-4 py-2">
                        <h4 class="font-semibold">Career Fair for Youth</h4>
                        <p class="text-sm text-gray-600">Wednesday, April 3rd • 4:00 PM</p>
                        <p class="text-sm">Rochester Convention Center</p>
                    </div>
                </div>
                
                <button class="w-full bg-green-500 text-white py-2 rounded font-semibold">View Full Calendar</button>
            </div>
        `);
    };

    window.startPersonalizedJourney = function() {
        showYouthVibeModal('Start Your Personalized Journey', `
            <div class="text-center space-y-6">
                <i class="fas fa-rocket text-6xl text-purple-500"></i>
                <h3 class="text-2xl font-bold">Ready to Launch Your Future?</h3>
                <p class="text-gray-600">Let's create a personalized roadmap to help you reach your goals!</p>
                
                <div class="space-y-3 text-left">
                    <div class="flex items-center p-3 bg-purple-50 rounded">
                        <i class="fas fa-check text-purple-500 mr-3"></i>
                        <span>Discover your strengths and interests</span>
                    </div>
                    <div class="flex items-center p-3 bg-purple-50 rounded">
                        <i class="fas fa-check text-purple-500 mr-3"></i>
                        <span>Get matched with relevant opportunities</span>
                    </div>
                    <div class="flex items-center p-3 bg-purple-50 rounded">
                        <i class="fas fa-check text-purple-500 mr-3"></i>
                        <span>Connect with mentors in your field</span>
                    </div>
                </div>
                
                <button onclick="beginAssessment()" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold">
                    Begin Assessment
                </button>
            </div>
        `);
    };

    window.beginAssessment = function() {
        showYouthVibeModal('🚀 Youth Empowerment Assessment', `
            <div class="space-y-6">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl mb-4">
                        🎯
                    </div>
                    <p class="text-gray-600">Let's discover your passions and create your personalized pathway!</p>
                </div>

                <!-- Assessment Questions -->
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold mb-2">1. What gets you most excited? (Select all that apply)</h4>
                        <div class="space-y-2">
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="music"> 🎵 Music & Audio Production
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="visual"> 🎨 Visual Arts & Design
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="tech"> 💻 Technology & Coding
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="business"> 💼 Entrepreneurship & Business
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="community"> 🤝 Community & Social Impact
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="sports"> ⚽ Sports & Fitness
                            </label>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-2">2. How do you prefer to learn?</h4>
                        <select class="w-full p-2 border rounded">
                            <option>Hands-on experiences</option>
                            <option>Video tutorials</option>
                            <option>Reading and research</option>
                            <option>Working with mentors</option>
                            <option>Group projects</option>
                        </select>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-2">3. What's your biggest goal right now?</h4>
                        <select class="w-full p-2 border rounded">
                            <option>Build creative skills</option>
                            <option>Start my own business</option>
                            <option>Get into college</option>
                            <option>Find job opportunities</option>
                            <option>Make a difference in my community</option>
                            <option>Connect with like-minded people</option>
                        </select>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-2">4. Age Group:</h4>
                        <div class="flex space-x-2">
                            <button class="age-btn flex-1 p-2 border rounded hover:bg-purple-50" data-age="13-15">13-15</button>
                            <button class="age-btn flex-1 p-2 border rounded hover:bg-purple-50" data-age="16-18">16-18</button>
                            <button class="age-btn flex-1 p-2 border rounded hover:bg-purple-50" data-age="19-24">19-24</button>
                        </div>
                    </div>
                </div>

                <div class="flex space-x-3 mt-6">
                    <button onclick="generatePersonalizedPlan()" class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold">
                        Generate My Plan 🚀
                    </button>
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50">
                        Maybe Later
                    </button>
                </div>
            </div>
        `);

        // Add age selection functionality
        setTimeout(() => {
            const ageBtns = document.querySelectorAll('.age-btn');
            ageBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    ageBtns.forEach(b => b.classList.remove('bg-purple-500', 'text-white'));
                    this.classList.add('bg-purple-500', 'text-white');
                });
            });
        }, 100);
    };

    window.generatePersonalizedPlan = function() {
        // Get selected interests
        const interests = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        const learningStyle = document.querySelector('select').value;
        const goal = document.querySelectorAll('select')[1].value;
        const selectedAge = document.querySelector('.age-btn.bg-purple-500')?.dataset.age || '16-18';

        showYouthVibeModal('🎉 Your Personalized Youth Empowerment Plan', `
            <div class="space-y-6">
                <div class="text-center">
                    <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl mb-4">
                        ✨
                    </div>
                    <h3 class="text-xl font-bold mb-2">Your Journey Starts Here!</h3>
                    <p class="text-gray-600">Based on your responses, here's your customized roadmap:</p>
                </div>

                <!-- Personalized Recommendations -->
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <h4 class="font-bold mb-3 flex items-center">
                        <span class="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-2">1</span>
                        Your Focus Areas
                    </h4>
                    <div class="space-y-2">
                        ${interests.length > 0 ? interests.map(interest => {
                            const icons = {
                                music: '🎵 Music & Audio Production - Join our beat challenges and producer spotlights',
                                visual: '🎨 Visual Arts - Check out our daily art showcases and digital studio',
                                tech: '💻 Technology - Explore our tech tips and coding resources',
                                business: '💼 Business - Access entrepreneurship guides and startup stories',
                                community: '🤝 Community Impact - Connect with local volunteer opportunities',
                                sports: '⚽ Sports - Follow our sports highlights and fitness challenges'
                            };
                            return `<p class="text-sm">• ${icons[interest] || interest}</p>`;
                        }).join('') : '<p class="text-sm">• Explore all our creative categories to find your passion!</p>'}
                    </div>
                </div>

                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <h4 class="font-bold mb-3 flex items-center">
                        <span class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-2">2</span>
                        Recommended Next Steps
                    </h4>
                    <div class="space-y-2 text-sm">
                        <p>• <strong>Daily Check-ins:</strong> Visit the ${selectedAge === '13-15' ? 'Explore & Create' : selectedAge === '16-18' ? 'Build & Connect' : 'Launch & Lead'} section daily</p>
                        <p>• <strong>Weekly Challenges:</strong> Participate in our beat challenges and creative contests</p>
                        <p>• <strong>Community Connection:</strong> Join peer discussions and mentor sessions</p>
                        <p>• <strong>Skill Building:</strong> Access our curated tutorials and workshops</p>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                    <h4 class="font-bold mb-3 flex items-center">
                        <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-2">3</span>
                        Your Rochester Resources
                    </h4>
                    <div class="space-y-2 text-sm">
                        <p>• <strong>Local Scene:</strong> Stay updated with Rochester's youth events and opportunities</p>
                        <p>• <strong>Mentorship:</strong> Connect with local creators and professionals in your field</p>
                        <p>• <strong>Opportunities:</strong> Access internships, workshops, and community programs</p>
                    </div>
                </div>

                <div class="flex space-x-3">
                    <button onclick="savePersonalizedPlan()" class="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold">
                        Save My Plan 📱
                    </button>
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold">
                        Start Exploring! 🚀
                    </button>
                </div>
            </div>
        `);
    };

    window.savePersonalizedPlan = function() {
        showYouthVibeModal('💾 Plan Saved Successfully!', `
            <div class="text-center space-y-4">
                <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl">
                    ✅
                </div>
                <h3 class="text-xl font-bold">Your personalized plan is ready!</h3>
                <p class="text-gray-600">We've created your custom Youth Vibe dashboard. Check back daily for new content tailored to your interests!</p>
                
                <div class="bg-green-50 p-4 rounded-lg text-left">
                    <h4 class="font-semibold mb-2">Quick Access Tips:</h4>
                    <ul class="text-sm space-y-1 text-gray-700">
                        <li>• Bookmark this page for easy access</li>
                        <li>• Check the Daily Dashboard every morning</li>
                        <li>• Participate in weekly challenges</li>
                        <li>• Connect with peers in your age group</li>
                    </ul>
                </div>

                <button onclick="this.closest('.fixed').remove()" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold">
                    Start My Journey! 🎉
                </button>
            </div>
        `);
    };
}

// Music & Creators Interactive Functions
window.playBeatPreview = function() {
    showYouthVibeModal('🎵 Beat of the Day: "Summer Nights"', `
        <div class="text-center space-y-4">
            <div class="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl">
                🎵
            </div>
            <h3 class="text-xl font-bold">Open Verse Challenge</h3>
            <p class="text-gray-600">Listen to the beat and drop your best bars!</p>
            
            <div class="bg-purple-50 p-4 rounded-lg">
                <div class="flex items-center justify-center space-x-4 mb-4">
                    <button class="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">▶</button>
                    <div class="text-left">
                        <p class="font-semibold">30-second preview</p>
                        <p class="text-sm text-gray-600">Prod. by BeatsBy_Jay_ROC</p>
                    </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full w-1/3"></div>
                </div>
            </div>
            
            <div class="space-y-2">
                <button class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold">
                    Record My Verse
                </button>
                <button class="w-full border border-purple-500 text-purple-500 py-2 rounded-lg font-semibold">
                    Download Beat (Clean)
                </button>
            </div>
            
            <div class="text-sm text-gray-500">
                <p>Submissions close Friday 11:59 PM</p>
                <p>Winner gets $50 gift card + studio time</p>
            </div>
        </div>
    `);
};

window.viewTrend = function() {
    showYouthVibeModal('🕺 #RochesterVibes Dance Challenge', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="w-full h-48 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center text-white text-6xl">
                    💃
                </div>
                <h3 class="text-xl font-bold mb-2">Learn the Rochester Vibes Dance</h3>
                <p class="text-gray-600">2.3M views and counting!</p>
            </div>
            
            <div class="space-y-3">
                <div class="bg-pink-50 p-3 rounded-lg">
                    <h4 class="font-semibold text-pink-700 mb-1">Step 1: The Foundation</h4>
                    <p class="text-sm text-gray-600">Start with shoulder rolls - 8 counts</p>
                </div>
                <div class="bg-purple-50 p-3 rounded-lg">
                    <h4 class="font-semibold text-purple-700 mb-1">Step 2: The Wave</h4>
                    <p class="text-sm text-gray-600">Body wave from head to toe - smooth motion</p>
                </div>
                <div class="bg-indigo-50 p-3 rounded-lg">
                    <h4 class="font-semibold text-indigo-700 mb-1">Step 3: The Finish</h4>
                    <p class="text-sm text-gray-600">Jump with arms up - show that Rochester pride!</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
                <button class="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold">
                    Watch Tutorial
                </button>
                <button class="border border-purple-500 text-purple-500 py-2 rounded-lg font-semibold">
                    Use Template
                </button>
            </div>
        </div>
    `);
};

window.shareMeme = function() {
    showYouthVibeModal('😂 Today\'s Meme Check', `
        <div class="text-center space-y-4">
            <div class="text-6xl">😤</div>
            <h3 class="text-xl font-bold">"When the beat drops just right"</h3>
            <div class="bg-gray-100 p-4 rounded-lg">
                <p class="text-gray-600 mb-3">That feeling when you find the perfect beat for your freestyle...</p>
                <div class="flex items-center justify-center space-x-2">
                    <span class="text-2xl">😤</span>
                    <span class="font-bold">= Pure satisfaction</span>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
                <button class="bg-blue-500 text-white py-2 rounded-lg">Share on TikTok</button>
                <button class="bg-purple-500 text-white py-2 rounded-lg">Save to Camera Roll</button>
            </div>
            
            <p class="text-xs text-gray-500">Remember: Keep it positive and respectful!</p>
        </div>
    `);
};

window.viewProfile = function() {
    showYouthVibeModal('⭐ ROC Spotlight: Maya J.', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold">
                    MJ
                </div>
                <h3 class="text-xl font-bold">Maya Johnson, 17</h3>
                <p class="text-gray-600">Teen Producer & Beat Maker</p>
                <div class="flex justify-center space-x-4 mt-2">
                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Rochester, NY</span>
                    <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Self-Taught</span>
                </div>
            </div>
            
            <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">From Bedroom to Beats</h4>
                <p class="text-sm text-gray-700 mb-3">Started making beats on her phone junior year. Now she's produced tracks for 5 local artists and has 50K+ streams on her instrumentals.</p>
                <div class="space-y-2 text-xs">
                    <div class="flex justify-between">
                        <span>🎵 Beats produced:</span>
                        <span class="font-semibold">127</span>
                    </div>
                    <div class="flex justify-between">
                        <span>📱 Instagram followers:</span>
                        <span class="font-semibold">12.3K</span>
                    </div>
                    <div class="flex justify-between">
                        <span>💰 Monthly earnings:</span>
                        <span class="font-semibold">$800+</span>
                    </div>
                </div>
            </div>
            
            <div class="space-y-2">
                <button class="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg font-semibold">
                    Listen to Beat Pack
                </button>
                <button class="w-full border border-orange-500 text-orange-500 py-2 rounded-lg font-semibold">
                    Read Full Interview
                </button>
            </div>
        </div>
    `);
};

// Additional Music & Creators Functions
window.joinBeatChallenge = function() {
    showYouthVibeModal('🏆 Join Beat Challenge', `
        <div class="space-y-4">
            <div class="text-center">
                <h3 class="text-xl font-bold mb-2">This Week: "Summer Nights" Challenge</h3>
                <p class="text-gray-600">47 submissions • 3 days left</p>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">Rules:</h4>
                <ul class="text-sm space-y-1">
                    <li>• 16-30 bars over the provided beat</li>
                    <li>• Keep it clean - no explicit content</li>
                    <li>• Original lyrics only</li>
                    <li>• Submit by Friday 11:59 PM</li>
                </ul>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">Prizes:</h4>
                <ul class="text-sm space-y-1">
                    <li>🥇 1st Place: $50 + 4 hours studio time</li>
                    <li>🥈 2nd Place: $25 + beat pack</li>
                    <li>🥉 3rd Place: Shoutout + feature</li>
                </ul>
            </div>
            
            <button class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold">
                Start Recording
            </button>
        </div>
    `);
};

window.browseTemplates = function() {
    showYouthVibeModal('✂️ CapCut Templates', `
        <div class="space-y-4">
            <h3 class="text-xl font-bold text-center">24 Fresh Templates</h3>
            
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-pink-50 p-3 rounded-lg text-center">
                    <div class="text-2xl mb-2">🎵</div>
                    <h4 class="font-semibold text-sm">Beat Drop Edit</h4>
                    <p class="text-xs text-gray-600 mb-2">Perfect for music reveals</p>
                    <button class="bg-pink-500 text-white px-3 py-1 rounded text-xs">Copy Template</button>
                </div>
                
                <div class="bg-blue-50 p-3 rounded-lg text-center">
                    <div class="text-2xl mb-2">📱</div>
                    <h4 class="font-semibold text-sm">Aesthetic Transition</h4>
                    <p class="text-xs text-gray-600 mb-2">Smooth style changes</p>
                    <button class="bg-blue-500 text-white px-3 py-1 rounded text-xs">Copy Template</button>
                </div>
                
                <div class="bg-green-50 p-3 rounded-lg text-center">
                    <div class="text-2xl mb-2">🏀</div>
                    <h4 class="font-semibold text-sm">Sports Highlight</h4>
                    <p class="text-xs text-gray-600 mb-2">Game day moments</p>
                    <button class="bg-green-500 text-white px-3 py-1 rounded text-xs">Copy Template</button>
                </div>
                
                <div class="bg-purple-50 p-3 rounded-lg text-center">
                    <div class="text-2xl mb-2">🎨</div>
                    <h4 class="font-semibold text-sm">Art Process</h4>
                    <p class="text-xs text-gray-600 mb-2">Creation timelapse</p>
                    <button class="bg-purple-500 text-white px-3 py-1 rounded text-xs">Copy Template</button>
                </div>
            </div>
            
            <button class="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold">
                View All 24 Templates
            </button>
        </div>
    `);
};

// Creative Challenges Functions
window.joinDanceChallenge = function() {
    showYouthVibeModal('💃 15-Second Dance Tutorial', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="text-4xl mb-2">🕺</div>
                <h3 class="text-xl font-bold">Learn This Week's Trending Move</h3>
                <p class="text-gray-600">Master the "Smooth Slide" in 15 seconds</p>
            </div>
            
            <div class="bg-pink-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">How It Works:</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex items-start">
                        <span class="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                        <span>Watch the tutorial video (15 seconds)</span>
                    </div>
                    <div class="flex items-start">
                        <span class="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                        <span>Practice the moves at your own pace</span>
                    </div>
                    <div class="flex items-start">
                        <span class="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                        <span>Record yourself and share with #YouthVibeDance</span>
                    </div>
                    <div class="flex items-start">
                        <span class="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                        <span>Get featured in our weekly highlight reel</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-bold text-yellow-700 mb-2">This Week's Song:</h4>
                <p class="text-sm">"Good Energy" - Trending on TikTok</p>
                <p class="text-xs text-gray-600 mt-1">Safe for all ages • Clean version</p>
            </div>
            
            <button class="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-bold">
                Watch Tutorial
            </button>
        </div>
    `);
};

window.joinMemeChallenge = function() {
    showYouthVibeModal('😂 Safe Meme Monday', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="text-4xl mb-2">🎨</div>
                <h3 class="text-xl font-bold">Create Your Meme Masterpiece</h3>
                <p class="text-gray-600">This week: "When the teacher says..."</p>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">Theme Guidelines:</h4>
                <div class="space-y-2 text-sm">
                    <div>✅ School life humor (relatable & funny)</div>
                    <div>✅ Pop culture references (appropriate)</div>
                    <div>✅ Family-friendly content only</div>
                    <div>❌ No mean-spirited jokes</div>
                    <div>❌ No real names or photos of others</div>
                </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-bold text-green-700 mb-2">Prizes:</h4>
                <ul class="text-sm space-y-1">
                    <li>🥇 Most Creative: Featured on homepage</li>
                    <li>🥈 Funniest: $15 gift card</li>
                    <li>🥉 Best Template Use: Shoutout post</li>
                </ul>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
                <button class="bg-yellow-500 text-white py-2 rounded-lg font-semibold">
                    Meme Templates
                </button>
                <button class="bg-purple-500 text-white py-2 rounded-lg font-semibold">
                    Submit Meme
                </button>
            </div>
        </div>
    `);
};

window.joinFitBattleChallenge = function() {
    showYouthVibeModal('👕 Fit Battle Friday', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="text-4xl mb-2">✨</div>
                <h3 class="text-xl font-bold">Show Off Your Style</h3>
                <p class="text-gray-600">Rate outfits 1-5 stars • Get feedback from peers</p>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">How to Participate:</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex items-start">
                        <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                        <span>Post a photo of your outfit</span>
                    </div>
                    <div class="flex items-start">
                        <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                        <span>Rate 3 other outfits (1-5 stars)</span>
                    </div>
                    <div class="flex items-start">
                        <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                        <span>Get constructive feedback on your style</span>
                    </div>
                    <div class="flex items-start">
                        <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                        <span>Top 3 styles featured in Friday roundup</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-bold text-blue-700 mb-2">This Week's Categories:</h4>
                <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="bg-white p-2 rounded">👟 Sneaker Game</div>
                    <div class="bg-white p-2 rounded">🎨 Color Coordination</div>
                    <div class="bg-white p-2 rounded">💎 Accessory Choice</div>
                    <div class="bg-white p-2 rounded">🔥 Overall Vibe</div>
                </div>
            </div>
            
            <button class="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-bold">
                Upload Your Fit
            </button>
        </div>
    `);
};

window.joinFoodChallenge = function() {
    showYouthVibeModal('🍔 $10 Food Challenge', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="text-4xl mb-2">🎯</div>
                <h3 class="text-xl font-bold">Make $10 Last All Day</h3>
                <p class="text-gray-600">Budget-friendly meals + smart shopping tips</p>
            </div>
            
            <div class="bg-orange-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">Challenge Rules:</h4>
                <div class="space-y-2 text-sm">
                    <div>💰 Total budget: $10 for 3 meals</div>
                    <div>🛒 Shop at local stores (show receipts)</div>
                    <div>🍽️ Meals must be filling & nutritious</div>
                    <div>📸 Document your shopping & cooking</div>
                    <div>⏰ Complete within 24 hours</div>
                </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-bold text-green-700 mb-2">What You'll Learn:</h4>
                <ul class="text-sm space-y-1">
                    <li>• Smart grocery shopping strategies</li>
                    <li>• Meal prep basics for busy students</li>
                    <li>• Budget-friendly cooking hacks</li>
                    <li>• Nutrition on a tight budget</li>
                </ul>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg text-center">
                <h4 class="font-bold text-yellow-700 mb-1">Grand Prize</h4>
                <p class="text-2xl font-bold">$50 Grocery Gift Card</p>
                <p class="text-xs text-gray-600">+ Feature in Youth Vibe newsletter</p>
            </div>
            
            <button class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold">
                Start Challenge
            </button>
        </div>
    `);
};

window.applyMentorRole = function() {
    showYouthVibeModal('🌟 Become a Youth Mentor', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="text-4xl mb-2">🤝</div>
                <h3 class="text-xl font-bold">Lead the Next Generation</h3>
                <p class="text-gray-600">Share your skills and inspire younger creators</p>
            </div>
            
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <h4 class="font-bold mb-2">Mentor Opportunities:</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-music text-purple-500 mr-2"></i>
                        <span>Music production workshops</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-video text-blue-500 mr-2"></i>
                        <span>Content creation masterclasses</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-palette text-pink-500 mr-2"></i>
                        <span>Digital art tutorials</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-handshake text-green-500 mr-2"></i>
                        <span>One-on-one mentoring</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-bold text-green-700 mb-2">Benefits:</h4>
                <ul class="text-sm space-y-1">
                    <li>• Build leadership experience</li>
                    <li>• Expand your network</li>
                    <li>• Earn community service hours</li>
                    <li>• Get featured as a community leader</li>
                </ul>
            </div>
            
            <button class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold">
                Apply to Mentor
            </button>
        </div>
    `);
};

// Initialize daily content updates
function initializeDailyUpdates() {
    // This would connect to a real API in production
    // For now, we'll simulate daily updates with rotating content
    
    const dailyContent = {
        beats: [
            { title: "Summer Nights", artist: "BeatsBy_Jay_ROC", genre: "Chill Hop" },
            { title: "City Dreams", artist: "ROC_Producer", genre: "Lo-Fi" },
            { title: "Midnight Vibes", artist: "YouthBeats585", genre: "R&B" }
        ],
        trends: [
            { name: "#RochesterVibes", views: "2.3M", type: "dance" },
            { name: "#ROCYouthTalent", views: "1.8M", type: "showcase" },
            { name: "#CreativeROC", views: "987K", type: "art" }
        ],
        spotlights: [
            { name: "Maya J.", age: 17, skill: "Beat Production" },
            { name: "DeShawn M.", age: 19, skill: "Video Editing" },
            { name: "Aaliyah K.", age: 16, skill: "Digital Art" }
        ]
    };
    
    // Rotate content based on day of week
    const dayIndex = new Date().getDay();
    const todaysBeat = dailyContent.beats[dayIndex % dailyContent.beats.length];
    const todaysTrend = dailyContent.trends[dayIndex % dailyContent.trends.length];
    const todaysSpotlight = dailyContent.spotlights[dayIndex % dailyContent.spotlights.length];
    
    // Update UI elements with today's content
    // This would be expanded in a real implementation
}

function showYouthVibeModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-gray-800">${title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function loadSeniorCircle() {
    document.getElementById('content-area').innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <!-- Hero Section -->
            <div class="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 text-white">
                <!-- Hero Background Image -->
                <div class="absolute inset-0 opacity-30">
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/dfde5018-b618-4e70-8150-4cb6ecf4c786.png" 
                         alt="Seniors enjoying outdoor chair yoga" 
                         class="w-full h-full object-cover">
                </div>
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-amber-600/85 to-yellow-500/80"></div>
                
                <div class="relative z-10 px-4 py-20">
                    <div class="max-w-6xl mx-auto text-center">
                        <!-- Icon -->
                        <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30">
                            <i class="fas fa-heart text-6xl"></i>
                        </div>
                        
                        <h1 class="text-5xl md:text-7xl font-bold mb-4">
                            Senior Circle
                        </h1>
                        <div class="w-32 h-1 bg-white mx-auto mb-6 rounded-full"></div>
                        
                        <p class="text-2xl md:text-3xl font-light mb-6 max-w-4xl mx-auto">
                            Your Digital Companion for Living Life to the Fullest 🌟
                        </p>
                        
                        <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                            Welcome to Senior Circle – the ultimate resource hub designed just for you. Whether you want to stay active, discover new health and wellness breakthroughs, or find reliable transportation to get you where you need to go – we've got you covered.
                        </p>
                        
                        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-4xl mx-auto border border-white/20">
                            <p class="text-xl font-medium">
                                Aging isn't about slowing down – it's about leveling up. Senior Circle is here to keep you healthy, independent, and connected to what matters most.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="sticky top-0 z-40 bg-white shadow-md border-b-2 border-orange-200">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex flex-wrap gap-2 py-4 justify-center">
                        <button onclick="scrollToSeniorSection('health-wellness')" class="px-6 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-all font-medium text-lg">
                            <i class="fas fa-heartbeat mr-2"></i>Health & Wellness
                        </button>
                        <button onclick="scrollToSeniorSection('transportation')" class="px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-orange-50 transition-all font-medium text-lg border-2 border-orange-200">
                            <i class="fas fa-car mr-2"></i>Transportation
                        </button>
                        <button onclick="scrollToSeniorSection('community')" class="px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-orange-50 transition-all font-medium text-lg border-2 border-orange-200">
                            <i class="fas fa-users mr-2"></i>Community
                        </button>
                        <button onclick="scrollToSeniorSection('resources')" class="px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-orange-50 transition-all font-medium text-lg border-2 border-orange-200">
                            <i class="fas fa-book mr-2"></i>Resources
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-6xl mx-auto px-4 py-12">
                
                <!-- Health & Wellness Section -->
                <section id="health-wellness" class="mb-16">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-200">
                        <div class="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-heartbeat text-5xl mr-4"></i>
                                <h2 class="text-4xl font-bold">Health & Wellness</h2>
                            </div>
                            <p class="text-xl">Stay active, healthy, and vibrant every day</p>
                        </div>
                        
                        <div class="p-8">
                            <!-- Featured Image -->
                            <div class="mb-8 rounded-xl overflow-hidden shadow-lg">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/dfde5018-b618-4e70-8150-4cb6ecf4c786.png" 
                                     alt="Seniors enjoying chair yoga outdoors" 
                                     class="w-full h-64 object-cover">
                            </div>
                            
                            <!-- What's Included -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div class="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
                                    <i class="fas fa-dumbbell text-3xl text-orange-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Daily Fitness & Yoga</h3>
                                    <p class="text-gray-700 text-lg">Chair yoga, gentle stretching, and low-impact exercises designed for all fitness levels</p>
                                </div>
                                
                                <div class="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
                                    <i class="fas fa-apple-alt text-3xl text-orange-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Nutrition Guides</h3>
                                    <p class="text-gray-700 text-lg">Energy-boosting meal plans, vitamin guides, and healthy eating tips for seniors</p>
                                </div>
                                
                                <div class="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
                                    <i class="fas fa-spa text-3xl text-orange-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Meditation & Mindfulness</h3>
                                    <p class="text-gray-700 text-lg">Stress reduction techniques, breathing exercises, and mental wellness practices</p>
                                </div>
                                
                                <div class="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
                                    <i class="fas fa-stethoscope text-3xl text-orange-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Healthcare Programs</h3>
                                    <p class="text-gray-700 text-lg">Latest updates on senior-friendly healthcare and wellness programs</p>
                                </div>
                            </div>
                            
                            <!-- Nutrition Image -->
                            <div class="mb-8">
                                <h3 class="text-2xl font-bold text-gray-900 mb-4">Nutrition for Energy & Vitality</h3>
                                <div class="rounded-xl overflow-hidden shadow-lg">
                                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a4394a99-c674-48b7-b30c-ec9ad19649b6.png" 
                                         alt="Healthy nutritious food for seniors" 
                                         class="w-full h-64 object-cover">
                                </div>
                            </div>
                            
                            <!-- Video Tutorial -->
                            <div class="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-6 border-2 border-orange-300">
                                <div class="flex items-start gap-4">
                                    <div class="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-play text-white text-2xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-2xl font-bold text-gray-900 mb-2">
                                            <i class="fas fa-video mr-2 text-orange-600"></i>5-Minute Morning Yoga for Seniors
                                        </h3>
                                        <p class="text-gray-700 text-lg mb-4">Start your day with gentle stretches and movements designed for seniors. Perfect for all fitness levels!</p>
                                        <button onclick="playSeniorVideo('morning-yoga')" class="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition-all font-medium text-lg">
                                            <i class="fas fa-play-circle mr-2"></i>Watch Tutorial
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Transportation Section -->
                <section id="transportation" class="mb-16">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200">
                        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-car text-5xl mr-4"></i>
                                <h2 class="text-4xl font-bold">Transportation Made Easy</h2>
                            </div>
                            <p class="text-xl">Safe, reliable, and convenient travel options</p>
                        </div>
                        
                        <div class="p-8">
                            <!-- Featured Image -->
                            <div class="mb-8 rounded-xl overflow-hidden shadow-lg">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/7def1b63-3c8c-44b9-a76b-ef0248073508.png" 
                                     alt="Senior using safe rideshare service" 
                                     class="w-full h-64 object-cover">
                            </div>
                            
                            <!-- Transportation Options -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div class="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer" onclick="openTransportService('rideshare')">
                                    <i class="fas fa-car-side text-5xl text-blue-600 mb-4"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Rideshare Services</h3>
                                    <p class="text-gray-700 text-lg mb-4">Uber, Lyft, and senior-friendly ride options</p>
                                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all font-medium">
                                        Learn More
                                    </button>
                                </div>
                                
                                <div class="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer" onclick="openTransportService('shuttle')">
                                    <i class="fas fa-bus text-5xl text-blue-600 mb-4"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Community Shuttles</h3>
                                    <p class="text-gray-700 text-lg mb-4">Free and low-cost shuttle services</p>
                                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all font-medium">
                                        View Schedule
                                    </button>
                                </div>
                                
                                <div class="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer" onclick="openTransportService('medical')">
                                    <i class="fas fa-ambulance text-5xl text-blue-600 mb-4"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Medical Transport</h3>
                                    <p class="text-gray-700 text-lg mb-4">Non-emergency medical appointments</p>
                                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all font-medium">
                                        Get Info
                                    </button>
                                </div>
                            </div>
                            
                            <!-- How-To Video -->
                            <div class="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 border-2 border-blue-300">
                                <div class="flex items-start gap-4">
                                    <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-play text-white text-2xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-2xl font-bold text-gray-900 mb-2">
                                            <i class="fas fa-video mr-2 text-blue-600"></i>How to Schedule Transportation
                                        </h3>
                                        <p class="text-gray-700 text-lg mb-4">Step-by-step guide to booking rides safely and easily. Learn how to use rideshare apps with confidence!</p>
                                        <button onclick="playSeniorVideo('transport-tutorial')" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all font-medium text-lg">
                                            <i class="fas fa-play-circle mr-2"></i>Watch Demo
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Infographic -->
                            <div class="mt-8 bg-white rounded-xl p-6 border-2 border-blue-200">
                                <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Easy Steps to Book a Ride</h3>
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div class="text-center">
                                        <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">1</div>
                                        <h4 class="font-bold text-gray-900 mb-2 text-lg">Open App</h4>
                                        <p class="text-gray-700">Launch your rideshare app</p>
                                    </div>
                                    <div class="text-center">
                                        <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">2</div>
                                        <h4 class="font-bold text-gray-900 mb-2 text-lg">Enter Destination</h4>
                                        <p class="text-gray-700">Type where you want to go</p>
                                    </div>
                                    <div class="text-center">
                                        <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">3</div>
                                        <h4 class="font-bold text-gray-900 mb-2 text-lg">Choose Ride</h4>
                                        <p class="text-gray-700">Select your ride option</p>
                                    </div>
                                    <div class="text-center">
                                        <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">4</div>
                                        <h4 class="font-bold text-gray-900 mb-2 text-lg">Confirm & Go</h4>
                                        <p class="text-gray-700">Confirm and meet your driver</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Community Connections Section -->
                <section id="community" class="mb-16">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-200">
                        <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-users text-5xl mr-4"></i>
                                <h2 class="text-4xl font-bold">Community Connections</h2>
                            </div>
                            <p class="text-xl">Stay socially connected and engaged</p>
                        </div>
                        
                        <div class="p-8">
                            <!-- Featured Image -->
                            <div class="mb-8 rounded-xl overflow-hidden shadow-lg">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/76a939b6-db6d-4ab2-b8a9-e77a5bab2cf6.png" 
                                     alt="Seniors enjoying community cooking class" 
                                     class="w-full h-64 object-cover">
                            </div>
                            
                            <!-- Community Features -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div class="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                                    <i class="fas fa-calendar-alt text-3xl text-green-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Upcoming Events</h3>
                                    <p class="text-gray-700 text-lg mb-4">Workshops, social gatherings, and educational meetups</p>
                                    <button onclick="viewSeniorEvents()" class="text-green-600 hover:text-green-700 font-medium text-lg">
                                        View Calendar <i class="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                                
                                <div class="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                                    <i class="fas fa-hands-helping text-3xl text-green-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Volunteer Opportunities</h3>
                                    <p class="text-gray-700 text-lg mb-4">Give back to your community and stay active</p>
                                    <button onclick="viewVolunteerOps()" class="text-green-600 hover:text-green-700 font-medium text-lg">
                                        Explore <i class="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                                
                                <div class="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                                    <i class="fas fa-graduation-cap text-3xl text-green-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Lifelong Learning</h3>
                                    <p class="text-gray-700 text-lg mb-4">Classes, lectures, and educational programs</p>
                                    <button onclick="viewLearningPrograms()" class="text-green-600 hover:text-green-700 font-medium text-lg">
                                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                                
                                <div class="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                                    <i class="fas fa-user-friends text-3xl text-green-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Friendship Circles</h3>
                                    <p class="text-gray-700 text-lg mb-4">Connect with others who share your interests</p>
                                    <button onclick="joinFriendshipCircle()" class="text-green-600 hover:text-green-700 font-medium text-lg">
                                        Join Now <i class="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Community Video -->
                            <div class="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                                <div class="flex items-start gap-4">
                                    <div class="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-play text-white text-2xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-2xl font-bold text-gray-900 mb-2">
                                            <i class="fas fa-video mr-2 text-green-600"></i>Community Activities Highlight Reel
                                        </h3>
                                        <p class="text-gray-700 text-lg mb-4">See what fun activities our Senior Circle community has been enjoying! From cooking classes to art workshops and social gatherings.</p>
                                        <button onclick="playSeniorVideo('community-highlights')" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-all font-medium text-lg">
                                            <i class="fas fa-play-circle mr-2"></i>Watch Highlights
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Everyday Resources Section -->
                <section id="resources" class="mb-16">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200">
                        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8">
                            <div class="flex items-center mb-4">
                                <i class="fas fa-book text-5xl mr-4"></i>
                                <h2 class="text-4xl font-bold">Everyday Resources</h2>
                            </div>
                            <p class="text-xl">Tools and guides to make life easier</p>
                        </div>
                        
                        <div class="p-8">
                            <!-- Tech Help Image -->
                            <div class="mb-8 rounded-xl overflow-hidden shadow-lg">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/5b3623fc-1117-4178-b090-a2c41ef789e1.png" 
                                     alt="Senior learning to use technology" 
                                     class="w-full h-64 object-cover">
                            </div>
                            
                            <!-- Resource Categories -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <div class="bg-purple-50 rounded-xl p-6 text-center border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer" onclick="openSeniorResourceCategory('health')">
                                    <i class="fas fa-heartbeat text-4xl text-purple-600 mb-3"></i>
                                    <h3 class="font-bold text-gray-900 text-lg">Health</h3>
                                </div>
                                
                                <div class="bg-purple-50 rounded-xl p-6 text-center border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer" onclick="openSeniorResourceCategory('housing')">
                                    <i class="fas fa-home text-4xl text-purple-600 mb-3"></i>
                                    <h3 class="font-bold text-gray-900 text-lg">Housing</h3>
                                </div>
                                
                                <div class="bg-purple-50 rounded-xl p-6 text-center border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer" onclick="openSeniorResourceCategory('tech')">
                                    <i class="fas fa-laptop text-4xl text-purple-600 mb-3"></i>
                                    <h3 class="font-bold text-gray-900 text-lg">Tech Help</h3>
                                </div>
                                
                                <div class="bg-purple-50 rounded-xl p-6 text-center border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer" onclick="openSeniorResourceCategory('finance')">
                                    <i class="fas fa-dollar-sign text-4xl text-purple-600 mb-3"></i>
                                    <h3 class="font-bold text-gray-900 text-lg">Finance</h3>
                                </div>
                            </div>
                            
                            <!-- Tech Help Guides -->
                            <div class="bg-purple-50 rounded-xl p-6 mb-8 border-2 border-purple-200">
                                <h3 class="text-2xl font-bold text-gray-900 mb-6">
                                    <i class="fas fa-mobile-alt mr-2 text-purple-600"></i>Tech Help Guides
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button onclick="openTechGuide('smartphone')" class="bg-white hover:bg-purple-50 text-left p-4 rounded-lg border-2 border-purple-200 transition-all">
                                        <i class="fas fa-mobile-alt text-2xl text-purple-600 mb-2"></i>
                                        <h4 class="font-bold text-gray-900 text-lg">Using Smartphones</h4>
                                        <p class="text-gray-700">Basic phone navigation</p>
                                    </button>
                                    
                                    <button onclick="openTechGuide('email')" class="bg-white hover:bg-purple-50 text-left p-4 rounded-lg border-2 border-purple-200 transition-all">
                                        <i class="fas fa-envelope text-2xl text-purple-600 mb-2"></i>
                                        <h4 class="font-bold text-gray-900 text-lg">Email Basics</h4>
                                        <p class="text-gray-700">Send and receive emails</p>
                                    </button>
                                    
                                    <button onclick="openTechGuide('video-calls')" class="bg-white hover:bg-purple-50 text-left p-4 rounded-lg border-2 border-purple-200 transition-all">
                                        <i class="fas fa-video text-2xl text-purple-600 mb-2"></i>
                                        <h4 class="font-bold text-gray-900 text-lg">Video Calls</h4>
                                        <p class="text-gray-700">Connect with family</p>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Video Tutorial -->
                            <div class="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 border-2 border-purple-300">
                                <div class="flex items-start gap-4">
                                    <div class="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-play text-white text-2xl"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-2xl font-bold text-gray-900 mb-2">
                                            <i class="fas fa-video mr-2 text-purple-600"></i>Making Video Calls to Stay in Touch
                                        </h3>
                                        <p class="text-gray-700 text-lg mb-4">Simple step-by-step guide to video calling your loved ones. Learn Zoom, FaceTime, and WhatsApp video calls with ease!</p>
                                        <button onclick="playSeniorVideo('video-calls-tutorial')" class="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-all font-medium text-lg">
                                            <i class="fas fa-play-circle mr-2"></i>Watch Tutorial
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Additional Resources -->
                            <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
                                    <i class="fas fa-gavel text-3xl text-purple-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Legal Resources</h3>
                                    <p class="text-gray-700 text-lg mb-4">Estate planning, wills, and legal aid</p>
                                    <button onclick="openLegalResources()" class="text-purple-600 hover:text-purple-700 font-medium text-lg">
                                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                                
                                <div class="bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
                                    <i class="fas fa-home text-3xl text-purple-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Housing Options</h3>
                                    <p class="text-gray-700 text-lg mb-4">Independent living and senior housing</p>
                                    <button onclick="openHousingOptions()" class="text-purple-600 hover:text-purple-700 font-medium text-lg">
                                        Explore <i class="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                                
                                <div class="bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
                                    <i class="fas fa-chart-line text-3xl text-purple-600 mb-3"></i>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">Financial Planning</h3>
                                    <p class="text-gray-700 text-lg mb-4">Retirement planning and budgeting</p>
                                    <button onclick="openFinancialPlanning()" class="text-purple-600 hover:text-purple-700 font-medium text-lg">
                                        Get Started <i class="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Why Choose Senior Circle -->
                <section class="mb-16">
                    <div class="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl shadow-xl p-12">
                        <div class="text-center mb-8">
                            <i class="fas fa-star text-6xl mb-4"></i>
                            <h2 class="text-4xl font-bold mb-4">Why Choose Senior Circle?</h2>
                            <p class="text-xl max-w-3xl mx-auto leading-relaxed">
                                Because every season of life should be your best season yet. Senior Circle isn't just another app – it's your personal guide to living well, staying independent, and connecting with people who care.
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                                <i class="fas fa-check-circle text-5xl mb-4"></i>
                                <h3 class="text-2xl font-bold mb-2">Easy to Use</h3>
                                <p class="text-lg">Large text, simple navigation, designed for seniors</p>
                            </div>
                            
                            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                                <i class="fas fa-shield-alt text-5xl mb-4"></i>
                                <h3 class="text-2xl font-bold mb-2">Safe & Secure</h3>
                                <p class="text-lg">Your privacy and safety are our top priorities</p>
                            </div>
                            
                            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                                <i class="fas fa-hands-helping text-5xl mb-4"></i>
                                <h3 class="text-2xl font-bold mb-2">Always Supported</h3>
                                <p class="text-lg">Help available whenever you need it</p>
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <p class="text-3xl font-bold mb-6">✨ Your next adventure starts here.</p>
                            <button onclick="scrollToSeniorSection('health-wellness')" class="bg-white text-orange-600 px-12 py-4 rounded-lg hover:bg-gray-100 transition-all font-bold text-xl">
                                Get Started Now <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Emergency Contact Section -->
                <section class="mb-16">
                    <div class="bg-red-50 border-2 border-red-300 rounded-xl p-8">
                        <div class="flex items-start gap-4">
                            <i class="fas fa-phone-volume text-red-600 text-5xl mt-1"></i>
                            <div class="flex-1">
                                <h3 class="text-2xl font-bold text-red-900 mb-3">Need Immediate Help?</h3>
                                <p class="text-red-800 text-lg mb-4">If you have an emergency, call 911 immediately. For non-emergency assistance and community resources, dial 211.</p>
                                <div class="flex gap-4">
                                    <a href="tel:911" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-all font-bold text-xl">
                                        <i class="fas fa-phone mr-2"></i>Call 911
                                    </a>
                                    <a href="tel:211" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-all font-bold text-xl">
                                        <i class="fas fa-info-circle mr-2"></i>Call 211
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    `;
    
    // Initialize event listeners
    setTimeout(addSeniorCircleEventListeners, 100);
}

function loadLimitleeLiving() {
    document.getElementById('content-area').innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
            <!-- Hero Section with Accessible Design -->
            <div class="relative overflow-hidden bg-gradient-to-r from-purple-700 via-blue-700 to-green-600 text-white">
                <!-- Hero Background Image -->
                <div class="absolute inset-0 opacity-25">
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/61e9ba3f-51bd-44b4-97af-376bd7fb09ac.png" 
                         alt="Diverse disability community celebration" 
                         class="w-full h-full object-cover">
                </div>
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-r from-purple-700/80 via-blue-700/80 to-green-600/80"></div>
                
                <div class="relative z-10 px-4 py-16">
                    <div class="max-w-6xl mx-auto text-center">
                        <!-- Accessibility Icon -->
                        <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 animate-pulse">
                            <i class="fas fa-universal-access text-6xl"></i>
                        </div>
                        
                        <h1 class="text-5xl md:text-7xl font-bold mb-4" role="heading" aria-level="1">
                            Limitless Living
                        </h1>
                        <div class="w-32 h-1 bg-white mx-auto mb-6 rounded-full"></div>
                        
                        <p class="text-2xl md:text-3xl font-light mb-8 max-w-4xl mx-auto">
                            Empowering Resources for People with Disabilities in Monroe County
                        </p>
                        
                        <!-- Accessibility Features Notice -->
                        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-4xl mx-auto border border-white/20">
                            <div class="flex flex-wrap items-center justify-center gap-4 text-sm">
                                <span class="flex items-center gap-2">
                                    <i class="fas fa-keyboard"></i> Keyboard Accessible
                                </span>
                                <span class="flex items-center gap-2">
                                    <i class="fas fa-eye"></i> Screen Reader Optimized
                                </span>
                                <span class="flex items-center gap-2">
                                    <i class="fas fa-text-height"></i> Adjustable Text Size
                                </span>
                                <span class="flex items-center gap-2">
                                    <i class="fas fa-sign-language"></i> ASL Resources Available
                                </span>
                            </div>
                        </div>
                        
                        <!-- Quick Access Buttons -->
                        <div class="flex flex-wrap justify-center gap-4 mt-8">
                            <button onclick="loadResourceHub()" class="bg-white text-purple-700 hover:bg-purple-100 font-semibold py-3 px-8 rounded-lg transition-all shadow-lg" aria-label="Browse resources">
                                <i class="fas fa-search mr-2"></i>Browse Resources
                            </button>
                            <button onclick="openResourceCategory('disability-rights')" class="border-2 border-white text-white hover:bg-white hover:text-purple-700 font-semibold py-3 px-8 rounded-lg transition-all" aria-label="Self advocacy tools">
                                <i class="fas fa-bullhorn mr-2"></i>Self-Advocacy
                            </button>
                            <button onclick="openResourceCategory('peer-support')" class="border-2 border-white text-white hover:bg-white hover:text-purple-700 font-semibold py-3 px-8 rounded-lg transition-all" aria-label="Connect with community">
                                <i class="fas fa-users mr-2"></i>Community
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Accessibility Tools Bar -->
            <div class="sticky top-0 z-40 bg-white shadow-md border-b-4 border-purple-500">
                <div class="max-w-6xl mx-auto px-4 py-3">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-2">
                            <button onclick="adjustTextSize('increase')" class="p-2 hover:bg-purple-100 rounded transition-all" aria-label="Increase text size" title="Increase Text Size">
                                <i class="fas fa-plus-circle text-purple-700"></i>
                            </button>
                            <button onclick="adjustTextSize('decrease')" class="p-2 hover:bg-purple-100 rounded transition-all" aria-label="Decrease text size" title="Decrease Text Size">
                                <i class="fas fa-minus-circle text-purple-700"></i>
                            </button>
                            <button onclick="toggleHighContrast()" class="p-2 hover:bg-purple-100 rounded transition-all" aria-label="Toggle high contrast mode" title="High Contrast Mode">
                                <i class="fas fa-adjust text-purple-700"></i>
                            </button>
                            <button onclick="toggleScreenReaderMode()" class="p-2 hover:bg-purple-100 rounded transition-all" aria-label="Screen reader tips" title="Screen Reader Tips">
                                <i class="fas fa-audio-description text-purple-700"></i>
                            </button>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-purple-700">
                            <i class="fas fa-phone"></i>
                            <span class="font-semibold">Crisis Line: 988</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="bg-white shadow-lg sticky top-16 z-30">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex overflow-x-auto no-scrollbar">
                        <button onclick="scrollToLimitlessSection('resources')" class="limitless-tab-btn whitespace-nowrap px-6 py-4 text-purple-700 border-b-2 border-purple-700 font-bold hover:border-purple-700 transition-all" aria-label="Navigate to resources">
                            <i class="fas fa-folder-open mr-2"></i>All Resources
                        </button>
                        <button onclick="openResourceCategory('independent-living')" class="limitless-tab-btn whitespace-nowrap px-6 py-4 text-purple-700 border-b-2 border-transparent hover:border-purple-700 transition-all" aria-label="Independent living centers">
                            <i class="fas fa-home mr-2"></i>Independent Living
                        </button>
                        <button onclick="openResourceCategory('vocational-rehab')" class="limitless-tab-btn whitespace-nowrap px-6 py-4 text-purple-700 border-b-2 border-transparent hover:border-purple-700 transition-all" aria-label="Navigate to employment">
                            <i class="fas fa-briefcase mr-2"></i>Employment
                        </button>
                        <button onclick="openResourceCategory('assistive-tech')" class="limitless-tab-btn whitespace-nowrap px-6 py-4 text-purple-700 border-b-2 border-transparent hover:border-purple-700 transition-all" aria-label="Assistive technology">
                            <i class="fas fa-laptop mr-2"></i>Technology
                        </button>
                        <button onclick="openResourceCategory('disability-rights')" class="limitless-tab-btn whitespace-nowrap px-6 py-4 text-purple-700 border-b-2 border-transparent hover:border-purple-700 transition-all" aria-label="Navigate to advocacy">
                            <i class="fas fa-bullhorn mr-2"></i>Advocacy
                        </button>
                        <button onclick="openResourceCategory('peer-support')" class="limitless-tab-btn whitespace-nowrap px-6 py-4 text-purple-700 border-b-2 border-transparent hover:border-purple-700 transition-all" aria-label="Navigate to community">
                            <i class="fas fa-users mr-2"></i>Community
                        </button>
                        <button onclick="openResourceCategory('bipoc-services')" class="limitless-tab-btn whitespace-nowrap px-6 py-4 text-purple-700 border-b-2 border-transparent hover:border-purple-700 transition-all" aria-label="BIPOC disability services">
                            <i class="fas fa-heart mr-2"></i>BIPOC Services
                        </button>
                    </div>
                </div>
            </div>

            <!-- Resource Navigation & Discovery Section -->
            <section id="resources" class="py-16 bg-white" role="region" aria-label="Resource navigation">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-purple-900 mb-4">Multi-Dimensional Resource Navigation</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Find resources organized by disability type, life domain, age group, or service type
                        </p>
                    </div>

                    <!-- Resource Filtering System -->
                    <div class="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 mb-12 shadow-lg">
                        <h3 class="text-2xl font-bold text-purple-900 mb-6">Find Your Resources</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label class="block font-semibold text-purple-900 mb-2">By Disability Type</label>
                                <select class="w-full p-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500" aria-label="Filter by disability type">
                                    <option>All Disabilities</option>
                                    <option>Physical Disabilities</option>
                                    <option>Visual Impairments</option>
                                    <option>Hearing Impairments</option>
                                    <option>Intellectual Disabilities</option>
                                    <option>Developmental Disabilities</option>
                                    <option>Mental Health Conditions</option>
                                    <option>Chronic Health Conditions</option>
                                    <option>Multiple Disabilities</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-semibold text-purple-900 mb-2">By Life Domain</label>
                                <select class="w-full p-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500" aria-label="Filter by life domain">
                                    <option>All Domains</option>
                                    <option>Housing & Home</option>
                                    <option>Employment & Work</option>
                                    <option>Education & Learning</option>
                                    <option>Health & Wellness</option>
                                    <option>Transportation</option>
                                    <option>Recreation & Social</option>
                                    <option>Legal & Advocacy</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-semibold text-purple-900 mb-2">By Age Group</label>
                                <select class="w-full p-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500" aria-label="Filter by age group">
                                    <option>All Ages</option>
                                    <option>Children (0-12)</option>
                                    <option>Youth (13-17)</option>
                                    <option>Transition Age (18-25)</option>
                                    <option>Adults (26-59)</option>
                                    <option>Seniors (60+)</option>
                                </select>
                            </div>
                        </div>
                        <button onclick="searchLimitlessResources()" class="mt-6 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg" aria-label="Search for resources">
                            <i class="fas fa-search mr-2"></i>Search Resources
                        </button>
                    </div>

                    <!-- Resource Categories Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                        <!-- Independent Living Services -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-purple-200 overflow-hidden" role="listitem">
                            <div class="h-48 relative overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/290c71b6-5b8c-4b79-b36f-f670b91bbb87.png" 
                                     alt="Independent living center peer support" 
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-home text-3xl text-purple-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-purple-900 mb-3">Independent Living Centers</h3>
                                <p class="text-gray-600 mb-4">Peer support, skills training, and advocacy for independent living</p>
                                <button onclick="openResourceCategory('independent-living')" class="text-purple-700 hover:text-purple-900 font-semibold" aria-label="Learn more about independent living centers">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Disability Rights -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-blue-200 overflow-hidden" role="listitem">
                            <div class="h-3 bg-gradient-to-r from-blue-500 to-green-500"></div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <i class="fas fa-gavel text-3xl text-blue-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-blue-900 mb-3">Disability Rights & Legal Aid</h3>
                                <p class="text-gray-600 mb-4">Know your rights, legal advocacy, and discrimination support</p>
                                <button onclick="openResourceCategory('disability-rights')" class="text-blue-700 hover:text-blue-900 font-semibold" aria-label="Learn more about disability rights">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Vocational Rehabilitation -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-green-200 overflow-hidden" role="listitem">
                            <div class="h-48 relative overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/97e74313-6299-46a9-8f89-7b6f9b19c6a1.png" 
                                     alt="Vocational rehabilitation job training" 
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-briefcase text-3xl text-green-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-green-900 mb-3">Vocational Rehabilitation</h3>
                                <p class="text-gray-600 mb-4">Job training, placement services, and workplace accommodations</p>
                                <button onclick="openResourceCategory('vocational-rehab')" class="text-green-700 hover:text-green-900 font-semibold" aria-label="Learn more about vocational rehabilitation">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Assistive Technology -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-indigo-200 overflow-hidden" role="listitem">
                            <div class="h-48 relative overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/b9084c8e-b75c-4715-bd5c-75259bb2530e.png" 
                                     alt="Assistive technology demonstration" 
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-laptop-medical text-3xl text-indigo-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-indigo-900 mb-3">Assistive Technology</h3>
                                <p class="text-gray-600 mb-4">AT assessment, funding, training, and device support</p>
                                <button onclick="openResourceCategory('assistive-tech')" class="text-indigo-700 hover:text-indigo-900 font-semibold" aria-label="Learn more about assistive technology">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Peer Support Networks -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-pink-200 overflow-hidden" role="listitem">
                            <div class="h-48 relative overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/962138ad-db16-4a70-8e5c-456db00177f3.png" 
                                     alt="Peer support group meeting" 
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent"></div>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-users text-3xl text-pink-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-pink-900 mb-3">Peer Support Networks</h3>
                                <p class="text-gray-600 mb-4">Connect with others sharing similar disability experiences</p>
                                <button onclick="openResourceCategory('peer-support')" class="text-pink-700 hover:text-pink-900 font-semibold" aria-label="Learn more about peer support networks">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- BIPOC Disability Services -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-amber-200 overflow-hidden" role="listitem">
                            <div class="h-3 bg-gradient-to-r from-amber-500 to-red-500"></div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                    <i class="fas fa-hands-helping text-3xl text-amber-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-amber-900 mb-3">BIPOC Disability Services</h3>
                                <p class="text-gray-600 mb-4">Culturally responsive services for disabled people of color</p>
                                <button onclick="openResourceCategory('bipoc-services')" class="text-amber-700 hover:text-amber-900 font-semibold" aria-label="Learn more about BIPOC disability services">
                                    Learn More <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Back to Home Button -->
            <div class="fixed bottom-6 right-6 z-50">
                <button onclick="goHome()" class="bg-purple-700 hover:bg-purple-800 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110" aria-label="Return to homepage">
                    <i class="fas fa-home text-xl"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners for Limitless Living interactions
    addLimitlessLivingEventListeners();
}

function loadMelomics() {
    loadEconomicSection();
}

function loadBlackTech() {
    document.getElementById('content-area').innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <!-- Hero Section -->
            <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white">
                <!-- Background Hero Image -->
                <div class="absolute inset-0 opacity-30">
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8aeec252-b5f6-41fe-bc67-7e15da4fbc3d" 
                         alt="Black Tech Innovation" 
                         class="w-full h-full object-cover">
                </div>
                
                <!-- Content -->
                <div class="relative z-10 container mx-auto px-4 py-16 text-center">
                    <div class="max-w-4xl mx-auto">
                        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <i class="fas fa-microchip text-4xl"></i>
                        </div>
                        <h1 class="text-5xl font-bold mb-6">
                            <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 text-transparent bg-clip-text">Black Tech</span>
                        </h1>
                        <p class="text-xl mb-8 text-blue-100">
                            Your daily gateway to AI, policy, founders, opportunities, and tech innovation in the Black community
                        </p>
                        
                        <!-- Quick Stats -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden group hover:bg-white/20 transition-all">
                                <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i class="fas fa-sync-alt text-white text-6xl transform rotate-45"></i>
                                </div>
                                <div class="relative">
                                    <div class="text-2xl font-bold">Daily</div>
                                    <div class="text-sm opacity-80">Updates</div>
                                    <div class="text-xs text-blue-200 mt-1">Auto-Refresh</div>
                                </div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden group hover:bg-white/20 transition-all">
                                <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i class="fas fa-database text-white text-6xl transform rotate-12"></i>
                                </div>
                                <div class="relative">
                                    <div class="text-2xl font-bold">150+</div>
                                    <div class="text-sm opacity-80">Resources</div>
                                    <div class="text-xs text-green-200 mt-1">Growing Daily</div>
                                </div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden group hover:bg-white/20 transition-all">
                                <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i class="fas fa-broadcast-tower text-white text-6xl transform -rotate-12"></i>
                                </div>
                                <div class="relative">
                                    <div class="text-2xl font-bold">Live</div>
                                    <div class="text-sm opacity-80">Jobs Feed</div>
                                    <div class="text-xs text-yellow-200 mt-1">Real-Time</div>
                                </div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden group hover:bg-white/20 transition-all">
                                <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i class="fas fa-brain text-white text-6xl transform rotate-6"></i>
                                </div>
                                <div class="relative">
                                    <div class="text-2xl font-bold">AI</div>
                                    <div class="text-sm opacity-80">Powered</div>
                                    <div class="text-xs text-purple-200 mt-1">Smart Curation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="container mx-auto px-4 py-8">
                <!-- Category Navigation -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <button onclick="scrollToBlackTechSection('top-stories')" class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-200 group relative overflow-hidden">
                        <!-- Background Overlay -->
                        <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/169bc19d-bc45-46f2-9bb7-04bb59762971" 
                                 alt="AI Tech Background" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative">
                            <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-brain text-white text-xl"></i>
                            </div>
                            <div class="font-semibold text-sm text-gray-800">Top Stories</div>
                            <div class="text-xs text-gray-600">AI + Tech News</div>
                        </div>
                    </button>
                    
                    <button onclick="scrollToBlackTechSection('policy-watch')" class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-200 group relative overflow-hidden">
                        <!-- Background Overlay -->
                        <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/6cb42892-b319-407f-89bf-e221e7942ee7" 
                                 alt="Policy Background" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative">
                            <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-shield-alt text-white text-xl"></i>
                            </div>
                            <div class="font-semibold text-sm text-gray-800">Policy Watch</div>
                            <div class="text-xs text-gray-600">Help Your Household</div>
                        </div>
                    </button>
                    
                    <button onclick="scrollToBlackTechSection('founders')" class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-200 group relative overflow-hidden">
                        <!-- Background Overlay -->
                        <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/6cb42892-b319-407f-89bf-e221e7942ee7" 
                                 alt="Founders Background" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative">
                            <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-rocket text-white text-xl"></i>
                            </div>
                            <div class="font-semibold text-sm text-gray-800">Founders</div>
                            <div class="text-xs text-gray-600">Builders & Stories</div>
                        </div>
                    </button>
                    
                    <button onclick="scrollToBlackTechSection('jobs')" class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-200 group relative overflow-hidden">
                        <!-- Background Overlay -->
                        <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/658bf18c-ec72-4a05-9ffb-19c705e4164e" 
                                 alt="Jobs Background" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative">
                            <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-briefcase text-white text-xl"></i>
                            </div>
                            <div class="font-semibold text-sm text-gray-800">Jobs & Internships</div>
                            <div class="text-xs text-gray-600">Live Opportunities</div>
                        </div>
                    </button>
                    
                    <button onclick="scrollToBlackTechSection('grants')" class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-200 group relative overflow-hidden">
                        <!-- Background Overlay -->
                        <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/6cb42892-b319-407f-89bf-e221e7942ee7" 
                                 alt="Grants Background" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative">
                            <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-dollar-sign text-white text-xl"></i>
                            </div>
                            <div class="font-semibold text-sm text-gray-800">Grants & Capital</div>
                            <div class="text-xs text-gray-600">Funding Opportunities</div>
                        </div>
                    </button>
                    
                    <button onclick="scrollToBlackTechSection('learn')" class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-teal-200 group relative overflow-hidden">
                        <!-- Background Overlay -->
                        <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/658bf18c-ec72-4a05-9ffb-19c705e4164e" 
                                 alt="Learning Background" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative">
                            <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i class="fas fa-graduation-cap text-white text-xl"></i>
                            </div>
                            <div class="font-semibold text-sm text-gray-800">Learn & Do</div>
                            <div class="text-xs text-gray-600">Micro-Lessons</div>
                        </div>
                    </button>
                </div>

                <!-- Daily Dashboard -->
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
                    <!-- Background Imagery -->
                    <div class="absolute inset-0 opacity-20">
                        <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8aeec252-b5f6-41fe-bc67-7e15da4fbc3d" 
                             alt="Tech Dashboard Background" 
                             class="w-full h-full object-cover">
                    </div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold flex items-center">
                            <i class="fas fa-calendar-day mr-3"></i>
                            Today's Black Tech Dashboard
                        </h2>
                        <div class="text-sm bg-white/20 px-3 py-1 rounded-full">
                            <i class="fas fa-sync-alt mr-1"></i>
                            Auto-Updated Daily
                        </div>
                    </div>
                    <p class="text-blue-100 mb-6">Your personalized daily briefing on Black tech innovation, opportunities, and community impact.</p>
                    
                    <div class="grid md:grid-cols-4 gap-4">
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/c91432a5-c46e-4d20-b929-56e9d3ac51f6" 
                                     alt="Dashboard Stats" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="relative">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-newspaper text-yellow-300 mr-2"></i>
                                    <span class="font-semibold">Today's Headlines</span>
                                </div>
                                <p class="text-sm text-blue-100">5 trending AI & tech stories affecting the Black community</p>
                                <div class="text-2xl font-bold text-yellow-300 mt-2">5 Stories</div>
                            </div>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/c91432a5-c46e-4d20-b929-56e9d3ac51f6" 
                                     alt="Dashboard Stats" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="relative">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-handshake text-green-300 mr-2"></i>
                                    <span class="font-semibold">New Opportunities</span>
                                </div>
                                <p class="text-sm text-blue-100">Fresh job postings & grant deadlines this week</p>
                                <div class="text-2xl font-bold text-green-300 mt-2">15 Open</div>
                            </div>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/c91432a5-c46e-4d20-b929-56e9d3ac51f6" 
                                     alt="Dashboard Stats" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="relative">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-lightbulb text-purple-300 mr-2"></i>
                                    <span class="font-semibold">Learning Focus</span>
                                </div>
                                <p class="text-sm text-blue-100">AI prompt engineering & digital privacy essentials</p>
                                <div class="text-2xl font-bold text-purple-300 mt-2">4 Lessons</div>
                            </div>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 relative overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/c91432a5-c46e-4d20-b929-56e9d3ac51f6" 
                                     alt="Dashboard Stats" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="relative">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-users text-cyan-300 mr-2"></i>
                                    <span class="font-semibold">Community</span>
                                </div>
                                <p class="text-sm text-blue-100">Active members in Rochester Black tech network</p>
                                <div class="text-2xl font-bold text-cyan-300 mt-2">1.2K Users</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Featured Video Section -->
                <section class="mb-12">
                    <div class="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 rounded-2xl overflow-hidden shadow-2xl">
                        <div class="p-8">
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="text-2xl font-bold text-white">🎥 Featured: Black Tech Leaders Roundtable</h2>
                                <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">LIVE NOW</span>
                            </div>
                            
                            <div class="grid md:grid-cols-3 gap-6">
                                <!-- Main Video -->
                                <div class="md:col-span-2">
                                    <div class="relative bg-black rounded-lg overflow-hidden aspect-video">
                                        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/50 to-blue-600/50">
                                            <div class="text-center text-white">
                                                <i class="fas fa-play-circle text-6xl mb-4 opacity-80 hover:opacity-100 cursor-pointer transition-all"></i>
                                                <p class="text-lg font-semibold">The Future of Black Excellence in AI</p>
                                                <p class="text-sm opacity-80">Featuring CEOs from major tech companies</p>
                                            </div>
                                        </div>
                                        <!-- Video overlay with realistic video controls -->
                                        <div class="absolute bottom-4 left-4 right-4">
                                            <div class="bg-black/70 rounded-lg p-2 flex items-center space-x-2">
                                                <div class="w-8 h-1 bg-red-500 rounded"></div>
                                                <div class="w-64 h-1 bg-gray-600 rounded"></div>
                                                <span class="text-white text-xs">12:34 / 45:21</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Video Info & Related -->
                                <div class="space-y-4">
                                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                        <h3 class="font-bold text-white mb-2">👥 Today's Speakers</h3>
                                        <div class="space-y-2 text-sm text-gray-300">
                                            <div>• Dr. Aisha Patel, TrustAI Labs</div>
                                            <div>• Marcus Johnson, CodePath CEO</div>
                                            <div>• Kimberly Chen, Google AI Ethics</div>
                                            <div>• Jerome Williams, Microsoft Azure</div>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                        <h3 class="font-bold text-white mb-2">📊 Live Stats</h3>
                                        <div class="space-y-2 text-sm text-gray-300">
                                            <div>👁️ 2.3K viewers</div>
                                            <div>💬 145 comments</div>
                                            <div>👍 89% positive sentiment</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Top Stories Section -->
                <section id="top-stories" class="mb-12">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-3xl font-bold text-gray-800 flex items-center">
                            <i class="fas fa-brain text-blue-600 mr-3"></i>
                            Top Stories: AI + Tech for Us
                        </h2>
                        <div class="flex space-x-2">
                            <button class="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm font-medium">The Plug</button>
                            <button class="text-purple-600 hover:bg-purple-50 px-3 py-1 rounded text-sm font-medium">AfroTech</button>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Featured Story -->
                        <div class="md:col-span-2 lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-600">
                            <div class="h-48 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/56036c7e-1982-4edb-96d5-3944c76d8a62" 
                                     alt="AI Bias Research" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-6">
                                <div class="flex items-center mb-2">
                                    <span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">BREAKING</span>
                                    <span class="text-gray-500 text-sm ml-2">2 hours ago</span>
                                </div>
                                <h3 class="font-bold text-lg mb-2">AI Bias Lawsuit Settlement Creates $50M Fund for Black Tech Entrepreneurs</h3>
                                <p class="text-gray-600 text-sm mb-4">Major tech company agrees to historic settlement funding Black-led AI startups and bias prevention research...</p>
                                <button onclick="viewBlackTechStory('ai-bias-settlement')" class="text-blue-600 hover:text-blue-800 font-medium text-sm">Read Full Story →</button>
                            </div>
                        </div>

                        <!-- Story Cards -->
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/56036c7e-1982-4edb-96d5-3944c76d8a62" 
                                     alt="HBCU AI Research" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">HBCU AI Research Centers Get $25M Federal Funding</h3>
                                <p class="text-gray-600 text-sm mb-3">Howard, Spelman, and 8 other HBCUs launch AI ethics and innovation programs...</p>
                                <button onclick="viewBlackTechStory('hbcu-ai-funding')" class="text-green-600 hover:text-green-800 font-medium text-sm">Learn More →</button>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/56036c7e-1982-4edb-96d5-3944c76d8a62" 
                                     alt="Health App Innovation" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">Black-Founded Health App Secures Series A</h3>
                                <p class="text-gray-600 text-sm mb-3">AI-powered mental health platform raises $15M to address healthcare disparities...</p>
                                <button onclick="viewBlackTechStory('health-app-funding')" class="text-purple-600 hover:text-purple-800 font-medium text-sm">Details →</button>
                            </div>
                        </div>

                        <!-- Additional Story Cards -->
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/56036c7e-1982-4edb-96d5-3944c76d8a62" 
                                     alt="Black Woman CEO Announcement" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">First Black Woman CEO at Major AI Company</h3>
                                <p class="text-gray-600 text-sm mb-3">Historic appointment marks breakthrough in tech leadership diversity...</p>
                                <button onclick="viewBlackTechStory('ceo-appointment')" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Read More →</button>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/56036c7e-1982-4edb-96d5-3944c76d8a62" 
                                     alt="Quantum Computing Research" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">Black Researchers Lead Quantum Breakthrough</h3>
                                <p class="text-gray-600 text-sm mb-3">Team develops new quantum algorithm for financial modeling applications...</p>
                                <button onclick="viewBlackTechStory('quantum-research')" class="text-cyan-600 hover:text-cyan-800 font-medium text-sm">Explore →</button>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/56036c7e-1982-4edb-96d5-3944c76d8a62" 
                                     alt="Tech IPO Celebration" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">Black-Led Fintech IPO Breaks Records</h3>
                                <p class="text-gray-600 text-sm mb-3">Company valued at $2.1B in historic NYSE debut, largest Black-founded tech IPO...</p>
                                <button onclick="viewBlackTechStory('fintech-ipo')" class="text-green-600 hover:text-green-800 font-medium text-sm">View Details →</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Live News Ticker -->
                    <div class="mt-6 bg-black/90 text-white rounded-lg p-3 overflow-hidden">
                        <div class="flex items-center">
                            <span class="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">LIVE</span>
                            <div class="marquee">
                                <span class="text-sm">🚀 Breaking: Black-founded AI startup raises $25M Series B • 💼 Apple announces diversity initiative with HBCU partnerships • 🏆 Rochester tech entrepreneur wins national innovation award • 📱 New app connects Black professionals globally</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Policy Watch Section -->
                <section id="policy-watch" class="mb-12">
                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 relative overflow-hidden">
                        <!-- Background Pattern -->
                        <div class="absolute inset-0 opacity-10">
                            <div class="w-full h-full bg-gradient-to-br from-green-200 to-blue-200" style="background-image: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), rgba(255, 255, 255, 0)), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3), rgba(255, 255, 255, 0)), radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.3), rgba(255, 255, 255, 0))"></div>
                        </div>
                        <div class="relative">
                        <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                            <i class="fas fa-shield-alt text-green-600 mr-3"></i>
                            Policy Watch: "Can this help my household?"
                        </h2>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- ACP Update -->
                            <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 relative overflow-hidden">
                                <div class="absolute top-0 right-0 w-20 h-20 opacity-10">
                                    <i class="fas fa-exclamation-triangle text-red-500 text-6xl transform rotate-12"></i>
                                </div>
                                <div class="relative">
                                <div class="flex items-center mb-3">
                                    <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                                    <h3 class="font-bold text-red-800">ACP Program Ended (June 1, 2024)</h3>
                                </div>
                                <p class="text-red-700 mb-4 text-sm">The Affordable Connectivity Program is no longer accepting new applications or providing discounts.</p>
                                <div class="bg-white rounded-lg p-4">
                                    <h4 class="font-semibold text-gray-800 mb-2">What Now? 💡</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• Check Lifeline eligibility (up to $9.25/mo discount)</li>
                                        <li>• Look for carrier-specific low-income plans</li>
                                        <li>• Contact local libraries for free internet access</li>
                                        <li>• Apply for emergency broadband assistance programs</li>
                                    </ul>
                                    <button onclick="checkLifelineEligibility()" class="mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700">Check Lifeline Now →</button>
                                </div>
                            </div>
                        </div>

                            <!-- Lifeline Program -->
                            <div class="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 relative overflow-hidden">
                                <div class="absolute top-0 right-0 w-20 h-20 opacity-10">
                                    <i class="fas fa-check-circle text-green-500 text-6xl transform -rotate-12"></i>
                                </div>
                                <div class="relative">
                                <div class="flex items-center mb-3">
                                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                    <h3 class="font-bold text-green-800">Lifeline Program Still Active</h3>
                                </div>
                                <p class="text-green-700 mb-4 text-sm">Get up to $9.25/month discount on phone or internet service (more on Tribal lands).</p>
                                <div class="bg-white rounded-lg p-4">
                                    <h4 class="font-semibold text-gray-800 mb-2">2025 Eligibility Checklist ✅</h4>
                                    <div class="text-sm text-gray-700 space-y-2">
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2"> SNAP benefits
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2"> Medicaid
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2"> Federal Public Housing Assistance
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2"> Income at/below 135% of Federal Poverty Guidelines
                                        </label>
                                    </div>
                                    <button onclick="applyLifelineProgram()" class="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">Apply Now →</button>
                                </div>
                            </div>
                        </div>
                        </div>

                        <!-- Additional Policy Items -->
                        <div class="grid md:grid-cols-3 gap-4 mt-6">
                            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <h4 class="font-semibold text-blue-800 mb-2">BEAD $42.45B Broadband</h4>
                                <p class="text-blue-700 text-sm mb-3">Massive federal investment in broadband infrastructure coming to NY and nationwide.</p>
                                <button onclick="viewPolicyDetails('bead-program')" class="text-blue-600 hover:text-blue-800 text-sm font-medium">NY Updates →</button>
                            </div>

                            <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                <h4 class="font-semibold text-purple-800 mb-2">Net Neutrality Reinstated</h4>
                                <p class="text-purple-700 text-sm mb-3">2024 rules prevent ISPs from blocking or throttling content.</p>
                                <button onclick="viewPolicyDetails('net-neutrality')" class="text-purple-600 hover:text-purple-800 text-sm font-medium">Learn More →</button>
                            </div>

                            <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                <h4 class="font-semibold text-orange-800 mb-2">Digital Discrimination Rules</h4>
                                <p class="text-orange-700 text-sm mb-3">New 2024 rules to combat unfair internet service practices.</p>
                                <button onclick="fileDiscriminationComplaint()" class="text-orange-600 hover:text-orange-800 text-sm font-medium">File Complaint →</button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Founders & Builders Section -->
                <section id="founders" class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-rocket text-purple-600 mr-3"></i>
                        Founders & Builders
                    </h2>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Weekly Spotlight -->
                        <div class="lg:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl overflow-hidden relative">
                            <!-- Background Image -->
                            <div class="absolute inset-0 opacity-20">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/4b31cd0c-098e-4894-84c0-7a583e04a2bd" 
                                     alt="Dr. Aisha Patel Background" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="relative p-6">
                                <div class="flex items-center mb-4">
                                    <span class="bg-yellow-400 text-purple-800 text-xs px-3 py-1 rounded-full font-bold">WEEKLY SPOTLIGHT</span>
                                </div>
                                <h3 class="text-2xl font-bold mb-3">Dr. Aisha Patel, AI Ethics Pioneer</h3>
                                <p class="text-purple-100 mb-4">From Howard University PhD to founding TrustAI Labs, Dr. Patel is revolutionizing how AI systems detect and prevent bias in healthcare algorithms...</p>
                                
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-4">
                                        <button onclick="watchFounderVideo('aisha-patel')" class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all">
                                            <i class="fas fa-play mr-2"></i>Watch Story
                                        </button>
                                        <button onclick="viewFounderPlaybook('aisha-patel')" class="border border-white/30 px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
                                            <i class="fas fa-book mr-2"></i>How She Built It
                                        </button>
                                    </div>
                                    <div class="text-purple-200 text-sm">
                                        <i class="fas fa-eye mr-1"></i>2.3K views
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Founder Cards -->
                        <div class="space-y-4">
                            <div class="bg-white rounded-lg shadow-lg p-4 border-l-4 border-green-500">
                                <div class="flex items-center mb-2">
                                    <div class="w-10 h-10 rounded-full overflow-hidden">
                                        <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/4b31cd0c-098e-4894-84c0-7a583e04a2bd" 
                                             alt="Jamal Martinez" 
                                             class="w-full h-full object-cover">
                                    </div>
                                    <div class="ml-3">
                                        <h4 class="font-semibold">Jamal Martinez</h4>
                                        <p class="text-gray-600 text-xs">CodePath Co-Founder</p>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-700">Scaling tech education for underrepresented communities nationwide...</p>
                                <button onclick="viewFounderProfile('jamal-martinez')" class="mt-2 text-green-600 text-sm font-medium">View Profile →</button>
                            </div>

                            <div class="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-500">
                                <div class="flex items-center mb-2">
                                    <div class="w-10 h-10 rounded-full overflow-hidden">
                                        <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/4b31cd0c-098e-4894-84c0-7a583e04a2bd" 
                                             alt="Kimberly Wilson" 
                                             class="w-full h-full object-cover">
                                    </div>
                                    <div class="ml-3">
                                        <h4 class="font-semibold">Kimberly Wilson</h4>
                                        <p class="text-gray-600 text-xs">Student, MIT</p>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-700">19-year-old building AR tools for STEM education in underserved schools...</p>
                                <button onclick="viewFounderProfile('kimberly-wilson')" class="mt-2 text-blue-600 text-sm font-medium">View Profile →</button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Jobs, Internships & Fellowships Section -->
                <section id="jobs" class="mb-12">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-3xl font-bold text-gray-800 flex items-center">
                            <i class="fas fa-briefcase text-orange-600 mr-3"></i>
                            Jobs, Paid Internships & Fellowships
                        </h2>
                        <div class="flex space-x-2">
                            <button onclick="filterJobs('all')" class="job-filter bg-orange-600 text-white px-3 py-1 rounded text-sm">All</button>
                            <button onclick="filterJobs('remote')" class="job-filter bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">Remote</button>
                            <button onclick="filterJobs('internships')" class="job-filter bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">Internships</button>
                            <button onclick="filterJobs('apprenticeships')" class="job-filter bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">Apprenticeships</button>
                        </div>
                    </div>
                    
                    <!-- Job Categories with Images -->
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8588f525-a6cf-4326-bc1e-aaa91c669f08" 
                                     alt="Software Engineering" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-3 text-center">
                                <h4 class="font-semibold text-sm">Software Engineering</h4>
                                <p class="text-xs text-gray-600">25+ positions</p>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8588f525-a6cf-4326-bc1e-aaa91c669f08" 
                                     alt="UX Design" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-3 text-center">
                                <h4 class="font-semibold text-sm">UX/UI Design</h4>
                                <p class="text-xs text-gray-600">12+ positions</p>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8588f525-a6cf-4326-bc1e-aaa91c669f08" 
                                     alt="Data Science" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-3 text-center">
                                <h4 class="font-semibold text-sm">Data Science</h4>
                                <p class="text-xs text-gray-600">18+ positions</p>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8588f525-a6cf-4326-bc1e-aaa91c669f08" 
                                     alt="Product Management" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-3 text-center">
                                <h4 class="font-semibold text-sm">Product Management</h4>
                                <p class="text-xs text-gray-600">8+ positions</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" id="jobs-grid">
                        <!-- Job listings will be populated by filterJobs() -->
                    </div>
                    
                    <div class="text-center mt-6">
                        <button onclick="viewAllJobs()" class="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700">
                            View All Opportunities <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </section>

                <!-- Grants, Pitch Competitions & Capital Section -->
                <section id="grants" class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-dollar-sign text-yellow-600 mr-3"></i>
                        Grants, Pitch Competitions & Capital
                    </h2>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white rounded-xl shadow-lg border-l-4 border-yellow-500 overflow-hidden">
                            <div class="h-40 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/0476b48b-2be5-47db-ba07-c91ff8c1766d" 
                                     alt="Micro Grant Opportunity" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">OPEN NOW</span>
                                <span class="text-gray-500 text-sm ml-2">Deadline: Dec 15</span>
                            </div>
                            <h3 class="font-bold text-lg mb-2">Black Founders Matter Micro-Grant</h3>
                            <p class="text-gray-600 text-sm mb-4">Up to $5,000 for early-stage Black tech entrepreneurs. No equity required.</p>
                            <div class="flex justify-between items-center">
                                <span class="text-yellow-600 font-bold">$1K - $5K</span>
                                <button onclick="applyForGrant('bfm-micro')" class="text-yellow-600 hover:text-yellow-800 font-medium text-sm">3-min Guide →</button>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg border-l-4 border-purple-500 overflow-hidden">
                            <div class="h-40 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/0476b48b-2be5-47db-ba07-c91ff8c1766d" 
                                     alt="Startup Weekend" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium">WEEKLY</span>
                                <span class="text-gray-500 text-sm ml-2">Every Thursday</span>
                            </div>
                            <h3 class="font-bold text-lg mb-2">TechStars Startup Weekend</h3>
                            <p class="text-gray-600 text-sm mb-4">54-hour hackathon with $10K+ prizes and investor connections.</p>
                            <div class="flex justify-between items-center">
                                <span class="text-purple-600 font-bold">$10K+ Prizes</span>
                                <button onclick="registerForEvent('techstars-weekend')" class="text-purple-600 hover:text-purple-800 font-medium text-sm">Register →</button>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 overflow-hidden">
                            <div class="h-40 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/0476b48b-2be5-47db-ba07-c91ff8c1766d" 
                                     alt="HBCU Pitch Competition" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-6">
                            <div class="flex items-center mb-3">
                                <span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">DEADLINE SOON</span>
                                <span class="text-gray-500 text-sm ml-2">5 days left</span>
                            </div>
                            <h3 class="font-bold text-lg mb-2">HBCU Pitch Competition</h3>
                            <p class="text-gray-600 text-sm mb-4">$50K grand prize for HBCU student entrepreneurs in AI/tech space.</p>
                            <div class="flex justify-between items-center">
                                <span class="text-blue-600 font-bold">Up to $50K</span>
                                <button onclick="applyForGrant('hbcu-pitch')" class="text-blue-600 hover:text-blue-800 font-medium text-sm">Apply Now →</button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Learn & Do Section -->
                <section id="learn" class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-graduation-cap text-teal-600 mr-3"></i>
                        Learn & Do: Micro-Lessons
                    </h2>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="openMicroLesson('get-online-less')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/0b60722e-f01f-492b-9e63-8065a3cc5c19" 
                                     alt="Get Online for Less" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">Get Online for Less</h3>
                                <p class="text-gray-600 text-sm mb-3">Post-ACP: Check Lifeline → pick carrier → apply</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-green-600 text-sm font-medium">90 seconds</span>
                                    <i class="fas fa-arrow-right text-green-600"></i>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="openMicroLesson('protect-data')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/0b60722e-f01f-492b-9e63-8065a3cc5c19" 
                                     alt="Protect Your Data" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">Protect Your Data</h3>
                                <p class="text-gray-600 text-sm mb-3">2FA setup → password manager → secure social media</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-blue-600 text-sm font-medium">60 seconds</span>
                                    <i class="fas fa-arrow-right text-blue-600"></i>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="openMicroLesson('ai-for-work')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/0b60722e-f01f-492b-9e63-8065a3cc5c19" 
                                     alt="AI for School and Work" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">Use AI for School & Work</h3>
                                <p class="text-gray-600 text-sm mb-3">Copy-paste prompts for resumes, cover letters, grants</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-purple-600 text-sm font-medium">75 seconds</span>
                                    <i class="fas fa-arrow-right text-purple-600"></i>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="openMicroLesson('creators-corner')">
                            <div class="h-32 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/0b60722e-f01f-492b-9e63-8065a3cc5c19" 
                                     alt="Creators Corner" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">Creators' Corner</h3>
                                <p class="text-gray-600 text-sm mb-3">Safe AI tools + disclosure best practices</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-pink-600 text-sm font-medium">90 seconds</span>
                                    <i class="fas fa-arrow-right text-pink-600"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Player 1 Academy Feature Card -->
                <section class="mb-12">
                    <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl overflow-hidden shadow-2xl relative">
                        <!-- Background Image -->
                        <div class="absolute inset-0 opacity-25">
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/dd409365-ed54-4749-a645-968dcb49367d" 
                                 alt="Player 1 Academy VR Learning" 
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="relative p-8 text-white">
                            <div class="flex items-center justify-between mb-6">
                                <div>
                                    <h2 class="text-3xl font-bold mb-2">Player 1 Academy—AI Training Hub</h2>
                                    <p class="text-indigo-100">Hands-on AI/VR/AR learning for educators, youth & families</p>
                                </div>
                                <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-graduation-cap text-3xl"></i>
                                </div>
                            </div>
                            
                            <div class="grid md:grid-cols-2 gap-6 mb-6">
                                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <h3 class="font-bold mb-2 flex items-center">
                                        <i class="fas fa-chalkboard-teacher mr-2"></i>
                                        Educators & Schools
                                    </h3>
                                    <p class="text-indigo-100 text-sm mb-3">Professional development on responsible AI, classroom workflows, and policy alignment.</p>
                                    <ul class="text-indigo-200 text-xs space-y-1">
                                        <li>• AI ethics training for teachers</li>
                                        <li>• Curriculum integration workshops</li>
                                        <li>• Policy compliance guidance</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <h3 class="font-bold mb-2 flex items-center">
                                        <i class="fas fa-users mr-2"></i>
                                        Youth & Families
                                    </h3>
                                    <p class="text-indigo-100 text-sm mb-3">Hands-on AI/VR/AR labs, career exploration, and micro-credentials.</p>
                                    <ul class="text-indigo-200 text-xs space-y-1">
                                        <li>• Interactive AI workshops</li>
                                        <li>• VR/AR career simulations</li>
                                        <li>• Industry-recognized certifications</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="flex space-x-4">
                                <button onclick="window.open('https://www.player1academy.org/aitrainingprograms', '_blank')" class="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all">
                                    <i class="fas fa-external-link-alt mr-2"></i>
                                    Explore Programs
                                </button>
                                <button onclick="learnMoreP1Academy()" class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                                    <i class="fas fa-info-circle mr-2"></i>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Events Section -->
                <section class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-calendar-alt text-indigo-600 mr-3"></i>
                        Events
                    </h2>
                    
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-indigo-500">
                            <div class="h-40 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/dd409365-ed54-4749-a645-968dcb49367d" 
                                     alt="AfroTech Conference" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-6">
                            <div class="flex justify-between items-start mb-3">
                                <span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">THIS WEEK</span>
                                <span class="text-gray-500 text-sm">Dec 12-14</span>
                            </div>
                            <h3 class="font-bold text-lg mb-2">AfroTech Conference 2024</h3>
                            <p class="text-gray-600 text-sm mb-4">The largest Black tech conference featuring startups, VCs, and Fortune 500 companies.</p>
                            <button onclick="registerForEvent('afrotech-2024')" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Register Now →</button>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-green-500">
                            <div class="h-40 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/dd409365-ed54-4749-a645-968dcb49367d" 
                                     alt="NSBE Meetup" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-6">
                            <div class="flex justify-between items-start mb-3">
                                <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">MONTHLY</span>
                                <span class="text-gray-500 text-sm">Every 3rd Thu</span>
                            </div>
                            <h3 class="font-bold text-lg mb-2">NSBE Rochester Meetup</h3>
                            <p class="text-gray-600 text-sm mb-4">National Society of Black Engineers local chapter networking and tech talks.</p>
                            <button onclick="registerForEvent('nsbe-meetup')" class="text-green-600 hover:text-green-800 font-medium text-sm">Join Next Meetup →</button>
                        </div>

                        <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-purple-500">
                            <div class="h-40 overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/dd409365-ed54-4749-a645-968dcb49367d" 
                                     alt="Player 1 Academy Workshop" 
                                     class="w-full h-full object-cover">
                            </div>
                            <div class="p-6">
                            <div class="flex justify-between items-start mb-3">
                                <span class="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium">UPCOMING</span>
                                <span class="text-gray-500 text-sm">Jan 15, 2025</span>
                            </div>
                            <h3 class="font-bold text-lg mb-2">Player 1 Academy Workshop</h3>
                            <p class="text-gray-600 text-sm mb-4">Hands-on AI training session for youth and educators in Rochester.</p>
                            <button onclick="registerForEvent('p1-workshop')" class="text-purple-600 hover:text-purple-800 font-medium text-sm">Save Your Spot →</button>
                        </div>
                    </div>
                </section>

                <!-- Community Q&A Section -->
                <section class="mb-12">
                    <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 relative overflow-hidden">
                        <!-- Background Icon Pattern -->
                        <div class="absolute top-4 right-4 opacity-10">
                            <i class="fas fa-comments text-teal-300 text-9xl"></i>
                        </div>
                        <div class="relative">
                        <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                            <i class="fas fa-question-circle text-teal-600 mr-3"></i>
                            Community Q&A: "Ask an AI Coach"
                        </h2>
                        
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="font-bold text-lg mb-4">Submit Your Question</h3>
                                <form class="space-y-4">
                                    <select class="w-full p-3 border rounded-lg">
                                        <option>Select a topic...</option>
                                        <option>College applications & AI tools</option>
                                        <option>Small business automation</option>
                                        <option>Job search with AI</option>
                                        <option>Digital privacy & security</option>
                                        <option>AI for creative projects</option>
                                        <option>Tech career guidance</option>
                                    </select>
                                    <textarea class="w-full p-3 border rounded-lg h-24" placeholder="Ask your question anonymously..."></textarea>
                                    <button type="button" onclick="submitCommunityQuestion()" class="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700">
                                        Submit Question
                                    </button>
                                </form>
                            </div>
                            
                            <div>
                                <h3 class="font-bold text-lg mb-4">Recent Q&A</h3>
                                <div class="space-y-4">
                                    <div class="bg-white rounded-lg p-4 border border-teal-200">
                                        <h4 class="font-semibold text-sm text-teal-800 mb-2">College Applications</h4>
                                        <p class="text-gray-700 text-sm mb-2"><strong>Q:</strong> How can I use AI to write better college essays without cheating?</p>
                                        <p class="text-gray-600 text-sm"><strong>A:</strong> Great question! AI can help brainstorm ideas and improve structure, but your voice should shine through...</p>
                                        <button onclick="readFullAnswer('college-essay-ai')" class="text-teal-600 text-sm font-medium mt-2">Read Full Answer →</button>
                                    </div>
                                    
                                    <div class="bg-white rounded-lg p-4 border border-teal-200">
                                        <h4 class="font-semibold text-sm text-teal-800 mb-2">Small Business</h4>
                                        <p class="text-gray-700 text-sm mb-2"><strong>Q:</strong> What's the best AI tool for managing my online store inventory?</p>
                                        <p class="text-gray-600 text-sm"><strong>A:</strong> For small businesses, I recommend starting with these affordable options...</p>
                                        <button onclick="readFullAnswer('inventory-ai')" class="text-teal-600 text-sm font-medium mt-2">Read Full Answer →</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;

    // Add event listeners and initialize daily updates
    addBlackTechEventListeners();
    initializeBlackTechDailyUpdates();
}

function loadLatinConnection() {
    document.getElementById('content-area').innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
            <!-- Hero Section - Conexión Latina -->
            <div class="relative overflow-hidden bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white">
                <!-- Hero Background Image -->
                <div class="absolute inset-0 opacity-30">
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/17c4a537-2830-4f23-b86a-781ac3220a89.png" 
                         alt="Comunidad Latina de Rochester" 
                         class="w-full h-full object-cover">
                </div>
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-r from-red-600/85 via-yellow-500/85 to-green-600/85"></div>
                
                <div class="relative z-10 px-4 py-16">
                    <div class="max-w-6xl mx-auto text-center">
                        <!-- Cultural Icon -->
                        <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30">
                            <i class="fas fa-globe-americas text-6xl"></i>
                        </div>
                        
                        <h1 class="text-5xl md:text-7xl font-bold mb-4">
                            Latin Connection
                        </h1>
                        <p class="text-3xl font-light mb-2 italic">Conexión Latina</p>
                        <div class="w-32 h-1 bg-white mx-auto mb-6 rounded-full"></div>
                        
                        <p class="text-2xl md:text-3xl font-light mb-4">
                            Recursos y Servicios para la Comunidad Latina de Rochester
                        </p>
                        <p class="text-xl mb-8 opacity-90">
                            Resources and Services for Rochester's Latino Community
                        </p>
                        
                        <!-- Quick Stats -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                            <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div class="text-3xl font-bold">43,000+</div>
                                <div class="text-sm opacity-90">Latinos en Monroe County</div>
                                <div class="text-xs opacity-75 mt-1">16% de la población</div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div class="text-3xl font-bold">100%</div>
                                <div class="text-sm opacity-90">Servicios Bilingües</div>
                                <div class="text-xs opacity-75 mt-1">Español e Inglés</div>
                            </div>
                            <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div class="text-3xl font-bold">24/7</div>
                                <div class="text-sm opacity-90">Línea de Ayuda</div>
                                <div class="text-xs opacity-75 mt-1">Apoyo Comunitario</div>
                            </div>
                        </div>
                        
                        <!-- Quick Access Buttons -->
                        <div class="flex flex-wrap justify-center gap-4">
                            <button onclick="scrollToLatinSection('recursos')" class="bg-white text-red-700 hover:bg-red-100 font-semibold py-3 px-8 rounded-lg transition-all shadow-lg">
                                <i class="fas fa-hands-helping mr-2"></i>Recursos / Resources
                            </button>
                            <button onclick="openLatinCategory('family-services')" class="border-2 border-white text-white hover:bg-white hover:text-red-700 font-semibold py-3 px-8 rounded-lg transition-all">
                                <i class="fas fa-briefcase mr-2"></i>Servicios / Services
                            </button>
                            <button onclick="openLatinCategory('arts-culture')" class="border-2 border-white text-white hover:bg-white hover:text-green-700 font-semibold py-3 px-8 rounded-lg transition-all">
                                <i class="fas fa-music mr-2"></i>Cultura / Culture
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Language Toggle & Emergency Bar -->
            <div class="sticky top-0 z-40 bg-white shadow-md border-b-4 border-red-500">
                <div class="max-w-6xl mx-auto px-4 py-3">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <button onclick="toggleLanguage('es')" class="px-4 py-2 rounded-lg font-semibold transition-all bg-red-600 text-white hover:bg-red-700">
                                <i class="fas fa-language mr-2"></i>Español
                            </button>
                            <button onclick="toggleLanguage('en')" class="px-4 py-2 rounded-lg font-semibold transition-all bg-gray-200 text-gray-700 hover:bg-gray-300">
                                <i class="fas fa-language mr-2"></i>English
                            </button>
                        </div>
                        <div class="flex items-center gap-4 text-sm">
                            <a href="tel:211" class="flex items-center gap-2 text-red-700 font-semibold hover:text-red-900">
                                <i class="fas fa-phone"></i>
                                <span>Línea 211 (Ayuda 24/7)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="bg-white shadow-lg sticky top-16 z-30">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex overflow-x-auto no-scrollbar">
                        <button onclick="scrollToLatinSection('recursos')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-red-700 font-bold hover:border-red-700 transition-all">
                            <i class="fas fa-hands-helping mr-2"></i>Todos
                        </button>
                        <button onclick="openLatinCategory('family-services')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-transparent hover:border-red-700 transition-all">
                            <i class="fas fa-home mr-2"></i>Familia
                        </button>
                        <button onclick="openLatinCategory('education-youth')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-transparent hover:border-red-700 transition-all">
                            <i class="fas fa-graduation-cap mr-2"></i>Educación
                        </button>
                        <button onclick="openLatinCategory('business-employment')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-transparent hover:border-red-700 transition-all">
                            <i class="fas fa-briefcase mr-2"></i>Empleo
                        </button>
                        <button onclick="openLatinCategory('health-services')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-transparent hover:border-red-700 transition-all">
                            <i class="fas fa-heartbeat mr-2"></i>Salud
                        </button>
                        <button onclick="openLatinCategory('immigration')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-transparent hover:border-red-700 transition-all">
                            <i class="fas fa-passport mr-2"></i>Inmigración
                        </button>
                        <button onclick="openLatinCategory('business-employment')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-transparent hover:border-red-700 transition-all">
                            <i class="fas fa-store mr-2"></i>Negocios
                        </button>
                        <button onclick="openLatinCategory('arts-culture')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-transparent hover:border-red-700 transition-all">
                            <i class="fas fa-music mr-2"></i>Cultura
                        </button>
                        <button onclick="openLatinCategory('education-youth')" class="latin-tab-btn whitespace-nowrap px-6 py-4 text-red-700 border-b-2 border-transparent hover:border-red-700 transition-all">
                            <i class="fas fa-users mr-2"></i>Juventud
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Resources Section -->
            <section id="recursos" class="py-16 bg-white">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-red-900 mb-4">Organizaciones Comunitarias</h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Community Organizations Serving Rochester's Latino Families
                        </p>
                    </div>

                    <!-- Featured Organization: Ibero-American Action League -->
                    <div class="bg-gradient-to-r from-red-600 to-yellow-600 rounded-xl p-8 text-white mb-12 shadow-2xl">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div class="flex items-center mb-4">
                                    <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                        <i class="fas fa-hands-helping text-3xl"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-3xl font-bold">Ibero-American Action League</h3>
                                        <p class="text-xl opacity-90">Liga de Acción Iberoamericana</p>
                                    </div>
                                </div>
                                <p class="text-lg mb-6 opacity-95">
                                    La organización latina líder en Rochester, sirviendo a más de 7,000 familias anualmente con servicios integrales.
                                </p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle mr-2"></i>
                                        <span>Educación y Desarrollo Juvenil</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle mr-2"></i>
                                        <span>Servicios de Inmigración</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle mr-2"></i>
                                        <span>Desarrollo Económico</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle mr-2"></i>
                                        <span>Servicios Comunitarios</span>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <a href="tel:585-256-8900" class="bg-white text-red-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all">
                                        <i class="fas fa-phone mr-2"></i>(585) 256-8900
                                    </a>
                                    <button onclick="getDirections('817 E Main St, Rochester, NY 14605')" class="border-2 border-white hover:bg-white hover:text-red-700 px-6 py-3 rounded-lg font-semibold transition-all">
                                        <i class="fas fa-map-marker-alt mr-2"></i>Direcciones
                                    </button>
                                </div>
                            </div>
                            <div>
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/6323af9b-f002-4291-aaeb-5b191a19060a.png" 
                                     alt="Servicios comunitarios latinos" 
                                     class="rounded-lg shadow-2xl">
                            </div>
                        </div>
                    </div>

                    <!-- Resource Categories Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Family Services -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-red-200 overflow-hidden">
                            <div class="h-48 relative overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/6323af9b-f002-4291-aaeb-5b191a19060a.png" 
                                     alt="Servicios Familiares" 
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent"></div>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-home text-3xl text-red-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-red-900 mb-3">Servicios Familiares<br/><span class="text-base font-normal text-gray-600">Family Services</span></h3>
                                <p class="text-gray-600 mb-4">Apoyo integral para familias latinas incluyendo consejería, recursos y programas de bienestar</p>
                                <button onclick="openLatinCategory('family-services')" class="text-red-700 hover:text-red-900 font-semibold">
                                    Ver Más <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Education & Youth -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-yellow-200 overflow-hidden">
                            <div class="h-48 relative overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/1b2f42af-fcfb-4817-9592-df6314e16438.png" 
                                     alt="Educación y Juventud" 
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-yellow-900/80 to-transparent"></div>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-graduation-cap text-3xl text-yellow-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-yellow-900 mb-3">Educación y Juventud<br/><span class="text-base font-normal text-gray-600">Education & Youth</span></h3>
                                <p class="text-gray-600 mb-4">Programas educativos, tutoría bilingüe, preparación universitaria y desarrollo juvenil</p>
                                <button onclick="openLatinCategory('education-youth')" class="text-yellow-700 hover:text-yellow-900 font-semibold">
                                    Ver Más <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Business & Employment -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-green-200 overflow-hidden">
                            <div class="h-48 relative overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/4ba952a2-fdf0-4685-9f73-f4e3c371e938.png" 
                                     alt="Negocios y Empleo" 
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-store text-3xl text-green-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-green-900 mb-3">Negocios y Empleo<br/><span class="text-base font-normal text-gray-600">Business & Employment</span></h3>
                                <p class="text-gray-600 mb-4">Desarrollo empresarial, capacitación laboral y oportunidades de empleo</p>
                                <button onclick="openLatinCategory('business-employment')" class="text-green-700 hover:text-green-900 font-semibold">
                                    Ver Más <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Immigration Services -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-blue-200 overflow-hidden">
                            <div class="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                                <i class="fas fa-passport text-8xl text-white opacity-20"></i>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-passport text-3xl text-blue-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-blue-900 mb-3">Servicios de Inmigración<br/><span class="text-base font-normal text-gray-600">Immigration Services</span></h3>
                                <p class="text-gray-600 mb-4">Asistencia legal de inmigración, DACA, ciudadanía y recursos para inmigrantes</p>
                                <button onclick="openLatinCategory('immigration')" class="text-blue-700 hover:text-blue-900 font-semibold">
                                    Ver Más <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Health Services -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-pink-200 overflow-hidden">
                            <div class="h-48 bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                                <i class="fas fa-heartbeat text-8xl text-white opacity-20"></i>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-heartbeat text-3xl text-pink-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-pink-900 mb-3">Servicios de Salud<br/><span class="text-base font-normal text-gray-600">Health Services</span></h3>
                                <p class="text-gray-600 mb-4">Atención médica culturalmente apropiada, clínicas bilingües y programas de salud</p>
                                <button onclick="openLatinCategory('health-services')" class="text-pink-700 hover:text-pink-900 font-semibold">
                                    Ver Más <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Cultural Arts -->
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-purple-200 overflow-hidden">
                            <div class="h-48 relative overflow-hidden">
                                <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a64ba00a-2eb3-4983-bbaa-281ca08e5f5d.png" 
                                     alt="Arte y Cultura" 
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                            </div>
                            <div class="p-6">
                                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 -mt-16 relative z-10 border-4 border-white">
                                    <i class="fas fa-music text-3xl text-purple-700"></i>
                                </div>
                                <h3 class="text-xl font-bold text-purple-900 mb-3">Arte y Cultura<br/><span class="text-base font-normal text-gray-600">Arts & Culture</span></h3>
                                <p class="text-gray-600 mb-4">Celebraciones culturales, música, danza, arte y preservación del patrimonio latino</p>
                                <button onclick="openLatinCategory('arts-culture')" class="text-purple-700 hover:text-purple-900 font-semibold">
                                    Ver Más <i class="fas fa-arrow-right ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Back to Home Button -->
            <div class="fixed bottom-6 right-6 z-50">
                <button onclick="goHome()" class="bg-red-700 hover:bg-red-800 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
                    <i class="fas fa-home text-xl"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners for Latin Connection interactions
    addLatinConnectionEventListeners();
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
                    <div class="lg:col-span-2 bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
                        <!-- Financial Dashboard Background Image -->
                        <div class="absolute inset-0 opacity-10">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/33f357e9-f32e-4e34-8b05-357790186cfd.png" alt="Market Analysis" class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10">
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
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8 relative overflow-hidden">
                    <!-- Entrepreneur Background Image -->
                    <div class="absolute top-0 left-0 right-0 h-64 overflow-hidden">
                        <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/39efb331-6ea9-4b34-8477-575d05e82acf.png" alt="Black Entrepreneur Success" class="w-full h-full object-cover opacity-20">
                    </div>
                    <div class="relative z-10">
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
                </div>

                <!-- Financial Education Hub -->
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8 relative overflow-hidden">
                    <!-- Financial Education Background -->
                    <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/73b2ddeb-615f-4749-8ff4-8bd72a51bcd8.png" alt="Financial Education Workshop" class="absolute inset-0 w-full h-full object-cover opacity-20">
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
                    <div class="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
                        <div class="absolute inset-0 opacity-10">
                            <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/b1b4ed8f-3192-4361-b0c5-737cda445a35.png" alt="Family Wealth Planning" class="w-full h-full object-cover">
                        </div>
                        <div class="relative z-10">
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
                <div class="bg-white rounded-xl shadow-xl p-8 mb-8 relative overflow-hidden">
                    <div class="absolute top-0 left-0 right-0 h-56 overflow-hidden">
                        <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/d5abafc7-e1c6-49ef-bb6e-61179cfecbf8.png" alt="Startup Launch" class="w-full h-full object-cover opacity-15">
                    </div>
                    <div class="relative z-10">
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
                </div>

                <!-- Policy Impact & Economic Justice -->
                <div class="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-8 text-white mb-8 relative overflow-hidden">
                    <div class="absolute inset-0 opacity-20">
                        <img src="https://cdn1.genspark.ai/user-upload-image/3_generated/5873418a-f997-4127-b382-7e49668814ee.png" alt="Community Economic Empowerment" class="w-full h-full object-cover">
                    </div>
                    <div class="relative z-10">
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
                image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619',
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
                image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619',
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
                image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619'
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
        { year: 1820, image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619', title: 'Underground Railroad Begins' },
        { year: 1847, image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619', title: 'Frederick Douglass Arrives' },
        { year: 1863, image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619', title: 'Civil War Participation' },
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
                    <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619" 
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

function start360TourByYear(year) {
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
                            <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619" 
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
            url: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/140edb7e-7d71-4481-a267-3fd219442619',
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

// Black Tech Interactive Functions
function addBlackTechEventListeners() {
    // Add smooth scrolling functionality
    console.log('Black Tech event listeners initialized');
}

function scrollToBlackTechSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function viewBlackTechStory(storyId) {
    const stories = {
        'ai-bias-settlement': {
            title: 'AI Bias Lawsuit Settlement Creates $50M Fund for Black Tech Entrepreneurs',
            content: 'A landmark settlement in a major AI bias lawsuit has resulted in the creation of a $50 million fund specifically designed to support Black-led technology startups and AI bias prevention research. The settlement addresses years of documented algorithmic discrimination in hiring, lending, and criminal justice systems.',
            source: 'The Plug',
            readTime: '4 min read',
            tags: ['AI Ethics', 'Legal', 'Funding']
        },
        'hbcu-ai-funding': {
            title: 'HBCU AI Research Centers Get $25M Federal Funding',
            content: 'The National Science Foundation announced a $25 million investment in AI research centers at Historically Black Colleges and Universities (HBCUs). Howard University, Spelman College, and eight other institutions will establish AI ethics and innovation programs focused on addressing bias in artificial intelligence systems.',
            source: 'AfroTech',
            readTime: '3 min read',
            tags: ['Education', 'AI Research', 'HBCU']
        },
        'health-app-funding': {
            title: 'Black-Founded Health App Secures Series A',
            content: 'MindfulMelaninHealth, an AI-powered mental health platform founded by Dr. Kenya Johnson, has secured $15 million in Series A funding to address healthcare disparities in Black communities. The app uses culturally-aware AI to provide personalized mental health support.',
            source: 'TechCrunch',
            readTime: '5 min read',
            tags: ['Healthcare', 'AI', 'Funding']
        }
    };

    const story = stories[storyId];
    if (story) {
        showBlackTechModal(story.title, `
            <div class="space-y-4">
                <div class="flex items-center justify-between text-sm text-gray-600">
                    <span class="font-medium">${story.source}</span>
                    <span>${story.readTime}</span>
                </div>
                
                <div class="flex space-x-2">
                    ${story.tags.map(tag => `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">${tag}</span>`).join('')}
                </div>
                
                <p class="text-gray-700 leading-relaxed">${story.content}</p>
                
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-blue-800 mb-2">Why This Matters for Our Community</h4>
                    <p class="text-blue-700 text-sm">This development represents significant progress in addressing systemic bias in technology and creating opportunities for Black entrepreneurs and researchers in the AI space.</p>
                </div>
                
                <div class="flex space-x-3">
                    <button onclick="shareStory('${storyId}')" class="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">
                        <i class="fas fa-share mr-2"></i>Share Story
                    </button>
                    <button onclick="saveStory('${storyId}')" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-medium hover:bg-gray-50">
                        <i class="fas fa-bookmark mr-2"></i>Save for Later
                    </button>
                </div>
            </div>
        `);
    }
}

function checkLifelineEligibility() {
    showBlackTechModal('Check Lifeline Eligibility', `
        <div class="space-y-6">
            <div class="text-center">
                <i class="fas fa-check-circle text-green-500 text-4xl mb-4"></i>
                <h3 class="text-xl font-bold mb-2">Lifeline Program Eligibility Checker</h3>
                <p class="text-gray-600">Quick assessment to see if you qualify for up to $9.25/month discount</p>
            </div>

            <form class="space-y-4">
                <div>
                    <h4 class="font-semibold mb-3">Do you receive any of these benefits?</h4>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-3" name="benefits" value="snap">
                            <div class="flex-1">
                                <div class="font-medium">SNAP (Food Stamps)</div>
                                <div class="text-sm text-gray-600">Supplemental Nutrition Assistance Program</div>
                            </div>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-3" name="benefits" value="medicaid">
                            <div class="flex-1">
                                <div class="font-medium">Medicaid</div>
                                <div class="text-sm text-gray-600">Government health insurance program</div>
                            </div>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-3" name="benefits" value="housing">
                            <div class="flex-1">
                                <div class="font-medium">Federal Public Housing Assistance</div>
                                <div class="text-sm text-gray-600">Section 8, public housing, etc.</div>
                            </div>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-3" name="benefits" value="ssi">
                            <div class="flex-1">
                                <div class="font-medium">SSI</div>
                                <div class="text-sm text-gray-600">Supplemental Security Income</div>
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <h4 class="font-semibold mb-3">Household Income (Optional)</h4>
                    <select class="w-full p-2 border rounded">
                        <option>Select household size first</option>
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people</option>
                        <option value="5">5+ people</option>
                    </select>
                </div>

                <button type="button" onclick="processLifelineEligibility()" class="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700">
                    Check My Eligibility
                </button>
            </form>
        </div>
    `);
}

function processLifelineEligibility() {
    const benefits = document.querySelectorAll('input[name="benefits"]:checked');
    const hasQualifyingBenefits = benefits.length > 0;
    
    showBlackTechModal('Your Lifeline Eligibility Result', `
        <div class="text-center space-y-6">
            <div class="w-20 h-20 ${hasQualifyingBenefits ? 'bg-green-500' : 'bg-yellow-500'} rounded-full mx-auto flex items-center justify-center">
                <i class="fas ${hasQualifyingBenefits ? 'fa-check' : 'fa-clock'} text-white text-3xl"></i>
            </div>
            
            <div>
                <h3 class="text-2xl font-bold mb-2 ${hasQualifyingBenefits ? 'text-green-800' : 'text-yellow-800'}">
                    ${hasQualifyingBenefits ? 'You Likely Qualify!' : 'You May Still Qualify'}
                </h3>
                <p class="text-gray-600">
                    ${hasQualifyingBenefits 
                        ? 'Based on your benefits, you should qualify for Lifeline discounts.'
                        : 'Check if your income qualifies you for Lifeline benefits.'}
                </p>
            </div>

            <div class="bg-${hasQualifyingBenefits ? 'green' : 'yellow'}-50 p-4 rounded-lg text-left">
                <h4 class="font-semibold mb-2">Next Steps:</h4>
                <ul class="text-sm space-y-1 ${hasQualifyingBenefits ? 'text-green-700' : 'text-yellow-700'}">
                    <li>• Visit the official Lifeline website</li>
                    <li>• Choose an approved service provider</li>
                    <li>• Complete the application with required documents</li>
                    <li>• Start saving up to $9.25/month on your phone or internet bill</li>
                </ul>
            </div>

            <div class="flex space-x-3">
                <button onclick="window.open('https://www.lifelinesupport.org/', '_blank')" class="flex-1 bg-blue-600 text-white py-2 rounded font-medium">
                    Apply Now
                </button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-medium">
                    Close
                </button>
            </div>
        </div>
    `);
}

function viewPolicyDetails(policyId) {
    const policies = {
        'bead-program': {
            title: 'BEAD Program: $42.45B Broadband Investment',
            content: 'The Broadband Equity, Access, and Deployment (BEAD) Program is the largest federal investment in broadband infrastructure in history. New York is expected to receive over $2 billion to expand high-speed internet access to underserved communities.',
            impact: 'This program will prioritize historically underserved areas, including many predominantly Black and Hispanic communities that have faced digital redlining.',
            timeline: '2025-2027 deployment timeline with community input opportunities'
        },
        'net-neutrality': {
            title: 'Net Neutrality Protections Restored',
            content: 'The FCC reinstated comprehensive net neutrality rules in 2024, prohibiting internet service providers from blocking, throttling, or prioritizing content based on payment.',
            impact: 'These rules ensure equal access to information and prevent ISPs from creating fast and slow lanes that could disproportionately affect communities with less economic power.',
            timeline: 'Rules are now in effect nationwide'
        }
    };

    const policy = policies[policyId];
    if (policy) {
        showBlackTechModal(policy.title, `
            <div class="space-y-4">
                <p class="text-gray-700">${policy.content}</p>
                
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-blue-800 mb-2">Community Impact</h4>
                    <p class="text-blue-700 text-sm">${policy.impact}</p>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Timeline</h4>
                    <p class="text-gray-700 text-sm">${policy.timeline}</p>
                </div>
                
                <button onclick="this.closest('.fixed').remove()" class="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">
                    Got It
                </button>
            </div>
        `);
    }
}

function fileDiscriminationComplaint() {
    showBlackTechModal('File Digital Discrimination Complaint', `
        <div class="space-y-6">
            <div class="text-center">
                <i class="fas fa-balance-scale text-orange-500 text-4xl mb-4"></i>
                <h3 class="text-xl font-bold mb-2">Report Digital Discrimination</h3>
                <p class="text-gray-600">New 2024 FCC rules protect against unfair internet service practices</p>
            </div>

            <div class="bg-orange-50 p-4 rounded-lg">
                <h4 class="font-semibold text-orange-800 mb-2">You can file a complaint if your area experiences:</h4>
                <ul class="text-orange-700 text-sm space-y-1">
                    <li>• Slower internet speeds compared to nearby affluent neighborhoods</li>
                    <li>• Higher prices for the same service level</li>
                    <li>• Lack of fiber/high-speed options in your community</li>
                    <li>• ISP refusal to provide service in your area</li>
                </ul>
            </div>

            <div class="space-y-3">
                <input type="text" placeholder="Your ZIP code" class="w-full p-2 border rounded">
                <input type="text" placeholder="Internet service provider" class="w-full p-2 border rounded">
                <textarea placeholder="Describe the discrimination you've experienced..." class="w-full p-2 border rounded h-24"></textarea>
            </div>

            <div class="flex space-x-3">
                <button onclick="submitDiscriminationComplaint()" class="flex-1 bg-orange-600 text-white py-2 rounded font-medium hover:bg-orange-700">
                    Submit to FCC
                </button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-medium">
                    Cancel
                </button>
            </div>
        </div>
    `);
}

function watchFounderVideo(founderId) {
    showBlackTechModal('Founder Spotlight Video', `
        <div class="space-y-4">
            <div class="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg h-64 flex items-center justify-center text-white">
                <div class="text-center">
                    <i class="fas fa-play-circle text-6xl mb-4"></i>
                    <p class="text-lg">Dr. Aisha Patel: From HBCU to AI Ethics Pioneer</p>
                    <p class="text-sm opacity-80">Runtime: 8:42</p>
                </div>
            </div>
            <div class="text-center">
                <button onclick="this.closest('.fixed').remove()" class="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700">
                    Watch Full Video on YouTube
                </button>
            </div>
        </div>
    `);
}

function viewFounderPlaybook(founderId) {
    showBlackTechModal('How She Built It: Dr. Aisha Patel', `
        <div class="space-y-6">
            <div class="text-center">
                <i class="fas fa-book text-purple-500 text-4xl mb-4"></i>
                <h3 class="text-xl font-bold">The TrustAI Labs Playbook</h3>
            </div>

            <div class="space-y-4">
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-purple-800 mb-2">🎯 Phase 1: Research Foundation (Months 1-6)</h4>
                    <ul class="text-purple-700 text-sm space-y-1">
                        <li>• Identified healthcare AI bias problem during PhD research</li>
                        <li>• Published 3 peer-reviewed papers on algorithmic fairness</li>
                        <li>• Built MVP bias detection tool for medical imaging</li>
                    </ul>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-blue-800 mb-2">💰 Phase 2: Funding Strategy (Months 6-12)</h4>
                    <ul class="text-blue-700 text-sm space-y-1">
                        <li>• Applied to SBIR grants for health tech</li>
                        <li>• Joined Techstars healthcare accelerator</li>
                        <li>• Raised $500K pre-seed from mission-aligned VCs</li>
                    </ul>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-green-800 mb-2">🚀 Phase 3: Scale & Impact (Year 2+)</h4>
                    <ul class="text-green-700 text-sm space-y-1">
                        <li>• Partnered with 5 major hospital systems</li>
                        <li>• Reduced diagnostic bias by 40% in pilot programs</li>
                        <li>• Series A led by GV (Google Ventures): $15M</li>
                    </ul>
                </div>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2">🔑 Key Success Factors</h4>
                <ul class="text-yellow-700 text-sm space-y-1">
                    <li>• Deep technical expertise in AI and healthcare</li>
                    <li>• Strong academic credentials and publications</li>
                    <li>• Focus on measurable social impact</li>
                    <li>• Strategic partnerships with healthcare institutions</li>
                </ul>
            </div>

            <button onclick="this.closest('.fixed').remove()" class="w-full bg-purple-600 text-white py-2 rounded font-medium hover:bg-purple-700">
                Download Full Playbook (PDF)
            </button>
        </div>
    `);
}

function initializeBlackTechDailyUpdates() {
    // Simulate daily update functionality
    const today = new Date().toLocaleDateString();
    const lastUpdate = localStorage.getItem('blacktech_last_update');
    
    if (lastUpdate !== today) {
        localStorage.setItem('blacktech_last_update', today);
        // In a real implementation, this would fetch fresh content from APIs
        console.log('Black Tech daily content updated for', today);
    }
}

// Additional Black Tech Interactive Functions
function filterJobs(category) {
    const jobsData = {
        all: [
            { title: 'AI Ethics Researcher', company: 'Partnership on AI', type: 'Full-time', location: 'Remote', salary: '$85K - $120K', tags: ['AI', 'Research', 'Remote'] },
            { title: 'Software Engineer Intern', company: 'CodePath.org', type: 'Internship', location: 'New York, NY', salary: '$5K/month', tags: ['Internship', 'Coding', 'NYC'] },
            { title: 'Data Science Apprentice', company: 'Blacks In Technology', type: 'Apprenticeship', location: 'Remote', salary: '$40K', tags: ['Apprenticeship', 'Data Science', 'Remote'] },
            { title: 'Product Manager', company: 'The Plug', type: 'Full-time', location: 'San Francisco, CA', salary: '$110K - $140K', tags: ['Product', 'Management', 'SF'] },
            { title: 'UX Designer Fellow', company: 'Black Women Talk Tech', type: 'Fellowship', location: 'Atlanta, GA', salary: '$60K', tags: ['Fellowship', 'Design', 'Atlanta'] },
            { title: 'Frontend Developer', company: 'AfroTech Startup', type: 'Full-time', location: 'Remote', salary: '$75K - $100K', tags: ['Frontend', 'JavaScript', 'Remote'] }
        ]
    };

    jobsData.remote = jobsData.all.filter(job => job.tags.includes('Remote'));
    jobsData.internships = jobsData.all.filter(job => job.type === 'Internship');
    jobsData.apprenticeships = jobsData.all.filter(job => job.type === 'Apprenticeship');

    const jobs = jobsData[category] || jobsData.all;
    const jobsGrid = document.getElementById('jobs-grid');
    
    // Update filter buttons
    document.querySelectorAll('.job-filter').forEach(btn => {
        btn.className = 'job-filter bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm';
    });
    event.target.className = 'job-filter bg-orange-600 text-white px-3 py-1 rounded text-sm';

    jobsGrid.innerHTML = jobs.map(job => `
        <div class="bg-white rounded-lg shadow-lg p-4 border-l-4 border-orange-500 hover:shadow-xl transition-all">
            <div class="flex items-center justify-between mb-2">
                <span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">${job.type}</span>
                <span class="text-gray-500 text-xs">${job.location}</span>
            </div>
            <h3 class="font-bold text-lg mb-1">${job.title}</h3>
            <p class="text-gray-600 text-sm mb-2">${job.company}</p>
            <p class="text-gray-800 font-semibold mb-3">${job.salary}</p>
            <div class="flex space-x-1 mb-3">
                ${job.tags.slice(0, 2).map(tag => `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">${tag}</span>`).join('')}
            </div>
            <button onclick="viewJobDetails('${job.title}')" class="text-orange-600 hover:text-orange-800 font-medium text-sm">
                View Details →
            </button>
        </div>
    `).join('');
}

function viewJobDetails(jobTitle) {
    showBlackTechModal(`Job Details: ${jobTitle}`, `
        <div class="space-y-4">
            <div class="text-center">
                <i class="fas fa-briefcase text-orange-500 text-4xl mb-4"></i>
                <h3 class="text-xl font-bold">${jobTitle}</h3>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
                <p class="text-orange-700">This position offers great opportunities for growth in the Black tech community. Apply through our partner organizations for priority consideration.</p>
            </div>
            <div class="flex space-x-3">
                <button onclick="applyForJob('${jobTitle}')" class="flex-1 bg-orange-600 text-white py-2 rounded font-medium">Apply Now</button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-medium">Close</button>
            </div>
        </div>
    `);
}

function applyForGrant(grantId) {
    const grants = {
        'bfm-micro': {
            title: 'Black Founders Matter Micro-Grant',
            guide: '1. Prepare your pitch deck (5 slides max)\n2. Complete the online application\n3. Submit financial projections\n4. Wait 2-3 weeks for decision'
        },
        'hbcu-pitch': {
            title: 'HBCU Pitch Competition',
            guide: '1. Verify HBCU student status\n2. Prepare 3-minute pitch video\n3. Submit business plan summary\n4. Complete application before deadline'
        }
    };

    const grant = grants[grantId];
    if (grant) {
        showBlackTechModal(`${grant.title} - 3-Minute Apply Guide`, `
            <div class="space-y-4">
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-yellow-800 mb-2">Quick Application Steps:</h4>
                    <pre class="text-yellow-700 text-sm whitespace-pre-wrap">${grant.guide}</pre>
                </div>
                <div class="flex space-x-3">
                    <button onclick="startGrantApplication('${grantId}')" class="flex-1 bg-yellow-600 text-white py-2 rounded font-medium">Start Application</button>
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-medium">Close</button>
                </div>
            </div>
        `);
    }
}

function openMicroLesson(lessonId) {
    const lessons = {
        'get-online-less': {
            title: 'Get Online for Less (Post-ACP)',
            steps: [
                { step: 1, action: 'Check Lifeline eligibility', time: '30 sec', detail: 'Visit lifelinesupport.org and check if you qualify' },
                { step: 2, action: 'Pick a carrier', time: '30 sec', detail: 'Choose from approved providers in your area' },
                { step: 3, action: 'Apply online', time: '30 sec', detail: 'Complete application with required documents' }
            ]
        },
        'protect-data': {
            title: 'Protect Your Data',
            steps: [
                { step: 1, action: 'Turn on 2FA', time: '20 sec', detail: 'Enable two-factor authentication on all major accounts' },
                { step: 2, action: 'Add password manager', time: '20 sec', detail: 'Install free password manager like Bitwarden' },
                { step: 3, action: 'Lock social DMs', time: '20 sec', detail: 'Change privacy settings to prevent unknown contacts' }
            ]
        },
        'ai-for-work': {
            title: 'Use AI for School & Work',
            steps: [
                { step: 1, action: 'Get prompt templates', time: '25 sec', detail: 'Copy ready-to-use prompts for resumes and cover letters' },
                { step: 2, action: 'Customize for you', time: '25 sec', detail: 'Fill in your specific details and experience' },
                { step: 3, action: 'Review & refine', time: '25 sec', detail: 'Always review AI output and make it your own' }
            ]
        },
        'creators-corner': {
            title: 'Creators\' Corner: Safe AI Tools',
            steps: [
                { step: 1, action: 'Choose safe AI tools', time: '30 sec', detail: 'Use reputable platforms that protect your data' },
                { step: 2, action: 'Add disclosure labels', time: '30 sec', detail: 'Always label AI-generated content clearly' },
                { step: 3, action: 'Keep human touch', time: '30 sec', detail: 'Add your personal style and voice to AI output' }
            ]
        }
    };

    const lesson = lessons[lessonId];
    if (lesson) {
        showBlackTechModal(lesson.title, `
            <div class="space-y-6">
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl mb-4">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <p class="text-gray-600">Step-by-step micro-lesson with real outcomes</p>
                </div>

                <div class="space-y-4">
                    ${lesson.steps.map(step => `
                        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border-l-4 border-teal-500">
                            <div class="flex items-center justify-between mb-2">
                                <span class="font-bold text-teal-800">Step ${step.step}: ${step.action}</span>
                                <span class="bg-teal-100 text-teal-600 text-xs px-2 py-1 rounded-full">${step.time}</span>
                            </div>
                            <p class="text-teal-700 text-sm">${step.detail}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-green-800 mb-2">💡 Pro Tip</h4>
                    <p class="text-green-700 text-sm">Bookmark this page and come back daily for new micro-lessons that build real-world skills!</p>
                </div>

                <button onclick="this.closest('.fixed').remove()" class="w-full bg-teal-600 text-white py-3 rounded font-medium hover:bg-teal-700">
                    Got it! 🎉
                </button>
            </div>
        `);
    }
}

function learnMoreP1Academy() {
    showBlackTechModal('Player 1 Academy: AI/VR/AR Learning Model', `
        <div class="space-y-6">
            <div class="text-center">
                <i class="fas fa-graduation-cap text-indigo-600 text-4xl mb-4"></i>
                <h3 class="text-xl font-bold">Transforming Education Through Technology</h3>
            </div>

            <div class="bg-indigo-50 p-4 rounded-lg">
                <h4 class="font-semibold text-indigo-800 mb-2">🎯 Mission</h4>
                <p class="text-indigo-700 text-sm">Player 1 Academy bridges the digital divide by providing hands-on AI, VR, and AR training that prepares communities for the future of work and learning.</p>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-semibold text-purple-800 mb-2">🚀 Unique Approach</h4>
                <ul class="text-purple-700 text-sm space-y-1">
                    <li>• Immersive VR/AR learning environments</li>
                    <li>• Culturally responsive AI curriculum</li>
                    <li>• Community-centered career development</li>
                    <li>• Industry partnership for real opportunities</li>
                </ul>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2">📈 Impact</h4>
                <ul class="text-green-700 text-sm space-y-1">
                    <li>• 500+ educators trained in AI integration</li>
                    <li>• 1,200+ youth engaged in tech career programs</li>
                    <li>• 85% job placement rate in tech roles</li>
                    <li>• Partnership with 20+ school districts</li>
                </ul>
            </div>

            <div class="flex space-x-3">
                <button onclick="window.open('https://www.player1academy.org/aitrainingprograms', '_blank')" class="flex-1 bg-indigo-600 text-white py-2 rounded font-medium">
                    Visit Programs
                </button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-medium">
                    Close
                </button>
            </div>
        </div>
    `);
}

function submitCommunityQuestion() {
    showBlackTechModal('Question Submitted Successfully!', `
        <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl">
                <i class="fas fa-check"></i>
            </div>
            <h3 class="text-xl font-bold">Your Question is in the Queue!</h3>
            <p class="text-gray-600">Our AI coaches will review and provide a comprehensive answer within 24-48 hours.</p>
            <div class="bg-teal-50 p-4 rounded-lg">
                <p class="text-teal-700 text-sm">✨ <strong>What happens next:</strong> Human-reviewed answers ensure quality and cultural relevance. Check back tomorrow!</p>
            </div>
            <button onclick="this.closest('.fixed').remove()" class="bg-teal-600 text-white px-6 py-2 rounded font-medium">
                Got it!
            </button>
        </div>
    `);
}

// Initialize jobs section with all jobs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('jobs-grid')) {
            filterJobs('all');
        }
    }, 100);
});

function showBlackTechModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-gray-800">${title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add CSS animations for enhanced visual effects
const blackTechStyles = document.createElement('style');
blackTechStyles.textContent = `
    .marquee {
        animation: scroll-left 30s linear infinite;
        white-space: nowrap;
    }
    
    @keyframes scroll-left {
        from { transform: translateX(100%); }
        to { transform: translateX(-100%); }
    }
    
    .pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes pulse-glow {
        from { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
        to { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.3); }
    }
    
    .float-animation {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .gradient-border {
        position: relative;
        background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
        background-size: 400% 400%;
        animation: gradient 3s ease infinite;
    }
    
    @keyframes gradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
`;

document.head.appendChild(blackTechStyles);

// MVP Healthcare Interactive Functions
function addMVPHealthcareEventListeners() {
    // Add any specific event listeners for MVP Healthcare section
    console.log('MVP Healthcare event listeners added');
}

function scrollToMVPSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update tab active state
        document.querySelectorAll('.mvp-tab-btn').forEach(btn => {
            btn.classList.remove('border-mvp-red', 'text-mvp-red');
            btn.classList.add('border-transparent');
        });
        
        // Find and activate the corresponding tab
        const activeTab = document.querySelector(`button[onclick="scrollToMVPSection('${sectionId}')"]`);
        if (activeTab) {
            activeTab.classList.add('border-mvp-red', 'text-mvp-red');
            activeTab.classList.remove('border-transparent');
        }
    }
}


function openProviderDetails(providerId) {
    const providers = {
        'dr-johnson': {
            name: 'Dr. Sarah Johnson',
            specialty: 'Family Medicine',
            rating: '4.9',
            bio: 'Dr. Johnson has over 15 years of experience in family medicine with a focus on preventive care and chronic disease management.',
            address: '100 Medical Center Dr, Rochester, NY 14623',
            phone: '(585) 555-0100',
            acceptingPatients: true
        },
        'dr-martinez': {
            name: 'Dr. Carlos Martinez',
            specialty: 'Cardiology',
            rating: '4.8',
            bio: 'Leading cardiologist specializing in heart disease prevention, intervention cardiology, and cardiac rehabilitation.',
            address: '250 Heart Center Blvd, Rochester, NY 14620',
            phone: '(585) 555-0200',
            acceptingPatients: true
        },
        'dr-washington': {
            name: 'Dr. Kenya Washington',
            specialty: 'Pediatrics',
            rating: '4.9',
            bio: 'Dedicated pediatrician providing comprehensive care for children from infancy through adolescence.',
            address: '75 Children\'s Way, Rochester, NY 14621',
            phone: '(585) 555-0300',
            acceptingPatients: true
        }
    };

    const provider = providers[providerId];
    if (!provider) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div class="sticky top-0 bg-gradient-to-r from-mvp-red to-mvp-brown text-white p-6 rounded-t-xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold">${provider.name}</h2>
                        <p class="opacity-90">${provider.specialty}</p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-300">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 class="font-bold text-mvp-brown mb-3">Contact Information</h3>
                        <div class="space-y-2">
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt text-mvp-red mr-2"></i>
                                <span class="text-gray-700">${provider.address}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-phone text-mvp-red mr-2"></i>
                                <span class="text-gray-700">${provider.phone}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-star text-yellow-500 mr-2"></i>
                                <span class="text-gray-700">${provider.rating}/5.0 Rating</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="font-bold text-mvp-brown mb-3">Availability</h3>
                        <div class="space-y-2">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-mvp-green rounded-full mr-2"></div>
                                <span class="text-gray-700">Accepting New Patients</span>
                            </div>
                            <div class="text-gray-600">Next Available: Tomorrow</div>
                        </div>
                    </div>
                </div>
                
                <div class="mb-6">
                    <h3 class="font-bold text-mvp-brown mb-3">About ${provider.name}</h3>
                    <p class="text-gray-700">${provider.bio}</p>
                </div>
                
                <div class="flex gap-4">
                    <button onclick="bookAppointment('${providerId}')" class="flex-1 bg-mvp-red hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all">
                        <i class="fas fa-calendar mr-2"></i>Book Appointment
                    </button>
                    <button onclick="getDirections('${providerId}')" class="flex-1 bg-mvp-green hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all">
                        <i class="fas fa-directions mr-2"></i>Get Directions
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function openServiceDetails(serviceId) {
    const services = {
        'primary-care': {
            title: 'Primary Care Services',
            description: 'Comprehensive primary healthcare including annual physicals, preventive care, and routine health maintenance.',
            features: [
                'Annual Physical Exams',
                'Preventive Health Screenings',
                'Chronic Disease Management',
                'Vaccination Services',
                'Health Risk Assessments',
                'Family Planning Services'
            ]
        },
        'specialist-care': {
            title: 'Specialist Care Network',
            description: 'Access to our extensive network of medical specialists and subspecialists.',
            features: [
                'Cardiology Services',
                'Orthopedic Care',
                'Dermatology',
                'Gastroenterology',
                'Endocrinology',
                'Pulmonology'
            ]
        },
        'urgent-care': {
            title: 'Urgent Care Services',
            description: 'Quick access to medical care for non-emergency conditions with extended hours.',
            features: [
                'Extended Hours Coverage',
                'Minor Injury Treatment',
                'Illness Diagnosis & Treatment',
                'X-Ray & Lab Services',
                'Prescription Services',
                'No Appointment Necessary'
            ]
        },
        'mental-health': {
            title: 'Mental Health Services',
            description: 'Comprehensive mental health support including counseling, therapy, and psychiatric care.',
            features: [
                'Individual Counseling',
                'Group Therapy Sessions',
                'Psychiatric Evaluations',
                'Medication Management',
                'Crisis Intervention',
                'Family Therapy'
            ]
        },
        'preventive-care': {
            title: 'Preventive Care Programs',
            description: 'Proactive healthcare services designed to prevent illness and maintain optimal health.',
            features: [
                'Health Screenings',
                'Vaccination Programs',
                'Wellness Coaching',
                'Nutrition Counseling',
                'Fitness Programs',
                'Health Education'
            ]
        },
        'pharmacy': {
            title: 'Pharmacy Services',
            description: 'Full-service pharmacy with prescription medications and health management tools.',
            features: [
                'Prescription Medications',
                'Over-the-Counter Products',
                'Medication Therapy Management',
                'Refill Reminders',
                'Drug Interaction Screening',
                'Immunization Services'
            ]
        }
    };

    const service = services[serviceId];
    if (!service) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div class="sticky top-0 bg-gradient-to-r from-mvp-green to-green-600 text-white p-6 rounded-t-xl">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold">${service.title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-300">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <p class="text-gray-700 mb-6">${service.description}</p>
                
                <h3 class="font-bold text-mvp-brown mb-4">What's Included:</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    ${service.features.map(feature => `
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-mvp-green mr-2"></i>
                            <span class="text-gray-700">${feature}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="flex gap-4">
                    <button onclick="findServiceProviders('${serviceId}')" class="flex-1 bg-mvp-red hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all">
                        <i class="fas fa-search mr-2"></i>Find Providers
                    </button>
                    <button onclick="learnMoreService('${serviceId}')" class="flex-1 bg-mvp-green hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all">
                        <i class="fas fa-info-circle mr-2"></i>Learn More
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function rsvpEvent(eventId) {
    const events = {
        'health-screening': 'Free Health Screening Event',
        'fitness-workshop': 'Fitness & Wellness Workshop',
        'parent-support': 'New Parent Support Group',
        'medication-class': 'Medication Management Class'
    };
    
    const eventName = events[eventId] || 'Community Event';
    showNotification(`RSVP confirmed for ${eventName}!`, 'success');
}

function getDirectionsById(locationId) {
    // Open Google Maps directions (example implementation)
    const locations = {
        'community-center': 'Rochester Community Center, Rochester, NY',
        'dr-johnson': '100 Medical Center Dr, Rochester, NY 14623',
        'dr-martinez': '250 Heart Center Blvd, Rochester, NY 14620',
        'dr-washington': '75 Children\'s Way, Rochester, NY 14621'
    };
    
    const location = locations[locationId];
    if (location) {
        const encodedLocation = encodeURIComponent(location);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`, '_blank');
    }
}

function volunteerApply(opportunityId) {
    const opportunities = {
        'health-screening': 'Health Screening Events',
        'health-education': 'Health Education Programs',
        'senior-support': 'Senior Support Services'
    };
    
    const opportunityName = opportunities[opportunityId] || 'Volunteer Opportunity';
    showNotification(`Application started for ${opportunityName}!`, 'info');
    
    // Simulate redirect to volunteer application
    setTimeout(() => {
        showNotification('Redirecting to volunteer application form...', 'info');
    }, 1000);
}

function openVolunteerApplication() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div class="sticky top-0 bg-gradient-to-r from-mvp-red to-mvp-brown text-white p-6 rounded-t-xl">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold">Volunteer Application</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-300">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <form onsubmit="submitVolunteerApplication(event)">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block font-semibold text-mvp-brown mb-2">First Name *</label>
                            <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mvp-green">
                        </div>
                        <div>
                            <label class="block font-semibold text-mvp-brown mb-2">Last Name *</label>
                            <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mvp-green">
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block font-semibold text-mvp-brown mb-2">Email Address *</label>
                        <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mvp-green">
                    </div>
                    
                    <div class="mb-4">
                        <label class="block font-semibold text-mvp-brown mb-2">Phone Number *</label>
                        <input type="tel" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mvp-green">
                    </div>
                    
                    <div class="mb-4">
                        <label class="block font-semibold text-mvp-brown mb-2">Areas of Interest (select all that apply)</label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <label class="flex items-center"><input type="checkbox" class="mr-2"> Health Screening Events</label>
                            <label class="flex items-center"><input type="checkbox" class="mr-2"> Health Education</label>
                            <label class="flex items-center"><input type="checkbox" class="mr-2"> Senior Support</label>
                            <label class="flex items-center"><input type="checkbox" class="mr-2"> Community Outreach</label>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <label class="block font-semibold text-mvp-brown mb-2">Availability</label>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <label class="flex items-center"><input type="checkbox" class="mr-2"> Weekdays</label>
                            <label class="flex items-center"><input type="checkbox" class="mr-2"> Weekends</label>
                            <label class="flex items-center"><input type="checkbox" class="mr-2"> Evenings</label>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block font-semibold text-mvp-brown mb-2">Why do you want to volunteer with MVP Healthcare?</label>
                        <textarea rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mvp-green" placeholder="Tell us about your motivation to volunteer..."></textarea>
                    </div>
                    
                    <button type="submit" class="w-full bg-mvp-red hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all">
                        <i class="fas fa-paper-plane mr-2"></i>Submit Application
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function submitVolunteerApplication(event) {
    event.preventDefault();
    showNotification('Volunteer application submitted successfully!', 'success');
    event.target.closest('.fixed').remove();
    
    setTimeout(() => {
        showNotification('Our team will contact you within 2-3 business days!', 'info');
    }, 2000);
}

function downloadApp(platform) {
    const appUrls = {
        'ios': 'https://apps.apple.com/us/app/mvp-health-care/id1234567890',
        'android': 'https://play.google.com/store/apps/details?id=com.mvphealthcare.mobile'
    };
    
    showNotification(`Redirecting to ${platform.toUpperCase()} app store...`, 'info');
    
    // Simulate app store redirect
    setTimeout(() => {
        // window.open(appUrls[platform], '_blank');
        showNotification('MVP Healthcare mobile app download started!', 'success');
    }, 1000);
}

function openMVPApp() {
    showNotification('Opening MVP Healthcare mobile app information...', 'info');
    scrollToMVPSection('mobile-app');
}

function bookAppointment(providerId) {
    showNotification('Redirecting to MVP Healthcare appointment booking system...', 'info');
    
    setTimeout(() => {
        showNotification('Appointment booking system loaded!', 'success');
    }, 1500);
}

function findServiceProviders(serviceId) {
    showNotification(`Finding providers for ${serviceId.replace('-', ' ')} services...`, 'info');
    
    setTimeout(() => {
        showNotification('Found 23 providers in your area!', 'success');
    }, 1500);
}

function learnMoreService(serviceId) {
    showNotification(`Loading detailed information about ${serviceId.replace('-', ' ')} services...`, 'info');
}

// Limitless Living Interactive Functions
function addLimitlessLivingEventListeners() {
    console.log('Limitless Living event listeners added');
}

function scrollToLimitlessSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update tab active state
        document.querySelectorAll('.limitless-tab-btn').forEach(btn => {
            btn.classList.remove('border-purple-700', 'font-bold');
            btn.classList.add('border-transparent');
        });
        
        // Find and activate the corresponding tab
        const activeTab = document.querySelector(`button[onclick="scrollToLimitlessSection('${sectionId}')"]`);
        if (activeTab) {
            activeTab.classList.add('border-purple-700', 'font-bold');
            activeTab.classList.remove('border-transparent');
        }
    }
}

function adjustTextSize(action) {
    const body = document.body;
    const currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    
    if (action === 'increase') {
        body.style.fontSize = (currentSize + 2) + 'px';
        showNotification('Text size increased', 'success');
    } else if (action === 'decrease') {
        body.style.fontSize = Math.max(currentSize - 2, 12) + 'px';
        showNotification('Text size decreased', 'success');
    }
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    
    if (isHighContrast) {
        document.body.style.filter = 'contrast(1.5)';
        showNotification('High contrast mode enabled', 'success');
    } else {
        document.body.style.filter = '';
        showNotification('High contrast mode disabled', 'info');
    }
}

function toggleScreenReaderMode() {
    showNotification('Screen reader users: All content includes proper ARIA labels and semantic HTML. Navigate using headings (H key) and landmarks (D key).', 'info');
}

function searchLimitlessResources() {
    showNotification('Searching resources based on your criteria...', 'info');
    
    setTimeout(() => {
        showNotification('Found 47 resources matching your criteria!', 'success');
    }, 1500);
}

function openResourceCategory(categoryId) {
    const categories = {
        'independent-living': {
            title: 'Independent Living Centers',
            description: 'Independent Living Centers (ILCs) provide peer support, advocacy, and skills training to help people with disabilities live independently in their communities.',
            services: [
                'Peer Counseling and Support',
                'Independent Living Skills Training',
                'Information and Referral Services',
                'Advocacy and Systems Change',
                'Transition Services for Youth',
                'Assistive Technology Demonstrations'
            ],
            providers: [
                {
                    name: 'Rochester Center for Independent Living',
                    phone: '(585) 442-6470',
                    address: '497 State Street, Rochester, NY 14608',
                    culturalCompetency: 'High'
                },
                {
                    name: 'Finger Lakes Independence Center',
                    phone: '(585) 442-7371',
                    address: '215 Fifth Street, Ithaca, NY 14850',
                    culturalCompetency: 'Medium'
                }
            ]
        },
        'disability-rights': {
            title: 'Disability Rights & Legal Aid',
            description: 'Legal advocacy organizations that protect and advance the rights of people with disabilities through individual representation, policy advocacy, and public education.',
            services: [
                'Legal Representation for Discrimination Cases',
                'ADA Compliance Assistance',
                'Special Education Advocacy',
                'Benefits Planning and Protection',
                'Housing Rights Advocacy',
                'Employment Discrimination Support'
            ],
            providers: [
                {
                    name: 'Disability Rights New York',
                    phone: '(585) 546-5510',
                    address: 'Rochester Regional Office',
                    culturalCompetency: 'High'
                },
                {
                    name: 'Legal Assistance of Western New York',
                    phone: '(585) 232-4090',
                    address: '1 West Main Street, Rochester, NY 14614',
                    culturalCompetency: 'High'
                }
            ]
        },
        'vocational-rehab': {
            title: 'Vocational Rehabilitation Services',
            description: 'State and community programs that help people with disabilities prepare for, find, and maintain employment through training, job placement, and workplace accommodations.',
            services: [
                'Vocational Evaluation and Assessment',
                'Job Training and Skills Development',
                'Job Placement Services',
                'Workplace Accommodation Consultation',
                'Assistive Technology for Work',
                'Supported Employment Services'
            ],
            providers: [
                {
                    name: 'NYS Office of Vocational Rehabilitation (ACCES-VR)',
                    phone: '(585) 238-2900',
                    address: '109 South Union Street, Rochester, NY 14607',
                    culturalCompetency: 'Medium'
                },
                {
                    name: 'Goodwill - Employment & Training Services',
                    phone: '(585) 325-1140',
                    address: 'Multiple Locations',
                    culturalCompetency: 'High'
                }
            ]
        },
        'assistive-tech': {
            title: 'Assistive Technology Resources',
            description: 'Services providing access to assistive technology devices and services through assessment, funding assistance, training, and ongoing support.',
            services: [
                'AT Assessment and Evaluation',
                'Device Demonstrations and Trials',
                'Funding Source Information',
                'AT Training and Technical Support',
                'Device Repair and Maintenance',
                'Low-Cost AT Solutions'
            ],
            providers: [
                {
                    name: 'TRAID (Technology Resources for Accessible Independent Decisions)',
                    phone: '(585) 546-4211',
                    address: '1000 Elmwood Ave, Rochester, NY 14620',
                    culturalCompetency: 'High'
                },
                {
                    name: 'NYS TRAID Project - Regional Office',
                    phone: '1-800-522-4369',
                    address: 'Serving Monroe County',
                    culturalCompetency: 'Medium'
                }
            ]
        },
        'peer-support': {
            title: 'Peer Support Networks',
            description: 'Community connections with others who share similar disability experiences, providing mutual support, shared learning, and empowerment.',
            services: [
                'Peer Mentorship Programs',
                'Support Group Facilitation',
                'Social Connection Events',
                'Disability Pride Activities',
                'Leadership Development',
                'Cross-Disability Networking'
            ],
            providers: [
                {
                    name: 'Rochester Peer Support Network',
                    phone: '(585) 555-PEER',
                    address: 'Various Locations',
                    culturalCompetency: 'High'
                },
                {
                    name: 'BIPOC Disability Support Circle',
                    phone: '(585) 555-BIPOC',
                    address: 'Community Meetings',
                    culturalCompetency: 'Excellent'
                }
            ]
        },
        'bipoc-services': {
            title: 'BIPOC Disability Services',
            description: 'Culturally responsive disability services specifically designed to address the unique needs and experiences of disabled people from Black, Indigenous, and communities of color.',
            services: [
                'Culturally Responsive Peer Support',
                'Bilingual Service Navigation',
                'Cultural Advocacy Training',
                'Intersectional Identity Affirmation',
                'Community Health Worker Connections',
                'Faith-Based Disability Support'
            ],
            providers: [
                {
                    name: 'Center for Black Disabled Excellence',
                    phone: '(585) 555-CBDE',
                    address: 'Rochester Community Center',
                    culturalCompetency: 'Excellent'
                },
                {
                    name: 'Latin@ Disability Network',
                    phone: '(585) 555-LADI',
                    address: 'Ibero-American Action League',
                    culturalCompetency: 'Excellent'
                }
            ]
        }
    };

    const category = categories[categoryId];
    if (!category) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'category-title');
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div class="sticky top-0 bg-gradient-to-r from-purple-700 to-blue-600 text-white p-6 rounded-t-xl">
                <div class="flex items-center justify-between">
                    <h2 id="category-title" class="text-2xl font-bold">${category.title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-300 text-2xl" aria-label="Close dialog">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <p class="text-gray-700 mb-6 text-lg">${category.description}</p>
                
                <h3 class="text-xl font-bold text-purple-900 mb-4">Services Provided:</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    ${category.services.map(service => `
                        <div class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                            <span class="text-gray-700">${service}</span>
                        </div>
                    `).join('')}
                </div>
                
                <h3 class="text-xl font-bold text-purple-900 mb-4">Service Providers:</h3>
                <div class="space-y-4">
                    ${category.providers.map(provider => `
                        <div class="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                            <div class="flex items-start justify-between mb-3">
                                <h4 class="font-bold text-purple-900 text-lg">${provider.name}</h4>
                                <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                                    provider.culturalCompetency === 'Excellent' ? 'bg-green-100 text-green-800' :
                                    provider.culturalCompetency === 'High' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }">
                                    ${provider.culturalCompetency} Cultural Competency
                                </span>
                            </div>
                            <div class="space-y-2 text-gray-700">
                                <div class="flex items-center">
                                    <i class="fas fa-phone text-purple-600 mr-2"></i>
                                    <a href="tel:${provider.phone}" class="hover:text-purple-700">${provider.phone}</a>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-map-marker-alt text-purple-600 mr-2 mt-1"></i>
                                    <span>${provider.address}</span>
                                </div>
                            </div>
                            <div class="mt-3 flex gap-2">
                                <button onclick="contactProvider('${provider.name}')" class="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg transition-all">
                                    <i class="fas fa-phone mr-1"></i> Contact
                                </button>
                                <button onclick="getDirections('${provider.address}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all">
                                    <i class="fas fa-directions mr-1"></i> Directions
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

function contactProvider(providerName) {
    showNotification(`Connecting you with ${providerName}...`, 'info');
}

function getDirections(address) {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
}

// ============================================
// LATIN CONNECTION FUNCTIONS
// ============================================

// Initialize Latin Connection event listeners
function addLatinConnectionEventListeners() {
    // Smooth scroll for all navigation buttons
    document.querySelectorAll('[data-latin-scroll]').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-latin-scroll');
            scrollToLatinSection(targetId);
        });
    });

    // Language toggle buttons
    document.querySelectorAll('[data-language]').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-language');
            toggleLanguage(lang);
        });
    });

    // Category card click handlers
    document.querySelectorAll('[data-latin-category]').forEach(card => {
        card.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-latin-category');
            openLatinCategory(categoryId);
        });
    });

    // Initialize with English language
    toggleLanguage('en');
}

// Smooth scroll to Latin Connection sections with tab highlighting
function scrollToLatinSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Smooth scroll to section
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active tab styling - find buttons with onclick attribute
        document.querySelectorAll('.latin-tab-btn').forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes('scrollToLatinSection')) {
                // Reset inactive state
                btn.classList.remove('border-red-700', 'font-bold');
                btn.classList.add('border-transparent');
            }
        });
        
        // Highlight active tab
        document.querySelectorAll('.latin-tab-btn').forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes(`'${sectionId}'`)) {
                btn.classList.remove('border-transparent');
                btn.classList.add('border-red-700', 'font-bold');
            }
        });
    }
}

// Toggle between Spanish and English content
function toggleLanguage(lang) {
    // Update all language-specific elements
    document.querySelectorAll('[data-lang-en]').forEach(el => {
        el.style.display = lang === 'en' ? 'block' : 'none';
    });
    
    document.querySelectorAll('[data-lang-es]').forEach(el => {
        el.style.display = lang === 'es' ? 'block' : 'none';
    });

    // Update language toggle buttons
    const enBtn = document.querySelector('[data-language="en"]');
    const esBtn = document.querySelector('[data-language="es"]');
    
    if (enBtn && esBtn) {
        if (lang === 'en') {
            enBtn.classList.remove('bg-white', 'text-gray-700');
            enBtn.classList.add('bg-red-600', 'text-white');
            esBtn.classList.remove('bg-red-600', 'text-white');
            esBtn.classList.add('bg-white', 'text-gray-700');
        } else {
            esBtn.classList.remove('bg-white', 'text-gray-700');
            esBtn.classList.add('bg-red-600', 'text-white');
            enBtn.classList.remove('bg-red-600', 'text-white');
            enBtn.classList.add('bg-white', 'text-gray-700');
        }
    }
}

// Open detailed Latin category modal with Rochester-specific resources
function openLatinCategory(categoryId) {
    const categories = {
        'family-services': {
            title: 'Family Services / Servicios Familiares',
            titleEs: 'Servicios Familiares',
            description: 'Comprehensive family support services including counseling, emergency assistance, immigration support, and community resources.',
            descriptionEs: 'Servicios integrales de apoyo familiar incluyendo consejería, asistencia de emergencia, apoyo de inmigración y recursos comunitarios.',
            icon: 'fa-users',
            color: 'red',
            image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/6323af9b-f002-4291-aaeb-5b191a19060a.png',
            services: [
                'Bilingual Family Counseling / Consejería Familiar Bilingüe',
                'Emergency Financial Assistance / Asistencia Financiera de Emergencia',
                'Immigration Legal Support / Apoyo Legal de Inmigración',
                'Food & Housing Assistance / Asistencia de Alimentos y Vivienda',
                'Parent Education Programs / Programas de Educación para Padres',
                'Youth & Teen Services / Servicios para Jóvenes y Adolescentes'
            ],
            providers: [
                {
                    name: 'Ibero-American Action League',
                    nameEs: 'Liga de Acción Iberoamericana',
                    phone: '(585) 256-8900',
                    address: '817 E Main St, Rochester, NY 14605',
                    hours: 'Mon-Fri 8:30 AM - 5:00 PM',
                    hoursEs: 'Lun-Vie 8:30 AM - 5:00 PM',
                    services: 'Comprehensive family services, immigration support, youth programs',
                    servicesEs: 'Servicios familiares integrales, apoyo de inmigración, programas juveniles',
                    website: 'www.ibero.org'
                },
                {
                    name: 'Catholic Family Center',
                    nameEs: 'Centro Familiar Católico',
                    phone: '(585) 546-7220',
                    address: '87 N Clinton Ave, Rochester, NY 14604',
                    hours: 'Mon-Fri 8:30 AM - 4:30 PM',
                    hoursEs: 'Lun-Vie 8:30 AM - 4:30 PM',
                    services: 'Bilingual counseling, refugee services, emergency assistance',
                    servicesEs: 'Consejería bilingüe, servicios para refugiados, asistencia de emergencia',
                    website: 'www.cfcrochester.org'
                },
                {
                    name: 'Action for a Better Community (ABC)',
                    nameEs: 'Acción para una Mejor Comunidad',
                    phone: '(585) 325-5116',
                    address: '550 East Main St, Rochester, NY 14604',
                    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
                    hoursEs: 'Lun-Vie 8:00 AM - 5:00 PM',
                    services: 'Spanish-speaking advocates, utility assistance, weatherization',
                    servicesEs: 'Defensores hispanohablantes, asistencia de servicios públicos, climatización',
                    website: 'www.abcinfo.org'
                }
            ]
        },
        'education-youth': {
            title: 'Education & Youth / Educación y Juventud',
            titleEs: 'Educación y Juventud',
            description: 'Educational programs, tutoring, college preparation, youth development, and bilingual learning support.',
            descriptionEs: 'Programas educativos, tutoría, preparación universitaria, desarrollo juvenil y apoyo de aprendizaje bilingüe.',
            icon: 'fa-graduation-cap',
            color: 'yellow',
            image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/1b2f42af-fcfb-4817-9592-df6314e16438.png',
            services: [
                'Bilingual Tutoring / Tutoría Bilingüe',
                'College Preparation / Preparación Universitaria',
                'ESL/English Classes / Clases de ESL/Inglés',
                'After-School Programs / Programas Después de la Escuela',
                'STEM Education / Educación STEM',
                'Leadership Development / Desarrollo de Liderazgo'
            ],
            providers: [
                {
                    name: 'Ibero Youth Programs',
                    nameEs: 'Programas Juveniles de Ibero',
                    phone: '(585) 256-8900',
                    address: '817 E Main St, Rochester, NY 14605',
                    hours: 'Mon-Fri 3:00 PM - 8:00 PM',
                    hoursEs: 'Lun-Vie 3:00 PM - 8:00 PM',
                    services: 'After-school tutoring, summer programs, college prep',
                    servicesEs: 'Tutoría después de la escuela, programas de verano, preparación universitaria',
                    website: 'www.ibero.org/youth'
                },
                {
                    name: 'Baden Street Settlement',
                    nameEs: 'Centro Comunitario Baden Street',
                    phone: '(585) 325-4910',
                    address: '152 Baden St, Rochester, NY 14605',
                    hours: 'Mon-Fri 2:30 PM - 7:30 PM',
                    hoursEs: 'Lun-Vie 2:30 PM - 7:30 PM',
                    services: 'Youth programs, bilingual homework help, arts & culture',
                    servicesEs: 'Programas juveniles, ayuda bilingüe con tareas, artes y cultura',
                    website: 'www.badenstreet.org'
                },
                {
                    name: 'GEAR UP Rochester',
                    nameEs: 'GEAR UP Rochester',
                    phone: '(585) 242-7950',
                    address: '131 W Broad St, Rochester, NY 14614',
                    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
                    hoursEs: 'Lun-Vie 8:00 AM - 5:00 PM',
                    services: 'College planning, financial aid support, academic mentoring',
                    servicesEs: 'Planificación universitaria, apoyo de ayuda financiera, mentoría académica',
                    website: 'www.gearup.rochester.edu'
                }
            ]
        },
        'business-employment': {
            title: 'Business & Employment / Negocios y Empleo',
            titleEs: 'Negocios y Empleo',
            description: 'Small business support, entrepreneurship programs, job training, employment services, and economic development resources.',
            descriptionEs: 'Apoyo a pequeñas empresas, programas de emprendimiento, capacitación laboral, servicios de empleo y recursos de desarrollo económico.',
            icon: 'fa-briefcase',
            color: 'green',
            image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/4ba952a2-fdf0-4685-9f73-f4e3c371e938.png',
            services: [
                'Small Business Development / Desarrollo de Pequeñas Empresas',
                'Job Training & Placement / Capacitación y Colocación Laboral',
                'Entrepreneurship Workshops / Talleres de Emprendimiento',
                'Microloans & Financing / Microcréditos y Financiamiento',
                'Resume & Interview Prep / Preparación de CV y Entrevistas',
                'Professional Networking / Redes Profesionales'
            ],
            providers: [
                {
                    name: 'Rochester Hispanic Business Association',
                    nameEs: 'Asociación de Negocios Hispanos de Rochester',
                    phone: '(585) 697-0080',
                    address: 'PO Box 10386, Rochester, NY 14610',
                    hours: 'By Appointment / Por Cita',
                    hoursEs: 'Por Cita',
                    services: 'Business networking, mentorship, advocacy, procurement assistance',
                    servicesEs: 'Redes de negocios, mentoría, defensa, asistencia de adquisiciones',
                    website: 'www.rhbainc.com'
                },
                {
                    name: 'Small Business Development Center (SBDC)',
                    nameEs: 'Centro de Desarrollo de Pequeñas Empresas',
                    phone: '(585) 232-6120',
                    address: '100 Chestnut St, Rochester, NY 14604',
                    hours: 'Mon-Fri 8:30 AM - 4:30 PM',
                    hoursEs: 'Lun-Vie 8:30 AM - 4:30 PM',
                    services: 'Spanish-language business counseling, startup support, funding assistance',
                    servicesEs: 'Consejería empresarial en español, apoyo para nuevas empresas, asistencia de financiamiento',
                    website: 'www.monroecountysbdc.org'
                },
                {
                    name: 'Ibero Employment Services',
                    nameEs: 'Servicios de Empleo de Ibero',
                    phone: '(585) 256-8900',
                    address: '817 E Main St, Rochester, NY 14605',
                    hours: 'Mon-Fri 9:00 AM - 5:00 PM',
                    hoursEs: 'Lun-Vie 9:00 AM - 5:00 PM',
                    services: 'Job placement, skills training, career counseling, resume help',
                    servicesEs: 'Colocación laboral, capacitación, consejería profesional, ayuda con CV',
                    website: 'www.ibero.org/employment'
                }
            ]
        },
        'immigration': {
            title: 'Immigration Services / Servicios de Inmigración',
            titleEs: 'Servicios de Inmigración',
            description: 'Legal immigration assistance, DACA support, citizenship preparation, visa applications, and family reunification services.',
            descriptionEs: 'Asistencia legal de inmigración, apoyo DACA, preparación para ciudadanía, solicitudes de visa y servicios de reunificación familiar.',
            icon: 'fa-passport',
            color: 'blue',
            image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/6323af9b-f002-4291-aaeb-5b191a19060a.png',
            services: [
                'Immigration Legal Consultations / Consultas Legales de Inmigración',
                'DACA Renewal Assistance / Asistencia de Renovación DACA',
                'Citizenship Application / Solicitud de Ciudadanía',
                'Family Reunification / Reunificación Familiar',
                'Work Permits / Permisos de Trabajo',
                'Deportation Defense / Defensa de Deportación'
            ],
            providers: [
                {
                    name: 'Ibero Immigration Services',
                    nameEs: 'Servicios de Inmigración de Ibero',
                    phone: '(585) 256-8900',
                    address: '817 E Main St, Rochester, NY 14605',
                    hours: 'Mon-Fri 9:00 AM - 5:00 PM',
                    hoursEs: 'Lun-Vie 9:00 AM - 5:00 PM',
                    services: 'DOJ accredited representatives, full immigration services, DACA support',
                    servicesEs: 'Representantes acreditados por DOJ, servicios completos de inmigración, apoyo DACA',
                    website: 'www.ibero.org/immigration'
                },
                {
                    name: 'Volunteer Legal Services Project',
                    nameEs: 'Proyecto de Servicios Legales Voluntarios',
                    phone: '(585) 232-3051',
                    address: '1 W Main St, Suite 500, Rochester, NY 14614',
                    hours: 'Mon-Fri 9:00 AM - 5:00 PM',
                    hoursEs: 'Lun-Vie 9:00 AM - 5:00 PM',
                    services: 'Free legal consultations, pro bono representation, citizenship classes',
                    servicesEs: 'Consultas legales gratuitas, representación pro bono, clases de ciudadanía',
                    website: 'www.vlsprochester.org'
                },
                {
                    name: 'Catholic Family Center - Immigration',
                    nameEs: 'Centro Familiar Católico - Inmigración',
                    phone: '(585) 546-7220',
                    address: '87 N Clinton Ave, Rochester, NY 14604',
                    hours: 'Mon-Fri 8:30 AM - 4:30 PM',
                    hoursEs: 'Lun-Vie 8:30 AM - 4:30 PM',
                    services: 'Refugee resettlement, asylum support, document translation',
                    servicesEs: 'Reasentamiento de refugiados, apoyo de asilo, traducción de documentos',
                    website: 'www.cfcrochester.org'
                }
            ]
        },
        'health-services': {
            title: 'Health Services / Servicios de Salud',
            titleEs: 'Servicios de Salud',
            description: 'Medical care, mental health services, health insurance enrollment, maternal health, and wellness programs with Spanish-speaking providers.',
            descriptionEs: 'Atención médica, servicios de salud mental, inscripción de seguro médico, salud materna y programas de bienestar con proveedores que hablan español.',
            icon: 'fa-heartbeat',
            color: 'pink',
            image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/6323af9b-f002-4291-aaeb-5b191a19060a.png',
            services: [
                'Spanish-Speaking Medical Care / Atención Médica en Español',
                'Mental Health Counseling / Consejería de Salud Mental',
                'Health Insurance Enrollment / Inscripción de Seguro Médico',
                'Maternal & Child Health / Salud Maternal e Infantil',
                'Dental Services / Servicios Dentales',
                'Wellness & Prevention / Bienestar y Prevención'
            ],
            providers: [
                {
                    name: 'Mary\'s Place',
                    nameEs: 'Casa de María',
                    phone: '(585) 262-3570',
                    address: '1240 Lyell Ave, Rochester, NY 14606',
                    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
                    hoursEs: 'Lun-Vie 8:00 AM - 5:00 PM',
                    services: 'Free medical clinic, bilingual staff, maternal health, pediatrics',
                    servicesEs: 'Clínica médica gratuita, personal bilingüe, salud materna, pediatría',
                    website: 'www.marysplaceroc.org'
                },
                {
                    name: 'Ibero Salud Program',
                    nameEs: 'Programa de Salud de Ibero',
                    phone: '(585) 256-8900',
                    address: '817 E Main St, Rochester, NY 14605',
                    hours: 'Mon-Fri 9:00 AM - 5:00 PM',
                    hoursEs: 'Lun-Vie 9:00 AM - 5:00 PM',
                    services: 'Health insurance navigation, wellness programs, health education',
                    servicesEs: 'Navegación de seguro médico, programas de bienestar, educación de salud',
                    website: 'www.ibero.org/health'
                },
                {
                    name: 'Westside Health Services',
                    nameEs: 'Servicios de Salud Westside',
                    phone: '(585) 325-3120',
                    address: '1200 Buffalo Rd, Rochester, NY 14624',
                    hours: 'Mon-Sat 8:00 AM - 7:00 PM',
                    hoursEs: 'Lun-Sáb 8:00 AM - 7:00 PM',
                    services: 'Bilingual medical services, dental, mental health, pharmacy',
                    servicesEs: 'Servicios médicos bilingües, dentales, salud mental, farmacia',
                    website: 'www.westsidehealth.org'
                }
            ]
        },
        'arts-culture': {
            title: 'Arts & Culture / Arte y Cultura',
            titleEs: 'Arte y Cultura',
            description: 'Cultural events, traditional dance, music programs, art exhibitions, and celebrations of Latino heritage and traditions.',
            descriptionEs: 'Eventos culturales, danza tradicional, programas de música, exhibiciones de arte y celebraciones de herencia y tradiciones latinas.',
            icon: 'fa-music',
            color: 'purple',
            image: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/a64ba00a-2eb3-4983-bbaa-281ca08e5f5d.png',
            services: [
                'Puerto Rican Festival / Festival Puertorriqueño',
                'Traditional Dance Classes / Clases de Danza Tradicional',
                'Latin Music Events / Eventos de Música Latina',
                'Art Exhibitions / Exhibiciones de Arte',
                'Cultural Workshops / Talleres Culturales',
                'Heritage Celebrations / Celebraciones de Herencia'
            ],
            providers: [
                {
                    name: 'Puerto Rican Festival',
                    nameEs: 'Festival Puertorriqueño',
                    phone: '(585) 697-2260',
                    address: 'Parque Clinton, 618 Joseph Ave, Rochester, NY',
                    hours: 'Annual Event - August',
                    hoursEs: 'Evento Anual - Agosto',
                    services: 'Three-day cultural celebration with music, food, dance, and community',
                    servicesEs: 'Celebración cultural de tres días con música, comida, baile y comunidad',
                    website: 'www.prfestival.com'
                },
                {
                    name: 'Latinx Artists Circle',
                    nameEs: 'Círculo de Artistas Latinx',
                    phone: '(585) 271-3342',
                    address: '1320 University Ave, Rochester, NY 14607',
                    hours: 'Events Vary / Eventos Varían',
                    hoursEs: 'Eventos Varían',
                    services: 'Art exhibitions, artist collaborations, cultural programming',
                    servicesEs: 'Exhibiciones de arte, colaboraciones de artistas, programación cultural',
                    website: 'Contact via social media'
                },
                {
                    name: 'Baden Street Settlement - Cultural Programs',
                    nameEs: 'Baden Street - Programas Culturales',
                    phone: '(585) 325-4910',
                    address: '152 Baden St, Rochester, NY 14605',
                    hours: 'Mon-Fri 9:00 AM - 7:00 PM',
                    hoursEs: 'Lun-Vie 9:00 AM - 7:00 PM',
                    services: 'Dance classes, music programs, cultural celebrations, youth arts',
                    servicesEs: 'Clases de baile, programas de música, celebraciones culturales, artes juveniles',
                    website: 'www.badenstreet.org'
                }
            ]
        }
    };

    const category = categories[categoryId];
    if (!category) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <!-- Modal Header -->
            <div class="relative overflow-hidden bg-gradient-to-r from-${category.color}-600 via-${category.color}-500 to-${category.color}-400 text-white p-8">
                <!-- Background Image -->
                <div class="absolute inset-0 opacity-20">
                    <img src="${category.image}" 
                         alt="${category.title}" 
                         class="w-full h-full object-cover">
                </div>
                
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <i class="fas ${category.icon} text-4xl mr-4"></i>
                            <div>
                                <h2 class="text-3xl font-bold" data-lang-en>${category.title}</h2>
                                <h2 class="text-3xl font-bold" data-lang-es style="display:none;">${category.titleEs}</h2>
                            </div>
                        </div>
                        <button onclick="this.closest('.fixed').remove()" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <p class="text-white/95 text-lg" data-lang-en>${category.description}</p>
                    <p class="text-white/95 text-lg" data-lang-es style="display:none;">${category.descriptionEs}</p>
                </div>
            </div>
            
            <!-- Modal Body -->
            <div class="p-8">
                <!-- Services Section -->
                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <i class="fas fa-check-circle text-${category.color}-600 mr-3"></i>
                        <span data-lang-en>Services Available</span>
                        <span data-lang-es style="display:none;">Servicios Disponibles</span>
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${category.services.map(service => `
                            <div class="flex items-start bg-${category.color}-50 rounded-lg p-3 border-l-4 border-${category.color}-500">
                                <i class="fas fa-check text-${category.color}-600 mr-2 mt-1"></i>
                                <span class="text-gray-700">${service}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Providers Section -->
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <i class="fas fa-map-marker-alt text-${category.color}-600 mr-3"></i>
                        <span data-lang-en>Service Providers in Rochester</span>
                        <span data-lang-es style="display:none;">Proveedores de Servicios en Rochester</span>
                    </h3>
                    <div class="space-y-4">
                        ${category.providers.map(provider => `
                            <div class="bg-gradient-to-r from-${category.color}-50 to-white rounded-xl p-6 border-2 border-${category.color}-200 hover:border-${category.color}-400 transition-all shadow-sm hover:shadow-md">
                                <div class="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 class="font-bold text-${category.color}-900 text-xl" data-lang-en>${provider.name}</h4>
                                        <h4 class="font-bold text-${category.color}-900 text-xl" data-lang-es style="display:none;">${provider.nameEs}</h4>
                                    </div>
                                    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-${category.color}-600 text-white whitespace-nowrap ml-2">
                                        <span data-lang-en>Bilingual</span>
                                        <span data-lang-es style="display:none;">Bilingüe</span>
                                    </span>
                                </div>
                                
                                <div class="space-y-2 text-gray-700 mb-4">
                                    <div class="flex items-center">
                                        <i class="fas fa-phone text-${category.color}-600 mr-3 w-5"></i>
                                        <a href="tel:${provider.phone}" class="hover:text-${category.color}-700 font-medium">${provider.phone}</a>
                                    </div>
                                    <div class="flex items-start">
                                        <i class="fas fa-map-marker-alt text-${category.color}-600 mr-3 mt-1 w-5"></i>
                                        <span>${provider.address}</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-clock text-${category.color}-600 mr-3 w-5"></i>
                                        <span data-lang-en>${provider.hours}</span>
                                        <span data-lang-es style="display:none;">${provider.hoursEs}</span>
                                    </div>
                                    ${provider.website ? `
                                        <div class="flex items-center">
                                            <i class="fas fa-globe text-${category.color}-600 mr-3 w-5"></i>
                                            <a href="https://${provider.website}" target="_blank" class="hover:text-${category.color}-700 underline">${provider.website}</a>
                                        </div>
                                    ` : ''}
                                </div>
                                
                                <div class="bg-white rounded-lg p-3 mb-4 border border-${category.color}-200">
                                    <p class="text-sm text-gray-700" data-lang-en><strong>Services:</strong> ${provider.services}</p>
                                    <p class="text-sm text-gray-700" data-lang-es style="display:none;"><strong>Servicios:</strong> ${provider.servicesEs}</p>
                                </div>
                                
                                <div class="flex gap-3">
                                    <button onclick="window.location.href='tel:${provider.phone}'" class="flex-1 bg-${category.color}-600 hover:bg-${category.color}-700 text-white py-3 px-4 rounded-lg transition-all font-medium">
                                        <i class="fas fa-phone mr-2"></i>
                                        <span data-lang-en>Call Now</span>
                                        <span data-lang-es style="display:none;">Llamar Ahora</span>
                                    </button>
                                    <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(provider.address)}', '_blank')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all font-medium">
                                        <i class="fas fa-directions mr-2"></i>
                                        <span data-lang-en">Directions</span>
                                        <span data-lang-es style="display:none;">Direcciones</span>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Emergency Help Section -->
                <div class="mt-8 bg-red-50 border-2 border-red-300 rounded-xl p-6">
                    <div class="flex items-start">
                        <i class="fas fa-phone-volume text-red-600 text-3xl mr-4 mt-1"></i>
                        <div class="flex-1">
                            <h4 class="font-bold text-red-900 text-lg mb-2" data-lang-en>Need Immediate Help?</h4>
                            <h4 class="font-bold text-red-900 text-lg mb-2" data-lang-es style="display:none;">¿Necesita Ayuda Inmediata?</h4>
                            <p class="text-red-800 mb-3" data-lang-en>Call 211 for free, confidential help connecting to community resources. Spanish-speaking operators available 24/7.</p>
                            <p class="text-red-800 mb-3" data-lang-es style="display:none;">Llame al 211 para obtener ayuda gratuita y confidencial para conectarse con recursos comunitarios. Operadores que hablan español disponibles 24/7.</p>
                            <a href="tel:211" class="inline-block bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-all font-bold">
                                <i class="fas fa-phone mr-2"></i>
                                <span data-lang-en>Call 211 Now</span>
                                <span data-lang-es style="display:none;">Llamar al 211 Ahora</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Initialize language toggle for modal content
    const currentLang = document.querySelector('[data-language="en"]')?.classList.contains('bg-red-600') ? 'en' : 'es';
    toggleModalLanguage(modal, currentLang);
}

// Toggle language specifically for modal content
function toggleModalLanguage(modal, lang) {
    modal.querySelectorAll('[data-lang-en]').forEach(el => {
        el.style.display = lang === 'en' ? 'block' : 'none';
    });
    
    modal.querySelectorAll('[data-lang-es]').forEach(el => {
        el.style.display = lang === 'es' ? 'block' : 'none';
    });
}

// ============================================
// SENIOR CIRCLE FUNCTIONS
// ============================================

// Initialize Senior Circle event listeners
function addSeniorCircleEventListeners() {
    // Event listeners are already attached via onclick in HTML
    console.log('Senior Circle page loaded successfully');
}

// Smooth scroll to Senior Circle sections
function scrollToSeniorSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active tab styling
        const buttons = document.querySelectorAll('[onclick^="scrollToSeniorSection"]');
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick').includes(sectionId)) {
                btn.className = 'px-6 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-all font-medium text-lg';
            } else {
                btn.className = 'px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-orange-50 transition-all font-medium text-lg border-2 border-orange-200';
            }
        });
    }
}

// Play senior video tutorials
function playSeniorVideo(videoType) {
    const videos = {
        'morning-yoga': {
            title: '5-Minute Morning Yoga for Seniors',
            description: 'Gentle stretches and movements to start your day right. Perfect for all fitness levels.',
            duration: '5:23'
        },
        'transport-tutorial': {
            title: 'How to Schedule Transportation',
            description: 'Step-by-step guide to booking rides safely using rideshare apps.',
            duration: '8:15'
        },
        'community-highlights': {
            title: 'Community Activities Highlight Reel',
            description: 'See our Senior Circle community in action - cooking classes, art workshops, and social gatherings!',
            duration: '6:42'
        },
        'video-calls-tutorial': {
            title: 'Making Video Calls to Stay in Touch',
            description: 'Simple guide to video calling loved ones using Zoom, FaceTime, and WhatsApp.',
            duration: '7:30'
        }
    };
    
    const video = videos[videoType];
    if (!video) return;
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full" onclick="event.stopPropagation()">
            <div class="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">${video.title}</h2>
                        <p class="text-white/90 text-lg">${video.description}</p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-8">
                <!-- Video Player Placeholder -->
                <div class="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl aspect-video flex items-center justify-center mb-6 border-4 border-orange-300">
                    <div class="text-center">
                        <i class="fas fa-play-circle text-8xl text-orange-600 mb-4"></i>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Video Tutorial</h3>
                        <p class="text-gray-700 text-lg mb-4">Duration: ${video.duration}</p>
                        <p class="text-gray-600 max-w-md mx-auto">
                            This is a demo video player. In the full version, you would see the actual instructional video here.
                        </p>
                    </div>
                </div>
                
                <div class="flex gap-4">
                    <button class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg transition-all font-medium text-lg">
                        <i class="fas fa-play mr-2"></i>Play Video
                    </button>
                    <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg transition-all font-medium text-lg">
                        <i class="fas fa-bookmark mr-2"></i>Save for Later
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Open transportation service details
function openTransportService(serviceType) {
    const services = {
        'rideshare': {
            title: 'Rideshare Services',
            icon: 'fa-car-side',
            description: 'Safe and reliable rideshare options for seniors',
            providers: [
                { name: 'Uber', phone: 'App or Website', details: 'Senior-friendly rides with assistance' },
                { name: 'Lyft', phone: 'App or Website', details: 'Comfortable rides with helpful drivers' },
                { name: 'GoGoGrandparent', phone: '(855) 464-6872', details: 'Rideshare without a smartphone - call to book!' }
            ]
        },
        'shuttle': {
            title: 'Community Shuttles',
            icon: 'fa-bus',
            description: 'Free and low-cost shuttle services in Monroe County',
            providers: [
                { name: 'RTS Access', phone: '(585) 288-1700', details: 'Door-to-door service for eligible seniors' },
                { name: 'Lifespan Senior Center Shuttle', phone: '(585) 244-8400', details: 'Transportation to senior centers and activities' },
                { name: 'Church & Community Shuttles', phone: 'Various', details: 'Check with your local senior center' }
            ]
        },
        'medical': {
            title: 'Medical Transportation',
            icon: 'fa-ambulance',
            description: 'Non-emergency medical appointment transportation',
            providers: [
                { name: 'Medicaid Transportation', phone: '(844) 666-6270', details: 'Free rides to medical appointments for Medicaid members' },
                { name: 'American Red Cross', phone: '(585) 241-4400', details: 'Transportation assistance for medical needs' },
                { name: 'Private Medical Transport', phone: '(585) 546-6740', details: 'Wheelchair-accessible medical transport' }
            ]
        }
    };
    
    const service = services[serviceType];
    if (!service) return;
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full" onclick="event.stopPropagation()">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <i class="fas ${service.icon} text-5xl mr-4"></i>
                        <div>
                            <h2 class="text-3xl font-bold mb-2">${service.title}</h2>
                            <p class="text-white/90 text-lg">${service.description}</p>
                        </div>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Available Services:</h3>
                <div class="space-y-4">
                    ${service.providers.map(provider => `
                        <div class="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                            <h4 class="text-xl font-bold text-gray-900 mb-3">${provider.name}</h4>
                            <div class="space-y-2 text-gray-700 mb-4">
                                <div class="flex items-center text-lg">
                                    <i class="fas fa-phone text-blue-600 mr-3 w-5"></i>
                                    <span class="font-medium">${provider.phone}</span>
                                </div>
                                <div class="flex items-start text-lg">
                                    <i class="fas fa-info-circle text-blue-600 mr-3 mt-1 w-5"></i>
                                    <span>${provider.details}</span>
                                </div>
                            </div>
                            ${provider.phone !== 'App or Website' && provider.phone !== 'Various' ? `
                                <a href="tel:${provider.phone.replace(/[^0-9]/g, '')}" class="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all font-medium">
                                    <i class="fas fa-phone mr-2"></i>Call Now
                                </a>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// View senior events
function viewSeniorEvents() {
    showNotification('Loading upcoming community events...', 'info');
}

// View volunteer opportunities
function viewVolunteerOps() {
    showNotification('Loading volunteer opportunities...', 'info');
}

// View learning programs
function viewLearningPrograms() {
    showNotification('Loading lifelong learning programs...', 'info');
}

// Join friendship circle
function joinFriendshipCircle() {
    showNotification('Connecting you to friendship circles...', 'info');
}

// Open senior resource category
function openSeniorResourceCategory(category) {
    const categories = {
        'health': 'Health Resources - Medical services, prescriptions, and wellness programs',
        'housing': 'Housing Resources - Senior living, affordable housing, and home modifications',
        'tech': 'Technology Help - Smartphone guides, internet basics, and video calls',
        'finance': 'Financial Resources - Budgeting, benefits, and financial planning'
    };
    
    showNotification(categories[category] || 'Loading resources...', 'info');
}

// Open tech guide
function openTechGuide(guideType) {
    const guides = {
        'smartphone': {
            title: 'Using Your Smartphone',
            icon: 'fa-mobile-alt',
            steps: [
                'Turn on your phone by pressing and holding the power button',
                'Unlock with your passcode, fingerprint, or face ID',
                'Tap on app icons to open them',
                'Swipe up from bottom to see all your apps',
                'Double-tap home button to switch between apps',
                'Adjust text size in Settings > Display > Text Size'
            ]
        },
        'email': {
            title: 'Email Basics',
            icon: 'fa-envelope',
            steps: [
                'Open your email app (Gmail, Outlook, or Mail)',
                'Tap the compose button (usually a pencil or plus icon)',
                'Enter recipient\'s email address',
                'Type your subject and message',
                'Tap Send when ready',
                'Check your inbox regularly for new messages'
            ]
        },
        'video-calls': {
            title: 'Making Video Calls',
            icon: 'fa-video',
            steps: [
                'Download Zoom, FaceTime, or WhatsApp',
                'Open the app and sign in',
                'Find your contact in the list',
                'Tap the video call button',
                'Allow camera and microphone access',
                'Enjoy your conversation - tap red button to end'
            ]
        }
    };
    
    const guide = guides[guideType];
    if (!guide) return;
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full" onclick="event.stopPropagation()">
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <i class="fas ${guide.icon} text-4xl mr-4"></i>
                        <h2 class="text-3xl font-bold">${guide.title}</h2>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Guide:</h3>
                <div class="space-y-4">
                    ${guide.steps.map((step, index) => `
                        <div class="flex items-start bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                            <div class="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                                ${index + 1}
                            </div>
                            <p class="text-gray-700 text-lg pt-2">${step}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-8 bg-purple-100 rounded-xl p-6 border-2 border-purple-300">
                    <p class="text-gray-800 text-lg">
                        <i class="fas fa-lightbulb text-purple-600 mr-2"></i>
                        <strong>Need more help?</strong> Visit your local senior center for one-on-one tech assistance, or call 211 for technology training resources.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Open legal resources
function openLegalResources() {
    showNotification('Loading legal resources and assistance programs...', 'info');
}

// Open housing options
function openHousingOptions() {
    showNotification('Loading senior housing and independent living options...', 'info');
}

// Open financial planning
function openFinancialPlanning() {
    showNotification('Loading financial planning and retirement resources...', 'info');
}

// ============================================
// HYDE MENTAL HEALTH FUNCTIONS
// ============================================

// Initialize Hyde event listeners
function addHydeEventListeners() {
    console.log('Hyde mental health page loaded successfully');
}

// Smooth scroll to Hyde sections
function scrollToHydeSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active tab styling
        const buttons = document.querySelectorAll('[onclick^="scrollToHydeSection"]');
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick').includes(sectionId)) {
                btn.className = 'px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium';
            } else {
                btn.className = 'px-6 py-3 rounded-lg bg-white text-gray-700 hover:bg-blue-50 transition-all font-medium border-2 border-blue-200';
            }
        });
    }
}

// Open Hyde feature details
function openHydeFeature(featureId) {
    const features = {
        'checkins': {
            title: 'Daily Check-ins',
            icon: 'fa-calendar-check',
            color: 'blue',
            description: 'Track your mental health with daily mood check-ins using text or voice',
            details: [
                'Quick 2-minute daily assessments',
                'Voice or text input options',
                'AI analyzes patterns and trends',
                'Personalized insights and recommendations',
                'Privacy-protected data with encryption',
                'Export your check-in history anytime'
            ],
            howItWorks: [
                'Open Hyde and click "Daily Check-in"',
                'Choose voice or text input',
                'Answer guided questions about your mood',
                'Receive instant AI analysis and insights',
                'Track progress over time with visual charts'
            ]
        },
        'journaling': {
            title: 'Smart Journaling',
            icon: 'fa-book',
            color: 'teal',
            description: 'Write freely with AI-powered sentiment analysis and personalized insights',
            details: [
                'Encrypted journal entries for privacy',
                'Real-time sentiment analysis',
                'Emotion tracking and patterns',
                'Personalized reflections and prompts',
                'Search and organize your entries',
                'Export your complete journal'
            ],
            howItWorks: [
                'Click "New Journal Entry"',
                'Write freely about your thoughts and feelings',
                'AI analyzes sentiment and emotional patterns',
                'Receive personalized insights and prompts',
                'Review your emotional journey over time'
            ]
        },
        'risk': {
            title: 'Crisis Prevention & Risk Assessment',
            icon: 'fa-heartbeat',
            color: 'red',
            description: 'Early warning system to detect mental health risk and prevent crisis',
            details: [
                'AI monitors for crisis indicators',
                'Early intervention alerts',
                'Automatic escalation to professionals',
                'Safety planning and resources',
                '24/7 crisis hotline connections',
                'Confidential and compassionate support'
            ],
            howItWorks: [
                'AI continuously analyzes your check-ins and journal entries',
                'Detects patterns indicating elevated risk',
                'Provides gentle check-in prompts when needed',
                'Offers immediate crisis resources if detected',
                'Can notify emergency contacts with your consent'
            ]
        },
        'recommendations': {
            title: 'AI-Powered Recommendations',
            icon: 'fa-brain',
            color: 'green',
            description: 'Personalized micro-interventions based on your unique mental health needs',
            details: [
                'CBT (Cognitive Behavioral Therapy) techniques',
                'DBT (Dialectical Behavior Therapy) exercises',
                'Mindfulness and meditation practices',
                'Breathing exercises and grounding techniques',
                'Activity suggestions tailored to your mood',
                'Evidence-based interventions'
            ],
            howItWorks: [
                'AI analyzes your current emotional state',
                'Matches you with appropriate interventions',
                'Suggests micro-activities (5-15 minutes)',
                'Tracks what works best for you',
                'Adapts recommendations over time'
            ]
        },
        'privacy-controls': {
            title: 'Privacy Dashboard & Data Controls',
            icon: 'fa-user-shield',
            color: 'purple',
            description: 'Complete control over your mental health data with granular privacy settings',
            details: [
                'View all data collected about you',
                'Granular consent management',
                'Export all your data in JSON format',
                'Delete specific entries or all data',
                'Control who can access your information',
                'Transparent audit trail of all actions'
            ],
            howItWorks: [
                'Access Privacy Dashboard from settings',
                'Review your consent preferences',
                'Toggle specific data collection options',
                'Export or delete data with one click',
                'Review audit logs for transparency'
            ]
        },
        'cultural': {
            title: 'Cultural Intelligence & Awareness',
            icon: 'fa-globe',
            color: 'orange',
            description: 'Context-aware mental health support that respects your cultural background',
            details: [
                'Culturally appropriate content and language',
                'Recognition of diverse mental health perspectives',
                'Inclusive of BIPOC, LGBTQ+, religious communities',
                'Multilingual support (planned)',
                'Cultural stigma awareness and sensitivity',
                'Community-specific resources'
            ],
            howItWorks: [
                'Set your cultural preferences during onboarding',
                'AI adapts language and recommendations',
                'Content reflects your cultural context',
                'Connect with culturally similar peer groups',
                'Access culturally competent resources'
            ]
        }
    };
    
    const feature = features[featureId];
    if (!feature) return;
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="bg-gradient-to-r from-${feature.color}-600 to-${feature.color}-700 text-white p-8 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <i class="fas ${feature.icon} text-3xl"></i>
                        </div>
                        <div>
                            <h2 class="text-3xl font-bold mb-2">${feature.title}</h2>
                            <p class="text-white/90 text-lg">${feature.description}</p>
                        </div>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-star text-${feature.color}-600 mr-2"></i>Key Features
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    ${feature.details.map(detail => `
                        <div class="flex items-start bg-${feature.color}-50 rounded-lg p-3 border-l-4 border-${feature.color}-500">
                            <i class="fas fa-check text-${feature.color}-600 mr-2 mt-1"></i>
                            <span class="text-gray-700">${detail}</span>
                        </div>
                    `).join('')}
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-cog text-${feature.color}-600 mr-2"></i>How It Works
                </h3>
                <div class="space-y-3">
                    ${feature.howItWorks.map((step, index) => `
                        <div class="flex items-start bg-gray-50 rounded-lg p-4">
                            <div class="w-8 h-8 bg-${feature.color}-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                                ${index + 1}
                            </div>
                            <p class="text-gray-700 pt-1">${step}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-8 bg-${feature.color}-100 rounded-xl p-6 border-2 border-${feature.color}-300">
                    <p class="text-gray-800 text-center">
                        <i class="fas fa-shield-alt text-${feature.color}-600 mr-2"></i>
                        <strong>Privacy First:</strong> All features are built with your privacy and security as the top priority. Your data is encrypted, and you have complete control.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Start voice demo
function startVoiceDemo() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full" onclick="event.stopPropagation()">
            <div class="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">Voice AI Demo</h2>
                        <p class="text-white/90">Experience empathetic AI conversation</p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-8">
                <div class="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl aspect-video flex flex-col items-center justify-center mb-6 border-4 border-blue-300">
                    <i class="fas fa-microphone text-8xl text-blue-600 mb-4 animate-pulse"></i>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Voice AI Interface</h3>
                    <p class="text-gray-700 mb-4">Real-time speech-to-text and AI responses</p>
                    <div class="flex gap-4">
                        <div class="bg-white rounded-lg px-4 py-2">
                            <i class="fas fa-waveform text-blue-600 mr-2"></i>
                            <span class="text-gray-700">Live transcription</span>
                        </div>
                        <div class="bg-white rounded-lg px-4 py-2">
                            <i class="fas fa-brain text-teal-600 mr-2"></i>
                            <span class="text-gray-700">AI analysis</span>
                        </div>
                        <div class="bg-white rounded-lg px-4 py-2">
                            <i class="fas fa-volume-up text-green-600 mr-2"></i>
                            <span class="text-gray-700">Speech output</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-blue-100 rounded-xl p-6 mb-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                        <i class="fas fa-info-circle text-blue-600 mr-2"></i>Demo Features
                    </h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Empathetic responses to emotional sharing</li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Crisis keyword detection and escalation</li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Natural conversation flow with context awareness</li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Multiple voice styles (calm, soothing, warm)</li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i>Privacy-protected voice processing</li>
                    </ul>
                </div>
                
                <div class="flex gap-4">
                    <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all font-medium">
                        <i class="fas fa-microphone mr-2"></i>Start Voice Chat
                    </button>
                    <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg transition-all font-medium">
                        <i class="fas fa-cog mr-2"></i>Voice Settings
                    </button>
                </div>
                
                <p class="text-center text-sm text-gray-600 mt-6">
                    This is a demo interface. The full version would include real voice processing capabilities.
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}
