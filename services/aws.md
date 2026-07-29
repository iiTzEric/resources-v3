# AWS

## A note before diving in

AWS has 200+ services. Don't try to learn all of it — this doc covers only the handful you actually need to deploy a typical full-stack app (a containerized frontend/backend + a database).

---

## IAM (Identity and Access Management)

**What:** Controls *who* (users, services) can do *what* (permissions) on *which* AWS resources.

**Why:** This is the thing every beginner underestimates and then gets stuck on. Nearly every "access denied" error you'll hit is an IAM permissions issue, not a bug in your code.

**When:** Before doing almost anything else in AWS — you need an IAM user (not your root account) with the right permissions.

**How (conceptually):**
- **Root account** — created when you sign up, has unlimited power. Don't use it day-to-day; it's a security risk.
- **IAM user** — create one for yourself with only the permissions you need (e.g., S3 + ECR + App Runner access for a given project).
- **IAM role** — like a user, but assumed *by a service* rather than a person (e.g., letting App Runner access S3 on your behalf).
- **Policy** — a JSON document defining exactly what's allowed (e.g., "can read/write to this specific S3 bucket").

**Common mistake:** Giving a user/role full `AdministratorAccess` "just to make it work." Fine for personal learning projects, but build the habit of granting only what's needed — this is called the principle of least privilege, and it's a real expectation in professional environments.

---

## S3 (Simple Storage Service)

**What:** Object storage — think "a place to store files" (images, uploads, static assets, backups), not a database.

**Why:** Cheap, durable, and the standard place to store user-uploaded files (like task attachments) that shouldn't live in MongoDB.

**When:** File uploads, storing your built React app as static files, backups.

**How (uploading from Node, using the AWS SDK):**
```js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

await s3.send(new PutObjectCommand({
  Bucket: 'taskflow-uploads',
  Key: `tasks/${taskId}/attachment.png`,
  Body: fileBuffer,
  ContentType: 'image/png',
}));
```

**Key concepts:**
- **Bucket** — a top-level container for objects (files), globally unique name
- **Key** — the "path" of a file within a bucket (`tasks/123/attachment.png`)
- **Presigned URL** — a temporary, secure URL that lets a client upload/download directly to/from S3 without exposing your AWS credentials — the standard pattern for letting a React frontend upload files directly

---

## EC2 (Elastic Compute Cloud)

**What:** Rentable virtual servers — you get a Linux (or Windows) machine you fully control.

**Why:** The most flexible, "closest to the metal" way to run your app — but also the most manual (you manage the OS, security patches, Docker installation, etc. yourself).

**When:** Good for learning how servers actually work. Running `docker-compose up` on an EC2 instance is a reasonable, understandable first deployment path for any small app — though services like App Runner or ECS remove most of this manual work later.

**How (high level):**
1. Launch an instance (pick an image like Amazon Linux or Ubuntu, a size like `t2.micro` for free-tier)
2. Configure a **security group** — essentially a firewall; you must explicitly open ports (e.g., 80 for HTTP, 22 for SSH) or nothing can reach your server
3. SSH in, install Docker, pull your images or clone your repo, run `docker-compose up -d`

**Common mistake:** Forgetting to open the right port in the security group, then wondering why the app "isn't working" when it's actually running fine — just unreachable from outside.

---

## ECR (Elastic Container Registry) + App Runner

**What:** ECR is AWS's Docker image registry (like a private Docker Hub). App Runner is a managed service that runs a container for you — you give it an image, it handles scaling, load balancing, and HTTPS automatically.

**Why:** Much less manual than EC2 — no server to patch or manage. Good middle ground for a beginner who wants "real" cloud deployment without full infrastructure management.

**How (high level):**
```bash
# authenticate Docker to your ECR registry (AWS CLI required)
aws ecr get-login-password | docker login --username AWS --password-stdin <your-ecr-url>

# tag and push your image
docker tag taskflow-backend:latest <your-ecr-url>/taskflow-backend:latest
docker push <your-ecr-url>/taskflow-backend:latest
```
Then, in the AWS Console, create an App Runner service pointing at that ECR image — it deploys and gives you a public URL.

---

## MongoDB Atlas (not AWS, but part of this deployment path)

**What:** MongoDB's own managed cloud database service.

**Why:** For deployment, avoid running your own MongoDB container in production — use Atlas's free tier instead. One less thing to manage, secure, and back up yourself.

**How:** Sign up at Atlas, create a free cluster, get a connection string, and use it as your `MONGO_URI` environment variable — same code, different (production) database.

---

## Recommended path for a first deployment

1. MongoDB Atlas for the database (managed, free tier)
2. Push your Docker images to ECR
3. Deploy via App Runner (simplest) or a single EC2 instance running docker-compose (more hands-on, more educational)
4. Set environment variables (Mongo URI, JWT secret) through the service's configuration — never hardcode them into the image