import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { OwnerNotificationEmail } from '@/components/email-templates'
import data from '../../../data/domain.json'

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_to_pass_build");

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, offerAmount, message } = await request.json()

    // الحساب المجاني في Resend يتطلب الإرسال من هذا الإيميل المعتمد حصراً
    const ownerEmailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: data.siteConfig.contactEmail,
      subject: `🔥 New Offer: $${offerAmount} for ${data.domainName}`,
      react: OwnerNotificationEmail({ 
        firstName, 
        lastName, 
        email, 
        offerAmount, 
        message, 
        domain: data.domainName,
        currencySymbol: "$" 
      }),
    })

    return NextResponse.json({ success: true, ownerEmailResult })
  } catch (error) {
    console.error('Error in submit-offer route:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 })
  }
}
