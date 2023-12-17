#!/usr/bin/env python3
"""Template for the Order Class"""
from foodie import db
from foodie.models.base import BaseModel
from sqlalchemy import Enum
from foodie.models.user import User

class Order(BaseModel):
        """Template for the Order Class"""
        __tablename__ = 'orders'

        user_id = db.Column(db.String(255), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
        total_price = db.Column(db.Float, nullable=False)
        status = db.Column(Enum('pending', 'processing', 'shipped', 'delivered', 'cancelled'), default='pending', nullable=False)
        delivery_address = db.Column(db.String(500), nullable=False)


        def __init__(self, user_id, total_price, status, delivery_address):
            super().__init__()
            self.user_id = user_id
            self.total_price = total_price
            self.status = status
            self.delivery_address = delivery_address

        def __repr__(self):
            return f'<Order {self.id}>'

        def format(self):
            return {
                'id': self.id,
                'user_id': self.user_id,
                'total_price': self.total_price,
                'status': self.status,
                'delivery_address': self.delivery_address
            }
            