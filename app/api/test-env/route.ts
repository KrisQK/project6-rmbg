export async function GET() {
    return Response.json({
        blobTokenExists: !!process.env.BLOB_READ_WRITE_TOKEN,
        falKeyExists: !!process.env.FAL_KEY,
    });
}
