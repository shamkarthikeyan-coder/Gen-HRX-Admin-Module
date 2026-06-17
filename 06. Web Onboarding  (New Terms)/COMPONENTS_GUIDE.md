# genHRX Components Guide

## ✅ Successfully Created Components

### Modals & Forms
1. **AvatarEditorModal** (`/src/app/components/social/AvatarEditorModal.tsx`)
   - Upload or create virtual avatars
   - Crop and zoom functionality
   - Pre-built avatar options

2. **BannerEditorModal** (`/src/app/components/social/BannerEditorModal.tsx`)
   - Choose gradient or upload custom banner
   - Zoom and position controls
   - Pre-set gradient options

3. **CertificationFormModal** (`/src/app/components/social/CertificationFormModal.tsx`)
   - Add/Edit professional certifications
   - Form with name, issuing organization, date

4. **EducationFormModal** (`/src/app/components/modals/EducationFormModal.tsx`)
   - Add/Edit education entries
   - Degree, institution, start/end years

5. **ExperienceFormModal** (`/src/app/components/modals/ExperienceFormModal.tsx`)
   - Add/Edit work experience
   - Job title, company, dates
   - "Currently working here" toggle

6. **EditFieldModal** (`/src/app/components/modals/EditFieldModal.tsx`)
   - Generic field editor for profile updates
   - Supports text, email, textarea types

7. **CreatePostModal** (`/src/app/components/social/CreatePostModal.tsx`)
   - Rich post creation with media
   - Image, video, link, poll support
   - LinkedIn-style interface

8. **SaveToCollectionModal** (`/src/app/components/social/SaveToCollectionModal.tsx`)
   - Save posts to collections
   - Create new collections
   - Instagram-style centered modal

### Pages & Views
9. **CommunityPage** (`/src/app/components/social/CommunityPage.tsx`)
   - Discover and follow HR professionals
   - Category filtering
   - User cards with follow buttons

10. **ConnectionsPage** (`/src/app/components/social/ConnectionsPage.tsx`)
    - 3 tabs: Followers, Following, Groups
    - Connection management
    - Empty states for new users

### UI Components
11. **Logo** (`/src/app/components/Logo.tsx`)
    - 3 variants: icon, horizontal, vertical
    - 3 sizes: sm, md, lg
    - Gradient branding

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Purple (#9333EA) to Orange (#F97316)
- **Dark Mode**: Slate backgrounds (#1a1d29, #242833, #363b4e)
- **Light Mode**: White and slate gray variants

### Typography
- **Headings**: Bold, gradient text for key elements
- **Body**: Regular weight, high contrast
- **Labels**: Smaller, muted colors

### Spacing
- Consistent padding: 1rem (4), 1.25rem (5), 1.5rem (6)
- Gap between elements: 0.75rem (3), 1rem (4)

### Border Radius
- Buttons/Inputs: 0.75rem (rounded-xl)
- Cards: 1rem (rounded-2xl)
- Modals: 1.5rem (rounded-3xl)

## 📱 Responsive Design

### Mobile First (<768px)
- Full-width layouts
- Bottom sheet modals
- Touch-optimized buttons (min 44px)

### Web/Desktop (≥768px)
- Centered modals (max-width: 500px)
- Instagram-style layouts
- Hover states and transitions

## 🔗 Component Integration

### Example: Using Modals

```typescript
import { ExperienceFormModal } from './components/modals/ExperienceFormModal';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);
  
  const handleSave = (data: ExperienceData) => {
    console.log('Saved:', data);
    // Save to database/state
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Add Experience
      </button>
      
      <ExperienceFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        mode="add"
      />
    </>
  );
}
```

### Example: Using Logo

```typescript
import { Logo } from './components/Logo';

// Icon only
<Logo variant="icon" size="sm" />

// Horizontal (logo + text)
<Logo variant="horizontal" size="md" />

// Vertical (stacked)
<Logo variant="vertical" size="lg" />
```

## 🚀 Next Steps

### Still Needed:
1. **EnhancedHomeFeed** - Main feed component (you provided code)
2. **MessagingInterface** - DM system (you provided code)
3. **MyProfilePage** - User profile (you provided code)
4. **NotificationPanel** - Notifications (you provided code)
5. **ConfessionalCorner** - Anonymous posting
6. **SearchPage** - Search interface
7. **UserProfileDrawer** - Quick profile view
8. **PostDetailView** - Full post view
9. **SettingsPage** - App settings

### Integration:
- Import these components into your main App.tsx
- Set up routing/navigation between views
- Connect to your authentication system
- Add real data fetching (replace mock data)

## 💡 Tips

1. **Dark Mode**: All components use `useTheme()` hook
2. **Animations**: Motion/react for smooth transitions
3. **Toast Notifications**: Sonner library for feedback
4. **Forms**: Controlled components with validation
5. **Images**: Use `figma:asset/` scheme for Figma imports

## 📦 Dependencies

Make sure these are installed:
- motion (Framer Motion)
- sonner (toast notifications)
- lucide-react (icons)
- react-slick (carousels) - if using
- tailwindcss (styling)

## 🎯 Key Features

✅ Fully responsive (mobile + web)
✅ Dark/Light mode throughout
✅ Smooth animations with Motion
✅ Instagram Web-style UI
✅ Toast notifications for feedback
✅ Form validation
✅ Empty states for new users
✅ Professional HR-focused content
✅ Accessibility considerations

## 🐛 Known Issues / TODOs

- [ ] Add real image upload functionality
- [ ] Implement actual data persistence
- [ ] Add form error handling
- [ ] Implement search functionality
- [ ] Add pagination for feeds
- [ ] Connect authentication system
- [ ] Add analytics tracking

---

**Need Help?**
Check the individual component files for detailed prop interfaces and usage examples!
