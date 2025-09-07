# Coffee Shop Website

## Overview

This is a modern, full-stack coffee shop website built with React, TypeScript, Express, and Drizzle ORM. The application features a beautiful single-page design showcasing coffee offerings, customer testimonials, and contact functionality. It includes interactive 3D elements, animated components, and a responsive design optimized for both desktop and mobile experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful endpoints for contact forms, menu items, and newsletter subscriptions
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Database Schema
- **Users**: Basic user management with username/password authentication
- **Contact Submissions**: Stores customer contact form submissions with timestamps
- **Menu Items**: Coffee menu with names, descriptions, prices, categories, and availability

### Development Architecture
- **Monorepo Structure**: Organized into `client/`, `server/`, and `shared/` directories
- **Code Sharing**: Shared TypeScript types and Zod schemas between frontend and backend
- **Hot Reload**: Vite middleware integration for seamless development experience
- **Build Process**: Separate client and server builds with proper asset handling

### UI/UX Features
- **Interactive Elements**: 3D coffee animations, floating coffee beans, animated counters
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Form Handling**: React Hook Form with Zod validation for contact forms
- **Toast Notifications**: User feedback system for form submissions and errors
- **Carousel Components**: Testimonial sliders and image galleries
- **Accessibility**: ARIA labels and semantic HTML structure

## External Dependencies

### Database
- **Neon Database**: PostgreSQL hosting service via `@neondatabase/serverless`
- **Drizzle Kit**: Database migrations and schema management

### UI Framework
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating component variants
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing

### Development Tools
- **Replit Integration**: Development environment plugins and error overlays
- **TypeScript**: Static type checking across the entire stack
- **ESBuild**: Fast bundling for server-side code in production
- **Date-fns**: Date manipulation and formatting utilities

### Authentication & Session Management
- **Connect PG Simple**: PostgreSQL session store for Express sessions
- **Crypto**: Node.js built-in module for UUID generation and security

### Form & Data Handling
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for both client and server-side data
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation