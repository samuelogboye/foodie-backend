from foodie import sms
import threading

def send_sms(otp, name='', phonenumber=''):
        response_data = sms.send_message(
             {
             "from": "Vonage APIs",
             "to": "2348168408098",
             "text": "Verification code: " + otp + ". This code will expire in 5 minutes.",
             }
             )

        if response_data["messages"][0]["status"] == "0":
            print("Message sent successfully.")
        else:
            print(f"Message failed with error: {response_data['messages'][0]['error-text']}")


def send_otp_sms(otp, name='', phonenumber=''):
    try:
         thr = threading.Thread(target=send_sms, args=(otp, name, phonenumber))
         thr.start()
    except Exception as e:
         return {'msg': 'SMS not sent', 'error': str(e)}