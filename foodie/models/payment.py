#!/usr/bin/env python3
"""Template for the Payment Class"""
from foodie import db
from foodie.models.base import BaseModel
from sqlalchemy import Enum
from foodie.models.user import User
from foodie.models.order import Order


class Payment(BaseModel):
        """Template for the Payment Class"""
        __tablename__ = 'payments'
        user_id = db.Column(db.String(255), db.ForeignKey('users.id'), nullable=False)
        order_id = db.Column(db.String(255), db.ForeignKey('orders.id'), nullable=False)
        amount = db.Column(db.Numeric(10, 2), nullable=False)
        payment_method = db.Column(db.String(255), nullable=False)
        payment_status = db.Column(Enum('pending', 'paid', 'failed'), default='pending', nullable=False)

        def __init__(self, user_id, order_id, amount, payment_method, payment_status='pending'):
                super().__init__()
                self.user_id = user_id
                self.order_id = order_id
                self.amount = amount
                self.payment_method = payment_method
                self.payment_status = payment_status

        def __repr__(self):
                return f'<Payment {self.id}>'

        def format(self):
                return {
                        'id': self.id,
                        'user_id': self.user_id,
                        'order_id': self.order_id,
                        'amount': self.amount,
                        'payment_method': self.payment_method,
                        'payment_status': self.payment_status
                }