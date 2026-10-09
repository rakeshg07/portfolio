import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      time: new Date().toISOString(),
      emailConfigured: !!process.env.EMAIL_PASS,
      emailUser: process.env.EMAIL_USER || "rakeshg0125@gmail.com"
    });
  });

  app.post("/api/contact", async (req, res) => {
    console.log(`[API] POST /api/contact hit at ${new Date().toISOString()}`);
    try {
      const parsed = insertMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid input data" });
      }

      const message = await storage.createMessage(parsed.data);

      // Attempt to send email
      const emailUser = process.env.EMAIL_USER || "rakeshg0125@gmail.com";
      const emailPass = process.env.EMAIL_PASS;

      if (!emailPass) {
        console.warn("EMAIL_PASS not set. Skipping real email delivery. Message saved to database.");
        return res.status(201).json({
          ...message,
          emailStatus: "skipped",
          warning: "Real email delivery skipped because EMAIL_PASS is not set in environment variables."
        });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: `"${parsed.data.name}" <${emailUser}>`,
        to: "rakeshg0125@gmail.com",
        replyTo: parsed.data.email,
        subject: `Portfolio Contact: ${parsed.data.name}`,
        text: `You have a new message from your portfolio!\n\nName: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\nMessage:\n${parsed.data.message}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to rakeshg0125@gmail.com`);
        res.status(201).json({ ...message, emailStatus: "sent" });
      } catch (emailError: any) {
        console.error("SMTP Error:", emailError);
        res.status(201).json({
          ...message,
          emailStatus: "failed",
          error: "Message saved to database, but email delivery failed. Error: " + (emailError.message || String(emailError))
        });
      }
    } catch (error: any) {
      console.error("Contact Form Error:", error);
      res.status(500).json({
        message: "Failed to process message",
        error: error.message || String(error)
      });
    }
  });

  return httpServer;
}
