const nodemailer = require("nodemailer");

export function AgentMail(Email:string){
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Replace with your email service provider
        auth: {
            user: 'jugalkishor556455@gmail.com', // Email address from environment variable
            pass: 'vhar uhhv gjfy dpes', // Email password from environment variable
        },
    });
  
    // Send an email with the retrieved data (decrypted password)
    const info = transporter.sendMail({
        from: '"Sanzadinternational" <jugalkishor556455@gmail.com>', // Sender address
        to: `${Email}`,
        subject: "Query from Sanzadinternational", // Subject line
        text: `Details of New Agent Access:\nEmail: ${Email}`, // Plain text body
        html: `<p>Details of New Agent Access:</p><ul><li>Email: ${Email}</li></ul>`, // HTML body
    });
        
    console.log("Message sent: %s", info.messageId);
  
}