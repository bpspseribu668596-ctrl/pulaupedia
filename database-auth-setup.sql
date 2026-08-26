-- ============================================================================
-- Database Update: Authentication System
-- ============================================================================

USE pulau_pedia3101;

-- ============================================================================
-- Table: users (untuk authentication)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'admin',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================================
-- Insert default admin user
-- Username: admin
-- Password: admin123
-- Hash generated with bcrypt (rounds: 10)
-- ============================================================================
INSERT INTO users (username, password, name, role) VALUES
('admin', '$2b$10$YYJ1pRgQjfC.Ixc9cvjP8OBaI9aMZ2t1EMJyk/oIQjozy.WOQw/yC', 'Administrator', 'admin')
ON DUPLICATE KEY UPDATE password = '$2b$10$YYJ1pRgQjfC.Ixc9cvjP8OBaI9aMZ2t1EMJyk/oIQjozy.WOQw/yC', updatedAt = NOW();

-- ============================================================================
-- Selesai - Auth System Ready
-- ============================================================================
