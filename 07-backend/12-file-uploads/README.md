# File Uploads

**Module:** Backend Development
**Prerequisites:** [`11-password-hashing`](../11-password-hashing)

## What is it?

File uploads let a client send binary data (images, documents) to a server — handled differently
from ordinary JSON request bodies, since `express.json()` only understands JSON text, not raw
binary file data.

## Why does it matter?

Many real applications need this — profile pictures, document attachments, media uploads. It
requires different middleware and introduces its own specific validation and security
considerations beyond ordinary JSON input.

## How does it work?

### `multer` — the standard Express file-upload middleware

```bash
npm install multer
```

```javascript
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.file); // details about the uploaded file
  res.json({ filename: req.file.filename });
});
```

`upload.single("avatar")` is middleware expecting a single file, sent under the field name
`"avatar"` in a `multipart/form-data` request (the standard format browsers use for file uploads,
different from JSON). `req.file` then contains details: original filename, saved path, size, MIME
type.

### Validating uploaded files

```javascript
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG and PNG images are allowed"));
    }
    cb(null, true);
  }
});
```

Just like any other input, uploaded files need validation — size limits (preventing someone from
uploading an enormous file that exhausts server storage/bandwidth) and type restrictions
(preventing unexpected or potentially dangerous file types from being accepted).

### Where uploaded files actually get stored

Storing files directly on your own server's disk (as shown above) works for small projects, but
has real limitations for production: it doesn't scale well across multiple server instances, and
it ties file storage to your application server's own disk space. Real production applications
commonly use a dedicated file storage service (like AWS S3 or Cloudinary) instead — your backend
receives the file, then uploads it to that service, storing just a reference URL in your own
database.

### A critical security consideration: never trust the client-reported file type

A file's claimed MIME type (`file.mimetype`) is reported by the *client*, and can be spoofed —
someone could rename a malicious file to end in `.jpg` and claim it's an image. For genuinely
security-sensitive applications, additional server-side verification of the actual file content
(not just the claimed type/extension) is a real, necessary consideration, beyond this
introductory topic's scope.

## Simple Example

```javascript
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  }
});

app.post("/profile-picture", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "Uploaded", filename: req.file.filename });
});
```

## Let's Break It Down

- `fileFilter` rejects non-image files before they're even fully processed, and `limits` rejects
  files over 2MB — both are validation steps specific to file uploads, following the same "never
  trust client input" principle from the Validation topic.
- `req.file` being checked for existence handles the case where the request didn't actually include
  a file at all (perhaps the field name didn't match, or nothing was selected).

## Common Mistakes

- **Not setting size limits**, allowing a client to upload arbitrarily large files that could
  exhaust server storage or bandwidth.
- **Trusting the client-reported file type without further verification** for security-sensitive
  use cases.
- **Storing uploaded files directly on the application server's disk for a production application**
  that needs to scale, instead of using a dedicated storage service.

## When Should I Use It?

Use `multer` (or a similar library) for any Express route accepting file uploads. Always set
reasonable size limits and type restrictions, and consider a dedicated storage service once beyond
a small personal project.

## Exercises

1. **(Recall)** Why can't `express.json()` handle file uploads on its own?
2. **(Application)** Write an upload route that only accepts PDF files under 10MB, rejecting
   anything else with a clear error.
3. **(Problem Solving)** A client claims an uploaded file is a `.png`, but it's actually a
   disguised executable. Explain why relying solely on `file.mimetype` doesn't fully protect
   against this.

## What Should I Learn Next?

Continue to [`13-logging`](../13-logging) — recording what happens in your application for
debugging and monitoring.
