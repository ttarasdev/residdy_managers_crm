import { Languages } from '../types-enums/lans'

const wrap = (content: string) => `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:20px 12px;">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:640px;max-width:640px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:16px 20px;background:#0f172a;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle" style="padding:0;">
                      <img
                        src="cid:logo_cid"
                        width="335"
                        height="100"
                        alt="Logo"
                        style="display:block;border:0;outline:none;text-decoration:none;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 20px;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111827;">
                ${content}
              </td>
            </tr>

            <tr>
              <td style="padding:14px 20px;background:#f9fafb;border-top:1px solid #e5e7eb;font-family:Arial,sans-serif;font-size:12px;line-height:1.5;color:#6b7280;">
                <div>© {{company_name}} • {{year}}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

/* ------------------------------ PL ------------------------------ */

export const mailHtmlTemplatesPl = [
	{
		title: 'zgenerowany email',
		value: wrap(`
      <h2 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;">Wiadomość wygenerowana automatycznie</h2>
      <p style="margin:0 0 12px 0;">
        Ta wiadomość została wygenerowana automatycznie. Prosimy na nią nie odpowiadać.
      </p>

      <div style="margin:14px 0;padding:12px 14px;border:1px solid #e5e7eb;border-radius:10px;background:#ffffff;">
        <p style="margin:0 0 8px 0;"><b>Temat:</b> {{subject}}</p>
        <p style="margin:0 0 8px 0;"><b>Odbiorca:</b> {{recipient_email}}</p>
        <p style="margin:0;"><b>Treść:</b></p>
        <div style="margin-top:8px;">{{content_html}}</div>
      </div>

      <p style="margin:0;">
        Jeśli to wygląda podejrzanie, zignoruj. Jeśli to wygląda poprawnie, też zignoruj. Tak działa automatyzacja.
      </p>
    `),
	},
	{
		title: 'dane kontaktowe i firmy',
		value: wrap(`
      <h2 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;">Dane kontaktowe</h2>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 14px 0;">
        <tr>
          <td style="padding:0 0 6px 0;"><b>Telefon:</b> {{contact_phone}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>E-mail:</b> {{contact_email}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Strona:</b> <a href="{{company_website}}" style="color:#2563eb;">{{company_website}}</a></td>
        </tr>
      </table>

      <h3 style="margin:0 0 8px 0;font-size:14px;line-height:1.25;">Dane firmy</h3>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding:0 0 6px 0;"><b>Nazwa:</b> {{company_name}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Adres:</b> {{company_address}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>NIP/VAT:</b> {{company_vat}}</td>
        </tr>
        <tr>
          <td style="padding:0;"><b>KRS/REGON:</b> {{company_krs}}</td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

      <p style="margin:0;font-size:12px;color:#6b7280;">
        To jest stopka-szablon. Podmień {{...}} na prawdziwe dane i udawaj, że to zawsze tak działało.
      </p>
    `),
	},
]

/* ------------------------------ UA ------------------------------ */

export const mailHtmlTemplatesUa = [
	{
		title: 'zgenerowany email',
		value: wrap(`
      <h2 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;">Лист згенеровано автоматично</h2>
      <p style="margin:0 0 12px 0;">
        Це повідомлення сформовано автоматично. Будь ласка, не відповідайте на нього.
      </p>

      <div style="margin:14px 0;padding:12px 14px;border:1px solid #e5e7eb;border-radius:10px;background:#ffffff;">
        <p style="margin:0 0 8px 0;"><b>Тема:</b> {{subject}}</p>
        <p style="margin:0 0 8px 0;"><b>Одержувач:</b> {{recipient_email}}</p>
        <p style="margin:0;"><b>Вміст:</b></p>
        <div style="margin-top:8px;">{{content_html}}</div>
      </div>

      <p style="margin:0;">
        Якщо виглядає підозріло, ігноруй. Якщо виглядає нормально, теж ігноруй. Автоматизація, що поробиш.
      </p>
    `),
	},
	{
		title: 'dane kontaktowe i firmy',
		value: wrap(`
      <h2 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;">Контактні дані</h2>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 14px 0;">
        <tr>
          <td style="padding:0 0 6px 0;"><b>Телефон:</b> {{contact_phone}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>E-mail:</b> {{contact_email}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Сайт:</b> <a href="{{company_website}}" style="color:#2563eb;">{{company_website}}</a></td>
        </tr>
      </table>

      <h3 style="margin:0 0 8px 0;font-size:14px;line-height:1.25;">Дані компанії</h3>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding:0 0 6px 0;"><b>Назва:</b> {{company_name}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Адреса:</b> {{company_address}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>VAT/NIP:</b> {{company_vat}}</td>
        </tr>
        <tr>
          <td style="padding:0;"><b>Реєстр:</b> {{company_krs}}</td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

      <p style="margin:0;font-size:12px;color:#6b7280;">
        Це шаблонний футер. Підстав реальні дані замість {{...}}.
      </p>
    `),
	},
]

/* ------------------------------ EN ------------------------------ */

export const mailHtmlTemplatesEn = [
	{
		title: 'zgenerowany email',
		value: wrap(`
      <h2 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;">This email was generated automatically</h2>
      <p style="margin:0 0 12px 0;">
        This message was generated automatically. Please do not reply to it.
      </p>

      <div style="margin:14px 0;padding:12px 14px;border:1px solid #e5e7eb;border-radius:10px;background:#ffffff;">
        <p style="margin:0 0 8px 0;"><b>Subject:</b> {{subject}}</p>
        <p style="margin:0 0 8px 0;"><b>Recipient:</b> {{recipient_email}}</p>
        <p style="margin:0;"><b>Content:</b></p>
        <div style="margin-top:8px;">{{content_html}}</div>
      </div>

      <p style="margin:0;">
        If it looks suspicious, ignore it. If it looks fine, also ignore it. Automation is like that.
      </p>
    `),
	},
	{
		title: 'dane kontaktowe i firmy',
		value: wrap(`
      <h2 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;">Contact details</h2>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 14px 0;">
        <tr>
          <td style="padding:0 0 6px 0;"><b>Phone:</b> {{contact_phone}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Email:</b> {{contact_email}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Website:</b> <a href="{{company_website}}" style="color:#2563eb;">{{company_website}}</a></td>
        </tr>
      </table>

      <h3 style="margin:0 0 8px 0;font-size:14px;line-height:1.25;">Company details</h3>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding:0 0 6px 0;"><b>Name:</b> {{company_name}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Address:</b> {{company_address}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>VAT:</b> {{company_vat}}</td>
        </tr>
        <tr>
          <td style="padding:0;"><b>Registry:</b> {{company_krs}}</td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

      <p style="margin:0;font-size:12px;color:#6b7280;">
        This is a footer template. Replace {{...}} placeholders with real data.
      </p>
    `),
	},
]

/* ------------------------------ RU ------------------------------ */

export const mailHtmlTemplatesRu = [
	{
		title: 'zgenerowany email',
		value: wrap(`
      <h2 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;">Письмо сгенерировано автоматически</h2>
      <p style="margin:0 0 12px 0;">
        Это сообщение сформировано автоматически. Пожалуйста, не отвечайте на него.
      </p>

      <div style="margin:14px 0;padding:12px 14px;border:1px solid #e5e7eb;border-radius:10px;background:#ffffff;">
        <p style="margin:0 0 8px 0;"><b>Тема:</b> {{subject}}</p>
        <p style="margin:0 0 8px 0;"><b>Получатель:</b> {{recipient_email}}</p>
        <p style="margin:0;"><b>Содержимое:</b></p>
        <div style="margin-top:8px;">{{content_html}}</div>
      </div>

      <p style="margin:0;">
        Если выглядит подозрительно, игнорируй. Если выглядит нормально, тоже игнорируй. Такова автоматизация.
      </p>
    `),
	},
	{
		title: 'dane kontaktowe i firmy',
		value: wrap(`
      <h2 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;">Контактные данные</h2>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 14px 0;">
        <tr>
          <td style="padding:0 0 6px 0;"><b>Телефон:</b> {{contact_phone}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>E-mail:</b> {{contact_email}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Сайт:</b> <a href="{{company_website}}" style="color:#2563eb;">{{company_website}}</a></td>
        </tr>
      </table>

      <h3 style="margin:0 0 8px 0;font-size:14px;line-height:1.25;">Данные компании</h3>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding:0 0 6px 0;"><b>Название:</b> {{company_name}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>Адрес:</b> {{company_address}}</td>
        </tr>
        <tr>
          <td style="padding:0 0 6px 0;"><b>VAT/NIP:</b> {{company_vat}}</td>
        </tr>
        <tr>
          <td style="padding:0;"><b>Реестр:</b> {{company_krs}}</td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

      <p style="margin:0;font-size:12px;color:#6b7280;">
        Это шаблонный футер. Замените {{...}} на реальные данные.
      </p>
    `),
	},
]

export const getMailHtmlTemplatesByLan = (lan: Languages) => {
	switch (lan) {
		case Languages.PL:
			return mailHtmlTemplatesPl
		case Languages.UA:
			return mailHtmlTemplatesUa
		case Languages.EN:
			return mailHtmlTemplatesEn
		case Languages.RU:
			return mailHtmlTemplatesRu
		default:
			return mailHtmlTemplatesPl
	}
}
