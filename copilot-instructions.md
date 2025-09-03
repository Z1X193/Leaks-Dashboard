# Leak Intelligence Dashboard - Copilot Instructions

## Overview
Create a professional dark-themed data breach monitoring dashboard that matches the exact design shown in the reference image.

## Design Requirements

### Color Scheme
- **Background**: Very dark navy/black (#0f0f14 or similar)
- **Primary accent**: Bright cyan (#00d4ff) for highlights and key metrics
- **Secondary accent**: Purple (#8b5cf6) for charts and secondary elements  
- **Text**: White/light gray for readability
- **Cards**: Dark semi-transparent cards with subtle borders

### Layout Structure

#### Header Bar
- Logo: "🛡️ Leak Intelligence" in cyan with gradient text
- Organization selector dropdown: "TechCorp Solutions" with down arrow
- Badge showing: "🏢 Viewing: TechCorp Solutions" in cyan background
- Search bar: "Search in TechCorp Solutions..." with search icon
- Export button with download icon
- Notification bell with red dot indicator
- User avatar circle

#### KPI Cards Row (5 cards horizontal)
1. **Total Leaks**: 8,547 (cyan color)
2. **Unique Credentials**: 6,394 (purple color)  
3. **Reuse Detected**: 1,853 (orange color)
4. **Active Sources**: 67 (green color)
5. **Last Sync**: 2024-01-15 14:32:15 (gray text)

#### Action Buttons Row
- "📁 Import Source" button (cyan border)
- "📝 Create Rule" button 
- "📄 Export CSV" button

#### Main Content Area
**Left side (70%): Leak Explorer Table**
- Title: "Leak Explorer - TechCorp Solutions"
- "Filters" and "Sort by" controls on the right
- Table columns:
  - User/Email (e.g., john.doe@techcorp.com)
  - Password (hidden with dots and eye/copy icons)
  - Hash/Plain status
  - Domain (techcorp.com)
  - Source (DataBreach2024)
  - Date Found (2024-01-15)
  - Data Types (email, password, phone badges)
  - Risk (High/Medium badges with colors)
  - Status (New/Validated)
  - Actions (... menu)

**Right side (30%): Analytics Charts**
- **Top chart**: "Most Affected Domains - TechCorp Solutions"
  - Horizontal bar chart in cyan showing domain names and counts
  - techcorp.com with highest bar (~4000)
  - dev.techcorp.com (~3000)  
  - api.techcorp.com (~1500)

- **Bottom chart**: "Weekly Leak Trends - TechCorp Solutions"
  - Purple line chart showing weekly trends
  - Smooth curved line with data points
  - X-axis: W1, W2, W3, W4, W5, W6
  - Y-axis: 0 to 1400 scale

## Technical Implementation

### Vue 3 Components to Create
1. `Dashboard.vue` - Main layout container
2. `TopBar.vue` - Header with logo, org selector, search
3. `KpiCards.vue` - Metrics cards row
4. `ActionButtons.vue` - Import/Export buttons
5. `LeakTable.vue` - Main data table with filters
6. `AnalyticsPanel.vue` - Right sidebar with charts
7. `DomainChart.vue` - Bar chart component
8. `TrendChart.vue` - Line chart component

### Key Features
- Responsive design that works on desktop
- Real-time search filtering
- Password visibility toggle with security controls
- Interactive charts (hover effects, tooltips)
- Organization switching capability
- Export functionality
- Dark theme optimized for monitoring environments
- Professional security-focused UI/UX

### Data Structure
```javascript
// Sample leak record
{
  id: 1,
  email: "john.doe@techcorp.com",
  password: "encrypted_hash",
  passwordVisible: false,
  hashType: "Plain",
  domain: "techcorp.com", 
  source: "DataBreach2024",
  dateFound: "2024-01-15",
  dataTypes: ["email", "password", "phone"],
  riskLevel: "High",
  status: "New"
}
```

### Styling Guidelines
- Use Tailwind CSS for consistent styling
- Implement subtle hover effects on interactive elements
- Ensure proper contrast ratios for accessibility
- Use consistent spacing and typography scales
- Add loading states and smooth transitions
- Maintain professional, security-focused aesthetic

### Interactions
- Click on leak rows to show details
- Password reveal requires confirmation
- Charts should be interactive with tooltips
- Search filters results in real-time
- Organization switching updates all data views
- Export generates CSV with current filters applied

## Priority
Focus on replicating the exact visual design shown in the reference image first, then add interactive functionality. The dashboard should look professional and trustworthy for security teams monitoring data breaches.
