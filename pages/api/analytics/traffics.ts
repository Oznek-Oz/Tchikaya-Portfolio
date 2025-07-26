// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { BetaAnalyticsDataClient } from "@google-analytics/data"

// 👇 Setting PropertyId
const propertyId = process.env.NEXT_PUBLIC_GA_PROPERTY_ID

// Vérifier si les credentials sont configurés
if (!process.env.NEXT_PUBLIC_GA_CLIENT_EMAIL || !process.env.NEXT_PUBLIC_GA_PRIVATE_KEY || !propertyId) {
  console.warn('Google Analytics credentials missing')
}

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GA_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GA_PRIVATE_KEY?.replace(/\n/gm, "\n"), // replacing is necessary
    // private_key: pk.replace(/\n/gm, "\n"), // replacing is necessary
  },
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Si les credentials ne sont pas configurés, retourner 0
    if (!process.env.NEXT_PUBLIC_GA_CLIENT_EMAIL || !process.env.NEXT_PUBLIC_GA_PRIVATE_KEY || !propertyId) {
      return res.status(200).json(0)
    }

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `30daysAgo`, //👈  e.g. "7daysAgo" or "30daysAgo"
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "year", // data will be year wise
        },
      ],
      metrics: [
        {
          name: "activeUsers", // it returs the active users
        },
      ],
    })

    let totalVisitors = 0
    response.rows?.forEach((row: any) => {
      totalVisitors += parseInt(row.metricValues[0].value)
    })

    res.status(200).json(totalVisitors)
  } catch (error) {
    console.error('Analytics error:', error)
    // En cas d'erreur, retourner 0 au lieu d'une erreur 500
    res.status(200).json(0)
  }
}
