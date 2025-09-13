-- Digital Green Book Database Schema

-- Resources table for vetted businesses and services
CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- housing, jobs, health, community, etc.
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  verified_date DATE,
  community_focus TEXT, -- black, brown, both
  tags TEXT, -- JSON array of tags
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Events table for community calendar
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
  category TEXT, -- cultural, educational, social, business, health
  community_focus TEXT, -- black, brown, both, latin
  is_recurring BOOLEAN DEFAULT FALSE,
  tags TEXT, -- JSON array of tags
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Historical content for RocRoots Connect
CREATE TABLE IF NOT EXISTS historical_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  time_period TEXT, -- e.g., "1800s", "Civil Rights Era"
  location TEXT, -- specific locations in Rochester
  people_involved TEXT, -- key figures
  significance TEXT,
  media_urls TEXT, -- JSON array of image/video URLs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Health resources for VitaHue
CREATE TABLE IF NOT EXISTS health_resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- nutrition, mental_health, preventive_care, etc.
  source TEXT,
  culturally_relevant BOOLEAN DEFAULT TRUE,
  tags TEXT, -- JSON array of tags
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- News articles for News Central
CREATE TABLE IF NOT EXISTS news_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  source TEXT,
  author TEXT,
  publish_date DATE,
  category TEXT, -- positive_news, community, achievement, business
  location TEXT, -- national, local, regional
  tags TEXT, -- JSON array of tags
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Economic content for Melomics
CREATE TABLE IF NOT EXISTS economic_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- entrepreneurship, investing, financial_literacy, etc.
  relevance_level TEXT, -- community, national, international
  tags TEXT, -- JSON array of tags
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_community ON resources(community_focus);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_historical_period ON historical_content(time_period);
CREATE INDEX IF NOT EXISTS idx_health_category ON health_resources(category);
CREATE INDEX IF NOT EXISTS idx_news_date ON news_articles(publish_date);
CREATE INDEX IF NOT EXISTS idx_economic_category ON economic_content(category);