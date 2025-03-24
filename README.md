# **Skapi**  
### **Serverless Backend API for HTML Frontend**  

Skapi is a **fully serverless backend API** that works seamlessly with **pure HTML and JavaScript**—no complex installations, no backend configurations, and no database management required.  

## **Get Started in Seconds**  

Simply add Skapi to your project:  

```html
<script src="https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"></script>
```

Or install via NPM:  

```bash
npm i skapi-js@latest
```

---

## **Everything You Need in One API**  

Skapi simplifies backend development by bundling essential services into a single JavaScript library, dramatically reducing development time and costs.  

✅ **Authentication** – Secure, AWS Cognito-based user management  
✅ **Database** – Scalable, auto-indexing DynamoDB  
✅ **File Storage** – Reliable, S3-based storage  
✅ **CDN** – Deliver content globally with ease  
✅ **Realtime Data** – Instant WebRTC and WebSocket implementation  
✅ **API Bridge** – Connect external APIs effortlessly  
✅ **Email Solution** – Built-in email automation & bulk sending  
✅ **Instant Hosting** – Easy hosting of static files  

All fully **serverless**, requiring **zero backend setup or deployment**.  

---

## **Works Seamlessly with Pure HTML**  

Skapi eliminates the need for frameworks or installations—you can add backend features directly to your static HTML pages.  

**Example Setup:**  

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"></script>
</head>
<body>
    <script>
        const skapi = new Skapi('your_service_id', 'your_owner_id');
    </script>
</body>
</html>
```

---

## **Effortless Backend Integration with HTML Forms**  

No need for complex JavaScript just to handle user input—Skapi fully embraces HTML forms, making backend interaction as simple as submitting a form.  

### **User Login**  

```html
<form action="welcome.html" onsubmit="skapi.login(event)">
    <label>Email<br><input type="email" name="email" required></label><br><br>
    <label>Password<br><input type="password" name="password" required></label><br><br>
    <input type="submit" value="Login">
</form>
```

### **Uploading Data & Files**  

```html
<form action="uploaded.html" onsubmit="skapi.postRecord(event, { table: 'my_photos' })">
    <input name="picture" type="file" multiple><br><br>
    <label>Description<br><input name="description" placeholder="Enter description"></label><br><br>
    <input type="submit" value="Upload">
</form>
```

---

## **Maximum Compatibility**  

Skapi is written in **TypeScript** and works with any JavaScript framework.  

- ✅ **Compatible with Vue.js, React, Angular, and more**  
- ✅ **Pre-built templates available for various frameworks**  
- ✅ **Works with plain HTML—no dependencies needed**  

---

## **Pricing Plans**  

### **Standard Plan** – $19 Monthly / $300 (One-time Purchase)  
✔ **10K User Accounts**  
✔ **User Invitation System**  
✔ **Website hosting**  
✔ **8GB Database Storage**  
✔ **100GB File Storage & Subdomain Hosting**  
✔ **Automated Emails & Bulk Email Sending**  
✔ **1GB Email Storage**  

#### **🚀 Limited-Time Offer: One-Time Purchase for Lifetime Access!**  
Get **lifetime access** to the Standard plan for just **$300**—upgrade anytime as your needs grow.

### **Premium Plan** - $89 Monthly  
✔ **Includes all Standard Plan features**  
✔ **100K User Accounts**  
✔ **100GB Database Storage**  
✔ **1TB File Storage & Subdomain Hosting**  
✔ **10GB Email Storage**  

---

## **Try Skapi for Free!**  

We offer a **free trial** so you can start building today:  

✔ **10K User Accounts**  
✔ **4GB Database Storage**  
✔ **50GB File Storage**  
⚠ **Bulk Email Sending not included**  
⚠ **All user data is deleted every 30 days**  

---

## **Start Building Today!**  
🚀 Experience the serverless backend development—**No servers. No deployment. Just pure HTML & JavaScript.**  

👉 **Get Started Now at [skapi.com](https://skapi.com)**  

## **Explore More**

**📖 Read the Docs: [docs.skapi.com](https://docs.skapi.com)**