# UI Project

## Set environment

```sh
NEXT_PUBLIC_API_URL=https://www.sipnscreen.com/gapi
NEXTAUTH_URL=https://www.sipnscreen.com
RAZORPAY_KEY=
```

## Steps to deploy

```sh
npm ci --only=production
npm run build
npm install --production
npm run start
```
