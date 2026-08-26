-- ============================================================================
-- Database Update: Footer Multiple Entries Support (Using JSON)
-- Recreate Table Approach
-- ============================================================================

USE pulau_pedia3101;

-- ============================================================================
-- Step 1: Drop existing footer_config table
-- ============================================================================
DROP TABLE IF EXISTS footer_config;

-- ============================================================================
-- Step 2: Create new footer_config table with JSON columns
-- ============================================================================
CREATE TABLE footer_config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  companyName VARCHAR(255) NOT NULL DEFAULT 'BPS Kepulauan Seribu',
  companyAddress JSON,
  contacts JSON,
  links JSON,
  logo VARCHAR(500) NOT NULL DEFAULT 'uploads/footer/logo.png',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================================
-- Step 3: Insert default data with JSON format
-- ============================================================================
INSERT INTO footer_config (id, companyName, companyAddress, contacts, links, logo) VALUES
(
  1, 
  'BPS Kepulauan Seribu',
  JSON_ARRAY('Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta'),
  JSON_ARRAY(JSON_OBJECT('label', 'Telepon', 'value', '+62-21-XXXXXX')),
  JSON_ARRAY(JSON_OBJECT('label', 'Email', 'url', 'mailto:info@kepulauanseribu.bps.go.id')),
  'uploads/footer/logo.png'
);

-- ============================================================================
-- Selesai - Footer Table Recreated Successfully
-- ============================================================================
