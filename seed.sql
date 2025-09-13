-- Digital Green Book Seed Data

-- Sample Resources
INSERT OR IGNORE INTO resources (name, description, category, address, phone, community_focus, tags) VALUES 
  ('Monroe County Housing Authority', 'Affordable housing programs and assistance for low-income families', 'housing', '435 East Main St, Rochester, NY 14604', '(585) 697-3485', 'both', '["affordable_housing", "assistance", "government"]'),
  ('Rochester Works!', 'Job training and placement services with focus on community empowerment', 'jobs', '161 St Paul St, Rochester, NY 14604', '(585) 258-3008', 'both', '["job_training", "employment", "skills"]'),
  ('Trillium Health', 'Culturally competent healthcare services for diverse communities', 'health', '259 Monroe Ave, Rochester, NY 14607', '(585) 545-7200', 'both', '["healthcare", "lgbtq_friendly", "community"]'),
  ('Baden Street Settlement', 'Community programs and youth services in the southwest neighborhood', 'community', '621 Baden St, Rochester, NY 14609', '(585) 254-2070', 'both', '["youth", "community", "programs"]'),
  ('Urban League of Rochester', 'Economic empowerment and civil rights organization', 'jobs', '265 N Clinton Ave, Rochester, NY 14605', '(585) 325-6530', 'black', '["civil_rights", "economic", "advocacy"]');

-- Sample Events
INSERT OR IGNORE INTO events (title, description, event_date, start_time, location, category, community_focus, tags) VALUES 
  ('Juneteenth Celebration 2024', 'Annual community celebration with food, music, and cultural activities', '2024-06-19', '12:00', 'Martin Luther King Jr Park', 'cultural', 'black', '["juneteenth", "celebration", "culture"]'),
  ('Black History Month Panel', 'Educational panel discussion on Rochester Black history', '2024-02-15', '18:00', 'Central Library', 'educational', 'black', '["education", "history", "panel"]'),
  ('Latino Business Expo', 'Networking event for Latino entrepreneurs and business owners', '2024-09-20', '10:00', 'Rochester Riverside Convention Center', 'business', 'latin', '["business", "networking", "entrepreneurship"]'),
  ('Health & Wellness Fair', 'Free health screenings and wellness education for the community', '2024-08-10', '09:00', 'Charles Carroll Elementary School', 'health', 'both', '["health", "wellness", "free_screening"]');

-- Sample Historical Content for RocRoots Connect
INSERT OR IGNORE INTO historical_content (title, content, time_period, location, people_involved, significance) VALUES 
  ('Frederick Douglass in Rochester', 'Frederick Douglass lived in Rochester from 1847 to 1872 and published The North Star newspaper here. His home on South Avenue became a station on the Underground Railroad.', '1840s-1870s', 'South Avenue, Rochester', 'Frederick Douglass, Anna Murray Douglass', 'Rochester became a center of abolitionist activity and publishing'),
  ('The 54th Regiment Connection', 'Many Rochester men joined the famous 54th Massachusetts Infantry Regiment during the Civil War, including members of the local AME Zion Church.', '1860s', 'AME Zion Church, Rochester', 'Local volunteers, Charles Douglass', 'Rochester contributed significantly to the Union Army and Civil War effort'),
  ('Susan B. Anthony and Civil Rights', 'Though known for womens suffrage, Susan B. Anthony worked closely with Frederick Douglass and other Black leaders in Rochester on civil rights issues.', '1850s-1900s', 'Madison Street, Rochester', 'Susan B. Anthony, Frederick Douglass', 'Intersectional activism between womens rights and civil rights movements');

-- Sample Health Resources
INSERT OR IGNORE INTO health_resources (title, content, category, culturally_relevant) VALUES 
  ('Managing Hypertension in the Black Community', 'High blood pressure affects Black Americans at higher rates. Learn culturally relevant dietary approaches including traditional foods that support heart health.', 'preventive_care', TRUE),
  ('Mental Health Resources for Youth of Color', 'Finding culturally competent mental health support for Black and Brown youth, including therapy options that understand cultural context.', 'mental_health', TRUE),
  ('Traditional Remedies and Modern Medicine', 'How to safely integrate traditional healing practices with modern medical care for optimal health outcomes.', 'holistic_health', TRUE);

-- Sample News Articles
INSERT OR IGNORE INTO news_articles (title, content, summary, source, publish_date, category, location) VALUES 
  ('Rochester Entrepreneur Opens Third Location', 'Local Black-owned restaurant chain expands with new location in downtown Rochester, creating 25 new jobs in the community.', 'Successful business expansion creates local jobs', 'Rochester Community News', '2024-01-15', 'business', 'local'),
  ('Student Wins National Science Competition', 'Rochester high school student from East High School takes first place in national STEM competition, earning full college scholarship.', 'Local student achieves national recognition in STEM', 'Education Today', '2024-02-01', 'achievement', 'local'),
  ('Community Garden Project Transforms Neighborhood', 'Residents of the 19th Ward collaborate to create sustainable community garden, improving food access and neighborhood pride.', 'Grassroots initiative improves community wellbeing', 'Urban Agriculture News', '2024-03-10', 'community', 'local');

-- Sample Economic Content
INSERT OR IGNORE INTO economic_content (title, content, category, relevance_level) VALUES 
  ('Building Generational Wealth Through Real Estate', 'Strategies for Black and Brown families to enter the real estate market and build long-term wealth through property investment.', 'investing', 'community'),
  ('Starting a Business in Rochester: Resources and Support', 'Complete guide to launching a business in Rochester, including minority-owned business certification and local funding opportunities.', 'entrepreneurship', 'community'),
  ('Financial Literacy for Young Adults', 'Essential money management skills for young people entering the workforce, with focus on avoiding predatory lending and building credit.', 'financial_literacy', 'community');