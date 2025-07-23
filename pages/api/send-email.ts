import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { fullName, email, message } = req.body

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: 'tchikayafamikenzofranck@gmail.com',
      subject: `Nouveau message de ${fullName}`,
      replyTo: email,
      text: `Nom: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><b>Nom:</b> ${fullName}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`
    })

    return res.status(200).json({ message: 'Message envoyé avec succès' })
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error: (error as Error).message })
  }
} 