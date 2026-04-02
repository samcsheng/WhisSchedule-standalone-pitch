# WhisSchedule Manager Pitch

This folder is a standalone static site for Vercel.

## Files

- `public/index.html`
- `public/data/manager-pitch.json`
- `vercel.json`

## Deploy

1. Create a new GitHub repo.
2. Copy the contents of this folder into that repo.
3. Push to GitHub.
4. Import the repo into Vercel.
5. Use the `Other` framework preset.
6. No build command is required.

## Notes

- The page is fully static.
- The data comes from a saved scrape snapshot, not live API calls.
- To refresh the data, regenerate `public/data/manager-pitch.json` from the source project before copying again.
