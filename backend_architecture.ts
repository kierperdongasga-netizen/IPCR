/**
 * BACKEND ARCHITECTURE & SCHEMA DESIGN
 * 
 * Tech Stack: Next.js (App Router), PostgreSQL, Prisma, AWS S3
 * 
 * S3 BUCKET STRUCTURE:
 * Files are stored using the following key pattern:
 * /{year}/{office_code}/{employee_id}/{ipcr_id}/{indicator_code}/{filename}
 * 
 * Example:
 * /2026/CIT/user_123/ipcr_abc/MFO1-01/class_record.pdf
 * 
 * This ensures:
 * 1. Time-based organization (Year)
 * 2. Organizational Hierarchy (Office)
 * 3. Employee Isolation (User ID)
 * 4. Contextual Grouping (IPCR ID -> Indicator Code)
 * 
 * 
 * DATABASE SCHEMA:
 * (See prisma/schema.prisma for full definition)
 * 
 * Key Relationships:
 * User -> IPCRs (1:N)
 * IPCR -> Sections (1:N) -> Rows (1:N) -> MOV Files (1:N)
 * 
 * 
 * API ROUTES (Next.js App Router):
 * 
 * GET  /api/ipcr                  -> List user's IPCRs
 * POST /api/ipcr                  -> Create new Draft
 * GET  /api/ipcr/[id]             -> Get full form details with nested sections/rows
 * PUT  /api/ipcr/[id]             -> Update form data
 * POST /api/ipcr/[id]/submit      -> Change status to Submitted
 * 
 * POST /api/mov/presigned-url     -> Generate S3 Presigned URL for direct upload
 *      Body: { filename, filetype, ipcrId, indicatorCode, ... }
 *      Returns: { uploadUrl, key, s3Path }
 * 
 * POST /api/mov/confirm           -> Confirm upload and create DB record
 *      Body: { key, size, mimeType, rowId, ... }
 * 
 * DELETE /api/mov/[id]            -> Delete file record and S3 object
 * 
 * SECURITY:
 * - Row Level Security (RLS) via Middleware checking User Role + Owner ID.
 * - S3 Bucket Policies restricting access to authorized keys.
 * - Audit Log recorded for every write operation.
 */

export const BACKEND_CONFIG = {
  db: 'PostgreSQL',
  orm: 'Prisma',
  storage: 'S3 Compatible (MinIO/AWS S3)'
};
