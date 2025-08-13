# Deployment Guide for Vercel

## Project Setup Complete ✅

Your Angular project is now ready for Vercel deployment with the following configurations:

### Files Created/Modified:
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.nvmrc` - Node.js version specification (v18)
- ✅ `package.json` - Updated build scripts for production

## Deployment Options

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your project directory:
   ```bash
   cd "c:\Users\micha\Desktop\mad\mad"
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy your project:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository or upload your project folder
4. Vercel will automatically detect it's an Angular project
5. Click "Deploy"

## Testing Build Locally (PowerShell Alternative)

If you encounter PowerShell execution policy issues, use Command Prompt instead:

1. Open Command Prompt (cmd)
2. Navigate to project directory:
   ```cmd
   cd "c:\Users\micha\Desktop\mad\mad"
   ```
3. Run the build:
   ```cmd
   node_modules\.bin\ng build --configuration production
   ```

## Project Configuration Details

### Vercel Configuration (`vercel.json`):
- Uses `@vercel/static-build` for Angular applications
- Output directory set to `dist/mad`
- Configured for SPA routing (all routes redirect to index.html)

### Build Configuration:
- Production build optimized for deployment
- Output hashing enabled for cache busting
- Bundle size limits configured in `angular.json`

## Environment Variables (if needed)

If your app uses environment variables, add them in:
- Vercel Dashboard: Project Settings → Environment Variables
- Or via CLI: `vercel env add`

## Custom Domain (Optional)

After deployment, you can add a custom domain in the Vercel dashboard under:
Project → Settings → Domains

## Troubleshooting

### Common Issues:
1. **Build fails**: Check that all dependencies are in `package.json`
2. **Routing issues**: Ensure `vercel.json` has the correct SPA routing configuration
3. **Large bundle**: Review bundle analyzer and optimize imports

### Support:
- Vercel Documentation: https://vercel.com/docs
- Angular Deployment Guide: https://angular.io/guide/deployment
