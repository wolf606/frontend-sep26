import { Resend } from 'resend'
import { EmailTemplate } from '@components/EmailTemplate'

const resend = new Resend('re_7M7XnoN8_EJqAZXfz2hxdP6zed91ZSptc')

export async function POST (req, res) {
  
    try{
        const data = await resend.emails.send({
            from: 'admin@dev.com',
            to: ['richy.2603@gmail.com'], // array of emails
            subject: 'Welcome to our newsletter',
            react: EmailTemplate({ // Call react cause its a react component
                user: {
                    name: 'John Doe'
                }
            })
        })
        console.log(data);
    
        return res.status(200).json({message: "Email Send "}, data)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}