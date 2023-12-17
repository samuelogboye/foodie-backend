"""Emails module"""

from flask import url_for, render_template
from flask_mail import Message
from foodie import mail

def send_password_reset_email(name, email, token):
    # Send a password reset email with the tokenized link
    reset_url = url_for('auth.reset_password', token=token, _external=True)
    msg = Message('Password Reset Request', recipients=[email])
    msg.body = f"Hi {name}, \n\nYou have requested to reset your password, click the following link: {reset_url} to reset your password. \n\nIf you did not request a password reset, please ignore this email. \n\n MedApp Team"
    mail.send(msg)


# def send_register_email(name, email, token):
#     # Send an email with the tokenized link
#     confirm_url = url_for('auth.confirm_email', token=token, _external=True)
#     msg = Message('Registration Confirmation', recipients=[email])
#     msg.body = f"Hi {name}, \n\nPlease confirm your email by clicking the following link: {confirm_url} \n\n\n MedApp Team"
#     mail.send(msg)


def send_otp_email(name, email, otp):
    # Send an email with the OTP
#     msg = Message('Registration Confirmation', recipients=[email])
#     msg.body = f"Hi {name}, \n\nPlease use this verification code to confirm your email: {otp} \n\n The verification code expires in 10 minutes. \n\n Please do not disclose it to anyone else \n\n\n MediTrace Team"
#     mail.send(msg)
    try:
        # Create the message for the user
        msg_title = "Registration Confirmation - Foodie"
        sender = "noreply@app.com"
        msg = Message(msg_title, sender=sender, recipients=[email])
        msg_body = "Please use this verification code to confirm your registration"
        msg.body = ""
        msg.reply_to = "foodie@gmail.com"
        data = {
            'app_name': "Foodie",
            'title': msg_title,
            'body': msg_body,
            'name': name,
            'otp': otp
        }
        msg.html = render_template("email_otp.html", data=data)

        # Send the message
        mail.send(msg)

    except Exception as e:
        return {'msg': 'Email not sent', 'error': str(e)}


def reset_password_otp(name, email, otp):
    try:
        # Create the message for the user
        msg_title = "Password Reset OTP - Foodie"
        sender = "noreply@app.com"
        msg = Message(msg_title, sender=sender, recipients=[email])
        msg_body = "Please use this verification code to reset your password"
        msg.body = ""
        msg.reply_to = "foodie@gmail.com"
        data = {
            'app_name': "Foodie",
            'title': msg_title,
            'body': msg_body,
            'name': name,
            'otp': otp
        }
        msg.html = render_template("email_otp.html", data=data)

        # Send the message
        mail.send(msg)

    except Exception as e:
        return {'msg': 'Email not sent', 'error': str(e)}