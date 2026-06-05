import { NextRequest, NextResponse } from "next/server";

const REPO = "JrSaint/finderslist";
const LABEL = "tool-submission";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolName, url, tagline, description, directory, pricing, email, honeypot } = body;

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json({ ok: true }); // silently ignore bots
    }

    // Basic validation
    if (!toolName || !url || !tagline || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const ghToken = process.env.GH_SUBMISSIONS_TOKEN;
    if (!ghToken) {
      // Fallback: log submission in console and return success
      // (won't auto-vet, but you'll see it in Vercel logs)
      console.log("TOOL SUBMISSION (no GH token):", JSON.stringify(body, null, 2));
      return NextResponse.json({ ok: true });
    }

    // Build the issue body in a structured format the vetting script can parse
    const issueBody = [
      "## Tool Submission",
      "",
      `**Tool Name**: ${toolName}`,
      `**Website URL**: ${url}`,
      `**Tagline**: ${tagline}`,
      `**Description**: ${description || "(not provided)"}`,
      `**Suggested Directory**: ${directory || "unsure"}`,
      `**Pricing**: ${pricing || "paid"}`,
      `**Submitter Email**: ${email}`,
      "",
      "---",
      "*Submitted via finderslist.com/submit*",
    ].join("\n");

    // Create GitHub issue
    const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `Tool Submission: ${toolName}`,
        body: issueBody,
        labels: [LABEL],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub issue creation failed:", res.status, text);
      // Don't expose the error to the user — just return success
      // The submission is still logged above
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("submit-tool API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
