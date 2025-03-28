# Sanity Webhook & Revalidation Setup

This document explains the changes made to improve the website's handling of Sanity content updates.

## Problem Solved

Previously, the website required 3-4 refreshes for Sanity styling to appear after content was published from Sanity. The changes implemented provide immediate revalidation of content when changes are published in Sanity Studio.

## Technical Implementation

1. **Added Webhook Revalidation with Real-time Client Refresh**:
   - Created an API route at `/api/revalidate` that handles both tag-based and path-based revalidation
   - Implemented a Sanity Studio plugin that triggers revalidation when content is published
   - Uses the `published` event hook to trigger revalidation automatically
   - Added Server-Sent Events endpoint to notify clients of updates in real-time
   - Implemented a ClientWrapper to handle automatic page refresh when content changes

2. **Improved Caching Strategy**:
   - Changed from aggressive no-caching (`revalidate: 0`, `dynamic: 'force-dynamic'`) to ISR with webhooks
   - Now using a more balanced approach: static generation with revalidation via webhooks
   - Set `revalidate: 60` as a fallback in case webhooks fail

3. **Enhanced Client Components and Styling**:
   - Created a consistent client mounting pattern with the `useClientMounted` hook
   - Improved loading states with animation to reduce perceived delay
   - Removed redundant code and optimized client/server component separation
   - Fixed styling issues with banner and buttons
   - Added centralized theme management with a ThemeContext
   - Eliminated duplicate data fetching that caused styling inconsistencies

## How to Test

1. Make a change in Sanity Studio and publish it
2. Check the website - content should update immediately without multiple refreshes
3. You can manually test the revalidation by running the included test script:
   ```
   node test-revalidation.js
   ```
4. You can also manually trigger revalidation by visiting:
   `https://your-site.com/api/revalidate?secret=anne-heimann-revalidate-2024`

## Environment Variables

The following environment variables have been added and must be set correctly:

In `.env.local` (for Next.js):
```
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_REVALIDATE_SECRET="anne-heimann-revalidate-2024"
```

In `.env.development` (for Sanity Studio):
```
SANITY_STUDIO_PROJECT_ID="your-project-id"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_REVALIDATE_SECRET="anne-heimann-revalidate-2024"
```

Make sure these are properly set in your development and production environments.

## Troubleshooting

If updates still don't appear immediately:

1. **Check Console Logs**:
   - Look for revalidation logs in both Sanity Studio console and Next.js server logs
   - Verify webhook calls are being made and are succeeding

2. **Browser Caching**:
   - Try hard refreshing (Ctrl+F5 or Cmd+Shift+R)
   - Check browser network tab to see if resources are being re-fetched

3. **Verify Setup**:
   - Ensure all environment variables are correctly set
   - Check that the revalidation endpoint is accessible and not blocked by CORS or security settings

4. **Testing the Endpoint**:
   - Use the included `test-revalidation.js` script to verify the endpoint is working

## Files Modified

The following files were added or modified:

1. `/src/app/api/revalidate/route.js` - The revalidation API endpoint
2. `/src/app/api/revalidate/listen/route.js` - Server-sent events endpoint for real-time updates
3. `/src/sanity/plugins/sanityRevalidate.js` - Sanity plugin for triggering revalidation
4. `/src/lib/hooks/useClientMounted.js` - Client mounting hook
5. `/src/lib/sanity.js` - Updated client configuration
6. `/src/app/page.js` - Updated page options
7. `/src/app/layout.js` - Added ThemeProvider and ClientWrapper
8. `/src/context/ThemeContext.js` - New centralized theme context
9. `/src/components/ui/ClientWrapper.js` - New client wrapper for real-time updates
10. `/src/components/ui/ClientHeroSection.js` - Updated client component pattern
11. `/src/components/ui/ClientTransformBanner.js` - Fixed component styling
12. `/src/components/sections/DirectTransformBanner.js` - Updated to use ThemeContext
13. `/src/components/ui/Typography.js` - Fixed font sizing
14. `/src/components/ui/Buttons.js` - Fixed button styling

## Additional Resources

- [Next.js On-Demand Revalidation](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Next.js App Router Cache](https://nextjs.org/docs/app/building-your-application/caching)
- [Sanity & Next.js Integration](https://www.sanity.io/guides/nextjs-app-router-live-preview)