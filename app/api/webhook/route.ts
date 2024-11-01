import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as String
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }
  const session = event.data.object as Stripe.Checkout.Session
  const userId = session?.metadata?.userId
  const courseId = session?.metadata?.courseId
  if (event.type === 'checkout.session.completed') {
    if (!userId || !courseId) {
      return new NextResponse('Invalid metadata', { status: 400 })
    }
    await prisma.purchase.create({
      data: {
        courseId,
        userId,
      },
    })
  } else {
    return new NextResponse('Webhook Error: Invalid event type', {
      status: 200,
    })
  }

  return new NextResponse('Webhook received', { status: 200 })
}
