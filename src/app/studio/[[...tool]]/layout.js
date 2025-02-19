// src/app/studio/[[...index]]/layout.js
// export const metadata = {
//   title: 'Studio',
//   description: 'Content Management',
// }

// export default function StudioLayout({ children }) {
//   return (
//     <html lang="en">
//       <body style={{ margin: 0, padding: 0 }}>{children}</body>
//     </html>
//   )
// }

// // Prevent studio from being wrapped in the default root layout
// export const useRootLayout = false

// src/app/studio/[[...index]]/layout.js
'use client'

export default function StudioLayout({ children }) {
  return children
}