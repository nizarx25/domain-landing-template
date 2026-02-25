import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { OwnerNotificationEmail, SubmitterConfirmationEmail } from '@/components/email-templates'
import data from '../../../data/domain.json' // ✅ الاستدعاء الصحيح للملف الجديد

// ✅ حماية المتغيرات من إيقاف عملية البناء
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_to_pass_build");
const resendDomain = process.env.RESEND_DOMAIN || "example.com";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, offerAmount, message } = await request.json()

    // إرسال الإيميل لمالك الموقع
    const ownerEmailResult = await resend.emails.send({
      from: `Offer Notification <offers@${resendDomain}>`,
      to: data.siteConfig.contactEmail || "admin@example.com", // قراءة الإيميل من JSON
      subject: `New Offer for ${data.domainName}`,
      react: OwnerNotificationEmail({ 
        firstName, 
        lastName, 
        email, 
        offerAmount, 
        message, 
        domain: data.domainName,
        currencySymbol: "$" // ✅ تثبيت رمز العملة لمنع خطأ الـ Typescript
      }),
    })

    // إرسال رسالة تأكيد للمشتري
    const submitterEmailResult = await resend.emails.send({
      from: `${data.domainName} <noreply@${resendDomain}>`,
      to: email,
      subject: `Your offer for ${data.domainName} has been received`,
      react: SubmitterConfirmationEmail({ 
        firstName, 
        lastName, 
        email, 
        offerAmount, 
        message, 
        domain: data.domainName,
        currencySymbol: "$" // ✅ تثبيت رمز العملة هنا أيضاً
      }),
    })

    return NextResponse.json({ success: true, ownerEmailResult, submitterEmailResult })
  } catch (error) {
    console.error('Error in submit-offer route:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 })
  }
}
